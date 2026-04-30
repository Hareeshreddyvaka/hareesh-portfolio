import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { usePortfolioData } from '../hooks/usePortfolioData';

const sectionLabelClassName = 'text-xs uppercase tracking-[0.28em] text-white/40';
const sectionHeadingClassName = 'mt-4 text-3xl font-bold text-white';
const panelClassName = 'relative z-10 mx-auto w-full max-w-6xl px-5 py-16 sm:px-6';

function SectionShell({
  id,
  label,
  title,
  children,
}: {
  id: string;
  label: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-white/8 first:border-t-0">
      <div className={panelClassName}>
        <p className={sectionLabelClassName}>{label}</p>
        <h2 className={sectionHeadingClassName}>{title}</h2>
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

export default function MobilePortfolio() {
  const { data } = usePortfolioData();

  if (!data) {
    return null;
  }

  const { personal, projects, skills, education, certifications } = data;

  return (
    <main className="mobile-portfolio relative min-h-screen overflow-x-hidden bg-[#050510] text-white">
      <div className="progressive-fallback__stars mobile-starfield absolute inset-0" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 h-64 bg-[radial-gradient(circle_at_top,_rgba(58,134,255,0.16),_transparent_60%)]" aria-hidden="true" />

      <section
        id="hero"
        className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-5 py-20 sm:px-6"
      >
        <p className={sectionLabelClassName}>01 / About</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-bold leading-tight text-white sm:text-5xl">
          {personal.name}
        </h1>
        <p className="mt-5 max-w-3xl text-lg text-white/72">{personal.title}</p>
        <p className="mt-6 max-w-2xl text-base leading-7 text-white/58">{personal.bio}</p>

        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={`mailto:${personal.email}`}
            className="inline-flex items-center gap-2 rounded-md border border-white/12 bg-white/6 px-4 py-2 text-sm text-white transition-colors hover:border-white/20 hover:bg-white/10"
          >
            <Mail size={16} />
            Email
          </a>
          {personal.social.github ? (
            <a
              href={personal.social.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-white/12 bg-white/6 px-4 py-2 text-sm text-white transition-colors hover:border-white/20 hover:bg-white/10"
            >
              <Github size={16} />
              GitHub
            </a>
          ) : null}
          {personal.social.linkedin ? (
            <a
              href={personal.social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-white/12 bg-white/6 px-4 py-2 text-sm text-white transition-colors hover:border-white/20 hover:bg-white/10"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
          ) : null}
          {personal.social.twitter ? (
            <a
              href={personal.social.twitter}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-md border border-white/12 bg-white/6 px-4 py-2 text-sm text-white transition-colors hover:border-white/20 hover:bg-white/10"
            >
              <Twitter size={16} />
              X
            </a>
          ) : null}
        </div>
      </section>

      <SectionShell id="projects" label="02 / Projects" title="Selected Work">
        <div className="grid gap-4">
          {projects.map((project) => (
            <article
              key={project.id}
              className="rounded-lg border border-white/10 bg-[#0b0b18]/90 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
            >
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/60">{project.description}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((technology) => (
                    <span
                      key={technology}
                      className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/72"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="skills" label="03 / Skills" title="Technical Strengths">
        <div className="grid gap-6">
          {skills.map((category) => (
            <section key={category.category} className="rounded-lg border border-white/10 bg-[#0b0b18]/80 p-5">
              <h3 className="text-lg font-semibold text-white">{category.category}</h3>
              <div className="mt-5 space-y-4">
                {category.items.map((skill) => (
                  <div key={skill.name}>
                    <div className="mb-2 flex items-center justify-between gap-4 text-sm">
                      <span className="text-white/80">{skill.name}</span>
                      <span className="shrink-0 text-white/45">{skill.level}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-white/8">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-[#9D4EDD] to-[#3A86FF] transition-[width] duration-700 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="education" label="04 / Education" title="Education & Certifications">
        <div className="grid gap-4">
          <article className="rounded-lg border border-white/10 bg-[#0b0b18]/90 p-5">
            <h3 className="text-xl font-semibold text-white">{education.school}</h3>
            <p className="mt-2 text-white/72">{education.degree}</p>
            {education.specialization ? (
              <p className="mt-1 text-sm text-white/52">{education.specialization}</p>
            ) : null}
            <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-white/58">
              <div>
                <p className="text-white/35">Duration</p>
                <p className="mt-1 text-white/78">
                  {education.startYear} - {education.endYear}
                </p>
              </div>
              {education.cgpa ? (
                <div>
                  <p className="text-white/35">CGPA</p>
                  <p className="mt-1 text-white/78">{education.cgpa}</p>
                </div>
              ) : null}
              {education.credits ? (
                <div>
                  <p className="text-white/35">Credits</p>
                  <p className="mt-1 text-white/78">{education.credits}</p>
                </div>
              ) : null}
              {education.semester ? (
                <div>
                  <p className="text-white/35">Semester</p>
                  <p className="mt-1 text-white/78">{education.semester}</p>
                </div>
              ) : null}
            </div>
          </article>

          {certifications.map((certification) => (
            <article key={certification.id} className="rounded-lg border border-white/10 bg-[#0b0b18]/80 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">{certification.title}</h3>
                  <p className="mt-1 text-sm text-white/55">
                    {certification.issuer} · {certification.date}
                  </p>
                </div>
              </div>
              {certification.description ? (
                <p className="mt-4 text-sm leading-6 text-white/60">{certification.description}</p>
              ) : null}
            </article>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="contact" label="05 / Contact" title="Get In Touch">
        <div className="rounded-lg border border-white/10 bg-[#0b0b18]/90 p-5">
          <p className="max-w-2xl text-sm leading-6 text-white/60">
            Open to AI/ML engineering, full-stack product work, and collaborative builds that need strong
            implementation discipline.
          </p>
          <div className="mt-8 space-y-3 text-sm text-white/78">
            <a href={`mailto:${personal.email}`} className="block break-all transition-colors hover:text-white">
              {personal.email}
            </a>
            {personal.social.github ? (
              <a href={personal.social.github} target="_blank" rel="noreferrer" className="block transition-colors hover:text-white">
                {personal.social.github}
              </a>
            ) : null}
            {personal.social.linkedin ? (
              <a href={personal.social.linkedin} target="_blank" rel="noreferrer" className="block transition-colors hover:text-white">
                {personal.social.linkedin}
              </a>
            ) : null}
            {personal.social.twitter ? (
              <a href={personal.social.twitter} target="_blank" rel="noreferrer" className="block transition-colors hover:text-white">
                {personal.social.twitter}
              </a>
            ) : null}
          </div>
        </div>
      </SectionShell>
    </main>
  );
}
