import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ExternalLink } from 'lucide-react'

// Case studies data
const projectsData: Record<
  string,
  {
    title: string
    subtitle: string
    tech: string[]
    github: string
    role: string
    timeline: string
    context: string
    constraints: string
    approach: string
    craft: string
    outcome: string
    metrics: { label: string; val: string }[]
  }
> = {
  'flash-sale-engine': {
    title: 'Flash Sale Concurrency Engine',
    subtitle: 'High-Throughput distributed purchase coordinator',
    tech: ['Java', 'Spring Boot', 'PostgreSQL', 'Redis', 'Docker Compose'],
    github: 'https://github.com/0x76hack/Flash-sale-engine',
    role: 'Lead Backend Developer',
    timeline: '3 Months (R&D)',
    context:
      'In high-volume e-commerce flash sales, simultaneous transaction requests overload traditional databases. This leads to double-spending, inventory overselling, and thread pool exhaustion, creating revenue loss and system instability.',
    constraints:
      'The engine had to maintain strict ACID consistency while processing traffic spikes of over 5,000 requests per second. It was limited to standard database resource sizes without scaling costs, utilizing only Docker-based containerized stacks.',
    approach:
      'I evaluated standard database row-level locking (SELECT FOR UPDATE) but discarded it due to extreme database lock contention and connection bottlenecks. Instead, I designed a pre-decoding token bucket flow utilizing Redis-based distributed atomicity. High-velocity requests hit memory first, reserving inventory instantly, and only successful decrements trigger asynchronous database writes.',
    craft:
      'Implemented atomic inventory decrements using Lua scripts inside Redis to guarantee thread-safety. Integrated PostgreSQL persistence via Hibernate with a global transaction manager to resolve rollback integrity. Containerized the entire infrastructure (Java API, PostgreSQL database cluster, Redis sentinel) using Docker Compose for reproducible deployment and local profiling.',
    outcome:
      'Zero inventory oversell events under simulated load tests of 100 concurrent threads. Redis transaction times stabilized at <15ms, reducing database write burden by 85%. Developed an recovery flow that restores inventory tokens back to the cache if a database writing transaction fails.',
    metrics: [
      { label: 'Throughput', val: '5k+ req/sec' },
      { label: 'Cache Latency', val: '< 15ms' },
      { label: 'Oversell Rate', val: '0.00%' },
    ],
  },
  'payflow': {
    title: 'PayFlow Fintech API',
    subtitle: 'Stateless JWT-authenticated transaction broker',
    tech: ['Java', 'Spring Boot', 'Spring Security', 'PostgreSQL', 'JWT', 'Docker'],
    github: 'https://github.com/0x76hack/payflow',
    role: 'Backend Security Engineer',
    timeline: '2 Months (R&D)',
    context:
      'Financial wallet APIs face security vectors including authorization bypass (IDOR) and double-transfer state conflicts. This project focuses on designing a production-style transaction ledger that secures wallet operations and guarantees transaction integrity.',
    constraints:
      'The API needed stateless authorization checks on every endpoint, strict request-response DTO validation, and transaction safety across multiple ledger entries without introducing deadlocks.',
    approach:
      'Configured Spring Security to intercept request headers, validating RS256 signature tokens statelessly. I chose DTO patterns for strict API contracts, using validation annotations to reject malformed JSON before the controllers execute logic. Ledgers are written using Spring @Transactional block wrappers to enforce isolated ACID guarantees.',
    craft:
      'Engineered wallet double-entry bookkeeping schemas where every debit has an equal credit. Implemented stateless JWT filters using BCrypt password hashing logic for user registration and auth. Developed a global exception handler that sanitizes error payloads, preventing stack traces or DB schema names from leaking to client interfaces.',
    outcome:
      'Fully secure, validation-tested banking REST API. Prevented negative-balance transfers through database constraints and validations. Achieved zero information leaks during automated threat audits of endpoints.',
    metrics: [
      { label: 'Auth Latency', val: '8ms' },
      { label: 'Fail Safe', val: '100% Rollback' },
      { label: 'Threat Audit', val: 'OWASP Clean' },
    ],
  },
}

export function generateStaticParams() {
  return [{ slug: 'flash-sale-engine' }, { slug: 'payflow' }]
}

interface CaseStudyProps {
  params: Promise<{ slug: string }>
}

