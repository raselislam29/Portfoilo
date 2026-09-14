import { EXPERIENCE } from '../constants';
export default function Experience() {
  const job = EXPERIENCE[0];
  return <section id="experience" className="section wrap"><div className="section-top"><div><p className="eyebrow">01 / CURRENT CHAPTER</p><h2>Software with a purpose.</h2></div><span className="section-aside">Healthcare technology, built with care.</span></div>
    <article className="experience-card"><div className="job-summary"><span className="label">CURRENT ROLE</span><h3>{job.role}</h3><p>{job.company}</p><span className="job-period">{job.period}</span><div className="tags"><span>Python</span><span>FastAPI</span><span>Azure</span></div></div><div className="job-details"><p>{job.description}</p><ul>{job.highlights?.map((item, index) => <li key={item}><span className="mono">0{index + 1}</span>{item}</li>)}</ul></div></article>
  </section>;
}
