// QS Computer Science & Information Systems 2026, checked November 2, 2026.
// https://www.topuniversities.com/university-subject-rankings/computer-science-information-systems
// Table mirrors: https://xuanxiao.org/en/rankings/qs/subject/computer-science-information-systems
// https://www.betteredu.net/universityranking/503.html (pages 1–9)
// Ranking bands use their lower bound for sorting. Null means no CS rank found.
export const qsRanks: Record<string, number | null> = {
  uiuc: 32,
  ucsd: 42,
  mit: 1,
  stanford: 2,
  cmu: 3,
  berkeley: 6,
  harvard: 7,
  toronto: 13,
  princeton: 14,
  cornell: 17,
  yale: 21,
  columbia: 22,
  nyu: 22,
  washington: 22,
  penn: 36,
  texas: 39,
  caltech: 40,
  michigan: 52,
  purdue: 66,
  hopkins: 67,
  usc: 73,
  maryland: 88,
  brown: 111,
  irvine: 121,
  wisconsin: 141,
  northeastern: 152,
  "santa-barbara": 198,
  rutgers: 201, // 201–250
  unc: 201, // 201–250
  rit: 251, // 251–300
  "nc-state": 301, // 301–350
  buffalo: 351, // 351–400
  utah: 351, // 351–400
  "santa-cruz": 451, // 451–500
  vanderbilt: 451, // 451–500
  utsa: null,
  ista: null,
};

type Paper = {
  venue: string;
  status: "Accepted" | "Submitted" | "Conditionally accepted" | "Preprint" | "In preparation";
  year?: number;
  date?: string;
  authorship?: string;
  title: string;
  url?: string;
  also?: { venue: string; status: string; url?: string }[];
};

type Research = {
  place: string;
  role: string;
  period?: string;
  mentors?: string;
  mentorLabel?: string;
  source?: string;
  papers: Paper[];
};

export function orderResearch(research: Research[]): Research[] {
  function paperDate(paper: Paper) {
    const years = [...new Set(paper.venue.match(/\b20\d{2}\b/g) ?? [])];
    return paper.date ?? String(paper.year ?? (years.length === 1 ? Number(years[0]) : 0));
  }
  const papers = research.flatMap((item, index) => item.papers.map((paper) => ({ paper, index })))
    .sort((left, right) => paperDate(right.paper).localeCompare(paperDate(left.paper)));
  const groups: Research[] = [];
  let last = -1;
  for (const item of papers) {
    if (item.index !== last) groups.push({ ...research[item.index], papers: [] });
    groups[groups.length - 1].papers.push(item.paper);
    last = item.index;
  }
  return [...groups, ...research.filter((item) => item.papers.length === 0)];
}

type Applicant = {
  id: string;
  name: string;
  school: string;
  year?: number;
  major: string;
  graduationYear?: number;
  program?: string;
  educationSource: string;
  source: string;
  sourceLabel?: string;
  research: Research[];
  paperReview?: { checked: string; count: number | null; status: string; source: string; note: string };
};


type ExampleSchool = {
  id: string;
  name: string;
  program: string;
  applicants: Applicant[];
};

export const exampleSchools: ExampleSchool[] = [
  {
    "id": "mit",
    "name": "MIT",
    "program": "Electrical Engineering & Computer Science PhD",
    "applicants": [
      {
        "id": "aayush-kumar",
        "name": "Aayush Kumar",
        "school": "IIT Kanpur",
        "year": 2025,
        "major": "Computer Science and Engineering",
        "graduationYear": 2024,
        "educationSource": "https://github.com/Aeyush10/Aeyush10.github.io/blob/133aaa6aa25d0d72e814a757f8592850c4a50853/CV/Aayush_Kumar_CV.pdf",
        "source": "https://github.com/Aeyush10/Aeyush10.github.io/blob/8f8103c1d3ce585033def700bfe6e55f1ca30cb1/phd_sop/Aayush_Kumar_SOP_Fall_2026.pdf",
        "research": [
          {
            "place": "Microsoft",
            "role": "Research collaboration, cultural bias in language-model recommendations",
            "mentors": "Sanket Mhatre",
            "mentorLabel": "Collaborator",
            "source": "https://arxiv.org/html/2511.18403v1",
            "papers": [
              {
                "venue": "Preprint",
                "status": "Preprint",
                "year": 2025,
                "authorship": "First",
                "title": "UnWEIRDing LLM Entity Recommendations",
                "url": "https://arxiv.org/abs/2511.18403v1"
              }
            ]
          },
          {
            "place": "Microsoft",
            "role": "Research fellow, PROSE · AI agents for programming",
            "period": "From 2024",
            "mentors": "Emerson Murphy-Hill · Gustavo Soares · Sumit Gulwani",
            "source": "https://aeyush10.github.io/",
            "papers": [
              {
                "venue": "ASE 2025",
                "status": "Accepted",
                "authorship": "First",
                "title": "Why AI Agents Still Need You: Findings from Developer-Agent Collaborations in the Wild",
                "url": "https://doi.org/10.1109/ASE63991.2025.00043"
              },
              {
                "venue": "ACM TOCHI 2025",
                "status": "Accepted",
                "authorship": "Second",
                "title": "TableTalk: Scaffolding Spreadsheet Development with a Language Agent",
                "url": "https://doi.org/10.1145/3765286"
              }
            ]
          },
          {
            "place": "Microsoft",
            "role": "Research, table extraction",
            "mentors": "Sumit Gulwani · Arjun Radhakrishna · Ashish Tiwari",
            "mentorLabel": "Collaborators",
            "source": "https://arxiv.org/abs/2508.09324v1",
            "papers": [
              {
                "venue": "Preprint",
                "status": "Preprint",
                "year": 2025,
                "authorship": "Second",
                "title": "TEN: Table Explicitization, Neurosymbolically",
                "url": "https://arxiv.org/abs/2508.09324v1"
              }
            ]
          },
          {
            "place": "IIT Kanpur",
            "role": "Undergraduate research, programming education and AI",
            "mentors": "Sruti Srinivasa Ragavan",
            "source": "https://aeyush10.github.io/",
            "papers": [
              {
                "venue": "Preprint",
                "status": "Preprint",
                "year": 2025,
                "authorship": "First",
                "title": "To Google or To ChatGPT? A Comparison of CS2 Students’ Information Gathering Approaches and Outcomes",
                "url": "https://arxiv.org/abs/2501.11935"
              },
              {
                "venue": "SIGCSE 2024",
                "status": "Accepted",
                "authorship": "Fourth",
                "title": "Trust in Generative AI among Students: An Exploratory Study",
                "url": "https://doi.org/10.1145/3626252.3630842"
              },
              {
                "venue": "VL/HCC 2023",
                "status": "Accepted",
                "authorship": "Second",
                "title": "End-User Programming is WEIRD: How, Why and What to Do About It",
                "url": "https://doi.org/10.1109/VL-HCC57772.2023.00013"
              },
              {
                "venue": "ICER 2023 Poster",
                "status": "Accepted",
                "authorship": "Fifth",
                "title": "Towards Characterizing Trust in Generative Artificial Intelligence among Students",
                "url": "https://doi.org/10.1145/3568812.3603469"
              }
            ]
          },
          {
            "place": "IIT Kanpur",
            "role": "Summer project, C3iHub · SUTRA COVID modeling",
            "period": "May–September 2022",
            "mentors": "Manindra Agrawal",
            "mentorLabel": "With",
            "source": "https://github.com/Aeyush10/Aeyush10.github.io/blob/7f4917146ff5fba6a43333a7121fba732c961dfc/CV/Aayush_Kumar_CV.pdf",
            "papers": []
          },
          {
            "place": "IIT Kanpur",
            "role": "Tutor, fundamentals of computing",
            "period": "July–November 2023",
            "source": "https://docs.google.com/gview?embedded=true&url=https%3A%2F%2Fraw.githubusercontent.com%2FAeyush10%2FAeyush10.github.io%2F7f4917146ff5fba6a43333a7121fba732c961dfc%2FCV%2FAayush_Kumar_CV.pdf",
            "papers": []
          },
          {
            "place": "EPFL",
            "role": "Semester research project, ML4ED Lab, intersectionality in oversampling",
            "period": "February–June 2023",
            "source": "https://github.com/Aeyush10/Aeyush10.github.io/blob/7f4917146ff5fba6a43333a7121fba732c961dfc/CV/Aayush_Kumar_CV.pdf",
            "papers": []
          },
          {
            "place": "Quadeye Securities",
            "role": "Quantitative research internship, news sentiment and stock prices",
            "period": "2023",
            "source": "https://aeyush10.github.io/CV/Aayush_Kumar_CV.pdf",
            "papers": []
          }
        ]
      },
      {
        "id": "jayden-teoh",
        "name": "Jayden Teoh",
        "school": "Singapore Management University",
        "year": 2025,
        "major": "Computer Science (Artificial Intelligence)",
        "graduationYear": 2026,
        "educationSource": "https://github.com/JaydenTeoh/JaydenTeoh.github.io/blob/7636105b408b84ed31c29ec0513ea869e0c3abab/data/Jayden_Academic_CV.pdf",
        "source": "https://github.com/JaydenTeoh/JaydenTeoh.github.io/blob/a559d80633da9a77121f6607283d906edaaa5c2c/data/PhD_Statement_of_Purpose.pdf",
        "research": [
          {
            "place": "Microsoft",
            "role": "Research internship, AI Frontiers",
            "period": "From May 2025",
            "mentors": "Alex Lamb · John Langford",
            "source": "https://arxiv.org/html/2511.05963v1",
            "papers": [
              {
                "venue": "Preprint",
                "status": "Preprint",
                "year": 2025,
                "authorship": "First",
                "title": "Next-Latent Prediction Transformers Learn Compact World Models",
                "url": "https://arxiv.org/abs/2511.05963v1"
              }
            ]
          },
          {
            "place": "Microsoft",
            "role": "Research collaboration, language-model world states",
            "mentors": "Alex Lamb · John Langford",
            "mentorLabel": "Collaborators",
            "source": "https://arxiv.org/html/2410.23506v3",
            "papers": [
              {
                "venue": "Preprint",
                "status": "Preprint",
                "year": 2025,
                "authorship": "Seventh",
                "title": "The Belief State Transformer",
                "url": "https://arxiv.org/abs/2410.23506v3"
              }
            ]
          },
          {
            "place": "London Initiative for Safe AI",
            "role": "Research assistant, capability elicitation",
            "period": "June–August 2024",
            "source": "https://github.com/JaydenTeoh/JaydenTeoh.github.io/blob/7636105b408b84ed31c29ec0513ea869e0c3abab/data/Jayden_Academic_CV.pdf",
            "papers": [
              {
                "venue": "ICML 2025",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "The Elicitation Game: Evaluating Capability Elicitation Techniques",
                "url": "https://proceedings.mlr.press/v267/hofstatter25a.html",
                "also": [
                  {
                    "venue": "SoLaR at NeurIPS 2024",
                    "status": "Accepted",
                    "url": "https://aiworkshoptracker.com/workshop/neurips-2024-solar/"
                  },
                  {
                    "venue": "SATA at NeurIPS 2024",
                    "status": "Accepted",
                    "url": "https://www.linkedin.com/posts/jayden-teoh_so-grateful-for-the-opportunity-to-attend-activity-7275327853540352001-P_tv"
                  }
                ]
              }
            ]
          },
          {
            "place": "Singapore Management University",
            "role": "Research assistant, CARE.ai Labs",
            "period": "From May 2023",
            "mentors": "Pradeep Varakantham",
            "source": "https://github.com/JaydenTeoh/JaydenTeoh.github.io/blob/7636105b408b84ed31c29ec0513ea869e0c3abab/data/Jayden_Academic_CV.pdf",
            "papers": [
              {
                "venue": "ICLR 2026",
                "status": "Submitted",
                "year": 2025,
                "authorship": "Second",
                "title": "On Discovering Algorithms for Adversarial Imitation Learning",
                "url": "https://arxiv.org/abs/2510.00922v1"
              },
              {
                "venue": "ICLR 2025",
                "status": "Accepted",
                "authorship": "First",
                "title": "On Generalization Across Environments In Multi-Objective Reinforcement Learning",
                "url": "https://proceedings.iclr.cc/paper_files/paper/2025/hash/c97d5a0a332ac6a8e4836de20462c576-Abstract-Conference.html"
              },
              {
                "venue": "NeurIPS 2024 Oral",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Improving Environment Novelty Quantification for Effective Unsupervised Environment Design",
                "url": "https://proceedings.neurips.cc/paper_files/paper/2024/hash/f445ba15f0f05c26e1d24f908ea78d60-Abstract-Conference.html"
              },
              {
                "venue": "AAMAS 2024 · Extended abstract",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Unifying Regret and State-Action Space Coverage for Effective Unsupervised Environment Design",
                "url": "https://aamas.csc.liv.ac.uk/Proceedings/aamas2024/pdfs/p2507.pdf"
              }
            ]
          },
          {
            "place": "Singapore Management University",
            "role": "Programs lead, SMU A.I. · AI workshops and reading groups",
            "period": "From 2024",
            "source": "https://jaydenteoh.github.io/data/Jayden_Academic_CV.pdf",
            "papers": []
          },
          {
            "place": "Singapore Management University",
            "role": "Programs lead, SMU .Hack · programming workshops",
            "period": "2023–2024",
            "source": "https://jaydenteoh.github.io/data/Jayden_Academic_CV.pdf",
            "papers": []
          },
          {
            "place": "Singapore Management University",
            "role": "Computing and Information Systems Achievements Scholarship from 2023 · Outstanding First Year Student Award 2024",
            "source": "https://github.com/JaydenTeoh/JaydenTeoh.github.io/blob/7636105b408b84ed31c29ec0513ea869e0c3abab/data/Jayden_Academic_CV.pdf",
            "papers": []
          },
          {
            "place": "Project Heartcode",
            "role": "Volunteer mentor, web development",
            "period": "2023–2024",
            "source": "https://jaydenteoh.github.io/data/Jayden_Academic_CV.pdf",
            "papers": []
          },
          {
            "place": "Continental",
            "role": "Machine learning internship, diffusion models for tire treads",
            "period": "April–July 2024",
            "mentors": "Terence Ng",
            "mentorLabel": "Mentor",
            "source": "https://www.linkedin.com/posts/jayden-teoh_notes-on-diffusion-models-notion-activity-7221064062581796864-PN1a",
            "papers": []
          }
        ]
      },
      {
        "id": "qingyun-anne-yang",
        "name": "Qingyun (Anne) Yang",
        "school": "Vanderbilt University",
        "major": "Computer Science and Mathematics",
        "educationSource": "https://anne-yang.github.io/qingyun-yang.github.io/",
        "source": "https://anne-yang.github.io/qingyun-yang.github.io/posts/2026/04/PhD/",
        "sourceLabel": "Application blog",
        "research": [
          {
            "place": "Vanderbilt University",
            "role": "Undergraduate research, surgical guidance",
            "papers": [
              {
                "title": "Augmented Reality-Based Guidance with Deformable Registration in Head and Neck Tumor Resection",
                "venue": "MICCAI 2025",
                "authorship": "Equal first",
                "status": "Accepted",
                "url": "https://anne-yang.github.io/qingyun-yang.github.io/posts/2026/04/PhD/"
              },
              {
                "title": "Nonrigid Alignment of En Bloc Tissue Specimen to Resection Bed to Enhance Correspondence for Re-Resection Guidance",
                "venue": "SPIE Medical Imaging 2025",
                "authorship": "First",
                "status": "Accepted",
                "url": "https://anne-yang.github.io/qingyun-yang.github.io/posts/2026/04/PhD/"
              },
              {
                "title": "Automated segmentation of central airway obstruction from endoscopic video stream with deep learning",
                "venue": "SPIE Medical Imaging 2025",
                "status": "Accepted",
                "year": 2025,
                "authorship": "Eighth",
                "url": "https://facultyprofiles.vanderbilt.edu/esploro/outputs/conferenceProceeding/Automated-segmentation-of-central-airway-obstruction/991044669789703276?institution=01VAN_INST"
              }
            ],
            "mentors": "Jie Ying Wu",
            "source": "https://anne-yang.github.io/qingyun-yang.github.io/posts/2026/04/PhD/"
          },
          {
            "place": "Vanderbilt University",
            "role": "Undergraduate research, medical imaging",
            "papers": [],
            "mentors": "Bennett A. Landman",
            "source": "https://anne-yang.github.io/qingyun-yang.github.io/posts/2026/04/PhD/"
          }
        ],
        "graduationYear": 2026,
        "year": 2025,
        "paperReview": {
          "checked": "2026-11-03",
          "count": 3,
          "status": "corrected",
          "source": "https://anne-yang.github.io/qingyun-yang.github.io/",
          "note": "MICCAI 2025 and two SPIE Medical Imaging 2025 proceedings papers precede the 2025 application cycle. MIUA abstract excluded."
        }
      },
      {
        "name": "Adithya Bhaskara",
        "id": "adithya-bhaskara",
        "school": "University of Colorado Boulder",
        "major": "Computer Science and Mathematics",
        "graduationYear": 2026,
        "year": 2025,
        "source": "https://officialadithya.github.io/blog/2026/my-phd-application-experience/",
        "sourceLabel": "Application blog",
        "educationSource": "https://officialadithya.github.io/assets/pdf/resume/academic_cv.pdf",
        "research": [
          {
            "place": "University of Colorado Boulder",
            "role": "Undergraduate research, prediction markets and algorithmic economics",
            "source": "https://officialadithya.github.io/assets/pdf/resume/academic_cv.pdf",
            "papers": [
              {
                "title": "A General Theory of Liquidity Provisioning for Automated Market Makers",
                "venue": "Preprint",
                "status": "Preprint",
                "authorship": "First",
                "year": 2023,
                "url": "https://arxiv.org/abs/2311.08725v1"
              }
            ],
            "mentors": "Rafael Frongillo",
            "period": "From May 2023"
          },
          {
            "place": "University of Colorado Boulder",
            "role": "Undergraduate research, theoretical computer science",
            "source": "https://officialadithya.github.io/",
            "papers": [],
            "mentors": "Huck Bennett"
          }
        ],
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "reviewed",
          "source": "https://officialadithya.github.io/",
          "note": "Listed conference publication is EC 2026; the application-era liquidity paper remains a preprint."
        }
      },
      {
        "id": "andre-ye",
        "name": "Andre Ye",
        "school": "University of Washington",
        "year": 2024,
        "major": "Computer Science & Philosophy",
        "graduationYear": 2025,
        "educationSource": "https://andre-ye.org/assets/pdf/ye-cv.pdf",
        "source": "https://andre-ye.org/assets/pdf/phd-sop.pdf",
        "research": [
          {
            "place": "University of Washington",
            "role": "Undergraduate research",
            "mentors": "Ranjay Krishna · Amy Zhang",
            "papers": [
              {
                "venue": "CVPR 2025",
                "status": "Submitted",
                "year": 2024,
                "authorship": "First",
                "title": "Computer Vision Datasets and Models Exhibit Cultural and Linguistic Diversity in Perception",
                "url": "https://arxiv.org/abs/2310.14356v3"
              }
            ]
          },
          {
            "place": "University of Washington",
            "role": "Undergraduate research",
            "mentors": "Rose Novick · Amy Zhang",
            "papers": [
              {
                "venue": "COLM 2024",
                "status": "Accepted",
                "authorship": "First",
                "title": "Language Models as Critical Thinking Tools: A Case Study of Philosophers",
                "url": "https://arxiv.org/abs/2404.04516"
              }
            ]
          },
          {
            "place": "University of Washington",
            "role": "Research collaboration",
            "mentorLabel": "Collaborators",
            "mentors": "Taylor Sorensen · Yejin Choi · Tim Althoff",
            "papers": [
              {
                "venue": "ICML 2024",
                "status": "Accepted",
                "authorship": "Seventh",
                "title": "A Roadmap to Pluralistic Alignment",
                "url": "https://arxiv.org/abs/2402.05070"
              }
            ]
          },
          {
            "place": "University of Washington",
            "role": "Research collaboration",
            "mentors": "Mark Pock · Jared Moore",
            "mentorLabel": "With",
            "source": "https://arxiv.org/abs/2311.02294",
            "papers": [
              {
                "venue": "NeurIPS Moral Psychology and Moral Philosophy Workshop 2023",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "LLMs Grasp Morality in Concept",
                "url": "https://arxiv.org/abs/2311.02294"
              }
            ]
          },
          {
            "place": "University of Washington",
            "role": "Undergraduate research, Social Futures Lab",
            "period": "February 2022–January 2023",
            "mentors": "Amy Zhang · Quan Ze Chen",
            "mentorLabel": "Advisor & mentor",
            "source": "https://andre-ye.org/projects/confidence_contours/",
            "papers": [
              {
                "venue": "HCOMP 2023",
                "status": "Accepted",
                "authorship": "First",
                "title": "Confidence Contours: Uncertainty-Aware Annotation for Medical Semantic Segmentation",
                "url": "https://ojs.aaai.org/index.php/HCOMP/article/view/27559"
              }
            ]
          },
          {
            "place": "University of Washington",
            "role": "Research assistant, Najafian Lab, UW Medicine",
            "period": "March 2021–May 2022",
            "mentors": "Behzad Najafian",
            "source": "https://andre-ye.org/andre-ye.github.io-retired/docs/cv",
            "papers": []
          },
          {
            "place": "University of Washington",
            "role": "Research, image-generation interfaces and social perspectives",
            "source": "https://andre-ye.org/assets/pdf/phd-sop.pdf",
            "papers": []
          },
          {
            "place": "University of Washington",
            "role": "Research, machine ethics and feminist philosophy",
            "source": "https://andre-ye.org/assets/pdf/phd-sop.pdf",
            "papers": [
              {
                "venue": "Pacific University Philosophy Conference 2024",
                "status": "Accepted",
                "authorship": "First",
                "title": "And Then the Hammer Broke: Reflections on Machine Ethics from Feminist Philosophy of Science",
                "url": "https://arxiv.org/abs/2403.05805v1"
              }
            ]
          },
          {
            "place": "University of Washington",
            "role": "Cofounder and research head, Interactive Intelligence",
            "period": "January 2022–June 2023",
            "source": "https://interactive-intelligence.github.io/staff",
            "papers": []
          },
          {
            "place": "University of Washington",
            "role": "Research",
            "papers": [
              {
                "venue": "The Explicator 2022",
                "status": "Accepted",
                "authorship": "First",
                "title": "The Wartime State and the Cigarette: Darkness and Temporality in Pale Horse, Pale Rider",
                "url": "https://doi.org/10.1080/00144940.2022.2063706"
              }
            ]
          },
          {
            "place": "Deepgram",
            "role": "Research internship, speech model training",
            "period": "June–September 2022",
            "mentors": "Andrew Seagraves",
            "source": "https://andre-ye.org/andre-ye.github.io-retired/docs/cv",
            "papers": []
          }
        ]
      },
      {
        "id": "alex-zhang",
        "name": "Alex Zhang",
        "school": "Princeton University",
        "year": 2024,
        "major": "Computer Science",
        "graduationYear": 2024,
        "educationSource": "https://alexzhang13.github.io/",
        "source": "https://alexzhang13.github.io/assets/pdfs/sop.pdf",
        "research": [
          {
            "place": "Princeton University",
            "role": "Undergraduate research",
            "mentors": "Karthik Narasimhan",
            "papers": [
              {
                "venue": "ICLR 2025",
                "status": "Submitted",
                "year": 2024,
                "authorship": "Third",
                "title": "SWE-bench Multimodal: Do AI Systems Generalize to Visual Software Domains?",
                "url": "https://arxiv.org/abs/2410.03859"
              },
              {
                "venue": "SpLU-RoboNLP at ACL 2024",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Language-guided World Models: A Model-based Approach to AI Control",
                "url": "https://aclanthology.org/2024.splurobonlp-1.1/"
              },
              {
                "venue": "DMLR at ICLR 2024",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Building Scalable Video Understanding Benchmarks through Sports",
                "url": "https://arxiv.org/abs/2301.06866"
              }
            ]
          },
          {
            "place": "Princeton University",
            "role": "Research, ML systems · distributed training",
            "mentors": "Kai Li",
            "source": "https://alexzhang13.github.io/assets/pdfs/sop.pdf",
            "papers": []
          },
          {
            "place": "Princeton University",
            "role": "Undergraduate thesis, language-guided decision-making",
            "mentors": "Karthik Narasimhan",
            "source": "https://alexzhang13.github.io/assets/pdfs/sop.pdf",
            "papers": []
          },
          {
            "place": "Princeton University",
            "role": "Research collaboration",
            "mentorLabel": "Collaborator",
            "mentors": "Michael Tang",
            "papers": [
              {
                "venue": "Preprint",
                "status": "Preprint",
                "year": 2023,
                "authorship": "Equal first",
                "title": "Transaction Fee Mining and Mechanism Design",
                "url": "https://arxiv.org/abs/2302.06769"
              }
            ]
          },
          {
            "place": "Snap Research",
            "role": "Research internship, efficient recommendation systems",
            "period": "From June 2024",
            "mentors": "Neil Shah",
            "source": "https://alexzhang13.github.io/assets/pdfs/sop.pdf",
            "papers": []
          },
          {
            "place": "VantAI",
            "role": "Researcher",
            "period": "From November 2024",
            "mentors": "Luca Naef",
            "source": "https://alexzhang13.github.io/",
            "papers": []
          },
          {
            "place": "Apple",
            "role": "Internship, Siri",
            "period": "2022",
            "source": "https://alexzhang13.github.io/",
            "papers": []
          },
          {
            "place": "Ligo Biosciences",
            "role": "Open-source contributor, AlphaFold 3 GPU efficiency",
            "source": "https://alexzhang13.github.io/assets/pdfs/sop.pdf",
            "papers": []
          },
          {
            "place": "GPU MODE",
            "role": "Open-source contributor, language models for GPU kernels",
            "source": "https://alexzhang13.github.io/assets/pdfs/sop.pdf",
            "papers": []
          }
        ],
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "reviewed",
          "source": "https://alexzhang13.github.io/publications/",
          "note": "Pre-application venues are workshops. SWE-bench Multimodal at ICLR 2025 was submitted in the 2024 SOP."
        }
      },
      {
        "id": "kendall-nakai",
        "name": "Kendall Nakai",
        "school": "University of California, San Diego",
        "year": 2023,
        "major": "Cognitive Science: Human-Computer Interaction; minors in Computer Science and Design",
        "graduationYear": 2022,
        "educationSource": "https://kendallnakai.com/",
        "source": "https://kendallnakai.medium.com/breaking-down-my-phd-statement-of-purpose-38b2a845148c",
        "research": [
          {
            "place": "University of California, San Diego",
            "role": "Undergraduate research, Design Lab",
            "mentors": "Philip Guo",
            "papers": [
              {
                "venue": "ICER 2023",
                "status": "Accepted",
                "authorship": "First",
                "title": "Uncovering the Hidden Curriculum of University Computing Majors via Undergraduate-Written Mentoring Guides: A Learner-Centered Design Workflow",
                "url": "https://pg.ucsd.edu/publications/hidden-curriculum-undergrad-mentoring_ICER-2023.pdf"
              },
              {
                "venue": "Learning at Scale 2022",
                "status": "Accepted",
                "authorship": "First",
                "title": "Scaling Up Access to the Hidden Curriculum: A Design Methodology for Creating Undergraduate Mentoring Guides",
                "url": "https://pg.ucsd.edu/publications/hidden-curriculum-undergrad-mentoring_LAS-2022-WIP.pdf"
              }
            ]
          },
          {
            "place": "University of California, San Diego",
            "role": "Undergraduate research, ProtoLab · digital whiteboard collaboration",
            "mentors": "Steven Dow · Stephen MacNeil",
            "source": "https://kendallnakai.medium.com/breaking-down-my-phd-statement-of-purpose-38b2a845148c",
            "papers": [
              {
                "venue": "Creativity & Cognition 2023",
                "status": "Accepted",
                "authorship": "Sixth",
                "title": "Freeform Templates: Combining Freeform Curation with Structured Templates",
                "url": "https://arxiv.org/abs/2305.00937"
              }
            ]
          },
          {
            "place": "University of California, San Diego",
            "role": "Undergraduate research, civic problem-solving frameworks",
            "mentors": "Steven Dow · Stephen MacNeil",
            "source": "https://kendallnakai.medium.com/breaking-down-my-phd-statement-of-purpose-38b2a845148c",
            "papers": []
          },
          {
            "place": "Microsoft",
            "role": "Software engineer",
            "period": "2022–2023",
            "source": "https://kendallnakai.com/",
            "papers": []
          },
          {
            "place": "Microsoft",
            "role": "Software engineering internship, customer reports",
            "period": "Summer 2021",
            "source": "https://kendallnakai.medium.com/my-summer-2021-internship-reflection-f12e8ff1a49c",
            "papers": []
          },
          {
            "place": "Microsoft",
            "role": "Explore internship, security audit and reporting tools",
            "period": "Summer 2020",
            "source": "https://kendallnakai.medium.com/summer-intern-reflections-ee432dc3c364",
            "papers": []
          }
        ]
      },
      {
        "id": "carmel-schare",
        "name": "Carmel Schare",
        "school": "Columbia University",
        "major": "Computer Science and Mathematics",
        "educationSource": "https://schare.space/",
        "source": "https://schare.space/now.html",
        "sourceLabel": "Application blog",
        "research": [
          {
            "place": "Carnegie Mellon University",
            "role": "Research collaboration, collaborative software and CRDTs",
            "source": "https://schare.space/cv.html",
            "papers": [
              {
                "title": "Collabs: A Flexible and Performant CRDT Collaboration Framework",
                "venue": "Preprint",
                "status": "Preprint",
                "year": 2022,
                "authorship": "",
                "url": "https://arxiv.org/abs/2212.02618"
              }
            ]
          }
        ],
        "graduationYear": 2023,
        "year": 2023,
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "reviewed",
          "source": "https://schare.space/cv.html",
          "note": "Personal CV lists Collabs as arXiv, not an accepted conference paper; publication list may be incomplete."
        }
      },
      {
        "id": "chanwoo-park",
        "name": "Chanwoo Park",
        "school": "Seoul National University",
        "year": 2021,
        "major": "Statistics and Mathematics",
        "graduationYear": 2022,
        "educationSource": "https://lacuna.tiptreesystems.com/author/chanwoo-park/aut_bd1766387c204711afb46cf329b17d7d",
        "source": "https://drive.google.com/file/d/1ny4ghbUol61v26b-bi6lfylMQwOclyWZ/view",
        "research": [
          {
            "place": "Seoul National University",
            "role": "Undergraduate research internship, optimization and computer-assisted proofs",
            "period": "2020–2021",
            "mentors": "Ernest K. Ryu",
            "source": "https://drive.google.com/file/d/1ny4ghbUol61v26b-bi6lfylMQwOclyWZ/view",
            "papers": [
              {
                "venue": "NeurIPS 2021",
                "status": "Accepted",
                "authorship": "Second",
                "title": "A Geometric Structure of Acceleration and Its Role in Making Gradients Small Fast",
                "url": "https://arxiv.org/abs/2106.10439"
              },
              {
                "venue": "JMLR",
                "status": "Submitted",
                "year": 2021,
                "authorship": "First",
                "title": "Optimal First-Order Algorithms as a Function of Inequalities",
                "url": "https://jmlr.org/papers/v25/21-1256.html"
              },
              {
                "venue": "Computational Optimization and Applications",
                "status": "Submitted",
                "year": 2021,
                "authorship": "First",
                "title": "Factor-√2 Acceleration of Accelerated Gradient Methods",
                "url": "https://arxiv.org/abs/2102.07366v1"
              }
            ]
          },
          {
            "place": "Seoul National University",
            "role": "Undergraduate research, Bioinformatics and Biostatistics Lab · genetic pathway analysis",
            "mentors": "Taesung Park",
            "source": "https://drive.google.com/file/d/1ny4ghbUol61v26b-bi6lfylMQwOclyWZ/view",
            "papers": [
              {
                "venue": "Bioinformatics",
                "status": "Submitted",
                "year": 2021,
                "authorship": "First",
                "title": "DeepHisCoM: Deep Learning Pathway Analysis Using Hierarchical Structural Component Models",
                "url": "https://doi.org/10.1093/bib/bbac171"
              },
              {
                "venue": "Genomics & Informatics 2019",
                "status": "Accepted",
                "authorship": "First",
                "title": "Pure Additive Contribution of Genetic Variants to a Risk Prediction Model Using Propensity Score Matching: Application to Type 2 Diabetes",
                "url": "https://pubmed.ncbi.nlm.nih.gov/31896247/"
              }
            ]
          },
          {
            "place": "Seoul National University",
            "role": "Research, Nonparametric Inference Lab · regression and deep learning theory",
            "mentors": "Byeong U. Park",
            "source": "https://drive.google.com/file/d/1ny4ghbUol61v26b-bi6lfylMQwOclyWZ/view",
            "papers": []
          }
        ]
      },
      {
        "id": "tianwei-yin",
        "name": "Tianwei Yin",
        "school": "University of Texas at Austin",
        "year": 2021,
        "major": "Computer Science & Mathematics",
        "graduationYear": 2022,
        "educationSource": "https://tianweiy.github.io/docs/cv_tianweiy_web.pdf",
        "source": "https://tianweiy.github.io/docs/sop.pdf",
        "research": [
          {
            "place": "University of Texas at Austin",
            "role": "Undergraduate research, 3D perception for autonomous vehicles",
            "period": "2019–2021",
            "mentors": "Philipp Krähenbühl",
            "source": "https://tianweiy.github.io/docs/sop.pdf",
            "papers": [
              {
                "venue": "NeurIPS 2021",
                "status": "Accepted",
                "authorship": "First",
                "title": "Multimodal Virtual Point 3D Detection",
                "url": "https://papers.neurips.cc/paper_files/paper/2021/hash/895daa408f494ad58006c47a30f51c1f-Abstract.html"
              },
              {
                "venue": "CVPR 2021",
                "status": "Accepted",
                "authorship": "First",
                "title": "Center-Based 3D Object Detection and Tracking",
                "url": "https://openaccess.thecvf.com/content/CVPR2021/html/Yin_Center-Based_3D_Object_Detection_and_Tracking_CVPR_2021_paper.html"
              }
            ]
          },
          {
            "place": "University of Texas at Austin",
            "role": "NeurIPS nuScenes 3D Detection Challenge winner",
            "period": "2020",
            "source": "https://tianweiy.github.io/docs/cv_tianweiy_web.pdf",
            "papers": []
          },
          {
            "place": "University of Texas at Austin",
            "role": "Computer science best honors thesis award",
            "period": "June 2021",
            "source": "https://tianweiy.github.io/docs/cv_tianweiy_web.pdf",
            "papers": []
          },
          {
            "place": "Caltech",
            "role": "Research internship, accelerated MRI",
            "period": "From summer 2020",
            "mentors": "Katie Bouman · Yisong Yue · He Sun",
            "source": "https://sfp.caltech.edu/documents/17703/Final_Abstract_Book_for_Posting_937lr6m.pdf",
            "papers": [
              {
                "venue": "ML4H 2021 · Best Paper",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "End-to-End Sequential Sampling and Reconstruction for MRI",
                "url": "https://proceedings.mlr.press/v158/yin21a.html"
              }
            ]
          }
        ]
      },
      {
        "id": "eugenie-lai",
        "name": "Eugenie Lai",
        "school": "University of British Columbia",
        "year": 2020,
        "major": "Business & Computer Science",
        "graduationYear": 2021,
        "educationSource": "https://eugenielai.github.io/docs/cvs/cv-eylai.pdf",
        "source": "https://eugenielai.github.io/docs/application/sop-mit-eylai.pdf",
        "research": [
          {
            "place": "University of British Columbia",
            "role": "Undergraduate research, Data Management and Mining Lab",
            "period": "From March 2019",
            "mentors": "Rachel Pottinger",
            "source": "https://eugenielai.github.io/docs/cvs/cv-eylai.pdf",
            "papers": [
              {
                "venue": "VLDB 2021",
                "status": "Submitted",
                "year": 2020,
                "authorship": "First",
                "title": "Sequence-Aware Query Recommendation Using Deep Learning",
                "url": "https://eugenielai.github.io/assets/manus/seq-aware-query-recommendation.pdf"
              },
              {
                "venue": "ICDE 2021 · Short paper",
                "status": "Accepted",
                "year": 2020,
                "authorship": "Second",
                "title": "Summarizing Provenance of Aggregation Query Results in Relational Databases",
                "url": "https://ieeexplore.ieee.org/abstract/document/9458813"
              },
              {
                "venue": "ICDE 2020 · Short paper",
                "status": "Accepted",
                "authorship": "Second",
                "title": "Pastwatch: On the Usability of Provenance Data in Relational Databases",
                "url": "https://www.cs.ubc.ca/~mkmilani/pastwatch.pdf"
              }
            ]
          },
          {
            "place": "University of British Columbia",
            "role": "Data Science for Social Good · electric vehicle charging · KDD 2020 presentation",
            "period": "Summer 2019",
            "mentors": "Raymond Ng",
            "source": "https://eugenielai.github.io/docs/cvs/cv-eylai.pdf",
            "papers": []
          },
          {
            "place": "University of British Columbia",
            "role": "Research project, AI for irrigation",
            "period": "Spring 2020",
            "mentors": "Kevin Leyton-Brown",
            "mentorLabel": "Instructor",
            "source": "https://eugenielai.github.io/docs/cvs/cv-eylai.pdf",
            "papers": []
          },
          {
            "place": "University of British Columbia",
            "role": "Research project, online platform policy",
            "period": "Spring 2020",
            "mentors": "Arslan Aziz",
            "mentorLabel": "Instructor",
            "source": "https://eugenielai.github.io/docs/cvs/cv-eylai.pdf",
            "papers": []
          },
          {
            "place": "University of British Columbia",
            "role": "Computer science program renewal · degree planning visualization",
            "period": "August 2019–August 2020",
            "mentors": "Rachel Pottinger",
            "mentorLabel": "Collaborator",
            "source": "https://eugenielai.github.io/docs/application/sop-mit-eylai.pdf",
            "papers": []
          },
          {
            "place": "Statistics Canada",
            "role": "Software developer internship",
            "period": "September 2017–April 2018",
            "source": "https://eugenielai.github.io/docs/cvs/cv-eylai.pdf",
            "papers": []
          }
        ],
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "reviewed",
          "source": "https://eugenielai.github.io/",
          "note": "ICDE 2020 and 2021 entries are short papers; later EDBT 2023 paper excluded."
        }
      },
      {
        "id": "belinda-zou-li",
        "name": "Belinda Zou Li",
        "school": "University of Washington",
        "year": 2019,
        "major": "Computer Science",
        "graduationYear": 2019,
        "educationSource": "https://belindal.github.io/assets/pdfs/Li_Belinda_Zou_CV.pdf",
        "source": "https://docs.google.com/document/d/1BHHX8R1nVTuE9qKIq7B9GA02mB4Rg6ZOb5OSNAoajAc/edit",
        "research": [
          {
            "place": "University of Washington",
            "role": "Undergraduate research, coreference resolution and entity sentiment",
            "period": "2018–2019",
            "mentors": "Luke Zettlemoyer",
            "source": "https://docs.google.com/document/d/1BHHX8R1nVTuE9qKIq7B9GA02mB4Rg6ZOb5OSNAoajAc/edit",
            "papers": [
              {
                "venue": "ACL 2020",
                "status": "Submitted",
                "year": 2019,
                "authorship": "First",
                "title": "Active Learning for Coreference Resolution using Discrete Annotation",
                "url": "https://aclanthology.org/2020.acl-main.738/"
              },
              {
                "venue": "Preprint",
                "status": "Preprint",
                "year": 2018,
                "authorship": "First",
                "title": "Document-Level Entity-to-Entity Sentiment Analysis with LSTM-Based Models",
                "url": "https://docs.google.com/document/d/1BHHX8R1nVTuE9qKIq7B9GA02mB4Rg6ZOb5OSNAoajAc/edit"
              }
            ]
          },
          {
            "place": "University of Washington",
            "role": "Teaching assistant, upper-level computer science courses",
            "source": "https://docs.google.com/document/d/1BHHX8R1nVTuE9qKIq7B9GA02mB4Rg6ZOb5OSNAoajAc/edit",
            "papers": []
          },
          {
            "place": "Facebook",
            "role": "Software engineer, AI Applied Research · AI Integrity",
            "period": "From August 2019",
            "source": "https://belindal.github.io/old/index.html",
            "papers": [
              {
                "venue": "ACL 2020",
                "status": "Submitted",
                "year": 2019,
                "authorship": "Second",
                "title": "If You Can't Detect Them, Join Them: A Multitask Based Approach for Identifying Misinformation",
                "url": "https://docs.google.com/document/d/1BHHX8R1nVTuE9qKIq7B9GA02mB4Rg6ZOb5OSNAoajAc/edit"
              }
            ]
          },
          {
            "place": "Facebook",
            "role": "Research, factual knowledge and post integrity embeddings",
            "period": "From October 2019",
            "source": "https://docs.google.com/document/d/1BHHX8R1nVTuE9qKIq7B9GA02mB4Rg6ZOb5OSNAoajAc/edit",
            "papers": []
          },
          {
            "place": "Facebook",
            "role": "Software engineering internship, bot detection",
            "period": "June–August 2018",
            "source": "https://belindal.github.io/assets/pdfs/Li_Belinda_Zou_CV.pdf",
            "papers": []
          }
        ],
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "reviewed",
          "source": "https://belindal.github.io/",
          "note": "Earliest listed main-conference papers are ACL/EMNLP 2020, after the 2019 application; retain application-era submitted statuses."
        }
      },
      {
        "id": "ameya-daigavane",
        "name": "Ameya Daigavane",
        "school": "IIT Guwahati",
        "year": 2021,
        "major": "Computer Science and Engineering",
        "educationSource": "https://ameya98.github.io/pdfs/AmeyaCV.pdf",
        "source": "https://docs.google.com/document/d/1QKInEBpoIWMGTZeDhZ8nI-TkJuSRr5YCD23-zMMlYGA/edit?usp=sharing",
        "research": [
          {
            "place": "Google Research",
            "role": "Predoctoral research, private graph neural networks",
            "papers": [
              {
                "title": "Node-Level Differentially Private Graph Neural Networks",
                "venue": "ICLR 2022",
                "status": "Submitted",
                "year": 2021,
                "authorship": "First",
                "url": "https://docs.google.com/document/d/1QKInEBpoIWMGTZeDhZ8nI-TkJuSRr5YCD23-zMMlYGA/edit?usp=sharing"
              }
            ],
            "mentors": "Gaurav Aggarwal · Prateek Jain · Abhradeep Thakurta",
            "period": "From September 2020",
            "source": "https://docs.google.com/document/d/1QKInEBpoIWMGTZeDhZ8nI-TkJuSRr5YCD23-zMMlYGA/edit?usp=sharing"
          },
          {
            "place": "Google Research",
            "role": "Interactive explanations and visualizations of graph neural networks",
            "papers": [
              {
                "title": "Understanding Convolutions on Graphs",
                "venue": "Distill",
                "status": "Accepted",
                "year": 2021,
                "authorship": "First",
                "url": "https://distill.pub/2021/understanding-gnns/"
              },
              {
                "title": "Interactive Media for Understanding ML Methods: A Case-Study on Graph Neural Networks",
                "venue": "Rethinking ML Papers Workshop at ICLR 2021",
                "status": "Accepted",
                "year": 2021,
                "authorship": "First",
                "url": "https://docs.google.com/document/d/1QKInEBpoIWMGTZeDhZ8nI-TkJuSRr5YCD23-zMMlYGA/edit?usp=sharing"
              }
            ],
            "mentors": "Balaraman Ravindran · Gaurav Aggarwal",
            "source": "https://docs.google.com/document/d/1QKInEBpoIWMGTZeDhZ8nI-TkJuSRr5YCD23-zMMlYGA/edit?usp=sharing"
          },
          {
            "place": "Google Research",
            "role": "Collaboration with Google Accelerated Science, cell-imaging visualization and disease signatures",
            "papers": [
              {
                "title": "Integrating Deep Learning and Unbiased Automated High-Content Screening to Identify Complex Disease Signatures in Human Fibroblasts",
                "venue": "Nature Communications",
                "status": "Accepted",
                "year": 2021,
                "url": "https://www.nature.com/articles/s41467-022-28423-4"
              }
            ],
            "source": "https://docs.google.com/document/d/1QKInEBpoIWMGTZeDhZ8nI-TkJuSRr5YCD23-zMMlYGA/edit?usp=sharing"
          },
          {
            "place": "NASA Jet Propulsion Laboratory",
            "role": "Research internship, spacecraft time-series anomaly detection",
            "papers": [
              {
                "title": "Unsupervised Detection of Magnetic Field Boundary Crossings From Plasma Spectrometer Data",
                "venue": "Computers and Geosciences",
                "status": "Submitted",
                "year": 2021,
                "authorship": "First",
                "url": "https://docs.google.com/document/d/1QKInEBpoIWMGTZeDhZ8nI-TkJuSRr5YCD23-zMMlYGA/edit?usp=sharing",
                "also": [
                  {
                    "venue": "MiLeTS Workshop at KDD 2020 · Oral",
                    "status": "Accepted",
                    "url": "https://docs.google.com/document/d/1QKInEBpoIWMGTZeDhZ8nI-TkJuSRr5YCD23-zMMlYGA/edit?usp=sharing"
                  }
                ]
              },
              {
                "title": "Resource Consumption and Radiation Tolerance Assessment for Data Analysis Algorithms Onboard Spacecraft",
                "venue": "IEEE Transactions on Aerospace and Electronic Systems",
                "status": "Submitted",
                "year": 2021,
                "authorship": "Second",
                "url": "https://docs.google.com/document/d/1QKInEBpoIWMGTZeDhZ8nI-TkJuSRr5YCD23-zMMlYGA/edit?usp=sharing"
              }
            ],
            "mentors": "Kiri Wagstaff · Gary Doran",
            "period": "2019–2020",
            "source": "https://docs.google.com/document/d/1QKInEBpoIWMGTZeDhZ8nI-TkJuSRr5YCD23-zMMlYGA/edit?usp=sharing"
          }
        ],
        "graduationYear": 2020
      },
      {
        "id": "xiaochen-zhu",
        "name": "Xiaochen Zhu",
        "school": "National University of Singapore",
        "year": 2023,
        "major": "Computer Science and Mathematics",
        "educationSource": "https://xczhu.com",
        "source": "https://drive.google.com/file/d/1FwdEOSTFDorA2ssdi7QRRNXdRuGadt_A/view?usp=sharing",
        "research": [
          {
            "place": "National University of Singapore",
            "role": "Honors thesis, link-local differential privacy for graph neural networks",
            "papers": [
              {
                "title": "Blink: Link Local Differential Privacy in Graph Neural Networks",
                "venue": "CCS 2023",
                "status": "Accepted",
                "year": 2023,
                "authorship": "First",
                "url": "https://drive.google.com/file/d/1FwdEOSTFDorA2ssdi7QRRNXdRuGadt_A/view?usp=sharing"
              },
              {
                "title": "Link Local Differential Privacy in GNNs via Bayesian Estimation",
                "venue": "SIGMOD 2023 Student Research Competition Abstract",
                "status": "Accepted",
                "year": 2023,
                "authorship": "Sole",
                "url": "https://drive.google.com/file/d/1FwdEOSTFDorA2ssdi7QRRNXdRuGadt_A/view?usp=sharing"
              }
            ],
            "mentors": "Xiaokui Xiao · Vincent Tan",
            "source": "https://drive.google.com/file/d/1FwdEOSTFDorA2ssdi7QRRNXdRuGadt_A/view?usp=sharing"
          },
          {
            "place": "National University of Singapore",
            "role": "Research assistant, split-learning attacks and distribution leakage in federated learning",
            "papers": [
              {
                "title": "Passive Inference Attacks on Split Learning via Adversarial Regularization",
                "venue": "WWW 2024",
                "status": "Submitted",
                "year": 2023,
                "authorship": "First",
                "url": "https://drive.google.com/file/d/1FwdEOSTFDorA2ssdi7QRRNXdRuGadt_A/view?usp=sharing"
              },
              {
                "title": "On Data Distribution Leakage in Cross-Silo Federated Learning",
                "venue": "IEEE TKDE",
                "status": "Submitted",
                "year": 2023,
                "url": "https://drive.google.com/file/d/1FwdEOSTFDorA2ssdi7QRRNXdRuGadt_A/view?usp=sharing"
              }
            ],
            "mentors": "Xiaokui Xiao",
            "source": "https://drive.google.com/file/d/1FwdEOSTFDorA2ssdi7QRRNXdRuGadt_A/view?usp=sharing"
          },
          {
            "place": "National University of Singapore",
            "role": "Full-time research assistant, federated kernelized bandits and Gaussian-process optimization",
            "papers": [],
            "period": "From 2023",
            "source": "https://drive.google.com/file/d/1FwdEOSTFDorA2ssdi7QRRNXdRuGadt_A/view?usp=sharing"
          },
          {
            "place": "Institute for Mathematical Sciences",
            "role": "Research internship, encrypted vertical federated learning for financial applications",
            "papers": [],
            "period": "Summer 2021",
            "source": "https://drive.google.com/file/d/1FwdEOSTFDorA2ssdi7QRRNXdRuGadt_A/view?usp=sharing"
          }
        ],
        "graduationYear": 2023
      },
      {
        "id": "xingjian-bai",
        "name": "Xingjian Bai",
        "school": "University of Oxford",
        "year": 2023,
        "major": "Mathematics and Computer Science (BA + integrated MMath)",
        "educationSource": "https://xingjianbai.com/files/XingjianBAI.pdf",
        "source": "https://xingjianbai.com/",
        "research": [
          {
            "place": "University of Oxford",
            "role": "Undergraduate research, learning-augmented sorting algorithms",
            "papers": [
              {
                "title": "Sorting with Predictions",
                "venue": "NeurIPS 2023",
                "status": "Accepted",
                "year": 2023,
                "authorship": "First",
                "url": "https://arxiv.org/abs/2311.00749"
              }
            ],
            "mentors": "Christian Coester",
            "period": "March–August 2023",
            "source": "https://xingjianbai.com/files/XingjianBAI.pdf"
          },
          {
            "place": "University of Oxford",
            "role": "Undergraduate research, Wasserstein distributional robustness",
            "papers": [
              {
                "title": "Wasserstein Distributional Robustness of Neural Networks",
                "venue": "NeurIPS 2023",
                "status": "Accepted",
                "year": 2023,
                "authorship": "First",
                "url": "https://arxiv.org/abs/2306.09844"
              }
            ],
            "mentors": "Jan Obłój",
            "period": "July 2022–April 2023",
            "source": "https://xingjianbai.com/files/XingjianBAI.pdf"
          },
          {
            "place": "University of Oxford",
            "role": "AI Safety Research Lab, reward overoptimization",
            "papers": [
              {
                "title": "Goodhart’s Law in Reinforcement Learning",
                "venue": "ICLR 2024",
                "status": "Submitted",
                "year": 2023,
                "authorship": "Third",
                "url": "https://arxiv.org/abs/2310.09144"
              }
            ],
            "mentors": "Joar Skalse",
            "period": "November 2022–March 2023",
            "source": "https://xingjianbai.com/files/XingjianBAI.pdf"
          },
          {
            "place": "University of Oxford",
            "role": "Visual Geometry Group, diffusion models",
            "papers": [],
            "mentors": "Christian Rupprecht · Luke Melas-Kyriazi",
            "period": "From October 2023",
            "source": "https://xingjianbai.com/files/XingjianBAI.pdf"
          },
          {
            "place": "Stanford University",
            "role": "Visiting research internship, neurosymbolic control for diffusion models",
            "papers": [],
            "mentors": "Jiajun Wu · Weiyu Liu · Joy Hsu",
            "period": "July–September 2023",
            "source": "https://xingjianbai.com/files/XingjianBAI.pdf"
          },
          {
            "place": "University of Oxford",
            "role": "Undergraduate research collaboration, multimodal hate detection",
            "papers": [
              {
                "title": "Memes in the Wild: Assessing the Generalizability of the Hateful Memes Challenge Dataset",
                "venue": "WOAH Workshop at ACL 2021",
                "status": "Accepted",
                "year": 2021,
                "authorship": "Sixth",
                "url": "https://aclanthology.org/2021.woah-1.4/"
              }
            ],
            "source": "https://aclanthology.org/2021.woah-1.4/"
          },
          {
            "place": "University of Oxford",
            "role": "Mathematical modeling, invasive species control",
            "papers": [
              {
                "title": "Containing Invasive Species via Cellular Automaton and AI",
                "venue": "The UMAP Journal",
                "status": "Accepted",
                "year": 2021,
                "authorship": "First",
                "url": "https://xingjianbai.com/"
              }
            ],
            "source": "https://xingjianbai.com/"
          }
        ],
        "graduationYear": 2024,
        "sourceLabel": "Profile & papers",
        "paperReview": {
          "checked": "2026-11-03",
          "count": 2,
          "status": "limited",
          "source": "https://xingjianbai.com/",
          "note": "Original SOP link is unavailable. Dated CV and publication records support two accepted NeurIPS 2023 papers; 2024 acceptances are not backdated."
        }
      }
    ]
  },
  {
    "id": "stanford",
    "name": "Stanford",
    "program": "Computer Science PhD",
    "applicants": [
      {
        "id": "ben-shi",
        "name": "Ben Shi",
        "school": "Princeton University",
        "year": 2025,
        "major": "Computer Science",
        "graduationYear": 2024,
        "educationSource": "https://theses-dissertations.princeton.edu/entities/publication/b44df82b-eec7-4dcd-836a-dd0de73f370c/full",
        "source": "https://docs.google.com/document/d/1nlLtrA8GDjRY4TTLNFUd3rtFteBVwK7_mpH3cMWiMFw/edit",
        "research": [
          {
            "place": "Princeton University",
            "role": "Research, Princeton Language and Intelligence",
            "mentors": "Karthik Narasimhan · Shunyu Yao",
            "source": "https://benshi34.github.io/",
            "papers": [
              {
                "venue": "NeurIPS 2025",
                "status": "Accepted",
                "authorship": "First",
                "title": "When Models Know More Than They Can Explain: Quantifying Knowledge Transfer in Human-AI Collaboration",
                "url": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/975d11c51406cd10be48e47b36fb8698-Abstract-Conference.html",
                "also": [
                  {
                    "venue": "COLM 2025 XLLM Workshop",
                    "status": "Accepted",
                    "url": "https://xllm-reasoning-planning-workshop.github.io/"
                  }
                ]
              },
              {
                "venue": "COLM 2024",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Can Language Models Solve Olympiad Programming?",
                "url": "https://arxiv.org/abs/2404.10952v1"
              }
            ]
          },
          {
            "place": "Princeton University",
            "role": "Research, Princeton Language and Intelligence",
            "mentors": "Karthik Narasimhan",
            "source": "https://arxiv.org/abs/2504.04332v1",
            "papers": [
              {
                "venue": "COLM 2025",
                "status": "Accepted",
                "authorship": "First",
                "title": "IMPersona: Evaluating Individual Level LM Impersonation",
                "url": "https://arxiv.org/abs/2504.04332v1",
                "also": [
                  {
                    "venue": "SoLaR Workshop 2025",
                    "status": "Accepted",
                    "url": "https://benshi34.github.io/"
                  }
                ]
              }
            ]
          },
          {
            "place": "Princeton University",
            "role": "Research, Princeton Language and Intelligence",
            "mentors": "Danqi Chen",
            "mentorLabel": "With",
            "source": "https://arxiv.org/abs/2407.12883v1",
            "papers": [
              {
                "venue": "ICLR 2025",
                "status": "Accepted",
                "authorship": "Eighth",
                "title": "BRIGHT: A Realistic and Challenging Benchmark for Reasoning-Intensive Retrieval",
                "url": "https://proceedings.iclr.cc/paper_files/paper/2025/hash/7a0f8055c838df8e62329a76c7c6403d-Abstract-Conference.html"
              }
            ]
          },
          {
            "place": "Princeton University",
            "role": "Undergraduate thesis, memory-augmented coding agents",
            "period": "2024",
            "mentors": "Karthik Narasimhan",
            "source": "https://theses-dissertations.princeton.edu/entities/publication/b44df82b-eec7-4dcd-836a-dd0de73f370c/full",
            "papers": []
          },
          {
            "place": "Sierra",
            "role": "Research, voice agent post-training",
            "period": "2025",
            "source": "https://sierra.ai/blog/voice-post-training",
            "papers": []
          },
          {
            "place": "Sierra",
            "role": "Research, Tau3-Bench · multimodal and voice-agent evaluation",
            "source": "https://docs.google.com/document/d/1nlLtrA8GDjRY4TTLNFUd3rtFteBVwK7_mpH3cMWiMFw/edit",
            "papers": []
          },
          {
            "place": "Independent research",
            "role": "Research with West Virginia teachers, AI-generated educational worksheets",
            "source": "https://docs.google.com/document/d/1nlLtrA8GDjRY4TTLNFUd3rtFteBVwK7_mpH3cMWiMFw/edit",
            "papers": []
          },
          {
            "place": "Meta",
            "role": "Professional experience",
            "source": "https://sierra.ai/author/ben-shi",
            "papers": []
          }
        ]
      },
      {
        "name": "Miguel Liu-Schiaffini",
        "id": "miguel-liu-schiaffini",
        "school": "Caltech",
        "major": "Computer Science",
        "graduationYear": 2025,
        "year": 2024,
        "source": "https://mliuschi.github.io/assets/pdf/Miguel_Liu_Schiaffini_CV.pdf",
        "sourceLabel": "View CV",
        "educationSource": "https://mliuschi.github.io/assets/pdf/Miguel_Liu_Schiaffini_CV.pdf",
        "research": [
          {
            "place": "NVIDIA Research",
            "role": "Research internship, function-space diffusion models",
            "source": "https://mliuschi.github.io/assets/pdf/Miguel_Liu_Schiaffini_CV.pdf",
            "papers": [],
            "mentors": "Nikola Kovachki · Jean Kossaifi · Jan Kautz",
            "period": "From June 2024"
          },
          {
            "place": "Caltech",
            "role": "Undergraduate research, neural operators and scientific machine learning",
            "source": "https://mliuschi.github.io/assets/pdf/Miguel_Liu_Schiaffini_CV.pdf",
            "papers": [
              {
                "title": "Unifying Subsampling Pattern Variations for Compressed Sensing MRI with Neural Operators",
                "venue": "NeurIPS 2024 Machine Learning and Compression Workshop",
                "status": "Accepted",
                "authorship": "Fourth",
                "year": 2024,
                "url": "https://arxiv.org/abs/2410.16290v1"
              },
              {
                "title": "Neural Operators with Localized Integral and Differential Kernels",
                "venue": "ICML 2024",
                "status": "Accepted",
                "authorship": "Equal first",
                "year": 2024,
                "url": "https://arxiv.org/abs/2402.16845"
              },
              {
                "title": "Neural Operators for Accelerating Scientific Simulations and Design",
                "venue": "Nature Reviews Physics",
                "status": "Accepted",
                "authorship": "Fourth",
                "year": 2024,
                "url": "https://www.nature.com/articles/s42254-024-00712-5"
              },
              {
                "title": "Towards Enforcing Hard Physics Constraints in Operator Learning Frameworks",
                "venue": "ICML 2024 AI for Science Workshop",
                "status": "Accepted",
                "authorship": "Equal first",
                "year": 2024,
                "url": "https://mliuschi.github.io/assets/pdf/Miguel_Liu_Schiaffini_CV.pdf"
              },
              {
                "title": "Tipping Point Forecasting in Non-Stationary Dynamics on Function Spaces",
                "venue": "Preprint",
                "status": "Preprint",
                "authorship": "First",
                "year": 2023,
                "url": "https://arxiv.org/abs/2308.08794v1"
              },
              {
                "title": "Learning Dissipative Dynamics in Chaotic Systems",
                "venue": "NeurIPS 2022",
                "status": "Accepted",
                "authorship": "Equal first",
                "year": 2022,
                "url": "https://arxiv.org/abs/2106.06898"
              }
            ],
            "mentors": "Anima Anandkumar",
            "period": "From September 2021"
          },
          {
            "place": "University of Texas Institute for Geophysics",
            "role": "Research internship, glacial ice thickness and Martian terrain",
            "source": "https://mliuschi.github.io/assets/pdf/Miguel_Liu_Schiaffini_CV.pdf",
            "papers": [
              {
                "title": "Ice Thickness From Deep Learning and Conditional Random Fields: Application to Ice-Penetrating Radar Data With Radiometric Validation",
                "venue": "IEEE Transactions on Geoscience and Remote Sensing",
                "status": "Accepted",
                "authorship": "First",
                "year": 2022,
                "url": "https://ieeexplore.ieee.org/abstract/document/9916288"
              }
            ],
            "mentors": "Gregory Ng · Cyril Grima · Duncan Young",
            "period": "2019; 2020–2023",
            "mentorLabel": "Collaborators"
          }
        ]
      },
      {
        "id": "rishabh-ranjan",
        "name": "Rishabh Ranjan",
        "school": "IIT Delhi",
        "year": 2022,
        "source": "https://rishabh-ranjan.github.io/assets/phd_sop.pdf",
        "major": "Computer Science and Engineering",
        "graduationYear": 2022,
        "educationSource": "https://github.com/rishabh-ranjan/rishabh-ranjan.github.io/blob/c41e5d6ee935be7df3ed7e64e4c49d711e2ac24a/assets/resume.pdf",
        "research": [
          {
            "place": "Carnegie Mellon University",
            "role": "Research internship, learning with noisy labels",
            "period": "From October 2022",
            "mentors": "Zachary Lipton",
            "source": "https://github.com/rishabh-ranjan/rishabh-ranjan.github.io/blob/c41e5d6ee935be7df3ed7e64e4c49d711e2ac24a/assets/resume.pdf",
            "papers": []
          },
          {
            "place": "IIT Delhi",
            "role": "Undergraduate thesis, neuro-symbolic reasoning and neural ILP · best undergraduate thesis award",
            "mentors": "Mausam · Parag Singla",
            "source": "https://rishabh-ranjan.github.io/assets/phd_sop.pdf",
            "papers": [
              {
                "venue": "NeurIPS 2022",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "A Solver-Free Framework for Scalable Learning in Neural ILP Architectures",
                "url": "https://proceedings.neurips.cc/paper_files/paper/2022/file/3469b211b829b39d2b0cfd3b880a869c-Paper-Conference.pdf"
              }
            ]
          },
          {
            "place": "IIT Delhi",
            "role": "Research, graph machine learning · with IBM Research and University of Illinois Chicago",
            "mentors": "Sayan Ranu",
            "papers": [
              {
                "venue": "NeurIPS 2022",
                "status": "Accepted",
                "authorship": "First",
                "title": "GREED: A Neural Framework for Learning Graph Distance Functions",
                "url": "https://papers.neurips.cc/paper_files/paper/2022/hash/8d492b8a6201d83d1015af9e264f0bf2-Abstract-Conference.html"
              }
            ]
          },
          {
            "place": "IIT Delhi",
            "role": "Research, distributed systems verification · IARCS SAT+SMT 2020 presentation",
            "period": "From summer 2020",
            "mentors": "Subodh Sharma",
            "source": "https://sat-smt-ws.gitlab.io/2020/programme.html",
            "papers": [
              {
                "venue": "ASE 2022",
                "status": "Accepted",
                "authorship": "First",
                "title": "Exploiting Epochs and Symmetries in Analysing MPI Programs",
                "url": "https://conf.researchr.org/details/ase-2022/ase-2022-research-papers/90/Exploiting-Epochs-and-Symmetries-in-Analysing-MPI-Programs"
              }
            ]
          },
          {
            "place": "IIT Delhi",
            "role": "President's Gold Medal",
            "period": "2022",
            "source": "https://pastconvocation.iitd.ac.in/2022/medals-awards.php",
            "papers": []
          },
          {
            "place": "Samsung Electronics",
            "role": "Internship, semantic search",
            "period": "May–July 2021",
            "mentors": "Jongjin Bae",
            "mentorLabel": "Supervisor",
            "source": "https://github.com/rishabh-ranjan/rishabh-ranjan.github.io/blob/c41e5d6ee935be7df3ed7e64e4c49d711e2ac24a/assets/resume.pdf",
            "papers": []
          }
        ]
      },
      {
        "id": "chenglei-si",
        "name": "Chenglei Si",
        "school": "University of Maryland",
        "year": 2022,
        "source": "https://drive.google.com/file/d/1fmp1SjQlqNhb6rniF7HBuF3Pxj9iz0TO/view",
        "major": "Computer Science & Linguistics",
        "graduationYear": 2023,
        "educationSource": "https://bisi.umd.edu/news-events/news/august-2023-graduates",
        "research": [
          {
            "place": "University of Maryland",
            "role": "Research, question answering",
            "mentors": "Jordan Boyd-Graber",
            "source": "https://drive.google.com/file/d/1fmp1SjQlqNhb6rniF7HBuF3Pxj9iz0TO/view",
            "papers": [
              {
                "venue": "Findings of EMNLP 2022",
                "status": "Accepted",
                "authorship": "First",
                "title": "Re-examining Calibration: The Case of Question Answering",
                "url": "https://arxiv.org/pdf/2205.12507"
              },
              {
                "venue": "EMNLP 2021",
                "status": "Accepted",
                "authorship": "First",
                "title": "What’s in a Name? Answer Equivalence for Open-Domain Question Answering",
                "url": "https://aclanthology.org/2021.emnlp-main.757.pdf"
              }
            ]
          },
          {
            "place": "Microsoft",
            "role": "Research internship, language model reliability",
            "period": "2022",
            "mentors": "Zhe Gan · Zhengyuan Yang · Lijuan Wang",
            "mentorLabel": "Collaborators",
            "source": "https://arxiv.org/pdf/2210.09150",
            "papers": [
              {
                "venue": "ICLR 2023",
                "status": "Submitted",
                "year": 2022,
                "authorship": "First",
                "title": "Prompting GPT-3 To Be Reliable",
                "url": "https://arxiv.org/pdf/2210.09150"
              }
            ]
          },
          {
            "place": "Tsinghua University",
            "role": "Research internship, robust Chinese language models",
            "period": "2020–2022",
            "mentors": "Zhiyuan Liu",
            "mentorLabel": "Mentor",
            "source": "https://noviscl.github.io/",
            "papers": [
              {
                "venue": "Preprint",
                "status": "Preprint",
                "year": 2022,
                "authorship": "First",
                "title": "READIN: A Chinese Multi-Task Benchmark with Realistic and Diverse Input Noises",
                "url": "https://arxiv.org/abs/2302.07324v1"
              },
              {
                "venue": "TACL",
                "status": "Submitted",
                "year": 2021,
                "authorship": "Equal first",
                "title": "Sub-Character Tokenization for Chinese Pretrained Language Models",
                "url": "https://arxiv.org/abs/2106.00400v2"
              },
              {
                "venue": "Findings of ACL 2021",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Better Robustness by More Coverage: Adversarial and Mixup Data Augmentation for Robust Finetuning",
                "url": "https://aclanthology.org/2021.findings-acl.137.pdf"
              }
            ]
          },
          {
            "place": "NYU / Princeton University",
            "role": "Research collaboration",
            "mentors": "He He · Danqi Chen",
            "mentorLabel": "Collaborators",
            "papers": [
              {
                "venue": "ICLR 2023",
                "status": "Submitted",
                "year": 2022,
                "authorship": "First",
                "title": "What Spurious Features Can Pretrained Language Models Combat?",
                "url": "https://drive.google.com/file/d/1fmp1SjQlqNhb6rniF7HBuF3Pxj9iz0TO/view"
              }
            ]
          },
          {
            "place": "HFL · HIT & iFLYTEK",
            "role": "Research internship and collaboration",
            "period": "2020–2021",
            "mentors": "Yiming Cui · Ziqing Yang",
            "mentorLabel": "Collaborators",
            "source": "https://aclanthology.org/2021.findings-acl.56.pdf",
            "papers": [
              {
                "venue": "*SEM 2021",
                "status": "Accepted",
                "authorship": "Third",
                "title": "Adversarial Training for Machine Reading Comprehension with Virtual Embeddings",
                "url": "https://aclanthology.org/2021.starsem-1.30/"
              },
              {
                "venue": "Findings of ACL 2021",
                "status": "Accepted",
                "authorship": "First",
                "title": "Benchmarking Robustness of Machine Reading Comprehension Models",
                "url": "https://aclanthology.org/2021.findings-acl.56.pdf"
              },
              {
                "venue": "COLING 2020",
                "status": "Accepted",
                "authorship": "Third",
                "title": "CharBERT: Character-aware Pre-trained Language Model",
                "url": "https://aclanthology.org/2020.coling-main.4/"
              }
            ]
          },
          {
            "place": "National University of Singapore",
            "role": "Research",
            "period": "2018–2019",
            "mentors": "Min-Yen Kan",
            "mentorLabel": "Mentor",
            "source": "https://arxiv.org/pdf/1910.12391",
            "papers": [
              {
                "venue": "Asian Translation Workshop 2019",
                "status": "Accepted",
                "authorship": "First",
                "title": "Sentiment Aware Neural Machine Translation",
                "url": "https://aclanthology.org/D19-5227/"
              },
              {
                "venue": "Preprint",
                "status": "Preprint",
                "year": 2019,
                "authorship": "First",
                "title": "What Does BERT Learn from Multiple-Choice Reading Comprehension Datasets?",
                "url": "https://arxiv.org/pdf/1910.12391"
              },
              {
                "venue": "Extracting Structured Knowledge from Scientific Publications Workshop 2019",
                "status": "Accepted",
                "authorship": "Second",
                "title": "Dataset Mention Extraction and Classification",
                "url": "https://aclanthology.org/W19-2604/"
              }
            ]
          }
        ]
      },
      {
        "id": "daneshvar-amrollahi",
        "name": "Daneshvar Amrollahi",
        "school": "University of Tehran",
        "year": 2022,
        "source": "https://drive.google.com/file/d/1UTYiKBmxEgfLLQVeK_Vcchax4gM_7cq9/view",
        "major": "Computer Engineering (Software)",
        "graduationYear": 2023,
        "educationSource": "https://cs.stanford.edu/~daneshva/files/CV.pdf",
        "research": [
          {
            "place": "EPFL",
            "role": "Research internship, Dependable Systems Lab · loop summarization in KLEE · Summer@EPFL fellow",
            "period": "July–August 2022",
            "mentors": "George Candea",
            "source": "https://cs.stanford.edu/~daneshva/files/CV.pdf",
            "papers": []
          },
          {
            "place": "ETH Zürich",
            "role": "Research internship, Go initialization verification",
            "period": "2022",
            "mentors": "João C. Pereira",
            "source": "https://drive.google.com/file/d/1UTYiKBmxEgfLLQVeK_Vcchax4gM_7cq9/view",
            "papers": []
          },
          {
            "place": "TU Wien",
            "role": "Research internship, Automated Program Reasoning, loop invariants and synthesis",
            "period": "July 2021–February 2022",
            "mentors": "Laura Kovács · Ezio Bartocci",
            "source": "https://cs.stanford.edu/~daneshva/files/CV.pdf",
            "papers": [
              {
                "venue": "SAS 2022 · Young Researcher Best Paper",
                "status": "Accepted",
                "authorship": "First",
                "title": "Solving Invariant Generation for Unsolvable Loops",
                "url": "https://arxiv.org/pdf/2206.06943"
              },
              {
                "venue": "Formal Aspects of Computing 2022",
                "status": "Accepted",
                "authorship": "Second",
                "title": "Algebra-Based Reasoning for Loop Synthesis",
                "url": "https://arxiv.org/pdf/2206.11495"
              }
            ]
          },
          {
            "place": "ACM-ICPC",
            "role": "West Asia Regional, eighth place at Tehran site",
            "period": "2020",
            "source": "https://cs.stanford.edu/~daneshva/files/CV.pdf",
            "papers": []
          }
        ]
      },
      {
        "id": "jason-wei",
        "name": "Jason Wei",
        "school": "Dartmouth College",
        "year": 2021,
        "source": "https://jasonwei20.github.io/files/2021_Stanford_SoP.pdf",
        "major": "Computer Science",
        "graduationYear": 2020,
        "educationSource": "https://students.dartmouth.edu/fellowships/news/2019/05/three-undergraduates-win-national-scholarships",
        "paperReview": {
          "checked": "2026-11-03",
          "count": 5,
          "status": "Five qualifying papers; three format-based exclusions",
          "source": "https://www.jasonwei.net/papers",
          "note": "The previous count of 10 included short papers. EDA and Text Augmentation are explicitly short. Good-Enough Example Extrapolation is inferred short from its five-page main text; the two NAACL papers are inferred short from five-page main texts and official videos of about seven minutes, matching NAACL's short-paper format. These three exclusions are evidence-based inferences, not explicit track confirmations. Five remaining full conference papers were checked against the proceedings."
        },
        "research": [
          {
            "place": "Google Brain",
            "role": "AI residency, syntactic rule learning",
            "period": "October 2020–2021",
            "mentors": "Dan Garrette · Tal Linzen · Ellie Pavlick",
            "mentorLabel": "Collaborators",
            "source": "https://static1.squarespace.com/static/633a6c0dd119b45af0d898c2/t/684a6c4bfd10a74fd9082d26/1749707851843/Jason_Wei___CV.pdf",
            "papers": [
              {
                "venue": "EMNLP 2021",
                "status": "Accepted",
                "authorship": "First",
                "title": "Frequency Effects on Syntactic Rule-Learning in Transformers",
                "url": "https://research.google/pubs/frequency-effects-on-syntactic-rule-learning-in-transformers/"
              }
            ]
          },
          {
            "place": "Google Brain",
            "role": "Research, text data augmentation",
            "source": "https://aclanthology.org/2021.emnlp-main.479.pdf",
            "papers": [
              {
                "venue": "EMNLP 2021 · Short paper (inferred)",
                "status": "Accepted",
                "authorship": "First",
                "title": "Good-Enough Example Extrapolation",
                "url": "https://aclanthology.org/2021.emnlp-main.479/"
              }
            ]
          },
          {
            "place": "Google Brain",
            "role": "AI residency, zero-shot text style transfer",
            "mentors": "Emily Reif · Daphne Ippolito",
            "mentorLabel": "Collaborators",
            "source": "https://arxiv.org/pdf/2109.03910v1",
            "papers": [
              {
                "venue": "Preprint",
                "status": "Preprint",
                "year": 2021,
                "authorship": "Sixth",
                "title": "A Recipe for Arbitrary Text Style Transfer with Large Language Models",
                "url": "https://arxiv.org/abs/2109.03910v1"
              }
            ]
          },
          {
            "place": "Google Brain",
            "role": "AI residency, instruction tuning",
            "period": "2020–2021",
            "mentors": "Adams Wei Yu",
            "mentorLabel": "Mentor",
            "source": "https://adamsyu.github.io/",
            "papers": [
              {
                "venue": "Preprint",
                "status": "Preprint",
                "year": 2021,
                "authorship": "First",
                "title": "Finetuned Language Models Are Zero-Shot Learners (FLAN)",
                "url": "https://arxiv.org/abs/2109.01652v1"
              }
            ]
          },
          {
            "place": "Google Brain",
            "role": "Research, language model evaluation and data augmentation",
            "mentors": "Soroush Vosoughi",
            "mentorLabel": "Collaborator",
            "source": "https://www.cs.dartmouth.edu/~soroush/publications.html",
            "papers": [
              {
                "venue": "ACL 2021",
                "status": "Accepted",
                "authorship": "Second",
                "title": "Language Model Augmented Relevance Score",
                "url": "https://aclanthology.org/2021.acl-long.521/"
              },
              {
                "venue": "ACL Findings 2021",
                "status": "Accepted",
                "authorship": "Third",
                "title": "A Survey of Data Augmentation Approaches for NLP",
                "url": "https://aclanthology.org/2021.findings-acl.84/"
              }
            ]
          },
          {
            "place": "Google Brain",
            "role": "Research, cognitive modeling for language models",
            "mentors": "Clara Meister · Ryan Cotterell",
            "mentorLabel": "Collaborators",
            "papers": [
              {
                "venue": "ACL 2021",
                "status": "Accepted",
                "authorship": "First",
                "title": "A Cognitive Regularizer for Language Modeling",
                "url": "https://aclanthology.org/2021.acl-long.404/"
              }
            ]
          },
          {
            "place": "Protago Labs",
            "role": "Research",
            "mentors": "Soroush Vosoughi",
            "mentorLabel": "Collaborator",
            "source": "https://www.cs.dartmouth.edu/~soroush/publications.html",
            "papers": [
              {
                "venue": "ACL Findings 2021",
                "status": "Accepted",
                "authorship": "Second",
                "title": "Modulating Language Models with Emotions",
                "url": "https://aclanthology.org/2021.findings-acl.379/"
              },
              {
                "venue": "NAACL 2021 · Short paper (inferred)",
                "status": "Accepted",
                "authorship": "First",
                "title": "Few-Shot Text Classification with Triplet Networks, Data Augmentation, and Curriculum Learning",
                "url": "https://aclanthology.org/2021.naacl-main.434/"
              },
              {
                "venue": "EACL 2021 · Short paper",
                "status": "Accepted",
                "authorship": "First",
                "title": "Text Augmentation in a Multi-Task View",
                "url": "https://aclanthology.org/2021.eacl-main.252/"
              },
              {
                "venue": "AAAI 2021",
                "status": "Accepted",
                "authorship": "Third",
                "title": "Mitigating Political Bias in Language Models through Reinforced Calibration",
                "url": "https://ojs.aaai.org/index.php/AAAI/article/view/17744"
              },
              {
                "venue": "W-NUT at EMNLP 2020",
                "status": "Accepted",
                "authorship": "Third",
                "title": "An Empirical Survey of Unsupervised Text Representation Methods on Twitter Data",
                "url": "https://aclanthology.org/2020.wnut-1.27/"
              }
            ]
          },
          {
            "place": "Protago Labs",
            "role": "Research collaboration",
            "mentors": "Kai Zou",
            "mentorLabel": "Collaborator",
            "source": "https://aclanthology.org/D19-1670.pdf",
            "papers": [
              {
                "venue": "EMNLP 2019 · Short paper",
                "status": "Accepted",
                "authorship": "First",
                "title": "EDA: Easy Data Augmentation Techniques for Boosting Performance on Text Classification Tasks",
                "url": "https://aclanthology.org/D19-1670.pdf"
              }
            ]
          },
          {
            "place": "Protago Labs",
            "role": "Internship and part-time research, conversational chatbot",
            "period": "Summer 2017 · Spring 2018",
            "source": "https://students.dartmouth.edu/fellowships/news/2019/05/three-undergraduates-win-national-scholarships",
            "papers": []
          },
          {
            "place": "DoorDash",
            "role": "Software engineering internship, recommendations",
            "period": "Fall 2019",
            "source": "https://m.thepaper.cn/newsDetail_forward_23965231",
            "papers": []
          },
          {
            "place": "Blend",
            "role": "Software engineering internship",
            "period": "Summer 2019",
            "mentors": "Danny Hermes",
            "mentorLabel": "Mentor",
            "source": "https://m.thepaper.cn/newsDetail_forward_23965231",
            "papers": []
          },
          {
            "place": "Oracle",
            "role": "Machine learning internship, IP geolocation",
            "period": "Spring 2018",
            "papers": []
          },
          {
            "place": "Dartmouth College",
            "role": "Undergraduate research, medical image analysis",
            "mentors": "Saeed Hassanpour",
            "source": "https://students.dartmouth.edu/fellowships/news/2019/05/three-undergraduates-win-national-scholarships",
            "papers": [
              {
                "venue": "WACV 2021",
                "status": "Accepted",
                "authorship": "Twelfth",
                "title": "Learn Like a Pathologist: Curriculum Learning by Annotator Agreement for Histopathology Image Classification",
                "url": "https://openaccess.thecvf.com/content/WACV2021/html/Wei_Learn_Like_a_Pathologist_Curriculum_Learning_by_Annotator_Agreement_for_WACV_2021_paper.html"
              },
              {
                "venue": "JAMA Network Open 2020",
                "status": "Accepted",
                "authorship": "First",
                "title": "Evaluation of a Deep Neural Network for Automated Classification of Colorectal Polyps on Histopathologic Slides",
                "url": "https://pubmed.ncbi.nlm.nih.gov/32324237/"
              },
              {
                "venue": "NeurIPS ML4H Workshop 2019",
                "status": "Accepted",
                "authorship": "Sixth",
                "title": "Generative Image Translation for Data Augmentation in Colorectal Histopathology Images",
                "url": "https://proceedings.mlr.press/v116/wei20a.html"
              },
              {
                "venue": "JAMA Network Open 2019",
                "status": "Accepted",
                "authorship": "Third",
                "title": "Attention-Based Deep Neural Networks for Detection of Cancerous and Precancerous Esophagus Tissue on Histopathological Slides",
                "url": "https://pubmed.ncbi.nlm.nih.gov/31693124/"
              },
              {
                "venue": "Journal of Pathology Informatics 2019",
                "status": "Accepted",
                "authorship": "First",
                "title": "Automated Detection of Celiac Disease on Duodenal Biopsy Slides: A Deep Learning Approach",
                "url": "https://pubmed.ncbi.nlm.nih.gov/30984467/"
              },
              {
                "venue": "Scientific Reports 2019",
                "status": "Accepted",
                "authorship": "First",
                "title": "Pathologist-Level Classification of Histologic Patterns on Resected Lung Adenocarcinoma Slides With Deep Neural Networks",
                "url": "https://pubmed.ncbi.nlm.nih.gov/30833650/"
              }
            ]
          },
          {
            "place": "Dartmouth College",
            "role": "Research, Minds, Machines and Society Group",
            "mentors": "Soroush Vosoughi",
            "source": "https://www.cs.dartmouth.edu/~soroush/People.html",
            "papers": [
              {
                "venue": "NAACL 2021 · Short paper (inferred)",
                "status": "Accepted",
                "authorship": "First",
                "title": "Linguistic Complexity Loss in Text-Based Therapy",
                "url": "https://aclanthology.org/2021.naacl-main.352/"
              },
              {
                "venue": "NLP-COVID at ACL 2020",
                "status": "Accepted",
                "authorship": "Fourth",
                "title": "What Are People Asking About COVID-19? A Question Classification Dataset",
                "url": "https://aclanthology.org/2020.nlpcovid19-acl.8/"
              }
            ]
          },
          {
            "place": "Dartmouth College",
            "role": "Undergraduate thesis",
            "period": "2020",
            "mentors": "Lorenzo Torresani",
            "source": "https://digitalcommons.dartmouth.edu/senior_theses/164/",
            "papers": []
          },
          {
            "place": "Dartmouth College",
            "role": "Undergraduate research, natural language processing",
            "mentors": "Eugene Santos",
            "source": "https://students.dartmouth.edu/fellowships/news/2019/05/three-undergraduates-win-national-scholarships",
            "papers": []
          },
          {
            "place": "Dartmouth College",
            "role": "Goldwater Scholar",
            "period": "2019",
            "source": "https://students.dartmouth.edu/fellowships/news/2019/05/three-undergraduates-win-national-scholarships",
            "papers": []
          },
          {
            "place": "Dartmouth-Hitchcock Medical Center",
            "role": "Research",
            "mentors": "Louis Vaickus · Arief Suriawinata",
            "mentorLabel": "Collaborators",
            "source": "https://pubmed.ncbi.nlm.nih.gov/30702803/",
            "papers": [
              {
                "venue": "Cancer Cytopathology 2019",
                "status": "Accepted",
                "authorship": "Third",
                "title": "Automating the Paris System for Urine Cytopathology: A Hybrid Deep-Learning and Morphometric Approach",
                "url": "https://pubmed.ncbi.nlm.nih.gov/30702803/"
              }
            ]
          }
        ]
      },
      {
        "id": "frieda-rong",
        "name": "Frieda Rong",
        "school": "University of Waterloo",
        "year": 2019,
        "source": "https://drive.google.com/file/d/13xJxKYx0jvybwzMcdFjLzl7Bz4B31tiX/view",
        "major": "Pure Mathematics, Combinatorics & Optimization, Computer Science",
        "graduationYear": 2020,
        "educationSource": "https://friedeggs.github.io/cv_frieda_rong.pdf",
        "research": [
          {
            "place": "Uber ATG",
            "role": "Research internship and part-time research, simulation team · driving scene generation",
            "period": "Fall 2018–2019",
            "mentors": "Raquel Urtasun · Shenlong Wang · Ersin Yumer",
            "mentorLabel": "Mentors",
            "source": "https://drive.google.com/file/d/13xJxKYx0jvybwzMcdFjLzl7Bz4B31tiX/view",
            "papers": []
          },
          {
            "place": "Petuum",
            "role": "Machine learning internship, sparse-gradient communication and distributed support vector machines",
            "period": "Winter 2018",
            "source": "https://drive.google.com/file/d/13xJxKYx0jvybwzMcdFjLzl7Bz4B31tiX/view",
            "papers": []
          },
          {
            "place": "Apple",
            "role": "Machine learning internship, neural network visualization and model interpretability",
            "period": "Summer 2017",
            "source": "https://drive.google.com/file/d/13xJxKYx0jvybwzMcdFjLzl7Bz4B31tiX/view",
            "papers": []
          },
          {
            "place": "University of Waterloo",
            "role": "Independent study, neural network pruning and facial keypoint detection",
            "source": "https://friedeggs.github.io/undergrad/",
            "papers": []
          }
        ],
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "reviewed",
          "source": "https://friedeggs.github.io/cv_frieda_rong.pdf",
          "note": "CV lists GeoSim at CVPR 2021, after the 2019 application."
        }
      },
      {
        "id": "rohan-yadav",
        "name": "Rohan Yadav",
        "school": "Carnegie Mellon University",
        "year": 2018,
        "source": "https://rohany.github.io/sop.pdf",
        "major": "Computer Science",
        "graduationYear": 2019,
        "educationSource": "https://rohany.github.io/rohan_resume.pdf",
        "research": [
          {
            "place": "Carnegie Mellon University",
            "role": "Undergraduate thesis, garbage collection for parallel programs",
            "period": "2018",
            "mentors": "Umut Acar · Sam Westrick",
            "mentorLabel": "Mentors",
            "source": "https://rohany.github.io/sop.pdf",
            "papers": []
          },
          {
            "place": "Carnegie Mellon University",
            "role": "Undergraduate research, parallel subgraph isomorphism",
            "period": "2017–2018",
            "mentors": "Umut Acar",
            "source": "https://csd.cs.cmu.edu/calendar/scs-computer-science-undergraduate-research-poster-session-and-faculty-presentation",
            "papers": []
          },
          {
            "place": "Carnegie Mellon University",
            "role": "Undergraduate research, chunked-tree parallel sequence library",
            "period": "2016–2017",
            "mentors": "Umut Acar",
            "source": "https://rohany.github.io/sop.pdf",
            "papers": []
          },
          {
            "place": "Carnegie Mellon University",
            "role": "Contributor, Diderot education platform",
            "period": "From 2018",
            "source": "https://rohany.github.io/sop.pdf",
            "papers": []
          },
          {
            "place": "Carnegie Mellon University",
            "role": "Teaching assistant, functional programming · head teaching assistant, parallel algorithms",
            "period": "2016–2018",
            "source": "https://rohany.github.io/rohan_resume.pdf",
            "papers": []
          },
          {
            "place": "Uber ATG",
            "role": "Software engineering internship, cloud infrastructure",
            "period": "2018",
            "source": "https://rohany.github.io/rohan_resume.pdf",
            "papers": []
          },
          {
            "place": "Facebook",
            "role": "Software engineering internship, network switches",
            "period": "2017",
            "source": "https://rohany.github.io/rohan_resume.pdf",
            "papers": []
          }
        ],
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "reviewed",
          "source": "https://rohany.github.io/",
          "note": "Earliest listed item is SPAA 2019 brief announcement, followed by POPL 2020; neither qualifies before the 2018 application."
        }
      },
      {
        "id": "nelson-liu",
        "name": "Nelson Liu",
        "school": "University of Washington",
        "year": 2018,
        "source": "https://cs.stanford.edu/~nfliu/files/phd_sop/nfliu_phd_sop.pdf",
        "major": "Computer Science & Linguistics",
        "graduationYear": 2019,
        "educationSource": "https://cs.stanford.edu/~nfliu/files/N_LIU_CV.pdf",
        "research": [
          {
            "place": "Allen Institute for AI",
            "role": "Research internship, NLP tools",
            "period": "From 2018",
            "mentors": "Matt Gardner · Noah A. Smith",
            "mentorLabel": "Mentors",
            "source": "https://cs.stanford.edu/~nfliu/files/N_LIU_CV.pdf",
            "papers": [
              {
                "venue": "NLP-OSS workshop at ACL 2018",
                "status": "Accepted",
                "authorship": "Sixth",
                "title": "AllenNLP: A Deep Semantic Natural Language Processing Platform",
                "url": "https://aclanthology.org/W18-2501/"
              }
            ]
          },
          {
            "place": "Allen Institute for AI",
            "role": "Research internship, science question answering and crowdsourced datasets",
            "period": "Winter 2017",
            "mentors": "Matt Gardner",
            "source": "https://cs.stanford.edu/~nfliu/files/phd_sop/nfliu_phd_sop.pdf",
            "papers": [
              {
                "venue": "W-NUT workshop at EMNLP 2017",
                "status": "Accepted",
                "authorship": "Second",
                "title": "Crowdsourcing Multiple Choice Science Questions",
                "url": "https://aclanthology.org/W17-4413/"
              }
            ]
          },
          {
            "place": "University of Washington",
            "role": "Undergraduate research, contextual representations and language model transferability",
            "period": "From 2015",
            "mentors": "Noah A. Smith",
            "source": "https://cs.stanford.edu/~nfliu/files/phd_sop/nfliu_phd_sop.pdf",
            "papers": [
              {
                "venue": "NAACL 2019",
                "status": "Submitted",
                "year": 2018,
                "authorship": "First",
                "title": "On the Transferability of Language Model Representations",
                "url": "https://cs.stanford.edu/~nfliu/files/phd_sop/nfliu_phd_sop.pdf"
              },
              {
                "venue": "RepL4NLP at ACL 2018 · Best Paper",
                "status": "Accepted",
                "authorship": "First",
                "title": "LSTMs Exploit Linguistic Attributes of Data",
                "url": "https://aclanthology.org/W18-3024/"
              }
            ]
          },
          {
            "place": "University of Washington",
            "role": "Undergraduate research, phonesthemes",
            "mentors": "Noah A. Smith · Gina-Anne Levow",
            "mentorLabel": "Advisor & collaborator",
            "source": "https://cs.stanford.edu/~nfliu/files/phd_sop/nfliu_phd_sop.pdf",
            "papers": [
              {
                "venue": "SCLeM workshop at NAACL 2018",
                "status": "Accepted",
                "authorship": "First",
                "title": "Discovering Phonesthemes with Sparse Regularization",
                "url": "https://aclanthology.org/W18-1206/"
              }
            ]
          },
          {
            "place": "University of Washington",
            "role": "Undergraduate teaching assistant, natural language processing and NLP capstone",
            "period": "2018",
            "source": "https://cs.stanford.edu/~nfliu/files/N_LIU_CV.pdf",
            "papers": []
          },
          {
            "place": "University of Southern California",
            "role": "Research internship, Information Sciences Institute · Natural Language Group, machine translation",
            "period": "Summer 2017",
            "mentors": "Kevin Knight · Jonathan May",
            "mentorLabel": "Mentors",
            "source": "https://cs.stanford.edu/~nfliu/files/N_LIU_CV.pdf",
            "papers": [
              {
                "venue": "Preprint",
                "status": "Preprint",
                "year": 2018,
                "authorship": "First",
                "title": "Augmenting Statistical Machine Translation with Subword Translation of Out-of-Vocabulary Words",
                "url": "https://arxiv.org/abs/1808.05700"
              }
            ]
          },
          {
            "place": "scikit-learn · Google Summer of Code",
            "role": "Open-source developer, decision tree tools",
            "period": "Summer 2016",
            "mentors": "Jakob Schröder · Raghav R V",
            "mentorLabel": "Mentors",
            "source": "https://summerofcode.withgoogle.com/archive/2016/projects/5412671599935488",
            "papers": []
          }
        ],
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "reviewed",
          "source": "https://cs.stanford.edu/~nfliu/",
          "note": "2017–2018 work is workshops. Main NAACL/ACL/EMNLP papers are 2019; retain SOP submission status."
        }
      },
      {
        "id": "david-heineman",
        "name": "David Heineman",
        "school": "Georgia Institute of Technology",
        "year": 2025,
        "major": "Computer Science",
        "educationSource": "https://davidheineman.com/david-heineman-resume.pdf",
        "source": "https://davidheineman.com/sop.pdf",
        "research": [
          {
            "place": "Allen Institute for Artificial Intelligence",
            "role": "Predoctoral research, language-model evaluation, scaling laws and pretraining",
            "papers": [
              {
                "title": "Signal and Noise: A Framework for Reducing Uncertainty in Language Model Evaluation",
                "venue": "NeurIPS 2025 · Spotlight",
                "status": "Accepted",
                "year": 2025,
                "authorship": "First",
                "url": "https://davidheineman.com/sop.pdf"
              },
              {
                "title": "Fluid Language Model Benchmarking",
                "venue": "COLM 2025 · Oral",
                "status": "Accepted",
                "year": 2025,
                "authorship": "Second",
                "url": "https://davidheineman.com/sop.pdf"
              },
              {
                "title": "Establishing Task Scaling Laws via Compute-Efficient Model Ladders",
                "venue": "COLM 2025",
                "status": "Accepted",
                "year": 2025,
                "authorship": "Fourth",
                "url": "https://davidheineman.com/sop.pdf"
              },
              {
                "title": "DataDecide: How to Predict Best Pretraining Data with Small Experiments",
                "venue": "ICML 2025",
                "status": "Accepted",
                "year": 2025,
                "authorship": "Fourth",
                "url": "https://davidheineman.com/sop.pdf"
              },
              {
                "title": "2 OLMo 2 Furious",
                "venue": "COLM 2025",
                "status": "Accepted",
                "year": 2025,
                "url": "https://davidheineman.com/sop.pdf"
              },
              {
                "title": "Olmo 3",
                "venue": "Preprint",
                "status": "Preprint",
                "year": 2025,
                "url": "https://davidheineman.com/sop.pdf"
              },
              {
                "title": "Olmix: Efficient Mixture Recomputation for Evolving LM Datasets",
                "venue": "Preprint",
                "status": "Preprint",
                "year": 2025,
                "authorship": "Third",
                "url": "https://davidheineman.com/sop.pdf"
              },
              {
                "title": "Terminal-Bench: Benchmarking Agents on Hard, Realistic Tasks in Command Line Interfaces",
                "venue": "Preprint",
                "status": "Preprint",
                "year": 2025,
                "url": "https://davidheineman.com/sop.pdf"
              }
            ],
            "mentors": "Kyle Lo · Jesse Dodge",
            "period": "From 2024",
            "source": "https://davidheineman.com/sop.pdf"
          },
          {
            "place": "Georgia Institute of Technology",
            "role": "Undergraduate research and continuing collaboration, fine-grained language-model evaluation",
            "papers": [
              {
                "title": "Evaluating LLMs on Chinese Idiom Translation",
                "venue": "COLM 2025",
                "status": "Accepted",
                "year": 2025,
                "authorship": "Third",
                "url": "https://davidheineman.com/"
              },
              {
                "title": "Improving Minimum Bayes Risk Decoding with Multi-Prompt",
                "venue": "EMNLP 2024",
                "status": "Accepted",
                "year": 2024,
                "authorship": "First",
                "url": "https://davidheineman.com/"
              },
              {
                "title": "Dancing Between Success and Failure: Edit-level Simplification Evaluation using SALSA",
                "venue": "EMNLP 2023",
                "status": "Accepted",
                "year": 2023,
                "authorship": "First",
                "url": "https://davidheineman.com/sop.pdf"
              },
              {
                "title": "Thresh: A Unified, Customizable and Deployable Platform for Fine-Grained Text Evaluation",
                "venue": "EMNLP 2023 Demo",
                "status": "Accepted",
                "year": 2023,
                "authorship": "First",
                "url": "https://davidheineman.com/sop.pdf"
              },
              {
                "title": "LENS: A Learnable Evaluation Metric for Text Simplification",
                "venue": "ACL 2023",
                "status": "Accepted",
                "year": 2023,
                "authorship": "Third",
                "url": "https://davidheineman.com/"
              }
            ],
            "mentors": "Wei Xu · Yao Dou · Mounica Maddela",
            "source": "https://davidheineman.com/sop.pdf"
          },
          {
            "place": "Georgia Institute of Technology",
            "role": "Research collaboration, category fluency and cognition",
            "papers": [
              {
                "title": "Towards a Path Dependent Account of Category Fluency",
                "venue": "CogSci 2024",
                "status": "Accepted",
                "year": 2024,
                "authorship": "First",
                "url": "https://davidheineman.com/"
              }
            ],
            "mentors": "Sashank Varma",
            "source": "https://davidheineman.com/"
          },
          {
            "place": "Amazon Web Services",
            "role": "Software engineering internships, EC2 language-model services and CloudWatch telemetry",
            "papers": [],
            "source": "https://davidheineman.com/"
          },
          {
            "place": "Patientco",
            "role": "Software engineering internship, predicting healthcare-bill payment timing",
            "papers": [],
            "source": "https://davidheineman.com/"
          }
        ],
        "graduationYear": 2024
      }
    ]
  },
  {
    "id": "cmu",
    "name": "Carnegie Mellon",
    "program": "Human-Computer Interaction PhD",
    "applicants": [
      {
        "id": "peiyang-song",
        "name": "Peiyang Song",
        "school": "Caltech",
        "year": 2025,
        "major": "Computer Science; minor in Robotics",
        "graduationYear": 2026,
        "program": "Language and Information Technology PhD",
        "educationSource": "https://peiyang-song.github.io/data/Peiyang_Song_CV.pdf",
        "source": "https://raw.githubusercontent.com/Peiyang-Song/peiyang-song.github.io/b45af71e365e78aee5d3148b79eb2a435bb5cb86/data/Peiyang_Song_CV.pdf",
        "sourceLabel": "Application-time CV",
        "research": [
          {
            "place": "UC Berkeley",
            "role": "Research, verifiable code agents and generalizable LLM reasoning",
            "mentors": "Dawn Song · Jingxuan He",
            "papers": [],
            "source": "https://raw.githubusercontent.com/Peiyang-Song/peiyang-song.github.io/b45af71e365e78aee5d3148b79eb2a435bb5cb86/data/Peiyang_Song_CV.pdf",
            "period": "From June 2025"
          },
          {
            "place": "Caltech",
            "role": "Research fellowship, neural theorem proving and neuro-symbolic reasoning",
            "mentors": "Anima Anandkumar · Kaiyu Yang",
            "papers": [
              {
                "title": "Lean Copilot: Large Language Models as Copilots for Theorem Proving in Lean",
                "venue": "NeuS 2025",
                "status": "Accepted",
                "authorship": "First",
                "year": 2025,
                "url": "https://leandojo.org/leancopilot.html"
              },
              {
                "title": "LeanAgent: Lifelong Learning for Formal Theorem Proving",
                "venue": "ICLR 2025",
                "status": "Accepted",
                "authorship": "Third",
                "year": 2025,
                "url": "https://leandojo.org/leanagent.html"
              },
              {
                "title": "LeanProgress: Guiding Search for Neural Theorem Proving via Proof Progress Prediction",
                "venue": "TMLR 2025",
                "status": "Accepted",
                "authorship": "Second",
                "year": 2025,
                "url": "https://arxiv.org/abs/2502.17925v2"
              },
              {
                "title": "LeanDojo: Theorem Proving with Retrieval-Augmented Language Models",
                "venue": "NeurIPS 2023 · Oral",
                "status": "Accepted",
                "authorship": "Fifth",
                "year": 2023,
                "url": "https://leandojo.org/leandojo.html"
              }
            ],
            "source": "https://raw.githubusercontent.com/Peiyang-Song/peiyang-song.github.io/b45af71e365e78aee5d3148b79eb2a435bb5cb86/data/Peiyang_Song_CV.pdf",
            "period": "February 2023–February 2025"
          },
          {
            "place": "Caltech",
            "role": "Research collaboration, LLM personality and behavioral evaluation",
            "mentors": "Rafal Kocielnik · Dean Mobbs · Anima Anandkumar · R. Michael Alvarez",
            "papers": [
              {
                "title": "The Personality Illusion: Revealing Dissociation Between Self-Reports & Behavior in LLMs",
                "venue": "NeurIPS 2025 LAW Workshop · Oral · Best Paper Honorable Mention",
                "status": "Accepted",
                "authorship": "Third",
                "year": 2025,
                "url": "https://arxiv.org/abs/2509.03730v1",
                "also": [
                  {
                    "venue": "NeurIPS 2025 LLM Persona Modeling Workshop · Oral",
                    "status": "Accepted",
                    "url": "https://raw.githubusercontent.com/Peiyang-Song/peiyang-song.github.io/b45af71e365e78aee5d3148b79eb2a435bb5cb86/data/Peiyang_Song_CV.pdf"
                  }
                ]
              }
            ],
            "source": "https://raw.githubusercontent.com/Peiyang-Song/peiyang-song.github.io/b45af71e365e78aee5d3148b79eb2a435bb5cb86/data/Peiyang_Song_CV.pdf",
            "mentorLabel": "Collaborators"
          },
          {
            "place": "Caltech",
            "role": "Research collaboration, human–AI proof formalization",
            "mentors": "Katherine M. Collins · Simon Frieder · Valerie Chen · Ilia Sucholutsky",
            "papers": [
              {
                "title": "AI Impact on Human Proof Formalization Workflows",
                "venue": "NeurIPS 2025 MATH-AI Workshop",
                "status": "Accepted",
                "authorship": "Sixth",
                "year": 2025,
                "url": "https://openreview.net/forum?id=D7I8fVkMVs"
              }
            ],
            "source": "https://openreview.net/pdf?id=D7I8fVkMVs",
            "mentorLabel": "Collaborators"
          },
          {
            "place": "Stanford University",
            "role": "Research, AI-assisted formal conjecturing and cognition-inspired LLM reasoning",
            "mentors": "Noah Goodman · Gabriel Poesia",
            "papers": [
              {
                "title": "A Survey on Large Language Model Reasoning Failures",
                "venue": "ICML 2025 AI4MATH Workshop",
                "status": "Accepted",
                "authorship": "Equal first",
                "year": 2025,
                "url": "https://openreview.net/forum?id=hsgMn4KBFG"
              }
            ],
            "source": "https://raw.githubusercontent.com/Peiyang-Song/peiyang-song.github.io/b45af71e365e78aee5d3148b79eb2a435bb5cb86/data/Peiyang_Song_CV.pdf",
            "period": "From June 2024"
          },
          {
            "place": "UC Santa Barbara",
            "role": "Research, energy-efficient ML systems and temporal arithmetic",
            "mentors": "Timothy Sherwood · Jeremy Lau",
            "papers": [
              {
                "title": "Energy-Aware Temporal Function Approximation",
                "venue": "Preprint",
                "status": "Submitted",
                "authorship": "First",
                "year": 2025,
                "url": "https://raw.githubusercontent.com/Peiyang-Song/peiyang-song.github.io/b45af71e365e78aee5d3148b79eb2a435bb5cb86/data/Peiyang_Song_CV.pdf"
              },
              {
                "title": "Delay Space Arithmetic and Architecture",
                "venue": "IEEE Micro 2025 · Top Pick",
                "status": "Accepted",
                "authorship": "Second",
                "year": 2025,
                "url": "https://ieeexplore.ieee.org/abstract/document/11082679"
              },
              {
                "title": "Energy Efficient Convolutions with Temporal Arithmetic",
                "venue": "ASPLOS 2024",
                "status": "Accepted",
                "authorship": "Second",
                "year": 2024,
                "url": "https://dl.acm.org/doi/10.1145/3620665.3640395"
              }
            ],
            "source": "https://raw.githubusercontent.com/Peiyang-Song/peiyang-song.github.io/b45af71e365e78aee5d3148b79eb2a435bb5cb86/data/Peiyang_Song_CV.pdf",
            "period": "November 2022–June 2024"
          },
          {
            "place": "UC Santa Barbara",
            "role": "Research collaboration, idiom translation with language models",
            "mentors": "Yao Qin · Xifeng Yan",
            "papers": [
              {
                "title": "Creative and Context-Aware Translation of East Asian Idioms with GPT-4",
                "venue": "EMNLP Findings 2024",
                "status": "Accepted",
                "authorship": "Equal first",
                "year": 2024,
                "url": "https://aclanthology.org/2024.findings-emnlp.544/"
              }
            ],
            "source": "https://aclanthology.org/2024.findings-emnlp.544/",
            "mentorLabel": "Collaborators"
          },
          {
            "place": "UIUC",
            "role": "Research collaboration, inhibitory control and trustworthy reasoning in LLMs",
            "mentors": "Jiaxuan You",
            "papers": [
              {
                "title": "In-Context Learning May Not Elicit Trustworthy Reasoning: A-Not-B Errors in Pretrained Language Models",
                "venue": "EMNLP Findings 2024",
                "status": "Accepted",
                "authorship": "Equal first",
                "year": 2024,
                "url": "https://aclanthology.org/2024.findings-emnlp.322/"
              }
            ],
            "source": "https://aclanthology.org/2024.findings-emnlp.322/",
            "mentorLabel": "Collaborator"
          },
          {
            "place": "Caltech",
            "role": "Teaching assistant, Robotics — Kinematics",
            "mentors": "",
            "papers": [],
            "source": "https://raw.githubusercontent.com/Peiyang-Song/peiyang-song.github.io/b45af71e365e78aee5d3148b79eb2a435bb5cb86/data/Peiyang_Song_CV.pdf",
            "period": "Fall 2025"
          }
        ],
        "paperReview": {
          "checked": "2026-11-05",
          "count": 4,
          "status": "reviewed",
          "source": "https://raw.githubusercontent.com/Peiyang-Song/peiyang-song.github.io/b45af71e365e78aee5d3148b79eb2a435bb5cb86/data/Peiyang_Song_CV.pdf",
          "note": "December 14, 2025 CV snapshot: eight refereed publications, three workshop papers, one submitted manuscript. Full conference count excludes two EMNLP Findings papers, journals and workshops. LeanProgress is Second in the 2025 CV and arXiv v1/v2; author order changed January 2026. Application year inferred from 2026 direct PhD entry; exact submission date not public. Later papers and later venue acceptances excluded."
        }
      },
      {
        "id": "ava-pun",
        "name": "Ava Pun",
        "school": "University of Waterloo",
        "year": 2023,
        "major": "Computer Science & Combinatorics and Optimization",
        "graduationYear": 2024,
        "educationSource": "https://avapun.com/cv.pdf",
        "source": "https://drive.google.com/file/d/1u7gPj0L9w4LHszIIPFy4Z2b4xSoNtsg9/view",
        "research": [
          {
            "place": "Waabi",
            "role": "Research internship, urban scene relighting",
            "period": "From January 2023",
            "mentors": "Raquel Urtasun · Jingkang Wang",
            "source": "https://uwaterloo.ca/math/news/ruidi-wei-and-ava-pun-receive-jessie-w-h-zou-memorial-awards",
            "papers": [
              {
                "venue": "NeurIPS 2023",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Neural Lighting Simulation for Urban Scenes",
                "url": "https://waabi.ai/research/lightsim"
              }
            ]
          },
          {
            "place": "Waabi",
            "role": "Research, inverse rendering of outdoor scenes",
            "mentors": "Raquel Urtasun",
            "source": "https://drive.google.com/file/d/1u7gPj0L9w4LHszIIPFy4Z2b4xSoNtsg9/view",
            "papers": []
          },
          {
            "place": "University of Waterloo",
            "role": "Undergraduate research, compact data structures",
            "period": "September–December 2022",
            "mentors": "Ian Munro",
            "source": "https://avapun.com/cv.pdf",
            "papers": [
              {
                "venue": "Preprint",
                "status": "Preprint",
                "year": 2023,
                "authorship": "Fourth",
                "title": "A Compact Representation for AVL Trees",
                "url": "https://arxiv.org/abs/2311.15511v1"
              }
            ]
          },
          {
            "place": "University of Waterloo",
            "role": "Undergraduate research fellow, Computational Motion Group · fluid animation",
            "period": "September–December 2021",
            "mentors": "Christopher Batty",
            "source": "https://drive.google.com/file/d/1u7gPj0L9w4LHszIIPFy4Z2b4xSoNtsg9/view",
            "papers": []
          },
          {
            "place": "University of Waterloo",
            "role": "Undergraduate research, Computer Graphics Lab · aperiodic tilings",
            "period": "May–August 2021",
            "mentors": "Craig Kaplan",
            "source": "https://avapun.com/cv.pdf",
            "papers": []
          },
          {
            "place": "Uber Advanced Technology Group",
            "role": "Research internship, autonomous driving simulation",
            "period": "May–August 2020",
            "mentors": "Raquel Urtasun · Jingkang Wang",
            "source": "https://avapun.com/cv.pdf",
            "papers": [
              {
                "venue": "CVPR 2021",
                "status": "Accepted",
                "authorship": "Second",
                "title": "AdvSim: Generating Safety-Critical Scenarios for Self-Driving Vehicles",
                "url": "https://openaccess.thecvf.com/content/CVPR2021/html/Wang_AdvSim_Generating_Safety-Critical_Scenarios_for_Self-Driving_Vehicles_CVPR_2021_paper.html"
              }
            ]
          },
          {
            "place": "MathSoc Cartoons",
            "role": "Writer, artist & director",
            "period": "2020–2023",
            "source": "https://avapun.com/cv.pdf",
            "papers": []
          },
          {
            "place": "Academy 118",
            "role": "Creator, writer and artist",
            "period": "From 2016",
            "source": "https://drive.google.com/file/d/1u7gPj0L9w4LHszIIPFy4Z2b4xSoNtsg9/view",
            "papers": []
          },
          {
            "place": "European Girls’ Olympiad in Informatics",
            "role": "Team Canada coach",
            "period": "2021–2022",
            "source": "https://avapun.com/cv.pdf",
            "papers": []
          }
        ]
      },
      {
        "name": "Stephan Xie",
        "id": "stephan-xie",
        "school": "University of Pennsylvania",
        "major": "Computer Science and Mathematical Economics",
        "graduationYear": 2024,
        "year": 2023,
        "source": "https://stephofx.github.io/2024/10/19/admissions.html",
        "sourceLabel": "Application blog",
        "educationSource": "https://stephofx.github.io/",
        "research": [
          {
            "place": "University of Pennsylvania",
            "role": "Undergraduate research, calibration and learning theory",
            "source": "https://stephofx.github.io/",
            "papers": [
              {
                "title": "High-Dimensional Prediction for Sequential Decision Making",
                "venue": "Preprint",
                "status": "Preprint",
                "authorship": "Fourth",
                "year": 2023,
                "url": "https://arxiv.org/abs/2310.17651v1"
              }
            ],
            "mentors": "Aaron Roth"
          },
          {
            "place": "University of Pennsylvania",
            "role": "Undergraduate research, social learning",
            "source": "https://stephofx.github.io/",
            "papers": [],
            "mentors": "Kevin He"
          },
          {
            "place": "University of Pennsylvania",
            "role": "Undergraduate research, computational biology",
            "source": "https://stephofx.github.io/",
            "papers": [
              {
                "title": "ESPRESSO: Robust Discovery and Quantification of Transcript Isoforms from Error-Prone Long-Read RNA-seq Data",
                "venue": "Science Advances",
                "status": "Accepted",
                "authorship": "Sixth",
                "year": 2023,
                "url": "https://www.science.org/doi/10.1126/sciadv.abq5072"
              }
            ],
            "mentors": "Yi Xing · Robert Wang"
          }
        ],
        "program": "Machine Learning PhD",
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "reviewed",
          "source": "https://stephofx.github.io/",
          "note": "ESPRESSO is a 2023 journal article. First listed main-conference papers are ICML/NeurIPS 2025."
        }
      },
      {
        "id": "shaily-bhatt",
        "name": "Shaily Bhatt",
        "school": "BITS Pilani, Pilani campus",
        "year": 2022,
        "major": "Computer Science",
        "graduationYear": 2021,
        "educationSource": "https://sites.google.com/view/shailybhatt/education",
        "source": "https://drive.google.com/file/d/1hbIW1usf9ochBC77xx9efa74k0pcwqrU/view",
        "research": [
          {
            "place": "Google Research India",
            "role": "Predoctoral researcher, Natural Language Understanding Group · fairness in NLP",
            "period": "From July 2021",
            "mentors": "Partha Talukdar · Vinodkumar Prabhakaran",
            "source": "https://drive.google.com/file/d/1hbIW1usf9ochBC77xx9efa74k0pcwqrU/view",
            "papers": [
              {
                "venue": "Cultures in AI at NeurIPS 2022",
                "status": "Accepted",
                "authorship": "First",
                "title": "Cultural Re-contextualization of Fairness Research in Language Technologies in India",
                "url": "https://research.google/pubs/cultural-re-contextualization-of-fairness-research-in-language-technologies-in-india/"
              },
              {
                "venue": "AACL 2022",
                "status": "Accepted",
                "authorship": "First",
                "title": "Re-contextualizing Fairness in NLP: The Case of India",
                "url": "https://aclanthology.org/2022.aacl-main.55/"
              }
            ]
          },
          {
            "place": "Google Research India",
            "role": "Research, human-assisted multilingual counterfactuals for bias mitigation",
            "mentors": "Partha Talukdar · Vinodkumar Prabhakaran",
            "source": "https://drive.google.com/file/d/1hbIW1usf9ochBC77xx9efa74k0pcwqrU/view",
            "papers": []
          },
          {
            "place": "Microsoft Research India",
            "role": "Undergraduate thesis, language model evaluation",
            "period": "August 2020–June 2021",
            "mentors": "Sunayana Sitaram · Monojit Choudhury · Poonam Goyal",
            "source": "https://sites.google.com/view/shailybhatt/education",
            "papers": [
              {
                "venue": "ICON 2021",
                "status": "Accepted",
                "authorship": "First",
                "title": "On the Universality of Deep Contextual Language Models",
                "url": "https://aclanthology.org/2021.icon-main.15/"
              }
            ]
          },
          {
            "place": "Microsoft Research India",
            "role": "Research internship, Speech and NLP Group · multilingual evaluation",
            "period": "August 2020–June 2021",
            "mentors": "Sunayana Sitaram · Monojit Choudhury",
            "source": "https://drive.google.com/file/d/1hbIW1usf9ochBC77xx9efa74k0pcwqrU/view",
            "papers": [
              {
                "venue": "Findings of AACL 2022",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Multilingual CheckList: Generation and Evaluation",
                "url": "https://aclanthology.org/2022.findings-aacl.27/"
              },
              {
                "venue": "HumEval at EACL 2021",
                "status": "Accepted",
                "authorship": "First",
                "title": "A Case Study of Efficacy and Challenges in Practical Human-in-Loop Evaluation of NLP Systems Using Checklist",
                "url": "https://aclanthology.org/2021.humeval-1.14/"
              }
            ]
          },
          {
            "place": "BITS Pilani",
            "role": "Research assistant, Web Intelligence and Social Computing Lab · multimodal fake news detection",
            "period": "August 2019–August 2020",
            "mentors": "Yashvardhan Sharma",
            "source": "https://sites.google.com/view/shailybhatt/experience",
            "papers": [
              {
                "venue": "ICDMAI 2021",
                "status": "Accepted",
                "authorship": "First",
                "title": "Fake News Detection: Experiments and Approaches Beyond Linguistic Features",
                "url": "https://link.springer.com/chapter/10.1007/978-981-16-2937-2_9"
              }
            ]
          },
          {
            "place": "BITS Pilani",
            "role": "Undergraduate research, fact verification and medical question answering",
            "source": "https://sites.google.com/view/shailybhatt/education",
            "papers": []
          },
          {
            "place": "Widening NLP",
            "role": "Co-chair and workshop organizer",
            "period": "From September 2021",
            "source": "https://sites.google.com/view/shailybhatt/past-news",
            "papers": []
          },
          {
            "place": "Arcesium",
            "role": "Software development internship, ledger automation",
            "period": "May–June 2020",
            "source": "https://sites.google.com/view/shailybhatt/experience",
            "papers": []
          },
          {
            "place": "Bhaskaracharya Institute for Space Applications and Geo-Informatics",
            "role": "AI internship, land-use change detection",
            "period": "May–July 2019",
            "mentors": "Manoj Pandya",
            "source": "https://sites.google.com/view/shailybhatt/experience",
            "papers": []
          },
          {
            "place": "Techmicra",
            "role": "Android development internship, employee scheduling",
            "period": "June–July 2018",
            "source": "https://sites.google.com/view/shailybhatt/experience",
            "papers": []
          }
        ]
      },
      {
        "id": "steven-kolawole",
        "name": "Steven Kolawole",
        "school": "Federal University of Agriculture, Abeokuta",
        "year": 2022,
        "major": "Computer Science",
        "graduationYear": 2023,
        "educationSource": "https://stevenkolawole.github.io/assets/Steven_Kolawole_CV.pdf",
        "source": "https://stevenkolawole.github.io/assets/Steven_Kolawole_SOP.pdf",
        "research": [
          {
            "place": "ML Collective",
            "role": "Independent research, Nigerian sign-language recognition",
            "source": "https://github.com/ML-Collective/Sign-to-Speech-for-Sign-Language-Understanding",
            "papers": [
              {
                "venue": "IJCAI 2022 Demo",
                "status": "Accepted",
                "authorship": "First",
                "title": "Sign-to-Speech Model for Sign Language Understanding: A Case Study of Nigerian Sign Language",
                "url": "https://www.ijcai.org/proceedings/2022/855",
                "also": [
                  {
                    "venue": "NeurIPS ML4D 2021 · Spotlight",
                    "status": "Accepted",
                    "url": "https://github.com/ML-Collective/Sign-to-Speech-for-Sign-Language-Understanding"
                  }
                ]
              }
            ]
          },
          {
            "place": "ML Collective",
            "role": "Independent research, particle-swarm optimization for federated learning",
            "mentors": "Rosanne Liu · Jason Yosinski",
            "mentorLabel": "Mentors",
            "source": "https://stevenkolawole.github.io/assets/Steven_Kolawole_CV.pdf",
            "papers": []
          },
          {
            "place": "Independent research",
            "role": "Vision transformers for mobile and edge devices",
            "source": "https://stevenkolawole.github.io/assets/Steven_Kolawole_SOP.pdf",
            "papers": []
          },
          {
            "place": "ASAlytics",
            "role": "Founding machine learning engineer, digital-asset opinion mining",
            "period": "2022",
            "source": "https://stevenkolawole.github.io/assets/Steven_Kolawole_SOP.pdf",
            "papers": []
          },
          {
            "place": "RectLabs",
            "role": "AI research engineer",
            "period": "2021",
            "source": "https://github.com/stevenkolawole/stevenkolawole.github.io/blob/main/news.js",
            "papers": []
          },
          {
            "place": "SeqHub Analytics",
            "role": "Data science internship, Nigerian-language translation",
            "period": "2021",
            "source": "https://stevenkolawole.github.io/assets/Steven_Kolawole_CV.pdf",
            "papers": []
          },
          {
            "place": "Scitylana Ng",
            "role": "Machine learning contractor",
            "period": "Through March 2021",
            "source": "https://stevenkolawole.medium.com/second-summary-of-my-journals-the-mountains-we-climb-5d1a28a57deb",
            "papers": []
          },
          {
            "place": "AI+ FUNAAB and AI+ Abeokuta",
            "role": "Campus and community lead",
            "period": "2019–2021",
            "source": "https://stevenkolawole.github.io/assets/Steven_Kolawole_CV.pdf",
            "papers": []
          },
          {
            "place": "Google Developer Student Clubs",
            "role": "Community lead, FUNAAB",
            "period": "2021–2022",
            "source": "https://stevenkolawole.github.io/assets/Steven_Kolawole_CV.pdf",
            "papers": []
          },
          {
            "place": "She Code Africa",
            "role": "Mentor, machine learning and data science",
            "period": "From 2021",
            "source": "https://stevenkolawole.github.io/assets/Steven_Kolawole_CV.pdf",
            "papers": []
          }
        ],
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "reviewed",
          "source": "https://stevenkolawole.github.io/news",
          "note": "Author explicitly identifies IJCAI 2022 work as a demo; NeurIPS ML4D is a workshop."
        }
      },
      {
        "id": "thu-00018",
        "name": "Sophia",
        "school": "Tsinghua University",
        "year": 2022,
        "major": "Computer Science (Yao Class)",
        "educationSource": "https://database.feiyue.online/applicant/Applicant-00018/",
        "source": "https://database.feiyue.online/applicant/Applicant-00018/",
        "sourceLabel": "View application profile",
        "research": [
          {
            "place": "Microsoft Research Asia",
            "role": "Research internship, NLP",
            "papers": [
              {
                "venue": "ACL",
                "status": "Submitted",
                "authorship": "First",
                "title": "NLP paper — ACL"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00018/"
          },
          {
            "place": "Tsinghua University",
            "role": "Future Laboratory, computer vision",
            "papers": [
              {
                "venue": "CVPR",
                "status": "Accepted",
                "authorship": "Second",
                "title": "Computer vision paper"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00018/"
          },
          {
            "place": "University of Maryland",
            "role": "Spring research, NLP",
            "papers": [
              {
                "venue": "Findings of EMNLP",
                "status": "Accepted",
                "authorship": "First",
                "title": "NLP paper — Findings of EMNLP"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00018/"
          },
          {
            "place": "Stanford University",
            "role": "UGVR summer research, HCI",
            "papers": [
              {
                "venue": "CHI",
                "status": "Submitted",
                "authorship": "First",
                "title": "HCI paper"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00018/"
          }
        ],
        "program": "HCII / Language Technologies PhD — admitted"
      },
      {
        "id": "harshita-diddee",
        "name": "Harshita Diddee",
        "school": "Bharati Vidyapeeth’s College of Engineering",
        "major": "Computer Science",
        "educationSource": "https://harshitadd.netlify.app/",
        "source": "https://harshitadd.netlify.app/advice/",
        "sourceLabel": "Application blog",
        "research": [
          {
            "place": "Microsoft Research India",
            "role": "Predoctoral research fellow, language technology",
            "papers": [
              {
                "title": "The Six Conundrums of Building and Deploying Language Technologies for Social Good",
                "venue": "COMPASS 2022",
                "authorship": "First",
                "status": "Accepted",
                "url": "https://harshitadd.netlify.app/advice/"
              }
            ],
            "mentors": "Kalika Bali",
            "source": "https://harshitadd.netlify.app/advice/"
          },
          {
            "place": "Bharati Vidyapeeth’s College of Engineering",
            "role": "Undergraduate research, NLP and federated learning",
            "papers": [
              {
                "title": "PsuedoProp at SemEval-2020 Task 11: Propaganda Span Detection Using BERT-CRF and Ensemble Sentence Level Classifier",
                "venue": "SemEval 2020",
                "authorship": "Second",
                "status": "Accepted",
                "url": "https://harshitadd.netlify.app/advice/"
              },
              {
                "title": "CrossPriv: User Privacy Preservation Model for Cross-Silo Federated Software",
                "venue": "ASE 2020",
                "authorship": "First",
                "status": "Accepted",
                "url": "https://harshitadd.netlify.app/advice/"
              }
            ],
            "source": "https://harshitadd.netlify.app/advice/"
          }
        ],
        "graduationYear": 2021,
        "year": 2022,
        "program": "Language Technologies PhD"
      },
      {
        "id": "anjali-kantharuban",
        "name": "Anjali Kantharuban",
        "school": "University of California, Berkeley",
        "year": 2021,
        "major": "Computer Science and Linguistics",
        "graduationYear": 2022,
        "educationSource": "https://www.anjaliruban.com/Resume_Anjali_Kantharuban.pdf",
        "source": "https://drive.google.com/file/d/1vc89crZhHvYk_5-bz-EX6FMMxs2z1DCM/view",
        "research": [
          {
            "place": "Massachusetts Institute of Technology",
            "role": "Research internship, low-resource machine translation · WiNLP 2021 presentation",
            "period": "From June 2021",
            "mentors": "Jacob Andreas",
            "source": "https://www.anjaliruban.com/LexiconLearning.pdf",
            "papers": [
              {
                "title": "One-Shot Lexicon Learning for Low-Resource Machine Translation",
                "venue": "WiNLP Workshop at EMNLP 2021",
                "status": "Accepted",
                "year": 2021,
                "authorship": "First",
                "url": "https://www.anjaliruban.com/research.html"
              }
            ]
          },
          {
            "place": "University of California, Berkeley",
            "role": "Undergraduate researcher, NLP Group · SmashCuts for instruction following",
            "period": "From March 2020",
            "mentors": "Dan Klein · Trevor Darrell",
            "source": "https://www.anjaliruban.com/SmashCuts.pdf",
            "papers": []
          },
          {
            "place": "University of California, Berkeley",
            "role": "Linguistics research apprentice, English locative inversion",
            "period": "2020–2021",
            "source": "https://drive.google.com/file/d/1vc89crZhHvYk_5-bz-EX6FMMxs2z1DCM/view",
            "papers": []
          },
          {
            "place": "University of California, Berkeley",
            "role": "Teaching assistant, data structures",
            "period": "From August 2019",
            "source": "https://www.anjaliruban.com/Resume_Anjali_Kantharuban.pdf",
            "papers": []
          },
          {
            "place": "University of California, Berkeley",
            "role": "Foreign Language and Area Studies fellowship, Telugu",
            "period": "2020–2021",
            "source": "https://southasia.berkeley.edu/flas-awardees",
            "papers": []
          }
        ],
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "reviewed",
          "source": "https://www.anjaliruban.com/research.html",
          "note": "Added missing WiNLP 2021 workshop paper. Listed main-conference work begins in 2023, after the recorded 2021 cycle."
        }
      },
      {
        "id": "naveen-raman",
        "name": "Naveen Raman",
        "school": "University of Maryland",
        "year": 2021,
        "major": "Computer Science and Mathematics",
        "graduationYear": 2022,
        "educationSource": "https://naveenraman.com/assets/cv/Naveen_Raman_CV.pdf",
        "source": "https://naveenraman.com/assets/sop/CMU_ML_Statement_of_Purpose.pdf",
        "research": [
          {
            "place": "University of Maryland",
            "role": "Undergraduate research, bias in question answering",
            "mentors": "Jordan Boyd-Graber",
            "source": "https://naveenraman.com/assets/sop/CMU_ML_Statement_of_Purpose.pdf",
            "papers": [
              {
                "venue": "EMNLP 2021 MRQA Workshop",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Eliciting Bias in Question Answering Models through Ambiguity",
                "url": "https://aclanthology.org/2021.mrqa-1.9/"
              },
              {
                "venue": "HAMLETS at NeurIPS 2020",
                "status": "Accepted",
                "authorship": "First",
                "title": "What More Can Entity Linking Do for Question Answering?",
                "url": "https://hamlets-workshop.github.io/schedule/"
              }
            ]
          },
          {
            "place": "University of Maryland",
            "role": "Undergraduate research, fairness in ride-pooling",
            "mentors": "John Dickerson",
            "source": "https://naveenraman.com/assets/sop/CMU_ML_Statement_of_Purpose.pdf",
            "papers": [
              {
                "venue": "IJCAI 2021",
                "status": "Accepted",
                "authorship": "First",
                "title": "Data-Driven Methods for Balancing Fairness and Efficiency in Ride-Pooling",
                "url": "https://www.ijcai.org/proceedings/2021/51"
              },
              {
                "venue": "AAAI 2021 Undergraduate Consortium",
                "status": "Accepted",
                "authorship": "First",
                "title": "Investigating Methods of Balancing Inequality and Efficiency in Ride Pooling",
                "url": "https://ojs.aaai.org/index.php/AAAI/article/view/17985"
              }
            ]
          },
          {
            "place": "University of Maryland",
            "role": "High school research collaboration",
            "period": "2018",
            "mentors": "William Gasarch · John Dickerson",
            "mentorLabel": "With",
            "source": "https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.FUN.2018.15",
            "papers": [
              {
                "venue": "FUN 2018",
                "status": "Accepted",
                "authorship": "Seventh",
                "title": "A Muffin-Theorem Generator",
                "url": "https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.FUN.2018.15"
              }
            ]
          },
          {
            "place": "University of Maryland",
            "role": "Undergraduate research, algorithms for cancer mutation signatures",
            "mentors": "Aravind Srinivasan · Max Leiserson",
            "source": "https://www.cs.umd.edu/node/21676",
            "papers": []
          },
          {
            "place": "University of Maryland",
            "role": "Teaching assistant, programming languages · student instructor, coding interview algorithms",
            "source": "https://www.cs.umd.edu/node/21676",
            "papers": []
          },
          {
            "place": "MIT Lincoln Laboratory",
            "role": "Research internship, human-AI decision-making",
            "period": "Summer 2021",
            "mentors": "Michael Yee",
            "source": "https://naveenraman.com/assets/sop/CMU_ML_Statement_of_Purpose.pdf",
            "papers": [
              {
                "venue": "WHMD at NeurIPS 2021",
                "status": "Accepted",
                "authorship": "First",
                "title": "Improving Learning-to-Defer Algorithms Through Fine-Tuning",
                "url": "https://drive.google.com/file/d/1oos1Htf579tpXaoakw_bdjyloVVtfHYg/view"
              }
            ]
          },
          {
            "place": "Carnegie Mellon University",
            "role": "Research internship, burnout in open source; with Yulia Tsvetkov",
            "period": "Summer 2019",
            "mentors": "Christian Kästner · Bogdan Vasilescu",
            "source": "https://naveenraman.com/assets/sop/churchill.pdf",
            "papers": [
              {
                "venue": "ICSE 2020 NIER",
                "status": "Accepted",
                "authorship": "First",
                "title": "Stress and Burnout in Open Source: Toward Finding, Understanding, and Mitigating Unhealthy Interactions",
                "url": "https://www.cs.cmu.edu/afs/cs.cmu.edu/Web/People/ckaestne/pdf/icsenier20.pdf"
              }
            ]
          },
          {
            "place": "Facebook",
            "role": "Software engineering internship, interface for debugging machine learning models",
            "period": "Summer 2020",
            "source": "https://www.cs.umd.edu/node/21676",
            "papers": []
          }
        ]
      },
      {
        "id": "jing-yu-koh",
        "name": "Jing Yu Koh",
        "school": "Singapore University of Technology and Design",
        "year": 2021,
        "major": "Information Systems Technology and Design",
        "graduationYear": 2019,
        "educationSource": "https://www.sutd.edu.sg/campus-life/student-life/student-awards/honours-list/istd/",
        "source": "https://jykoh.com/jykoh_sop.pdf",
        "research": [
          {
            "place": "Google Research",
            "role": "Research collaboration",
            "mentors": "Jiahui Yu · Xin Li",
            "mentorLabel": "Collaborators",
            "papers": [
              {
                "venue": "ICLR 2022",
                "status": "Submitted",
                "year": 2021,
                "authorship": "Third",
                "title": "Vector-quantized Image Modeling with Improved VQGAN",
                "url": "https://arxiv.org/abs/2110.04627v1"
              }
            ]
          },
          {
            "place": "Google Research",
            "role": "AI residency & research engineering",
            "period": "From October 2019",
            "mentors": "Jason Baldridge · Honglak Lee · Yinfei Yang",
            "mentorLabel": "Collaborators",
            "source": "https://jykoh.com/jykoh_sop.pdf",
            "papers": [
              {
                "venue": "ICCV 2021",
                "status": "Accepted",
                "authorship": "First",
                "title": "Pathdreamer: A World Model for Indoor Navigation",
                "url": "https://openaccess.thecvf.com/content/ICCV2021/html/Koh_Pathdreamer_A_World_Model_for_Indoor_Navigation_ICCV_2021_paper.html"
              },
              {
                "venue": "CVPR 2021",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Cross-Modal Contrastive Learning for Text-to-Image Generation",
                "url": "https://openaccess.thecvf.com/content/CVPR2021/html/Zhang_Cross-Modal_Contrastive_Learning_for_Text-to-Image_Generation_CVPR_2021_paper.html"
              },
              {
                "venue": "WACV 2021",
                "status": "Accepted",
                "authorship": "First",
                "title": "Text-to-Image Generation Grounded by Fine-Grained User Attention",
                "url": "https://arxiv.org/abs/2011.03775"
              }
            ]
          },
          {
            "place": "Google Research",
            "role": "Research, Pathdreamer++ for 3D scene generation from video",
            "source": "https://jykoh.com/jykoh_sop.pdf",
            "papers": []
          },
          {
            "place": "Google Research",
            "role": "Research, large-scale text-to-image generation",
            "source": "https://jykoh.com/jykoh_sop.pdf",
            "papers": []
          },
          {
            "place": "Singapore University of Technology and Design",
            "role": "Undergraduate research",
            "mentors": "Alexander Binder · Sai-Kit Yeung",
            "mentorLabel": "Collaborators",
            "papers": [
              {
                "venue": "ECCV 2020",
                "status": "Accepted",
                "authorship": "First",
                "title": "SideInfNet: A Deep Neural Network for Semi-Automatic Semantic Segmentation with Side Information",
                "url": "https://arxiv.org/abs/2002.02634"
              },
              {
                "venue": "ECCV 2018",
                "status": "Accepted",
                "authorship": "Fourth",
                "title": "Urban Zoning Using Higher-Order Markov Random Fields on Multi-View Imagery Data",
                "url": "https://www.ecva.net/papers/eccv_2018/papers_ECCV/papers/Tian_Feng_Urban_Zoning_Using_ECCV_2018_paper.pdf"
              }
            ]
          },
          {
            "place": "Singapore University of Technology and Design",
            "role": "Undergraduate research, object boundary detection",
            "mentors": "Alexander Binder",
            "mentorLabel": "Collaborator",
            "source": "https://arxiv.org/abs/1606.09187",
            "papers": [
              {
                "venue": "GCPR 2017",
                "status": "Accepted",
                "authorship": "First",
                "title": "Object Boundary Detection and Classification with Image-Level Labels",
                "url": "https://arxiv.org/abs/1606.09187"
              }
            ]
          },
          {
            "place": "Singapore-MIT Alliance for Research and Technology",
            "role": "Research collaboration",
            "mentors": "Supriyo Ghosh · Patrick Jaillet",
            "mentorLabel": "Collaborators",
            "papers": [
              {
                "venue": "IJCAI 2019",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Improving Customer Satisfaction in Bike Sharing Systems through Dynamic Repositioning",
                "url": "https://www.ijcai.org/proceedings/2019/813"
              }
            ]
          },
          {
            "place": "Singapore University of Technology and Design",
            "role": "Research collaboration",
            "mentors": "Yue Zhang",
            "mentorLabel": "Collaborator",
            "papers": [
              {
                "venue": "ICDM Workshops 2018",
                "status": "Accepted",
                "authorship": "Second",
                "title": "Twitter-Informed Crowd Flow Prediction",
                "url": "https://frcchang.github.io/pub/icdmw18.gary.pdf"
              }
            ]
          }
        ]
      },
      {
        "name": "Emmy Liu",
        "id": "emmy-liu",
        "school": "University of Toronto",
        "major": "Computer Science and Cognitive Science",
        "graduationYear": 2021,
        "year": 2020,
        "source": "https://nightingal3.github.io/assets/pdf/CV_2024.pdf",
        "sourceLabel": "View CV",
        "educationSource": "https://nightingal3.github.io/assets/pdf/CV_2024.pdf",
        "research": [
          {
            "place": "University of Toronto",
            "role": "Undergraduate research, efficient communication and computational linguistics",
            "source": "https://nightingal3.github.io/assets/pdf/CV_2024.pdf",
            "papers": [
              {
                "title": "Chaining and the Process of Scientific Innovation",
                "venue": "CogSci 2020",
                "status": "Accepted",
                "authorship": "First",
                "year": 2020,
                "url": "https://cognitivesciencesociety.org/cogsci20/papers/0355/index.html"
              },
              {
                "title": "Numeral Systems Across Languages Support Efficient Communication: From Approximate Numerosity to Recursion",
                "venue": "Open Mind",
                "status": "Accepted",
                "authorship": "Equal first",
                "year": 2020,
                "url": "https://doi.org/10.1162/opmi_a_00034"
              },
              {
                "title": "Rapid Information Gain Explains Cross-Linguistic Tendencies in Numeral Ordering",
                "venue": "CogSci 2019",
                "status": "Accepted",
                "authorship": "First",
                "year": 2019,
                "url": "https://nightingal3.github.io/assets/pdf/CV_2024.pdf"
              }
            ],
            "mentors": "Yang Xu",
            "period": "From 2018"
          },
          {
            "place": "University of Toronto",
            "role": "Undergraduate research, adaptive interventions and bandits",
            "source": "https://nightingal3.github.io/assets/pdf/CV_2024.pdf",
            "papers": [],
            "period": "From 2020"
          },
          {
            "place": "MIT",
            "role": "Research internship, gender bias in language models",
            "source": "https://nightingal3.github.io/assets/pdf/CV_2024.pdf",
            "papers": [],
            "mentors": "Roger Levy",
            "period": "June–August 2020"
          },
          {
            "place": "Wattpad",
            "role": "Associate engineer internship, web features and recommendation experiments",
            "source": "https://nightingal3.github.io/assets/pdf/CV_2024.pdf",
            "papers": [],
            "period": "2018–2019"
          }
        ],
        "program": "Language Technologies PhD",
        "paperReview": {
          "checked": "2026-11-03",
          "count": 2,
          "status": "corrected",
          "source": "https://nightingal3.github.io/assets/pdf/CV_2024.pdf",
          "note": "CogSci 2019 and 2020 are full proceedings papers, not zero; Open Mind is a journal."
        }
      },
      {
        "id": "jared-fernandez",
        "name": "Jared Fernandez",
        "school": "Northwestern University",
        "year": 2018,
        "major": "Computer Science and Electrical Engineering",
        "graduationYear": 2019,
        "educationSource": "https://www.jaredfern.com/files/cv.pdf",
        "source": "https://docs.google.com/document/d/19ggbIbh5VZa-aOS3EUqKpsP3IQ5YBIJzbmOJIkjRm-Q/edit",
        "research": [
          {
            "place": "Northwestern University",
            "role": "Undergraduate research, WebSAIL · language models and training-data sampling",
            "period": "2017–2018",
            "mentors": "Doug Downey",
            "source": "https://docs.google.com/document/d/19ggbIbh5VZa-aOS3EUqKpsP3IQ5YBIJzbmOJIkjRm-Q/edit",
            "papers": [
              {
                "venue": "NAACL-HLT 2019",
                "status": "Submitted",
                "year": 2018,
                "authorship": "Third",
                "title": "Analyzing Language Models for Common Sense: an Adversarially-Authored Dataset",
                "url": "https://docs.google.com/document/d/19ggbIbh5VZa-aOS3EUqKpsP3IQ5YBIJzbmOJIkjRm-Q/edit"
              },
              {
                "venue": "ACL 2018 Student Research Workshop",
                "status": "Accepted",
                "authorship": "First",
                "title": "Sampling Informative Training Data for RNN Language Models",
                "url": "https://aclanthology.org/P18-3002/"
              },
              {
                "venue": "EMNLP 2017",
                "status": "Accepted",
                "authorship": "First",
                "title": "VecShare: A Framework for Sharing Word Representation Vectors",
                "url": "https://aclanthology.org/D17-1032/"
              }
            ]
          },
          {
            "place": "Northwestern University",
            "role": "Undergraduate research, perceptual texture similarity",
            "period": "2018",
            "mentors": "Thrasyvoulos Pappas",
            "source": "https://docs.google.com/document/d/19ggbIbh5VZa-aOS3EUqKpsP3IQ5YBIJzbmOJIkjRm-Q/edit",
            "papers": []
          },
          {
            "place": "Google",
            "role": "Software engineering internship, Assistant on Android Auto",
            "period": "Summer 2018",
            "source": "https://www.jaredfern.com/files/cv.pdf",
            "papers": []
          },
          {
            "place": "SLAC National Accelerator Laboratory",
            "role": "Research support internship",
            "period": "Summer 2015",
            "source": "https://www.jaredfern.com/files/cv.pdf",
            "papers": []
          },
          {
            "place": "Stanford University",
            "role": "Research internship, Cosmogenic Radiation Laboratory",
            "period": "Summers 2013 and 2014",
            "mentors": "Kim Blisniuk",
            "mentorLabel": "With",
            "source": "https://sustainability.stanford.edu/news/listen-next-generation-earth-scientists",
            "papers": []
          }
        ]
      },
      {
        "id": "jason-wu",
        "name": "Jason Wu",
        "school": "Georgia Institute of Technology",
        "year": 2017,
        "major": "Computer Science (Intelligence and Information Internetworks)",
        "graduationYear": 2018,
        "educationSource": "https://jasonwunix.com/assets/pdf/CV.pdf",
        "source": "https://docs.google.com/document/d/1mOxHAyg3aviRub7kVmsDUcZ3fm7lxM3Z4nPBJcP6EyA/edit",
        "research": [
          {
            "place": "Georgia Institute of Technology",
            "role": "Undergraduate research, Ubicomp Lab and Contextual Computing Group",
            "period": "From January 2016",
            "mentors": "Gregory Abowd · Thad Starner",
            "source": "https://docs.google.com/document/d/1mOxHAyg3aviRub7kVmsDUcZ3fm7lxM3Z4nPBJcP6EyA/edit",
            "papers": [
              {
                "venue": "ACM IMWUT 2017",
                "status": "Accepted",
                "authorship": "Second",
                "title": "SynchroWatch: One-Handed Synchronous Smartwatch Gestures Using Correlation and Magnetic Sensing",
                "url": "https://jasonwunix.com/assets/pdf/reyes2018synchrowatch.pdf"
              },
              {
                "venue": "ISWC 2016",
                "status": "Accepted",
                "authorship": "Fifth",
                "title": "Whoosh: Non-Voice Acoustics for Low-Cost, Hands-Free, and Rapid Input on Smartwatches",
                "url": "https://jasonwunix.com/assets/pdf/reyes2016whoosh.pdf"
              }
            ]
          },
          {
            "place": "Georgia Institute of Technology",
            "role": "Undergraduate research, Deep Breath · asthma monitoring and undergraduate research symposium",
            "source": "https://docs.google.com/document/d/1mOxHAyg3aviRub7kVmsDUcZ3fm7lxM3Z4nPBJcP6EyA/edit",
            "papers": []
          },
          {
            "place": "University of Southern California",
            "role": "Research internship, Institute for Creative Technologies · virtual agents and visual affect recognition",
            "period": "June–August 2017",
            "source": "https://jasonwunix.com/assets/pdf/CV.pdf",
            "papers": [
              {
                "venue": "AAMAS 2018",
                "status": "Submitted",
                "year": 2017,
                "authorship": "First",
                "title": "NADiA: Neural Network Driven Virtual Human Conversation Agents",
                "url": "https://aamas.csc.liv.ac.uk/AAMAS/aamas2018/acceptedSIA.html"
              }
            ]
          },
          {
            "place": "Agency Oasis",
            "role": "Web development internship",
            "period": "June–August 2015",
            "source": "https://jasonwunix.com/assets/pdf/CV.pdf",
            "papers": []
          }
        ]
      },
      {
        "id": "jenny-liang",
        "name": "Jenny Liang",
        "school": "University of Washington",
        "year": 2020,
        "major": "Computer Science and Informatics",
        "educationSource": "https://jennyliang.me/static/media/cv.6abe2412bca19f2291e1.pdf",
        "source": "https://docs.google.com/document/d/1xtX9q9ialIvshStkrS9VNyACilViHPKvpI3aizXb-aw/edit?usp=sharing",
        "research": [
          {
            "place": "University of Washington",
            "role": "Undergraduate research, explicit programming strategies and novice developer tools",
            "papers": [],
            "mentors": "Amy J. Ko",
            "period": "From 2020",
            "source": "https://docs.google.com/document/d/1xtX9q9ialIvshStkrS9VNyACilViHPKvpI3aizXb-aw/edit?usp=sharing"
          },
          {
            "place": "University of Washington",
            "role": "Undergraduate research, community-maintained LTE networks",
            "papers": [],
            "mentors": "Spencer Sevilla · Kurtis Heimerl",
            "period": "2019–2020",
            "source": "https://docs.google.com/document/d/1xtX9q9ialIvshStkrS9VNyACilViHPKvpI3aizXb-aw/edit?usp=sharing"
          },
          {
            "place": "University of Washington",
            "role": "Graduate-course research, neural code completion and source-code metadata",
            "papers": [],
            "mentors": "René Just",
            "source": "https://docs.google.com/document/d/1xtX9q9ialIvshStkrS9VNyACilViHPKvpI3aizXb-aw/edit?usp=sharing"
          },
          {
            "place": "Allen Institute for Artificial Intelligence",
            "role": "Research, interpreting bias in toxic-language classifiers",
            "papers": [],
            "source": "https://docs.google.com/document/d/1xtX9q9ialIvshStkrS9VNyACilViHPKvpI3aizXb-aw/edit?usp=sharing"
          },
          {
            "place": "Uber",
            "role": "Software engineering internship, developer tools and build-system latency",
            "papers": [],
            "source": "https://docs.google.com/document/d/1xtX9q9ialIvshStkrS9VNyACilViHPKvpI3aizXb-aw/edit?usp=sharing"
          }
        ],
        "graduationYear": 2021,
        "program": "Software Engineering PhD",
        "paperReview": {
          "checked": "2026-11-03",
          "count": null,
          "status": "limited",
          "source": "https://docs.google.com/document/d/1xtX9q9ialIvshStkrS9VNyACilViHPKvpI3aizXb-aw/edit?usp=sharing",
          "note": "The 2020 application statement describes research but gives no own-paper inventory; no later papers are backfilled."
        }
      }
    ]
  },
  {
    "id": "berkeley",
    "name": "UC Berkeley",
    "program": "Computer Science PhD",
    "applicants": [
      {
        "id": "prasann-singhal",
        "name": "Prasann Singhal",
        "school": "University of Texas at Austin",
        "year": 2024,
        "major": "Computer Science and Linguistics",
        "graduationYear": 2025,
        "educationSource": "https://www.cs.utexas.edu/news/2025/cns-dean-honors-three-utcs-students-graduate-honors",
        "source": "https://docs.google.com/document/d/1Y5gx5-CzbP4Tj6-Tuj_9kvVgT9wUjZgHa_uTzsZ7EdY/edit",
        "research": [
          {
            "place": "University of Texas at Austin",
            "role": "Undergraduate research, TAUR Lab",
            "period": "From fall 2021",
            "mentors": "Greg Durrett",
            "source": "https://prasanns.github.io/",
            "papers": [
              {
                "venue": "COLM 2024",
                "status": "Accepted",
                "authorship": "First",
                "title": "D2PO: Discriminator-Guided DPO with Response Evaluation Models",
                "url": "https://arxiv.org/abs/2405.01511v2"
              },
              {
                "venue": "COLM 2024 Spotlight",
                "status": "Accepted",
                "authorship": "First",
                "title": "A Long Way to Go: Investigating Length Correlations in RLHF",
                "url": "https://arxiv.org/abs/2310.03716"
              },
              {
                "venue": "Preprint",
                "status": "Preprint",
                "year": 2024,
                "authorship": "Sixth",
                "title": "To CoT or Not to CoT? Chain-of-Thought Helps Mainly on Math and Symbolic Reasoning",
                "url": "https://arxiv.org/abs/2409.12183v1"
              },
              {
                "venue": "ACL 2023",
                "status": "Accepted",
                "authorship": "First",
                "title": "EEL: Efficiently Encoding Lattices for Reranking",
                "url": "https://aclanthology.org/2023.acl-long.517/"
              },
              {
                "venue": "EACL 2023",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Assessing Out-of-Domain Language Model Performance from Few Examples",
                "url": "https://aclanthology.org/2023.eacl-main.175/"
              }
            ]
          },
          {
            "place": "University of Texas at Austin",
            "role": "NLP teaching assistant and directed reading mentor",
            "period": "2024",
            "source": "https://prasanns.github.io/",
            "papers": []
          },
          {
            "place": "Katy HACK Initiative",
            "role": "Co-founder and mentor, computer science education",
            "period": "From 2020",
            "source": "https://www.linkedin.com/in/prasann-singhal-a975b8170",
            "papers": []
          },
          {
            "place": "IDEAHacks",
            "role": "Director, high school hackathon",
            "period": "2020",
            "source": "https://ideahacks.org/index.html",
            "papers": []
          },
          {
            "place": "Fort Bend County Libraries",
            "role": "Volunteer teacher, Java",
            "period": "From 2019",
            "source": "https://www.linkedin.com/in/prasann-singhal-a975b8170",
            "papers": []
          },
          {
            "place": "Scale AI",
            "role": "Research intern and part-time researcher, language model data quality",
            "period": "Summer–fall 2024",
            "source": "https://docs.google.com/document/d/1Y5gx5-CzbP4Tj6-Tuj_9kvVgT9wUjZgHa_uTzsZ7EdY/edit",
            "papers": []
          }
        ]
      },
      {
        "id": "harman-singh",
        "name": "Harman Singh",
        "school": "IIT Delhi",
        "year": 2024,
        "major": "Electrical Engineering",
        "graduationYear": 2022,
        "educationSource": "https://github.com/HarmanDotpy/harmandotpy.github.io/blob/3f79fa6045697652cce069e4b4f502bc1d3439da/data/harman_cv.pdf",
        "source": "https://drive.google.com/file/d/1tB6fpiCaiSdIl_f0nYLOD9QYFtZNTRWO/view",
        "research": [
          {
            "place": "Google DeepMind",
            "role": "Speech tokenizer research",
            "period": "December 2023–March 2024",
            "mentors": "Partha Talukdar · Sriram Ganapathy · Bhuvana Ramabhadran",
            "source": "https://github.com/HarmanDotpy/harmandotpy.github.io/blob/3f79fa6045697652cce069e4b4f502bc1d3439da/data/harman_cv.pdf",
            "papers": [
              {
                "venue": "ICASSP 2025",
                "status": "Submitted",
                "year": 2024,
                "authorship": "Equal first",
                "title": "STAB: Speech Tokenizer Assessment Benchmark",
                "url": "https://arxiv.org/abs/2409.02384"
              }
            ]
          },
          {
            "place": "Google DeepMind",
            "role": "Predoctoral researcher",
            "period": "From August 2023",
            "mentors": "Partha Talukdar · Nitish Gupta",
            "source": "https://github.com/HarmanDotpy/harmandotpy.github.io/blob/3f79fa6045697652cce069e4b4f502bc1d3439da/index.html",
            "papers": [
              {
                "venue": "ACL 2024",
                "status": "Accepted",
                "authorship": "First",
                "title": "IndicGenBench: A Multilingual Benchmark to Evaluate Generation Capabilities of LLMs on Indic Languages",
                "url": "https://aclanthology.org/2024.acl-long.595/"
              }
            ]
          },
          {
            "place": "Google DeepMind",
            "role": "Long-context multimodal learning research",
            "period": "From September 2024",
            "mentors": "Partha Talukdar · Sriram Ganapathy · Trevor Cohn",
            "source": "https://github.com/HarmanDotpy/harmandotpy.github.io/blob/3f79fa6045697652cce069e4b4f502bc1d3439da/data/harman_cv.pdf",
            "papers": []
          },
          {
            "place": "Google DeepMind",
            "role": "Research, synthetic multilingual SpeechQA evaluation",
            "source": "https://drive.google.com/file/d/1tB6fpiCaiSdIl_f0nYLOD9QYFtZNTRWO/view",
            "papers": []
          },
          {
            "place": "Google DeepMind",
            "role": "Gemini data and evaluation research",
            "period": "April–September 2024",
            "mentors": "Partha Talukdar · Jason Riesa",
            "source": "https://github.com/HarmanDotpy/harmandotpy.github.io/blob/3f79fa6045697652cce069e4b4f502bc1d3439da/data/harman_cv.pdf",
            "papers": []
          },
          {
            "place": "Meta FAIR",
            "role": "AI resident",
            "period": "July 2022–July 2023",
            "mentors": "Pengchuan Zhang · Hugo Chen · Wenhan Xiong · Qifan Wang",
            "source": "https://github.com/HarmanDotpy/harmandotpy.github.io/blob/3f79fa6045697652cce069e4b4f502bc1d3439da/index.html",
            "papers": [
              {
                "venue": "EMNLP 2023",
                "status": "Accepted",
                "authorship": "First",
                "title": "Coarse-to-Fine Contrastive Learning in Image-Text-Graph Space for Improved Vision-Language Compositionality",
                "url": "https://aclanthology.org/2023.emnlp-main.56/",
                "also": [
                  {
                    "venue": "CLVL at ICCV 2023 · Oral",
                    "status": "Accepted",
                    "url": "https://iccv-clvl.github.io/2023/"
                  },
                  {
                    "venue": "SpLU-RoboNLP at EMNLP 2023 · Oral",
                    "status": "Accepted",
                    "url": "https://harmandotpy.github.io/"
                  }
                ]
              }
            ]
          },
          {
            "place": "IIT Delhi",
            "role": "Research, DAIR Lab",
            "period": "August 2023–November 2024",
            "mentors": "Parag Singla · Prathosh A P",
            "source": "https://github.com/HarmanDotpy/harmandotpy.github.io/blob/3f79fa6045697652cce069e4b4f502bc1d3439da/data/harman_cv.pdf",
            "papers": [
              {
                "venue": "CVPR 2025",
                "status": "Submitted",
                "year": 2024,
                "authorship": "Fourth",
                "title": "Generate-Plan-Edit: A Framework for Improving Image-Text Alignment for Compositional Text-to-Image Generation",
                "url": "https://drive.google.com/file/d/1tB6fpiCaiSdIl_f0nYLOD9QYFtZNTRWO/view"
              }
            ]
          },
          {
            "place": "IIT Delhi",
            "role": "Research, DAIR Lab and IBM Research",
            "period": "June 2021–May 2022",
            "mentors": "Parag Singla · Dinesh Garg",
            "source": "https://github.com/HarmanDotpy/harmandotpy.github.io/blob/3f79fa6045697652cce069e4b4f502bc1d3439da/data/harman_cv.pdf",
            "papers": [
              {
                "venue": "EMNLP 2023",
                "status": "Accepted",
                "authorship": "First",
                "title": "Image Manipulation via Multi-Hop Instructions: A New Dataset and Weakly-Supervised Neuro-Symbolic Approach",
                "url": "https://aclanthology.org/2023.emnlp-main.181/"
              }
            ]
          },
          {
            "place": "University of Southern California",
            "role": "Research internship, INKLab",
            "period": "June 2021–January 2022",
            "mentors": "Xiang Ren · Soumya Sanyal",
            "source": "https://github.com/HarmanDotpy/harmandotpy.github.io/blob/3f79fa6045697652cce069e4b4f502bc1d3439da/data/harman_cv.pdf",
            "papers": [
              {
                "venue": "ACL 2022",
                "status": "Accepted",
                "authorship": "Second",
                "title": "FaiRR: Faithful and Robust Deductive Reasoning over Natural Language",
                "url": "https://aclanthology.org/2022.acl-long.77/"
              }
            ]
          },
          {
            "place": "University of Southern California",
            "role": "Undergraduate research, Mangul Lab",
            "period": "May 2020–March 2021",
            "mentors": "Serghei Mangul",
            "source": "https://mangul-lab-usc.github.io/alumni/",
            "papers": [
              {
                "venue": "Nature Methods 2022",
                "status": "Accepted",
                "authorship": "Equal second",
                "title": "Unlocking Capacities of Genomics for the COVID-19 Response and Future Pandemics",
                "url": "https://stacks.cdc.gov/view/cdc/121208/cdc_121208_DS1.pdf"
              },
              {
                "venue": "ISBRA 2021",
                "status": "Accepted",
                "authorship": "Fourth",
                "title": "A Novel Network Representation of SARS-CoV-2 Sequencing Data",
                "url": "https://link.springer.com/book/10.1007/978-3-030-91415-8"
              }
            ]
          },
          {
            "place": "Research collaboration",
            "role": "Research with MIT and Microsoft",
            "period": "June 2023–June 2024",
            "mentors": "Tianlong Chen · Kaixiong Zhou",
            "source": "https://github.com/HarmanDotpy/harmandotpy.github.io/blob/3f79fa6045697652cce069e4b4f502bc1d3439da/data/harman_cv.pdf",
            "papers": [
              {
                "venue": "Findings of EMNLP 2024",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Cross-Lingual Multi-Hop Knowledge Editing",
                "url": "https://aclanthology.org/2024.findings-emnlp.701/"
              }
            ]
          },
          {
            "place": "LimeChat",
            "role": "NLP engineering internship",
            "period": "May–August 2021",
            "source": "https://github.com/HarmanDotpy/harmandotpy.github.io/blob/3f79fa6045697652cce069e4b4f502bc1d3439da/data/harman_cv.pdf",
            "papers": []
          },
          {
            "place": "IBM Research",
            "role": "Research internship",
            "period": "May–June 2022",
            "mentors": "Dinesh Garg · Parag Singla",
            "source": "https://github.com/HarmanDotpy/harmandotpy.github.io/blob/3f79fa6045697652cce069e4b4f502bc1d3439da/data/harman_cv.pdf",
            "papers": []
          }
        ]
      },
      {
        "id": "alan-chung-ma",
        "name": "Alan Chung Ma",
        "school": "Purdue University",
        "major": "Computer Engineering",
        "educationSource": "https://alan.chung-ma.com/blog/2025-phd-application-experience/",
        "source": "https://alan.chung-ma.com/blog/2025-phd-application-experience/",
        "sourceLabel": "Application blog",
        "research": [
          {
            "place": "Purdue University",
            "role": "Undergraduate research, software supply-chain security",
            "papers": [],
            "mentors": "Santiago Torres-Arias",
            "source": "https://alan.chung-ma.com/blog/2025-phd-application-experience/"
          },
          {
            "place": "Google",
            "role": "Software engineering internships",
            "papers": [],
            "source": "https://alan.chung-ma.com/blog/2025-phd-application-experience/"
          },
          {
            "place": "Keytos",
            "role": "Software engineering, PKI services",
            "papers": [],
            "source": "https://alan.chung-ma.com/blog/2025-phd-application-experience/"
          }
        ],
        "graduationYear": 2023,
        "year": 2024,
        "paperReview": {
          "checked": "2026-11-03",
          "count": null,
          "status": "unresolved",
          "source": "https://alan.chung-ma.com/blog/2025-phd-application-experience/",
          "note": "Rechecked the full application blog, personal site and talks list. Verified KubeCon 2024 and 2025 talks and software-supply-chain contributions, but found no full-paper publication inventory or matching public Scholar profile. A talk is insufficient evidence of an accepted proceedings paper; count remains unknown."
        }
      },
      {
        "id": "yaowen-ye",
        "name": "Yaowen Ye",
        "school": "University of Hong Kong",
        "major": "Computer Science",
        "educationSource": "https://helloelwin.github.io/files/2025/phd-application-cv.pdf",
        "source": "https://helloelwin.github.io/files/2025/sop-berkeley.pdf",
        "sourceLabel": "View SOP",
        "research": [
          {
            "place": "UC Berkeley",
            "role": "Research internship, language model alignment",
            "papers": [
              {
                "title": "Iterative Label Refinement Matters More than Preference Optimization",
                "venue": "ICLR 2025",
                "authorship": "First",
                "status": "Submitted",
                "year": 2024,
                "url": "https://helloelwin.github.io/files/2025/phd-application-cv.pdf"
              }
            ],
            "mentors": "Jacob Steinhardt",
            "period": "January–August 2024",
            "source": "https://helloelwin.github.io/files/2025/phd-application-cv.pdf"
          },
          {
            "place": "UNC Chapel Hill",
            "role": "Remote research internship, language model safety",
            "papers": [],
            "mentors": "Huaxiu Yao",
            "period": "October–December 2023",
            "source": "https://helloelwin.github.io/files/2025/phd-application-cv.pdf"
          },
          {
            "place": "Peking University",
            "role": "Research internship, intuitive physics",
            "papers": [],
            "mentors": "Yixin Zhu",
            "period": "June–October 2023",
            "source": "https://helloelwin.github.io/files/2025/phd-application-cv.pdf"
          },
          {
            "place": "University of Hong Kong",
            "role": "Research internship, graph recommendation",
            "papers": [
              {
                "title": "Graph Masked Autoencoder for Sequential Recommendation",
                "venue": "SIGIR 2023",
                "authorship": "First",
                "status": "Accepted",
                "url": "https://helloelwin.github.io/files/2025/phd-application-cv.pdf"
              },
              {
                "title": "Masked Graph Transformer for Recommendation",
                "venue": "SIGIR 2023",
                "authorship": "Fifth",
                "status": "Accepted",
                "url": "https://helloelwin.github.io/files/2025/phd-application-cv.pdf"
              }
            ],
            "mentors": "Chao Huang",
            "period": "December 2021–June 2023",
            "source": "https://helloelwin.github.io/files/2025/phd-application-cv.pdf"
          }
        ],
        "graduationYear": 2025,
        "year": 2024,
        "paperReview": {
          "checked": "2026-11-03",
          "count": 2,
          "status": "corrected",
          "source": "https://yaowenye.com/",
          "note": "Two SIGIR 2023 papers were missed by the venue classifier; ICLR 2025 remains submitted at application time."
        }
      },
      {
        "id": "himanshu-gaurav-singh",
        "name": "Himanshu Gaurav Singh",
        "school": "IIT Delhi",
        "year": 2022,
        "major": "Computer Science",
        "graduationYear": 2023,
        "educationSource": "https://hgaurav2k.github.io/data/resume.pdf",
        "source": "https://drive.google.com/file/d/1WAqxOMPojVZb3bU5EAq9rNRx21gVMMY3/view",
        "research": [
          {
            "place": "IIT Delhi",
            "role": "Undergraduate research, Robotics and Embodied AI Lab",
            "period": "From October 2021",
            "mentors": "Parag Singla · Rohan Paul",
            "source": "https://hgaurav2k.github.io/data/resume.pdf",
            "papers": [
              {
                "venue": "ICRA 2023",
                "status": "Submitted",
                "year": 2022,
                "authorship": "Equal first",
                "title": "Learning Neuro-symbolic Programs for Language Guided Robot Manipulation",
                "url": "https://arxiv.org/abs/2211.06652v1",
                "also": [
                  {
                    "venue": "NeurIPS 2022 Neuro Causal and Symbolic AI Workshop",
                    "status": "Accepted",
                    "url": "https://hgaurav2k.github.io/data/resume.pdf"
                  }
                ]
              }
            ]
          },
          {
            "place": "IIT Delhi",
            "role": "Research, action representations for robot planning and recovery",
            "source": "https://drive.google.com/file/d/1WAqxOMPojVZb3bU5EAq9rNRx21gVMMY3/view",
            "papers": []
          },
          {
            "place": "Microsoft Research India",
            "role": "Research, extreme classification",
            "mentors": "Manik Varma",
            "source": "https://drive.google.com/file/d/1WAqxOMPojVZb3bU5EAq9rNRx21gVMMY3/view",
            "papers": []
          },
          {
            "place": "Tower Research Capital",
            "role": "Quantitative research internship, stock-price prediction",
            "period": "June–August 2022",
            "source": "https://hgaurav2k.github.io/data/resume.pdf",
            "papers": []
          }
        ],
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "reviewed",
          "source": "https://hgaurav2k.github.io/",
          "note": "Current page is selected papers only; SOP lists NeurIPS 2022 workshop and ICRA 2023 submission, not accepted main papers."
        }
      },
      {
        "id": "thu-00018",
        "name": "Sophia",
        "school": "Tsinghua University",
        "year": 2022,
        "major": "Computer Science (Yao Class)",
        "educationSource": "https://database.feiyue.online/applicant/Applicant-00018/",
        "source": "https://database.feiyue.online/applicant/Applicant-00018/",
        "sourceLabel": "View application profile",
        "research": [
          {
            "place": "Microsoft Research Asia",
            "role": "Research internship, NLP",
            "papers": [
              {
                "venue": "ACL",
                "status": "Submitted",
                "authorship": "First",
                "title": "NLP paper — ACL"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00018/"
          },
          {
            "place": "Tsinghua University",
            "role": "Future Laboratory, computer vision",
            "papers": [
              {
                "venue": "CVPR",
                "status": "Accepted",
                "authorship": "Second",
                "title": "Computer vision paper"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00018/"
          },
          {
            "place": "University of Maryland",
            "role": "Spring research, NLP",
            "papers": [
              {
                "venue": "Findings of EMNLP",
                "status": "Accepted",
                "authorship": "First",
                "title": "NLP paper — Findings of EMNLP"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00018/"
          },
          {
            "place": "Stanford University",
            "role": "UGVR summer research, HCI",
            "papers": [
              {
                "venue": "CHI",
                "status": "Submitted",
                "authorship": "First",
                "title": "HCI paper"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00018/"
          }
        ],
        "program": "Electrical Engineering & Computer Sciences PhD — admitted"
      },
      {
        "id": "shangyin-tan",
        "name": "Shangyin Tan",
        "school": "Purdue University",
        "year": 2021,
        "major": "Computer Science",
        "graduationYear": 2021,
        "educationSource": "https://shangyit.me/_assets/files/Shangyin_CV.pdf",
        "source": "https://drive.google.com/file/d/1E5nUESgKmdkDtXl2CT5Jq1CYX7jKxxBQ/view",
        "research": [
          {
            "place": "Purdue University",
            "role": "Undergraduate research, symbolic execution",
            "period": "From June 2020",
            "mentors": "Guannan Wei · Tiark Rompf",
            "source": "https://drive.google.com/file/d/1E5nUESgKmdkDtXl2CT5Jq1CYX7jKxxBQ/view",
            "papers": [
              {
                "venue": "PEPM 2022 · Short paper",
                "status": "Accepted",
                "year": 2021,
                "authorship": "First",
                "title": "Towards Partially Evaluating Symbolic Interpreters for All",
                "url": "https://www.cs.purdue.edu/homes/rompf/papers/tan-pepm22.pdf"
              },
              {
                "venue": "USENIX Security 2022",
                "status": "Submitted",
                "year": 2021,
                "authorship": "First",
                "title": "The Essence of Compiling Symbolic Execution",
                "url": "https://drive.google.com/file/d/1E5nUESgKmdkDtXl2CT5Jq1CYX7jKxxBQ/view"
              },
              {
                "venue": "ESEC/FSE 2021 Demo",
                "status": "Accepted",
                "authorship": "Second",
                "title": "LLSC: A Parallel Symbolic Execution Compiler for LLVM IR",
                "url": "https://2021.esec-fse.org/details/fse-2021-demonstrations/1/LLSC-A-Parallel-Symbolic-Execution-Compiler-for-LLVM-IR"
              },
              {
                "venue": "OOPSLA 2020",
                "status": "Accepted",
                "authorship": "Third",
                "title": "Compiling Symbolic Execution with Staging and Algebraic Effects",
                "url": "https://www.cs.purdue.edu/homes/rompf/papers/wei-oopsla20.pdf"
              }
            ]
          },
          {
            "place": "Purdue University",
            "role": "Undergraduate research, formal verification",
            "mentors": "Benjamin Delaware",
            "source": "https://drive.google.com/file/d/1E5nUESgKmdkDtXl2CT5Jq1CYX7jKxxBQ/view",
            "papers": []
          },
          {
            "place": "Purdue University",
            "role": "Undergraduate teaching assistant, discrete math and systems programming",
            "period": "January 2019–January 2021",
            "source": "https://shangyit.me/_assets/files/Shangyin_CV.pdf",
            "papers": []
          }
        ],
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "reviewed",
          "source": "https://shangyit.me/",
          "note": "Application-era items are OOPSLA 2020 (separate journal-based category), FSE demo and PEPM short paper. UIST 2022 and ICSE 2023 are later."
        }
      },
      {
        "id": "ritwik-gupta",
        "name": "Ritwik Gupta",
        "school": "University of Pittsburgh",
        "year": 2020,
        "major": "Computer Science",
        "graduationYear": 2017,
        "educationSource": "https://ritwikgupta.me/RitwikCV.pdf",
        "source": "https://ritwikgupta.me/assets/pdfs/RitwikStatementOfPurpose.pdf",
        "research": [
          {
            "place": "Carnegie Mellon University",
            "role": "Research, Software Engineering Institute · satellite imagery",
            "mentors": "Matthew Gaston",
            "mentorLabel": "Collaborator",
            "source": "https://arxiv.org/abs/1911.09296",
            "papers": [
              {
                "venue": "Preprint 2019",
                "status": "Preprint",
                "authorship": "First",
                "title": "xBD: A Dataset for Assessing Building Damage from Satellite Imagery",
                "url": "https://arxiv.org/abs/1911.09296"
              },
              {
                "venue": "CVPR 2019 Workshop",
                "status": "Accepted",
                "authorship": "First",
                "title": "Creating xBD: A Dataset for Assessing Building Damage from Satellite Imagery",
                "url": "https://openaccess.thecvf.com/content_CVPRW_2019/html/cv4gc/Gupta_Creating_xBD_A_Dataset_for_Assessing_Building_Damage_from_Satellite_CVPRW_2019_paper.html"
              },
              {
                "venue": "IEEE Big Data 2018",
                "status": "Accepted",
                "authorship": "First",
                "title": "Focusing on the Big Picture: Insights into a Systems Approach to Deep Learning for Satellite Imagery",
                "url": "https://arxiv.org/abs/1811.04893"
              }
            ]
          },
          {
            "place": "Carnegie Mellon University",
            "role": "Research, Software Engineering Institute · robotic anomaly detection",
            "mentors": "Zachary Kurtz · Sebastian Scherer · Jonathon Smereka",
            "mentorLabel": "Collaborators",
            "source": "https://arxiv.org/abs/1809.03565",
            "papers": [
              {
                "venue": "Preprint 2018",
                "status": "Preprint",
                "authorship": "First",
                "title": "Open Problems in Robotic Anomaly Detection",
                "url": "https://arxiv.org/abs/1809.03565"
              }
            ]
          },
          {
            "place": "Carnegie Mellon University",
            "role": "Machine learning research scientist, Software Engineering Institute · cyber intelligence report",
            "period": "From June 2017",
            "source": "https://insights.sei.cmu.edu/library/cyber-intelligence-tradecraft-report-the-state-of-cyber-intelligence-practices-in-the-united-states-study-report-and-implementation-guides/",
            "papers": []
          },
          {
            "place": "Carnegie Mellon University",
            "role": "Research, machine learning robustness",
            "mentors": "Zachary Kurtz · Eliezer Kanal · Matthew Gaston",
            "mentorLabel": "Collaborators",
            "source": "https://ritwikgupta.me/RitwikCV.pdf",
            "papers": [
              {
                "venue": "Defensive Deception and Trust in Autonomy Workshop 2018",
                "status": "Accepted",
                "authorship": "Second",
                "title": "Mathematical Definition of Robustness for Machine Learning Algorithms",
                "url": "https://ritwikgupta.me/RitwikCV.pdf"
              }
            ]
          },
          {
            "place": "Carnegie Mellon University",
            "role": "Affiliated researcher, CyLab",
            "period": "From May 2019",
            "source": "https://ritwikgupta.me/RitwikCV.pdf",
            "papers": []
          },
          {
            "place": "Carnegie Mellon University",
            "role": "Affiliated researcher, Robotics Institute",
            "period": "From December 2017",
            "source": "https://ritwikgupta.me/RitwikCV.pdf",
            "papers": []
          },
          {
            "place": "Defense Innovation Unit",
            "role": "Technical program manager",
            "period": "From January 2020",
            "source": "https://ritwikgupta.me/RitwikCV.pdf",
            "papers": []
          },
          {
            "place": "University of Pittsburgh",
            "role": "Full-stack and mobile developer, Department of Chemistry · Pitt Quantum Repository and 2016 poster",
            "period": "January 2015–September 2016",
            "source": "https://ritwikgupta.me/RitwikCV.pdf",
            "papers": []
          },
          {
            "place": "University of Pittsburgh",
            "role": "Research internship, Biomedical Informatics · human genome palindromes",
            "period": "June–September 2013",
            "mentors": "Madhavi Ganapathiraju",
            "source": "https://severus.dbmi.pitt.edu/palins.html",
            "papers": []
          },
          {
            "place": "University of Pittsburgh",
            "role": "Data science internship, Biomedical Informatics · cancer mutation classification",
            "period": "June–September 2014",
            "source": "https://ritwikgupta.me/RitwikCV.pdf",
            "papers": []
          },
          {
            "place": "UPMC Enterprises",
            "role": "Software engineer, hospital patient data feeds",
            "period": "November 2016–April 2017",
            "source": "https://ritwikgupta.me/RitwikCV.pdf",
            "papers": []
          },
          {
            "place": "Rectangle",
            "role": "Android developer, Pittsburgh transit tracking",
            "period": "From June 2014",
            "source": "https://ritwikgupta.me/RitwikCV.pdf",
            "papers": []
          },
          {
            "place": "Apple",
            "role": "Data science internship, social media analysis",
            "period": "May–August 2016",
            "source": "https://ritwikgupta.me/RitwikCV.pdf",
            "papers": []
          },
          {
            "place": "Staples SparX",
            "role": "Data science internship, recommender systems",
            "period": "May–August 2015",
            "source": "https://ritwikgupta.me/RitwikCV.pdf",
            "papers": []
          }
        ]
      },
      {
        "id": "sanjay-subramanian",
        "name": "Sanjay Subramanian",
        "school": "University of Pennsylvania",
        "year": 2020,
        "major": "Computer & Information Science; Economics (Statistics)",
        "graduationYear": 2019,
        "educationSource": "https://people.eecs.berkeley.edu/~sanjayss/CV.pdf",
        "source": "https://www.openessays.org/essays/uc-berkeley-phd-nlp-sop-essay-sanjay-2024",
        "research": [
          {
            "place": "Allen Institute for AI",
            "role": "Predoctoral researcher, AllenNLP · vision and language",
            "period": "2019–2020",
            "mentors": "Matt Gardner · Sameer Singh",
            "mentorLabel": "Collaborators",
            "source": "https://people.eecs.berkeley.edu/~sanjayss/CV.pdf",
            "papers": [
              {
                "venue": "Findings of EMNLP 2020",
                "status": "Accepted",
                "authorship": "First",
                "title": "MedICaT: A Dataset of Medical Images, Captions, and Textual References",
                "url": "https://aclanthology.org/2020.findings-emnlp.191/"
              },
              {
                "venue": "Findings of EMNLP 2020",
                "status": "Accepted",
                "authorship": "Twenty-second",
                "title": "Evaluating Models’ Local Decision Boundaries via Contrast Sets",
                "url": "https://arxiv.org/abs/2004.02709"
              },
              {
                "venue": "ACL 2020",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Obtaining Faithful Interpretations from Compositional Neural Networks",
                "url": "https://aclanthology.org/2020.acl-main.495/"
              },
              {
                "venue": "ViGIL at NeurIPS 2019",
                "status": "Accepted",
                "authorship": "First",
                "title": "Analyzing Compositionality of Visual Question Answering",
                "url": "https://vigilworkshop.github.io/static/papers-2019/43.pdf"
              },
              {
                "venue": "EMNLP 2019",
                "status": "Accepted",
                "authorship": "Fourth",
                "title": "AllenNLP Interpret: A Framework for Explaining Predictions of NLP Models",
                "url": "https://aclanthology.org/D19-3002/"
              }
            ]
          },
          {
            "place": "Allen Institute for AI",
            "role": "Research, compositional question answering",
            "mentors": "Matt Gardner · Jonathan Berant",
            "mentorLabel": "Collaborators",
            "source": "https://arxiv.org/abs/2007.00266v1",
            "papers": [
              {
                "venue": "TACL",
                "status": "Submitted",
                "year": 2020,
                "authorship": "Second",
                "title": "Latent Compositional Representations Improve Systematic Generalization in Grounded Question Answering",
                "url": "https://arxiv.org/abs/2007.00266v1"
              }
            ]
          },
          {
            "place": "University of Pennsylvania",
            "role": "Undergraduate research, coreference resolution",
            "period": "2018–2019",
            "mentors": "Dan Roth",
            "source": "https://people.eecs.berkeley.edu/~sanjayss/CV.pdf",
            "papers": [
              {
                "venue": "CRAC at NAACL 2019",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Evaluation of Named Entity Coreference",
                "url": "https://aclanthology.org/W19-2801/"
              },
              {
                "venue": "*SEM 2019",
                "status": "Accepted",
                "authorship": "First",
                "title": "Improving Generalization in Coreference Resolution via Adversarial Training",
                "url": "https://aclanthology.org/S19-1021/"
              }
            ]
          },
          {
            "place": "University of Massachusetts Amherst",
            "role": "Research internship, correlation clustering",
            "period": "Summer 2017",
            "mentors": "Barna Saha",
            "source": "https://people.eecs.berkeley.edu/~sanjayss/CV.pdf",
            "papers": [
              {
                "venue": "ESA 2019",
                "status": "Accepted",
                "authorship": "Second",
                "title": "Correlation Clustering with Same-Cluster Queries Bounded by Optimal Cost",
                "url": "https://drops.dagstuhl.de/entities/document/10.4230/LIPIcs.ESA.2019.81"
              }
            ]
          },
          {
            "place": "University of Pennsylvania",
            "role": "Undergraduate research, temporal relation extraction",
            "period": "2018–2019",
            "mentors": "Dan Roth",
            "source": "https://people.eecs.berkeley.edu/~sanjayss/CV.pdf",
            "papers": []
          },
          {
            "place": "University of Pennsylvania",
            "role": "Teaching assistant, mathematics, probability and algorithms",
            "period": "2016–2019",
            "source": "https://people.eecs.berkeley.edu/~sanjayss/CV.pdf",
            "papers": []
          },
          {
            "place": "Hack4Impact",
            "role": "Software development for nonprofits",
            "period": "2015–2018",
            "source": "https://people.eecs.berkeley.edu/~sanjayss/CV.pdf",
            "papers": []
          },
          {
            "place": "Google",
            "role": "Software engineering internship, advertising systems",
            "period": "Summer 2018",
            "source": "https://people.eecs.berkeley.edu/~sanjayss/CV.pdf",
            "papers": []
          },
          {
            "place": "Akuna Capital",
            "role": "Software development internship, trading tools",
            "period": "Summer 2016",
            "source": "https://people.eecs.berkeley.edu/~sanjayss/CV.pdf",
            "papers": []
          },
          {
            "place": "Fermilab",
            "role": "Research internship, detector electronics",
            "period": "Summer 2014",
            "source": "https://people.eecs.berkeley.edu/~sanjayss/CV.pdf",
            "papers": []
          }
        ]
      }
    ]
  },
  {
    "id": "harvard",
    "name": "Harvard",
    "program": "Computer Science PhD",
    "applicants": [
      {
        "id": "ritesh-kanchi",
        "name": "Ritesh Kanchi",
        "school": "University of Washington",
        "major": "Computer Science",
        "educationSource": "https://makeabilitylab.cs.washington.edu/news/ugrad-ritesh-headed-to-harvard/",
        "source": "https://riteshkanchi.medium.com/applying-to-hci-phds-7422f490fef1",
        "sourceLabel": "Application blog",
        "research": [
          {
            "place": "University of Washington",
            "role": "Undergraduate research, accessibility and ArtInsight",
            "papers": [],
            "mentors": "Jon E. Froehlich",
            "source": "https://riteshkanchi.medium.com/applying-to-hci-phds-7422f490fef1"
          },
          {
            "place": "University of Washington",
            "role": "Undergraduate research, human-computer interaction",
            "papers": [
              {
                "title": "“I want it to talk like Darth Vader”: Helping Children Construct Creative Self-Efficacy with Generative AI",
                "venue": "CHI 2024",
                "status": "Accepted",
                "year": 2024,
                "authorship": "Sixth",
                "url": "https://doi.org/10.1145/3613904.3642492"
              },
              {
                "title": "“Why is Everything in the Cloud?”: Co-Designing Visual Cues Representing Data Processes with Children",
                "venue": "IDC 2024",
                "status": "Accepted",
                "year": 2024,
                "authorship": "Second",
                "url": "https://doi.org/10.1145/3628516.3655819"
              }
            ],
            "mentors": "Jason C. Yip",
            "source": "https://www.riteshkanchi.com/research"
          }
        ],
        "year": 2024,
        "paperReview": {
          "checked": "2026-11-03",
          "count": 2,
          "status": "corrected",
          "source": "https://www.riteshkanchi.com/research",
          "note": "Added CHI 2024 and IDC 2024 full papers. IUI 2025 acceptance before the late-2024 applications is not established; excluded from this count."
        }
      },
      {
        "id": "rachit-bansal",
        "name": "Rachit Bansal",
        "school": "Delhi Technological University",
        "year": 2023,
        "major": "Electrical Engineering",
        "graduationYear": 2022,
        "educationSource": "https://rachitbansal.github.io/resources/CV.pdf",
        "source": "https://drive.google.com/file/d/1FRV6a7sl2WTa5lBhYZGpR6WDh0O-LzfZ/view",
        "research": [
          {
            "place": "Google Research",
            "role": "Predoctoral researcher, language model composition",
            "period": "From July 2022",
            "mentors": "Partha Talukdar · Prateek Jain",
            "source": "https://rachitbansal.github.io/resources/CV.pdf",
            "papers": [
              {
                "venue": "ICLR 2024",
                "status": "Submitted",
                "year": 2023,
                "authorship": "First",
                "title": "LLM Augmented LLMs: Expanding Capabilities through Composition",
                "url": "https://drive.google.com/file/d/1tfTTK9MnJTbOoCgLCXe3V2y_aRWuxWmD/view"
              }
            ]
          },
          {
            "place": "New York University",
            "role": "Research collaboration, model generalization",
            "period": "2021–2022",
            "mentors": "Naomi Saphra · Kyunghyun Cho",
            "source": "https://drive.google.com/file/d/1FRV6a7sl2WTa5lBhYZGpR6WDh0O-LzfZ/view",
            "papers": [
              {
                "venue": "ICLR 2023",
                "status": "Accepted",
                "authorship": "Second",
                "title": "Linear Connectivity Reveals Generalization Strategies",
                "url": "https://arxiv.org/abs/2205.12411"
              }
            ]
          },
          {
            "place": "Technion",
            "role": "Research internship & undergraduate thesis, memorization",
            "period": "September 2021–July 2022",
            "mentors": "Yonatan Belinkov",
            "source": "https://rachitbansal.github.io/resources/CV.pdf",
            "papers": [
              {
                "venue": "NeurIPS 2022",
                "status": "Accepted",
                "authorship": "First",
                "title": "Measures of Information Reflect Memorization Patterns",
                "url": "https://arxiv.org/abs/2210.09404v2"
              }
            ]
          },
          {
            "place": "Carnegie Mellon University",
            "role": "Research collaboration, evaluating explanations",
            "period": "2020–2021",
            "mentors": "Danish Pruthi",
            "source": "https://rachitbansal.github.io/resources/CV.pdf",
            "papers": [
              {
                "venue": "TACL 2022",
                "status": "Accepted",
                "authorship": "Second",
                "title": "Evaluating Explanations: How Much Do Explanations from the Teacher Aid Students?",
                "url": "https://aclanthology.org/2022.tacl-1.21/"
              }
            ]
          },
          {
            "place": "Adobe Research",
            "role": "Research internship",
            "period": "January–September 2021",
            "mentors": "Balaji Krishnamurthy",
            "source": "https://rachitbansal.github.io/resources/CV.pdf",
            "papers": [
              {
                "venue": "NAACL 2022",
                "status": "Accepted",
                "authorship": "First",
                "title": "CoSe-Co: Text Conditioned Generative CommonSense Contextualizer",
                "url": "https://aclanthology.org/2022.naacl-main.83/"
              },
              {
                "venue": "Findings of NAACL 2022",
                "status": "Accepted",
                "authorship": "Fourth",
                "title": "LM-CORE: Language Models with Contextually Relevant External Knowledge",
                "url": "https://aclanthology.org/2022.findings-naacl.57/"
              }
            ]
          },
          {
            "place": "University of Oxford · Google Summer of Code",
            "role": "Contributor, Cuneiform Digital Library Initiative",
            "period": "May 2020–January 2021",
            "mentors": "Jacob Dahl",
            "source": "https://rachitbansal.github.io/resources/CV.pdf",
            "papers": [
              {
                "venue": "ACL Student Research Workshop 2021",
                "status": "Accepted",
                "authorship": "First",
                "title": "How Low is Too Low? A Computational Perspective on Extremely Low-Resource Languages",
                "url": "https://aclanthology.org/2021.acl-srw.5/"
              }
            ]
          },
          {
            "place": "University of Oxford · Google Summer of Code",
            "role": "Mentor, Cuneiform Digital Library Initiative",
            "period": "2022",
            "source": "https://rachitbansal.github.io/resources/CV.pdf",
            "papers": []
          },
          {
            "place": "IIIT Delhi",
            "role": "Research internship, COVID-19 misinformation",
            "mentors": "Tanmoy Chakraborty",
            "mentorLabel": "Collaborator",
            "source": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9761197/",
            "papers": [
              {
                "venue": "PAKDD 2021",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Combining Exogenous and Endogenous Signals with a Semi-supervised Co-attention Network for Early Detection of COVID-19 Fake Tweets",
                "url": "https://link.springer.com/chapter/10.1007/978-3-030-75762-5_16"
              },
              {
                "venue": "Applied Soft Computing 2021",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Cross-SEAN: A Cross-Stitch Semi-Supervised Neural Attention Model for COVID-19 Fake News Detection",
                "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC9761197/"
              }
            ]
          },
          {
            "place": "Coding Blocks",
            "role": "Instructor, reinforcement learning",
            "period": "2020",
            "source": "https://rachitbansal.github.io/resources/CV.pdf",
            "papers": []
          },
          {
            "place": "Coding Blocks",
            "role": "Instructor, foundations of machine learning and deep learning",
            "period": "2019",
            "source": "https://rachitbansal.github.io/resources/CV.pdf",
            "papers": []
          }
        ]
      }
    ]
  },
  {
    "id": "toronto",
    "name": "University of Toronto",
    "program": "Computer Science PhD",
    "applicants": [
      {
        "id": "silvia-sellan",
        "name": "Silvia Sellán",
        "school": "University of Oviedo",
        "year": 2018,
        "major": "Mathematics & Physics",
        "graduationYear": 2019,
        "educationSource": "https://www.dgp.toronto.edu/~sgsellan/pdf/cv-full.pdf",
        "source": "https://www.dgp.toronto.edu/~sgsellan/grad-questions/phd-statement.html",
        "research": [
          {
            "place": "Fields Institute · University of Toronto",
            "role": "Research internship · SGP 2018 poster on solving PDEs",
            "period": "Summers 2017 & 2018",
            "mentors": "Alec Jacobson",
            "papers": [
              {
                "venue": "Computer Graphics Forum",
                "status": "Conditionally accepted",
                "year": 2018,
                "authorship": "First",
                "title": "Solid Geometry Processing on Deconstructed Domains",
                "url": "https://arxiv.org/abs/1807.00866"
              },
              {
                "venue": "Review of Undergraduate Computer Science 2018",
                "status": "Accepted",
                "authorship": "Third",
                "title": "Solving PDEs on Deconstructed Domains for Geometry Processing",
                "url": "https://rucs-uoft.github.io/solving-pdes-on-deconstructed-domains-for-geometry-processing"
              }
            ]
          },
          {
            "place": "Fields Institute · University of Toronto",
            "role": "Research, overlapping domains · Graphics Interface 2018 poster",
            "period": "2018",
            "mentors": "Alec Jacobson",
            "source": "https://conferences.graphicsinterface.org/2018/program/posters/",
            "papers": []
          },
          {
            "place": "Fields Institute · University of Toronto",
            "role": "Research, surface morphology and geometric flows",
            "mentors": "Alec Jacobson",
            "source": "https://www.dgp.toronto.edu/~sgsellan/grad-questions/phd-statement.html",
            "papers": []
          },
          {
            "place": "Institute of Mathematical Sciences (ICMAT)",
            "role": "Research, Severo Ochoa introduction to research program",
            "period": "March 2017–March 2018",
            "mentors": "Javier Parcet",
            "source": "https://www.dgp.toronto.edu/~sgsellan/pdf/cv-full.pdf",
            "papers": []
          }
        ],
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "reviewed",
          "source": "https://www.cs.columbia.edu/~silviasellan/index.html",
          "note": "Application-era Computer Graphics Forum paper was conditionally accepted; undergraduate journal article is excluded. No promotion based on later publication."
        }
      }
    ]
  },
  {
    "id": "princeton",
    "name": "Princeton",
    "program": "Computer Science PhD",
    "applicants": [
      {
        "id": "zhuorui-ye",
        "name": "Zhuorui Ye",
        "school": "Tsinghua University",
        "year": 2024,
        "major": "Computer Science",
        "graduationYear": 2025,
        "educationSource": "https://cuizhuyefei.github.io/",
        "source": "https://drive.google.com/file/d/1IPsYHj0Cg7EcIIhN2oER9pS6F-6t6QJc/view",
        "research": [
          {
            "place": "Chinese University of Hong Kong",
            "role": "Summer research internship",
            "period": "July–August 2023",
            "mentors": "Farzan Farnia",
            "source": "https://www.itcsc.cuhk.edu.hk/visitors.html",
            "papers": [
              {
                "venue": "AISTATS 2025",
                "status": "Submitted",
                "year": 2024,
                "authorship": "First",
                "title": "On the Trade-Off Between Stability and Fidelity of Gaussian-Smoothed Saliency Maps",
                "url": "https://arxiv.org/abs/2411.05837v1"
              }
            ]
          },
          {
            "place": "Carnegie Mellon University",
            "role": "Research",
            "mentors": "Fei Fang · Lei Li",
            "papers": [
              {
                "venue": "Preprint",
                "status": "Preprint",
                "year": 2024,
                "date": "2024-10-25",
                "authorship": "Second",
                "title": "Cooperative Strategic Planning Enhances Reasoning Capabilities in Large Language Models",
                "url": "https://arxiv.org/abs/2410.20007v1"
              }
            ]
          },
          {
            "place": "Carnegie Mellon University",
            "role": "Research internship, interpretable reinforcement learning",
            "mentors": "Fei Fang · Geoffrey Gordon",
            "papers": [
              {
                "venue": "ICLR 2025",
                "status": "Submitted",
                "year": 2024,
                "authorship": "Equal first",
                "title": "Concept-Based Interpretable Reinforcement Learning with Limited to No Human Labels",
                "url": "https://arxiv.org/abs/2407.15786v1",
                "also": [
                  {
                    "venue": "AutoRL at ICML 2024",
                    "status": "Accepted",
                    "url": "https://aiworkshoptracker.com/workshop/icml-2024-autorl/"
                  },
                  {
                    "venue": "MHFAIA at ICML 2024",
                    "status": "Accepted",
                    "url": "https://sites.google.com/view/mhf-icml2024/accepted-papers"
                  },
                  {
                    "venue": "TAFM at RLC 2024 · Spotlight",
                    "status": "Accepted",
                    "url": "https://sites.google.com/view/tafm/accepted-papers"
                  },
                  {
                    "venue": "InterpPol at RLC 2024 · Oral",
                    "status": "Accepted",
                    "url": "https://sites.google.com/view/interppol-workshop/program"
                  }
                ]
              }
            ]
          },
          {
            "place": "Tsinghua University",
            "role": "Research collaboration, musical lyric translation",
            "mentors": "Jinhan Li · Rongwu Xu",
            "mentorLabel": "Collaborators",
            "source": "https://aclanthology.org/2024.findings-emnlp.315/",
            "papers": [
              {
                "venue": "Findings of EMNLP 2024",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Sing It, Narrate It: Quality Musical Lyrics Translation",
                "url": "https://aclanthology.org/2024.findings-emnlp.315/"
              }
            ]
          },
          {
            "place": "Carnegie Mellon University",
            "role": "Research, strategic AI agents for competitive debate",
            "period": "From summer 2024",
            "mentors": "Fei Fang · Lei Li",
            "source": "https://drive.google.com/file/d/1IPsYHj0Cg7EcIIhN2oER9pS6F-6t6QJc/view",
            "papers": []
          },
          {
            "place": "Tsinghua University",
            "role": "Undergraduate research",
            "mentors": "Li Yi",
            "papers": [
              {
                "venue": "AAAI 2024",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Semantic Complete Scene Forecasting from a 4D Dynamic Point Cloud Sequence",
                "url": "https://ojs.aaai.org/index.php/AAAI/article/view/28400"
              }
            ]
          },
          {
            "place": "Tsinghua University",
            "role": "Yao Class seminar host",
            "period": "From fall 2024",
            "source": "https://drive.google.com/file/d/1IPsYHj0Cg7EcIIhN2oER9pS6F-6t6QJc/view",
            "papers": []
          }
        ]
      },
      {
        "id": "tony-chen",
        "name": "Haozhe (Tony) Chen",
        "school": "Columbia University",
        "year": 2024,
        "major": "Computer Science",
        "graduationYear": 2024,
        "educationSource": "https://tonychen.xyz/assets/pdf/cv.pdf",
        "source": "https://drive.google.com/file/d/1ArlAeqq7EeeAVqem6sjMH5xy4Jhiex62/view",
        "research": [
          {
            "place": "Columbia University",
            "role": "Research intern, Decision, Risk, and Operations Division",
            "period": "From April 2023",
            "mentors": "Hongseok Namkoong · Tianyi Peng",
            "source": "https://tonychen.xyz/assets/pdf/cv.pdf",
            "papers": [
              {
                "venue": "NeurIPS 2024",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "QGym: Scalable Simulation and Benchmarking of Queuing Network Controllers",
                "url": "https://proceedings.neurips.cc/paper_files/paper/2024/hash/a7f67788f7b4d77fa7cd6887de3dcbe7-Abstract-Datasets_and_Benchmarks_Track.html"
              }
            ]
          },
          {
            "place": "Columbia University",
            "role": "Research intern, Spoken Language Processing Group",
            "period": "From November 2021",
            "mentors": "Julia Hirschberg",
            "source": "https://tonychen.xyz/assets/pdf/cv.pdf",
            "papers": [
              {
                "venue": "EMNLP 2024",
                "status": "Accepted",
                "authorship": "First",
                "title": "EmoKnob: Enhance Voice Cloning with Fine-Grained Emotion Control",
                "url": "https://aclanthology.org/2024.emnlp-main.466/"
              },
              {
                "venue": "INTERSPEECH 2024",
                "status": "Accepted",
                "authorship": "Second",
                "title": "Detecting Empathy in Speech",
                "url": "https://www.isca-archive.org/interspeech_2024/chen24f_interspeech.html"
              }
            ]
          },
          {
            "place": "Columbia University",
            "role": "Research intern, Computer Vision Lab",
            "period": "From September 2022",
            "mentors": "Carl Vondrick · Chengzhi Mao",
            "source": "https://tonychen.xyz/assets/pdf/cv.pdf",
            "papers": [
              {
                "venue": "ICML 2024",
                "status": "Accepted",
                "authorship": "First",
                "title": "SelfIE: Self-Interpretation of Large Language Model Embeddings",
                "url": "https://proceedings.mlr.press/v235/chen24ao.html"
              },
              {
                "venue": "ICLR 2024",
                "status": "Accepted",
                "authorship": "First",
                "title": "INViTE: INterpret and Control Vision-Language Models with Text Explanations",
                "url": "https://proceedings.iclr.cc/paper_files/paper/2024/hash/99120406e3c273c63dc7d3059a516b1a-Abstract-Conference.html"
              }
            ]
          },
          {
            "place": "Together AI",
            "role": "Research internship, language-model routing and speculative decoding",
            "period": "From September 2024",
            "source": "https://tonychen.xyz/assets/pdf/cv.pdf",
            "papers": []
          },
          {
            "place": "Research projects",
            "role": "Benchmarking pretraining data-mixture estimators",
            "source": "https://drive.google.com/file/d/1ArlAeqq7EeeAVqem6sjMH5xy4Jhiex62/view",
            "papers": []
          },
          {
            "place": "Research projects",
            "role": "Detecting disagreements in language-model responses",
            "source": "https://drive.google.com/file/d/1ArlAeqq7EeeAVqem6sjMH5xy4Jhiex62/view",
            "papers": []
          },
          {
            "place": "Research projects",
            "role": "Differentiable simulation for language-model request routing",
            "source": "https://drive.google.com/file/d/1ArlAeqq7EeeAVqem6sjMH5xy4Jhiex62/view",
            "papers": []
          },
          {
            "place": "Voloridge Investment Management",
            "role": "Quantitative research internships, stock prediction and clustering",
            "period": "June–August 2021 · May–December 2023",
            "source": "https://tonychen.xyz/assets/pdf/cv.pdf",
            "papers": []
          },
          {
            "place": "University of California, Santa Barbara",
            "role": "Research internship, Sen Lab · 3D object reconstruction",
            "period": "June–August 2020",
            "source": "https://tonychen.xyz/assets/pdf/cv.pdf",
            "papers": []
          }
        ]
      },
      {
        "id": "yoonsang-lee",
        "name": "Yoonsang Lee",
        "school": "Seoul National University",
        "year": 2024,
        "major": "Computer Science & Engineering",
        "graduationYear": 2025,
        "educationSource": "https://yoonsang-lee.github.io/assets/pdf/cv.pdf",
        "source": "https://github.com/yoonsang-lee/yoonsang-lee.github.io/blob/3fdc3792fefa486a9ada198a54015bcdb5d25589/assets/pdf/sop.pdf",
        "research": [
          {
            "place": "University of Texas at Austin",
            "role": "Visiting student",
            "period": "From August 2023",
            "mentors": "Eunsol Choi",
            "source": "https://yoonsang-lee.github.io/assets/pdf/cv.pdf",
            "papers": [
              {
                "venue": "ICLR 2025",
                "status": "Submitted",
                "year": 2024,
                "authorship": "Second",
                "title": "RARe: Retrieval Augmented Retrieval with In-Context Examples",
                "url": "https://arxiv.org/abs/2410.20088v1"
              },
              {
                "venue": "COLM 2024",
                "status": "Accepted",
                "authorship": "First",
                "title": "AmbigDocs: Reasoning across Documents on Different Entities under the Same Name",
                "url": "https://arxiv.org/abs/2404.12447v3"
              },
              {
                "venue": "NAACL Findings 2024",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Crafting In-context Examples according to LMs’ Parametric Knowledge",
                "url": "https://aclanthology.org/2024.findings-naacl.133/"
              }
            ]
          },
          {
            "place": "Seoul National University",
            "role": "Research",
            "mentors": "Seung-won Hwang",
            "mentorLabel": "Collaborator",
            "source": "https://aclanthology.org/2024.findings-emnlp.274/",
            "papers": [
              {
                "venue": "EMNLP Findings 2024",
                "status": "Accepted",
                "authorship": "First",
                "title": "Disentangling Questions from Query Generation for Task-Adaptive Retrieval",
                "url": "https://aclanthology.org/2024.findings-emnlp.274/",
                "also": [
                  {
                    "venue": "ENLSP at NeurIPS 2024",
                    "status": "Accepted",
                    "url": "https://neurips2024-enlsp.github.io/accepted_papers.html"
                  }
                ]
              }
            ]
          },
          {
            "place": "Seoul National University",
            "role": "Research assistant, data augmentation for low-resource settings",
            "period": "July 2022–July 2023",
            "mentors": "Kyomin Jung",
            "source": "https://yoonsang-lee.github.io/assets/pdf/cv.pdf",
            "papers": [
              {
                "venue": "ArgMining at EMNLP 2023",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "MILAB at PragTag-2023: Enhancing Cross-Domain Generalization through Data Augmentation with Reduced Uncertainty",
                "url": "https://aclanthology.org/2023.argmining-1.24/"
              }
            ]
          },
          {
            "place": "Seoul National University",
            "role": "External collaborator, HOLI Lab · insurance chatbots with Samsung Fire & Marine Insurance",
            "period": "From October 2024",
            "mentors": "Yohan Jo",
            "mentorLabel": "Host",
            "papers": []
          },
          {
            "place": "Seoul National University",
            "role": "Teaching assistant, algorithms, computer architecture and circuits",
            "period": "Fall 2020 · spring 2023 · spring 2024",
            "source": "https://yoonsang-lee.github.io/assets/pdf/cv.pdf",
            "papers": []
          },
          {
            "place": "KAIST",
            "role": "Research assistant, language proficiency and AI-assisted writing",
            "period": "July–October 2024",
            "mentors": "Juho Kim",
            "source": "https://github.com/yoonsang-lee/yoonsang-lee.github.io/blob/3fdc3792fefa486a9ada198a54015bcdb5d25589/assets/pdf/sop.pdf",
            "papers": []
          },
          {
            "place": "Research projects",
            "role": "Language-model clarification questions for Korean insurance queries",
            "source": "https://github.com/yoonsang-lee/yoonsang-lee.github.io/blob/3fdc3792fefa486a9ada198a54015bcdb5d25589/assets/pdf/sop.pdf",
            "papers": []
          },
          {
            "place": "Naver AI Lab",
            "role": "Research internship, causal deep learning with alternating transformers",
            "period": "January–February 2023",
            "mentors": "Seong-Eun Moon",
            "mentorLabel": "Host",
            "source": "https://github.com/yoonsang-lee/yoonsang-lee.github.io/blob/88d718b2a89a893a8e8e0fd817498212df57ca7a/assets/pdf/cv.pdf",
            "papers": []
          }
        ]
      },
      {
        "id": "inhwa-song",
        "name": "Inhwa Song",
        "school": "KAIST",
        "year": 2024,
        "major": "Computer Science",
        "educationSource": "https://drive.google.com/file/d/1KezWQkWLD8p0yQe6wDBXji38ve13gFBx/view",
        "source": "https://drive.google.com/file/d/1KezWQkWLD8p0yQe6wDBXji38ve13gFBx/view",
        "research": [
          {
            "place": "NAVER AI Lab",
            "role": "Research internship, ExploreSelf and LLM-guided reflection",
            "papers": [
              {
                "title": "ExploreSelf: Fostering User-driven Exploration and Reflection on Personal Challenges with Adaptive Guidance by Large Language Models",
                "venue": "CHI 2025",
                "status": "Submitted",
                "year": 2024,
                "authorship": "First",
                "url": "https://arxiv.org/abs/2409.09662"
              }
            ],
            "mentors": "Young-Ho Kim",
            "period": "March–September 2024",
            "source": "https://drive.google.com/file/d/1KezWQkWLD8p0yQe6wDBXji38ve13gFBx/view"
          },
          {
            "place": "Georgia Institute of Technology",
            "role": "Visiting undergraduate research, LLM chatbots for mental-health support",
            "papers": [
              {
                "title": "The Typing Cure: Experiences with Large Language Model Chatbots for Mental Health Support",
                "venue": "CSCW 2024",
                "status": "Submitted",
                "year": 2024,
                "authorship": "Equal first",
                "url": "https://arxiv.org/abs/2401.14362"
              },
              {
                "title": "Mobile Technology and Teens: Understanding the Changing Needs of Sociocultural and Technical Landscape",
                "venue": "CHI 2025 Workshop Proposal",
                "status": "Conditionally accepted",
                "year": 2024,
                "authorship": "Second",
                "url": "https://drive.google.com/file/d/1KezWQkWLD8p0yQe6wDBXji38ve13gFBx/view"
              }
            ],
            "mentors": "Munmun De Choudhury",
            "period": "August 2023–January 2024",
            "source": "https://drive.google.com/file/d/1KezWQkWLD8p0yQe6wDBXji38ve13gFBx/view"
          },
          {
            "place": "KAIST",
            "role": "Undergraduate research, cultural awareness and educational dialogue models",
            "papers": [
              {
                "title": "Survey of Cultural Awareness in Language Models: Text and Beyond",
                "venue": "Computational Linguistics",
                "status": "Submitted",
                "year": 2024,
                "url": "https://drive.google.com/file/d/1KezWQkWLD8p0yQe6wDBXji38ve13gFBx/view"
              }
            ],
            "mentors": "Alice Oh",
            "period": "From September 2024",
            "source": "https://drive.google.com/file/d/1KezWQkWLD8p0yQe6wDBXji38ve13gFBx/view"
          },
          {
            "place": "KAIST",
            "role": "Undergraduate research, personal informatics and the God-Saeng phenomenon",
            "papers": [
              {
                "title": "Understanding God-Saeng (God生) Phenomenon: Young Generation’s Pursuit of Authentic Well-being",
                "venue": "DIS 2025 (in preparation; previously rejected at DIS 2024)",
                "status": "In preparation",
                "year": 2024,
                "authorship": "First",
                "url": "https://drive.google.com/file/d/1KezWQkWLD8p0yQe6wDBXji38ve13gFBx/view"
              },
              {
                "title": "Bridging Values and Technology in God-Saeng Phenomenon: Designing AI for Self-directed Well-being",
                "venue": "CHI 2024 Workshop on Designing (with) AI for Wellbeing",
                "status": "Accepted",
                "year": 2024,
                "authorship": "First",
                "url": "https://drive.google.com/file/d/1KezWQkWLD8p0yQe6wDBXji38ve13gFBx/view"
              }
            ],
            "mentors": "Hwajung Hong · Janghee Cho",
            "period": "October 2022–August 2023",
            "source": "https://drive.google.com/file/d/1KezWQkWLD8p0yQe6wDBXji38ve13gFBx/view"
          },
          {
            "place": "KAIST",
            "role": "Undergraduate research internship, classroom deployment of learnersourcing tools",
            "papers": [
              {
                "title": "Learnersourcing Modular and Dynamic Multiple Choice Questions",
                "venue": "Learning at Scale 2022 Workshop on Learnersourcing Student Generated Content",
                "status": "Accepted",
                "year": 2022,
                "authorship": "Second",
                "url": "https://drive.google.com/file/d/1KezWQkWLD8p0yQe6wDBXji38ve13gFBx/view"
              }
            ],
            "mentors": "Juho Kim",
            "period": "June 2021–September 2022",
            "source": "https://drive.google.com/file/d/1KezWQkWLD8p0yQe6wDBXji38ve13gFBx/view"
          }
        ],
        "graduationYear": 2025,
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "confirmed",
          "source": "https://drive.google.com/file/d/1KezWQkWLD8p0yQe6wDBXji38ve13gFBx/view",
          "note": "Application-time CV lists workshop acceptances and manuscripts under review; subsequent CHI/CSCW acceptances are not backdated."
        }
      },
      {
        "id": "md-toki-tahmid",
        "name": "Md Toki Tahmid",
        "school": "Bangladesh University of Engineering and Technology",
        "year": 2024,
        "major": "Computer Science and Engineering",
        "educationSource": "https://tokitahmid64.github.io/pdfs/Toki_CV_FINAL.pdf",
        "source": "https://drive.google.com/file/d/147TTO_69Nnpg8OoECg3C8oPBDfz7G93e/view?usp=sharing",
        "research": [
          {
            "place": "Bangladesh University of Engineering and Technology",
            "role": "Undergraduate research, protein language models, computational proteomics and genomics",
            "papers": [
              {
                "title": "TransBind: Enhancing Precise Detection of DNA-Binding Proteins and DNA-Protein Binding Residues Using Language Models and Deep Learning",
                "venue": "Communications Biology",
                "status": "Accepted",
                "year": 2024,
                "authorship": "First",
                "url": "https://drive.google.com/file/d/147TTO_69Nnpg8OoECg3C8oPBDfz7G93e/view?usp=sharing"
              },
              {
                "title": "BiRNA-BERT Allows Efficient RNA Language Modeling with Adaptive Tokenization",
                "venue": "ENLSP Workshop at NeurIPS 2024 · Spotlight",
                "status": "Accepted",
                "year": 2024,
                "authorship": "First",
                "url": "https://www.biorxiv.org/content/10.1101/2024.07.02.601703v2"
              },
              {
                "title": "EmbedSimScore: Advancing Protein Similarity Analysis with Structural and Contextual Embeddings",
                "venue": "Self-Supervised Learning Workshop at NeurIPS 2024",
                "status": "Accepted",
                "year": 2024,
                "authorship": "Equal first",
                "url": "https://www.biorxiv.org/content/10.1101/2024.09.26.615264v1"
              },
              {
                "title": "BioLLMNet: Enhancing RNA-Interaction Prediction with a Specialized Cross-LLM Transformation Network",
                "venue": "Briefings in Bioinformatics",
                "status": "Submitted",
                "year": 2024,
                "authorship": "First",
                "url": "https://tokitahmid64.github.io/pdfs/Toki_CV_FINAL.pdf"
              },
              {
                "title": "wQFM-TREE: Highly Accurate and Scalable Quartet-Based Species Tree Inference from Gene Trees",
                "venue": "Bioinformatics Advances",
                "status": "Submitted",
                "year": 2024,
                "authorship": "Fifth",
                "url": "https://tokitahmid64.github.io/pdfs/Toki_CV_FINAL.pdf"
              }
            ],
            "mentors": "Md. Shamsuzzoha Bayzid",
            "period": "July 2021–December 2024",
            "source": "https://tokitahmid64.github.io/pdfs/Toki_CV_FINAL.pdf"
          },
          {
            "place": "MIT",
            "role": "Remote research internship, Computational Connectomics Lab",
            "papers": [
              {
                "title": "Structure Matters: Deciphering Neural Network’s Properties from its Structure",
                "venue": "Symmetry and Geometry in Neural Representations Workshop at NeurIPS 2024",
                "status": "Accepted",
                "year": 2024,
                "authorship": "Equal first",
                "url": "https://drive.google.com/file/d/147TTO_69Nnpg8OoECg3C8oPBDfz7G93e/view?usp=sharing"
              }
            ],
            "mentors": "Nir Shavit · Lu Mi",
            "period": "July 2023–December 2024",
            "source": "https://tokitahmid64.github.io/pdfs/Toki_CV_FINAL.pdf"
          },
          {
            "place": "Carnegie Mellon University",
            "role": "Remote research internship, XuLab · cryo-electron tomography",
            "papers": [
              {
                "title": "TomoPicker: Annotation-Efficient Particle Picking in cryo-electron Tomograms",
                "venue": "MLSB Workshop at NeurIPS 2024",
                "status": "Accepted",
                "year": 2024,
                "authorship": "Third",
                "url": "https://www.biorxiv.org/content/10.1101/2024.11.04.620735v1"
              }
            ],
            "mentors": "Min Xu",
            "period": "January–December 2024",
            "source": "https://tokitahmid64.github.io/pdfs/Toki_CV_FINAL.pdf"
          },
          {
            "place": "University of California, Riverside",
            "role": "Research collaboration, RNA language modeling",
            "papers": [],
            "mentors": "Yue Dong",
            "source": "https://drive.google.com/file/d/147TTO_69Nnpg8OoECg3C8oPBDfz7G93e/view?usp=sharing"
          },
          {
            "place": "Bangladesh University of Engineering and Technology",
            "role": "Undergraduate research, Structural and Functional Genomics Research Group",
            "papers": [
              {
                "title": "LOCAS: Multi-label mRNA Localization with Supervised Contrastive Learning",
                "venue": "MLSB Workshop at NeurIPS 2024",
                "status": "Accepted",
                "year": 2024,
                "authorship": "Equal first",
                "url": "https://tokitahmid64.github.io/pdfs/Toki_CV_FINAL.pdf"
              },
              {
                "title": "DeepRNA-Twist: Language Model Guided RNA Torsion Angle Prediction with Attention-Inception Network",
                "venue": "Briefings in Bioinformatics",
                "status": "Submitted",
                "year": 2024,
                "authorship": "Second",
                "url": "https://tokitahmid64.github.io/pdfs/Toki_CV_FINAL.pdf"
              },
              {
                "title": "GraFusionNet: Integrating Node, Edge, and Semantic Features for Enhanced Graph Representations",
                "venue": "Preprint",
                "status": "Preprint",
                "year": 2024,
                "authorship": "First",
                "url": "https://www.biorxiv.org/content/10.1101/2024.11.22.624875v1"
              }
            ],
            "mentors": "M. Saifur Rahman",
            "period": "July 2023–December 2024",
            "source": "https://tokitahmid64.github.io/pdfs/Toki_CV_FINAL.pdf"
          },
          {
            "place": "Bangladesh University of Engineering and Technology",
            "role": "Undergraduate research, RNA sequence generation",
            "papers": [
              {
                "title": "RNA-DCGen: Dual Constrained RNA Sequence Generation with LLM-Attack",
                "venue": "MLSB Workshop at NeurIPS 2024",
                "status": "Accepted",
                "year": 2024,
                "authorship": "Equal first",
                "url": "https://www.biorxiv.org/content/10.1101/2024.09.23.614570v1"
              }
            ],
            "mentors": "Atif Rahman",
            "source": "https://drive.google.com/file/d/147TTO_69Nnpg8OoECg3C8oPBDfz7G93e/view?usp=sharing"
          },
          {
            "place": "Bangladesh University of Engineering and Technology",
            "role": "Undergraduate research, Next Generation Computing Lab",
            "papers": [
              {
                "title": "Analyzing Impacts on Physiological Aspects of Rickshaw Pullers due to Heat Exposure",
                "venue": "NSYSS 2024 Symposium",
                "status": "Accepted",
                "year": 2024,
                "url": "https://tokitahmid64.github.io/pdfs/Toki_CV_FINAL.pdf"
              },
              {
                "title": "A Paradigm Shift in Mouza Map Vectorization: A Human-Machine Collaboration Approach",
                "venue": "IEEE Transactions on Pattern Analysis and Machine Intelligence",
                "status": "Submitted",
                "year": 2024,
                "url": "https://tokitahmid64.github.io/pdfs/Toki_CV_FINAL.pdf"
              },
              {
                "title": "A Ubiquitous Method for Predicting Underground Petroleum Deposits Based on Satellite Data",
                "venue": "Scientific Reports",
                "status": "Accepted",
                "year": 2023,
                "authorship": "Second",
                "url": "https://doi.org/10.1038/s41598-023-32054-0"
              },
              {
                "title": "Long-Range Low-Cost Networking for Real-Time Monitoring of Rail Tracks in Developing Countries",
                "venue": "ICTD 2022",
                "status": "Accepted",
                "year": 2022,
                "authorship": "Seventh",
                "url": "https://doi.org/10.1145/3572334.3581765"
              },
              {
                "title": "Escalating Post-Disaster Rescue Missions Through Ad-Hoc Victim Localization Exploiting Wi-Fi Networks",
                "venue": "Heliyon",
                "status": "Accepted",
                "year": 2022,
                "authorship": "Fourth",
                "url": "https://doi.org/10.1016/j.heliyon.2022.e09314"
              }
            ],
            "mentors": "A. B. M. Alim Al Islam",
            "period": "January 2022–July 2024",
            "source": "https://tokitahmid64.github.io/pdfs/Toki_CV_FINAL.pdf"
          },
          {
            "place": "Bangladesh University of Engineering and Technology",
            "role": "Research collaboration, biomedical signal processing",
            "papers": [
              {
                "title": "MD-CardioNet: A Multi-Dimensional Deep Neural Network for Cardiovascular Disease Diagnosis from Electrocardiogram",
                "venue": "IEEE Journal of Biomedical and Health Informatics",
                "status": "Accepted",
                "year": 2023,
                "authorship": "First",
                "url": "https://doi.org/10.1109/JBHI.2023.3308856"
              }
            ],
            "mentors": "Shaikh Anowarul Fattah",
            "source": "https://drive.google.com/file/d/147TTO_69Nnpg8OoECg3C8oPBDfz7G93e/view?usp=sharing"
          },
          {
            "place": "Bangladesh University of Engineering and Technology",
            "role": "Research collaboration, epidemic forecasting, cybersecurity and biomedical computing",
            "papers": [
              {
                "title": "Forecasting COVID-19 Cases: A Comparative Analysis Between Recurrent and Convolutional Neural Networks",
                "venue": "Results in Physics",
                "status": "Accepted",
                "year": 2021,
                "authorship": "Second",
                "url": "https://doi.org/10.1016/j.rinp.2021.104137"
              },
              {
                "title": "State-of-the-Art Artificial Intelligence Based Cyber Defense Model",
                "venue": "SOLI 2021",
                "status": "Accepted",
                "year": 2021,
                "authorship": "Second",
                "url": "https://doi.org/10.1109/SOLI54607.2021.9672393"
              },
              {
                "title": "Artificial Intelligence Based Cybersecurity: Two-Step Suitability Test",
                "venue": "SOLI 2021",
                "status": "Accepted",
                "year": 2021,
                "authorship": "Second",
                "url": "https://doi.org/10.1109/SOLI54607.2021.9672437"
              },
              {
                "title": "Advancing Noninvasive Mechanical Ventilation: Simulating Techniques for Improved Respiratory Care",
                "venue": "Preprint",
                "status": "Preprint",
                "year": 2024,
                "authorship": "First",
                "url": "https://www.biorxiv.org/content/10.1101/2024.10.01.616043v1"
              },
              {
                "title": "Connecting the Dots: Leveraging Spatio-Temporal Graph Neural Networks for Accurate Bangla Sign Language Recognition",
                "venue": "Preprint",
                "status": "Preprint",
                "year": 2024,
                "authorship": "Third",
                "url": "https://arxiv.org/abs/2401.12210"
              }
            ],
            "source": "https://drive.google.com/file/d/147TTO_69Nnpg8OoECg3C8oPBDfz7G93e/view?usp=sharing"
          },
          {
            "place": "Samsung Research and Development Bangladesh",
            "role": "Machine learning engineer and research assistant, LLM-assisted software testing",
            "papers": [],
            "mentors": "Anindya Iqbal",
            "period": "From January 2024",
            "source": "https://tokitahmid64.github.io/pdfs/Toki_CV_FINAL.pdf"
          }
        ],
        "graduationYear": 2024
      }
    ]
  },
  {
    "id": "cornell",
    "name": "Cornell",
    "program": "Computer Science PhD",
    "applicants": [
      {
        "name": "Jake Hyun",
        "id": "jake-hyun",
        "school": "Seoul National University",
        "major": "Computer Science and Engineering",
        "graduationYear": 2025,
        "year": 2024,
        "source": "https://syphon.tistory.com/138",
        "sourceLabel": "Application blog",
        "educationSource": "https://jakehyun.com/",
        "research": [
          {
            "place": "Seoul National University",
            "role": "Research internship, LLM quantization and inference",
            "source": "https://jakehyun.com/",
            "papers": [
              {
                "title": "DecDEC: A Systems Approach to Advancing Low-Bit LLM Quantization",
                "venue": "OSDI 2025",
                "status": "Submitted",
                "authorship": "Equal first",
                "year": 2024,
                "url": "https://arxiv.org/abs/2412.20185"
              },
              {
                "title": "Any-Precision LLM: Low-Cost Deployment of Multiple, Different-Sized LLMs",
                "venue": "ICML 2024",
                "status": "Accepted",
                "authorship": "Second",
                "year": 2024,
                "url": "https://proceedings.mlr.press/v235/park24e.html"
              }
            ],
            "mentors": "Jae W. Lee",
            "period": "From 2024"
          },
          {
            "place": "Seoul National University",
            "role": "Undergraduate research, dimensionality reduction",
            "source": "https://jakehyun.com/",
            "papers": [
              {
                "title": "UMATO: Bridging Local and Global Structures for Reliable Visual Analytics with Dimensionality Reduction",
                "venue": "IEEE Transactions on Visualization and Computer Graphics",
                "status": "Submitted",
                "authorship": "Fourth",
                "year": 2024,
                "url": "https://arxiv.org/abs/2508.16227"
              },
              {
                "title": "ZADU: A Python Library for Evaluating the Reliability of Dimensionality Reduction Embeddings",
                "venue": "IEEE VIS 2023",
                "status": "Accepted",
                "authorship": "Fifth",
                "year": 2023,
                "url": "https://ieeexplore.ieee.org/document/10360886"
              }
            ],
            "mentors": "Jinwook Seo",
            "period": "2023"
          }
        ]
      },
      {
        "id": "thu-00042",
        "name": "lihan",
        "school": "Tsinghua University",
        "year": 2023,
        "major": "Fundamental Sciences and Energy and Power Engineering",
        "educationSource": "https://database.feiyue.online/applicant/Applicant-00042/",
        "source": "https://database.feiyue.online/applicant/Applicant-00042/",
        "sourceLabel": "View application profile",
        "research": [
          {
            "place": "Tsinghua University",
            "role": "Institute for Interdisciplinary Information Sciences, robot learning",
            "papers": [
              {
                "venue": "",
                "status": "Preprint",
                "authorship": "Equal first",
                "title": "Robot learning paper — preprint"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00042/"
          },
          {
            "place": "Stanford University",
            "role": "Summer research, robot learning",
            "papers": [
              {
                "venue": "ICRA",
                "status": "Submitted",
                "authorship": "First",
                "title": "Robot learning paper — ICRA submission"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00042/"
          }
        ],
        "program": "Computer Science PhD — admitted",
        "paperReview": {
          "checked": "2026-11-03",
          "count": null,
          "status": "skipped",
          "source": "https://database.feiyue.online/applicant/Applicant-00042/",
          "note": "Alias; further author matching skipped at user request. Publication count remains unknown."
        }
      },
      {
        "id": "youming-deng",
        "name": "Youming Deng",
        "school": "Wuhan University",
        "major": "Information and Digital Technology",
        "educationSource": "https://denghilbert.github.io/images/resume.pdf",
        "source": "https://denghilbert.github.io/blog/PhD%E7%94%B3%E8%AF%B7%E5%9B%9E%E5%BF%86.html",
        "sourceLabel": "Application blog",
        "research": [
          {
            "place": "UC Merced",
            "role": "Remote research internship, inverse rendering",
            "papers": [
              {
                "title": "Physics-based Indirect Illumination for Inverse Rendering",
                "venue": "CVPR 2023",
                "authorship": "First",
                "status": "Submitted",
                "year": 2022,
                "url": "https://denghilbert.github.io/blog/PhD%E7%94%B3%E8%AF%B7%E5%9B%9E%E5%BF%86.html"
              }
            ],
            "mentors": "Ming-Hsuan Yang · Xueting Li · Sifei Liu",
            "period": "From April 2022",
            "source": "https://denghilbert.github.io/blog/PhD%E7%94%B3%E8%AF%B7%E5%9B%9E%E5%BF%86.html"
          },
          {
            "place": "Wuhan University",
            "role": "Undergraduate research, scene graph generation",
            "papers": [
              {
                "title": "Hierarchical Memory Learning for Fine-Grained Scene Graph Generation",
                "venue": "ECCV 2022",
                "authorship": "First",
                "status": "Accepted",
                "url": "https://denghilbert.github.io/blog/PhD%E7%94%B3%E8%AF%B7%E5%9B%9E%E5%BF%86.html"
              }
            ],
            "mentors": "Yansheng Li",
            "period": "June 2021–April 2022",
            "source": "https://denghilbert.github.io/blog/PhD%E7%94%B3%E8%AF%B7%E5%9B%9E%E5%BF%86.html"
          }
        ],
        "graduationYear": 2023,
        "year": 2022
      },
      {
        "id": "aditya-chetan",
        "name": "Aditya Chetan",
        "school": "IIIT Delhi",
        "year": 2021,
        "major": "Computer Science and Applied Mathematics",
        "graduationYear": 2021,
        "educationSource": "https://justachetan.github.io/assets/pdf/AdityaChetan_CV.pdf",
        "source": "https://justachetan.github.io/assets/pdf/cornell_sop.pdf",
        "research": [
          {
            "place": "IIIT Delhi",
            "role": "Undergraduate research and thesis, social network anomaly detection",
            "period": "2018–2021",
            "mentors": "Tanmoy Chakraborty",
            "source": "https://justachetan.github.io/assets/pdf/cornell_sop.pdf",
            "papers": [
              {
                "venue": "ACM TIST 2020",
                "status": "Accepted",
                "authorship": "Equal third",
                "title": "Analyzing and Detecting Collusive Users Involved in Blackmarket Retweeting Activities",
                "url": "https://uditarora.com/documents/tist-2020.pdf"
              },
              {
                "venue": "WSDM 2019",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "CoReRank: Ranking to Detect Users Involved in Blackmarket-based Collusive Retweeting Activities",
                "url": "https://github.com/LCS2-IIITD/CoReRank-WSDM-2019"
              },
              {
                "venue": "ASONAM 2018",
                "status": "Accepted",
                "authorship": "Equal second",
                "title": "Retweet Us, We Will Retweet You: Spotting Collusive Retweeters Involved in Blackmarket Services",
                "url": "https://arxiv.org/abs/1806.08979"
              }
            ]
          },
          {
            "place": "IIIT Delhi",
            "role": "Independent study, differential geometry",
            "period": "August 2020–August 2021",
            "mentors": "Kaushik Kalyanaraman",
            "source": "https://justachetan.github.io/assets/pdf/cornell_sop.pdf",
            "papers": []
          },
          {
            "place": "IIIT Delhi",
            "role": "Research collaboration, podcast popularity",
            "mentors": "Brihi Joshi · Shravika Mittal",
            "mentorLabel": "With",
            "source": "https://aclanthology.org/2020.nlp4musa-1.3/",
            "papers": [
              {
                "venue": "NLP4MusA at ISMIR 2020",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Did You ‘Read’ the Next Episode? Using Textual Cues for Predicting Podcast Popularity",
                "url": "https://aclanthology.org/2020.nlp4musa-1.3/"
              }
            ]
          },
          {
            "place": "Microsoft",
            "role": "Research fellow, Microsoft Research India · adversarial robustness",
            "period": "From September 2021",
            "mentors": "Nipun Kwatra",
            "source": "https://justachetan.github.io/assets/pdf/cornell_sop.pdf",
            "papers": []
          },
          {
            "place": "Microsoft",
            "role": "Research internship, Microsoft Research India",
            "period": "January–June 2021",
            "mentors": "Nipun Kwatra",
            "source": "https://justachetan.github.io/assets/pdf/AdityaChetan_CV.pdf",
            "papers": []
          },
          {
            "place": "Microsoft",
            "role": "Global Delivery internship, Emerging Capabilities",
            "period": "June–July 2017",
            "source": "https://justachetan.github.io/assets/pdf/AdityaChetan_CV.pdf",
            "papers": []
          },
          {
            "place": "Fields Institute",
            "role": "Research internship, signed distance fields",
            "period": "July–August 2021",
            "mentors": "Silvia Sellán · Alec Jacobson",
            "source": "https://justachetan.github.io/assets/pdf/AdityaChetan_CV.pdf",
            "papers": []
          },
          {
            "place": "University of Toronto",
            "role": "Research, learning exact signed distance fields",
            "mentors": "Alec Jacobson",
            "source": "https://justachetan.github.io/assets/pdf/cornell_sop.pdf",
            "papers": []
          },
          {
            "place": "University of Toronto",
            "role": "Research collaboration, swept volumes",
            "period": "2021",
            "mentors": "Alec Jacobson · Silvia Sellán · Sarah Kushner",
            "mentorLabel": "Collaborators",
            "source": "https://justachetan.github.io/assets/pdf/cornell_sop.pdf",
            "papers": []
          },
          {
            "place": "Max Planck Institute for Informatics",
            "role": "Research collaborator",
            "period": "From January 2020",
            "mentors": "Andrew Yates · Paramita Mirza",
            "source": "https://justachetan.github.io/assets/pdf/AdityaChetan_CV.pdf",
            "papers": []
          },
          {
            "place": "Max Planck Institute for Informatics",
            "role": "Visiting scholar, information extraction",
            "period": "July–December 2019",
            "mentors": "Andrew Yates · Paramita Mirza",
            "source": "https://justachetan.github.io/assets/pdf/cornell_sop.pdf",
            "papers": []
          },
          {
            "place": "IBM Research India",
            "role": "Undergraduate research",
            "period": "November 2017–March 2019",
            "mentors": "Sameep Mehta",
            "source": "https://justachetan.github.io/assets/pdf/AdityaChetan_CV.pdf",
            "papers": [
              {
                "venue": "Preprint",
                "status": "Preprint",
                "year": 2018,
                "authorship": "Fourth",
                "title": "Generating Clues for Gender-based Occupation De-biasing in Text",
                "url": "https://arxiv.org/abs/1804.03839"
              }
            ]
          },
          {
            "place": "Goldman Sachs",
            "role": "Summer analyst, R&D Engineering",
            "period": "June–July 2020",
            "source": "https://justachetan.github.io/assets/pdf/AdityaChetan_CV.pdf",
            "papers": []
          },
          {
            "place": "Philips Research India",
            "role": "Research internship, Radiology & Cardiology Informatics",
            "period": "May–July 2019",
            "source": "https://justachetan.github.io/assets/pdf/AdityaChetan_CV.pdf",
            "papers": []
          }
        ]
      },
      {
        "id": "rajiv-movva",
        "name": "Rajiv Movva",
        "school": "Massachusetts Institute of Technology",
        "year": 2021,
        "major": "Computer Science",
        "graduationYear": 2022,
        "educationSource": "https://rajivmovva.com/cv.pdf",
        "source": "https://docs.google.com/document/d/1BWIeqbMG8XexzYpkumdcC0GwQeDDrlSpTed5hsMFNFg/edit",
        "research": [
          {
            "place": "MIT",
            "role": "Feminist theory course research, algorithmic fairness in criminal justice",
            "source": "https://docs.google.com/document/d/1BWIeqbMG8XexzYpkumdcC0GwQeDDrlSpTed5hsMFNFg/edit",
            "papers": [
              {
                "venue": "Preprint",
                "status": "Preprint",
                "year": 2021,
                "authorship": "First",
                "title": "Fairness Deconstructed: A Sociotechnical View of ‘Fair’ Algorithms in Criminal Justice",
                "url": "https://arxiv.org/abs/2106.13455v1"
              }
            ]
          },
          {
            "place": "MIT",
            "role": "Research, Carbin Lab · neural network pruning",
            "period": "2020–2021",
            "mentors": "Jonathan Frankle · Michael Carbin",
            "source": "https://rajivmovva.com/cv.pdf",
            "papers": [
              {
                "venue": "ICLR SEDL Workshop 2021",
                "status": "Accepted",
                "authorship": "First",
                "title": "Studying the Consistency and Composability of Lottery Ticket Pruning Masks",
                "url": "https://arxiv.org/abs/2104.14753"
              }
            ]
          },
          {
            "place": "MIT",
            "role": "Research, neural machine translation pruning",
            "mentors": "Yonatan Belinkov · Jonathan Frankle",
            "mentorLabel": "Advice from",
            "source": "https://aclanthology.org/2020.blackboxnlp-1.19.pdf",
            "papers": [
              {
                "venue": "BlackboxNLP at EMNLP 2020",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Dissecting Lottery Ticket Transformers: Structural and Behavioral Study of Sparse Neural Machine Translation",
                "url": "https://aclanthology.org/2020.blackboxnlp-1.19/"
              }
            ]
          },
          {
            "place": "MIT",
            "role": "Research, D’Ignazio Lab · feminist and participatory machine learning",
            "period": "2021",
            "mentors": "Catherine D’Ignazio · Harini Suresh",
            "source": "https://rajivmovva.com/cv.pdf",
            "papers": []
          },
          {
            "place": "Stanford University",
            "role": "Research collaboration, Dumontier Lab",
            "period": "2016",
            "mentors": "Remzi Celebi",
            "mentorLabel": "Mentor",
            "source": "https://rajivmovva.com/people",
            "papers": [
              {
                "venue": "Scientific Reports 2019",
                "status": "Accepted",
                "authorship": "Third",
                "title": "In-silico Prediction of Synergistic Anti-Cancer Drug Combinations Using Multi-omics Data",
                "url": "https://www.nature.com/articles/s41598-019-45236-6"
              }
            ]
          },
          {
            "place": "Stanford University",
            "role": "Research, Kundaje Lab",
            "period": "2017–2019",
            "mentors": "Peyton Greenside · Anshul Kundaje",
            "source": "https://rajivmovva.com/cv.pdf",
            "papers": [
              {
                "venue": "PLOS ONE 2019",
                "status": "Accepted",
                "authorship": "First",
                "title": "Deciphering Regulatory DNA Sequences and Noncoding Genetic Variants Using Neural Network Models of Massively Parallel Reporter Assays",
                "url": "https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0218073"
              }
            ]
          },
          {
            "place": "Stanford University",
            "role": "Research, Greenleaf Lab",
            "period": "2016",
            "mentors": "Alex Trevino · Nasa Sinnott-Armstrong",
            "mentorLabel": "Mentors",
            "source": "https://rajivmovva.com/people",
            "papers": []
          },
          {
            "place": "Apple",
            "role": "Research internship, Siri · language model compression",
            "period": "2021",
            "mentors": "Shayne Longpre · Jinhao Lei",
            "mentorLabel": "Collaborators",
            "source": "https://rajivmovva.com/people",
            "papers": []
          },
          {
            "place": "NVIDIA",
            "role": "Research internship, accelerated single-cell genomics",
            "period": "2020",
            "mentors": "Avantika Lal",
            "mentorLabel": "Collaborator",
            "source": "https://rajivmovva.com/people",
            "papers": []
          },
          {
            "place": "Genesis Therapeutics",
            "role": "Research internship, molecular binding prediction",
            "period": "2019",
            "source": "https://rajivmovva.com/cv.pdf",
            "papers": []
          },
          {
            "place": "Broad Institute",
            "role": "Research, Badran Lab · genetic code expansion",
            "period": "2018–2019",
            "mentors": "Erika DeBenedictis",
            "mentorLabel": "Mentor",
            "source": "https://rajivmovva.com/cv.pdf",
            "papers": []
          }
        ],
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "reviewed",
          "source": "https://rajivmovva.com/",
          "note": "Application inventory contains workshop papers, journals and a preprint; current research is later PhD work."
        }
      },
      {
        "id": "hongzheng-chen",
        "name": "Hongzheng Chen",
        "school": "Sun Yat-sen University",
        "major": "Computer Science",
        "educationSource": "https://chhzh123.github.io/blogs/2021-05-22-phd-application/",
        "source": "https://chhzh123.github.io/blogs/2021-05-22-phd-application/",
        "sourceLabel": "Application blog",
        "research": [
          {
            "place": "Sun Yat-sen University",
            "role": "Undergraduate research, FPGA scheduling",
            "papers": [
              {
                "title": "Entropy-directed scheduling for FPGA high-level synthesis",
                "venue": "IEEE TCAD",
                "authorship": "Second",
                "status": "Accepted",
                "year": 2019,
                "url": "https://chhzh123.github.io/blogs/2021-05-22-phd-application/"
              },
              {
                "title": "A Deep-Reinforcement-Learning-Based Scheduler for FPGA HLS",
                "venue": "ICCAD 2019",
                "authorship": "First",
                "status": "Accepted",
                "url": "https://chhzh123.github.io/blogs/2021-05-22-phd-application/"
              }
            ],
            "mentors": "Minghua Shen",
            "source": "https://chhzh123.github.io/blogs/2021-05-22-phd-application/"
          },
          {
            "place": "Cornell University",
            "role": "Remote research internship, computer systems",
            "papers": [],
            "mentors": "Zhiru Zhang",
            "period": "2020",
            "source": "https://chhzh123.github.io/blogs/2021-05-22-phd-application/"
          },
          {
            "place": "ByteDance AI Lab",
            "role": "Research internship",
            "papers": [],
            "source": "https://chhzh123.github.io/blogs/2021-05-22-phd-application/"
          }
        ],
        "graduationYear": 2021,
        "year": 2020,
        "paperReview": {
          "checked": "2026-11-03",
          "count": 1,
          "status": "corrected",
          "source": "https://chhzh123.github.io/",
          "note": "ICCAD 2019 is a full conference paper missed by the classifier; IEEE TCAD is a journal."
        }
      }
    ]
  },
  {
    "id": "yale",
    "name": "Yale University",
    "program": "Computer Science PhD",
    "applicants": [
      {
        "id": "enyan-zhang",
        "name": "Enyan Zhang",
        "school": "Brown University (transferred from Rutgers University)",
        "year": 2023,
        "major": "Applied Mathematics–Computer Science and Engineering",
        "graduationYear": 2024,
        "educationSource": "https://enyanz.com/files/Enyan_Zhang_CV.pdf",
        "source": "https://enyanz.com/posts/grad-school/yale_sop.pdf",
        "research": [
          {
            "place": "Brown University",
            "role": "Undergraduate research, LUNAR Lab",
            "period": "From February 2023",
            "mentors": "Michael Lepori · Ellie Pavlick",
            "mentorLabel": "With",
            "source": "https://enyanz.com/files/Enyan_Zhang_CV.pdf",
            "papers": [
              {
                "venue": "ICLR 2024",
                "status": "Submitted",
                "year": 2023,
                "authorship": "First",
                "title": "Instilling Inductive Biases with Subnetworks",
                "url": "https://arxiv.org/abs/2310.10899v1"
              }
            ]
          },
          {
            "place": "Brown University",
            "role": "Undergraduate Teaching and Research Award · Semantically Richer Word Embeddings",
            "period": "Fall 2023",
            "source": "https://enyanz.com/posts/grad-school/yale_sop.pdf",
            "papers": []
          },
          {
            "place": "Brown University",
            "role": "Research project, CLIP-based perception for the Spot robot",
            "period": "April–May 2023",
            "source": "https://enyanz.com/posts/grad-school/yale_sop.pdf",
            "papers": []
          },
          {
            "place": "Brown University",
            "role": "Teaching assistant, probability for computing and data science",
            "period": "Fall 2023",
            "source": "https://enyanz.com/files/Enyan_Zhang_CV.pdf",
            "papers": []
          },
          {
            "place": "Rutgers University",
            "role": "Research assistant, Department of Statistics",
            "period": "June–July 2021",
            "mentors": "Zijian Guo",
            "source": "https://statweb.rutgers.edu/zijguo/CV_ZGuo.pdf",
            "papers": []
          },
          {
            "place": "Trumpf Photonics",
            "role": "Mechanical design internship, robot workstation",
            "period": "June–August 2022",
            "source": "https://enyanz.com/posts/grad-school/yale_sop.pdf",
            "papers": []
          }
        ],
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "reviewed",
          "source": "https://enyanz.com/",
          "note": "Personal page labels Instilling Inductive Biases with Subnetworks under review; no verified accepted main paper before application."
        }
      }
    ]
  },
  {
    "id": "columbia",
    "name": "Columbia",
    "program": "Computer Science PhD",
    "applicants": [
      {
        "id": "tianyi-lorena-yan",
        "name": "Tianyi Lorena Yan",
        "school": "University of Southern California",
        "year": 2024,
        "major": "Computer Science",
        "graduationYear": 2024,
        "educationSource": "https://tianyi-lorena-yan-me.web.app/tianyi_lorena_yan_cv.pdf",
        "source": "https://tianyi-lorena-yan-me.web.app/tianyi_lorena_yan_sop.pdf",
        "research": [
          {
            "place": "University of Southern California",
            "role": "Undergraduate research, language model robustness",
            "mentors": "Muhao Chen · Fei Wang",
            "mentorLabel": "Advisor & mentor",
            "source": "https://tianyi-lorena-yan-me.web.app/",
            "papers": [
              {
                "venue": "EMNLP Findings 2024",
                "status": "Accepted",
                "authorship": "Fourth",
                "title": "Monotonic Paraphrasing Improves Generalization of Language Model Prompting",
                "url": "https://aclanthology.org/2024.findings-emnlp.576/"
              },
              {
                "venue": "ICLR 2025",
                "status": "Submitted",
                "year": 2024,
                "authorship": "Eleventh",
                "title": "MuirBench: A Comprehensive Benchmark for Robust Multi-image Understanding",
                "url": "https://arxiv.org/abs/2406.09411v1"
              },
              {
                "venue": "ACL Findings 2024",
                "status": "Accepted",
                "authorship": "First",
                "title": "Contrastive Instruction Tuning",
                "url": "https://aclanthology.org/2024.findings-acl.613/"
              },
              {
                "venue": "ACL Findings 2023",
                "status": "Accepted",
                "authorship": "Third",
                "title": "Robust Natural Language Understanding with Residual Attention Debiasing",
                "url": "https://aclanthology.org/2023.findings-acl.32/"
              }
            ]
          },
          {
            "place": "University of Southern California",
            "role": "Research, training–test similarity and language-model evaluation",
            "source": "https://github.com/Lorenayannnnn/Lorenayannnnn.github.io/blob/0eb9d7faa95581bb8b0866b4cd04211a7bd71847/tianyi_yan_sop.pdf",
            "papers": []
          },
          {
            "place": "Tsinghua AIR",
            "role": "Research internship, diffusion-based molecule generation",
            "period": "May–August 2023",
            "mentors": "Hao Zhou",
            "source": "https://tianyi-lorena-yan-me.web.app/tianyi_lorena_yan_cv.pdf",
            "papers": []
          },
          {
            "place": "University of Southern California",
            "role": "Teaching assistant, machine learning and algorithms",
            "period": "2022–2024",
            "source": "https://tianyi-lorena-yan-me.web.app/tianyi_lorena_yan_cv.pdf",
            "papers": []
          },
          {
            "place": "University of Southern California",
            "role": "Co-founder, Ctrl+F research and internship resources",
            "period": "2021–2022",
            "source": "https://tianyi-lorena-yan-me.web.app/tianyi_lorena_yan_cv.pdf",
            "papers": []
          },
          {
            "place": "University of Southern California",
            "role": "Leader, CSSA career development mentorship program",
            "period": "2021–2023",
            "source": "https://tianyi-lorena-yan-me.web.app/tianyi_lorena_yan_cv.pdf",
            "papers": []
          },
          {
            "place": "California Chinese Entrepreneurship Conference",
            "role": "Organizer",
            "period": "2022",
            "source": "https://tianyi-lorena-yan-me.web.app/tianyi_lorena_yan_cv.pdf",
            "papers": []
          },
          {
            "place": "Microsoft",
            "role": "Software engineering internship, M365 Deployment · monitoring dashboard",
            "period": "June–August 2022",
            "source": "https://tianyi-lorena-yan-me.web.app/tianyi_lorena_yan_cv.pdf",
            "papers": []
          }
        ],
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "reviewed",
          "source": "https://tianyi-lorena-yan-me.web.app/",
          "note": "Three 2023–2024 papers are Findings. Page dates MuirBench acceptance to January 2025, after the 2024 applications."
        }
      },
      {
        "id": "shreyas-havaldar",
        "name": "Shreyas Havaldar",
        "school": "IIT Hyderabad",
        "year": 2023,
        "major": "Computer Science",
        "graduationYear": 2022,
        "educationSource": "https://www.cs.columbia.edu/2024/meet-the-scholars-phd-students-with-prestigious-fellowships/",
        "source": "https://drive.google.com/file/d/1A0n07nq6Oslb-E7RRiKSYra-KqRbZsHI/view",
        "research": [
          {
            "place": "Google Research India",
            "role": "Pre-doctoral research, privacy and aggregation",
            "period": "2022–2023",
            "mentors": "Aravindan Raghuveer · Rishi Saket",
            "source": "https://drive.google.com/file/d/1A0n07nq6Oslb-E7RRiKSYra-KqRbZsHI/view",
            "papers": [
              {
                "venue": "Preprint",
                "status": "Preprint",
                "year": 2023,
                "authorship": "Third",
                "title": "Label Differential Privacy via Aggregation",
                "url": "https://arxiv.org/abs/2310.10092v1"
              }
            ]
          },
          {
            "place": "Google Research India",
            "role": "Pre-doctoral research, Advertising Sciences · fairness and aggregate-data learning",
            "period": "2022–2023",
            "mentors": "Aravindan Raghuveer · Karthikeyan Shanmugam",
            "source": "https://drive.google.com/file/d/1A0n07nq6Oslb-E7RRiKSYra-KqRbZsHI/view",
            "papers": [
              {
                "venue": "ICLR 2024",
                "status": "Submitted",
                "year": 2023,
                "authorship": "Equal first",
                "title": "Learning from Label Proportions: Bootstrapping Supervised Learners via Belief Propagation",
                "url": "https://arxiv.org/abs/2310.08056v1",
                "also": [
                  {
                    "venue": "Regulatable ML at NeurIPS 2023",
                    "status": "Accepted",
                    "url": "https://arxiv.org/abs/2310.08056v2"
                  }
                ]
              },
              {
                "venue": "AAAI 2024",
                "status": "Accepted",
                "year": 2023,
                "authorship": "Equal first",
                "title": "Improving Fairness-Accuracy Tradeoff with Few Test Samples under Covariate Shift",
                "url": "https://arxiv.org/abs/2310.07535v2",
                "also": [
                  {
                    "venue": "Algorithmic Fairness at NeurIPS 2023",
                    "status": "Accepted",
                    "url": "https://arxiv.org/abs/2310.07535v2"
                  }
                ]
              }
            ]
          },
          {
            "place": "Google Research India",
            "role": "Teaching",
            "source": "https://drive.google.com/file/d/1A0n07nq6Oslb-E7RRiKSYra-KqRbZsHI/view",
            "papers": []
          },
          {
            "place": "IIT Hyderabad",
            "role": "Undergraduate research, Machine Learning and Vision Lab · robustness and interpretability",
            "mentors": "Vineeth N. Balasubramanian",
            "source": "https://drive.google.com/file/d/1A0n07nq6Oslb-E7RRiKSYra-KqRbZsHI/view",
            "papers": [
              {
                "venue": "Pattern Recognition Letters 2021",
                "status": "Accepted",
                "authorship": "Third",
                "title": "On the Benefits of Defining Vicinal Distributions in Latent Space",
                "url": "https://raiithold.iith.ac.in/10539/1/Pattern_Recognition_Letters.pdf",
                "also": [
                  {
                    "venue": "CVPR 2021 Workshop · Best Paper",
                    "status": "Accepted",
                    "url": "https://www.iith.ac.in/news/2021/07/01/Puneet-Vedant-Shreyas-Vineeth-N-Balasubramanian-Best-Paper-at-CVPR-2021/"
                  },
                  {
                    "venue": "RobustML, Responsible AI & Generalization at ICLR 2021",
                    "status": "Accepted",
                    "url": "https://raw.githubusercontent.com/iclr2021generalization/iclr2021generalization.github.io/main/assets/pdf/papers/00.pdf"
                  }
                ]
              }
            ]
          },
          {
            "place": "IIT Hyderabad",
            "role": "Honors thesis, union-closed families",
            "mentors": "Rogers Mathew",
            "source": "https://github.com/ShreyasHavaldar7/ShreyasHavaldar7.github.io/blob/84709e2e5ff714277f28224fe5c219146b917353/about.html",
            "papers": []
          },
          {
            "place": "IIT Hyderabad",
            "role": "Research, quantum algorithm noise",
            "mentors": "M. V. Panduranga Rao",
            "source": "https://github.com/ShreyasHavaldar7/ShreyasHavaldar7.github.io/blob/84709e2e5ff714277f28224fe5c219146b917353/about.html",
            "papers": []
          },
          {
            "place": "IIT Hyderabad",
            "role": "Research, privacy in deep learning",
            "mentors": "Maria Francis",
            "source": "https://drive.google.com/file/d/1A0n07nq6Oslb-E7RRiKSYra-KqRbZsHI/view",
            "papers": []
          },
          {
            "place": "IIT Hyderabad",
            "role": "Research, complexity of Nash equilibrium algorithms",
            "mentors": "Karteek Sreenivasaiah",
            "source": "https://github.com/ShreyasHavaldar7/ShreyasHavaldar7.github.io/blob/84709e2e5ff714277f28224fe5c219146b917353/about.html",
            "papers": []
          },
          {
            "place": "IIT Hyderabad",
            "role": "Teaching",
            "source": "https://drive.google.com/file/d/1A0n07nq6Oslb-E7RRiKSYra-KqRbZsHI/view",
            "papers": []
          },
          {
            "place": "National Programme on Technology Enhanced Learning",
            "role": "Teaching",
            "source": "https://drive.google.com/file/d/1A0n07nq6Oslb-E7RRiKSYra-KqRbZsHI/view",
            "papers": []
          },
          {
            "place": "Adobe Research",
            "role": "Research internship, Big Data Experience Lab · accessible tagging",
            "period": "Summer 2021",
            "mentors": "Anandhavelu Natarajan · Sharmila Reddy Nangi",
            "mentorLabel": "Mentors",
            "source": "https://github.com/ShreyasHavaldar7/ShreyasHavaldar7.github.io/blob/84709e2e5ff714277f28224fe5c219146b917353/about.html",
            "papers": []
          },
          {
            "place": "Japan Infra Waymark",
            "role": "Machine learning internship, aerial image segmentation",
            "period": "Summer 2020",
            "mentors": "Arifumi Matsumoto",
            "mentorLabel": "Mentor",
            "source": "https://github.com/ShreyasHavaldar7/ShreyasHavaldar7.github.io/blob/84709e2e5ff714277f28224fe5c219146b917353/about.html",
            "papers": []
          }
        ]
      },
      {
        "id": "sweta-karlekar",
        "name": "Sweta Karlekar",
        "school": "University of North Carolina at Chapel Hill",
        "year": 2022,
        "major": "Computer Science; Entrepreneurship minor",
        "graduationYear": 2020,
        "educationSource": "https://sweta.dev/cv.html",
        "source": "https://drive.google.com/file/d/13vxWX81tUA-qzIvMpctHSjooL2hYmYYf/view",
        "research": [
          {
            "place": "University of North Carolina at Chapel Hill",
            "role": "Undergraduate research assistant",
            "period": "August 2017–May 2018",
            "mentors": "Mohit Bansal",
            "source": "https://sweta.dev/cv.html",
            "papers": [
              {
                "venue": "EMNLP 2018",
                "status": "Accepted",
                "authorship": "First",
                "title": "SafeCity: Understanding Diverse Forms of Sexual Harassment Personal Stories",
                "url": "https://aclanthology.org/D18-1303/"
              },
              {
                "venue": "NAACL 2018",
                "status": "Accepted",
                "authorship": "First",
                "title": "Detecting Linguistic Characteristics of Alzheimer's Dementia by Interpreting Neural Models",
                "url": "https://aclanthology.org/N18-2110/"
              },
              {
                "venue": "NAACL 2018 Workshop",
                "status": "Accepted",
                "authorship": "First",
                "title": "#MeToo: Neural Detection and Explanation of Language in Personal Abuse Stories",
                "url": "https://www.cs.unc.edu/~mbansal/papers/winlp2018-karlekar-bansal.pdf"
              }
            ]
          },
          {
            "place": "Meta (Facebook)",
            "role": "Applied machine learning research engineer, Bayesian causal inference and propensity scoring",
            "period": "From October 2020",
            "source": "https://drive.google.com/file/d/13vxWX81tUA-qzIvMpctHSjooL2hYmYYf/view",
            "papers": []
          },
          {
            "place": "Meta (Facebook)",
            "role": "Machine learning engineering internship",
            "period": "May–August 2019",
            "source": "https://drive.google.com/file/d/13vxWX81tUA-qzIvMpctHSjooL2hYmYYf/view",
            "papers": []
          },
          {
            "place": "Yelp",
            "role": "Applied machine learning internship, retention modeling",
            "period": "January–May 2019",
            "source": "https://sweta.dev/cv.html",
            "papers": []
          },
          {
            "place": "Google AI",
            "role": "Research mentoring program, model interpretability",
            "period": "September 2018–September 2019",
            "mentors": "Been Kim",
            "mentorLabel": "Mentor",
            "source": "https://sweta.dev/cv.html",
            "papers": []
          },
          {
            "place": "The Walt Disney Company",
            "role": "Emerging technologies internship, text and audience analysis",
            "period": "August–December 2018",
            "source": "https://sweta.dev/cv.html",
            "papers": []
          },
          {
            "place": "MITRE",
            "role": "Deep learning and AI internship, synthetic satellite imagery",
            "period": "May–August 2018",
            "source": "https://sweta.dev/cv.html",
            "papers": []
          }
        ]
      },
      {
        "id": "millend-roy",
        "name": "Millend Roy",
        "school": "IIT Dhanbad",
        "year": 2022,
        "major": "Electrical Engineering",
        "graduationYear": 2021,
        "educationSource": "https://ieor.columbia.edu/content/millend-roy",
        "source": "https://millendroy.github.io/files/Millend_SoP_Columbia.pdf",
        "research": [
          {
            "place": "Microsoft Research India",
            "role": "Research fellow, offline reinforcement and imitation learning for energy systems",
            "period": "From July 2021",
            "mentors": "Akshay Nambi · Tanuja Ganu · Shivkumar Kalyanaraman",
            "source": "https://millendroy.github.io/files/Millend_SoP_Columbia.pdf",
            "papers": [
              {
                "venue": "USENIX NSDI 2023",
                "status": "Submitted",
                "year": 2022,
                "authorship": "Equal first",
                "title": "EnCortex: A General, Extensible and Scalable Framework for Decision Management in New-age Energy Systems",
                "url": "https://github.com/MillendRoy/millendroy.github.io/blob/2989c3191cd7693e1cec47c67ea1710fd10cf9a4/files/Millend_Resume.pdf"
              }
            ]
          },
          {
            "place": "Microsoft Research India",
            "role": "Research internship, electric vehicle energy prediction",
            "period": "2021",
            "mentors": "Akshay Nambi · Tanuja Ganu",
            "source": "https://millendroy.github.io/files/Millend_SoP_Columbia.pdf",
            "papers": [
              {
                "venue": "ACM COMPASS 2022",
                "status": "Accepted",
                "authorship": "First",
                "title": "Reliable Energy Consumption Modeling for an Electric Vehicle Fleet",
                "url": "https://www.microsoft.com/en-us/research/publication/reliable-energy-consumption-modeling-for-an-electric-vehicle-fleet/"
              }
            ]
          },
          {
            "place": "IIT Dhanbad",
            "role": "Research, power grid fault diagnosis",
            "period": "December 2020–May 2021",
            "mentors": "Soham Dutta",
            "source": "https://github.com/MillendRoy/millendroy.github.io/blob/2989c3191cd7693e1cec47c67ea1710fd10cf9a4/files/Millend_Resume.pdf",
            "papers": [
              {
                "venue": "Sustainable Energy, Grids and Networks",
                "status": "Submitted",
                "year": 2022,
                "authorship": "Third",
                "title": "A Data-Driven Fault Detection Approach with an Ensemble Classifier based Smart Meter in Modern Distribution System",
                "url": "https://github.com/MillendRoy/millendroy.github.io/blob/2989c3191cd7693e1cec47c67ea1710fd10cf9a4/files/Millend_Resume.pdf"
              },
              {
                "venue": "Electric Power Systems Research",
                "status": "Accepted",
                "year": 2022,
                "authorship": "Second",
                "title": "Machine Learning Based Adaptive Fault Diagnosis Considering Hosting Capacity Amendment in Active Distribution Network",
                "url": "https://researcher.manipal.edu/en/publications/machine-learning-based-adaptive-fault-diagnosis-considering-hosti/"
              }
            ]
          },
          {
            "place": "IIT Dhanbad",
            "role": "Undergraduate research",
            "period": "August 2020–April 2021",
            "source": "https://github.com/MillendRoy/millendroy.github.io/blob/5cfa587a65668537eba9ef3e802d34dc0a18b35f/files/Millend_Roy_CV.pdf",
            "papers": [
              {
                "venue": "IEEE INCET 2021",
                "status": "Accepted",
                "authorship": "First",
                "title": "A Deep Learning Framework for Enhancing Maritime Coastal Security",
                "url": "https://github.com/MillendRoy/millendroy.github.io/blob/5cfa587a65668537eba9ef3e802d34dc0a18b35f/files/A_Deep_Learning_Framework_for_Enhancing_Maritime_Coastal_Securit.pdf"
              },
              {
                "venue": "IEEE IEMRE 2021",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Renewable Energy and Demand Forecasting in an Integrated Smart Grid",
                "url": "https://doi.org/10.1109/IEMRE52042.2021.9386524"
              }
            ]
          },
          {
            "place": "IIT Dhanbad",
            "role": "Undergraduate thesis, islanding detection",
            "mentors": "Bhukya Krishna Naick · Kalyan Chatterjee",
            "source": "https://github.com/MillendRoy/millendroy.github.io/blob/2989c3191cd7693e1cec47c67ea1710fd10cf9a4/files/Millend_Resume.pdf",
            "papers": []
          },
          {
            "place": "IIT Delhi",
            "role": "Summer research fellow, power grid fault detection",
            "period": "May–July 2019",
            "mentors": "Akash K. Mondal · Swades De",
            "mentorLabel": "Mentors",
            "source": "https://github.com/MillendRoy/millendroy.github.io/blob/2989c3191cd7693e1cec47c67ea1710fd10cf9a4/files/Millend_Resume.pdf",
            "papers": []
          },
          {
            "place": "Hurrey Tech Ventures",
            "role": "Data science internship, education recommendations",
            "period": "May–October 2020",
            "source": "https://github.com/MillendRoy/millendroy.github.io/blob/2989c3191cd7693e1cec47c67ea1710fd10cf9a4/files/Millend_Resume.pdf",
            "papers": []
          },
          {
            "place": "Vardhan Consulting Engineers",
            "role": "Engineering design internship",
            "period": "April–May 2020",
            "source": "https://github.com/MillendRoy/millendroy.github.io/blob/5cfa587a65668537eba9ef3e802d34dc0a18b35f/files/Millend_Roy_CV.pdf",
            "papers": []
          }
        ]
      },
      {
        "id": "arghamitra-talukder",
        "name": "Arghamitra Talukder",
        "school": "Texas A&M University",
        "year": 2022,
        "major": "Electrical Engineering",
        "graduationYear": 2021,
        "educationSource": "https://arghamitrat.github.io/",
        "source": "https://drive.google.com/file/d/1L-k2t1t5XeIkTKCCtzczsUgRvy8O3liR/view",
        "research": [
          {
            "place": "Texas A&M University",
            "role": "Undergraduate thesis, protein interactions",
            "period": "July 2020–May 2021",
            "mentors": "Yang Shen",
            "source": "https://oaktrust.library.tamu.edu/items/49a61fb4-faae-4545-877c-0047b6b6c17d",
            "papers": []
          },
          {
            "place": "Texas A&M University",
            "role": "Remote research collaboration",
            "period": "2021–2022",
            "mentors": "Yang Shen",
            "source": "https://shen-lab.github.io/research.html",
            "papers": [
              {
                "venue": "MLSB at NeurIPS 2022",
                "status": "Accepted",
                "authorship": "First",
                "title": "Does Inter-Protein Contact Prediction Benefit from Multi-Modal Data and Auxiliary Tasks?",
                "url": "https://www.mlsb.io/papers_2022/Does_Inter_Protein_Contact_Prediction_Benefit_from_Multi_Modal_Data_and_Auxiliary_Tasks.pdf"
              }
            ]
          },
          {
            "place": "Texas A&M University",
            "role": "REU research, Embedded Signal Processing Laboratory · wearable blood pressure monitoring",
            "period": "2019–2020",
            "mentors": "Roozbeh Jafari",
            "source": "https://drive.google.com/file/d/1L-k2t1t5XeIkTKCCtzczsUgRvy8O3liR/view",
            "papers": [
              {
                "venue": "EMBC 2020",
                "status": "Accepted",
                "authorship": "Second",
                "title": "Multi-source Multi-frequency Bio-impedance Measurement Method for Localized Pulse Wave Monitoring",
                "url": "https://pubmed.ncbi.nlm.nih.gov/33018863/"
              }
            ]
          },
          {
            "place": "Texas A&M University",
            "role": "Undergraduate research, Applied Cognitive Ergonomics Lab · wearable PTSD monitoring",
            "period": "2018",
            "mentors": "Farzan Sasangohar",
            "source": "https://drive.google.com/file/d/1L-k2t1t5XeIkTKCCtzczsUgRvy8O3liR/view",
            "papers": []
          },
          {
            "place": "Texas Instruments",
            "role": "Product and test engineer",
            "period": "From June 2021",
            "source": "https://arghamitrat.github.io/",
            "papers": []
          }
        ]
      },
      {
        "id": "thu-00021",
        "name": "Colin",
        "school": "Tsinghua University",
        "year": 2022,
        "major": "Computer Science and Technology",
        "educationSource": "https://database.feiyue.online/applicant/Applicant-00021/",
        "source": "https://database.feiyue.online/applicant/Applicant-00021/",
        "sourceLabel": "View application profile",
        "research": [
          {
            "place": "Carnegie Mellon University",
            "role": "Research internship, machine learning for systems",
            "papers": [],
            "source": "https://database.feiyue.online/applicant/Applicant-00021/"
          },
          {
            "place": "University of Illinois Urbana-Champaign",
            "role": "Research internship, software engineering for AI",
            "papers": [],
            "source": "https://database.feiyue.online/applicant/Applicant-00021/"
          }
        ],
        "program": "Computer Science PhD — admitted",
        "paperReview": {
          "checked": "2026-11-03",
          "count": null,
          "status": "skipped",
          "source": "https://database.feiyue.online/applicant/Applicant-00021/",
          "note": "Alias; further author matching skipped at user request. Publication count remains unknown."
        }
      }
    ]
  },
  {
    "id": "nyu",
    "name": "New York University",
    "program": "Computer Science PhD",
    "applicants": [
      {
        "id": "thu-00043",
        "name": "我是乔治",
        "school": "Tsinghua University",
        "year": 2024,
        "major": "Computer Science and Finance",
        "educationSource": "https://database.feiyue.online/applicant/Applicant-00043/",
        "source": "https://database.feiyue.online/applicant/Applicant-00043/",
        "sourceLabel": "View application profile",
        "research": [
          {
            "place": "Tsinghua University",
            "role": "Distributed training systems for large language models",
            "papers": [
              {
                "venue": "",
                "status": "Submitted",
                "authorship": "Second",
                "title": "Distributed LLM training paper"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00043/"
          },
          {
            "place": "Summer research",
            "role": "Machine learning systems",
            "papers": [
              {
                "venue": "NeurIPS",
                "status": "Accepted",
                "authorship": "Second",
                "title": "Machine learning systems paper"
              },
              {
                "venue": "",
                "status": "Submitted",
                "authorship": "Equal first",
                "title": "Machine learning systems paper — equal first"
              },
              {
                "venue": "",
                "status": "Submitted",
                "authorship": "Third",
                "title": "Machine learning systems paper — third author"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00043/"
          },
          {
            "place": "Zhipu AI",
            "role": "Internship",
            "papers": [],
            "source": "https://database.feiyue.online/applicant/Applicant-00043/"
          }
        ],
        "program": "Computer Science PhD — admitted"
      },
      {
        "id": "jatin-prakash",
        "name": "Jatin Prakash",
        "school": "IIT Delhi",
        "year": 2023,
        "major": "Computer Science & Engineering",
        "graduationYear": 2022,
        "educationSource": "https://bicycleman15.github.io/data/jatin-cv-2.pdf",
        "source": "https://drive.google.com/file/d/1Uc0c9XTmlZIaw1hv8eCUL29I-A8B0Cix/view",
        "research": [
          {
            "place": "Microsoft",
            "role": "Research fellow, Microsoft Research",
            "period": "2022–2023",
            "mentors": "Manik Varma",
            "papers": [
              {
                "venue": "ICLR 2024",
                "status": "Submitted",
                "year": 2023,
                "authorship": "Third",
                "title": "Enhancing Tail Performance in Extreme Classifiers by Label Variance Reduction",
                "url": "https://proceedings.iclr.cc/paper_files/paper/2024/hash/7c818dd40651b420873af70b8a790e3f-Abstract-Conference.html"
              }
            ]
          },
          {
            "place": "Microsoft",
            "role": "Research, language-model-generated labels for extreme classification",
            "mentors": "Amit Sharma · Manik Varma",
            "source": "https://drive.google.com/file/d/1Uc0c9XTmlZIaw1hv8eCUL29I-A8B0Cix/view",
            "papers": []
          },
          {
            "place": "Microsoft",
            "role": "Research fellow, Microsoft Research",
            "period": "2022–2023",
            "mentors": "Ramachandran Ramjee · Manik Varma",
            "papers": [
              {
                "venue": "MLSys 2023",
                "status": "Accepted",
                "authorship": "Second",
                "title": "Renee: End-to-End Training of Extreme Classification Models",
                "url": "https://proceedings.mlsys.org/paper_files/paper/2023/hash/c62748872b8c4c49799fc0fa0878515f-Abstract-mlsys2023.html"
              }
            ]
          },
          {
            "place": "IIT Delhi",
            "role": "Undergraduate research, out-of-distribution detection",
            "mentors": "Chetan Arora",
            "papers": [
              {
                "venue": "ECML PKDD 2022",
                "status": "Accepted",
                "authorship": "Third",
                "title": "A Novel Data Augmentation Technique for Out-of-Distribution Sample Detection Using Compounded Corruptions",
                "url": "https://cnc-ood.github.io/cnc_paper.pdf"
              }
            ]
          },
          {
            "place": "IIT Delhi",
            "role": "Undergraduate thesis, neural network calibration",
            "mentors": "Chetan Arora · Ramya Hebbalaguppe",
            "source": "https://www.linkedin.com/posts/jatinprakash1511_a-stitch-in-time-saves-nine-a-train-time-activity-6915604521209511936-1LaN",
            "papers": [
              {
                "venue": "CVPR 2022",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "A Stitch in Time Saves Nine: A Train-Time Regularizing Loss for Improved Neural Network Calibration",
                "url": "https://openaccess.thecvf.com/content/CVPR2022/html/Hebbalaguppe_A_Stitch_in_Time_Saves_Nine_A_Train-Time_Regularizing_Loss_CVPR_2022_paper.html"
              }
            ]
          },
          {
            "place": "IIT Delhi",
            "role": "Research, calibration transfer through knowledge distillation",
            "mentors": "Chetan Arora",
            "source": "https://drive.google.com/file/d/1Uc0c9XTmlZIaw1hv8eCUL29I-A8B0Cix/view",
            "papers": []
          },
          {
            "place": "Ivy",
            "role": "ML research engineer internship, compiler for translating between ML frameworks",
            "period": "2022",
            "source": "https://bicycleman15.github.io/data/jatin-cv-2.pdf",
            "papers": []
          },
          {
            "place": "Microsoft",
            "role": "Software engineering internship, document fingerprinting",
            "period": "2021",
            "source": "https://bicycleman15.github.io/data/jatin-cv-2.pdf",
            "papers": []
          },
          {
            "place": "OpenMined",
            "role": "Open-source maintainer, SyferText",
            "period": "2020",
            "source": "https://bicycleman15.github.io/data/jatin-cv-2.pdf",
            "papers": []
          }
        ]
      },
      {
        "id": "chenglei-si",
        "name": "Chenglei Si",
        "school": "University of Maryland",
        "year": 2022,
        "source": "https://drive.google.com/file/d/1fmp1SjQlqNhb6rniF7HBuF3Pxj9iz0TO/view",
        "major": "Computer Science & Linguistics",
        "graduationYear": 2023,
        "educationSource": "https://bisi.umd.edu/news-events/news/august-2023-graduates",
        "research": [
          {
            "place": "University of Maryland",
            "role": "Research, question answering",
            "mentors": "Jordan Boyd-Graber",
            "source": "https://drive.google.com/file/d/1fmp1SjQlqNhb6rniF7HBuF3Pxj9iz0TO/view",
            "papers": [
              {
                "venue": "Findings of EMNLP 2022",
                "status": "Accepted",
                "authorship": "First",
                "title": "Re-examining Calibration: The Case of Question Answering",
                "url": "https://arxiv.org/pdf/2205.12507"
              },
              {
                "venue": "EMNLP 2021",
                "status": "Accepted",
                "authorship": "First",
                "title": "What’s in a Name? Answer Equivalence for Open-Domain Question Answering",
                "url": "https://aclanthology.org/2021.emnlp-main.757.pdf"
              }
            ]
          },
          {
            "place": "Microsoft",
            "role": "Research internship, language model reliability",
            "period": "2022",
            "mentors": "Zhe Gan · Zhengyuan Yang · Lijuan Wang",
            "mentorLabel": "Collaborators",
            "source": "https://arxiv.org/pdf/2210.09150",
            "papers": [
              {
                "venue": "ICLR 2023",
                "status": "Submitted",
                "year": 2022,
                "authorship": "First",
                "title": "Prompting GPT-3 To Be Reliable",
                "url": "https://arxiv.org/pdf/2210.09150"
              }
            ]
          },
          {
            "place": "Tsinghua University",
            "role": "Research internship, robust Chinese language models",
            "period": "2020–2022",
            "mentors": "Zhiyuan Liu",
            "mentorLabel": "Mentor",
            "source": "https://noviscl.github.io/",
            "papers": [
              {
                "venue": "Preprint",
                "status": "Preprint",
                "year": 2022,
                "authorship": "First",
                "title": "READIN: A Chinese Multi-Task Benchmark with Realistic and Diverse Input Noises",
                "url": "https://arxiv.org/abs/2302.07324v1"
              },
              {
                "venue": "TACL",
                "status": "Submitted",
                "year": 2021,
                "authorship": "Equal first",
                "title": "Sub-Character Tokenization for Chinese Pretrained Language Models",
                "url": "https://arxiv.org/abs/2106.00400v2"
              },
              {
                "venue": "Findings of ACL 2021",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Better Robustness by More Coverage: Adversarial and Mixup Data Augmentation for Robust Finetuning",
                "url": "https://aclanthology.org/2021.findings-acl.137.pdf"
              }
            ]
          },
          {
            "place": "NYU / Princeton University",
            "role": "Research collaboration",
            "mentors": "He He · Danqi Chen",
            "mentorLabel": "Collaborators",
            "papers": [
              {
                "venue": "ICLR 2023",
                "status": "Submitted",
                "year": 2022,
                "authorship": "First",
                "title": "What Spurious Features Can Pretrained Language Models Combat?",
                "url": "https://drive.google.com/file/d/1fmp1SjQlqNhb6rniF7HBuF3Pxj9iz0TO/view"
              }
            ]
          },
          {
            "place": "HFL · HIT & iFLYTEK",
            "role": "Research internship and collaboration",
            "period": "2020–2021",
            "mentors": "Yiming Cui · Ziqing Yang",
            "mentorLabel": "Collaborators",
            "source": "https://aclanthology.org/2021.findings-acl.56.pdf",
            "papers": [
              {
                "venue": "*SEM 2021",
                "status": "Accepted",
                "authorship": "Third",
                "title": "Adversarial Training for Machine Reading Comprehension with Virtual Embeddings",
                "url": "https://aclanthology.org/2021.starsem-1.30/"
              },
              {
                "venue": "Findings of ACL 2021",
                "status": "Accepted",
                "authorship": "First",
                "title": "Benchmarking Robustness of Machine Reading Comprehension Models",
                "url": "https://aclanthology.org/2021.findings-acl.56.pdf"
              },
              {
                "venue": "COLING 2020",
                "status": "Accepted",
                "authorship": "Third",
                "title": "CharBERT: Character-aware Pre-trained Language Model",
                "url": "https://aclanthology.org/2020.coling-main.4/"
              }
            ]
          },
          {
            "place": "National University of Singapore",
            "role": "Research",
            "period": "2018–2019",
            "mentors": "Min-Yen Kan",
            "mentorLabel": "Mentor",
            "source": "https://arxiv.org/pdf/1910.12391",
            "papers": [
              {
                "venue": "Asian Translation Workshop 2019",
                "status": "Accepted",
                "authorship": "First",
                "title": "Sentiment Aware Neural Machine Translation",
                "url": "https://aclanthology.org/D19-5227/"
              },
              {
                "venue": "Preprint",
                "status": "Preprint",
                "year": 2019,
                "authorship": "First",
                "title": "What Does BERT Learn from Multiple-Choice Reading Comprehension Datasets?",
                "url": "https://arxiv.org/pdf/1910.12391"
              },
              {
                "venue": "Extracting Structured Knowledge from Scientific Publications Workshop 2019",
                "status": "Accepted",
                "authorship": "Second",
                "title": "Dataset Mention Extraction and Classification",
                "url": "https://aclanthology.org/W19-2604/"
              }
            ]
          }
        ]
      },
      {
        "id": "will-merrill",
        "name": "Will Merrill",
        "school": "Yale University",
        "year": 2020,
        "major": "Computer Science and Linguistics",
        "graduationYear": 2019,
        "educationSource": "https://lambdaviking.com/assets/pdf/cv.pdf",
        "source": "https://docs.google.com/document/d/1oQn9_jBVUNutMItuH-Bc3Od8CfwMCBAHnCjdTzBB8K8/edit",
        "research": [
          {
            "place": "Allen Institute for AI",
            "role": "Predoctoral researcher, AllenNLP",
            "period": "2019–2020",
            "mentors": "Noah A. Smith · Yoav Goldberg · Roy Schwartz",
            "source": "https://lambdaviking.com/assets/pdf/cv.pdf",
            "papers": [
              {
                "venue": "TACL",
                "status": "Submitted",
                "year": 2020,
                "authorship": "First",
                "title": "Provable Limitations of Acquiring Meaning from Ungrounded Form: What Will Future Language Models Understand?",
                "url": "https://aclanthology.org/2021.tacl-1.62/"
              },
              {
                "venue": "Preprint",
                "status": "Preprint",
                "year": 2020,
                "authorship": "First",
                "title": "Parameter Norm Growth During Training of Transformers",
                "url": "https://arxiv.org/abs/2010.09697v1"
              },
              {
                "venue": "ACL 2020",
                "status": "Accepted",
                "authorship": "First",
                "title": "A Formal Hierarchy of RNN Architectures",
                "url": "https://aclanthology.org/2020.acl-main.43/"
              },
              {
                "venue": "ACL 2020 NLP-COVID19 Workshop",
                "status": "Accepted",
                "authorship": "Thirteenth",
                "title": "CORD-19: The COVID-19 Open Research Dataset",
                "url": "https://aclanthology.org/2020.nlpcovid19-acl.1/"
              },
              {
                "venue": "Preprint",
                "status": "Preprint",
                "year": 2020,
                "authorship": "First",
                "title": "On the Linguistic Capacity of Real-Time Counter Automata",
                "url": "https://arxiv.org/abs/2004.06866v1"
              }
            ]
          },
          {
            "place": "Yale University",
            "role": "Undergraduate research, CLAY Lab",
            "period": "2016–2019",
            "mentors": "Robert Frank · Dana Angluin",
            "source": "https://lambdaviking.com/assets/pdf/cv.pdf",
            "papers": [
              {
                "venue": "ACL 2019 Deep Learning and Formal Languages Workshop",
                "status": "Accepted",
                "authorship": "First",
                "title": "Sequential Neural Networks as Automata",
                "url": "https://aclanthology.org/W19-3901/"
              },
              {
                "venue": "ACL 2019 Historical Language Change Workshop",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Detecting Syntactic Change Using a Neural Part-of-Speech Tagger",
                "url": "https://aclanthology.org/W19-4721/"
              },
              {
                "venue": "ACL 2019 BlackboxNLP Workshop",
                "status": "Accepted",
                "authorship": "First",
                "title": "Finding Hierarchical Structure in Neural Stacks Using Unsupervised Parsing",
                "url": "https://aclanthology.org/W19-4823/"
              },
              {
                "venue": "EMNLP 2018 BlackboxNLP Workshop",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Context-Free Transductions with Neural Stacks",
                "url": "https://aclanthology.org/W18-5433/"
              },
              {
                "venue": "NAACL 2018",
                "status": "Accepted",
                "authorship": "Fourth",
                "title": "End-to-End Graph-Based TAG Parsing with Neural Networks",
                "url": "https://aclanthology.org/N18-1107/"
              }
            ]
          },
          {
            "place": "Yale University",
            "role": "Undergraduate research, linguistics",
            "source": "https://lambdaviking.com/",
            "papers": [
              {
                "venue": "TULCon 2018",
                "status": "Accepted",
                "authorship": "First",
                "title": "Sense Abstraction: A Generalization of Intensionality for the Semantics of Subordinate Clauses",
                "url": "https://slugs.sa.utoronto.ca/tulcon11/tulcon11schedule/"
              }
            ]
          },
          {
            "place": "Google",
            "role": "Software engineering internship",
            "period": "2018",
            "source": "https://lambdaviking.com/assets/pdf/cv.pdf",
            "papers": []
          },
          {
            "place": "Boston College",
            "role": "Research internship, Language Learning Lab",
            "period": "2017",
            "mentors": "Joshua Hartshorne · Sven Dietz",
            "source": "https://lambdaviking.com/assets/pdf/cv.pdf",
            "papers": []
          },
          {
            "place": "New York University",
            "role": "Research internship, Morphology Lab",
            "period": "2013–2015",
            "mentors": "Alec Marantz · Phoebe Gaston",
            "source": "https://lambdaviking.com/assets/pdf/cv.pdf",
            "papers": []
          }
        ]
      },
      {
        "id": "gordon-dai",
        "name": "Gordon Dai",
        "school": "New York University",
        "year": 2025,
        "major": "Mathematics and Philosophy",
        "educationSource": "https://wp.nyu.edu/ml4good/people/",
        "source": "https://drive.google.com/file/d/1b_huNl9Lu191cJoFqdDzrCRqBGb-BkX5/view?usp=drive_link",
        "research": [
          {
            "place": "New York University",
            "role": "Undergraduate research, model multiplicity and fairness",
            "papers": [
              {
                "title": "Be Intentional about Fairness!: Fairness, Size, and Multiplicity in the Rashomon Set",
                "venue": "EAAMO 2025",
                "status": "Accepted",
                "year": 2025,
                "authorship": "First",
                "url": "https://doi.org/10.1145/3757887.3763011"
              }
            ],
            "mentors": "Emily Black · Daniel B. Neill",
            "source": "https://drive.google.com/file/d/1b_huNl9Lu191cJoFqdDzrCRqBGb-BkX5/view?usp=drive_link"
          },
          {
            "place": "New York University",
            "role": "Research, hierarchical single-index models and SGD dynamics; manuscript in preparation",
            "papers": [
              {
                "title": "Hierarchical Single-Index Models",
                "venue": "In preparation",
                "status": "In preparation",
                "year": 2025,
                "authorship": "First",
                "url": "https://drive.google.com/file/d/1b_huNl9Lu191cJoFqdDzrCRqBGb-BkX5/view?usp=drive_link"
              }
            ],
            "mentors": "Joan Bruna",
            "source": "https://drive.google.com/file/d/1b_huNl9Lu191cJoFqdDzrCRqBGb-BkX5/view?usp=drive_link"
          },
          {
            "place": "New York University",
            "role": "Research, variance-preserving fairness sampling; manuscript in preparation",
            "papers": [
              {
                "title": "Fairness Out of Intention: Reconciling the Equal-Treatment-Equal-Outcome-Paradox in Legal Practices via Variance-Preserving Sampling Methods",
                "venue": "In preparation",
                "status": "In preparation",
                "year": 2025,
                "authorship": "First",
                "url": "https://drive.google.com/file/d/1b_huNl9Lu191cJoFqdDzrCRqBGb-BkX5/view?usp=drive_link"
              }
            ],
            "mentors": "Emily Black · Daniel B. Neill",
            "source": "https://drive.google.com/file/d/1b_huNl9Lu191cJoFqdDzrCRqBGb-BkX5/view?usp=drive_link"
          },
          {
            "place": "University of California, Santa Barbara",
            "role": "Research collaboration, LLM-agent social simulations",
            "papers": [
              {
                "title": "Artificial Leviathan: Exploring Social Evolution of LLM Agents Through the Lens of Hobbesian Social Contract Theory",
                "venue": "AI Behavioral Science Workshop at KDD 2024",
                "status": "Accepted",
                "year": 2024,
                "authorship": "First",
                "url": "https://arxiv.org/abs/2406.14373"
              }
            ],
            "mentors": "Misha Sra",
            "source": "https://drive.google.com/file/d/1b_huNl9Lu191cJoFqdDzrCRqBGb-BkX5/view?usp=drive_link"
          },
          {
            "place": "New York University",
            "role": "Research, theoretical inconsistency in responsible AI",
            "papers": [
              {
                "title": "Embracing Contradiction: Theoretical Inconsistency Will Not Impede the Road of Building Responsible AI Systems",
                "venue": "NeurIPS 2025 Position Paper Track",
                "status": "Accepted",
                "year": 2025,
                "authorship": "First",
                "url": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/dd4a4bc7a7ba0b197b679c0025cb2df8-Abstract-Position_Paper_Track.html"
              }
            ],
            "source": "https://drive.google.com/file/d/1b_huNl9Lu191cJoFqdDzrCRqBGb-BkX5/view?usp=drive_link"
          }
        ],
        "graduationYear": 2026
      }
    ]
  },
  {
    "id": "washington",
    "name": "University of Washington",
    "program": "Computer Science & Engineering PhD",
    "applicants": [
      {
        "id": "saul-shanabrook",
        "name": "Saul Shanabrook",
        "school": "University of Massachusetts Amherst",
        "year": 2023,
        "major": "Computer Science",
        "graduationYear": 2017,
        "educationSource": "https://saul.shanabrook.com/resume.pdf",
        "source": "https://github.com/saulshanabrook/saulshanabrook/discussions/37",
        "research": [
          {
            "place": "National Science Foundation",
            "role": "CSGrad4US fellowship recipient",
            "period": "September 2023",
            "source": "https://saul.shanabrook.com/resume.pdf",
            "papers": []
          },
          {
            "place": "Recurse Center",
            "role": "Participant, Python library for e-graphs",
            "period": "January–May 2023",
            "source": "https://saul.shanabrook.com/resume.pdf",
            "papers": [
              {
                "venue": "EGRAPHS 2023",
                "status": "Accepted",
                "authorship": "First",
                "title": "Egg-smol Python: A Pythonic Library for E-graphs",
                "url": "https://pldi23.sigplan.org/details/egraphs-2023-papers/5/Egg-smol-Python-A-Pythonic-Library-for-E-graphs"
              }
            ]
          },
          {
            "place": "Quansight",
            "role": "Software developer, array data APIs",
            "period": "March 2018–October 2020",
            "source": "https://saul.shanabrook.com/resume.pdf",
            "papers": [
              {
                "venue": "SciPy 2023",
                "status": "Accepted",
                "authorship": "Tenth",
                "title": "Python Array API Standard: Toward Array Interoperability in the Scientific Python Ecosystem",
                "url": "https://doi.org/10.25080/gerudo-f2bc6f59-001"
              }
            ]
          },
          {
            "place": "Quansight",
            "role": "Research, metadsl array abstractions and expression optimization",
            "mentors": "Travis Oliphant · Lenore Mullin",
            "mentorLabel": "With",
            "source": "https://github.com/saulshanabrook/saulshanabrook/discussions/37",
            "papers": []
          },
          {
            "place": "Hampshire College",
            "role": "Researcher, Computational Intelligence Lab",
            "period": "October 2015–December 2017",
            "mentors": "Lee Spector",
            "source": "https://saul.shanabrook.com/resume.pdf",
            "papers": [
              {
                "venue": "Genetic Programming Theory and Practice 2018",
                "status": "Accepted",
                "authorship": "Fourth",
                "title": "Linear Genomes for Structured Programs",
                "url": "https://www.cs.hamilton.edu/~thelmuth/Pubs/2016-GPTP-plush.pdf"
              },
              {
                "venue": "Genetic Programming Theory and Practice 2018",
                "status": "Accepted",
                "authorship": "Third",
                "title": "Relaxations of Lexicase Parent Selection",
                "url": "https://www.cs.hamilton.edu/~thelmuth/Pubs/2017-GPTP-relaxed-lexicase.pdf"
              }
            ]
          },
          {
            "place": "University of Massachusetts Amherst",
            "role": "Researcher, Statistical Social Language Analysis Lab · police fatalities data",
            "period": "September–December 2017",
            "mentors": "Brendan O’Connor",
            "source": "https://saul.shanabrook.com/resume.pdf",
            "papers": []
          },
          {
            "place": "University of Massachusetts Amherst",
            "role": "Undergraduate project, topic modeling of messages and social media",
            "source": "https://saul.shanabrook.com/resume.pdf",
            "papers": []
          },
          {
            "place": "University of Massachusetts Amherst",
            "role": "Undergraduate project, text reuse and ideology in congressional bills",
            "source": "https://saul.shanabrook.com/resume.pdf",
            "papers": []
          },
          {
            "place": "Carnegie Mellon University",
            "role": "Researcher, Intelligent Coordination and Logistics Lab · shortest paths",
            "period": "May–August 2016",
            "mentors": "Zachary B. Rubinstein · Stephen Smith",
            "mentorLabel": "Mentors",
            "source": "https://riss.ri.cmu.edu/research_showcase/2016-posters/",
            "papers": [
              {
                "venue": "Robotics Institute Summer Scholars 2016",
                "status": "Accepted",
                "authorship": "First",
                "title": "Finding the Shortest Path on a Sphere Surface Using Visibility Graphs",
                "url": "https://riss.ri.cmu.edu/wp-content/uploads/2017/01/RISS_2016_Journal.pdf"
              }
            ]
          },
          {
            "place": "Paddle8",
            "role": "Software internship",
            "period": "Summers 2013 and 2014",
            "source": "https://saul.shanabrook.com/resume.pdf",
            "papers": []
          },
          {
            "place": "Linea",
            "role": "Software developer, Python program slicing",
            "period": "March 2021–April 2022",
            "source": "https://saul.shanabrook.com/resume.pdf",
            "papers": []
          },
          {
            "place": "Project Jupyter",
            "role": "Core contributor, JupyterLab and Vega-Lite integration and visualization profiling",
            "period": "March 2018–October 2020",
            "mentors": "Dominik Moritz · Brian Granger",
            "mentorLabel": "With",
            "source": "https://github.com/saulshanabrook/saulshanabrook/discussions/37",
            "papers": []
          },
          {
            "place": "Burke Software",
            "role": "Software contractor",
            "period": "December 2014–August 2017",
            "source": "https://saul.shanabrook.com/resume.pdf",
            "papers": []
          }
        ]
      },
      {
        "id": "zhiyuan-zeng",
        "name": "Zhiyuan Zeng",
        "school": "Tsinghua University",
        "year": 2023,
        "major": "Computer Science & Technology",
        "graduationYear": 2024,
        "educationSource": "https://zhiyuan-zeng.github.io/",
        "source": "https://drive.google.com/file/d/1Y7kkev-TH0sRkunvfJ8NqehisPigZ42C/view",
        "research": [
          {
            "place": "Princeton University",
            "role": "Visiting undergraduate researcher, language model evaluation and pruning",
            "period": "Summer 2023",
            "mentors": "Danqi Chen · Tianyu Gao",
            "mentorLabel": "With",
            "source": "https://zhiyuan-zeng.github.io/",
            "papers": [
              {
                "venue": "Instruction Tuning at NeurIPS 2023",
                "status": "Accepted",
                "year": 2023,
                "authorship": "First",
                "title": "Evaluating Large Language Models at Evaluating Instruction Following",
                "url": "https://arxiv.org/abs/2310.07641v1"
              },
              {
                "venue": "ICLR 2024",
                "status": "Submitted",
                "year": 2023,
                "authorship": "Third",
                "title": "Sheared LLaMA: Accelerating Language Model Pre-training via Structured Pruning",
                "url": "https://arxiv.org/abs/2310.06694v1",
                "also": [
                  {
                    "venue": "ENLSP at NeurIPS 2023",
                    "status": "Accepted",
                    "url": "https://neurips2023-enlsp.github.io/accepted_papers"
                  },
                  {
                    "venue": "WANT at NeurIPS 2023",
                    "status": "Accepted",
                    "url": "https://pli.princeton.edu/blog/2023/princeton-language-and-intelligence-pli-neurips-2023"
                  }
                ]
              }
            ]
          },
          {
            "place": "Tsinghua University",
            "role": "Undergraduate research, knowledge injection and model modularity",
            "mentors": "Zhiyuan Liu",
            "source": "https://zhiyuan-zeng.github.io/",
            "papers": [
              {
                "venue": "Findings of ACL 2023",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Emergent Modularity in Pre-trained Transformers",
                "url": "https://aclanthology.org/2023.findings-acl.250/"
              },
              {
                "venue": "ACL 2023",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Plug-and-Play Knowledge Injection for Pre-trained Language Models",
                "url": "https://aclanthology.org/2023.acl-long.594/"
              }
            ]
          },
          {
            "place": "Tsinghua University",
            "role": "National Science Fund for Distinguished Undergraduate Researchers",
            "period": "From September 2023",
            "source": "https://zhiyuan-zeng.github.io/",
            "papers": []
          },
          {
            "place": "University of Southern California",
            "role": "Research, knowledge distillation and reasoning",
            "period": "2022–2023",
            "mentors": "Xiang Ren · Aaron Chan",
            "mentorLabel": "With",
            "source": "https://inklab.usc.edu/people.html",
            "papers": [
              {
                "venue": "TrustML at ICLR 2023",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "KNIFE: Distilling Meta-Reasoning Knowledge with Free-Text Rationales",
                "url": "https://mlanthology.org/iclrw/2023/chan2023iclrw-knife/",
                "also": [
                  {
                    "venue": "ICLR 2024",
                    "status": "Submitted",
                    "url": "https://openreview.net/search?content=authors&group=all&sort=cdate%3Adesc&source=forum&term=~Zhiyuan_Zeng3"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "matt-deitke",
        "name": "Matt Deitke",
        "school": "University of Washington",
        "year": 2022,
        "major": "Computer Science",
        "graduationYear": 2023,
        "educationSource": "https://mattdeitke.com/CV.pdf",
        "source": "https://mattdeitke.com/research-statement.pdf",
        "research": [
          {
            "place": "Allen Institute for AI",
            "role": "Researcher, 3D simulation and embodied AI",
            "period": "From summer 2021",
            "mentors": "Ali Farhadi · Roozbeh Mottaghi · Aniruddha Kembhavi",
            "source": "https://mattdeitke.com/research-statement.pdf",
            "papers": [
              {
                "venue": "CVPR 2023",
                "status": "Submitted",
                "year": 2022,
                "authorship": "First",
                "title": "Objaverse: A Universe of Annotated 3D Objects",
                "url": "https://arxiv.org/abs/2212.08051v1"
              },
              {
                "venue": "CVPR 2023",
                "status": "Submitted",
                "year": 2022,
                "authorship": "Equal first",
                "title": "Phone2Proc: Bringing Robust Robots Into Our Chaotic World",
                "url": "https://arxiv.org/abs/2212.04819v1"
              },
              {
                "venue": "Preprint",
                "status": "Preprint",
                "year": 2022,
                "authorship": "First",
                "title": "Retrospectives on the Embodied AI Workshop",
                "url": "https://arxiv.org/abs/2210.06849v1"
              },
              {
                "venue": "Preprint",
                "status": "Preprint",
                "year": 2022,
                "authorship": "Seventh",
                "title": "AI2-THOR: An Interactive 3D Environment for Visual AI",
                "url": "https://arxiv.org/abs/1712.05474v4"
              },
              {
                "venue": "NeurIPS 2022 · Outstanding Paper",
                "status": "Accepted",
                "authorship": "First",
                "title": "ProcTHOR: Large-Scale Embodied AI Using Procedural Generation",
                "url": "https://proceedings.neurips.cc/paper_files/paper/2022/hash/27c546ab1e4f1d7d638e6a8dfbad9a07-Abstract-Conference.html"
              }
            ]
          },
          {
            "place": "Allen Institute for AI",
            "role": "Research internship",
            "period": "Fall 2019–spring 2021",
            "mentors": "Ali Farhadi · Roozbeh Mottaghi · Aniruddha Kembhavi",
            "source": "https://mattdeitke.com/CV.pdf",
            "papers": [
              {
                "venue": "CVPR 2021 · Oral",
                "status": "Accepted",
                "authorship": "Second",
                "title": "Visual Room Rearrangement",
                "url": "https://openaccess.thecvf.com/content/CVPR2021/html/Weihs_Visual_Room_Rearrangement_CVPR_2021_paper.html"
              },
              {
                "venue": "CVPR 2020",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "RoboTHOR: An Open Simulation-to-Real Embodied AI Platform",
                "url": "https://openaccess.thecvf.com/content_CVPR_2020/html/Deitke_RoboTHOR_An_Open_Simulation-to-Real_Embodied_AI_Platform_CVPR_2020_paper.html"
              }
            ]
          },
          {
            "place": "University of Washington",
            "role": "Computer vision textbook collaboration",
            "mentors": "Richard Szeliski",
            "mentorLabel": "Collaborator",
            "source": "https://mattdeitke.com/research-statement.pdf",
            "papers": []
          },
          {
            "place": "University of Cincinnati",
            "role": "Part-time computer graphics developer",
            "period": "2016–2018",
            "source": "https://mattdeitke.com/CV.pdf",
            "papers": []
          },
          {
            "place": "Ohio State University",
            "role": "Part-time computer graphics developer",
            "period": "2016–2018",
            "source": "https://mattdeitke.com/CV.pdf",
            "papers": []
          },
          {
            "place": "Cleveland Browns",
            "role": "Part-time computer graphics developer",
            "period": "2014–2016",
            "source": "https://mattdeitke.com/CV.pdf",
            "papers": []
          }
        ]
      },
      {
        "id": "thu-00018",
        "name": "Sophia",
        "school": "Tsinghua University",
        "year": 2022,
        "major": "Computer Science (Yao Class)",
        "educationSource": "https://database.feiyue.online/applicant/Applicant-00018/",
        "source": "https://database.feiyue.online/applicant/Applicant-00018/",
        "sourceLabel": "View application profile",
        "research": [
          {
            "place": "Microsoft Research Asia",
            "role": "Research internship, NLP",
            "papers": [
              {
                "venue": "ACL",
                "status": "Submitted",
                "authorship": "First",
                "title": "NLP paper — ACL"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00018/"
          },
          {
            "place": "Tsinghua University",
            "role": "Future Laboratory, computer vision",
            "papers": [
              {
                "venue": "CVPR",
                "status": "Accepted",
                "authorship": "Second",
                "title": "Computer vision paper"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00018/"
          },
          {
            "place": "University of Maryland",
            "role": "Spring research, NLP",
            "papers": [
              {
                "venue": "Findings of EMNLP",
                "status": "Accepted",
                "authorship": "First",
                "title": "NLP paper — Findings of EMNLP"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00018/"
          },
          {
            "place": "Stanford University",
            "role": "UGVR summer research, HCI",
            "papers": [
              {
                "venue": "CHI",
                "status": "Submitted",
                "authorship": "First",
                "title": "HCI paper"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00018/"
          }
        ],
        "program": "Computer Science PhD — admitted"
      },
      {
        "id": "joice-tang",
        "name": "Joice Tang",
        "school": "University of British Columbia",
        "year": 2021,
        "major": "Computer Science",
        "graduationYear": 2022,
        "educationSource": "https://joicetang.com/assets/cv.pdf",
        "source": "https://docs.google.com/document/d/1hv1BP0k87st82vdgXt6kcC2KsYB6dx_31HgK35JjHtc/edit",
        "research": [
          {
            "place": "University of British Columbia",
            "role": "Undergraduate researcher, D-Lab · AI in education with Kyoungwon Seo",
            "period": "Summer 2020–April 2021",
            "mentors": "Dongwook Yoon · Sidney Fels",
            "source": "https://joicetang.com/assets/resume.pdf",
            "papers": [
              {
                "venue": "International Journal of Educational Technology in Higher Education 2021",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "The Impact of Artificial Intelligence on Learner–Instructor Interaction in Online Learning",
                "url": "https://doi.org/10.1186/s41239-021-00292-9"
              }
            ]
          },
          {
            "place": "University of British Columbia",
            "role": "Undergraduate researcher, D-Lab · gig work platforms",
            "period": "Fall 2020–April 2021",
            "mentors": "Dongwook Yoon · Ning Ma",
            "source": "https://joicetang.com/assets/resume.pdf",
            "papers": [
              {
                "venue": "IUI 2021 Workshop",
                "status": "Accepted",
                "authorship": "First",
                "title": "Understanding How Customers Attribute Accountability in Food Delivery Breakdowns",
                "url": "https://ceur-ws.org/Vol-2903/IUI21WS-TExSS-14.pdf"
              }
            ]
          },
          {
            "place": "University of British Columbia",
            "role": "Research intern, ViDeX / D-Lab",
            "period": "April–November 2020",
            "source": "https://joicetang.com/assets/cv.pdf",
            "papers": []
          },
          {
            "place": "University of British Columbia",
            "role": "Teaching assistant, programming and human-computer interaction",
            "period": "2018–2019, from 2021",
            "source": "https://joicetang.com/assets/resume.pdf",
            "papers": []
          },
          {
            "place": "University of Waterloo",
            "role": "Undergraduate research fellow, HCI Lab · trust in AI feedback on Chinese writing",
            "period": "From May 2021",
            "mentors": "Edith Law · Kate Larson",
            "source": "https://joicetang.com/assets/resume.pdf",
            "papers": []
          },
          {
            "place": "Redbrick",
            "role": "Full-stack developer co-op · desktop, web and analytics",
            "period": "September 2019–April 2020",
            "source": "https://joicetang.com/assets/resume.pdf",
            "papers": []
          }
        ],
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "reviewed",
          "source": "https://joicetang.com/papers/",
          "note": "Author separates the ETHE journal and IUI 2021 workshop; CSCW 2025 is later."
        }
      },
      {
        "id": "sebastin-santy",
        "name": "Sebastin Santy",
        "school": "BITS Pilani, Goa",
        "year": 2020,
        "major": "Electronics and Instrumentation Engineering",
        "graduationYear": 2019,
        "educationSource": "https://lacuna.tiptreesystems.com/author/sebastin-santy/aut_86a852cfbbed480a99438595b342fade",
        "source": "https://github.com/SebastinSanty/sebastinsanty.com/blob/55d5400f983831e454c8cd1ff59644587ef86e7d/v1-jonbarron/data/SebastinSanty_CV.pdf",
        "sourceLabel": "View CV",
        "research": [
          {
            "place": "Microsoft Research India",
            "role": "Research intern (January–July 2019) and AI Center fellow (from July 2019), Gondi language technology and inclusion",
            "mentors": "Kalika Bali · Monojit Choudhury",
            "source": "https://microsoft.github.io/inmt/",
            "papers": [
              {
                "venue": "ACL 2020",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "The State and Fate of Linguistic Diversity and Inclusion in the NLP World",
                "url": "https://aclanthology.org/2020.acl-main.560/"
              },
              {
                "venue": "LREC 2020",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Learnings from Technological Interventions in a Low Resource Language: A Case-Study on Gondi",
                "url": "https://aclanthology.org/2020.lrec-1.345/"
              },
              {
                "venue": "ICON 2019",
                "status": "Accepted",
                "authorship": "Third",
                "title": "Unsung Challenges of Building and Deploying Language Technologies for Low Resource Language Communities",
                "url": "https://www.microsoft.com/en-us/research/publication/unsung-challenges-of-building-and-deploying-language-technologies-for-low-resource-language-communities/"
              }
            ]
          },
          {
            "place": "Microsoft Research India",
            "role": "LT4All 2019 poster, Adivasi Radio for Gondi speakers",
            "mentors": "Kalika Bali · Monojit Choudhury · Sunayana Sitaram",
            "mentorLabel": "With",
            "source": "https://lt4all.elra.info/proceedings/lt4all2019/pdf/2019.lt4all-1.101.pdf",
            "papers": []
          },
          {
            "place": "Microsoft Research India",
            "role": "Research collaboration, speech-assisted code-switched annotation",
            "mentors": "Sunayana Sitaram",
            "mentorLabel": "With",
            "source": "https://aclanthology.org/D19-5907/",
            "papers": [
              {
                "venue": "EMNLP 2019 AnnoNLP Workshop",
                "status": "Accepted",
                "authorship": "Third",
                "title": "CoSSAT: Code-Switched Speech Annotation Tool",
                "url": "https://aclanthology.org/D19-5907/"
              }
            ]
          },
          {
            "place": "Microsoft Research India",
            "role": "Research collaboration with Pratham Books, interactive translation",
            "mentors": "Kalika Bali · Monojit Choudhury",
            "source": "https://www.microsoft.com/en-us/research/collaboration/scai/collaborators/",
            "papers": [
              {
                "venue": "EMNLP 2019 Demo",
                "status": "Accepted",
                "authorship": "First",
                "title": "INMT: Interactive Neural Machine Translation Prediction",
                "url": "https://aclanthology.org/D19-3018/"
              }
            ]
          },
          {
            "place": "University College London",
            "role": "Research collaboration, task-aware scene descriptions",
            "period": "2018",
            "mentors": "Emine Yilmaz · Rishabh Mehrotra",
            "source": "https://github.com/SebastinSanty/sebastinsanty.com/blob/55d5400f983831e454c8cd1ff59644587ef86e7d/v1-jonbarron/data/SebastinSanty_CV.pdf",
            "papers": [
              {
                "venue": "AAAI 2019 Student Abstract",
                "status": "Accepted",
                "authorship": "First",
                "title": "Towards Task Understanding in Visual Settings",
                "url": "https://ojs.aaai.org/index.php/AAAI/article/view/5150"
              }
            ]
          },
          {
            "place": "University College London",
            "role": "Research internship, task-based information retrieval and recommendations",
            "period": "May–July 2018",
            "mentors": "Emine Yilmaz · Rishabh Mehrotra",
            "source": "https://github.com/SebastinSanty/sebastinsanty.com/blob/55d5400f983831e454c8cd1ff59644587ef86e7d/v1-jonbarron/data/SebastinSanty_CV.pdf",
            "papers": []
          },
          {
            "place": "Carnegie Mellon University",
            "role": "Research internship, robot obstacle and doorway detection",
            "period": "July–December 2018",
            "mentors": "David Touretzky",
            "source": "https://www.bits-pilani.ac.in/wp-content/uploads/Annexures_2018_2019-1.pdf",
            "papers": []
          },
          {
            "place": "BITS Pilani, Goa",
            "role": "Undergraduate thesis, mobile robot navigation",
            "mentors": "C. K. Ramesha",
            "source": "https://www.bits-pilani.ac.in/wp-content/uploads/Annexures_2018_2019-1.pdf",
            "papers": []
          },
          {
            "place": "BITS Pilani, Goa",
            "role": "Programming teaching assistant and co-instructor",
            "period": "2017–2018",
            "source": "https://github.com/SebastinSanty/sebastinsanty.com/blob/55d5400f983831e454c8cd1ff59644587ef86e7d/v1-jonbarron/data/SebastinSanty_CV.pdf",
            "papers": []
          },
          {
            "place": "BITS Pilani, Goa",
            "role": "Founding member, Open Source Development Labs",
            "period": "From August 2016",
            "source": "https://github.com/SebastinSanty/sebastinsanty.com/blob/55d5400f983831e454c8cd1ff59644587ef86e7d/v1-jonbarron/data/SebastinSanty_CV.pdf",
            "papers": []
          },
          {
            "place": "Bill & Melinda Gates Foundation",
            "role": "Research project, sensors for wastewater treatment",
            "period": "November 2017–May 2018",
            "mentors": "Nitin Sharma",
            "mentorLabel": "With",
            "source": "https://github.com/SebastinSanty/sebastinsanty.com/blob/55d5400f983831e454c8cd1ff59644587ef86e7d/v1-jonbarron/data/SebastinSanty_CV.pdf",
            "papers": []
          },
          {
            "place": "BITS Pilani, Goa",
            "role": "Research collaboration, network protocol analysis",
            "period": "January–May 2017",
            "mentors": "Prasad Talasila",
            "mentorLabel": "With",
            "source": "https://github.com/SebastinSanty/sebastinsanty.com/blob/55d5400f983831e454c8cd1ff59644587ef86e7d/v1-jonbarron/data/SebastinSanty_CV.pdf",
            "papers": [
              {
                "venue": "ICDCN 2018",
                "status": "Accepted",
                "authorship": "Fourth",
                "title": "BITS Darshini: A Modular, Concurrent Protocol Analyzer Workbench",
                "url": "https://doi.org/10.1145/3154273.3154316"
              }
            ]
          },
          {
            "place": "Julia Language",
            "role": "Google Summer of Code internship, DataDepsGenerators.jl",
            "period": "May–August 2018",
            "mentors": "Lyndon White",
            "source": "https://numfocus.org/blog/google-summer-of-code-2018-julia-cohort",
            "papers": [
              {
                "venue": "JOSS 2018",
                "status": "Accepted",
                "authorship": "Second",
                "title": "DataDepsGenerators.jl: Making Reusing Data Easy by Automatically Generating DataDeps.jl Registration Code",
                "url": "https://joss.theoj.org/papers/10.21105/joss.00921"
              }
            ]
          },
          {
            "place": "Mozilla",
            "role": "Google Summer of Code internship, Bugzilla interface",
            "period": "May–August 2017",
            "mentors": "Dylan Hardison",
            "source": "https://summerofcode.withgoogle.com/archive/2017/organizations/6414943960170496",
            "papers": []
          }
        ]
      },
      {
        "id": "jiafei-duan",
        "name": "Jiafei Duan",
        "school": "Nanyang Technological University",
        "major": "Electrical and Electronic Engineering",
        "educationSource": "https://www.a-star.edu.sg/cfar/events/perceive-and-reason-about-the-physical-world",
        "source": "https://medium.com/@jefferyjiafei/grad-school-application-101-117eba3e2d1f",
        "sourceLabel": "Application blog",
        "research": [
          {
            "place": "A*STAR",
            "role": "Research, embodied AI",
            "papers": [
              {
                "title": "ActioNet: Interactive End-to-End Platform for Task-Based Data Collection and Augmentation in 3D Environment",
                "venue": "ICIP 2020",
                "authorship": "First",
                "status": "Accepted",
                "url": "https://medium.com/@jefferyjiafei/grad-school-application-101-117eba3e2d1f"
              }
            ],
            "mentors": "Cheston Tan · Hui Li Tan",
            "source": "https://medium.com/@jefferyjiafei/grad-school-application-101-117eba3e2d1f"
          }
        ],
        "graduationYear": 2020,
        "year": 2020
      },
      {
        "id": "alisa-liu",
        "name": "Alisa Liu",
        "school": "Northwestern University",
        "year": 2019,
        "major": "Computer Science & Mathematics",
        "graduationYear": 2020,
        "educationSource": "https://alisawuffles.github.io/uploads/Alisa-Liu-CV.pdf",
        "source": "https://drive.google.com/file/d/1bnYtdVwWH9FuFadxerhHdQmKzXjg0rbh/view",
        "research": [
          {
            "place": "Northwestern University",
            "role": "Undergraduate research, Interactive Audio Lab · source separation",
            "mentors": "Bryan Pardo · Prem Seetharaman",
            "source": "https://www.mccormick.northwestern.edu/computer-science/news-events/news/articles/2023/women-in-computing-welcomes-alumna-alisa-liu.html",
            "papers": [
              {
                "venue": "ICASSP 2020",
                "status": "Submitted",
                "year": 2019,
                "authorship": "First",
                "title": "Model Selection for Deep Audio Source Separation via Clustering Analysis",
                "url": "https://arxiv.org/abs/1910.12626v1"
              }
            ]
          },
          {
            "place": "Northwestern University",
            "role": "Undergraduate research, word senses and question answering",
            "mentors": "Doug Downey",
            "source": "https://www.mccormick.northwestern.edu/computer-science/news-events/news/articles/2023/women-in-computing-welcomes-alumna-alisa-liu.html",
            "papers": [
              {
                "venue": "Preprint",
                "status": "Preprint",
                "year": 2019,
                "authorship": "Third",
                "title": "Multi-sense Definition Modeling using Word Sense Decompositions",
                "url": "https://arxiv.org/abs/1909.09483v1"
              },
              {
                "venue": "RepEval at NAACL 2019",
                "status": "Accepted",
                "authorship": "Third",
                "title": "CODAH: An Adversarially-Authored Question Answering Dataset for Common Sense",
                "url": "https://aclanthology.org/W19-2008/"
              }
            ]
          },
          {
            "place": "Northwestern University",
            "role": "Undergraduate research, 400,000-example noun-compound dataset and definition generation",
            "period": "From summer 2019",
            "mentors": "Doug Downey",
            "source": "https://www.openessays.org/essays/uw-phd-sop-essay-alisa-2024",
            "papers": []
          },
          {
            "place": "Northwestern University",
            "role": "Research, iterative data augmentation for Bach chorale generation",
            "mentors": "Bryan Pardo",
            "mentorLabel": "Collaborator",
            "source": "https://drive.google.com/file/d/1bnYtdVwWH9FuFadxerhHdQmKzXjg0rbh/view",
            "papers": []
          },
          {
            "place": "Seattle",
            "role": "Research and industry internships",
            "source": "https://drive.google.com/file/d/1bnYtdVwWH9FuFadxerhHdQmKzXjg0rbh/view",
            "papers": []
          }
        ],
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "reviewed",
          "source": "https://alisawuffles.github.io/",
          "note": "CODAH is a 2019 workshop paper. Audio paper appears in DCASE 2020, after the 2019 application; retain submitted ICASSP entry."
        }
      },
      {
        "id": "aditya-kusupati",
        "name": "Aditya Kusupati",
        "school": "IIT Bombay",
        "year": 2018,
        "major": "Computer Science and Engineering (minor in Electrical Engineering)",
        "graduationYear": 2017,
        "educationSource": "https://adityakusupati.com/docs/AdityaKusupati_Research_CV.pdf",
        "source": "https://www.openessays.org/essays/uw-phd-sop-essay-aditya-2024",
        "research": [
          {
            "place": "Microsoft Research India",
            "role": "Research fellow, EdgeML · efficient recurrent models and compression",
            "period": "From May 2017",
            "mentors": "Manik Varma · Prateek Jain",
            "source": "https://www.openessays.org/essays/uw-phd-sop-essay-aditya-2024",
            "papers": [
              {
                "venue": "NeurIPS 2018",
                "status": "Accepted",
                "authorship": "First",
                "title": "FastGRNN: A Fast, Accurate, Stable and Tiny Kilobyte Sized Gated Recurrent Neural Network",
                "url": "https://papers.neurips.cc/paper_files/paper/2018/hash/ab013ca67cf2d50796b0c11d1b8bc95d-Abstract.html"
              }
            ]
          },
          {
            "place": "IIT Bombay",
            "role": "Undergraduate thesis, entity embeddings for knowledge bases",
            "period": "2016–2017",
            "mentors": "Soumen Chakrabarti",
            "source": "https://adityakusupati.com/pubs/kusupati17.pdf",
            "papers": []
          },
          {
            "place": "IIT Bombay",
            "role": "Teaching assistant for five courses · Digital Logic Design Lab teaching award",
            "source": "https://www.openessays.org/essays/uw-phd-sop-essay-aditya-2024",
            "papers": []
          },
          {
            "place": "American Express Big Data Labs",
            "role": "Research internship",
            "period": "May–July 2016",
            "source": "https://contactout.com/Aditya-Kusupati-4583186",
            "papers": []
          }
        ]
      },
      {
        "id": "sewon-min",
        "name": "Sewon Min",
        "school": "Seoul National University",
        "year": 2017,
        "major": "Computer Science & Engineering",
        "graduationYear": 2018,
        "educationSource": "https://www.sewonmin.com/assets/CV.pdf",
        "source": "https://drive.google.com/file/d/1ew3gh_KEqu9ArPR7sKxv1Qx38jXTiXt7/view",
        "research": [
          {
            "place": "University of Washington",
            "role": "Undergraduate research, question answering and language models",
            "period": "October 2016–February 2017",
            "mentors": "Hannaneh Hajishirzi",
            "source": "https://www.sewonmin.com/assets/CV.pdf",
            "papers": [
              {
                "venue": "ICLR 2018",
                "status": "Submitted",
                "year": 2017,
                "authorship": "Equal first",
                "title": "Neural Speed Reading via Skim-RNN",
                "url": "https://arxiv.org/abs/1711.02085v1"
              },
              {
                "venue": "ACL 2017",
                "status": "Accepted",
                "authorship": "First",
                "title": "Question Answering through Transfer Learning from Large Fine-grained Supervision Data",
                "url": "https://aclanthology.org/P17-2081/"
              },
              {
                "venue": "ICLR 2017",
                "status": "Accepted",
                "authorship": "Second",
                "title": "Query-Reduction Networks for Question Answering",
                "url": "https://ai2-website.s3.amazonaws.com/publications/query-reduction.pdf"
              }
            ]
          },
          {
            "place": "Salesforce Research",
            "role": "Research internship",
            "period": "From November 2017",
            "mentors": "Caiming Xiong",
            "mentorLabel": "Mentor",
            "source": "https://www.sewonmin.com/assets/CV.pdf",
            "papers": []
          },
          {
            "place": "Seoul National University",
            "role": "Research internship, Vision & Learning Lab",
            "period": "July–August 2016",
            "mentors": "Gunhee Kim",
            "source": "https://www.sewonmin.com/assets/CV.pdf",
            "papers": []
          },
          {
            "place": "Seoul National University",
            "role": "Merit scholarship",
            "period": "From 2014",
            "source": "https://www.sewonmin.com/assets/CV.pdf",
            "papers": []
          }
        ]
      }
    ]
  },
  {
    "id": "uiuc",
    "name": "University of Illinois Urbana-Champaign",
    "program": "Computer Science PhD",
    "applicants": [
      {
        "id": "thu-00043",
        "name": "我是乔治",
        "school": "Tsinghua University",
        "year": 2024,
        "major": "Computer Science and Finance",
        "educationSource": "https://database.feiyue.online/applicant/Applicant-00043/",
        "source": "https://database.feiyue.online/applicant/Applicant-00043/",
        "sourceLabel": "View application profile",
        "research": [
          {
            "place": "Tsinghua University",
            "role": "Distributed training systems for large language models",
            "papers": [
              {
                "venue": "",
                "status": "Submitted",
                "authorship": "Second",
                "title": "Distributed LLM training paper"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00043/"
          },
          {
            "place": "Summer research",
            "role": "Machine learning systems",
            "papers": [
              {
                "venue": "NeurIPS",
                "status": "Accepted",
                "authorship": "Second",
                "title": "Machine learning systems paper"
              },
              {
                "venue": "",
                "status": "Submitted",
                "authorship": "Equal first",
                "title": "Machine learning systems paper — equal first"
              },
              {
                "venue": "",
                "status": "Submitted",
                "authorship": "Third",
                "title": "Machine learning systems paper — third author"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00043/"
          },
          {
            "place": "Zhipu AI",
            "role": "Internship",
            "papers": [],
            "source": "https://database.feiyue.online/applicant/Applicant-00043/"
          }
        ],
        "program": "Computer Science PhD — admitted"
      },
      {
        "name": "Benhao Huang",
        "id": "benhao-huang",
        "school": "Shanghai Jiao Tong University",
        "major": "Computer Science",
        "graduationYear": 2025,
        "year": 2024,
        "source": "https://huskydoge.github.io/husky-blog/posts/applications/25fall/notes/",
        "sourceLabel": "Application blog",
        "educationSource": "https://huskydoge.github.io/",
        "research": [
          {
            "place": "UC San Diego",
            "role": "Research internship, world models",
            "source": "https://huskydoge.github.io/",
            "papers": [],
            "mentors": "Zhiting Hu",
            "period": "From June 2024"
          },
          {
            "place": "Moonshot AI",
            "role": "Research internship",
            "source": "https://huskydoge.github.io/",
            "papers": [],
            "period": "March–June 2024"
          },
          {
            "place": "UIUC",
            "role": "Remote research, dataset curation agents",
            "source": "https://huskydoge.github.io/",
            "papers": [],
            "mentors": "Jiaqi W. Ma",
            "period": "November 2023–September 2024"
          },
          {
            "place": "Shanghai Jiao Tong University",
            "role": "Undergraduate research, interpretability and interaction primitives",
            "source": "https://huskydoge.github.io/",
            "papers": [
              {
                "title": "Defining and Extracting Generalizable Interaction Primitives from DNNs",
                "venue": "ICLR 2024",
                "status": "Accepted",
                "authorship": "Third",
                "year": 2024,
                "url": "https://proceedings.iclr.cc/paper_files/paper/2024/hash/67a9b444cbcd647572c88194619f72d5-Abstract-Conference.html"
              }
            ],
            "mentors": "Quanshi Zhang",
            "period": "February 2023–January 2024"
          }
        ],
        "program": "Computer Science PhD · Admitted; declined",
        "paperReview": {
          "checked": "2026-11-03",
          "count": 1,
          "status": "corrected",
          "source": "https://huskydoge.github.io/resume.pdf",
          "note": "Changed interaction-primitives paper from preprint to ICLR 2024 accepted. AAAI 2025 acceptance relative to the exact application date remains unresolved; count is a lower bound."
        }
      },
      {
        "id": "thu-00042",
        "name": "lihan",
        "school": "Tsinghua University",
        "year": 2023,
        "major": "Fundamental Sciences and Energy and Power Engineering",
        "educationSource": "https://database.feiyue.online/applicant/Applicant-00042/",
        "source": "https://database.feiyue.online/applicant/Applicant-00042/",
        "sourceLabel": "View application profile",
        "research": [
          {
            "place": "Tsinghua University",
            "role": "Institute for Interdisciplinary Information Sciences, robot learning",
            "papers": [
              {
                "venue": "",
                "status": "Preprint",
                "authorship": "Equal first",
                "title": "Robot learning paper — preprint"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00042/"
          },
          {
            "place": "Stanford University",
            "role": "Summer research, robot learning",
            "papers": [
              {
                "venue": "ICRA",
                "status": "Submitted",
                "authorship": "First",
                "title": "Robot learning paper — ICRA submission"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00042/"
          }
        ],
        "program": "Computer Science PhD — admitted",
        "paperReview": {
          "checked": "2026-11-03",
          "count": null,
          "status": "skipped",
          "source": "https://database.feiyue.online/applicant/Applicant-00042/",
          "note": "Alias; further author matching skipped at user request. Publication count remains unknown."
        }
      },
      {
        "id": "thu-00018",
        "name": "Sophia",
        "school": "Tsinghua University",
        "year": 2022,
        "major": "Computer Science (Yao Class)",
        "educationSource": "https://database.feiyue.online/applicant/Applicant-00018/",
        "source": "https://database.feiyue.online/applicant/Applicant-00018/",
        "sourceLabel": "View application profile",
        "research": [
          {
            "place": "Microsoft Research Asia",
            "role": "Research internship, NLP",
            "papers": [
              {
                "venue": "ACL",
                "status": "Submitted",
                "authorship": "First",
                "title": "NLP paper — ACL"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00018/"
          },
          {
            "place": "Tsinghua University",
            "role": "Future Laboratory, computer vision",
            "papers": [
              {
                "venue": "CVPR",
                "status": "Accepted",
                "authorship": "Second",
                "title": "Computer vision paper"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00018/"
          },
          {
            "place": "University of Maryland",
            "role": "Spring research, NLP",
            "papers": [
              {
                "venue": "Findings of EMNLP",
                "status": "Accepted",
                "authorship": "First",
                "title": "NLP paper — Findings of EMNLP"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00018/"
          },
          {
            "place": "Stanford University",
            "role": "UGVR summer research, HCI",
            "papers": [
              {
                "venue": "CHI",
                "status": "Submitted",
                "authorship": "First",
                "title": "HCI paper"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00018/"
          }
        ],
        "program": "Computer Science PhD — admitted"
      },
      {
        "id": "thu-00021",
        "name": "Colin",
        "school": "Tsinghua University",
        "year": 2022,
        "major": "Computer Science and Technology",
        "educationSource": "https://database.feiyue.online/applicant/Applicant-00021/",
        "source": "https://database.feiyue.online/applicant/Applicant-00021/",
        "sourceLabel": "View application profile",
        "research": [
          {
            "place": "Carnegie Mellon University",
            "role": "Research internship, machine learning for systems",
            "papers": [],
            "source": "https://database.feiyue.online/applicant/Applicant-00021/"
          },
          {
            "place": "University of Illinois Urbana-Champaign",
            "role": "Research internship, software engineering for AI",
            "papers": [],
            "source": "https://database.feiyue.online/applicant/Applicant-00021/"
          }
        ],
        "program": "Computer Science PhD — admitted",
        "paperReview": {
          "checked": "2026-11-03",
          "count": null,
          "status": "skipped",
          "source": "https://database.feiyue.online/applicant/Applicant-00021/",
          "note": "Alias; further author matching skipped at user request. Publication count remains unknown."
        }
      }
    ]
  },
  {
    "id": "penn",
    "name": "University of Pennsylvania",
    "program": "Computer & Information Science PhD",
    "applicants": [
      {
        "id": "honam-wong",
        "name": "Honam Wong",
        "school": "Hong Kong University of Science and Technology",
        "year": 2024,
        "major": "Computer Science & Mathematics",
        "graduationYear": 2025,
        "educationSource": "https://matheart.github.io/",
        "source": "https://www.overleaf.com/read/tqwnttmqpmcc",
        "research": [
          {
            "place": "Northwestern University",
            "role": "Research collaboration, physics-informed learning",
            "period": "From 2023",
            "mentors": "Yiping Lu",
            "source": "https://2prime.github.io/students/",
            "papers": [
              {
                "venue": "ICLR 2025",
                "status": "Submitted",
                "year": 2024,
                "authorship": "First",
                "title": "Benign Overfitting in Fixed Dimension via Physics-Informed Learning with Smooth Inductive Bias",
                "url": "https://arxiv.org/abs/2406.09194v2"
              }
            ]
          },
          {
            "place": "Hong Kong University of Science and Technology",
            "role": "Undergraduate research, out-of-distribution generalization",
            "mentors": "Tong Zhang",
            "papers": [
              {
                "venue": "ICLR 2024",
                "status": "Accepted",
                "authorship": "Fourth",
                "title": "Spurious Feature Diversification Improves Out-of-distribution Generalization",
                "url": "https://arxiv.org/abs/2309.17230"
              }
            ]
          },
          {
            "place": "University of Michigan",
            "role": "Research, compositional representations in transformers",
            "mentors": "Wei Hu",
            "papers": []
          },
          {
            "place": "EPFL",
            "role": "Exchange semester",
            "period": "Spring 2024",
            "source": "https://matheart.github.io/",
            "papers": []
          }
        ]
      },
      {
        "id": "mayank-keoliya",
        "name": "Mayank Keoliya",
        "school": "National University of Singapore",
        "year": 2022,
        "major": "Computer Science",
        "graduationYear": 2023,
        "educationSource": "https://www.seas.upenn.edu/~mkeoliya/assets/pdf/resume.pdf",
        "source": "https://drive.google.com/file/d/1jdMMqOSbo28TT2f6FXHNC5huxYDsiKYc/view",
        "research": [
          {
            "place": "National University of Singapore",
            "role": "Research assistant, automated proof repair",
            "period": "From May 2022",
            "mentors": "Ilya Sergey · Kiran Gopinathan",
            "mentorLabel": "Advisor & collaborator",
            "source": "https://ilyasergey.net/students/",
            "papers": [
              {
                "venue": "PLDI 2023",
                "status": "Submitted",
                "year": 2022,
                "authorship": "Second",
                "title": "Mostly Automated Proof Repair for Verified Libraries",
                "url": "https://pldi23.sigplan.org/details/pldi-2023-pldi/2/Mostly-Automated-Proof-Repair-for-Verified-Libraries"
              }
            ]
          },
          {
            "place": "National University of Singapore",
            "role": "Research assistant, DNA storage and Nanopore sequencing errors",
            "period": "August 2021–May 2022",
            "mentors": "Djordje Jevdjic",
            "source": "https://cde.nus.edu.sg/artic/publications/",
            "papers": [
              {
                "venue": "ISPASS 2022 Poster",
                "status": "Accepted",
                "authorship": "First",
                "title": "Simulating Noisy Channels in DNA Storage",
                "url": "https://ispass.org/ispass2022/accepted-posters.php"
              }
            ]
          },
          {
            "place": "National University of Singapore",
            "role": "Programming languages project, continuation-based logic programming",
            "period": "2022",
            "source": "https://drive.google.com/file/d/1jdMMqOSbo28TT2f6FXHNC5huxYDsiKYc/view",
            "papers": []
          },
          {
            "place": "National University of Singapore",
            "role": "Software engineering internship, Computing for Voluntary Welfare Organisations",
            "period": "May–August 2020",
            "source": "https://github.com/mkeoliya/mkeoliya.github.io/blob/dcfe43af3a40a6b8ed3753927bfed33c9ba1899b/assets/pdf/resume.pdf",
            "papers": []
          },
          {
            "place": "Garena",
            "role": "Software engineering internship, game alerts management",
            "period": "May–August 2021",
            "source": "https://github.com/mkeoliya/mkeoliya.github.io/blob/dcfe43af3a40a6b8ed3753927bfed33c9ba1899b/assets/pdf/resume.pdf",
            "papers": []
          }
        ],
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "reviewed",
          "source": "https://www.engineering.upenn.edu/~mkeoliya/",
          "note": "ISPASS 2022 is in the official accepted-poster list (three-page paper); PLDI 2023 was submitted at application time."
        }
      }
    ]
  },
  {
    "id": "texas",
    "name": "University of Texas at Austin",
    "program": "PhD",
    "applicants": [
      {
        "id": "abhinav-gyawali",
        "name": "Abhinav Gyawali",
        "school": "Tribhuvan University",
        "year": 2025,
        "major": "Computer Science and Information Technology",
        "graduationYear": 2024,
        "educationSource": "https://abhizer.com/docs/cvs/cv_academic.pdf",
        "source": "https://www.scribd.com/document/1064883858/sop-1",
        "research": [
          {
            "place": "Feldera",
            "role": "Software engineer, incremental view maintenance and SQLancer-based database testing",
            "period": "From December 2023",
            "source": "https://www.scribd.com/document/1064883858/sop-1",
            "papers": [
              {
                "venue": "The VLDB Journal 2025",
                "status": "Accepted",
                "authorship": "Seventh",
                "title": "DBSP: Automatic Incremental View Maintenance for Rich Query Languages",
                "url": "https://abhizer.com/docs/papers/dbsp-vldb25.pdf"
              }
            ]
          },
          {
            "place": "Tribhuvan University",
            "role": "Final-year project, SocketDB · database with real-time WebSocket updates",
            "source": "https://abhizer.com/docs/cvs/cv_academic.pdf",
            "papers": []
          },
          {
            "place": "Invisid",
            "role": "Software developer, behavioral authentication",
            "period": "May 2022–November 2023",
            "source": "https://abhizer.com/docs/cvs/cv_academic.pdf",
            "papers": []
          },
          {
            "place": "Flow Webinar",
            "role": "Security engineer, video platform security",
            "period": "May 2020–June 2021",
            "source": "https://abhizer.com/docs/cvs/cv_academic.pdf",
            "papers": []
          }
        ],
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "reviewed",
          "source": "https://abhizer.com/",
          "note": "DBSP is a VLDB Journal article, not a full main-conference paper under the agreed metric."
        }
      },
      {
        "id": "thu-00042",
        "name": "lihan",
        "school": "Tsinghua University",
        "year": 2023,
        "major": "Fundamental Sciences and Energy and Power Engineering",
        "educationSource": "https://database.feiyue.online/applicant/Applicant-00042/",
        "source": "https://database.feiyue.online/applicant/Applicant-00042/",
        "sourceLabel": "View application profile",
        "research": [
          {
            "place": "Tsinghua University",
            "role": "Institute for Interdisciplinary Information Sciences, robot learning",
            "papers": [
              {
                "venue": "",
                "status": "Preprint",
                "authorship": "Equal first",
                "title": "Robot learning paper — preprint"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00042/"
          },
          {
            "place": "Stanford University",
            "role": "Summer research, robot learning",
            "papers": [
              {
                "venue": "ICRA",
                "status": "Submitted",
                "authorship": "First",
                "title": "Robot learning paper — ICRA submission"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00042/"
          }
        ],
        "program": "Computer Science PhD — admitted",
        "paperReview": {
          "checked": "2026-11-03",
          "count": null,
          "status": "skipped",
          "source": "https://database.feiyue.online/applicant/Applicant-00042/",
          "note": "Alias; further author matching skipped at user request. Publication count remains unknown."
        }
      }
    ]
  },
  {
    "id": "caltech",
    "name": "Caltech",
    "program": "Computing & Mathematical Sciences PhD",
    "applicants": [
      {
        "id": "robert-joseph-george",
        "name": "Robert Joseph George",
        "school": "University of Alberta",
        "year": 2022,
        "major": "Applied Mathematics (Computing Science minor)",
        "graduationYear": 2023,
        "educationSource": "https://www.ualberta.ca/en/media-library/convocation/2023/convocation-spring-2023-long-form-program.pdf",
        "source": "https://drive.google.com/file/d/1PZtJL875vb2kbgXjwX4xWCp0W2PN9IKE/view",
        "research": [
          {
            "place": "Caltech",
            "role": "Research internship, AI + Science Group",
            "period": "From July 2022",
            "mentors": "Anima Anandkumar",
            "source": "https://www.robertj1.com/assets/pdf/academic_cv.pdf",
            "papers": [
              {
                "venue": "AI4Science at NeurIPS 2022",
                "status": "Accepted",
                "authorship": "Second",
                "title": "Incremental Fourier Neural Operator",
                "url": "https://authors.library.caltech.edu/records/yzd3w-17758"
              }
            ]
          },
          {
            "place": "Alberta Machine Intelligence Institute",
            "role": "Research internship, kernel methods",
            "period": "From January 2022",
            "mentors": "Martha White · Adam White",
            "source": "https://drive.google.com/file/d/1PZtJL875vb2kbgXjwX4xWCp0W2PN9IKE/view",
            "papers": []
          },
          {
            "place": "Alberta Machine Intelligence Institute",
            "role": "Research, MinAtar reinforcement-learning benchmarks and performance · Undergraduate Research Symposium 2022 poster",
            "mentors": "Martha White · Adam White",
            "source": "https://www.robertj1.com/assets/pdf/RL-Poster.pdf",
            "papers": []
          },
          {
            "place": "Pacific Institute for the Mathematical Sciences",
            "role": "Research assistant · CUMC 2022 presentation",
            "period": "From January 2022",
            "mentors": "Xinwei Yu",
            "source": "https://www.robertj1.com/assets/pdf/academic_cv.pdf",
            "papers": [
              {
                "venue": "Preprint",
                "status": "Preprint",
                "year": 2022,
                "authorship": "First",
                "title": "Numerical Analysis for Real-time Nonlinear Model Predictive Control of Ethanol Steam Reformers",
                "url": "https://arxiv.org/abs/2210.13745v1"
              }
            ]
          },
          {
            "place": "University of Alberta",
            "role": "Research, climate forecasting",
            "period": "2022",
            "mentors": "David Wishart",
            "source": "https://www.robertj1.com/assets/pdf/academic_cv.pdf",
            "papers": []
          },
          {
            "place": "University of Alberta",
            "role": "Research, hybrid dealiased convolutions",
            "period": "2022",
            "mentors": "John Bowman · Noel Murasko",
            "mentorLabel": "With",
            "source": "https://www.scribd.com/document/589606309/Abstract-Booklet-Undergraduate-Conference",
            "papers": []
          },
          {
            "place": "University of Alberta",
            "role": "Research assistant, Canadian VIGOUR Centre · predicting clinical events with process mining",
            "period": "January–June 2022",
            "mentors": "Russ Greiner",
            "source": "https://www.robertj1.com/assets/pdf/academic_cv.pdf",
            "papers": []
          },
          {
            "place": "University of Alberta",
            "role": "Teaching assistant, machine learning, theoretical computer science and real analysis",
            "source": "https://drive.google.com/file/d/1PZtJL875vb2kbgXjwX4xWCp0W2PN9IKE/view",
            "papers": []
          },
          {
            "place": "Google Brain",
            "role": "Research scholar, CS Research Mentorship Program",
            "period": "2022",
            "source": "https://research.google/programs-and-events/past-programs/csrmp/",
            "papers": []
          },
          {
            "place": "Cohere For AI",
            "role": "Machine learning theory group lead",
            "period": "From October 2022",
            "source": "https://www.robertj1.com/assets/pdf/academic_cv.pdf",
            "papers": []
          },
          {
            "place": "University of Alberta",
            "role": "Mathematical Sciences Society member and treasurer",
            "period": "From 2019",
            "source": "https://www.robertj1.com/assets/pdf/academic_cv.pdf",
            "papers": []
          },
          {
            "place": "Microsoft",
            "role": "Data science internship, interpretable models for Azure resource allocation",
            "period": "June–August 2021",
            "source": "https://drive.google.com/file/d/1PZtJL875vb2kbgXjwX4xWCp0W2PN9IKE/view",
            "papers": []
          }
        ],
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "reviewed",
          "source": "https://www.robertj1.com/assets/pdf/academic_cv.pdf",
          "note": "Incremental Fourier Neural Operator is a NeurIPS 2022 workshop paper; numerical-analysis work was a preprint."
        }
      }
    ]
  },
  {
    "id": "ucsd",
    "name": "UC San Diego",
    "program": "Computer Science PhD",
    "applicants": [
      {
        "id": "thu-00018",
        "name": "Sophia",
        "school": "Tsinghua University",
        "year": 2022,
        "major": "Computer Science (Yao Class)",
        "educationSource": "https://database.feiyue.online/applicant/Applicant-00018/",
        "source": "https://database.feiyue.online/applicant/Applicant-00018/",
        "sourceLabel": "View application profile",
        "research": [
          {
            "place": "Microsoft Research Asia",
            "role": "Research internship, NLP",
            "papers": [
              {
                "venue": "ACL",
                "status": "Submitted",
                "authorship": "First",
                "title": "NLP paper — ACL"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00018/"
          },
          {
            "place": "Tsinghua University",
            "role": "Future Laboratory, computer vision",
            "papers": [
              {
                "venue": "CVPR",
                "status": "Accepted",
                "authorship": "Second",
                "title": "Computer vision paper"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00018/"
          },
          {
            "place": "University of Maryland",
            "role": "Spring research, NLP",
            "papers": [
              {
                "venue": "Findings of EMNLP",
                "status": "Accepted",
                "authorship": "First",
                "title": "NLP paper — Findings of EMNLP"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00018/"
          },
          {
            "place": "Stanford University",
            "role": "UGVR summer research, HCI",
            "papers": [
              {
                "venue": "CHI",
                "status": "Submitted",
                "authorship": "First",
                "title": "HCI paper"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00018/"
          }
        ],
        "program": "Computer Science PhD — admitted"
      },
      {
        "id": "youming-deng",
        "name": "Youming Deng",
        "school": "Wuhan University",
        "major": "Information and Digital Technology",
        "educationSource": "https://denghilbert.github.io/images/resume.pdf",
        "source": "https://denghilbert.github.io/blog/PhD%E7%94%B3%E8%AF%B7%E5%9B%9E%E5%BF%86.html",
        "sourceLabel": "Application blog",
        "research": [
          {
            "place": "UC Merced",
            "role": "Remote research internship, inverse rendering",
            "papers": [
              {
                "title": "Physics-based Indirect Illumination for Inverse Rendering",
                "venue": "CVPR 2023",
                "authorship": "First",
                "status": "Submitted",
                "year": 2022,
                "url": "https://denghilbert.github.io/blog/PhD%E7%94%B3%E8%AF%B7%E5%9B%9E%E5%BF%86.html"
              }
            ],
            "mentors": "Ming-Hsuan Yang · Xueting Li · Sifei Liu",
            "period": "From April 2022",
            "source": "https://denghilbert.github.io/blog/PhD%E7%94%B3%E8%AF%B7%E5%9B%9E%E5%BF%86.html"
          },
          {
            "place": "Wuhan University",
            "role": "Undergraduate research, scene graph generation",
            "papers": [
              {
                "title": "Hierarchical Memory Learning for Fine-Grained Scene Graph Generation",
                "venue": "ECCV 2022",
                "authorship": "First",
                "status": "Accepted",
                "url": "https://denghilbert.github.io/blog/PhD%E7%94%B3%E8%AF%B7%E5%9B%9E%E5%BF%86.html"
              }
            ],
            "mentors": "Yansheng Li",
            "period": "June 2021–April 2022",
            "source": "https://denghilbert.github.io/blog/PhD%E7%94%B3%E8%AF%B7%E5%9B%9E%E5%BF%86.html"
          }
        ],
        "graduationYear": 2023,
        "year": 2022
      }
    ]
  },
  {
    "id": "michigan",
    "name": "University of Michigan",
    "program": "Computer Science & Engineering PhD",
    "applicants": [
      {
        "id": "muhammad-ashiq",
        "name": "Muhammad Ashiq",
        "school": "University of Wisconsin–Madison",
        "year": 2025,
        "major": "Computer Science and Mathematics",
        "graduationYear": 2026,
        "program": "Electrical and Computer Engineering PhD",
        "educationSource": "https://awards.advising.wisc.edu/campus-wide-award-recipients/test-hilldale-fellows/",
        "source": "https://drive.google.com/file/d/1p_hLjVO3YxJV0Gx95VcMraD0chNIAiQG/view",
        "research": [
          {
            "place": "University of Wisconsin–Madison",
            "role": "Undergraduate research, privacy and trustworthy machine learning",
            "mentors": "Grigorios Chrysos",
            "source": "https://drive.google.com/file/d/1p_hLjVO3YxJV0Gx95VcMraD0chNIAiQG/view",
            "papers": [
              {
                "venue": "ICLR 2026",
                "status": "Submitted",
                "year": 2025,
                "authorship": "First",
                "title": "Inducing Uncertainty on Open-Weight Models for Test-Time Privacy in Image Recognition",
                "url": "https://arxiv.org/abs/2509.11625v2",
                "also": [
                  {
                    "venue": "NeurIPS 2025 Workshop on Regulatable ML",
                    "status": "Accepted",
                    "url": "https://github.com/ashiqwisc/test_time_privacy"
                  }
                ]
              },
              {
                "venue": "What Can('t) Transformers Do? at NeurIPS 2025",
                "status": "Accepted",
                "authorship": "Third",
                "title": "Data Augmentations for Arithmetic Length Generalization in Transformers",
                "url": "https://transformerstheory.github.io/"
              }
            ]
          },
          {
            "place": "University of Wisconsin–Madison",
            "role": "Hilldale research fellowship, diffusion model generalization",
            "period": "2025",
            "mentors": "Grigorios Chrysos",
            "source": "https://awards.advising.wisc.edu/2024-25-chancellors-undergraduate-award-winners/",
            "papers": []
          },
          {
            "place": "University of Wisconsin–Madison",
            "role": "Research, diffusion hallucinations and Gaussian mixtures",
            "source": "https://drive.google.com/file/d/1p_hLjVO3YxJV0Gx95VcMraD0chNIAiQG/view",
            "papers": []
          },
          {
            "place": "University of Wisconsin–Madison",
            "role": "Research internship, Epistemic Analytics · learning analytics",
            "period": "2023–2025",
            "mentors": "Yeyu Wang",
            "source": "https://ashiqwisc.github.io/",
            "papers": [
              {
                "venue": "ICQE 2025",
                "status": "Accepted",
                "authorship": "Third",
                "title": "Land Emotions: An Initial Analysis of Ethics and Emotive Landscapes on a Community Walk",
                "url": "https://www.qesoc.org/icqe25-agenda/"
              },
              {
                "venue": "Educational Technology Research and Development 2025",
                "status": "Accepted",
                "authorship": "Fourth",
                "title": "A Multimodal Representation Framework for Collaborative Knowledge-Building in an Immersive Astronomy Simulation: Using Transmodal Ordered Network Analysis",
                "url": "https://doi.org/10.1007/s11423-025-10510-0"
              },
              {
                "venue": "Journal of Learning Analytics 2025",
                "status": "Accepted",
                "authorship": "Fourth",
                "title": "Examining the Interplay of Gaze and Verbal Interactions in Socially Shared Regulation of Learning: A Transmodal Analysis Study",
                "url": "https://doi.org/10.18608/jla.2025.8661"
              },
              {
                "venue": "Clinical Simulation in Nursing 2024",
                "status": "Accepted",
                "authorship": "Third",
                "title": "Clinical Judgment, Person-Centered Care and Professionalism: A Transmodal Ordered Network Analysis of Student Performance in Virtual Patient Simulations",
                "url": "https://doi.org/10.1016/j.ecns.2024.101622"
              },
              {
                "venue": "ICLS 2024",
                "status": "Accepted",
                "authorship": "First",
                "title": "Illustrating the Interplay of Behavioral Patterns and Clinical Competencies in a Virtual Patient Simulation using Epistemic Network Analysis",
                "url": "https://doi.org/10.22318/icls2024.288227"
              },
              {
                "venue": "LAK 2024",
                "status": "Accepted",
                "authorship": "Fourth",
                "title": "Revealing Networks: Understanding Effective Teacher Practices in AI-Supported Classrooms Using Transmodal Ordered Network Analysis",
                "url": "https://doi.org/10.1145/3636555.3636892"
              },
              {
                "venue": "ICQE 2023",
                "status": "Accepted",
                "authorship": "Fifth",
                "title": "Developing Nursing Students’ Practice Readiness with Shadow Health Digital Clinical Experiences: A Transmodal Analysis",
                "url": "https://www.epistemicanalytics.org/images/pdf/Developing%20nursing%20students%20practice%20readiness%20with%20shadow%20health%20digital%20clinical%20experiences%20tm.pdf"
              },
              {
                "venue": "ICQE 2023 Supplement",
                "status": "Accepted",
                "authorship": "Fourth",
                "title": "Multimodal Rule Explanation in Children",
                "url": "https://www.qesoc.org/images/pdf/ICQE23_Supplement_Proceedings.pdf#page=71"
              }
            ]
          }
        ]
      },
      {
        "id": "shashank-kirtania",
        "name": "Shashank Kirtania",
        "school": "Thapar Institute of Engineering and Technology",
        "year": 2025,
        "major": "Computer Engineering",
        "graduationYear": 2023,
        "educationSource": "https://docs.google.com/gview?embedded=true&url=https%3A%2F%2Fraw.githubusercontent.com%2F5hv5hvnk%2F5hv5hvnk.github.io%2F08b1e6e54d51486b0035c649328a267723c45d36%2Fassets%2Fcv%2Fcv_web.pdf",
        "source": "https://drive.google.com/file/d/1TjT-KWV4plokLs5oQc6DMdC3A3KgGaMN/view",
        "research": [
          {
            "place": "Microsoft Research",
            "role": "Research, formal mathematics benchmark · Olympiad problem formalization and VS Code plugin",
            "source": "https://drive.google.com/file/d/1TjT-KWV4plokLs5oQc6DMdC3A3KgGaMN/view",
            "papers": [
              {
                "venue": "ICLR 2026",
                "status": "Submitted",
                "year": 2025,
                "authorship": "Second",
                "title": "IndiMathBench: Autoformalizing Mathematical Reasoning Problems with a Human Touch",
                "url": "https://www.microsoft.com/en-us/research/wp-content/uploads/2025/10/IndiMathBench_MS_hosting.pdf",
                "also": [
                  {
                    "venue": "Post-AI Formal Methods at AAAI 2026",
                    "status": "Accepted",
                    "url": "https://www.p-ai-fm.com/talks"
                  }
                ]
              }
            ]
          },
          {
            "place": "Microsoft Research",
            "role": "Research fellow, proof strategy representation",
            "period": "From December 2024",
            "mentors": "Arun Iyer · Emily First",
            "source": "https://github.com/5hv5hvnk/5hv5hvnk.github.io/blob/08b1e6e54d51486b0035c649328a267723c45d36/assets/cv/cv_web.pdf",
            "papers": []
          },
          {
            "place": "Microsoft Research",
            "role": "Research fellow, learning from LLM interactions",
            "period": "From August 2024",
            "mentors": "Arun Iyer · Gustavo Soares",
            "source": "https://github.com/5hv5hvnk/5hv5hvnk.github.io/blob/08b1e6e54d51486b0035c649328a267723c45d36/assets/cv/cv_web.pdf",
            "papers": [
              {
                "venue": "ICLR 2026",
                "status": "Submitted",
                "year": 2025,
                "authorship": "First",
                "title": "Improving Language Agents through BREW",
                "url": "https://www.microsoft.com/en-us/research/wp-content/uploads/2025/09/BREW-preprint.pdf",
                "also": [
                  {
                    "venue": "Multi-Turn Interactions at NeurIPS 2025",
                    "status": "Accepted",
                    "url": "https://workshop-multi-turn-interaction.github.io/"
                  }
                ]
              },
              {
                "venue": "EMNLP 2025 Industry",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "STACKFEED: Structured Textual Actor-Critic Knowledge Base Editing with Feedback",
                "url": "https://aclanthology.org/2025.emnlp-industry.176/",
                "also": [
                  {
                    "venue": "DL4C at NeurIPS 2025",
                    "status": "Accepted",
                    "url": "https://aiworkshoptracker.com/workshop/neurips-2025-dl4c/"
                  }
                ]
              }
            ]
          },
          {
            "place": "Microsoft Research",
            "role": "Research fellow, agent self-reflection, vulnerability detection and code repair",
            "period": "January–June 2024",
            "mentors": "Gustavo Soares · Arjun Radhakrishna",
            "source": "https://docs.google.com/gview?embedded=true&url=https%3A%2F%2Fraw.githubusercontent.com%2F5hv5hvnk%2F5hv5hvnk.github.io%2F08b1e6e54d51486b0035c649328a267723c45d36%2Fassets%2Fcv%2Fcv_web.pdf",
            "papers": [
              {
                "venue": "EMNLP 2024",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "MetaReflection: Learning Instructions for Language Agents using Past Reflections",
                "url": "https://aclanthology.org/2024.emnlp-main.477/"
              }
            ]
          },
          {
            "place": "Microsoft Research",
            "role": "Research fellow, language models for automated reasoning",
            "period": "From April 2024",
            "mentors": "Arun Iyer · Arjun Radhakrishna",
            "source": "https://github.com/5hv5hvnk/5hv5hvnk.github.io/blob/08b1e6e54d51486b0035c649328a267723c45d36/assets/cv/cv_web.pdf",
            "papers": [
              {
                "venue": "ICLR 2026",
                "status": "Submitted",
                "year": 2025,
                "authorship": "First",
                "title": "Steering Language Models for Theorem Proving",
                "url": "https://arxiv.org/abs/2502.15507v5",
                "also": [
                  {
                    "venue": "Foundation Models in the Wild at ICLR 2025",
                    "status": "Accepted",
                    "url": "https://openreview.net/pdf?id=0XiIEbwkQf"
                  }
                ]
              },
              {
                "venue": "ACL 2024 Natural Language Reasoning Workshop",
                "status": "Accepted",
                "authorship": "First",
                "title": "LOGIC-LM++: Multi-Step Refinement for Symbolic Formulations",
                "url": "https://aclanthology.org/2024.nlrse-1.6/"
              }
            ]
          },
          {
            "place": "Microsoft Research",
            "role": "Research fellow, repository-level code repair",
            "period": "From November 2024",
            "mentors": "Yufan Huang · Gustavo Soares",
            "source": "https://github.com/5hv5hvnk/5hv5hvnk.github.io/blob/247e9aadc7d38fed21a38808e4edcd614fd22b93/assets/cv/cv_web.pdf",
            "papers": []
          },
          {
            "place": "Microsoft Research",
            "role": "Research fellow, code migration",
            "period": "September 2023–May 2024",
            "mentors": "Gustavo Soares · Sumit Gulwani",
            "source": "https://github.com/5hv5hvnk/5hv5hvnk.github.io/blob/08b1e6e54d51486b0035c649328a267723c45d36/assets/cv/cv_web.pdf",
            "papers": []
          },
          {
            "place": "Rutgers University",
            "role": "Research collaboration, theorem proving",
            "period": "2025",
            "mentors": "Emily First",
            "mentorLabel": "Collaborator",
            "source": "https://drive.google.com/file/d/1TjT-KWV4plokLs5oQc6DMdC3A3KgGaMN/view",
            "papers": []
          },
          {
            "place": "IIIT Allahabad",
            "role": "Research internship, compressed image understanding",
            "period": "June 2021–May 2022",
            "mentors": "Mohammad Javed",
            "source": "https://github.com/5hv5hvnk/5hv5hvnk.github.io/blob/247e9aadc7d38fed21a38808e4edcd614fd22b93/assets/cv/cv_web.pdf",
            "papers": [
              {
                "venue": "Pattern Analysis and Applications 2023",
                "status": "Accepted",
                "authorship": "Third",
                "title": "DWT-CompCNN: Deep Image Classification Network for High Throughput JPEG 2000 Compressed Documents",
                "url": "https://doi.org/10.1007/s10044-023-01190-8"
              }
            ]
          },
          {
            "place": "IIT Delhi",
            "role": "Research experience",
            "source": "https://forum.dbpedia.org/t/a-multilingual-neural-data-to-text-generation-gsoc-2023/2098",
            "papers": []
          },
          {
            "place": "Thapar Institute of Engineering and Technology",
            "role": "Undergraduate capstone, contactless biometric verification",
            "period": "January–December 2022",
            "mentors": "Shalini Batra · Prashant Rana",
            "source": "https://github.com/5hv5hvnk/5hv5hvnk.github.io/blob/247e9aadc7d38fed21a38808e4edcd614fd22b93/assets/cv/cv_web.pdf",
            "papers": []
          },
          {
            "place": "Thapar Institute of Engineering and Technology",
            "role": "Research project, example-based program synthesis for data manipulation",
            "period": "August 2023",
            "mentors": "Shalini Batra",
            "source": "https://docs.google.com/gview?embedded=true&url=https%3A%2F%2Fraw.githubusercontent.com%2F5hv5hvnk%2F5hv5hvnk.github.io%2F08b1e6e54d51486b0035c649328a267723c45d36%2Fassets%2Fcv%2Fcv_web.pdf",
            "papers": []
          },
          {
            "place": "Wadhwani AI",
            "role": "Machine learning research internship, reading fluency and phonetic word recommendation",
            "period": "January–July 2023",
            "mentors": "Soma Dhavala",
            "source": "https://github.com/5hv5hvnk/5hv5hvnk.github.io/blob/247e9aadc7d38fed21a38808e4edcd614fd22b93/assets/cv/cv_web.pdf",
            "papers": []
          },
          {
            "place": "Google Summer of Code",
            "role": "Contributor, PyMC APIs for probabilistic models",
            "period": "May–September 2022",
            "mentors": "Thomas Wiecki",
            "mentorLabel": "Mentor",
            "source": "https://www.pymc.io/blog/blog_gsoc_2022.html",
            "papers": []
          }
        ]
      },
      {
        "id": "riley-paddock",
        "name": "Riley Paddock",
        "school": "UC Santa Barbara",
        "year": 2025,
        "major": "Mathematics and Computer Science",
        "graduationYear": 2026,
        "educationSource": "https://ccs.ucsb.edu/news/2024/ccs-hosts-record-breaking-raca-con-2024?page=1",
        "source": "https://drive.google.com/file/d/1CSuG9tG1S4is9oVDmL-aAGdJ3bbPP7qf/view",
        "research": [
          {
            "place": "UC Santa Barbara",
            "role": "SURF research fellowship, Quantum Co-Design Lab · space curve quantum control",
            "period": "2025",
            "mentors": "Murphy Niu · Edwin Barnes",
            "mentorLabel": "Advisor & collaborator",
            "source": "https://drive.google.com/file/d/1CSuG9tG1S4is9oVDmL-aAGdJ3bbPP7qf/view",
            "papers": []
          },
          {
            "place": "UC Santa Barbara",
            "role": "Research, reinforcement learning for quantum control · IEEE Quantum Week 2025 presentation (full paper unverified)",
            "period": "From January 2025",
            "mentors": "Murphy Niu",
            "source": "https://www.rileypaddock.com/cv",
            "papers": []
          },
          {
            "place": "UC Santa Barbara",
            "role": "Course project, quantum verification",
            "mentors": "Prabhanjan Ananth",
            "source": "https://www.rileypaddock.com/research-summaries",
            "papers": []
          },
          {
            "place": "UC Santa Barbara",
            "role": "Directed reading and poster, cryptography",
            "period": "2024",
            "mentors": "Mitchell Jubeir",
            "mentorLabel": "Mentor",
            "source": "https://www.ucsbdrp.org/assets/files/2024_Poster_Session/2024_All_Posters.pdf",
            "papers": []
          },
          {
            "place": "UC Santa Barbara",
            "role": "Teaching assistant, algorithms and cryptography",
            "period": "2024–2025",
            "source": "https://www.rileypaddock.com/",
            "papers": []
          },
          {
            "place": "Institute for Pure and Applied Mathematics",
            "role": "RIPS research internship with Aerospace Corporation, lunar timing · JMM 2025 poster",
            "period": "2024",
            "mentors": "Theodore Faust · Ashley Carpenter · Josselyn Romero · Sharad Shankar · Ryan Wilkinson",
            "mentorLabel": "Mentors",
            "source": "https://www.rileypaddock.com/",
            "papers": []
          },
          {
            "place": "Stanford University",
            "role": "Residential tutor, Mathematics Camp",
            "period": "2023",
            "source": "https://www.rileypaddock.com/",
            "papers": []
          }
        ],
        "paperReview": {
          "checked": "2026-11-03",
          "count": null,
          "status": "unresolved",
          "source": "https://www.rileypaddock.com/cv",
          "note": "Read the embedded two-page CV, updated September 3, 2026. It lists IEEE Quantum Week 2025 work accepted for presentation, plus talks and posters, but no corresponding full proceedings paper or acceptance date. No matching public Scholar profile found. Full-paper count remains unverified."
        }
      },
      {
        "id": "ishika-joshi",
        "name": "Ishika Joshi",
        "school": "IIIT Delhi",
        "year": 2024,
        "major": "Computer Science and Design",
        "graduationYear": 2023,
        "educationSource": "https://ishikajoshi.github.io/website/",
        "source": "https://drive.google.com/file/d/1EMgZzkVrcbZS_fS7YF2OKdKF6TkvE2lm/view",
        "research": [
          {
            "place": "Adobe",
            "role": "HCI research associate, Media and Data Science Research",
            "period": "2024",
            "mentors": "Simra Shahid",
            "mentorLabel": "Collaborator",
            "source": "https://arxiv.org/html/2411.06099v1",
            "papers": [
              {
                "venue": "Preprint",
                "status": "Preprint",
                "year": 2024,
                "authorship": "Equal first",
                "title": "CoPrompter: User-Centric Evaluation of LLM Instruction Alignment for Improved Prompt Engineering",
                "url": "https://arxiv.org/html/2411.06099v1"
              }
            ]
          },
          {
            "place": "IIIT Delhi",
            "role": "Research, Melange Lab",
            "mentors": "Pushpendra Singh · Asra Wani",
            "mentorLabel": "Advisor & collaborator",
            "source": "https://drive.google.com/file/d/1EMgZzkVrcbZS_fS7YF2OKdKF6TkvE2lm/view",
            "papers": [
              {
                "venue": "CHI 2024",
                "status": "Accepted",
                "authorship": "Second",
                "title": "Unrest and Trauma Stays with You!: Navigating Mental Health and Professional Service-Seeking in Kashmir",
                "url": "https://doi.org/10.1145/3613904.3642507"
              },
              {
                "venue": "CSCW 2024",
                "status": "Accepted",
                "authorship": "Second",
                "title": "Navigating the Job-Seeking Journey: Challenges and Opportunities for Digital Employment Support in Kashmir",
                "url": "https://doi.org/10.1145/3637375"
              }
            ]
          },
          {
            "place": "IIIT Delhi",
            "role": "SURF research fellowship",
            "period": "2023",
            "mentors": "Dhruv Kumar",
            "source": "https://ishikajoshi.github.io/website/",
            "papers": [
              {
                "venue": "SIGCSE 2024",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "ChatGPT in the Classroom: An Analysis of Its Strengths and Weaknesses for Solving Undergraduate Computer Science Questions",
                "url": "https://doi.org/10.1145/3626252.3630803"
              },
              {
                "venue": "ACE 2024",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "It's Not Like Jarvis, but It's Pretty Close!: Examining ChatGPT's Usage among Undergraduate Students in Computer Science",
                "url": "https://doi.org/10.1145/3636243.3636257"
              }
            ]
          },
          {
            "place": "IIIT Delhi",
            "role": "Undergraduate project, Weave Lab · mirror play",
            "period": "2022",
            "mentors": "Aman Parnami",
            "source": "https://dl.digra.org/index.php/dl/article/view/1322",
            "papers": [
              {
                "venue": "DiGRA 2022",
                "status": "Accepted",
                "authorship": "First",
                "title": "Magical Mirrors and I: Interweaving Learning with Mirror Play",
                "url": "https://dl.digra.org/index.php/dl/article/view/1322",
                "also": [
                  {
                    "venue": "IndiaHCI 2022 Poster",
                    "status": "Accepted",
                    "url": "https://www.indiahci.org/2022/conference-schedule/"
                  }
                ]
              }
            ]
          },
          {
            "place": "Cornell Tech",
            "role": "Represent mentorship, language model bias",
            "mentors": "Tapan Parikh",
            "source": "https://ishikajoshi.github.io/website/",
            "papers": [
              {
                "venue": "Preprint",
                "status": "Preprint",
                "year": 2024,
                "authorship": "First",
                "title": "Since Lawyers Are Males: Examining Implicit Gender Bias in Hindi Language Generation by LLMs",
                "url": "https://arxiv.org/abs/2409.13484v1"
              }
            ]
          }
        ]
      },
      {
        "id": "ellie-seehorn",
        "name": "Ellie Seehorn",
        "school": "Grinnell College",
        "year": 2024,
        "major": "Computer Science and Sociology; Statistics concentration",
        "graduationYear": 2025,
        "educationSource": "https://seehorne.github.io/assets/Aug2825CVAccessible.pdf",
        "source": "https://docs.google.com/document/d/1DFhUAoVDW5WXIADSfrP35LXqEECndoyVv5EDrxdlaVc/edit",
        "research": [
          {
            "place": "University of Michigan",
            "role": "DREU research internship, Human-AI Lab · AI-based mobile accessibility for blind users",
            "period": "June–August 2024",
            "mentors": "Anhong Guo · Jaylin Herskovitz",
            "mentorLabel": "Supervisors",
            "source": "https://seehorne.github.io/assets/Aug2825CVAccessible.pdf",
            "papers": [
              {
                "venue": "ACM XRDS 2024",
                "status": "Accepted",
                "authorship": "First",
                "title": "VISIONS of Accessibility: Michigan’s Human-AI Lab Fosters Community Engagement and Real-World Technical Solutions",
                "url": "https://doi.org/10.1145/3688091"
              }
            ]
          },
          {
            "place": "Carnegie Mellon University",
            "role": "Research internship, Social AI Group and CATS Lab · accessible adaptive learning",
            "period": "June–August 2023",
            "mentors": "Vincent Aleven · Haiyi Zhu · C. Naomie Williams",
            "mentorLabel": "Supervisors",
            "source": "https://seehorne.github.io/assets/Aug2825CVAccessible.pdf",
            "papers": []
          },
          {
            "place": "Carnegie Mellon University",
            "role": "ISLS 2024 workshop organizer, accessible education",
            "source": "https://2024.isls.org/community-day/",
            "papers": []
          },
          {
            "place": "University of Washington",
            "role": "Research internship, Make4All Lab · embroidered tactile graphics and optimization",
            "period": "June–August 2022",
            "mentors": "Jennifer Mankoff",
            "source": "https://seehorne.github.io/assets/Aug2825CVAccessible.pdf",
            "papers": [
              {
                "venue": "CHI 2023",
                "status": "Accepted",
                "authorship": "Eleventh",
                "title": "OPTIMISM: Enabling Collaborative Implementation of Domain-Specific Metaheuristic Optimization",
                "url": "https://doi.org/10.1145/3544548.3580904"
              },
              {
                "venue": "SCF 2022",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Enhancing Access to High Quality Tangible Information through Machine Embroidered Tactile Graphics",
                "url": "https://doi.org/10.1145/3559400.3565586"
              }
            ]
          },
          {
            "place": "Grinnell College",
            "role": "Computer science course mentor",
            "period": "From January 2023",
            "source": "https://seehorne.github.io/assets/Aug2825CVAccessible.pdf",
            "papers": []
          },
          {
            "place": "Grinnell College",
            "role": "Girls Who Code chapter founding member",
            "period": "From January 2023",
            "source": "https://seehorne.github.io/assets/Aug2825CVAccessible.pdf",
            "papers": []
          }
        ]
      },
      {
        "id": "ruijie-gao",
        "name": "Ruijie Gao",
        "school": "University of Glasgow & University of Electronic Science and Technology of China",
        "year": 2024,
        "major": "Electrical and Electronics Engineering",
        "graduationYear": 2025,
        "educationSource": "https://jerrygao.me/cv/",
        "source": "https://drive.google.com/file/d/1v3oSPQu5Cvqyh2K78Grmnag0JZjlVoyo/view",
        "research": [
          {
            "place": "King Abdullah University of Science and Technology",
            "role": "Research internship, SyntheSys Lab",
            "period": "May–September 2024",
            "mentors": "Jian Weng",
            "source": "https://jerrygao.me/cv/",
            "papers": [
              {
                "venue": "ISCA 2025",
                "status": "Submitted",
                "year": 2024,
                "authorship": "Fourth",
                "title": "Assassyn: A Unified Abstraction for Architectural Simulation and Implementation",
                "url": "https://sands.kaust.edu.sa/publication/assassyn-isca25/"
              }
            ]
          },
          {
            "place": "Georgia Tech",
            "role": "Remote research internship, EIC Lab",
            "period": "August–November 2023",
            "mentors": "Yang (Katie) Zhao",
            "source": "https://doi.org/10.1145/3649329.3658473",
            "papers": [
              {
                "venue": "DAC 2024",
                "status": "Accepted",
                "authorship": "Fourth",
                "title": "EDGE-LLM: Enabling Efficient Large Language Model Adaptation on Edge Devices via Unified Compression and Adaptive Layer Voting",
                "url": "https://doi.org/10.1145/3649329.3658473"
              }
            ]
          },
          {
            "place": "Princeton University",
            "role": "Remote research internship, FlashAttention GPU memory optimization",
            "period": "February–June 2023",
            "mentors": "Yu Zeng",
            "mentorLabel": "With",
            "source": "https://jerrygao.me/assets/files/curriculum_vitae.pdf",
            "papers": []
          },
          {
            "place": "Princeton University",
            "role": "Remote research internship, hardware simulation optimization",
            "period": "October 2022–January 2023",
            "mentors": "Yu Zeng",
            "mentorLabel": "With",
            "source": "https://drive.google.com/file/d/1v3oSPQu5Cvqyh2K78Grmnag0JZjlVoyo/view",
            "papers": []
          },
          {
            "place": "Chinese Academy of Sciences",
            "role": "Hardware engineer, One Core for Life · RISC-V processor and simulation",
            "period": "August–October 2022",
            "source": "https://github.com/wuliJerry/old_page/blob/7868a894b426ad99eb15ada6c69f4d086aacfadf/src-file/CV.pdf",
            "papers": []
          },
          {
            "place": "University of Electronic Science and Technology of China",
            "role": "Research internship, Institute of Fundamental and Frontier Sciences · 2D-material transistor",
            "period": "March–July 2022",
            "source": "https://github.com/wuliJerry/old_page/blob/7868a894b426ad99eb15ada6c69f4d086aacfadf/src-file/CV.pdf",
            "papers": []
          },
          {
            "place": "University of Electronic Science and Technology of China",
            "role": "Teaching assistant, programming, microelectronics and embedded processors",
            "period": "2022–2024",
            "source": "https://jerrygao.me/cv/",
            "papers": []
          }
        ]
      },
      {
        "id": "mushtari-sadia",
        "name": "Mushtari Sadia",
        "school": "Bangladesh University of Engineering and Technology",
        "major": "Computer Science and Engineering",
        "educationSource": "https://mushtari-sadia.github.io/",
        "source": "https://mushtari-sadia.github.io/phdapp.html",
        "sourceLabel": "Application blog",
        "research": [
          {
            "place": "Bangladesh University of Engineering and Technology",
            "role": "Undergraduate thesis, advanced persistent threat detection",
            "papers": [
              {
                "title": "LogShield: A Transformer-based Advanced Persistent Threat Detection System Leveraging Self-Attention",
                "venue": "Preprint",
                "authorship": "Equal first",
                "status": "Preprint",
                "year": 2022,
                "url": "https://mushtari-sadia.github.io/phdapp.html"
              }
            ],
            "mentors": "Anindya Iqbal · Shahrear Iqbal",
            "source": "https://mushtari-sadia.github.io/phdapp.html"
          },
          {
            "place": "MIT",
            "role": "Research internship, Camera Culture Group",
            "papers": [],
            "mentors": "Praneeth Vepakomma",
            "source": "https://mushtari-sadia.github.io/phdapp.html"
          },
          {
            "place": "BRAC University",
            "role": "Lecturer, computer science and engineering",
            "papers": [],
            "source": "https://mushtari-sadia.github.io/phdapp.html"
          },
          {
            "place": "Bangladesh University of Engineering and Technology",
            "role": "Adjunct lecturer, computer science and engineering",
            "papers": [],
            "source": "https://mushtari-sadia.github.io/phdapp.html"
          }
        ],
        "graduationYear": 2023,
        "year": 2023,
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "confirmed",
          "source": "https://mushtari-sadia.github.io/phdapp.html",
          "note": "Application blog explicitly states no publications during application and neither security project was published then."
        }
      },
      {
        "id": "yuxuan-jiang",
        "name": "Yuxuan Jiang",
        "school": "Zhejiang University–University of Illinois Urbana-Champaign Institute",
        "year": 2022,
        "major": "Computer Engineering",
        "graduationYear": 2023,
        "educationSource": "https://siebelschool.illinois.edu/research/undergraduate-research/summer-research-experience-undergraduates/participants/yuxuan-jiang",
        "source": "https://drive.google.com/file/d/1HXdU7Mm3uNN9ZZP1sUODu3x-L-Ctz1OY/view",
        "research": [
          {
            "place": "University of Illinois Urbana-Champaign",
            "role": "Remote research, SysNet · fail-slow fault testing (Slooo)",
            "period": "From 2021",
            "mentors": "Tianyin Xu · Shuai Mu",
            "source": "https://drive.google.com/file/d/1HXdU7Mm3uNN9ZZP1sUODu3x-L-Ctz1OY/view",
            "papers": [
              {
                "venue": "ICSE 2023 Demonstrations",
                "status": "Submitted",
                "year": 2022,
                "authorship": "Third",
                "title": "Slooo: A Fault-Injection Library for Testing Distributed Systems",
                "url": "https://www.youtube.com/watch?v=xyp_NuzQmd8"
              }
            ]
          },
          {
            "place": "University of Illinois Urbana-Champaign",
            "role": "REU research internship, SysNet · Kubernetes testing (Acto)",
            "period": "Summer 2022",
            "mentors": "Tianyin Xu · Owolabi Legunsen",
            "source": "https://siebelschool.illinois.edu/research/undergraduate-research/summer-research-experience-undergraduates/participants/yuxuan-jiang",
            "papers": []
          },
          {
            "place": "University of Illinois Urbana-Champaign",
            "role": "Software engineering REU, quorum systems",
            "period": "Summer 2021",
            "mentors": "Tianyin Xu",
            "source": "https://siebelschool.illinois.edu/research/undergraduate-research/summer-research-experience-undergraduates/participants/yuxuan-jiang",
            "papers": []
          },
          {
            "place": "Microsoft Research Asia",
            "role": "Research internship, configuration reliability in Azure cloud workloads",
            "period": "2022",
            "mentors": "Shilin He",
            "source": "https://drive.google.com/file/d/1HXdU7Mm3uNN9ZZP1sUODu3x-L-Ctz1OY/view",
            "papers": []
          },
          {
            "place": "Research projects",
            "role": "City Brain HPC container proposal · top 3 in student business contest",
            "source": "https://drive.google.com/file/d/1HXdU7Mm3uNN9ZZP1sUODu3x-L-Ctz1OY/view",
            "papers": []
          }
        ],
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "reviewed",
          "source": "https://essoz.github.io/publications/",
          "note": "Matched the systems researcher, not the namesake NLP researcher. Main-conference list starts SOSP 2023; Slooo was a submitted demo in the 2022 SOP."
        }
      },
      {
        "id": "inderjeet-nair",
        "name": "Inderjeet Nair",
        "school": "IIT Bombay",
        "year": 2022,
        "major": "Electrical Engineering; minor in Computer Science and Engineering",
        "educationSource": "https://inderjeetnair.github.io/Inderjeet_Nair_University_Resume.pdf",
        "source": "https://drive.google.com/file/d/1pF3fOoSpxaomfDMGrYKKnAeAmifSqn4L/view?usp=sharing",
        "research": [
          {
            "place": "Adobe Research",
            "role": "Research associate, legal language models and hierarchical document segmentation",
            "papers": [
              {
                "title": "Exploiting Language Characteristics for Legal Domain-Specific Language Model Pretraining",
                "venue": "EACL 2023",
                "status": "Submitted",
                "year": 2022,
                "authorship": "First",
                "url": "https://drive.google.com/file/d/1pF3fOoSpxaomfDMGrYKKnAeAmifSqn4L/view?usp=sharing"
              },
              {
                "title": "A Neural CRF-based Hierarchical Approach for Linear Text Segmentation",
                "venue": "EACL 2023",
                "status": "Submitted",
                "year": 2022,
                "authorship": "First",
                "url": "https://drive.google.com/file/d/1pF3fOoSpxaomfDMGrYKKnAeAmifSqn4L/view?usp=sharing"
              }
            ],
            "mentors": "Natwar Modani",
            "period": "From July 2021",
            "source": "https://drive.google.com/file/d/1pF3fOoSpxaomfDMGrYKKnAeAmifSqn4L/view?usp=sharing"
          },
          {
            "place": "Adobe Research",
            "role": "Research internship, document versioning and prerequisite relations",
            "papers": [
              {
                "title": "Detecting Document Versions and Their Ordering in a Collection",
                "venue": "WISE 2021",
                "status": "Accepted",
                "year": 2021,
                "authorship": "Fourth",
                "url": "https://drive.google.com/file/d/1pF3fOoSpxaomfDMGrYKKnAeAmifSqn4L/view?usp=sharing"
              }
            ],
            "mentors": "Natwar Modani · Gaurav Verma",
            "period": "April–July 2020",
            "source": "https://inderjeetnair.github.io/Inderjeet_Nair_University_Resume.pdf"
          },
          {
            "place": "IIT Bombay",
            "role": "Undergraduate research, sequential statistical mode estimation",
            "papers": [
              {
                "title": "PAC Mode Estimation using PPR Martingale Confidence Sequences",
                "venue": "AISTATS 2022",
                "status": "Accepted",
                "year": 2022,
                "authorship": "Fifth",
                "url": "https://proceedings.mlr.press/v151/anand-jain22a.html"
              }
            ],
            "mentors": "Vinay J. Ribeiro · Shivaram Kalyanakrishnan",
            "source": "https://inderjeetnair.github.io/Inderjeet_Nair_University_Resume.pdf"
          }
        ],
        "graduationYear": 2021
      }
    ]
  },
  {
    "id": "purdue",
    "name": "Purdue University",
    "program": "Computer Science PhD",
    "applicants": [
      {
        "id": "ankush-gupta",
        "name": "Ankush Gupta",
        "school": "IIIT Delhi",
        "year": 2025,
        "major": "Computer Science",
        "graduationYear": 2025,
        "educationSource": "https://ankush-gupta04.github.io/Ankush/",
        "source": "https://drive.google.com/file/d/1CGNEP45XKutN30KQggZfBjbAVuYnwo82/view",
        "research": [
          {
            "place": "IIIT Delhi",
            "role": "Research assistant, Melange Lab",
            "period": "From February 2024",
            "mentors": "Pushpendra Singh · Mohan Kumar",
            "source": "https://sites.google.com/view/ankush-gupta/research",
            "papers": [
              {
                "venue": "NeurIPS 2025",
                "status": "Accepted",
                "authorship": "Second",
                "title": "FEEL: Quantifying Heterogeneity in Physiological Signals for Generalizable Emotion Recognition",
                "url": "https://proceedings.neurips.cc/paper_files/paper/2025/hash/e560a0b22e4432003d0dba63ff8dc457-Abstract-Datasets_and_Benchmarks_Track.html"
              },
              {
                "venue": "ACM IMWUT 2025",
                "status": "Accepted",
                "authorship": "Second",
                "title": "AnnoSense: A Framework for Physiological Emotion Data Collection in Everyday Settings for AI",
                "url": "https://doi.org/10.1145/3749519"
              },
              {
                "venue": "NeurIPS 2024",
                "status": "Accepted",
                "authorship": "Third",
                "title": "EEVR: A Dataset of Paired Physiological Signals and Textual Descriptions for Joint Emotion Representation Learning",
                "url": "https://proceedings.neurips.cc/paper_files/paper/2024/hash/1cba8502063fab9df252a63968691768-Abstract-Datasets_and_Benchmarks_Track.html"
              }
            ]
          },
          {
            "place": "IIIT Delhi",
            "role": "Research, Creative Interfaces Lab · interactive cultural learning",
            "period": "September 2023–May 2024",
            "mentors": "Anmol Srivastava",
            "source": "https://sites.google.com/view/ankush-gupta/research",
            "papers": [
              {
                "venue": "IndiaHCI 2023",
                "status": "Accepted",
                "authorship": "Third",
                "title": "Jail Diaries: An Interactive Pop-Up Book Art Installation",
                "url": "https://link.springer.com/chapter/10.1007/978-981-97-4335-3_12"
              }
            ]
          },
          {
            "place": "IIIT Delhi",
            "role": "Undergraduate project, museum exhibits for children's cultural learning",
            "period": "2023",
            "mentors": "Anmol Srivastava",
            "source": "https://repository.iiitd.edu.in/jspui/handle/123456789/1569",
            "papers": []
          },
          {
            "place": "IIIT Delhi",
            "role": "Research, gesture-based language learning for children",
            "period": "2023–2024",
            "mentors": "Anmol Srivastava",
            "source": "https://ankush-gupta04.github.io/Ankush/",
            "papers": []
          },
          {
            "place": "IIIT Delhi",
            "role": "Undergraduate research, Data Science Lab · citation recommendations",
            "period": "From August 2024",
            "mentors": "Mukesh Mohania",
            "source": "https://sites.google.com/view/ankush-gupta/research",
            "papers": []
          },
          {
            "place": "Research collaboration",
            "role": "LGBTQ+ representation in language technologies · Carnegie Mellon and University of Edinburgh",
            "source": "https://drive.google.com/file/d/1CGNEP45XKutN30KQggZfBjbAVuYnwo82/view",
            "papers": []
          },
          {
            "place": "PayGlocal",
            "role": "Machine learning engineer, payment risk models",
            "period": "From July 2025",
            "source": "https://sites.google.com/view/ankush-gupta/research",
            "papers": []
          },
          {
            "place": "E.ON",
            "role": "Machine learning internship, Digital Technology · workflow chatbot",
            "period": "June–August 2024",
            "source": "https://sites.google.com/view/ankush-gupta/research",
            "papers": []
          },
          {
            "place": "E.ON",
            "role": "Summer internship, E.ON SE · image classification",
            "period": "June–August 2023",
            "source": "https://sites.google.com/view/ankush-gupta/research",
            "papers": []
          }
        ]
      },
      {
        "id": "alan-chung-ma",
        "name": "Alan Chung Ma",
        "school": "Purdue University",
        "major": "Computer Engineering",
        "educationSource": "https://alan.chung-ma.com/blog/2025-phd-application-experience/",
        "source": "https://alan.chung-ma.com/blog/2025-phd-application-experience/",
        "sourceLabel": "Application blog",
        "research": [
          {
            "place": "Purdue University",
            "role": "Undergraduate research, software supply-chain security",
            "papers": [],
            "mentors": "Santiago Torres-Arias",
            "source": "https://alan.chung-ma.com/blog/2025-phd-application-experience/"
          },
          {
            "place": "Google",
            "role": "Software engineering internships",
            "papers": [],
            "source": "https://alan.chung-ma.com/blog/2025-phd-application-experience/"
          },
          {
            "place": "Keytos",
            "role": "Software engineering, PKI services",
            "papers": [],
            "source": "https://alan.chung-ma.com/blog/2025-phd-application-experience/"
          }
        ],
        "graduationYear": 2023,
        "year": 2024,
        "paperReview": {
          "checked": "2026-11-03",
          "count": null,
          "status": "unresolved",
          "source": "https://alan.chung-ma.com/blog/2025-phd-application-experience/",
          "note": "Rechecked the full application blog, personal site and talks list. Verified KubeCon 2024 and 2025 talks and software-supply-chain contributions, but found no full-paper publication inventory or matching public Scholar profile. A talk is insufficient evidence of an accepted proceedings paper; count remains unknown."
        }
      },
      {
        "id": "mushtari-sadia",
        "name": "Mushtari Sadia",
        "school": "Bangladesh University of Engineering and Technology",
        "major": "Computer Science and Engineering",
        "educationSource": "https://mushtari-sadia.github.io/",
        "source": "https://mushtari-sadia.github.io/phdapp.html",
        "sourceLabel": "Application blog",
        "research": [
          {
            "place": "Bangladesh University of Engineering and Technology",
            "role": "Undergraduate thesis, advanced persistent threat detection",
            "papers": [
              {
                "title": "LogShield: A Transformer-based Advanced Persistent Threat Detection System Leveraging Self-Attention",
                "venue": "Preprint",
                "authorship": "Equal first",
                "status": "Preprint",
                "year": 2022,
                "url": "https://mushtari-sadia.github.io/phdapp.html"
              }
            ],
            "mentors": "Anindya Iqbal · Shahrear Iqbal",
            "source": "https://mushtari-sadia.github.io/phdapp.html"
          },
          {
            "place": "MIT",
            "role": "Research internship, Camera Culture Group",
            "papers": [],
            "mentors": "Praneeth Vepakomma",
            "source": "https://mushtari-sadia.github.io/phdapp.html"
          },
          {
            "place": "BRAC University",
            "role": "Lecturer, computer science and engineering",
            "papers": [],
            "source": "https://mushtari-sadia.github.io/phdapp.html"
          },
          {
            "place": "Bangladesh University of Engineering and Technology",
            "role": "Adjunct lecturer, computer science and engineering",
            "papers": [],
            "source": "https://mushtari-sadia.github.io/phdapp.html"
          }
        ],
        "graduationYear": 2023,
        "year": 2023,
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "confirmed",
          "source": "https://mushtari-sadia.github.io/phdapp.html",
          "note": "Application blog explicitly states no publications during application and neither security project was published then."
        }
      }
    ]
  },
  {
    "id": "hopkins",
    "name": "Johns Hopkins University",
    "program": "Computer Science PhD",
    "applicants": [
      {
        "id": "yash-mehta",
        "name": "Yash Mehta",
        "school": "BITS Pilani, Goa",
        "year": 2022,
        "major": "Computer Science",
        "graduationYear": 2018,
        "educationSource": "https://yashsmehta.com/assets/pdf/ym_resume.pdf",
        "source": "https://drive.google.com/file/d/1hq3C-8xM-plk6tFNSdF9d--YdOA_HFKM/view",
        "research": [
          {
            "place": "HHMI Janelia Research Campus",
            "role": "Research engineer, Computation and Theory Group · synaptic plasticity with Yoshi Aso and Glenn Turner",
            "period": "From January 2022",
            "mentors": "Jan Funke · James Fitzgerald",
            "source": "https://drive.google.com/file/d/1hq3C-8xM-plk6tFNSdF9d--YdOA_HFKM/view",
            "papers": [
              {
                "venue": "COSYNE 2023",
                "status": "Submitted",
                "year": 2022,
                "authorship": "First",
                "title": "Model Based Inference of Synaptic Plasticity Rules from Neural Activity",
                "url": "https://drive.google.com/file/d/1hq3C-8xM-plk6tFNSdF9d--YdOA_HFKM/view"
              }
            ]
          },
          {
            "place": "HHMI Janelia Research Campus",
            "role": "Managing guest editor, personality prediction",
            "period": "2022",
            "source": "https://portal.fis.tum.de/en/publications/future-generation-personality-prediction-from-digital-footprints/",
            "papers": [
              {
                "venue": "Future Generation Computer Systems 2022 · Editorial",
                "status": "Accepted",
                "authorship": "First",
                "title": "Future-generation Personality Prediction from Digital Footprints",
                "url": "https://doi.org/10.1016/j.future.2022.06.011"
              }
            ]
          },
          {
            "place": "University of Freiburg",
            "role": "Research engineer, AutoML Lab · neural architecture search",
            "period": "September 2020–December 2021",
            "mentors": "Frank Hutter",
            "source": "https://yashsmehta.com/assets/pdf/ym_resume.pdf",
            "papers": [
              {
                "venue": "ICLR 2022",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "NAS-Bench-Suite: NAS Evaluation is (Now) Surprisingly Easy",
                "url": "https://arxiv.org/abs/2201.13396"
              }
            ]
          },
          {
            "place": "University College London · Google DeepMind",
            "role": "Research internship, Gatsby Computational Neuroscience Unit",
            "period": "January 2019–July 2020",
            "mentors": "Peter Latham · Timothy Lillicrap",
            "source": "https://yashsmehta.com/assets/pdf/ym_resume.pdf",
            "papers": [
              {
                "venue": "NeurIPS 2022",
                "status": "Accepted",
                "authorship": "Second",
                "title": "On the Stability and Scalability of Node Perturbation Learning",
                "url": "https://proceedings.neurips.cc/paper_files/paper/2022/hash/cf38eb1549024cce4b3d2c1bb87a6c27-Abstract-Conference.html"
              },
              {
                "venue": "NeurIPS 2021",
                "status": "Accepted",
                "authorship": "Second",
                "title": "Towards Biologically Plausible Convolutional Networks",
                "url": "https://papers.neurips.cc/paper_files/paper/2021/hash/746b02b6680562f44ad7526675bac026-Abstract.html"
              }
            ]
          },
          {
            "place": "Nanyang Technological University",
            "role": "Undergraduate thesis and research, personality prediction",
            "period": "From 2018",
            "mentors": "Erik Cambria",
            "source": "https://drive.google.com/file/d/1hq3C-8xM-plk6tFNSdF9d--YdOA_HFKM/view",
            "papers": [
              {
                "venue": "Neurocomputing 2022",
                "status": "Accepted",
                "authorship": "Third",
                "title": "Multitask Learning for Emotion and Personality Traits Detection",
                "url": "https://sentic.net/emotion-and-personality-detection.pdf"
              },
              {
                "venue": "ICDM 2020",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Bottom-Up and Top-Down: Predicting Personality with Psycholinguistic and Language Model Features",
                "url": "https://sentic.net/predicting-personality-with-psycholinguistic-and-language-model-features.pdf"
              },
              {
                "venue": "WiNLP 2020 Workshop",
                "status": "Accepted",
                "authorship": "Third",
                "title": "Personality Trait Detection Using Bagged SVM over BERT Word Embedding Ensembles",
                "url": "https://arxiv.org/abs/2010.01309"
              },
              {
                "venue": "Artificial Intelligence Review 2020",
                "status": "Accepted",
                "authorship": "First",
                "title": "Recent Trends in Deep Learning Based Personality Detection",
                "url": "https://arxiv.org/abs/1908.03628"
              }
            ]
          },
          {
            "place": "Columbia University",
            "role": "Visiting researcher, Zuckerman Institute",
            "period": "October 2022",
            "mentors": "Larry Abbott",
            "source": "https://yashsmehta.com/",
            "papers": []
          },
          {
            "place": "University of Freiburg",
            "role": "Teaching assistant, deep learning and transformer course design",
            "period": "2021",
            "source": "https://drive.google.com/file/d/1hq3C-8xM-plk6tFNSdF9d--YdOA_HFKM/view",
            "papers": []
          },
          {
            "place": "BITS Pilani, Goa",
            "role": "Teaching assistant, algorithms and data structures",
            "period": "2017",
            "source": "https://yashsmehta.com/assets/pdf/ym_resume.pdf",
            "papers": []
          },
          {
            "place": "Amazon",
            "role": "Software development engineer, Prime Music",
            "period": "July–December 2018",
            "source": "https://yashsmehta.com/assets/pdf/ym_resume.pdf",
            "papers": []
          }
        ]
      },
      {
        "id": "krithika-ramesh",
        "name": "Krithika Ramesh",
        "school": "Manipal Institute of Technology",
        "year": 2022,
        "major": "Information Technology",
        "graduationYear": 2022,
        "educationSource": "https://sites.google.com/view/queer-in-ai/acl-2021",
        "source": "https://drive.google.com/file/d/13Yk2l-goeZIgDxjE7fX1pOB1aSWiG-wA/view",
        "research": [
          {
            "place": "Microsoft Research India",
            "role": "Research internship, multilingual language model fairness",
            "period": "2022",
            "mentors": "Sunayana Sitaram · Monojit Choudhury",
            "papers": [
              {
                "venue": "EACL 2023",
                "status": "Submitted",
                "year": 2022,
                "authorship": "First",
                "title": "Fairness in Language Models Beyond English: Gaps and Challenges",
                "url": "https://aclanthology.org/2023.findings-eacl.157/"
              }
            ]
          },
          {
            "place": "Microsoft Research India",
            "role": "Research internship, model compression and fairness",
            "period": "2022",
            "mentors": "Sunayana Sitaram",
            "papers": [
              {
                "venue": "EACL 2023",
                "status": "Submitted",
                "year": 2022,
                "authorship": "First",
                "title": "A Comparative Study on the Impact of Model Compression Techniques on Fairness in Language Models",
                "url": "https://aclanthology.org/2023.acl-long.878/"
              }
            ]
          },
          {
            "place": "Microsoft Research India",
            "role": "Research internship, privacy-preserving air pollution forecasting",
            "period": "2022",
            "mentors": "Rahul Sharma · Rijurekha Sen",
            "papers": [
              {
                "venue": "PoPETS 2023",
                "status": "Submitted",
                "year": 2022,
                "authorship": "Second",
                "title": "End-to-end Privacy Preserving Training and Inference for Air Pollution Forecasting with Data from Rival Fleets",
                "url": "https://petsymposium.org/popets/2023/popets-2023-0118.php"
              }
            ]
          },
          {
            "place": "Indian School of Business",
            "role": "Research internship",
            "period": "2021–2022",
            "mentors": "Sumeet Kumar · Ashiqur KhudaBukhsh",
            "source": "https://www.se.rit.edu/~axkvse/KhudaBukhsh-Resume-Nov-2023.pdf",
            "papers": [
              {
                "venue": "WOAH at NAACL 2022",
                "status": "Accepted",
                "authorship": "First",
                "title": "Revisiting Queer Minorities in Lexicons",
                "url": "https://aclanthology.org/2022.woah-1.23/"
              },
              {
                "venue": "AAAI 2022",
                "status": "Accepted",
                "authorship": "First",
                "title": "‘Beach’ to ‘Bitch’: Inadvertent Unsafe Transcription of Kids’ Content on YouTube",
                "url": "https://cdn.aaai.org/ojs/21470/21470-13-25483-1-2-20220628.pdf"
              }
            ]
          },
          {
            "place": "Indian School of Business",
            "role": "Research, speech transcription safety and multilingual abusive-language lexicons",
            "mentors": "Sumeet Kumar · Ashiqur KhudaBukhsh",
            "source": "https://drive.google.com/file/d/13Yk2l-goeZIgDxjE7fX1pOB1aSWiG-wA/view",
            "papers": []
          },
          {
            "place": "Manipal Institute of Technology",
            "role": "Independent research",
            "papers": [
              {
                "venue": "GeBNLP at ACL 2021",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Evaluating Gender Bias in Hindi-English Machine Translation",
                "url": "https://aclanthology.org/2021.gebnlp-1.3/"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "usc",
    "name": "University of Southern California",
    "program": "Computer Science PhD",
    "applicants": [
      {
        "id": "md-abrar-jahin",
        "name": "Md Abrar Jahin",
        "school": "Khulna University of Engineering & Technology",
        "year": 2024,
        "major": "Industrial & Production Engineering",
        "graduationYear": 2024,
        "educationSource": "https://abrar2652.github.io/assets/pdf/cv_abrar.pdf",
        "source": "https://github.com/Abrar2652/Abrar2652.github.io/blob/f82ce36f242462b3b7327c8ac82d678c47b4fe70/assets/pdf/blogs/MAJ_SOP_USC.pdf",
        "research": [
          {
            "place": "American International University-Bangladesh",
            "role": "Research assistant and lead, Advanced Machine Intelligence Research Lab",
            "period": "From March 2023",
            "mentors": "M. F. Mridha · Nilanjan Dey",
            "source": "https://abrar2652.github.io/assets/pdf/cv_abrar.pdf",
            "papers": [
              {
                "venue": "Information Fusion",
                "status": "Submitted",
                "year": 2024,
                "authorship": "Third",
                "title": "A Unified Framework for Evaluating the Effectiveness and Enhancing the Transparency of Explainable AI Methods in Real-World Applications",
                "url": "https://arxiv.org/abs/2412.03884v1"
              },
              {
                "venue": "Pattern Recognition",
                "status": "Submitted",
                "year": 2024,
                "authorship": "Equal first",
                "title": "DGNN-YOLO: Interpretable Dynamic Graph Neural Networks with YOLO11 for Small Object Detection and Tracking",
                "url": "https://arxiv.org/abs/2411.17251v1"
              },
              {
                "venue": "Scientific Reports 2024",
                "status": "Accepted",
                "authorship": "First",
                "title": "A Hybrid Transformer and Attention Based Recurrent Neural Network for Robust and Interpretable Sentiment Analysis of Tweets",
                "url": "https://doi.org/10.1038/s41598-024-76079-5"
              },
              {
                "venue": "Computers in Biology and Medicine",
                "status": "Submitted",
                "year": 2024,
                "authorship": "First",
                "title": "KACQ-DCNN: Uncertainty-Aware Interpretable Kolmogorov-Arnold Classical-Quantum Dual-Channel Neural Network for Heart Disease Detection",
                "url": "https://arxiv.org/abs/2410.07446v1"
              },
              {
                "venue": "npj Artificial Intelligence",
                "status": "Submitted",
                "year": 2024,
                "authorship": "First",
                "title": "TriQXNet: Forecasting Dst Index from Solar Wind Data Using an Interpretable Parallel Classical-Quantum Framework with Uncertainty Quantification",
                "url": "https://arxiv.org/abs/2407.06658v1"
              },
              {
                "venue": "Archives of Computational Methods in Engineering 2024",
                "status": "Accepted",
                "authorship": "First",
                "title": "Big Data–Supply Chain Management Framework for Forecasting: Data Preprocessing and Machine Learning Techniques",
                "url": "https://doi.org/10.1007/s11831-024-10092-9"
              },
              {
                "venue": "Supply Chain Analytics",
                "status": "Submitted",
                "year": 2024,
                "authorship": "First",
                "title": "AI in Supply Chain Risk Assessment: A Systematic Literature Review and Bibliometric Analysis",
                "url": "https://arxiv.org/abs/2401.10895v1"
              }
            ]
          },
          {
            "place": "Khulna University of Engineering & Technology",
            "role": "Undergraduate thesis, supply chain backorder prediction",
            "mentors": "Md. Saiful Islam",
            "source": "https://abrar2652.github.io/assets/pdf/cv_abrar.pdf",
            "papers": [
              {
                "venue": "Scientific Reports 2023",
                "status": "Accepted",
                "authorship": "First",
                "title": "QAmplifyNet: Pushing the Boundaries of Supply Chain Backorder Prediction Using Interpretable Hybrid Quantum-Classical Neural Network",
                "url": "https://doi.org/10.1038/s41598-023-45406-7"
              }
            ]
          },
          {
            "place": "Khulna University of Engineering & Technology",
            "role": "Research collaboration",
            "mentors": "Md. Kutub Uddin",
            "mentorLabel": "With",
            "papers": [
              {
                "venue": "OPSEARCH",
                "status": "Submitted",
                "year": 2024,
                "authorship": "Third",
                "title": "Designing Cellular Manufacturing System in Presence of Alternative Process Plans",
                "url": "https://arxiv.org/abs/2411.15361v1"
              },
              {
                "venue": "OPSEARCH",
                "status": "Submitted",
                "year": 2024,
                "authorship": "Third",
                "title": "Solving Generalized Grouping Problems in Cellular Manufacturing Systems Using a Network Flow Model",
                "url": "https://arxiv.org/abs/2411.04685v1"
              }
            ]
          },
          {
            "place": "Khulna University of Engineering & Technology",
            "role": "Research collaboration",
            "mentors": "Md. Saiful Islam",
            "mentorLabel": "With",
            "papers": [
              {
                "venue": "PLOS ONE 2024",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Exploring Internet of Things Adoption Challenges in Manufacturing Firms: A Delphi Fuzzy Analytical Hierarchy Process Approach",
                "url": "https://doi.org/10.1371/journal.pone.0311643"
              }
            ]
          },
          {
            "place": "Khulna University of Engineering & Technology",
            "role": "Research collaboration",
            "mentors": "Md. Saiful Islam · M. F. Mridha",
            "mentorLabel": "With",
            "papers": [
              {
                "venue": "PLOS ONE 2024",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Analysis of Internet of Things Implementation Barriers in the Cold Supply Chain: An Integrated ISM-MICMAC and DEMATEL Approach",
                "url": "https://doi.org/10.1371/journal.pone.0304118"
              }
            ]
          },
          {
            "place": "Khulna University of Engineering & Technology",
            "role": "Research collaboration",
            "mentors": "Md. Rafiquzzaman · M. F. Mridha",
            "mentorLabel": "With",
            "papers": [
              {
                "venue": "Heliyon 2024",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Ergonomic Design of Computer Laboratory Furniture: Mismatch Analysis Utilizing Anthropometric Data of University Students",
                "url": "https://doi.org/10.1016/j.heliyon.2024.e34063"
              }
            ]
          },
          {
            "place": "Khulna University of Engineering & Technology",
            "role": "Research collaboration",
            "mentors": "Md. Saiful Islam · M. F. Mridha",
            "papers": [
              {
                "venue": "European Journal of Operational Research",
                "status": "Submitted",
                "year": 2024,
                "authorship": "Equal first",
                "title": "Optimizing Container Loading and Unloading through Dual-Cycling and Dockyard Rehandle Reduction Using a Hybrid Genetic Algorithm",
                "url": "https://arxiv.org/html/2406.08534v1"
              }
            ]
          },
          {
            "place": "Research Camp, Scholarship School BD",
            "role": "Research lead",
            "period": "May 2022–March 2023",
            "mentors": "Mohammad Arafat Hussain",
            "source": "https://abrar2652.github.io/assets/pdf/cv_abrar.pdf",
            "papers": [
              {
                "venue": "Multimedia Tools and Applications",
                "status": "Submitted",
                "year": 2024,
                "authorship": "Equal first",
                "title": "Ultrasound-Based AI for COVID-19 Detection: A Comprehensive Review of Public and Private Lung Ultrasound Datasets and Studies",
                "url": "https://arxiv.org/abs/2411.05029v1"
              }
            ]
          },
          {
            "place": "Khulna University of Engineering & Technology",
            "role": "Research collaboration",
            "papers": [
              {
                "venue": "Evolutionary Intelligence",
                "status": "Submitted",
                "year": 2024,
                "authorship": "Equal first",
                "title": "MCDFN: Supply Chain Demand Forecasting via an Explainable Multi-Channel Data Fusion Network Model Integrating CNN, LSTM, and GRU",
                "url": "https://arxiv.org/html/2405.15598v1"
              }
            ]
          },
          {
            "place": "Khulna University of Engineering & Technology",
            "role": "Research collaboration",
            "mentors": "Subrata Talapatra",
            "mentorLabel": "With",
            "papers": [
              {
                "venue": "Decision Analytics Journal 2024",
                "status": "Accepted",
                "authorship": "First",
                "title": "A Natural Language Processing-Based Classification and Mode-Based Ranking of Musculoskeletal Disorder Risk Factors",
                "url": "https://doi.org/10.1016/j.dajour.2024.100464"
              }
            ]
          },
          {
            "place": "Khulna University of Engineering & Technology",
            "role": "Research collaboration",
            "papers": [
              {
                "venue": "Scientific Reports",
                "status": "Submitted",
                "year": 2024,
                "authorship": "First",
                "title": "Analyzing Male Domestic Violence through Exploratory Data Analysis and Explainable Machine Learning Insights",
                "url": "https://arxiv.org/abs/2403.15594v1"
              }
            ]
          },
          {
            "place": "Okinawa Institute of Science and Technology",
            "role": "Research collaboration with AIUB",
            "mentors": "M. F. Mridha · Nilanjan Dey",
            "mentorLabel": "Collaborators",
            "source": "https://arxiv.org/abs/2411.03740v1",
            "papers": [
              {
                "venue": "IEEE Transactions on Systems, Man, and Cybernetics",
                "status": "Submitted",
                "year": 2024,
                "authorship": "First",
                "title": "Human-in-the-Loop Feature Selection Using Interpretable Kolmogorov-Arnold Network-based Double Deep Q-Network",
                "url": "https://arxiv.org/abs/2411.03740v1"
              },
              {
                "venue": "IEEE Transactions on Neural Networks and Learning Systems",
                "status": "Submitted",
                "year": 2024,
                "authorship": "First",
                "title": "Quantum Rationale-Aware Graph Contrastive Learning for Jet Discrimination",
                "url": "https://arxiv.org/abs/2411.01642v1"
              },
              {
                "venue": "IEEE Transactions on Artificial Intelligence",
                "status": "Submitted",
                "year": 2024,
                "authorship": "First",
                "title": "Lorentz-Equivariant Quantum Graph Neural Network for High-Energy Physics",
                "url": "https://arxiv.org/abs/2411.01641v1"
              }
            ]
          },
          {
            "place": "Okinawa Institute of Science and Technology",
            "role": "Visiting researcher, evolution of conserved genetic sequences",
            "period": "From March 2024",
            "mentors": "Jonathan Miller",
            "source": "https://abrar2652.github.io/assets/pdf/cv_abrar.pdf",
            "papers": []
          },
          {
            "place": "Okinawa Institute of Science and Technology",
            "role": "Visiting research student, evolution of conserved genetic sequences",
            "period": "February 2023–February 2024",
            "mentors": "Jonathan Miller · Lucia Zifcakova",
            "mentorLabel": "Advisor & collaborator",
            "source": "https://abrar2652.github.io/assets/pdf/cv_abrar.pdf",
            "papers": []
          },
          {
            "place": "Okinawa Institute of Science and Technology",
            "role": "Research internship, conserved DNA sequence analysis",
            "period": "October 2021–March 2022",
            "mentors": "Jonathan Miller",
            "source": "https://abrar2652.github.io/assets/pdf/cv_abrar.pdf",
            "papers": []
          },
          {
            "place": "UiT The Arctic University of Norway",
            "role": "Research internship, machine learning for road conditions",
            "period": "May 2021",
            "mentors": "Aleksander Pedersen · Rune Dalmo · Ghada Bouzidi · Per Arne Sundsbø",
            "mentorLabel": "Advisors & mentor",
            "source": "https://abrar2652.github.io/assets/pdf/cv_abrar.pdf",
            "papers": [
              {
                "venue": "Preprint",
                "status": "Preprint",
                "year": 2021,
                "authorship": "First",
                "title": "DIT4BEARs Smart Roads Internship",
                "url": "https://arxiv.org/abs/2107.06755v1"
              }
            ]
          }
        ],
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "reviewed",
          "source": "https://abrar2652.github.io/publications/",
          "note": "Pre-application accepted entries are journals; current EMNLP 2026 main paper is later."
        }
      },
      {
        "id": "alireza-arbabi",
        "name": "Alireza Arbabi",
        "school": "University of Tehran",
        "year": 2023,
        "major": "Computer Engineering",
        "graduationYear": 2024,
        "educationSource": "https://alireza-zwolf.github.io/files/Arbabi-CV.pdf",
        "source": "https://drive.google.com/file/d/1u0UdvYabi5Z6aaT6PyrWEXR6WtDF6hc2/view",
        "research": [
          {
            "place": "University of Victoria",
            "role": "Research assistant, ACIS Lab · cryptocurrency privacy",
            "period": "From July 2023",
            "mentors": "Homayoun Najjaran",
            "source": "https://alireza-zwolf.github.io/files/Arbabi-CV.pdf",
            "papers": [
              {
                "venue": "Journal of Network and Computer Applications",
                "status": "Submitted",
                "year": 2023,
                "authorship": "Equal first",
                "title": "Mixing Solutions in Bitcoin and Ethereum Ecosystems: A Review and Tutorial",
                "url": "https://arxiv.org/abs/2310.04899v1"
              }
            ]
          },
          {
            "place": "University of Tehran",
            "role": "Research assistant, Data Analytics Lab · blockchain consensus and decentralized file sharing",
            "period": "July 2022–July 2023",
            "mentors": "Behnam Bahrak",
            "source": "https://alireza-zwolf.github.io/files/Arbabi-CV.pdf",
            "papers": [
              {
                "venue": "IET Blockchain",
                "status": "Submitted",
                "year": 2022,
                "authorship": "Fourth",
                "title": "RPoA: Redefined Proof of Activity",
                "url": "https://arxiv.org/abs/2210.08923v1"
              }
            ]
          },
          {
            "place": "University of Tehran",
            "role": "Research assistant, graph methods for cryptocurrency mixing privacy",
            "period": "From September 2023",
            "mentors": "Pooya Shariatpanahi",
            "source": "https://alireza-zwolf.github.io/files/Arbabi-CV.pdf",
            "papers": []
          },
          {
            "place": "University of Tehran",
            "role": "Blockchain and Web3 summer school instructor",
            "period": "July–September 2023",
            "source": "https://alireza-zwolf.github.io/files/Arbabi-CV.pdf",
            "papers": []
          },
          {
            "place": "University of Tehran",
            "role": "Teaching assistant, artificial intelligence",
            "period": "Spring 2023",
            "source": "https://alireza-zwolf.github.io/files/Arbabi-CV.pdf",
            "papers": []
          },
          {
            "place": "University of Tehran",
            "role": "Teaching assistant, probability and statistics, data structures, and introductory programming",
            "period": "Fall 2022",
            "source": "https://alireza-zwolf.github.io/files/Arbabi-CV.pdf",
            "papers": []
          }
        ],
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "reviewed",
          "source": "https://alireza-zwolf.github.io/publications/",
          "note": "Personal publication page lists the two application-era works as arXiv manuscripts; later journals do not qualify."
        }
      },
      {
        "id": "thu-00042",
        "name": "lihan",
        "school": "Tsinghua University",
        "year": 2023,
        "major": "Fundamental Sciences and Energy and Power Engineering",
        "educationSource": "https://database.feiyue.online/applicant/Applicant-00042/",
        "source": "https://database.feiyue.online/applicant/Applicant-00042/",
        "sourceLabel": "View application profile",
        "research": [
          {
            "place": "Tsinghua University",
            "role": "Institute for Interdisciplinary Information Sciences, robot learning",
            "papers": [
              {
                "venue": "",
                "status": "Preprint",
                "authorship": "Equal first",
                "title": "Robot learning paper — preprint"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00042/"
          },
          {
            "place": "Stanford University",
            "role": "Summer research, robot learning",
            "papers": [
              {
                "venue": "ICRA",
                "status": "Submitted",
                "authorship": "First",
                "title": "Robot learning paper — ICRA submission"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00042/"
          }
        ],
        "program": "Computer Science PhD — admitted",
        "paperReview": {
          "checked": "2026-11-03",
          "count": null,
          "status": "skipped",
          "source": "https://database.feiyue.online/applicant/Applicant-00042/",
          "note": "Alias; further author matching skipped at user request. Publication count remains unknown."
        }
      },
      {
        "id": "yutai-zhou",
        "name": "Yutai Zhou",
        "school": "University of Florida",
        "year": 2022,
        "major": "Computer Science",
        "graduationYear": 2019,
        "educationSource": "https://yutaizhou.github.io/files/CV.pdf",
        "source": "https://docs.google.com/document/d/1R5aB2w95CGDWarm4iVr6lagvnJLkYbXwCz3KeQXbokU/edit",
        "research": [
          {
            "place": "MIT Lincoln Laboratory",
            "role": "Research engineer, human-AI coordination and agent robustness under cognitive hierarchy",
            "period": "From January 2020",
            "source": "https://docs.google.com/document/d/1R5aB2w95CGDWarm4iVr6lagvnJLkYbXwCz3KeQXbokU/edit",
            "papers": [
              {
                "venue": "NeurIPS 2021",
                "status": "Accepted",
                "authorship": "Fourth",
                "title": "Evaluation of Human-AI Teams for Learned and Rule-Based Agents in Hanabi",
                "url": "https://proceedings.neurips.cc/paper_files/paper/2021/hash/86e8f7ab32cfd12577bc2619bc635690-Abstract.html"
              },
              {
                "venue": "HPEC 2020 · Outstanding Paper",
                "status": "Accepted",
                "authorship": "First",
                "title": "Towards a Distributed Framework for Multi-Agent Reinforcement Learning Research",
                "url": "https://www.ll.mit.edu/r-d/publications/towards-distributed-framework-multi-agent-reinforcement-learning-research"
              }
            ]
          },
          {
            "place": "MIT Lincoln Laboratory",
            "role": "Research engineer, multi-agent reinforcement learning",
            "period": "From January 2020",
            "mentors": "Mykel Kochenderfer",
            "mentorLabel": "Collaborator",
            "source": "https://yutaizhou.github.io/files/CV.pdf",
            "papers": [
              {
                "venue": "ICRA 2022",
                "status": "Accepted",
                "authorship": "Second",
                "title": "Learning Emergent Discrete Message Communication for Cooperative Reinforcement Learning",
                "url": "https://arxiv.org/abs/2102.12550"
              },
              {
                "venue": "Optimization and Learning in Multiagent Systems at AAMAS 2021",
                "status": "Accepted",
                "authorship": "Fourth",
                "title": "Health-Informed Policy Gradients for Multi-Agent Reinforcement Learning",
                "url": "https://arxiv.org/abs/1908.01022v4"
              }
            ]
          },
          {
            "place": "MIT Lincoln Laboratory",
            "role": "Research engineer, self-supervised classification of air traffic",
            "source": "https://docs.google.com/document/d/1R5aB2w95CGDWarm4iVr6lagvnJLkYbXwCz3KeQXbokU/edit",
            "papers": []
          },
          {
            "place": "MIT Lincoln Laboratory",
            "role": "Instructor, reinforcement learning and autonomy course",
            "period": "November 2020",
            "mentors": "Tate DeWeese",
            "mentorLabel": "With",
            "source": "https://llevents.ll.mit.edu/raains/node/246",
            "papers": []
          },
          {
            "place": "MIT Lincoln Laboratory",
            "role": "Undergraduate research internship, video object detection",
            "period": "May–August 2019",
            "source": "https://yutaizhou.github.io/files/CV.pdf",
            "papers": []
          },
          {
            "place": "Stanford University",
            "role": "Non-degree graduate coursework, decision-making and optimization",
            "period": "From August 2021",
            "source": "https://docs.google.com/document/d/1R5aB2w95CGDWarm4iVr6lagvnJLkYbXwCz3KeQXbokU/edit",
            "papers": []
          },
          {
            "place": "University of Florida",
            "role": "Undergraduate research, Machine Learning and Sensing Lab · hyperspectral toolkit for plant phenotyping with Donald Danforth Plant Science Center",
            "period": "August 2018–April 2019",
            "mentors": "Alina Zare",
            "source": "https://yutaizhou.github.io/files/CV.pdf",
            "papers": []
          },
          {
            "place": "University of Florida",
            "role": "Undergraduate research assistant, ADAMUS Laboratory",
            "period": "2016",
            "source": "https://www.alphaxiv.org/@yutai-zhou",
            "papers": []
          },
          {
            "place": "University of Florida",
            "role": "Teaching assistant, MATLAB and mechanics of materials",
            "period": "2016–2017",
            "source": "https://yutaizhou.github.io/files/CV.pdf",
            "papers": []
          },
          {
            "place": "Sandia National Laboratories",
            "role": "Software research internship, video object tracking and satellite remote sensing",
            "period": "January–August 2018",
            "source": "https://yutaizhou.github.io/files/CV.pdf",
            "papers": []
          }
        ]
      },
      {
        "id": "siddartha-devic",
        "name": "Siddartha Devic",
        "school": "University of Texas at Dallas",
        "year": 2020,
        "major": "Mathematics and Computer Science",
        "graduationYear": 2021,
        "educationSource": "https://sid.devic.us/assets/files/cv_public_siddartha_devic.pdf",
        "source": "https://drive.google.com/file/d/1DgXqEC2DFhEYAHMFWJroYfMgKHbjwy7u/view",
        "research": [
          {
            "place": "University of Texas at Dallas",
            "role": "Undergraduate research, distributed neural networks",
            "period": "2018–2020",
            "mentors": "Jason Jue",
            "papers": [
              {
                "venue": "AAAI 2021",
                "status": "Submitted",
                "year": 2020,
                "authorship": "Third",
                "title": "ResiliNet: Failure-Resilient Inference in Distributed Neural Networks",
                "url": "https://arxiv.org/abs/2002.07386v2",
                "also": [
                  {
                    "venue": "Federated Learning at ICML 2020",
                    "status": "Accepted",
                    "url": "https://federated-learning.org/fl-icml-2020/"
                  }
                ]
              },
              {
                "venue": "AIChallengeIoT 2019",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Guardians of the Deep Fog: Failure-Resilient DNN Inference from Edge to Cloud",
                "url": "https://bayen.berkeley.edu/sites/default/files/guardians_of_the_deep_fog-_failure-resilient_dnn_inference_from_edge_to_cloud.pdf"
              }
            ]
          },
          {
            "place": "University of Texas at Dallas",
            "role": "Undergraduate research, network recovery",
            "period": "2018–2020",
            "mentors": "Jason Jue · Genya Ishigaki",
            "mentorLabel": "Mentors",
            "source": "https://anrlutdallas.github.io/people/sid.html",
            "papers": [
              {
                "venue": "IEEE Journal on Selected Areas in Communications 2020",
                "status": "Accepted",
                "authorship": "Second",
                "title": "DeepPR: Progressive Recovery for Interdependent VNFs with Deep Reinforcement Learning",
                "url": "https://arxiv.org/abs/1904.11533"
              },
              {
                "venue": "GLOBECOM 2019",
                "status": "Accepted",
                "authorship": "Second",
                "title": "DeepPR: Incremental Recovery for Interdependent VNFs with Deep Reinforcement Learning",
                "url": "https://doi.org/10.1109/GLOBECOM38437.2019.9013358"
              }
            ]
          },
          {
            "place": "University of Texas at Dallas",
            "role": "Undergraduate research, Markov Lab · convex optimization for reinforcement learning",
            "period": "From October 2017",
            "mentors": "Nicholas Ruozzi · Benjamin Raichel",
            "source": "https://sid.devic.us/assets/files/cv_public_siddartha_devic.pdf",
            "papers": []
          },
          {
            "place": "University of Texas at Dallas",
            "role": "Advanced Networks Research Lab · online optimization for fair bandwidth allocation",
            "mentors": "Jason Jue",
            "source": "https://drive.google.com/file/d/1DgXqEC2DFhEYAHMFWJroYfMgKHbjwy7u/view",
            "papers": []
          },
          {
            "place": "University of Texas at Dallas",
            "role": "Undergraduate research, Future Immersive Virtual Environments Lab",
            "period": "Summer 2017",
            "mentors": "Ryan McMahan",
            "source": "https://github-wiki-see.page/m/acmutd/help-guide/wiki/CS-Grad-Programs%3A-Getting-Involved-in-Research",
            "papers": []
          },
          {
            "place": "Washington University in St. Louis",
            "role": "NSF REU research internship, reinforcement learning",
            "period": "May–September 2020",
            "mentors": "Brendan Juba",
            "source": "https://sid.devic.us/assets/files/cv_public_siddartha_devic.pdf",
            "papers": [
              {
                "venue": "AISTATS 2021",
                "status": "Submitted",
                "year": 2020,
                "authorship": "Second",
                "title": "Polynomial Time Reinforcement Learning in Factored State MDPs with Linear Value Functions",
                "url": "https://www.cse.wustl.edu/~bjuba/papers/fmdp-aistats.pdf"
              }
            ]
          },
          {
            "place": "Johns Hopkins Applied Physics Laboratory",
            "role": "Research internship, Machine Perception, active learning",
            "period": "May–August 2019",
            "mentors": "Vickram Rajendran · Eryk Banatt",
            "source": "https://sid.devic.us/assets/files/cv_public_siddartha_devic.pdf",
            "papers": []
          }
        ]
      },
      {
        "id": "qinyuan-ye",
        "name": "Qinyuan Ye",
        "school": "Tsinghua University",
        "year": 2018,
        "major": "Automation",
        "graduationYear": 2019,
        "educationSource": "https://yeqy.xyz/src/qinyuan_ye_cv_latest.pdf",
        "source": "https://docs.google.com/document/d/10Ey3eL6eq7lUGwDv7D_IShUwSMBHq5y0/edit",
        "research": [
          {
            "place": "University of Southern California",
            "role": "Research internship, INK Lab · relation extraction",
            "period": "Summer 2018",
            "mentors": "Xiang Ren",
            "source": "https://docs.google.com/document/d/10Ey3eL6eq7lUGwDv7D_IShUwSMBHq5y0/edit",
            "papers": [
              {
                "venue": "",
                "status": "Submitted",
                "year": 2018,
                "authorship": "Equal first",
                "title": "Looking Beyond Label Noise: Shifted Label Distribution Matters in Distantly Supervised Relation Extraction",
                "url": "https://aclanthology.org/D19-1397/"
              }
            ]
          },
          {
            "place": "Financial data project",
            "role": "Research, stock forecasting and portfolio optimization using boosted trees and LSTMs",
            "source": "https://docs.google.com/document/d/10Ey3eL6eq7lUGwDv7D_IShUwSMBHq5y0/edit",
            "papers": []
          }
        ],
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "reviewed",
          "source": "https://yeqy.xyz/",
          "note": "Application-era relation-extraction manuscript was submitted; conference publication followed in 2019."
        }
      }
    ]
  },
  {
    "id": "maryland",
    "name": "University of Maryland",
    "program": "Computer Science PhD",
    "applicants": [
      {
        "id": "thu-00049",
        "name": "Rick",
        "school": "Tsinghua University",
        "year": 2024,
        "major": "Software Engineering",
        "educationSource": "https://database.feiyue.online/applicant/Applicant-00049/",
        "source": "https://database.feiyue.online/applicant/Applicant-00049/",
        "sourceLabel": "View application profile",
        "research": [
          {
            "place": "Tsinghua University",
            "role": "Time-series analysis",
            "papers": [
              {
                "venue": "NeurIPS",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Time-series analysis paper — NeurIPS"
              },
              {
                "venue": "ICML",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Time-series analysis paper — ICML"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00049/"
          },
          {
            "place": "New York University",
            "role": "Summer research, video generation",
            "papers": [
              {
                "venue": "ICML",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Video generation paper"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00049/"
          }
        ],
        "program": "Computer Science PhD — admitted"
      },
      {
        "id": "shaily-bhatt",
        "name": "Shaily Bhatt",
        "school": "BITS Pilani, Pilani campus",
        "year": 2022,
        "major": "Computer Science",
        "graduationYear": 2021,
        "educationSource": "https://sites.google.com/view/shailybhatt/education",
        "source": "https://drive.google.com/file/d/1hbIW1usf9ochBC77xx9efa74k0pcwqrU/view",
        "research": [
          {
            "place": "Google Research India",
            "role": "Predoctoral researcher, Natural Language Understanding Group · fairness in NLP",
            "period": "From July 2021",
            "mentors": "Partha Talukdar · Vinodkumar Prabhakaran",
            "source": "https://drive.google.com/file/d/1hbIW1usf9ochBC77xx9efa74k0pcwqrU/view",
            "papers": [
              {
                "venue": "Cultures in AI at NeurIPS 2022",
                "status": "Accepted",
                "authorship": "First",
                "title": "Cultural Re-contextualization of Fairness Research in Language Technologies in India",
                "url": "https://research.google/pubs/cultural-re-contextualization-of-fairness-research-in-language-technologies-in-india/"
              },
              {
                "venue": "AACL 2022",
                "status": "Accepted",
                "authorship": "First",
                "title": "Re-contextualizing Fairness in NLP: The Case of India",
                "url": "https://aclanthology.org/2022.aacl-main.55/"
              }
            ]
          },
          {
            "place": "Google Research India",
            "role": "Research, human-assisted multilingual counterfactuals for bias mitigation",
            "mentors": "Partha Talukdar · Vinodkumar Prabhakaran",
            "source": "https://drive.google.com/file/d/1hbIW1usf9ochBC77xx9efa74k0pcwqrU/view",
            "papers": []
          },
          {
            "place": "Microsoft Research India",
            "role": "Undergraduate thesis, language model evaluation",
            "period": "August 2020–June 2021",
            "mentors": "Sunayana Sitaram · Monojit Choudhury · Poonam Goyal",
            "source": "https://sites.google.com/view/shailybhatt/education",
            "papers": [
              {
                "venue": "ICON 2021",
                "status": "Accepted",
                "authorship": "First",
                "title": "On the Universality of Deep Contextual Language Models",
                "url": "https://aclanthology.org/2021.icon-main.15/"
              }
            ]
          },
          {
            "place": "Microsoft Research India",
            "role": "Research internship, Speech and NLP Group · multilingual evaluation",
            "period": "August 2020–June 2021",
            "mentors": "Sunayana Sitaram · Monojit Choudhury",
            "source": "https://drive.google.com/file/d/1hbIW1usf9ochBC77xx9efa74k0pcwqrU/view",
            "papers": [
              {
                "venue": "Findings of AACL 2022",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Multilingual CheckList: Generation and Evaluation",
                "url": "https://aclanthology.org/2022.findings-aacl.27/"
              },
              {
                "venue": "HumEval at EACL 2021",
                "status": "Accepted",
                "authorship": "First",
                "title": "A Case Study of Efficacy and Challenges in Practical Human-in-Loop Evaluation of NLP Systems Using Checklist",
                "url": "https://aclanthology.org/2021.humeval-1.14/"
              }
            ]
          },
          {
            "place": "BITS Pilani",
            "role": "Research assistant, Web Intelligence and Social Computing Lab · multimodal fake news detection",
            "period": "August 2019–August 2020",
            "mentors": "Yashvardhan Sharma",
            "source": "https://sites.google.com/view/shailybhatt/experience",
            "papers": [
              {
                "venue": "ICDMAI 2021",
                "status": "Accepted",
                "authorship": "First",
                "title": "Fake News Detection: Experiments and Approaches Beyond Linguistic Features",
                "url": "https://link.springer.com/chapter/10.1007/978-981-16-2937-2_9"
              }
            ]
          },
          {
            "place": "BITS Pilani",
            "role": "Undergraduate research, fact verification and medical question answering",
            "source": "https://sites.google.com/view/shailybhatt/education",
            "papers": []
          },
          {
            "place": "Widening NLP",
            "role": "Co-chair and workshop organizer",
            "period": "From September 2021",
            "source": "https://sites.google.com/view/shailybhatt/past-news",
            "papers": []
          },
          {
            "place": "Arcesium",
            "role": "Software development internship, ledger automation",
            "period": "May–June 2020",
            "source": "https://sites.google.com/view/shailybhatt/experience",
            "papers": []
          },
          {
            "place": "Bhaskaracharya Institute for Space Applications and Geo-Informatics",
            "role": "AI internship, land-use change detection",
            "period": "May–July 2019",
            "mentors": "Manoj Pandya",
            "source": "https://sites.google.com/view/shailybhatt/experience",
            "papers": []
          },
          {
            "place": "Techmicra",
            "role": "Android development internship, employee scheduling",
            "period": "June–July 2018",
            "source": "https://sites.google.com/view/shailybhatt/experience",
            "papers": []
          }
        ]
      },
      {
        "id": "thu-00018",
        "name": "Sophia",
        "school": "Tsinghua University",
        "year": 2022,
        "major": "Computer Science (Yao Class)",
        "educationSource": "https://database.feiyue.online/applicant/Applicant-00018/",
        "source": "https://database.feiyue.online/applicant/Applicant-00018/",
        "sourceLabel": "View application profile",
        "research": [
          {
            "place": "Microsoft Research Asia",
            "role": "Research internship, NLP",
            "papers": [
              {
                "venue": "ACL",
                "status": "Submitted",
                "authorship": "First",
                "title": "NLP paper — ACL"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00018/"
          },
          {
            "place": "Tsinghua University",
            "role": "Future Laboratory, computer vision",
            "papers": [
              {
                "venue": "CVPR",
                "status": "Accepted",
                "authorship": "Second",
                "title": "Computer vision paper"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00018/"
          },
          {
            "place": "University of Maryland",
            "role": "Spring research, NLP",
            "papers": [
              {
                "venue": "Findings of EMNLP",
                "status": "Accepted",
                "authorship": "First",
                "title": "NLP paper — Findings of EMNLP"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00018/"
          },
          {
            "place": "Stanford University",
            "role": "UGVR summer research, HCI",
            "papers": [
              {
                "venue": "CHI",
                "status": "Submitted",
                "authorship": "First",
                "title": "HCI paper"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00018/"
          }
        ],
        "program": "Computer Science PhD — admitted"
      },
      {
        "id": "zhenghang-hu",
        "name": "Zhenghang Hu",
        "school": "University of Maryland",
        "major": "Computer Science",
        "educationSource": "https://zhenghanghu.github.io/2022/07/03/%E7%94%B3%E8%AF%B7%E6%80%BB%E7%BB%93.html",
        "source": "https://zhenghanghu.github.io/2022/07/03/%E7%94%B3%E8%AF%B7%E6%80%BB%E7%BB%93.html",
        "sourceLabel": "Application blog",
        "research": [],
        "graduationYear": 2022,
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "confirmed",
          "source": "https://zhenghanghu.github.io/2022/07/03/申请总结.html",
          "note": "Application blog explicitly states no research experience; zero supported directly. Page title and timestamp disagree on cycle, so no year inferred."
        }
      }
    ]
  },
  {
    "id": "brown",
    "name": "Brown University",
    "program": "Computer Science PhD",
    "applicants": [
      {
        "id": "yong-zheng-xin",
        "name": "Yong Zheng-Xin",
        "school": "Minerva University",
        "year": 2020,
        "major": "Computer Science; Business minor",
        "graduationYear": 2021,
        "educationSource": "https://yongzx.github.io/",
        "source": "https://drive.google.com/file/d/1gS307sfghvwt6z9QsagyKTjqXSZOKfta/view",
        "research": [
          {
            "place": "FrameNet Brasil",
            "role": "Research internship, Google Summer of Code · multilingual frame alignment with graph neural networks",
            "period": "2020",
            "mentors": "Tiago Timponi Torrent · Collin F. Baker · Oliver Czulo",
            "source": "https://aclanthology.org/2022.lrec-1.103/",
            "papers": [
              {
                "venue": "NAACL 2021",
                "status": "Submitted",
                "year": 2020,
                "authorship": "First",
                "title": "Frame Shift Prediction",
                "url": "https://aclanthology.org/2022.lrec-1.103/"
              }
            ]
          },
          {
            "place": "FrameNet Brasil",
            "role": "Research internship, Red Hen Lab · Google Summer of Code",
            "period": "2019",
            "mentors": "Tiago Timponi Torrent · Cristóbal Pagán Cánovas · Inés Olza · Javier Valenzuela",
            "mentorLabel": "Mentors",
            "source": "https://www.redhenlab.org/summer-of-code/red-hen-lab---google-summer-of-code-2019-projects",
            "papers": [
              {
                "venue": "LREC 2020",
                "status": "Accepted",
                "authorship": "First",
                "title": "Semi-supervised Deep Embedded Clustering with Anomaly Detection for Semantic Frame Induction",
                "url": "https://aclanthology.org/2020.lrec-1.431/"
              }
            ]
          },
          {
            "place": "Methodist College Kuala Lumpur",
            "role": "Research, lung cancer breath screening",
            "period": "2016",
            "mentors": "Jiunn-Liang Tan · Chong-Kin Liam",
            "mentorLabel": "With",
            "source": "https://jtd.amegroups.org/article/view/9989/8875",
            "papers": [
              {
                "venue": "Journal of Thoracic Disease 2016",
                "status": "Accepted",
                "authorship": "Second",
                "title": "Using a Chemiresistor-Based Alkane Sensor to Distinguish Exhaled Breaths of Lung Cancer Patients from Subjects with No Lung Cancer",
                "url": "https://jtd.amegroups.org/article/view/9989/8875"
              }
            ]
          },
          {
            "place": "The Interface Financial Group",
            "role": "Junior data scientist, invoice recognition",
            "period": "2019",
            "source": "https://www.interfacefinancial.com/wp-content/uploads/2021/11/ifg_google_whitepaper.pdf",
            "papers": []
          }
        ]
      }
    ]
  },
  {
    "id": "irvine",
    "name": "UC Irvine",
    "program": "Software Engineering PhD",
    "applicants": [
      {
        "id": "asif-haider",
        "name": "Asif Haider",
        "school": "Bangladesh University of Engineering and Technology",
        "year": 2024,
        "major": "Computer Science and Engineering",
        "graduationYear": 2024,
        "educationSource": "https://www.bracu.ac.bd/about/people/asif-haider",
        "source": "https://drive.google.com/file/d/1RbyggJNJVrbUoApjArz3J02MPhoxTQuT/view",
        "research": [
          {
            "place": "Bangladesh University of Engineering and Technology",
            "role": "Undergraduate thesis, automated code review",
            "mentors": "Anindya Iqbal · Toufique Ahmed",
            "source": "https://drive.google.com/file/d/1RbyggJNJVrbUoApjArz3J02MPhoxTQuT/view",
            "papers": [
              {
                "venue": "MSR 2025",
                "status": "Submitted",
                "year": 2024,
                "authorship": "Equal first",
                "title": "Prompting and Fine-tuning Large Language Models for Automated Code Review Comment Generation",
                "url": "https://arxiv.org/abs/2411.10129v1"
              }
            ]
          },
          {
            "place": "Bangladesh University of Engineering and Technology",
            "role": "Research, code generation and debugging",
            "mentors": "Eunus Ali · Rizwan Parvez",
            "source": "https://drive.google.com/file/d/1RbyggJNJVrbUoApjArz3J02MPhoxTQuT/view",
            "papers": []
          },
          {
            "place": "Bangladesh University of Engineering and Technology",
            "role": "Research collaboration, COVID-19 forecasting",
            "papers": [
              {
                "venue": "Results in Physics 2021",
                "status": "Accepted",
                "authorship": "Fifth",
                "title": "Forecasting COVID-19 Cases: A Comparative Analysis between Recurrent and Convolutional Neural Networks",
                "url": "https://pubmed.ncbi.nlm.nih.gov/33898209/"
              }
            ]
          },
          {
            "place": "Bangladesh University of Engineering and Technology",
            "role": "Research project, ophthalmic biomarker detection · IEEE VIP Cup winner",
            "period": "2023",
            "mentors": "M. Sohel Rahman",
            "source": "https://cse.buet.ac.bd/home/news_detail/174",
            "papers": []
          },
          {
            "place": "University of Notre Dame",
            "role": "Remote research internship, S2E Lab · code complexity prediction",
            "period": "2023",
            "mentors": "Joanna Santos",
            "source": "https://github.com/asifhaider/asifhaider.github.io/blob/23fc5c3c4684e27e7474c23e2ed54e5c0a6eb01e/assets/CV_of_Asif_Haider_March26.pdf",
            "papers": [
              {
                "venue": "NLBSE at ICSE 2023",
                "status": "Accepted",
                "authorship": "Fourth",
                "title": "Zero-shot Prompting for Code Complexity Prediction Using GitHub Copilot",
                "url": "https://joannacss.github.io/preprints/nlbse23-preprint.pdf"
              }
            ]
          },
          {
            "place": "OpenRefactory",
            "role": "Software security internship, Python and Java bug fixes in open-source projects",
            "period": "2023",
            "source": "https://drive.google.com/file/d/1RbyggJNJVrbUoApjArz3J02MPhoxTQuT/view",
            "papers": []
          },
          {
            "place": "North West Power Generation Company",
            "role": "Machine learning internship through eSRD Lab · predictive maintenance",
            "period": "2023",
            "source": "https://www.linkedin.com/posts/rakin000_internship-machinelearning-powergeneration-activity-7067882624161120256-NO7H",
            "papers": []
          },
          {
            "place": "BRAC University",
            "role": "Lecturer",
            "period": "2024",
            "source": "https://www.bracu.ac.bd/about/people/asif-haider",
            "papers": []
          }
        ],
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "reviewed",
          "source": "https://asifhaider.github.io/",
          "note": "Prior accepted work is NLBSE workshop and Results in Physics journal. ICIP 2025 and MSR 2026 are later."
        }
      }
    ]
  },
  {
    "id": "wisconsin",
    "name": "University of Wisconsin–Madison",
    "program": "Computer Science PhD",
    "applicants": [
      {
        "id": "thu-00049",
        "name": "Rick",
        "school": "Tsinghua University",
        "year": 2024,
        "major": "Software Engineering",
        "educationSource": "https://database.feiyue.online/applicant/Applicant-00049/",
        "source": "https://database.feiyue.online/applicant/Applicant-00049/",
        "sourceLabel": "View application profile",
        "research": [
          {
            "place": "Tsinghua University",
            "role": "Time-series analysis",
            "papers": [
              {
                "venue": "NeurIPS",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Time-series analysis paper — NeurIPS"
              },
              {
                "venue": "ICML",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Time-series analysis paper — ICML"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00049/"
          },
          {
            "place": "New York University",
            "role": "Summer research, video generation",
            "papers": [
              {
                "venue": "ICML",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Video generation paper"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00049/"
          }
        ],
        "program": "Computer Science PhD — admitted"
      },
      {
        "id": "edward-edberg-halim",
        "name": "Edward Edberg Halim",
        "school": "Surya University",
        "year": 2022,
        "major": "Physics – Energy Engineering",
        "graduationYear": 2018,
        "educationSource": "https://edward-edberg.github.io/file/CV_Edward%20Edberg%20Halim.pdf",
        "source": "https://docs.google.com/document/d/1u_rCYmT_2vVGn4PkvkeruBdR3SkiCZDuptGk_y9Vr4Q/edit",
        "research": [
          {
            "place": "Virginia Tech",
            "role": "Remote research assistant, memory disaggregation",
            "period": "From August 2022",
            "mentors": "Huaicheng Li",
            "source": "https://edward-edberg.github.io/file/CV_Edward%20Edberg%20Halim.pdf",
            "papers": []
          },
          {
            "place": "Carnegie Mellon University",
            "role": "Remote research assistant, memory disaggregation",
            "period": "June–August 2022",
            "mentors": "Huaicheng Li",
            "source": "https://edward-edberg.github.io/file/CV_Edward%20Edberg%20Halim.pdf",
            "papers": []
          },
          {
            "place": "Boston University",
            "role": "Remote research assistant, news framing and multimodal analysis",
            "period": "July 2019–December 2020",
            "mentors": "Derry Tanti Wijaya",
            "papers": [
              {
                "venue": "EMNLP 2021 Findings",
                "status": "Accepted",
                "authorship": "Fifth",
                "title": "Detecting Frames in News Headlines and Lead Images in U.S. Gun Violence Coverage",
                "url": "https://aclanthology.org/2021.findings-emnlp.339/"
              },
              {
                "venue": "EMNLP 2021 Demo",
                "status": "Accepted",
                "authorship": "Eighth",
                "title": "OpenFraming: Open-sourced Tool for Computational Framing Analysis of Multilingual Data",
                "url": "https://aclanthology.org/2021.emnlp-demo.28/"
              }
            ]
          },
          {
            "place": "University of Chicago",
            "role": "Remote research assistant, machine learning for SSD latency",
            "period": "October 2018–November 2019",
            "mentors": "Haryadi S. Gunawi",
            "papers": [
              {
                "venue": "OSDI 2020",
                "status": "Accepted",
                "authorship": "Fourth",
                "title": "LinnOS: Predictability on Unpredictable Flash Storage with a Light Neural Network",
                "url": "https://www.usenix.org/conference/osdi20/presentation/hao"
              }
            ]
          },
          {
            "place": "Indonesian Institute of Sciences",
            "role": "Research assistant, metallurgy",
            "period": "January–June 2018",
            "mentors": "Niki Prastomo · Eni Sugiarti",
            "source": "https://edward-edberg.github.io/file/CV_Edward%20Edberg%20Halim.pdf",
            "papers": []
          },
          {
            "place": "Surya University",
            "role": "Undergraduate thesis, protective coatings",
            "mentors": "Niki Prastomo · Eni Sugiarti · Robi Sobirin",
            "source": "https://edward-edberg.github.io/file/CV_Edward%20Edberg%20Halim.pdf",
            "papers": []
          },
          {
            "place": "Astra Insurance",
            "role": "Data scientist, hospital fraud detection",
            "period": "November 2019–August 2021",
            "source": "https://edward-edberg.github.io/file/CV_Edward%20Edberg%20Halim.pdf",
            "papers": []
          }
        ]
      },
      {
        "id": "zhenghang-hu",
        "name": "Zhenghang Hu",
        "school": "University of Maryland",
        "major": "Computer Science",
        "educationSource": "https://zhenghanghu.github.io/2022/07/03/%E7%94%B3%E8%AF%B7%E6%80%BB%E7%BB%93.html",
        "source": "https://zhenghanghu.github.io/2022/07/03/%E7%94%B3%E8%AF%B7%E6%80%BB%E7%BB%93.html",
        "sourceLabel": "Application blog",
        "research": [],
        "graduationYear": 2022,
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "confirmed",
          "source": "https://zhenghanghu.github.io/2022/07/03/申请总结.html",
          "note": "Application blog explicitly states no research experience; zero supported directly. Page title and timestamp disagree on cycle, so no year inferred."
        }
      }
    ]
  },
  {
    "id": "northeastern",
    "name": "Northeastern University",
    "program": "Computer Science PhD",
    "applicants": [
      {
        "id": "haotian-liu",
        "name": "Haotian Liu",
        "school": "Worcester Polytechnic Institute",
        "year": 2024,
        "major": "Robotics Engineering",
        "graduationYear": 2025,
        "educationSource": "https://seanliu7081.github.io/files/Haotian_Liu_CV_25_SPr.pdf",
        "source": "https://drive.google.com/file/d/1LNhgy54xlh1G2WABu2k8w294BHTRrhTr/view",
        "research": [
          {
            "place": "Northeastern University",
            "role": "Research internship, Helping Hands Lab",
            "period": "From May 2024",
            "mentors": "Robert Platt · Robin Walters · Haojie Huang",
            "mentorLabel": "Advisors & mentor",
            "source": "https://seanliu7081.github.io/files/Haotian_Liu_CV_25_SPr.pdf",
            "papers": [
              {
                "venue": "ICRA 2025",
                "status": "Submitted",
                "year": 2024,
                "authorship": "Second",
                "title": "MATCH Policy: A Simple Pipeline from Point Cloud Registration to Manipulation Policies",
                "url": "https://arxiv.org/abs/2409.15517v1"
              },
              {
                "venue": "CoRL 2024",
                "status": "Accepted",
                "authorship": "Equal fifth",
                "title": "Imagination Policy: Using Generative Point Cloud Models for Learning Manipulation Policies",
                "url": "https://haojhuang.github.io/imagine_page/"
              }
            ]
          },
          {
            "place": "Worcester Polytechnic Institute",
            "role": "Undergraduate research",
            "period": "December 2023–June 2024",
            "mentors": "Ziming Zhang",
            "source": "https://seanliu7081.github.io/files/Haotian_Liu_CV_25_SPr.pdf",
            "papers": [
              {
                "venue": "ICLR 2025",
                "status": "Submitted",
                "year": 2024,
                "authorship": "Equal first",
                "title": "GPS: A Probabilistic Distributional Similarity with Gumbel Priors for Set-to-Set Matching",
                "url": "https://gpsprojpage.github.io/"
              }
            ]
          },
          {
            "place": "Worcester Polytechnic Institute",
            "role": "Undergraduate research",
            "period": "September 2023–May 2024",
            "mentors": "Ziming Zhang",
            "source": "https://seanliu7081.github.io/files/Haotian_Liu_CV_25_SPr.pdf",
            "papers": [
              {
                "venue": "IROS 2024",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "Loss Distillation via Gradient Matching for Point Cloud Completion with Weighted Chamfer Distance",
                "url": "https://arxiv.org/abs/2409.06171"
              }
            ]
          },
          {
            "place": "Worcester Polytechnic Institute",
            "role": "Undergraduate research",
            "period": "September 2023–May 2024",
            "mentors": "Haichong Zhang",
            "source": "https://seanliu7081.github.io/files/Haotian_Liu_CV_25_SPr.pdf",
            "papers": [
              {
                "venue": "Scientific Reports 2024",
                "status": "Accepted",
                "authorship": "Second",
                "title": "Enhancing Boundary Detection of Radiofrequency Ablation Lesions through Photoacoustic Mapping",
                "url": "https://www.nature.com/articles/s41598-024-68046-x"
              }
            ]
          },
          {
            "place": "Worcester Polytechnic Institute",
            "role": "Undergraduate research",
            "period": "2023",
            "mentors": "Markus Nemitz",
            "papers": [
              {
                "venue": "RoboSoft 2024",
                "status": "Accepted",
                "authorship": "Third",
                "title": "Vision-based FDM Printing for Fabricating Airtight Soft Actuators",
                "url": "https://gravishlab.ucsd.edu/robosoft2024/proceedings/"
              },
              {
                "venue": "Preprint",
                "status": "Preprint",
                "year": 2023,
                "authorship": "Third",
                "title": "STREAM: Software Tool for Routing Efficiently Advanced Macrofluidics",
                "url": "https://arxiv.org/abs/2312.01130"
              }
            ]
          },
          {
            "place": "Worcester Polytechnic Institute",
            "role": "Undergraduate thesis, automated ventricular drain control",
            "period": "September 2023–May 2024",
            "mentors": "Christopher Nycz",
            "source": "https://seanliu7081.github.io/files/Haotian_Liu_CV_25_SPr.pdf",
            "papers": []
          },
          {
            "place": "Worcester Polytechnic Institute",
            "role": "Undergraduate research, wearable neuroimaging",
            "period": "May–September 2022",
            "mentors": "Ali Yousefi · Soroush Farzin",
            "source": "https://seanliu7081.github.io/files/Haotian_Liu_CV_25_SPr.pdf",
            "papers": []
          }
        ]
      }
    ]
  },
  {
    "id": "santa-barbara",
    "name": "UC Santa Barbara",
    "program": "Computer Science PhD",
    "applicants": [
      {
        "id": "deepak-nathani",
        "name": "Deepak Nathani",
        "school": "IIT Hyderabad",
        "year": 2021,
        "major": "Mechanical Engineering and Computer Science",
        "graduationYear": 2019,
        "educationSource": "https://dnathani.net/assets/pdf/dnathani_cv.pdf",
        "source": "https://huggingface.co/spaces/kabir0229/COMS-579/resolve/main/SOP_UCSB.pdf?download=true",
        "research": [
          {
            "place": "Google Research India",
            "role": "Pre-doctoral researcher, conversational health and text style transfer",
            "period": "2020–2021",
            "mentors": "Partha Talukdar",
            "source": "https://dnathani.net/assets/pdf/dnathani_cv.pdf",
            "papers": [
              {
                "venue": "Preprint",
                "status": "Preprint",
                "year": 2021,
                "authorship": "Second",
                "title": "Few-shot Controllable Style Transfer for Low-Resource Settings: A Study in Indian Languages",
                "url": "https://arxiv.org/abs/2110.07385v1"
              }
            ]
          },
          {
            "place": "Google Research India",
            "role": "Research, ChAII question-answering dataset for Indian languages",
            "period": "2021",
            "source": "https://huggingface.co/spaces/kabir0229/COMS-579/resolve/main/SOP_UCSB.pdf?download=true",
            "papers": []
          },
          {
            "place": "IIT Hyderabad",
            "role": "Undergraduate research, Krama Lab",
            "period": "2017–2019",
            "mentors": "Manohar Kaul",
            "source": "https://dnathani.net/assets/pdf/dnathani_cv.pdf",
            "papers": [
              {
                "venue": "ICLR 2020",
                "status": "Accepted",
                "authorship": "Second",
                "title": "Few-Shot Learning on Graphs via Super-Classes Based on Graph Spectral Measures",
                "url": "https://iclr.cc/virtual_2020/poster_Bkeeca4Kvr.html"
              },
              {
                "venue": "ACL 2019",
                "status": "Accepted",
                "authorship": "First",
                "title": "Learning Attention-based Embeddings for Relation Prediction in Knowledge Graphs",
                "url": "https://aclanthology.org/P19-1466/"
              },
              {
                "venue": "ICML 2018",
                "status": "Accepted",
                "authorship": "Second",
                "title": "Solving Partial Assignment Problems Using Random Clique Complexes",
                "url": "https://proceedings.mlr.press/v80/sharma18a.html"
              }
            ]
          },
          {
            "place": "IBM Research",
            "role": "Research internship",
            "period": "Summer 2018",
            "mentors": "Sumit Bhatia · Bapi Chatterjee",
            "source": "https://dnathani.net/assets/pdf/dnathani_cv.pdf",
            "papers": [
              {
                "venue": "Complex Networks 2019",
                "status": "Accepted",
                "authorship": "Third",
                "title": "A Persistent Homology Perspective to the Link Prediction Problem",
                "url": "https://www.sumitbhatia.net/papers/complex-nets-19.pdf"
              }
            ]
          },
          {
            "place": "IIT Hyderabad",
            "role": "Coordinator, Infero programming club",
            "period": "2017–2019",
            "source": "https://dnathani.net/assets/pdf/dnathani_cv.pdf",
            "papers": []
          },
          {
            "place": "Salesforce",
            "role": "Software engineer",
            "period": "2019–2020",
            "source": "https://dnathani.net/assets/pdf/dnathani_cv.pdf",
            "papers": []
          }
        ]
      }
    ]
  },
  {
    "id": "rutgers",
    "name": "Rutgers University",
    "program": "Computer Science PhD",
    "applicants": [
      {
        "id": "fatima-jahara",
        "name": "Fatima Jahara",
        "school": "Chittagong University of Engineering and Technology",
        "year": 2023,
        "major": "Computer Science & Engineering",
        "graduationYear": 2021,
        "educationSource": "https://github.com/FatimaJahara/FatimaJahara.github.io/blob/main/index.html",
        "source": "https://drive.google.com/file/d/1dCveN1BAwGsaBwIhQd4Ds_onl8H-65uW/view",
        "sourceLabel": "View statement",
        "research": [
          {
            "place": "UC Santa Barbara",
            "role": "Fatima Al-Fihri predoctoral fellowship, T2IScoreScore text-to-image evaluation",
            "period": "From April 2023",
            "mentors": "Michael Saxon · William Yang Wang",
            "source": "https://github.com/FatimaJahara/FatimaJahara.github.io/blob/main/index.html",
            "papers": []
          },
          {
            "place": "Chittagong University of Engineering and Technology",
            "role": "Undergraduate thesis and research, NLP Lab",
            "period": "June 2019–June 2021",
            "mentors": "Mohammed Moshiul Hoque",
            "source": "https://github.com/FatimaJahara/FatimaJahara.github.io/blob/main/index.html",
            "papers": [
              {
                "venue": "ICO 2021",
                "status": "Accepted",
                "authorship": "First",
                "title": "Automatic Categorization of News Articles and Headlines Using Multi-layer Perceptron",
                "url": "https://link.springer.com/chapter/10.1007/978-3-030-93247-3_16"
              }
            ]
          },
          {
            "place": "Chittagong University of Engineering and Technology",
            "role": "Research, Bangla news classification with language-model ensembles",
            "source": "https://drive.google.com/file/d/1dCveN1BAwGsaBwIhQd4Ds_onl8H-65uW/view",
            "papers": []
          },
          {
            "place": "Chittagong University of Engineering and Technology",
            "role": "Undergraduate research, Bangla sign language",
            "mentors": "Dipon Talukder",
            "mentorLabel": "With",
            "source": "https://github.com/Dipon12/OkkhorNama-Bangladeshi-Sign-Language-Dataset-For-Real-Time-Object-Detection-Algorithms",
            "papers": [
              {
                "venue": "IEEE TENSYMP 2021",
                "status": "Accepted",
                "authorship": "Second",
                "title": "OkkhorNama: BdSL Image Dataset for Real Time Object Detection Algorithms",
                "url": "https://github.com/Dipon12/OkkhorNama-Bangladeshi-Sign-Language-Dataset-For-Real-Time-Object-Detection-Algorithms"
              },
              {
                "venue": "ICCIT 2020",
                "status": "Accepted",
                "authorship": "Second",
                "title": "Real-Time Bangla Sign Language Detection with Sentence and Speech Generation",
                "url": "https://doi.org/10.1109/ICCIT51783.2020.9392693"
              }
            ]
          },
          {
            "place": "Chittagong University of Engineering and Technology",
            "role": "Undergraduate research, NLP Lab",
            "period": "June 2019–June 2021",
            "mentors": "Mohammed Moshiul Hoque",
            "source": "https://github.com/FatimaJahara/FatimaJahara.github.io/blob/main/index.html",
            "papers": [
              {
                "venue": "ICO 2020",
                "status": "Accepted",
                "authorship": "First",
                "title": "Towards POS Tagging Methods for Bengali Language: A Comparative Analysis",
                "url": "https://avishekdas.net/publication.html"
              }
            ]
          },
          {
            "place": "Chittagong University of Engineering and Technology",
            "role": "Computer Club project mentor",
            "period": "March–December 2020",
            "source": "https://github.com/FatimaJahara/FatimaJahara.github.io/blob/main/index.html",
            "papers": []
          },
          {
            "place": "Chittagong University of Engineering and Technology",
            "role": "IEEE Women in Engineering vice chair",
            "period": "November 2019–November 2020",
            "source": "https://github.com/FatimaJahara/FatimaJahara.github.io/blob/main/index.html",
            "papers": []
          },
          {
            "place": "Workera",
            "role": "Senior assessment developer, language models for assessments",
            "period": "From January 2023",
            "source": "https://drive.google.com/file/d/1dCveN1BAwGsaBwIhQd4Ds_onl8H-65uW/view",
            "papers": []
          },
          {
            "place": "Workera",
            "role": "Assessment developer",
            "period": "February 2021–January 2023",
            "source": "https://github.com/FatimaJahara/FatimaJahara.github.io/blob/main/index.html",
            "papers": []
          },
          {
            "place": "DeepLearning.AI",
            "role": "Alpha tester, data science courses",
            "period": "From December 2020",
            "source": "https://github.com/FatimaJahara/FatimaJahara.github.io/blob/main/index.html",
            "papers": []
          },
          {
            "place": "Brain Station 23",
            "role": "Software development trainee",
            "period": "August 2019",
            "source": "https://github.com/FatimaJahara/FatimaJahara.github.io/blob/main/index.html",
            "papers": []
          }
        ]
      }
    ]
  },
  {
    "id": "unc",
    "name": "UNC Chapel Hill",
    "program": "Computer Science PhD",
    "applicants": [
      {
        "id": "soumitri-chattopadhyay",
        "name": "Soumitri Chattopadhyay",
        "school": "Jadavpur University",
        "year": 2022,
        "major": "Information Technology",
        "graduationYear": 2023,
        "educationSource": "https://github.com/soumitri2001",
        "source": "https://drive.google.com/file/d/1PgWPosFcxvrujGJNNmV0ruzWPQEXW2uM/view",
        "research": [
          {
            "place": "Indian Statistical Institute, Kolkata",
            "role": "Research internship, self-supervised signature verification",
            "period": "2021–2022",
            "mentors": "Umapada Pal · Saumik Bhattacharya",
            "source": "https://drive.google.com/file/d/1PgWPosFcxvrujGJNNmV0ruzWPQEXW2uM/view",
            "papers": [
              {
                "venue": "ICIP 2022",
                "status": "Accepted",
                "authorship": "Second",
                "title": "SWIS: Self-Supervised Representation Learning for Writer Independent Offline Signature Verification",
                "url": "https://digitalcommons.isical.ac.in/conf-articles/423/"
              },
              {
                "venue": "ICPR 2022",
                "status": "Accepted",
                "authorship": "First",
                "title": "SURDS: Self-Supervised Attention-guided Reconstruction and Dual Triplet Loss for Writer Independent Offline Signature Verification",
                "url": "https://github.com/soumitri2001/SURDS-SSL-OSV"
              }
            ]
          },
          {
            "place": "Indian Statistical Institute, Kolkata",
            "role": "Research, contrastive learning for imbalanced data and image restoration",
            "mentors": "Umapada Pal · Saumik Bhattacharya",
            "source": "https://drive.google.com/file/d/1PgWPosFcxvrujGJNNmV0ruzWPQEXW2uM/view",
            "papers": []
          },
          {
            "place": "Jadavpur University",
            "role": "Undergraduate research",
            "mentors": "Ram Sarkar · Pawan Kumar Singh",
            "papers": [
              {
                "venue": "International Journal of Intelligent Systems 2022",
                "status": "Accepted",
                "authorship": "First",
                "title": "Pneumonia Detection from Lung X-ray Images Using Local Search Aided Sine Cosine Algorithm Based Deep Feature Selection Method",
                "url": "https://doi.org/10.1002/int.22703"
              }
            ]
          },
          {
            "place": "Jadavpur University",
            "role": "Undergraduate research",
            "mentors": "Pawan Kumar Singh",
            "papers": [
              {
                "venue": "MISP 2022",
                "status": "Accepted",
                "authorship": "Second",
                "title": "Supervision Meets Self-Supervision: A Deep Multitask Network for Colorectal Cancer Histopathological Analysis",
                "url": "https://soumitri2001.github.io/DMTNet-CRCH/"
              }
            ]
          },
          {
            "place": "École de technologie supérieure",
            "role": "Mitacs research internship, unpaired multimodal medical image segmentation and semi-supervised extension",
            "period": "Summer 2022",
            "mentors": "Jose Dolz",
            "source": "https://drive.google.com/file/d/1PgWPosFcxvrujGJNNmV0ruzWPQEXW2uM/view",
            "papers": []
          },
          {
            "place": "University of Surrey",
            "role": "Research assistant, SketchX Lab · fine-grained sketch-based image retrieval",
            "period": "Summer 2021",
            "mentors": "Yi-Zhe Song",
            "source": "https://drive.google.com/file/d/1PgWPosFcxvrujGJNNmV0ruzWPQEXW2uM/view",
            "papers": []
          }
        ]
      },
      {
        "id": "jaemin-cho",
        "name": "Jaemin Cho",
        "school": "Seoul National University",
        "year": 2019,
        "major": "Industrial Engineering",
        "graduationYear": 2018,
        "educationSource": "https://j-min.io/files/CV.pdf",
        "source": "https://j-min.io/files/shared/UNC_SOP_Dec2019.pdf",
        "research": [
          {
            "place": "Allen Institute for AI",
            "role": "Predoctoral researcher, vision and language",
            "period": "From September 2019",
            "mentors": "Jiasen Lu · Hannaneh Hajishirzi · Aniruddha Kembhavi",
            "papers": []
          },
          {
            "place": "NAVER Clova",
            "role": "AI residency",
            "period": "July 2018–March 2019",
            "mentors": "Minjoon Seo · Hannaneh Hajishirzi",
            "papers": [
              {
                "venue": "EMNLP 2019",
                "status": "Accepted",
                "authorship": "First",
                "title": "Mixture Content Selection for Diverse Sequence Generation",
                "url": "https://aclanthology.org/D19-1308/"
              }
            ]
          },
          {
            "place": "Seoul National University",
            "role": "Research internship, Vision and Learning Lab",
            "period": "March 2017–May 2018",
            "mentors": "Gunhee Kim",
            "papers": [
              {
                "venue": "NAACL 2018",
                "status": "Accepted",
                "authorship": "Second",
                "title": "A Hierarchical Latent Structure for Variational Conversation Modeling",
                "url": "https://aclanthology.org/N18-1162/"
              }
            ]
          },
          {
            "place": "Seoul National University",
            "role": "Visiting scholar, Music and Audio Research Group",
            "period": "June–July 2019",
            "mentors": "Kyogu Lee",
            "papers": []
          },
          {
            "place": "Hong Kong University of Science and Technology",
            "role": "Research internship",
            "papers": []
          },
          {
            "place": "Polytechnique Montréal",
            "role": "Research internship",
            "papers": []
          },
          {
            "place": "DataNada",
            "role": "NLP research, chatbot startup",
            "source": "https://j-min.io/files/shared/UNC_SOP_Dec2019.pdf",
            "papers": []
          }
        ]
      }
    ]
  },
  {
    "id": "rit",
    "name": "Rochester Institute of Technology",
    "program": "Computing and Information Sciences PhD",
    "applicants": [
      {
        "id": "arka-dutta",
        "name": "Arka Dutta",
        "school": "Kalyani Government Engineering College",
        "year": 2022,
        "major": "Computer Science and Engineering",
        "graduationYear": 2023,
        "educationSource": "https://www.duttaarka.com/Arka_Dutta_Resume.pdf",
        "source": "https://drive.google.com/file/d/1GmmebJgvVnRRdYnZWhJHSpcmm_oiQ-RH/view",
        "research": [
          {
            "place": "Rochester Institute of Technology",
            "role": "Research internship, web archaeology · deleted YouTube comments with Adel Khorramrouz and Sujan Dutta",
            "period": "From September 2022",
            "mentors": "Ashiqur R. KhudaBukhsh",
            "source": "https://drive.google.com/file/d/1GmmebJgvVnRRdYnZWhJHSpcmm_oiQ-RH/view",
            "papers": []
          },
          {
            "place": "Indian Statistical Institute",
            "role": "NLP research internship, Bengali and Hindi hate-speech and phrase detection",
            "period": "July–October 2022",
            "mentors": "Utpal Garain",
            "source": "https://de.scribd.com/document/814522585/Arka-Dutta-Resume",
            "papers": []
          },
          {
            "place": "IIT Patna",
            "role": "NLP research, persona and knowledge-grounded dialogue",
            "mentors": "Asif Ekbal",
            "source": "https://drive.google.com/file/d/1GmmebJgvVnRRdYnZWhJHSpcmm_oiQ-RH/view",
            "papers": []
          },
          {
            "place": "Kalyani Government Engineering College",
            "role": "Research collaboration, cricket video analysis",
            "source": "https://www.duttaarka.com/research.html",
            "papers": [
              {
                "venue": "CICBA 2023",
                "status": "Submitted",
                "year": 2022,
                "authorship": "First",
                "title": "Classification of Cricket Shots from Cricket Videos Using Self-attention Infused CNN-RNN (SAICNN-RNN)",
                "url": "https://link.springer.com/chapter/10.1007/978-3-031-48876-4_24"
              }
            ]
          },
          {
            "place": "Research collaboration",
            "role": "Distributed neural networks across edge devices",
            "period": "From February 2021",
            "mentors": "Amitava Mukherjee · Arnab Raha",
            "source": "https://drive.google.com/file/d/1GmmebJgvVnRRdYnZWhJHSpcmm_oiQ-RH/view",
            "papers": []
          },
          {
            "place": "Jadavpur University",
            "role": "Research internship, adaptive workload partitioning across edge devices",
            "period": "December 2021–July 2022",
            "mentors": "Arnab Raha",
            "source": "https://de.scribd.com/document/814522585/Arka-Dutta-Resume",
            "papers": []
          }
        ],
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "reviewed",
          "source": "https://www.cicba.in/CICBA_2024/cfp.pdf",
          "note": "Scholar lists CICBA 2023 as the earliest paper. The original CICBA 2023 CFP schedules first-round decisions for December 28, 2022 and final decisions for January 12, 2023. The 2022 application SOP lists this work as submitted; zero accepted full main-conference papers is supported for that application snapshot."
        }
      }
    ]
  },
  {
    "id": "nc-state",
    "name": "North Carolina State University",
    "program": "Computer Science PhD",
    "applicants": [
      {
        "id": "alex-qin",
        "name": "Feiran (Alex) Qin",
        "school": "ShanghaiTech University",
        "year": 2022,
        "major": "Computer Science and Technology",
        "graduationYear": 2023,
        "educationSource": "https://feiranq.in/cv.pdf",
        "source": "https://feiranq.in/cv.pdf",
        "sourceLabel": "CV",
        "research": [
          {
            "place": "University of Illinois Urbana-Champaign",
            "role": "Research internship and exchange, X-Lab · serverless resource sharing",
            "period": "From August 2022",
            "mentors": "Tianyin Xu · Jovan Stojkovic",
            "mentorLabel": "Mentors",
            "source": "https://feiranq.in/cv.pdf",
            "papers": []
          },
          {
            "place": "ShanghaiTech University",
            "role": "ISC Student Cluster Competition, GeekPie HPC · fourth place",
            "period": "2022",
            "source": "https://feiranq.in/cv.pdf",
            "papers": []
          },
          {
            "place": "Deemos",
            "role": "Software engineering internship, 3D model generation platform",
            "period": "October 2021–April 2022",
            "source": "https://feiranq.in/cv.pdf",
            "papers": []
          },
          {
            "place": "AOSC OS",
            "role": "Open-source maintainer",
            "period": "From August 2022",
            "source": "https://feiranq.in/cv.pdf",
            "papers": []
          },
          {
            "place": "Intel",
            "role": "Innovation Hackathon · second place",
            "period": "2020",
            "source": "https://feiranq.in/cv.pdf",
            "papers": []
          }
        ],
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "reviewed",
          "source": "https://feiranq.in/cv.pdf",
          "note": "Personal CV publication list begins ACSOS 2024, after the 2022 application. Avoided same-name security researcher."
        }
      }
    ]
  },
  {
    "id": "buffalo",
    "name": "University at Buffalo",
    "program": "Computer Science PhD",
    "applicants": [
      {
        "id": "ahmed-karim",
        "name": "Ahmed Akib Jawad Karim",
        "school": "North South University",
        "year": 2025,
        "major": "Computer Science and Engineering",
        "graduationYear": 2023,
        "educationSource": "https://sites.google.com/view/akibjawad/home",
        "source": "https://drive.google.com/file/d/1zX96O4ERXsY7mKWttfnXuNR9crvLdFjH/view",
        "research": [
          {
            "place": "BRAC University",
            "role": "Research, language models for healthcare and personnel selection",
            "mentors": "Md. Golam Rabiul Alam",
            "papers": [
              {
                "venue": "PLOS ONE 2025",
                "status": "Accepted",
                "authorship": "First",
                "title": "Larger Models Yield Better Results? Streamlined Severity Classification of ADHD-Related Concerns Using BERT-Based Knowledge Distillation",
                "url": "https://doi.org/10.1371/journal.pone.0315829"
              }
            ]
          },
          {
            "place": "North South University",
            "role": "Undergraduate research, mosquito classification",
            "mentors": "Riasat Khan",
            "source": "https://pubmed.ncbi.nlm.nih.gov/39671336/",
            "papers": [
              {
                "venue": "PLOS Computational Biology 2024",
                "status": "Accepted",
                "authorship": "First",
                "title": "Advanced Vision Transformers and Open-Set Learning for Robust Mosquito Classification: A Novel Approach to Entomological Studies",
                "url": "https://doi.org/10.1371/journal.pcbi.1012654"
              }
            ]
          },
          {
            "place": "North South University",
            "role": "Undergraduate research assistant, natural language processing and machine learning",
            "source": "https://sites.google.com/view/akibjawad/home",
            "papers": []
          },
          {
            "place": "BRAC University",
            "role": "Research collaboration",
            "papers": [
              {
                "venue": "QPAIN 2025",
                "status": "Accepted",
                "authorship": "First",
                "title": "Strengthening False Information Propagation Detection: Leveraging SVM and Sophisticated Text Vectorization Techniques in Comparison to BERT",
                "url": "https://doi.org/10.1109/QPAIN66474.2025.11171942"
              },
              {
                "venue": "ICCIT 2024",
                "status": "Accepted",
                "authorship": "First",
                "title": "Enhancing Multi-Class Disease Classification: Neoplasms, Cardiovascular, Nervous System, and Digestive Disorders Using Advanced LLMs",
                "url": "https://arxiv.org/abs/2411.12712v1"
              }
            ]
          },
          {
            "place": "BRAC University",
            "role": "Research collaboration",
            "mentors": "Md. Golam Rabiul Alam · Zia Uddin",
            "mentorLabel": "Advisor & collaborator",
            "papers": [
              {
                "venue": "IEEE Access",
                "status": "Submitted",
                "year": 2025,
                "authorship": "Second",
                "title": "When LLM Meets Fuzzy-TOPSIS for Personnel Selection through Automated Profile Analysis",
                "url": "https://doi.org/10.1109/ACCESS.2026.3658575"
              },
              {
                "venue": "ICCIT 2024",
                "status": "Accepted",
                "authorship": "First",
                "title": "Automated Personnel Selection for Software Engineers Using LLM-Based Profile Evaluation",
                "url": "https://arxiv.org/abs/2410.23365v1"
              }
            ]
          },
          {
            "place": "BRAC University",
            "role": "Lecturer",
            "period": "From January 2024",
            "source": "https://sites.google.com/view/akibjawad/home",
            "papers": []
          }
        ]
      }
    ]
  },
  {
    "id": "utah",
    "name": "University of Utah",
    "program": "Computer Science PhD",
    "applicants": [
      {
        "id": "aritra-mazumder",
        "name": "Aritra Mazumder",
        "school": "Shahjalal University of Science and Technology",
        "year": 2024,
        "major": "Computer Science and Engineering",
        "graduationYear": 2023,
        "educationSource": "https://aritra741.github.io/",
        "source": "https://drive.google.com/file/d/1AeNKT74r8KDz5Gu77DycFKrHKPXXRSmY/view",
        "research": [
          {
            "place": "Shahjalal University of Science and Technology",
            "role": "Undergraduate thesis, head-based smartphone interaction",
            "mentors": "Khalad Hasan · Farida Chowdhury · Md Forhad Rabbi",
            "source": "https://www.linkedin.com/posts/aritra-mazumder-51088a138_im-super-glad-to-share-that-the-research-activity-7118880674379440128-Xnrq",
            "papers": [
              {
                "venue": "MobiQuitous 2023",
                "status": "Accepted",
                "authorship": "Second",
                "title": "Exploring Optimal Placement of Head-Based Hierarchical Marking Menus on Smartphones",
                "url": "https://link.springer.com/chapter/10.1007/978-3-031-63992-0_25"
              }
            ]
          },
          {
            "place": "Shahjalal University of Science and Technology",
            "role": "Research collaboration, multilingual entity recognition",
            "mentors": "Md Zobaer Hossain",
            "mentorLabel": "With",
            "source": "https://aclanthology.org/2023.semeval-1.114/",
            "papers": [
              {
                "venue": "SemEval 2023",
                "status": "Accepted",
                "authorship": "Equal first",
                "title": "garNER at SemEval-2023: Simplified Knowledge Augmentation for Multilingual Complex Named Entity Recognition",
                "url": "https://aclanthology.org/2023.semeval-1.114/"
              }
            ]
          },
          {
            "place": "Shahjalal University of Science and Technology",
            "role": "ICPC Asia West finalist",
            "period": "2021",
            "source": "https://aritra741.github.io/",
            "papers": []
          },
          {
            "place": "Blue Dot Intel",
            "role": "Founding software engineer",
            "period": "From October 2023",
            "source": "https://www.aritramazumder.com/",
            "papers": []
          },
          {
            "place": "Re:tune",
            "role": "Software engineer",
            "period": "September–October 2023",
            "source": "https://www.aritramazumder.com/",
            "papers": []
          },
          {
            "place": "Daricomma",
            "role": "Founding software engineer",
            "period": "March–September 2023",
            "source": "https://www.aritramazumder.com/",
            "papers": []
          },
          {
            "place": "FindResearch.online",
            "role": "Creator, academic paper search platform",
            "source": "https://drive.google.com/file/d/1AeNKT74r8KDz5Gu77DycFKrHKPXXRSmY/view",
            "papers": []
          },
          {
            "place": "International Islamic University Chittagong",
            "role": "Competitive programming trainer",
            "source": "https://drive.google.com/file/d/1AeNKT74r8KDz5Gu77DycFKrHKPXXRSmY/view",
            "papers": []
          }
        ]
      },
      {
        "id": "david-yue",
        "name": "David Yue",
        "school": "University of Toronto",
        "year": 2024,
        "major": "Computer Science & Mathematics",
        "graduationYear": 2022,
        "educationSource": "https://davidyue.me/",
        "source": "https://docs.google.com/gview?embedded=true&url=https%3A%2F%2Fdavidyue.me%2Fassets%2Fuploads%2Fgraduate_sop%2Futah.pdf",
        "research": [
          {
            "place": "Huawei",
            "role": "Machine learning research engineer",
            "period": "November 2022–June 2024",
            "mentorLabel": "Collaborators",
            "mentors": "Mohammad Akbari · Yong Zhang",
            "source": "https://davidyue.me/",
            "papers": [
              {
                "venue": "AAAI 2025",
                "status": "Accepted",
                "year": 2024,
                "authorship": "Third",
                "title": "Task-Agnostic Language Model Watermarking via High Entropy Passthrough Layers",
                "url": "https://arxiv.org/abs/2412.12563"
              },
              {
                "venue": "ICPR 2024",
                "status": "Accepted",
                "authorship": "Fourth",
                "title": "Primary Key Free Watermarking for Numerical Tabular Datasets in Machine Learning",
                "url": "https://doi.org/10.1007/978-3-031-78119-3_18"
              }
            ]
          },
          {
            "place": "Huawei",
            "role": "Machine learning research engineer",
            "period": "November 2022–June 2024",
            "mentorLabel": "Collaborators",
            "mentors": "Mohammad Akbari · Saeed Ranjbar Alvar · Yong Zhang",
            "source": "https://arxiv.org/abs/2403.05628v2",
            "papers": [
              {
                "venue": "Preprint",
                "status": "Preprint",
                "year": 2024,
                "authorship": "Third",
                "title": "AMUSE: Adaptive Multi-Segment Encoding for Dataset Watermarking",
                "url": "https://arxiv.org/abs/2403.05628v2"
              },
              {
                "venue": "KDD 2023",
                "status": "Accepted",
                "authorship": "Third",
                "title": "NFT-Based Data Marketplace with Digital Watermarking",
                "url": "https://doi.org/10.1145/3580305.3599876"
              }
            ]
          },
          {
            "place": "Huawei",
            "role": "Research, model compression and ML compilers",
            "source": "https://docs.google.com/gview?embedded=true&url=https%3A%2F%2Fdavidyue.me%2Fassets%2Fuploads%2Fgraduate_sop%2Futah.pdf",
            "papers": []
          },
          {
            "place": "University of Toronto",
            "role": "Computer science education research",
            "period": "From 2020",
            "mentors": "Brian Harrington",
            "source": "https://docs.google.com/gview?embedded=true&url=https%3A%2F%2Fdavidyue.me%2Fassets%2Fuploads%2Fgraduate_sop%2Futah.pdf",
            "papers": [
              {
                "venue": "SIGCSE 2023 Poster",
                "status": "Accepted",
                "authorship": "Tenth",
                "title": "Finding and Categorizing COVID-19 Papers in CS Education",
                "url": "https://doi.org/10.1145/3545947.3576288"
              }
            ]
          },
          {
            "place": "University of Toronto",
            "role": "Independent study, programming languages and compilers",
            "mentors": "Thierry Sans",
            "source": "https://docs.google.com/gview?embedded=true&url=https%3A%2F%2Fdavidyue.me%2Fassets%2Fuploads%2Fgraduate_sop%2Futah.pdf",
            "papers": []
          },
          {
            "place": "University of Toronto",
            "role": "Teaching assistant · nominated for Computer and Mathematical Sciences Teaching Assistant Award",
            "source": "https://docs.google.com/gview?embedded=true&url=https%3A%2F%2Fdavidyue.me%2Fassets%2Fuploads%2Fgraduate_sop%2Futah.pdf",
            "papers": []
          },
          {
            "place": "Independent",
            "role": "Compiler optimization project",
            "source": "https://github.com/CoconutJJ/compiler-optimization/tree/master/ir",
            "papers": []
          },
          {
            "place": "Shopify",
            "role": "Software engineer internship",
            "period": "May–August 2021",
            "source": "https://davidyue.me/assets/resume.pdf",
            "papers": []
          },
          {
            "place": "BlackBerry",
            "role": "Software development co-op",
            "period": "May–December 2019",
            "source": "https://davidyue.me/assets/resume.pdf",
            "papers": []
          },
          {
            "place": "Environment and Climate Change Canada",
            "role": "Scientific computing co-op",
            "period": "September–December 2018",
            "source": "https://davidyue.me/assets/resume.pdf",
            "papers": []
          },
          {
            "place": "Ontario Treasury Board Secretariat",
            "role": "SharePoint developer co-op",
            "period": "January–April 2018",
            "source": "https://davidyue.me/assets/resume.pdf",
            "papers": []
          }
        ]
      }
    ]
  },
  {
    "id": "santa-cruz",
    "name": "UC Santa Cruz",
    "program": "Computer Science PhD",
    "applicants": [
      {
        "id": "yiwei-yang",
        "name": "Yiwei Yang",
        "school": "ShanghaiTech University",
        "year": 2021,
        "major": "Computer Science",
        "graduationYear": 2022,
        "educationSource": "https://asplos.dev/pdf/resume.pdf",
        "source": "https://asplos.dev/UCSC.pdf",
        "research": [
          {
            "place": "ShanghaiTech University",
            "role": "Undergraduate research, systems and software security",
            "mentors": "Fu Song",
            "source": "https://asplos.dev/UCSC.pdf",
            "papers": [
              {
                "venue": "ISSTA 2021",
                "status": "Accepted",
                "authorship": "Fourth",
                "title": "Attack as Defense: Characterizing Adversarial Examples using Robustness",
                "url": "https://songfu1983.github.io/publications/ISSTA21.pdf"
              }
            ]
          },
          {
            "place": "ShanghaiTech University",
            "role": "Research, verifying Diem Move smart-contract vulnerabilities with Z3",
            "source": "https://asplos.dev/UCSC.pdf",
            "papers": []
          },
          {
            "place": "ShanghaiTech University",
            "role": "Undergraduate research, persistent memory",
            "mentors": "Chundong Wang",
            "source": "https://asplos.dev/UCSC.pdf",
            "papers": []
          },
          {
            "place": "ShanghaiTech University",
            "role": "Undergraduate teaching assistant, compilers",
            "source": "https://asplos.dev/UCSC.pdf",
            "papers": []
          },
          {
            "place": "ShanghaiTech University",
            "role": "Team lead, GeekPie high-performance computing",
            "source": "https://asplos.dev/UCSC.pdf",
            "papers": []
          },
          {
            "place": "University of Illinois Urbana-Champaign",
            "role": "Research internship, detecting order-dependent test failures with PraDet · with Ruidong Zhu",
            "period": "Summer 2021",
            "mentors": "Darko Marinov · Wing Lam",
            "source": "https://asplos.dev/UCSC.pdf",
            "papers": []
          },
          {
            "place": "Jump Trading",
            "role": "Production engineer internship, Linux team · eBPF and distributed filesystem tracing",
            "period": "July–September 2020",
            "source": "https://asplos.dev/pdf/resume.pdf",
            "papers": []
          }
        ]
      }
    ]
  },
  {
    "id": "vanderbilt",
    "name": "Vanderbilt University",
    "program": "Biomedical Informatics PhD",
    "applicants": [
      {
        "id": "kevin-guo",
        "name": "Kevin Guo",
        "school": "University of Southern California",
        "year": 2024,
        "major": "Computer Science",
        "graduationYear": 2025,
        "educationSource": "https://www.vumc.org/dbmi/person/kevin-guo",
        "source": "https://drive.google.com/file/d/1JHzb0LDZbH98n0ikJfbpZ94hTxu6QaFt/view",
        "research": [
          {
            "place": "University of Southern California",
            "role": "CURVE research fellowship and research assistantship, Irimia Lab · interpretable neuroimaging",
            "mentors": "Andrei Irimia",
            "source": "https://drive.google.com/file/d/1JHzb0LDZbH98n0ikJfbpZ94hTxu6QaFt/view",
            "papers": [
              {
                "venue": "Neuroinformatics 2024",
                "status": "Accepted",
                "authorship": "First",
                "title": "Anatomic Interpretability in Neuroimage Deep Learning: Saliency Approaches for Typical Aging and Traumatic Brain Injury",
                "url": "https://pubmed.ncbi.nlm.nih.gov/39503843/"
              }
            ]
          },
          {
            "place": "Vanderbilt University",
            "role": "Biomedical informatics research internship, split-learning privacy",
            "period": "Summer 2023",
            "mentors": "Bradley Malin",
            "source": "https://drive.google.com/file/d/1JHzb0LDZbH98n0ikJfbpZ94hTxu6QaFt/view",
            "papers": []
          },
          {
            "place": "NASA Ames Research Center",
            "role": "AI and machine learning research internship · air traffic control",
            "period": "2023–2024",
            "mentors": "Stephen Clarke · Krishna Kalyanam",
            "mentorLabel": "Mentors",
            "source": "https://ntrs.nasa.gov/citations/20240007543",
            "papers": [
              {
                "venue": "AIAA Aviation 2024",
                "status": "Accepted",
                "authorship": "First",
                "title": "Inverse Text Normalization of Air Traffic Control System Command Center Planning Telecon Transcriptions",
                "url": "https://ntrs.nasa.gov/citations/20240007543"
              }
            ]
          },
          {
            "place": "Coding Minds Academy",
            "role": "Research, education and accessibility",
            "mentors": "Yu Sun",
            "source": "https://drive.google.com/file/d/1JHzb0LDZbH98n0ikJfbpZ94hTxu6QaFt/view",
            "papers": [
              {
                "venue": "SIP 2022",
                "status": "Accepted",
                "authorship": "Second",
                "title": "LaBelle: A Deep Learning APP that Helps You Learn Ballet",
                "url": "https://csitcp.org/abstract/12/1217csit14"
              }
            ]
          },
          {
            "place": "Coding Minds Academy",
            "role": "Research, simplifying academic texts for young students",
            "mentors": "Yu Sun",
            "source": "https://drive.google.com/file/d/1JHzb0LDZbH98n0ikJfbpZ94hTxu6QaFt/view",
            "papers": []
          },
          {
            "place": "Coding Minds Academy",
            "role": "Instructor and project lead, K–12 computer science",
            "mentors": "Yu Sun",
            "mentorLabel": "Mentor",
            "source": "https://drive.google.com/file/d/1JHzb0LDZbH98n0ikJfbpZ94hTxu6QaFt/view",
            "papers": []
          }
        ]
      }
    ]
  },
  {
    "id": "duke",
    "name": "Duke University",
    "program": "Computer Science PhD",
    "applicants": [
      {
        "id": "thu-00043",
        "name": "我是乔治",
        "school": "Tsinghua University",
        "year": 2024,
        "major": "Computer Science and Finance",
        "educationSource": "https://database.feiyue.online/applicant/Applicant-00043/",
        "source": "https://database.feiyue.online/applicant/Applicant-00043/",
        "sourceLabel": "View application profile",
        "research": [
          {
            "place": "Tsinghua University",
            "role": "Distributed training systems for large language models",
            "papers": [
              {
                "venue": "",
                "status": "Submitted",
                "authorship": "Second",
                "title": "Distributed LLM training paper"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00043/"
          },
          {
            "place": "Summer research",
            "role": "Machine learning systems",
            "papers": [
              {
                "venue": "NeurIPS",
                "status": "Accepted",
                "authorship": "Second",
                "title": "Machine learning systems paper"
              },
              {
                "venue": "",
                "status": "Submitted",
                "authorship": "Equal first",
                "title": "Machine learning systems paper — equal first"
              },
              {
                "venue": "",
                "status": "Submitted",
                "authorship": "Third",
                "title": "Machine learning systems paper — third author"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00043/"
          },
          {
            "place": "Zhipu AI",
            "role": "Internship",
            "papers": [],
            "source": "https://database.feiyue.online/applicant/Applicant-00043/"
          }
        ],
        "program": "Computer Science PhD — admitted"
      }
    ]
  },
  {
    "id": "ista",
    "name": "Institute of Science and Technology Austria",
    "program": "PhD",
    "applicants": [
      {
        "id": "mahyar-karimi",
        "name": "Mahyar Karimi",
        "school": "University of Tehran",
        "year": 2022,
        "major": "Computer Engineering",
        "graduationYear": 2023,
        "educationSource": "https://mahykari.github.io/cv.pdf",
        "source": "https://drive.google.com/file/d/1qX3HlfOOEZk0-NTT_LREt9IFvKuqLId1/view",
        "research": [
          {
            "place": "Institute of Science and Technology Austria",
            "role": "Research internship, fairness monitoring with Markov chains · OeAD research scholarship",
            "period": "July–September 2022",
            "mentors": "Thomas Henzinger · Kaushik Mallik",
            "mentorLabel": "Mentors",
            "source": "https://mahykari.github.io/cv.pdf",
            "papers": [
              {
                "venue": "TACAS 2023",
                "status": "Submitted",
                "year": 2022,
                "authorship": "Second",
                "title": "Monitoring Algorithmic Fairness",
                "url": "https://arxiv.org/abs/2305.15979v1"
              }
            ]
          },
          {
            "place": "University of Tehran",
            "role": "Research assistant, causal verification of concurrent event structures",
            "period": "From 2021",
            "mentors": "Hossein Hojjat · Amir Hossein Seyhani",
            "mentorLabel": "Advisor & collaborator",
            "source": "https://drive.google.com/file/d/1qX3HlfOOEZk0-NTT_LREt9IFvKuqLId1/view",
            "papers": []
          },
          {
            "place": "University of Tehran",
            "role": "Teaching assistant, advanced programming and data structures",
            "period": "2020–2022",
            "source": "https://mahykari.github.io/cv.pdf",
            "papers": []
          },
          {
            "place": "Divar",
            "role": "Software engineer",
            "period": "2022",
            "source": "https://mahykari.github.io/cv.pdf",
            "papers": []
          },
          {
            "place": "Tapsell",
            "role": "Infrastructure internship, Redis query caching",
            "period": "2021",
            "source": "https://mahykari.github.io/cv.pdf",
            "papers": []
          }
        ],
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "reviewed",
          "source": "https://scholar.google.com/citations?hl=en&user=J6Tlj6QAAAAJ",
          "note": "Scholar lists CAV 2023 and FAccT 2023 as the earliest papers. Their submission deadlines were February 3 and February 6, 2023, respectively, after the recorded 2022 application snapshot. Retain the application-era TACAS submission; zero accepted main-conference papers is supported."
        }
      }
    ]
  },
  {
    "id": "northwestern",
    "name": "Northwestern University",
    "program": "Computer Science PhD",
    "applicants": [
      {
        "id": "thu-00020",
        "name": "Luke",
        "school": "Tsinghua University",
        "year": 2022,
        "major": "Electronic Information Science and Technology",
        "educationSource": "https://database.feiyue.online/applicant/Applicant-00020/",
        "source": "https://database.feiyue.online/applicant/Applicant-00020/",
        "sourceLabel": "View application profile",
        "research": [
          {
            "place": "Tsinghua University",
            "role": "Research, computational imaging and computer vision",
            "papers": [],
            "source": "https://database.feiyue.online/applicant/Applicant-00020/"
          },
          {
            "place": "Summer research",
            "role": "Computational imaging and computer vision",
            "papers": [
              {
                "venue": "",
                "status": "Submitted",
                "authorship": "",
                "title": "Summer research paper"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00020/"
          }
        ],
        "program": "Computer Science PhD — admitted",
        "paperReview": {
          "checked": "2026-11-03",
          "count": null,
          "status": "skipped",
          "source": "https://database.feiyue.online/applicant/Applicant-00020/",
          "note": "Alias; further author matching skipped at user request. Publication count remains unknown."
        }
      }
    ]
  },
  {
    "id": "rice",
    "name": "Rice University",
    "program": "Computer Science PhD",
    "applicants": [
      {
        "id": "thu-00043",
        "name": "我是乔治",
        "school": "Tsinghua University",
        "year": 2024,
        "major": "Computer Science and Finance",
        "educationSource": "https://database.feiyue.online/applicant/Applicant-00043/",
        "source": "https://database.feiyue.online/applicant/Applicant-00043/",
        "sourceLabel": "View application profile",
        "research": [
          {
            "place": "Tsinghua University",
            "role": "Distributed training systems for large language models",
            "papers": [
              {
                "venue": "",
                "status": "Submitted",
                "authorship": "Second",
                "title": "Distributed LLM training paper"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00043/"
          },
          {
            "place": "Summer research",
            "role": "Machine learning systems",
            "papers": [
              {
                "venue": "NeurIPS",
                "status": "Accepted",
                "authorship": "Second",
                "title": "Machine learning systems paper"
              },
              {
                "venue": "",
                "status": "Submitted",
                "authorship": "Equal first",
                "title": "Machine learning systems paper — equal first"
              },
              {
                "venue": "",
                "status": "Submitted",
                "authorship": "Third",
                "title": "Machine learning systems paper — third author"
              }
            ],
            "source": "https://database.feiyue.online/applicant/Applicant-00043/"
          },
          {
            "place": "Zhipu AI",
            "role": "Internship",
            "papers": [],
            "source": "https://database.feiyue.online/applicant/Applicant-00043/"
          }
        ],
        "program": "Computer Science PhD — admitted"
      }
    ]
  },
  {
    "id": "chicago",
    "name": "University of Chicago",
    "program": "Computer Science PhD",
    "applicants": [
      {
        "id": "thu-00021",
        "name": "Colin",
        "school": "Tsinghua University",
        "year": 2022,
        "major": "Computer Science and Technology",
        "educationSource": "https://database.feiyue.online/applicant/Applicant-00021/",
        "source": "https://database.feiyue.online/applicant/Applicant-00021/",
        "sourceLabel": "View application profile",
        "research": [
          {
            "place": "Carnegie Mellon University",
            "role": "Research internship, machine learning for systems",
            "papers": [],
            "source": "https://database.feiyue.online/applicant/Applicant-00021/"
          },
          {
            "place": "University of Illinois Urbana-Champaign",
            "role": "Research internship, software engineering for AI",
            "papers": [],
            "source": "https://database.feiyue.online/applicant/Applicant-00021/"
          }
        ],
        "program": "Computer Science PhD — admitted",
        "paperReview": {
          "checked": "2026-11-03",
          "count": null,
          "status": "skipped",
          "source": "https://database.feiyue.online/applicant/Applicant-00021/",
          "note": "Alias; further author matching skipped at user request. Publication count remains unknown."
        }
      },
      {
        "id": "jake-chanenson",
        "name": "Jake Chanenson",
        "school": "Swarthmore College",
        "major": "Computer Science",
        "educationSource": "https://jakec007.github.io/2021-04-19-swatties-guide-applying-cs-programs/",
        "source": "https://jakec007.github.io/2021-04-19-swatties-guide-applying-cs-programs/",
        "sourceLabel": "Application blog",
        "research": [
          {
            "place": "University of Southern California",
            "role": "Research, virtual reality and ethical decision making",
            "source": "https://ieeevr.org/2019/awards/conference_awards.html",
            "papers": [
              {
                "title": "Advancing Ethical Decision Making in Virtual Reality",
                "venue": "IEEE VR 2019 · Poster",
                "status": "Accepted",
                "year": 2019,
                "authorship": "Second",
                "url": "https://doi.org/10.1109/VR.2019.8798151"
              }
            ]
          }
        ],
        "graduationYear": 2021,
        "year": 2020,
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "reviewed",
          "source": "https://jakec007.github.io/CV/",
          "note": "Added 2019 IEEE VR poster paper (two pages), excluded from full-paper count. CHI 2023 and PETS 2025 are later."
        }
      }
    ]
  },
  {
    "id": "utsa",
    "name": "University of Texas at San Antonio",
    "program": "Computer Science PhD",
    "applicants": [
      {
        "id": "abu-noman-sakib",
        "name": "Abu Noman Md Sakib",
        "school": "Khulna University of Engineering and Technology",
        "year": 2024,
        "major": "Computer Science and Engineering",
        "graduationYear": 2022,
        "educationSource": "https://anmspro.github.io/assets/pdf/Resume_of_Abu_Noman_Md_Sakib.pdf",
        "source": "https://drive.google.com/file/d/1xysbmFIwfvQ9Ce2GZ9su5W2tBP9HOeai/view",
        "research": [
          {
            "place": "Khulna University of Engineering and Technology",
            "role": "Research collaboration",
            "papers": [
              {
                "venue": "ICSISCET 2023",
                "status": "Accepted",
                "authorship": "Third",
                "title": "Corn Leaf Disease Identification via Transfer Learning: A Comprehensive Web-Based Solution",
                "url": "https://anmspro.github.io/assets/pdf/papers/Corn%20Leaf%20Disease%20Identification%20via%20Transfer%20Learning%20A%20Comprehensive%20Web-Based%20Solution.pdf"
              },
              {
                "venue": "IJCACI 2023",
                "status": "Accepted",
                "authorship": "Third",
                "title": "An End-to-End Web-Based System for Rice Leaf Disease Classification Using Deep Learning",
                "url": "https://anmspro.github.io/assets/pdf/papers/An%20End-to-End%20Web-Based%20System%20for%20Rice%20Leaf%20Disease%20Classification%20using%20Deep%20Learning.pdf"
              }
            ]
          },
          {
            "place": "Khulna University of Engineering and Technology",
            "role": "Undergraduate thesis, brain hemorrhage imaging",
            "period": "January 2021–April 2022",
            "mentors": "Sk. Mohammad Masudul Ahsan",
            "source": "https://anmspro.github.io/assets/pdf/Resume_of_Abu_Noman_Md_Sakib.pdf",
            "papers": [
              {
                "venue": "STI 2022",
                "status": "Accepted",
                "authorship": "First",
                "title": "Segmentation of Hemorrhagic Areas in Human Brain from CT Scan Images",
                "url": "https://doi.org/10.1109/STI56238.2022.10103333"
              },
              {
                "venue": "ICICTD 2022",
                "status": "Accepted",
                "authorship": "Second",
                "title": "Classification of Brain Hemorrhage Using Deep Learning from CT Scan Images",
                "url": "https://doi.org/10.1007/978-981-19-7528-8_15"
              }
            ]
          },
          {
            "place": "Khulna University of Engineering and Technology",
            "role": "Research collaboration, skin disease classification",
            "mentors": "Md Baharul Islam",
            "mentorLabel": "With",
            "source": "https://scholarscommons.fgcu.edu/esploro/outputs/conferenceProceeding/SkNet-A-Convolutional-Neural-Networks-Based/99384070136906570",
            "papers": [
              {
                "venue": "WSCG 2021",
                "status": "Accepted",
                "authorship": "Third",
                "title": "A Deep CNN Model for Skin Cancer Detection and Classification",
                "url": "https://research.bau.edu.tr/en/publications/a-deep-cnn-model-for-skin-cancer-detection-and-classification-2/"
              },
              {
                "venue": "ICCIT 2020",
                "status": "Accepted",
                "authorship": "Second",
                "title": "SkNet: A Convolutional Neural Networks Based Classification Approach for Skin Cancer Classes",
                "url": "https://anmspro.github.io/assets/pdf/papers/SkNet-%20A%20Convolutional%20Neural%20Networks%20Based%20Classification%20Approach%20for%20Skin%20Cancer%20Classes.pdf"
              },
              {
                "venue": "IPAS 2020",
                "status": "Accepted",
                "authorship": "Second",
                "title": "EczemaNet: A Deep CNN-based Eczema Diseases Classification",
                "url": "https://anmspro.github.io/assets/pdf/papers/EczemaNet-%20A%20Deep%20CNN-based%20Eczema%20Diseases%20Classification.pdf"
              }
            ]
          },
          {
            "place": "Khulna University of Engineering and Technology",
            "role": "Course project, traffic signal violation detection",
            "period": "2019",
            "mentors": "Pias Roy",
            "mentorLabel": "With",
            "source": "https://github.com/anmspro/Traffic-Signal-Violation-Detection-System",
            "papers": []
          },
          {
            "place": "Red.Digital",
            "role": "Software engineer, full-stack HR and streaming platforms",
            "period": "From May 2022",
            "source": "https://anmspro.github.io/assets/pdf/Resume_of_Abu_Noman_Md_Sakib.pdf",
            "papers": []
          },
          {
            "place": "Intelligent Machines",
            "role": "AI internship, image data annotation",
            "period": "2019",
            "source": "https://anmspro.github.io/cv/",
            "papers": []
          }
        ]
      }
    ]
  },
  {
    "id": "umass",
    "name": "UMass Amherst",
    "program": "Computer Science PhD",
    "applicants": [
      {
        "id": "jenna-russell",
        "name": "Jenna Russell",
        "school": "Cornell University",
        "major": "Statistics and Information Science",
        "educationSource": "https://jenna-russell.github.io/",
        "source": "https://jenna-russell.github.io/blog/2024/applying/",
        "sourceLabel": "Application blog",
        "research": [
          {
            "place": "Bank of America",
            "role": "Data scientist, natural language processing research",
            "papers": [],
            "source": "https://jenna-russell.github.io/blog/2024/applying/"
          }
        ],
        "graduationYear": 2021,
        "year": 2023,
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "confirmed",
          "source": "https://jenna-russell.github.io/news/",
          "note": "Author announces first paper in January 2025, after the 2023 application."
        }
      },
      {
        "id": "md-zarif-ul-alam",
        "name": "Md Zarif Ul Alam",
        "school": "Bangladesh University of Engineering and Technology",
        "major": "Computer Science and Engineering",
        "educationSource": "https://zarif98sjs.github.io/",
        "source": "https://github.com/zarif98sjs/how-not-to-do-phd-application",
        "sourceLabel": "Application blog",
        "research": [
          {
            "place": "Carnegie Mellon University",
            "role": "Research internship, Xu Lab",
            "papers": [],
            "mentors": "Min Xu",
            "source": "https://github.com/zarif98sjs/how-not-to-do-phd-application"
          },
          {
            "place": "Chaldal",
            "role": "Machine learning research engineer",
            "papers": [],
            "source": "https://github.com/zarif98sjs/how-not-to-do-phd-application"
          }
        ],
        "year": 2023,
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "reviewed",
          "source": "https://zarif98sjs.github.io/research/",
          "note": "Application-era research includes a Bioinformatics journal project; NeurIPS 2024 work is a workshop. Neither qualifies for the main-conference count."
        }
      },
      {
        "id": "mushtari-sadia",
        "name": "Mushtari Sadia",
        "school": "Bangladesh University of Engineering and Technology",
        "major": "Computer Science and Engineering",
        "educationSource": "https://mushtari-sadia.github.io/",
        "source": "https://mushtari-sadia.github.io/phdapp.html",
        "sourceLabel": "Application blog",
        "research": [
          {
            "place": "Bangladesh University of Engineering and Technology",
            "role": "Undergraduate thesis, advanced persistent threat detection",
            "papers": [
              {
                "title": "LogShield: A Transformer-based Advanced Persistent Threat Detection System Leveraging Self-Attention",
                "venue": "Preprint",
                "authorship": "Equal first",
                "status": "Preprint",
                "year": 2022,
                "url": "https://mushtari-sadia.github.io/phdapp.html"
              }
            ],
            "mentors": "Anindya Iqbal · Shahrear Iqbal",
            "source": "https://mushtari-sadia.github.io/phdapp.html"
          },
          {
            "place": "MIT",
            "role": "Research internship, Camera Culture Group",
            "papers": [],
            "mentors": "Praneeth Vepakomma",
            "source": "https://mushtari-sadia.github.io/phdapp.html"
          },
          {
            "place": "BRAC University",
            "role": "Lecturer, computer science and engineering",
            "papers": [],
            "source": "https://mushtari-sadia.github.io/phdapp.html"
          },
          {
            "place": "Bangladesh University of Engineering and Technology",
            "role": "Adjunct lecturer, computer science and engineering",
            "papers": [],
            "source": "https://mushtari-sadia.github.io/phdapp.html"
          }
        ],
        "graduationYear": 2023,
        "year": 2023,
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "confirmed",
          "source": "https://mushtari-sadia.github.io/phdapp.html",
          "note": "Application blog explicitly states no publications during application and neither security project was published then."
        }
      }
    ]
  },
  {
    "id": "virginia",
    "name": "University of Virginia",
    "program": "Computer Science PhD",
    "applicants": [
      {
        "id": "mushtari-sadia",
        "name": "Mushtari Sadia",
        "school": "Bangladesh University of Engineering and Technology",
        "major": "Computer Science and Engineering",
        "educationSource": "https://mushtari-sadia.github.io/",
        "source": "https://mushtari-sadia.github.io/phdapp.html",
        "sourceLabel": "Application blog",
        "research": [
          {
            "place": "Bangladesh University of Engineering and Technology",
            "role": "Undergraduate thesis, advanced persistent threat detection",
            "papers": [
              {
                "title": "LogShield: A Transformer-based Advanced Persistent Threat Detection System Leveraging Self-Attention",
                "venue": "Preprint",
                "authorship": "Equal first",
                "status": "Preprint",
                "year": 2022,
                "url": "https://mushtari-sadia.github.io/phdapp.html"
              }
            ],
            "mentors": "Anindya Iqbal · Shahrear Iqbal",
            "source": "https://mushtari-sadia.github.io/phdapp.html"
          },
          {
            "place": "MIT",
            "role": "Research internship, Camera Culture Group",
            "papers": [],
            "mentors": "Praneeth Vepakomma",
            "source": "https://mushtari-sadia.github.io/phdapp.html"
          },
          {
            "place": "BRAC University",
            "role": "Lecturer, computer science and engineering",
            "papers": [],
            "source": "https://mushtari-sadia.github.io/phdapp.html"
          },
          {
            "place": "Bangladesh University of Engineering and Technology",
            "role": "Adjunct lecturer, computer science and engineering",
            "papers": [],
            "source": "https://mushtari-sadia.github.io/phdapp.html"
          }
        ],
        "graduationYear": 2023,
        "year": 2023,
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "confirmed",
          "source": "https://mushtari-sadia.github.io/phdapp.html",
          "note": "Application blog explicitly states no publications during application and neither security project was published then."
        }
      }
    ]
  },
  {
    "id": "virginia-tech",
    "name": "Virginia Tech",
    "program": "Computer Science PhD",
    "applicants": [
      {
        "id": "mushtari-sadia",
        "name": "Mushtari Sadia",
        "school": "Bangladesh University of Engineering and Technology",
        "major": "Computer Science and Engineering",
        "educationSource": "https://mushtari-sadia.github.io/",
        "source": "https://mushtari-sadia.github.io/phdapp.html",
        "sourceLabel": "Application blog",
        "research": [
          {
            "place": "Bangladesh University of Engineering and Technology",
            "role": "Undergraduate thesis, advanced persistent threat detection",
            "papers": [
              {
                "title": "LogShield: A Transformer-based Advanced Persistent Threat Detection System Leveraging Self-Attention",
                "venue": "Preprint",
                "authorship": "Equal first",
                "status": "Preprint",
                "year": 2022,
                "url": "https://mushtari-sadia.github.io/phdapp.html"
              }
            ],
            "mentors": "Anindya Iqbal · Shahrear Iqbal",
            "source": "https://mushtari-sadia.github.io/phdapp.html"
          },
          {
            "place": "MIT",
            "role": "Research internship, Camera Culture Group",
            "papers": [],
            "mentors": "Praneeth Vepakomma",
            "source": "https://mushtari-sadia.github.io/phdapp.html"
          },
          {
            "place": "BRAC University",
            "role": "Lecturer, computer science and engineering",
            "papers": [],
            "source": "https://mushtari-sadia.github.io/phdapp.html"
          },
          {
            "place": "Bangladesh University of Engineering and Technology",
            "role": "Adjunct lecturer, computer science and engineering",
            "papers": [],
            "source": "https://mushtari-sadia.github.io/phdapp.html"
          }
        ],
        "graduationYear": 2023,
        "year": 2023,
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "confirmed",
          "source": "https://mushtari-sadia.github.io/phdapp.html",
          "note": "Application blog explicitly states no publications during application and neither security project was published then."
        }
      }
    ]
  },
  {
    "id": "stony-brook",
    "name": "Stony Brook University",
    "program": "Computer Science PhD",
    "applicants": [
      {
        "id": "mushtari-sadia",
        "name": "Mushtari Sadia",
        "school": "Bangladesh University of Engineering and Technology",
        "major": "Computer Science and Engineering",
        "educationSource": "https://mushtari-sadia.github.io/",
        "source": "https://mushtari-sadia.github.io/phdapp.html",
        "sourceLabel": "Application blog",
        "research": [
          {
            "place": "Bangladesh University of Engineering and Technology",
            "role": "Undergraduate thesis, advanced persistent threat detection",
            "papers": [
              {
                "title": "LogShield: A Transformer-based Advanced Persistent Threat Detection System Leveraging Self-Attention",
                "venue": "Preprint",
                "authorship": "Equal first",
                "status": "Preprint",
                "year": 2022,
                "url": "https://mushtari-sadia.github.io/phdapp.html"
              }
            ],
            "mentors": "Anindya Iqbal · Shahrear Iqbal",
            "source": "https://mushtari-sadia.github.io/phdapp.html"
          },
          {
            "place": "MIT",
            "role": "Research internship, Camera Culture Group",
            "papers": [],
            "mentors": "Praneeth Vepakomma",
            "source": "https://mushtari-sadia.github.io/phdapp.html"
          },
          {
            "place": "BRAC University",
            "role": "Lecturer, computer science and engineering",
            "papers": [],
            "source": "https://mushtari-sadia.github.io/phdapp.html"
          },
          {
            "place": "Bangladesh University of Engineering and Technology",
            "role": "Adjunct lecturer, computer science and engineering",
            "papers": [],
            "source": "https://mushtari-sadia.github.io/phdapp.html"
          }
        ],
        "graduationYear": 2023,
        "year": 2023,
        "paperReview": {
          "checked": "2026-11-03",
          "count": 0,
          "status": "confirmed",
          "source": "https://mushtari-sadia.github.io/phdapp.html",
          "note": "Application blog explicitly states no publications during application and neither security project was published then."
        }
      }
    ]
  },
  {
    "id": "notre-dame",
    "name": "University of Notre Dame",
    "program": "Computer Science and Engineering PhD",
    "applicants": [
      {
        "id": "mohammed-latif-siddiq",
        "name": "Mohammed Latif Siddiq",
        "school": "Bangladesh University of Engineering and Technology",
        "year": 2021,
        "major": "Computer Science and Engineering",
        "educationSource": "https://lsiddiqsunny.github.io/public/Mohammed_Latif_Siddiq.pdf",
        "source": "https://lsiddiqsunny.github.io/public/Research%20Statement.pdf",
        "research": [
          {
            "place": "Bangladesh University of Engineering and Technology",
            "role": "Undergraduate thesis, learning-based repair of SQL injection vulnerabilities",
            "papers": [
              {
                "title": "SQLIFIX: Learning Based Approach to Fix SQL Injection Vulnerabilities in Source Code",
                "venue": "SANER 2021",
                "status": "Accepted",
                "year": 2021,
                "authorship": "Equal first",
                "url": "https://doi.org/10.1109/SANER50967.2021.00040"
              }
            ],
            "mentors": "Anindya Iqbal",
            "source": "https://lsiddiqsunny.github.io/public/Research%20Statement.pdf"
          },
          {
            "place": "University of Calgary",
            "role": "Research collaboration, software security flaws in IoT repositories",
            "papers": [],
            "mentors": "Gias Uddin",
            "source": "https://lsiddiqsunny.github.io/public/Research%20Statement.pdf"
          },
          {
            "place": "Auburn University",
            "role": "Research collaboration, clustering questions from MOOCs",
            "papers": [],
            "mentors": "Shubhra Kanti Karmaker",
            "source": "https://lsiddiqsunny.github.io/public/Research%20Statement.pdf"
          },
          {
            "place": "Bangladesh University of Engineering and Technology",
            "role": "Research, user-centered telemedicine design",
            "papers": [
              {
                "title": "Shashthosheba: Dissecting Perception of Bangladeshi People towards Telemedicine Apps through the Lens of Features of the Apps",
                "venue": "CHI",
                "status": "Submitted",
                "year": 2021,
                "authorship": "Fourth",
                "url": "https://lsiddiqsunny.github.io/public/Research%20Statement.pdf"
              }
            ],
            "mentors": "A. B. M. Alim Al Islam",
            "source": "https://lsiddiqsunny.github.io/public/Research%20Statement.pdf"
          },
          {
            "place": "REVE Systems",
            "role": "Junior software engineer, enterprise applications",
            "papers": [],
            "period": "From March 2021",
            "source": "https://lsiddiqsunny.github.io/public/Mohammed_Latif_Siddiq.pdf"
          }
        ],
        "graduationYear": 2021
      }
    ]
  }
];
