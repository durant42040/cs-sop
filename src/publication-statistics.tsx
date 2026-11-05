import { useRef } from "react";
import conferencePlot from "./assets/conference-papers.svg";
import allPlot from "./assets/all-papers.svg";
import summary from "./publication-summary.json";
import styles from "./examples.module.css";

export default function PublicationStatistics() {
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button className={styles.statsLink} type="button" onClick={() => dialog.current?.showModal()}>Statistics</button>
      <dialog ref={dialog} className={styles.statsDialog} aria-labelledby="publication-statistics-title">
        <header className={styles.statsHeader}>
          <h2 id="publication-statistics-title">Publication statistics</h2>
          <button type="button" onClick={() => dialog.current?.close()} aria-label="Close publication statistics">Close</button>
        </header>
        <div className={styles.statsContent}>
          <p className={styles.statsScope}>{summary.applicants} unique applicants across {summary.schools} schools, using application years from {summary.fromYear} onward.</p>
          <figure className={styles.statsFigure}>
            <figcaption>
              <h2>Accepted conference papers</h2>
              <p>Full conference research papers, excluding short papers, workshops, Findings and journal-based proceedings.</p>
            </figcaption>
            <a href={conferencePlot} target="_blank" rel="noreferrer" aria-label="Open accepted conference papers chart at full size">
              <img src={conferencePlot} width="2494" height="1057" loading="lazy" alt={`Accepted conference papers per applicant by school: averages and minimum-to-maximum ranges. Overall average ${summary.main.average.toFixed(2)}, standard deviation ${summary.main.deviation.toFixed(2)}, minimum ${summary.main.minimum}, maximum ${summary.main.maximum}.`} />
            </a>
          </figure>
          <figure className={styles.statsFigure}>
            <figcaption>
              <h2>All papers</h2>
              <p>All listed works, including journals, workshops, preprints, submissions, drafts, short papers, posters, demos and abstracts.</p>
            </figcaption>
            <a href={allPlot} target="_blank" rel="noreferrer" aria-label="Open all papers chart at full size">
              <img src={allPlot} width="2513" height="1057" loading="lazy" alt={`All papers per applicant by school: averages and minimum-to-maximum ranges. Overall average ${summary.all.average.toFixed(2)}, standard deviation ${summary.all.deviation.toFixed(2)}, minimum ${summary.all.minimum}, maximum ${summary.all.maximum}.`} />
            </a>
          </figure>
        </div>
      </dialog>
    </>
  );
}
