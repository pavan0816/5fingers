import React from "react"
import { Sparkles, Calendar, Wine, Clock, Flame } from "lucide-react"
import { DEGUSTATION_COURSES } from "../data/menuData"

interface DegustationSectionProps {
  onReserveTasting: () => void
}

export const DegustationSection: React.FC<DegustationSectionProps> = ({
  onReserveTasting,
}) => {
  return (
    <section
      className="py-24 px-6 md:px-16 lg:px-24 bg-[var(--night)] text-[var(--ivory)] relative overflow-hidden"
      id="experience"
    >
      {/* Decorative luxury background pattern */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--gold)]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--emerald)]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto">
        {/* Experience Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="eyebrow justify-center mb-3">
            <span />
            <Sparkles className="w-3.5 h-3.5 text-[var(--gold)]" />
            <span>The Chef's Tasting Experience</span>
            <span />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[var(--ivory)] leading-tight">
            The Five Senses{" "}
            <span className="italic text-[var(--gold)]">Degustation</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[var(--muted)] font-light leading-relaxed">
            A seven-course ceremonial progression guided by fire, fragrance, and
            memory. Seated either in our Main Dining Hall or front-row at Chef
            Aarav's Hearth Counter.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 mt-6 pt-6 border-t border-white/10 text-xs tracking-wider uppercase text-[var(--gold)]">
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" /> 2.5 Hour Journey
            </span>
            <span>·</span>
            <span className="flex items-center gap-2">
              <Flame className="w-4 h-4" /> 7 Courses
            </span>
            <span>·</span>
            <span className="font-semibold text-[var(--ivory)]">
              $175 Per Guest
            </span>
            <span>·</span>
            <span className="flex items-center gap-2 text-[var(--muted)]">
              <Wine className="w-4 h-4 text-[var(--gold)]" /> Grand Cru Pairing
              +$95
            </span>
          </div>
        </div>

        {/* Courses Timeline */}
        <div className="space-y-4 mb-16">
          {DEGUSTATION_COURSES.map((course, idx) => (
            <div
              key={course.step}
              className="p-6 sm:p-7 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[var(--gold)]/40 transition-all duration-300 grid md:grid-cols-12 gap-4 items-center group"
            >
              {/* Step indicator */}
              <div className="md:col-span-2">
                <span className="text-[10px] font-mono tracking-widest text-[var(--gold)] uppercase bg-[var(--gold)]/10 px-2.5 py-1 rounded border border-[var(--gold)]/20">
                  {course.step}
                </span>
                <p className="text-xs text-[var(--muted)] mt-1 font-mono">
                  0{idx + 1} / 07
                </p>
              </div>

              {/* Course Title and Description */}
              <div className="md:col-span-6">
                <p className="text-[10px] tracking-widest uppercase text-[var(--muted)]">
                  {course.subtitle}
                </p>
                <h4 className="font-serif text-xl sm:text-2xl text-[var(--ivory)] group-hover:text-[var(--gold)] transition-colors mt-0.5">
                  {course.title}
                </h4>
                <p className="text-xs text-[var(--muted)] font-light mt-1.5 leading-relaxed">
                  {course.description}
                </p>
              </div>

              {/* Wine Pairing */}
              <div className="md:col-span-4 border-t md:border-t-0 md:border-l border-white/10 pt-3 md:pt-0 md:pl-6">
                <span className="text-[9px] uppercase tracking-widest text-[var(--gold)] flex items-center gap-1.5 mb-1 font-medium">
                  <Wine className="w-3.5 h-3.5" /> Sommelier Pairing
                </span>
                <p className="font-serif text-sm text-[var(--ivory)]">
                  {course.pairing}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Reserve Tasting CTA Card */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[rgba(11,73,52,0.8)] to-[rgba(7,26,20,0.95)] border border-[var(--gold)]/40 text-center flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="text-left">
            <span className="text-[10px] uppercase tracking-widest text-[var(--gold)] font-semibold">
              Limited to 24 Covers Per Evening
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-white mt-1">
              Experience the Hearth Counter
            </h3>
            <p className="text-xs text-[var(--muted)] mt-1 max-w-lg font-light">
              Advance reservations required. Dietary preferences accommodated
              with 48 hours notice.
            </p>
          </div>
          <button
            onClick={onReserveTasting}
            className="shrink-0 px-7 py-4 bg-[var(--gold)] text-[var(--night)] font-semibold text-xs uppercase tracking-widest rounded hover:bg-white transition-colors flex items-center gap-3 shadow-lg"
          >
            <Calendar className="w-4 h-4" />
            <span>Reserve Degustation</span>
          </button>
        </div>
      </div>
    </section>
  )
}
