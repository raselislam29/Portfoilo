import { CERTIFICATIONS } from '../constants';
export default function Certifications() {
  return <section id="certificates" className="credentials wrap"><div className="credentials-heading"><p className="eyebrow">CONTINUED LEARNING</p><h2>Credentials that inform my work.</h2></div><div className="cert-grid">{CERTIFICATIONS.map(cert => <article key={cert.title} className="cert-card"><span className="cert-issuer">{cert.issuer}</span><h3>{cert.title}</h3><div><span>{cert.date}</span>{cert.link && <a href={cert.link} target="_blank" rel="noreferrer" aria-label={`View ${cert.title} credential`}>View ↗</a>}</div></article>)}</div></section>;
}
