import React from "react"
import { ArrowRight, Flame, Sparkles, Clock, Award } from "lucide-react"

interface HeroProps {
  onOpenReservation: () => void
  onOpenCart: () => void
  onExploreMenu: () => void
}

export const Hero: React.FC<HeroProps> = ({
  onOpenReservation,
  onOpenCart,
  onExploreMenu,
}) => {
  return (
    <section className="hero" id="hero">
      {/* Background imagery with 3D depth */}
      <div
        className="hero-image"
        role="img"
        aria-label="A cinematic fine dining dish on a dark table"
      />
      <div className="dish-layer" />
      <div className="dish-glow" />
      <div className="steam steam-one" />
      <div className="steam steam-two" />
      <div className="ambient" />
      <div className="grain" />
      <div className="botanical botanical-one" />
      <div className="botanical botanical-two" />

      {/* Floating Badges */}
      <div className="absolute top-28 right-6 md:right-16 z-10 hidden sm:flex flex-col gap-2.5 items-end">
        <div className="flex items-center gap-2 bg-[rgba(7,26,20,0.7)] backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[var(--gold)]/30 text-[10px] uppercase tracking-widest text-[var(--gold)] shadow-xl">
          <Award className="w-3.5 h-3.5" />
          <span>Michelin Selected 2026</span>
        </div>
        <div className="flex items-center gap-2 bg-[rgba(7,26,20,0.7)] backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[9px] uppercase tracking-widest text-[var(--muted)]">
          <Clock className="w-3 h-3 text-emerald-400" />
          <span>Dinner Service · 17:30 – 23:00</span>
        </div>
      </div>

      {/* Hero Content */}
      <div className="hero-content">
        <div className="eyebrow">
          <span />
          <Flame className="w-3.5 h-3.5 text-[var(--gold)] animate-pulse" />
          <span>An Extraordinary Dining Experience</span>
        </div>
        <h1>
          <span>
            <i>Good Food.</i>
          </span>
          <span>
            <i>Great Moments.</i>
          </span>
          <span>
            <i>Five Fingers.</i>
          </span>
        </h1>
        <p>
          Discover bold wood-fired flavours, artisanal heirloom spices, and
          unforgettable modern Indian fine dining shaped by fire, memory, and
          heritage.
        </p>

        <div className="hero-actions">
          <button className="primary" onClick={onOpenReservation}>
            <span>Book a table</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button className="secondary" onClick={onExploreMenu}>
            <span>Explore the menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <button className="order-link group" onClick={onOpenCart}>
          <Sparkles className="w-3.5 h-3.5 text-[var(--gold)] group-hover:rotate-12 transition-transform" />
          <span>Order takeaway & delivery</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Chef's Signature Caption */}
      <div className="dish-caption">
        <span>CHEF’S SIGNATURE · 01</span>
        <p>
          Five Spice Braised Lamb
          <br />
          Wood fire · Kashmiri Saffron
        </p>
      </div>

      {/* Scroll indicator cue */}
      <button
        className="scroll-cue cursor-pointer"
        onClick={onExploreMenu}
        aria-label="Scroll to discover signature dishes"
      >
        <span>Scroll to discover</span>
        <i />
      </button>

      <div className="signature">Five senses. One table.</div>
    </section>
  )
}
