# CS PhD Profiles

A standalone reference site for CS graduate applicants. Browse 127 applicants across 46 destination schools, including undergraduate background, research, internships, advisors, and papers at application time.

## Develop

Requires Node.js 22.13 or newer. Node.js 24 LTS is recommended.

```sh
npm ci
npm run dev
```

## Update statistics

Run `node scripts/count-conferences.mjs`, then `python3 scripts/plot-publications.py` (requires Matplotlib). This refreshes both charts and their displayed counts. The chart sample uses application years from 2021 onward, schools in the QS CS top 100, and excludes three unresolved anonymous profiles.

## Sources & license

Profiles summarize [cs-sop.notion.site](https://cs-sop.notion.site/CS-PhD-Statements-of-Purpose-df39955313834889b7ac5411c37b958d) and the [Tsinghua Feiyue database](https://database.feiyue.online/), with links to original profiles, SOPs, and papers. Adapted content is shared under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/); original SOPs belong to their authors. See [LICENSE-CONTENT.md](LICENSE-CONTENT.md) for details.
