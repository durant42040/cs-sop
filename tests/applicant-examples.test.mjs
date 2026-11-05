import assert from "node:assert/strict";
import test from "node:test";
import { exampleSchools, orderResearch } from "../lib/applicant-examples.ts";

test("dated papers sort within a year without losing their advisors", () => {
  const research = [
    { place: "A", role: "Research", mentors: "Earlier", papers: [{ venue: "Preprint", status: "Preprint", date: "2024-03-15", year: 2024, authorship: "First", title: "Earlier" }] },
    { place: "A", role: "Research", mentors: "Later", papers: [{ venue: "Preprint", status: "Preprint", date: "2024-11-02", year: 2024, authorship: "First", title: "Later" }] },
  ];
  assert.deepEqual(orderResearch(research).map(item => item.mentors), ["Later", "Earlier"]);
  assert.equal(research[0].mentors, "Earlier");
});

test("papers stay with each advisor and are ordered within the group", () => {
  const ben = exampleSchools.flatMap((school) => school.applicants).find((applicant) => applicant.id === "ben-shi");
  const research = ben.research.filter((item) => item.place === "Princeton University");
  const ordered = orderResearch(research);
  assert.deepEqual(ordered.filter((item) => item.papers.length).map((item) => item.papers.map((paper) => paper.venue.match(/20\d{2}/)[0])), [["2025"], ["2025"], ["2025"], ["2024"]]);
  for (const item of ordered) {
    for (const paper of item.papers) {
      assert.equal(item.mentors, research.find((entry) => entry.papers.includes(paper)).mentors);
    }
  }
  assert.equal(research[0].papers.length, 2);
});

test("Rishabh Ranjan's neural ILP paper stays with his thesis advisors", () => {
  const applicant = exampleSchools.flatMap((school) => school.applicants).find((entry) => entry.id === "rishabh-ranjan");
  const thesis = applicant.research.find((item) => item.role.includes("neural ILP"));
  assert.equal(thesis.place, "IIT Delhi");
  assert.equal(thesis.mentors, "Mausam · Parag Singla");
  assert.equal(thesis.papers[0].title, "A Solver-Free Framework for Scalable Learning in Neural ILP Architectures");
});

test("papers remain newest first across advisors at each institution", () => {
  for (const school of exampleSchools) {
    for (const applicant of school.applicants) {
      for (const place of new Set(applicant.research.map((item) => item.place))) {
        const research = applicant.research.filter((item) => item.place === place);
        const ordered = orderResearch(research);
        const years = ordered.flatMap((item) => item.papers).map((paper) => {
          const years = [...new Set(paper.venue.match(/\b20\d{2}\b/g) ?? [])];
          return paper.year ?? (years.length === 1 ? Number(years[0]) : 0);
        });
        assert.deepEqual(years, [...years].sort((left, right) => right - left), `${applicant.name}: ${place}`);
        for (const item of ordered) {
          for (const paper of item.papers) {
            assert.equal(item.mentors, research.find((entry) => entry.papers.includes(paper)).mentors);
          }
        }
      }
    }
  }
});

test("dated papers are sorted before papers without a known year", () => {
  const research = [
    { place: "A", role: "Research", mentors: "A", papers: [{ venue: "Example 2022", status: "Accepted", authorship: "First", title: "Older" }] },
    { place: "A", role: "Research", mentors: "B", papers: [{ venue: "Preprint", status: "Preprint", authorship: "First", title: "Undated" }] },
    { place: "A", role: "Research", mentors: "C", papers: [{ venue: "Example 2024", status: "Accepted", authorship: "First", title: "Newer" }] },
  ];
  const ordered = orderResearch(research);
  assert.deepEqual(ordered.map((item) => [item.papers[0].title, item.mentors]), [
    ["Newer", "C"], ["Older", "A"], ["Undated", "B"],
  ]);
});

test("a verified preprint year orders a paper without changing its venue label", () => {
  const papers = [
    { venue: "Example 2019", status: "Accepted", authorship: "First", title: "Older" },
    { venue: "TACL", status: "Accepted", year: 2020, authorship: "First", title: "Newer" },
  ];
  const ordered = orderResearch([{ place: "A", role: "Research", papers }])[0].papers;
  assert.deepEqual(ordered.map((paper) => paper.title), ["Newer", "Older"]);
  assert.equal(ordered[0].venue, "TACL");
});

