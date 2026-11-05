import { writeFileSync } from "node:fs";
import { exampleSchools, qsRanks } from "../lib/applicant-examples.ts";

// Strict full-paper metric: journal-based proceedings are reported separately.
const main = /^(\*SEM|AAAI|AACL|ACE|ACL|AISTATS|ACM COMPASS|AIAA Aviation|ASE|ASPLOS|ASONAM|CCS|CHI|CogSci|COLING|COLM|Complex Networks|CoRL|Creativity & Cognition|CVPR|DAC|DiGRA|EACL|EAAMO|ECCV|ECML PKDD|EMBC|EMNLP|ESA|FUN|GCPR|GLOBECOM|HCOMP|HPEC|ICCIT|ICCV|ICCAD|ICDCN|ICDM|ICTD|IDC|IUI|MICCAI|SPIE Medical Imaging|SIGIR|ICDMAI|ICER|ICICTD|ICIP|ICLR|ICML|ICO|ICON|ICPR|ICQE|ICRA|ICSISCET|IEEE Big Data|IEEE IEMRE|IEEE INCET|IEEE TENSYMP|IJCACI|IJCAI|IndiaHCI|INTERSPEECH|IPAS|IROS|ISBRA|ISSTA|ISWC|KDD|LAK|Learning at Scale|LREC|MISP|ML4H|MLSys|MobiQuitous|NAACL|NeurIPS|NeuS|OSDI|PAKDD|QPAIN|RoboSoft|SANER|SAS|SCF|SciPy|SIGCSE|SIP|SOLI|STI|USENIX NSDI|USENIX Security|VL\/HCC|WACV|WISE|WSCG|WSDM)(?:\s+20\d{2})?(?:\s*[· ]\s*(?:Oral|Spotlight|Outstanding Paper|Best Paper|Young Researcher Best Paper))?$/i;
const journal = /Science Advances|Distill|Nature Communications|Communications Biology|The UMAP Journal|Open Mind|IEEE TCAD|IEEE Micro|TMLR|ACM TIST|ACM TOCHI|ACM XRDS|Applied Soft Computing|Archives of Computational|Artificial Intelligence Review|Cancer Cytopathology|Clinical Simulation|Decision Analytics Journal|Educational Technology Research|Electric Power Systems|Formal Aspects|Future Generation|Genomics & Informatics|Heliyon|IEEE Journal|International Journal|JAMA|JOSS|Journal of|Nature Methods|Neurocomputing|Neuroinformatics|Pattern Analysis|Pattern Recognition|\bPLOS\b|Results in Physics|Review of Undergraduate|Scientific Reports|TACL|The Explicator|The VLDB Journal/;
const categories = ["main", "findings", "hybrid", "workshop", "journal", "other", "unknown"];

function classify(venue) {
  if (/Findings/i.test(venue)) return "findings";
  if (journal.test(venue)) return "journal";
  if (/^(OOPSLA|PLDI|CSCW|ACM IMWUT|PoPETS|VLDB)\b/.test(venue)) return "hybrid";
  if (/Workshop| at |^AIChallengeIoT |^EGRAPHS |^Genetic Programming Theory|^NeurIPS ML4D |^SemEval /i.test(venue)) return "workshop";
  if (/Abstract|Consortium|Demo|Poster|Short paper|NIER|Supplement|Industry|Position Paper|Symposium|Robotics Institute Summer Scholars/i.test(venue)) return "other";
  if (main.test(venue)) return "main";
  return "unknown";
}

