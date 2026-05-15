import { BsStarFill } from 'react-icons/bs';

interface Testimonial {
  name: string;
  title: string;
  quote: string;
  initials: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Johnson',
    title: 'CEO, Creative Solutions Inc.',
    quote:
      'Précis has revolutionized the way I handle content research. The summaries are accurate and incredibly useful for my work.',
    initials: 'SJ',
  },
  {
    name: 'David Lee',
    title: 'CEO, Market Insights',
    quote:
      'This tool saves me so much time. I can quickly get the key points from multiple articles and focus on in-depth analysis.',
    initials: 'DL',
  },
  {
    name: 'Emily Zhang',
    title: 'Software Engineer, Tech Innovators',
    quote:
      "I love that Précis is open source. It's a fantastic tool that also allows me to contribute to its development.",
    initials: 'EZ',
  },
  {
    name: 'Maria Gonzalez',
    title: 'Student, University of Knowledge',
    quote:
      'Précis is a lifesaver for my studies. It helps me get through academic papers quickly and efficiently.',
    initials: 'MG',
  },
  {
    name: 'Michael Brown',
    title: 'Digital Marketer, AdVance Marketing',
    quote:
      "Précis helps me stay updated with industry trends without spending hours reading articles. Highly recommend it!",
    initials: 'MB',
  },
  {
    name: 'John Smith',
    title: 'Writer, Self-Employed',
    quote:
      'As a writer, I often need to digest large amounts of information. Précis makes this task much more manageable.',
    initials: 'JS',
  },
];

function Stars() {
  return (
    <div className="flex gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <BsStarFill key={i} className="w-3.5 h-3.5 text-amber-400" aria-hidden="true" />
      ))}
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="card space-y-4 h-full flex flex-col">
      <Stars />
      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed flex-1">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
      <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
          <span className="text-xs font-bold text-white" aria-hidden="true">
            {testimonial.initials}
          </span>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            {testimonial.name}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{testimonial.title}</p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section
      className="page-section border-t border-slate-100 dark:border-slate-900"
      aria-label="Testimonials"
    >
      <div className="page-container">
        <div className="mb-12 text-center space-y-3">
          <span className="badge">Testimonials</span>
          <h2 className="section-title">Loved by readers</h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
            Here&apos;s what others have to say about Précis.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map(testimonial => (
            <TestimonialCard key={testimonial.name} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
