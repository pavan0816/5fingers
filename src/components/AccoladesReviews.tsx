import React, { useState } from "react"
import {
  Sparkles,
  Star,
  Award,
  ChevronLeft,
  ChevronRight,
  Quote,
} from "lucide-react"

const PRESS_ACCOLADES = [
  {
    source: "MICHELIN GUIDE",
    year: "2026 SELECTION",
    quote:
      "A triumphant marriage of ancestral clay oven pyrotechnics with rare single-origin Kashmiri spices. The Five Spice Lamb Shank is an instant classic.",
    badge: "Inspectors’ Favorite",
  },
  {
    source: "FORBES LIFE",
    year: "GLOBAL DINING",
    quote:
      "5 Fingers turns modern Indian gastronomy into high sensory theatre without ever sacrificing the warmth and generosity of traditional hearth hospitality.",
    badge: "Top 10 New Restaurants",
  },
  {
    source: "WORLD’S 50 BEST",
    year: "DISCOVERY PROGRAM",
    quote:
      "Chef Aarav Kapoor’s reverence for living charcoal elevates every bite into pure alchemy. The seven-course degustation is an indispensable voyage.",
    badge: "Culinary Discovery",
  },
]

const GUEST_REVIEWS = [
  {
    name: "Julian Sterling & Eleanor Vance",
    occasion: "Anniversary Dinner",
    rating: 5,
    text: "Without doubt the most memorable culinary evening we have experienced in years. The smoke on the Morel kulcha and the buttery nuance of the Black Cod was extraordinary.",
    date: "March 2026",
  },
  {
    name: "Chef Marcus Dubois",
    occasion: "Chef’s Table Degustation",
    rating: 5,
    text: "As a fellow chef, I was stunned by the balance of heat, floral aromatics, and deep caramelization. The wine pairings were impeccable.",
    date: "February 2026",
  },
  {
    name: "Priya & Rahul Mehta",
    occasion: "Family Celebration",
    rating: 5,
    text: "Every bite transported us back to ancestral feasts, yet with the finesse and elegance of a three-star kitchen. The staff treated us like royalty.",
    date: "January 2026",
  },
]

export const AccoladesReviews: React.FC = () => {
  const [currentReview, setCurrentReview] = useState(0)

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % GUEST_REVIEWS.length)
  }

  const prevReview = () => {
    setCurrentReview(
      (prev) => (prev - 1 + GUEST_REVIEWS.length) % GUEST_REVIEWS.length,
    )
  }

  return (
    <section
      className="py-24 px-6 md:px-16 lg:px-24 bg-[var(--night)] text-[var(--ivory)] relative overflow-hidden"
      id="reviews"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="eyebrow justify-center mb-3">
            <span />
            <Sparkles className="w-3.5 h-3.5 text-[var(--gold)]" />
            <span>Critic Acclaim & Guest Reflections</span>
            <span />
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif text-[var(--ivory)]">
            Recognized by the World's Finest
          </h2>
        </div>

        {/* Press Accolades Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {PRESS_ACCOLADES.map((item) => (
            <div
              key={item.source}
              className="p-8 rounded-xl bg-gradient-to-b from-white/[0.04] to-white/[0.01] border border-[rgba(214,183,119,0.25)] flex flex-col justify-between hover:border-[var(--gold)]/60 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="font-serif text-sm tracking-widest text-[var(--gold)] font-bold">
                      {item.source}
                    </span>
                    <p className="text-[9px] uppercase tracking-widest text-[var(--muted)]">
                      {item.year}
                    </p>
                  </div>
                  <Award className="w-5 h-5 text-[var(--gold)]" />
                </div>
                <p className="text-xs sm:text-sm text-[var(--ivory)] italic font-serif leading-relaxed">
                  "{item.quote}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-wider text-[var(--gold)]">
                  {item.badge}
                </span>
                <div className="flex text-[var(--gold)]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Guest Carousel */}
        <div className="max-w-4xl mx-auto p-8 sm:p-12 rounded-2xl bg-white/[0.02] border border-white/10 relative">
          <Quote className="w-12 h-12 text-[var(--gold)]/20 absolute top-6 left-6 pointer-events-none" />

          <div className="relative z-10 text-center">
            {/* Stars */}
            <div className="flex items-center justify-center gap-1 text-[var(--gold)] mb-4">
              {[...Array(GUEST_REVIEWS[currentReview].rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>

            <p className="font-serif text-lg sm:text-2xl text-[var(--ivory)] leading-relaxed italic max-w-2xl mx-auto">
              "{GUEST_REVIEWS[currentReview].text}"
            </p>

            <div className="mt-6">
              <h4 className="font-serif text-base text-[var(--gold)]">
                {GUEST_REVIEWS[currentReview].name}
              </h4>
              <p className="text-[11px] text-[var(--muted)] uppercase tracking-wider mt-0.5">
                {GUEST_REVIEWS[currentReview].occasion} ·{" "}
                {GUEST_REVIEWS[currentReview].date}
              </p>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prevReview}
                aria-label="Previous review"
                className="p-2.5 rounded-full border border-white/20 hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="flex gap-1.5">
                {GUEST_REVIEWS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentReview(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      currentReview === i
                        ? "w-6 bg-[var(--gold)]"
                        : "bg-white/20"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextReview}
                aria-label="Next review"
                className="p-2.5 rounded-full border border-white/20 hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-16 pt-12 border-t border-white/10 text-center">
          <div>
            <p className="text-3xl font-serif text-[var(--gold)]">4.9 / 5</p>
            <p className="text-[10px] uppercase tracking-widest text-[var(--muted)] mt-1">
              1,400+ Verified Diners
            </p>
          </div>
          <div>
            <p className="text-3xl font-serif text-[var(--gold)]">100%</p>
            <p className="text-[10px] uppercase tracking-widest text-[var(--muted)] mt-1">
              Open Woodfire Embers
            </p>
          </div>
          <div>
            <p className="text-3xl font-serif text-[var(--gold)]">1,200+</p>
            <p className="text-[10px] uppercase tracking-widest text-[var(--muted)] mt-1">
              Sommelier Wine Vault
            </p>
          </div>
          <div>
            <p className="text-3xl font-serif text-[var(--gold)]">Michelin</p>
            <p className="text-[10px] uppercase tracking-widest text-[var(--muted)] mt-1">
              Recommended Guide
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