const schools = exampleSchools.map((school) => {
  const students = school.applicants.map((student) => {
    const papers = new Map();
    for (const research of student.research) for (const paper of research.papers) {
      const key = paper.title.toLowerCase().replace(/[^a-z0-9]/g, "");
      if (!papers.has(key)) papers.set(key, { title: paper.title, venues: [] });
      papers.get(key).venues.push(...[paper, ...(paper.also ?? [])].map((item) => ({
        venue: item.venue, status: item.status, source: item.url ?? paper.url ?? student.source,
        category: item.status === "Accepted" ? classify(item.venue) : "not-accepted",
      })));
    }
    const counts = Object.fromEntries(categories.map((key) => [key, 0]));
    for (const paper of papers.values()) {
      // One work can appear in several separate-category counts, but only once per category.
      const found = new Set(paper.venues.map((item) => item.category));
      for (const category of found) if (category in counts) counts[category]++;
      if (found.has("main") && found.has("unknown")) counts.unknown--;
    }
    return {
      name: student.name, year: student.year, source: student.source, review: student.paperReview ?? null,
      counts, usable: true,
      limitation: papers.size === 0 ? "No paper inventory; zero is a calculation placeholder, not verified absence"
        : counts.unknown ? "Full proceedings-paper eligibility unresolved" : null,
      papers: [...papers.values()],
    };
  });
  const usable = students.filter((student) => student.usable);
  const total = usable.reduce((sum, student) => sum + student.counts.main, 0);
  return {
    school: school.name, id: school.id, rank: qsRanks[school.id] ?? null, profiles: students.length,
    counted: usable.length, excluded: students.length - usable.length,
    total, average: usable.length ? total / usable.length : null, students,
  };
});

const methodology = [
  "Recorded application-time accepted full main-conference papers; all authorship positions.",
  "Uses the current cs-sop list. Previously zero-count profiles were checked against personal sites; see docs/zero-paper-audit.json for evidence and unresolved cases.",
  "Deduplicated by normalized title within each student. Counted once per school for multi-school profiles.",
  "Workshops, Findings, journals, journal-based proceedings, short papers, demos, abstracts, industry tracks, position papers, symposium presentations and conditional acceptances excluded from main count.",
  "All listed students are included in the denominator. Empty inventories count as zero for this statistic; unresolved identity or timing does not establish a verified zero. Unresolved venue entries do not enter the numerator and are flagged in the detail.",
  "Main-venue labels are treated as research papers unless the saved label indicates otherwise; individual paper length and acceptance date are not independently reverified.",
  "These are provisional saved-sample statistics, not population admissions averages or admissions requirements.",
  "Separate-category counts may overlap for a work appearing in several venues; do not sum them as unique papers.",
];
const report = { date: "2026-11-05", methodology, schools };
writeFileSync("docs/conference-counts.json", JSON.stringify(report, null, 2) + "\n");
const lines = ["ACCEPTED CONFERENCE PAPER COUNTS — 2026-11-05", "", ...methodology.map((line) => `- ${line}`), ""];
for (const school of schools) {
  lines.push(`${school.school}: ${school.average?.toFixed(2) ?? "N/A"} papers/student; ${school.total} papers / ${school.counted} counted profiles; ${school.excluded} excluded`);
  for (const student of school.students) {
    lines.push(`  ${student.name}: ${student.counts.main} recorded main; Findings ${student.counts.findings}; hybrid ${student.counts.hybrid}; workshop ${student.counts.workshop}${student.limitation ? ` [NOTE: ${student.limitation}]` : ""}`);
    lines.push(`    Source: ${student.source}`);
    for (const paper of student.papers) if (paper.venues.some((venue) => ["main", "unknown"].includes(venue.category))) {
      lines.push(`    ${paper.title}: ${paper.venues.filter((venue) => ["main", "unknown"].includes(venue.category)).map((venue) => `${venue.venue} [${venue.category}]`).join("; ")}`);
    }
  }
  lines.push("");
}
writeFileSync("docs/conference-counts.txt", lines.join("\n") + "\n");
console.log(schools.map((school) => `${school.school}\t${school.counted}/${school.profiles}\t${school.total}\t${school.average?.toFixed(2) ?? "N/A"}`).join("\n"));
console.log("Unresolved:", schools.flatMap((school) => school.students.flatMap((student) => student.papers.flatMap((paper) => paper.venues.filter((venue) => venue.category === "unknown").map((venue) => `${student.name}: ${venue.venue}`)))));
