import { PERSONAL_INFO } from '../constants';
export default function Hero() {
  return <section id="home" className="hero wrap">
    <div className="hero-copy"><div className="eyebrow"><span className="status-dot" /> SOFTWARE DEVELOPER · NEW YORK</div>
      <h1>Thoughtful code.<br /><em>Real-world</em><br />impact.</h1>
      <p className="intro">I’m Rasel. I build the APIs, workflows, and web experiences that help healthcare teams get things done.</p>
      <div className="hero-actions"><a className="button primary" href="#projects">Explore my work <span aria-hidden="true">↗</span></a><a className="text-link" href={PERSONAL_INFO.resumeUrl} target="_blank" rel="noreferrer">View résumé <span aria-hidden="true">↗</span></a></div>
      <div className="current-role"><span className="role-mark" aria-hidden="true">+</span><div><span>Currently building at</span><strong>{PERSONAL_INFO.company}</strong></div><span className="role-arrow" aria-hidden="true">↗</span></div>
    </div>
    <div className="system-stage" aria-label="Illustration of my backend focus: REST APIs, asynchronous jobs, databases, and cloud integrations">
      <div className="stage-orbit orbit-one" /><div className="stage-orbit orbit-two" />
      <div className="stage-heading"><span>+</span> FROM REQUEST TO REAL IMPACT <span>+</span></div>
      <div className="system-core"><span className="core-icon" aria-hidden="true">⌘</span><span className="mono">THE ENGINEERING LAYER</span><strong>Built to connect.</strong><p>Thoughtful systems.<br />Connected workflows.</p><div className="core-line" /><span className="core-caption">PYTHON + FASTAPI</span></div>
      <div className="system-node node-api"><span className="node-symbol" aria-hidden="true">↔</span><div><strong>REST APIs</strong><span>FastAPI · Python</span></div><i /></div>
      <div className="system-node node-jobs"><span className="node-symbol" aria-hidden="true">≋</span><div><strong>Async workflows</strong><span>Celery · Redis</span></div><i /></div>
      <div className="system-node node-data"><span className="node-symbol" aria-hidden="true">▤</span><div><strong>Connected data</strong><span>Azure SQL · SQLAlchemy</span></div><i /></div>
      <div className="stage-footer"><span className="status-dot" /> BACKEND · CLOUD · FULL STACK</div>
    </div>
    <div className="hero-bottom"><span>Engineering with purpose. Security by design.</span><a href="#experience">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a></div>
  </section>;
}