export default async function CaseStudyPage({ params }: CaseStudyProps) {
  const { slug } = await params
  const project = projectsData[slug]

  if (!project) {
    notFound()
  }

  return (
    <div className="w-full max-w-5xl mx-auto px-6 md:px-12 py-12 md:py-24 font-sans">
      {/* Back Button */}
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 text-xs text-fg-secondary hover:text-brand-accent transition-colors mb-12 focus-visible:outline-2 focus-visible:outline-brand-accent"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Projects
      </Link>

      {/* Case Study Header */}
      <header className="border-b border-white/5 pb-12 mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 relative">
        <div className="max-w-3xl space-y-4">
          <span className="font-mono text-xs text-brand-accent uppercase tracking-widest block">Systems Architecture</span>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-medium tracking-wide leading-none text-white uppercase">
            {project.title}
          </h1>
          <p className="text-sm sm:text-base text-fg-secondary">
            {project.subtitle}
          </p>
        </div>

        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 border border-brand-accent text-brand-accent hover:bg-brand-accent/10 rounded-xl font-medium text-xs tracking-wider uppercase transition-colors flex items-center gap-2 w-full md:w-auto justify-center cursor-pointer shadow-md"
        >
          <span>View Source Code</span>
          <ExternalLink className="w-4 h-4" />
        </a>
      </header>

      {/* Grid: Sidebar + Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8 lg:border-r lg:border-white/5 lg:pr-8">
          {/* Metadata Block */}
          <div className="bg-[#111317]/60 border border-white/5 rounded-2xl p-6 space-y-5 text-xs relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-accent/5 to-transparent rounded-2xl pointer-events-none" />
            <span className="text-brand-accent font-semibold block uppercase tracking-widest font-mono text-[10px]">Project Details</span>
            <div>
              <div className="text-fg-muted font-mono text-[9px] uppercase tracking-wider">Role</div>
              <div className="text-white font-medium mt-0.5 text-sm">{project.role}</div>
            </div>
            <div>
              <div className="text-fg-muted font-mono text-[9px] uppercase tracking-wider">Timeline</div>
              <div className="text-white font-medium mt-0.5 text-sm">{project.timeline}</div>
            </div>
            <div>
              <div className="text-fg-muted font-mono text-[9px] uppercase tracking-wider">Technologies</div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {project.tech.map((t) => (
                  <span key={t} className="bg-[#090a0c] px-2 py-1 border border-white/5 rounded text-[10px] text-fg-secondary font-mono">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Metrics */}
          <div className="bg-[#111317]/60 border border-white/5 rounded-2xl p-6 space-y-6 relative shadow-lg">
            <span className="text-brand-accent font-mono text-[10px] font-semibold block uppercase tracking-widest">Project Impact</span>
            <div className="space-y-4">
              {project.metrics.map((m) => (
                <div key={m.label} className="border-b border-white/5 pb-3 last:border-0 last:pb-0">
                  <div className="text-[10px] text-fg-secondary font-semibold uppercase font-mono">{m.label}</div>
                  <div className="text-3xl text-white mt-1 font-bold font-display tracking-tight">{m.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-8 space-y-16 text-xs sm:text-sm leading-relaxed text-fg-secondary">
          {/* 1. Context */}
          <section className="space-y-4 border-b border-white/5 pb-10">
            <h2 className="font-display text-2xl font-medium text-white uppercase">
              1. Context
            </h2>
            <p className="font-sans leading-relaxed">{project.context}</p>
          </section>

          {/* 2. Constraints */}
          <section className="space-y-4 border-b border-white/5 pb-10">
            <h2 className="font-display text-2xl font-medium text-white uppercase">
              2. Constraints
            </h2>
            <p className="font-sans leading-relaxed">{project.constraints}</p>
          </section>

          {/* 3. Approach */}
          <section className="space-y-4 border-b border-white/5 pb-10">
            <h2 className="font-display text-2xl font-medium text-white uppercase">
              3. Approach
            </h2>
            <p className="font-sans leading-relaxed">{project.approach}</p>
          </section>

          {/* 4. Craft */}
          <section className="space-y-4 border-b border-white/5 pb-10">
            <h2 className="font-display text-2xl font-medium text-white uppercase">
              4. Craft
            </h2>
            <p className="font-sans leading-relaxed">{project.craft}</p>
          </section>

          {/* 5. Outcome */}
          <section className="space-y-4">
            <h2 className="font-display text-2xl font-medium text-white uppercase">
              5. Outcome
            </h2>
            <p className="font-sans leading-relaxed">{project.outcome}</p>
          </section>
        </div>
      </div>
    </div>
  )
}
