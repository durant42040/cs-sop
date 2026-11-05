import json
import statistics
from pathlib import Path

import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt

root = Path(__file__).resolve().parents[1]
report = json.loads((root / 'docs/conference-counts.json').read_text())
skipped = {'lihan', 'Colin', 'Luke'}
short = {
    'University of Illinois Urbana-Champaign': 'UIUC',
    'University of Pennsylvania': 'Penn',
    'University of Texas at Austin': 'UT Austin',
    'University of Southern California': 'USC',
    'New York University': 'NYU',
}
schools = []
unique = {}
for school in report['schools']:
    if school['rank'] is None or school['rank'] > 100:
        continue
    students = [a for a in school['students'] if (a.get('year') or 0) >= 2021 and a['name'] not in skipped]
    if students:
        schools.append((school['school'], students))
        for student in students:
            unique[student['name']] = student

summary = {'applicants': len(unique), 'schools': len(schools), 'fromYear': 2021}
plt.rcParams['svg.hashsalt'] = 'cs-sop'
for metric, filename, label in [
    ('main', 'conference-papers', 'Conference papers/applicant'),
    ('all', 'all-papers', 'All papers/applicant'),
]:
    rows = []
    for name, students in schools:
        values = [a['counts']['main'] if metric == 'main' else len(a['papers']) for a in students]
        name = short.get(name, name.removeprefix('University of ').removesuffix(' University'))
        rows.append((name, statistics.mean(values), min(values), max(values)))
    values = [a['counts']['main'] if metric == 'main' else len(a['papers']) for a in unique.values()]
    avg = statistics.mean(values)
    std = statistics.pstdev(values)
    summary[metric] = {'average': round(avg, 2), 'deviation': round(std, 2), 'minimum': min(values), 'maximum': max(values)}
    x = list(range(len(rows)))
    fig, ax = plt.subplots(figsize=(15, 6.5))
    ax.vlines(x, [r[2] for r in rows], [r[3] for r in rows], color='#a5afb9', linewidth=1.6, label='Min–max')
    for index in [2, 3]:
        ax.scatter(x, [r[index] for r in rows], marker='_', s=90, color='#a5afb9', linewidth=1.5)
    ax.scatter(x, [r[1] for r in rows], s=42, color='#245e86', label='Average', zorder=4)
    ax.axhline(avg, color='#d48b54', linestyle=(0, (4, 4)), linewidth=1.3, label=f'Overall average {avg:.2f}')
    for i, row in enumerate(rows):
        ax.annotate(f'{row[1]:.2f}', (i, row[1]), xytext=(7, 7), textcoords='offset points', fontsize=9,
                    color='#17394f', bbox=dict(facecolor='white', edgecolor='none', alpha=.85, pad=1))
    ax.set_xticks(x, [r[0] for r in rows], rotation=55, ha='right', fontsize=10)
    ax.set_xlim(-.7, len(rows) - .1)
    ax.set_ylim(-.3, max(values) + (1 if metric == 'main' else 2))
    ax.set_ylabel(label, fontsize=12, labelpad=12, color='#243746')
    ax.tick_params(axis='both', length=0, pad=8)
    ax.yaxis.grid(True, color='#e7ebef', linewidth=.7)
    ax.set_axisbelow(True)
    for spine in ax.spines.values():
        spine.set_visible(False)
    ax.legend(loc='upper right', frameon=False, ncol=3, fontsize=10)
    ax.set_title(f'SD {std:.2f}   ·   Min {min(values)}   ·   Max {max(values)}', loc='left', fontsize=11, color='#243746', pad=12)
    fig.subplots_adjust(left=.065, right=.99, top=.91, bottom=.28)
    target = root / f'src/assets/{filename}.svg'
    fig.savefig(target, facecolor='white', bbox_inches='tight', metadata={'Date': None})
    target.write_text('\n'.join(line.rstrip() for line in target.read_text().splitlines()) + '\n')
    plt.close(fig)
(root / 'src/publication-summary.json').write_text(json.dumps(summary, indent=2) + '\n')
print(json.dumps(summary))