test("ICLR submissions use the verified submission year for sorting", () => {
  for (const school of exampleSchools) {
    for (const applicant of school.applicants) {
      for (const item of applicant.research) {
        for (const paper of item.papers) {
          const match = paper.venue.match(/^ICLR (2018|2022|2023|2024|2025)$/);
          if (match && paper.status === "Submitted" && applicant.year === Number(match[1]) - 1) {
            assert.equal(paper.year, applicant.year, `${applicant.name}: ${paper.title}`);
          }
        }
      }
    }
  }
});

test("Zhuorui Ye's October preprint precedes her earlier ICLR submission", () => {
  const applicant = exampleSchools.flatMap((school) => school.applicants).find((entry) => entry.id === "zhuorui-ye");
  const papers = orderResearch(applicant.research.filter((item) => item.place === "Carnegie Mellon University")).flatMap((item) => item.papers);
  assert.deepEqual(papers.map((paper) => paper.title), [
    "Cooperative Strategic Planning Enhances Reasoning Capabilities in Large Language Models",
    "Concept-Based Interpretable Reinforcement Learning with Limited to No Human Labels",
  ]);
});

test("Shashank Kirtania's 2025 papers use their application-time year", () => {
  const applicant = exampleSchools.flatMap((school) => school.applicants).find((entry) => entry.id === "shashank-kirtania");
  const papers = orderResearch(applicant.research.filter((item) => item.place === "Microsoft Research")).flatMap((item) => item.papers);
  assert.deepEqual(papers.slice(0, 4).map((paper) => paper.title), [
    "IndiMathBench: Autoformalizing Mathematical Reasoning Problems with a Human Touch",
    "Improving Language Agents through BREW",
    "STACKFEED: Structured Textual Actor-Critic Knowledge Base Editing with Feedback",
    "Steering Language Models for Theorem Proving",
  ]);
});

test("applicants have consistent identities across school tabs", () => {
  const applicants = new Map();
  for (const school of exampleSchools) {
    const ids = new Set();
    assert.ok(school.applicants.length, `${school.name}: no applicants`);
    for (const applicant of school.applicants) {
      assert.ok(!ids.has(applicant.id), `${school.name}: duplicate ${applicant.id}`);
      ids.add(applicant.id);
      assert.ok(applicant.name && applicant.school && applicant.major, `${applicant.id}: missing background`);
      const previous = applicants.get(applicant.id);
      if (previous) {
        for (const field of ["name", "school", "major", "graduationYear"]) {
          assert.equal(applicant[field], previous[field], `${applicant.id}: inconsistent ${field}`);
        }
      }
      applicants.set(applicant.id, applicant);
    }
  }
});

test("dated research does not extend beyond the application year", () => {
  for (const school of exampleSchools) {
    for (const applicant of school.applicants) {
      if (!applicant.year) continue;
      for (const research of applicant.research) {
        const years = research.period?.match(/\b20\d{2}\b/g) ?? [];
        for (const year of years) {
          assert.ok(Number(year) <= applicant.year, `${applicant.name}: ${research.place} extends beyond applying`);
        }
      }
    }
  }
});

test("applicant examples keep each paper once and preserve both venue statuses", () => {
  const statuses = new Set(["Accepted", "Submitted", "Conditionally accepted", "Preprint", "In preparation"]);
  for (const school of exampleSchools) {
    for (const applicant of school.applicants) {
      const papers = new Set();
      for (const research of applicant.research) {
        for (const paper of research.papers) {
          const title = paper.title.toLowerCase();
          assert.ok(!papers.has(title), `${applicant.name}: duplicate ${paper.title}`);
          papers.add(title);
          assert.ok(statuses.has(paper.status), `${applicant.name}: invalid paper status`);
          for (const venue of paper.also ?? []) {
            assert.ok(venue.venue && venue.url, `${applicant.name}: missing additional venue or source`);
            assert.ok(statuses.has(venue.status), `${applicant.name}: invalid additional venue status`);
          }
        }
      }
    }
  }
});
