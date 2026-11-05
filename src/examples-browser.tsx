import { Fragment, useEffect, useRef, useState } from "react";
import { exampleSchools, orderResearch } from "../lib/applicant-examples";
import styles from "./examples.module.css";
import PublicationStatistics from "./publication-statistics";

function searchText(value: string) {
  return value.normalize("NFD").replace(/\p{Diacritic}/gu, "").replace(/[^\p{L}\p{N}]+/gu, " ").trim().toLowerCase();
}

export default function ExamplesBrowser() {
  const [schoolId, setSchoolId] = useState(exampleSchools[0].id);
  const [schoolQuery, setSchoolQuery] = useState("");
  const schoolTabs = useRef<HTMLElement>(null);
  useEffect(() => {
    const tabs = schoolTabs.current;
    const selected = tabs?.querySelector<HTMLButtonElement>('[aria-pressed="true"]');
    if (!tabs || !selected) return;
    const bounds = tabs.getBoundingClientRect();
    const button = selected.getBoundingClientRect();
    if (button.left < bounds.left) tabs.scrollLeft -= bounds.left - button.left;
    if (button.right > bounds.right) tabs.scrollLeft += button.right - bounds.right;
  }, [schoolId, schoolQuery]);
  useEffect(() => {
    function showApplicant() {
      const id = window.location.hash.slice(1);
      const selected = new URLSearchParams(window.location.search).get("school");
      const selectedSchool = exampleSchools.find((entry) => entry.id === selected);
      if (!id) {
        setSchoolId(selectedSchool?.id ?? exampleSchools[0].id);
        return;
      }
      if (selectedSchool) setSchoolId(selectedSchool.id);
      const match = exampleSchools.find((entry) => entry.applicants.some((applicant) => applicant.id === id));
      if (!match) return;
      setSchoolId((current) => selectedSchool?.applicants.some((applicant) => applicant.id === id) ? selectedSchool.id : exampleSchools.find((entry) => entry.id === current)?.applicants.some((applicant) => applicant.id === id) ? current : match.id);
      requestAnimationFrame(() => requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView()));
    }
    function restoreSchool() {
      setSchoolQuery("");
      showApplicant();
    }
    const frame = requestAnimationFrame(showApplicant);
    window.addEventListener("hashchange", showApplicant);
    window.addEventListener("popstate", restoreSchool);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", showApplicant);
      window.removeEventListener("popstate", restoreSchool);
    };
  }, []);
  const query = searchText(schoolQuery);
  const schools = exampleSchools
    .filter((entry) => searchText(entry.name).includes(query) || searchText(entry.id).includes(query) || entry.applicants.some((applicant) => searchText(applicant.name).includes(query)));
  const school = schools.find((entry) => entry.id === schoolId) ?? schools[0];
  useEffect(() => {
    if (!query || !school) return;
    const url = new URL(window.location.href);
    if (url.searchParams.get("school") === school.id) return;
    url.searchParams.set("school", school.id);
    url.hash = "";
    window.history.replaceState(null, "", url);
  }, [query, school]);
  const schoolMatch = school && (searchText(school.name).includes(query) || searchText(school.id).includes(query));
  const applicants = [...(school?.applicants ?? [])]
    .filter((applicant) => schoolMatch || searchText(applicant.name).includes(query))
    .sort((left, right) => (right.year ?? 0) - (left.year ?? 0))
    .map((applicant) => ({
      ...applicant,
      groups: [...new Set(applicant.research.map((research) => research.place))].map((place) => ({
        place,
        source: applicant.research.find((research) => research.place === place && research.source)?.source,
        research: orderResearch(applicant.research.filter((research) => research.place === place)),
      })),
    }));
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <header className={styles.intro}>
          <h1>CS PhD Profiles</h1>
          <div className={styles.context}>
            <a href="https://cs-sop.notion.site/CS-PhD-Statements-of-Purpose-df39955313834889b7ac5411c37b958d" target="_blank" rel="noreferrer">cs-sop.notion.site ↗</a>
            <PublicationStatistics />
          </div>
        </header>
        <div className={styles.schoolBar}>
          <input className={styles.schoolSearch} type="search" aria-label="Find a school or applicant" placeholder="Find a school or applicant" value={schoolQuery} onChange={(event) => {
            if (school) setSchoolId(school.id);
            setSchoolQuery(event.target.value);
          }} />
          <nav ref={schoolTabs} className={styles.schoolTabs} aria-label="Destination school">
            {schools.map((entry) => (
              <button key={entry.id} type="button" aria-pressed={entry.id === school?.id} onClick={() => {
                setSchoolId(entry.id);
                const url = new URL(window.location.href);
                url.searchParams.set("school", entry.id);
                url.hash = "";
                window.history.pushState(null, "", url);
              }}>
                {entry.name}<span>{!query || searchText(entry.name).includes(query) || searchText(entry.id).includes(query) ? entry.applicants.length : entry.applicants.filter((applicant) => searchText(applicant.name).includes(query)).length}</span>
              </button>
            ))}
          </nav>
        </div>
        {schools.length === 0 && <p>No matching schools or applicants.</p>}
        <div className={styles.layout}>
          <aside className={styles.index}>
            <nav aria-label="Applicants">
              {applicants.map((applicant) => (
                <a key={applicant.id} href={`#${applicant.id}`} onClick={() => {
                  if (!school) return;
                  setSchoolId(school.id);
                  const url = new URL(window.location.href);
                  url.searchParams.set("school", school.id);
                  window.history.replaceState(null, "", url);
                }}>
                  <span>{applicant.name}</span><span>{applicant.year}</span>
                </a>
              ))}
            </nav>
          </aside>
          <div className={styles.applicants}>
            {applicants.map((applicant) => (
              <section className={styles.card} id={applicant.id} key={applicant.id} aria-labelledby={`${applicant.id}-name`}>
                <header className={styles.identity}>
                  <div>
                    <h2 id={`${applicant.id}-name`}>{applicant.name}</h2>
                    <p className={styles.school}>{applicant.school}</p>
                    <p className={styles.education}>
                      <span>{applicant.major}</span>
                      {applicant.graduationYear && <a href={applicant.educationSource} target="_blank" rel="noreferrer">{applicant.year && applicant.graduationYear > applicant.year ? "Expected " : "Class of "}{applicant.graduationYear}</a>}
                    </p>
                    {applicant.program && <p className={styles.education}>Applied to {applicant.program}</p>}
                  </div>
                  {applicant.year && <div className={styles.year}><span>APPLICATION YEAR</span><strong>{applicant.year}</strong></div>}
                </header>
                <div className={styles.listHeading}>
                  {applicant.groups.length > 0 && <h3>Research & internships</h3>}
                  <a href={applicant.source} target="_blank" rel="noreferrer">{applicant.sourceLabel ?? "View SOP"} ↗</a>
                </div>
                <div className={styles.research}>
                  {applicant.groups.map((group) => (
                    <section className={styles.experience} key={group.place}>
                      <div className={styles.researchHeading}>
                        <h4>{group.source ? <a href={group.source} target="_blank" rel="noreferrer">{group.place}</a> : group.place}</h4>
                      </div>
                      {group.research.map((research, index) => (
                        <div className={styles.advisorGroup} key={`${research.mentors}-${index}`}>
                          <div className={styles.researchMeta}>
                            {research.source ? (
                              <a className={styles.role} data-internship={research.role.toLowerCase().includes("internship")} href={research.source} target="_blank" rel="noreferrer">{research.role}</a>
                            ) : (
                              <span className={styles.role} data-internship={research.role.toLowerCase().includes("internship")}>{research.role}</span>
                            )}
                            {research.mentors ? <p><span>{research.mentorLabel ?? (research.mentors.includes(" · ") ? "Advisors" : "Advisor")}</span> {research.mentors}</p> : null}
                            {research.period ? <span className={styles.period}>{research.period}</span> : null}
                          </div>
                          {research.papers.length ? (
                            <ul className={styles.papers}>
                              {research.papers.map((paper) => (
                                <li key={`${paper.venue}-${paper.title}`}>
                                  <div className={styles.paperMeta}>
                                    <strong>{paper.status === "Preprint" ? "Preprint" : paper.venue || paper.status}</strong>
                                    {paper.venue && paper.status !== "Preprint" && paper.venue !== paper.status ? <span className={styles.status} data-status={paper.status}>{paper.status.toLowerCase()}</span> : null}
                                    {paper.also?.map((venue) => <Fragment key={venue.venue}>
                                      <a className={styles.otherVenue} href={venue.url ?? paper.url ?? applicant.source} target="_blank" rel="noreferrer">{venue.venue}</a>
                                      <span className={styles.status} data-status={venue.status}>{venue.status.toLowerCase()}</span>
                                    </Fragment>)}
                                    {paper.authorship && <span className={styles.authorship}>{paper.authorship}</span>}
                                  </div>
                                  <a className={styles.paperTitle} href={paper.url ?? applicant.source} target="_blank" rel="noreferrer">{paper.title}</a>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      ))}
                    </section>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
        <footer className={styles.footer}>
          <p>Summarized and reorganized from <a href="https://cs-sop.notion.site/CS-PhD-Statements-of-Purpose-df39955313834889b7ac5411c37b958d" target="_blank" rel="noreferrer">cs-sop.notion.site</a>, created by Zhaofeng Wu, Alexis Ross, and Shannon Shen. Original SOPs belong to their respective authors. Additional profiles from the <a href="https://database.feiyue.online/" target="_blank" rel="noreferrer">Tsinghua Feiyue database</a> and its contributors.</p>
          <p>Adapted profile content: <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/" target="_blank" rel="license noreferrer">CC BY-NC-SA 4.0</a> · Noncommercial reuse with attribution and the same license. Independent project; no endorsement implied.</p>
        </footer>
      </div>
    </main>
  );
}
