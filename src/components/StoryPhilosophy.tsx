import React, { useState } from "react"
import {
  Sparkles,
  Flame,
  Wind,
  Droplets,
  Mountain,
  Compass,
  Award,
} from "lucide-react"

const ELEMENTS = [
  {
    finger: "Thumb",
    sanskrit: "Akasha",
    element: "Space",
    icon: Compass,
    culinary: "The Canvas of Silence",
    desc: "The spacious void in which subtle aromas expand before the first bite reaches the lips.",
  },
  {
    finger: "Index",
    sanskrit: "Vayu",
    element: "Air",
    icon: Wind,
    culinary: "Breath & Fragrance",
    desc: "Volatile essential oils from crushed whole spices, cardamom pods, and saffron steam.",
  },
  {
    finger: "Middle",
    sanskrit: "Agni",
    element: "Fire",
    icon: Flame,
    culinary: "The Woodfire Hearth",
    desc: "Living coals of aged ironwood, smoking clay tandoors, and deep caramelization of fats.",
  },
  {
    finger: "Ring",
    sanskrit: "Jala",
    element: "Water",
    icon: Droplets,
    culinary: "Nectar & Velvets",
    desc: "Silken 24-hour broths, rich bone marrow jus, and fermented coconut kokum reductions.",
  },
  {
    finger: "Little",
    sanskrit: "Prithvi",
    element: "Earth",
    icon: Mountain,
    culinary: "Roots & Heritage",
    desc: "Stone-milled heritage grains, wild Himalayan morels, and nutrient-dense farm harvests.",
  },
]

export const StoryPhilosophy: React.FC = () => {
  const [activeElement, setActiveElement] = useState(2) // Default to Agni / Fire

  return (
    <section
      className="py-28 px-6 md:px-16 lg:px-24 bg-[var(--night)] text-[var(--ivory)] relative overflow-hidden"
      id="story"
    >
      {/* Background glow and subtle watermark */}
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-[var(--emerald)]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[var(--gold)]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <div className="eyebrow justify-center mb-4">
            <span />
            <Sparkles className="w-3.5 h-3.5 text-[var(--gold)]" />
            <span>Ancestral Flame · Modern Sensibility</span>
            <span />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight leading-tight">
            The Philosophy of the{" "}
            <span className="text-[var(--gold)] italic">Five Fingers</span>
          </h2>
          <p className="mt-5 text-sm sm:text-base text-[var(--muted)] leading-relaxed font-light">
            In our heritage, eating with the hands is an act of communion. Each
            finger channels an element of nature, transforming dining from
            sustenance into an awakened sensory ritual.
          </p>
        </div>

        {/* The 5 Interactive Element Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-20">
          {ELEMENTS.map((el, idx) => {
            const Icon = el.icon
            const isActive = activeElement === idx
            return (
              <div
                key={el.finger}
                onClick={() => setActiveElement(idx)}
                className={`cursor-pointer p-5 sm:p-6 rounded-lg transition-all duration-300 relative border ${
                  isActive
                    ? "bg-gradient-to-b from-[var(--emerald)]/40 to-[var(--forest)]/80 border-[var(--gold)] shadow-xl shadow-[var(--emerald)]/30 scale-105"
                    : "bg-white/[0.03] border-white/10 hover:border-white/20 hover:bg-white/[0.06]"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-2.5 rounded-full ${
                      isActive
                        ? "bg-[var(--gold)] text-[var(--night)]"
                        : "bg-white/10 text-[var(--gold)]"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-[var(--muted)] uppercase">
                    0{idx + 1}
                  </span>
                </div>
                <h3 className="font-serif text-lg text-[var(--ivory)]">
                  {el.element}
                </h3>
                <p className="text-[10px] tracking-widest uppercase text-[var(--gold)] mt-0.5">
                  {el.sanskrit}
                </p>
                <p className="text-xs text-[var(--muted)] mt-2 font-light">
                  {el.culinary}
                </p>
                {isActive && (
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[var(--gold)] rotate-45" />
                )}
              </div>
            )
          })}
        </div>

        {/* Active Element Deep Dive Banner */}
        <div className="p-8 sm:p-10 rounded-xl bg-gradient-to-r from-[rgba(11,43,32,0.9)] to-[rgba(7,26,20,0.95)] border border-[rgba(214,183,119,0.3)] backdrop-blur-md mb-24 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <span className="text-[10px] tracking-widest uppercase text-[var(--gold)] font-medium">
              Culinary Translation
            </span>
            <h4 className="text-2xl sm:text-3xl font-serif text-[var(--ivory)] mt-1 mb-3">
              {ELEMENTS[activeElement].element} (
              {ELEMENTS[activeElement].sanskrit}) —{" "}
              {ELEMENTS[activeElement].culinary}
            </h4>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              {ELEMENTS[activeElement].desc} In our open hearth kitchen, every
              plate is tuned to honor this balance: smoky embers, lively
              botanical reductions, and the grounded comfort of heritage grains.
            </p>
          </div>
          <div className="lg:col-span-4 flex items-center justify-start lg:justify-end gap-3 text-xs text-[var(--gold)] border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-8">
            <Flame className="w-5 h-5 text-[var(--gold)] shrink-0" />
            <span>Living Charcoal & Heritage Spices in Every Dish</span>
          </div>
        </div>

        {/* Chef Aarav Kapoor Feature & Kitchen Craft */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-lg overflow-hidden border border-[rgba(214,183,119,0.3)] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=1200&q=88"
                alt="Executive Chef preparing dish at the hearth"
                className="w-full h-[450px] sm:h-[520px] object-cover filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--night)] via-transparent to-transparent opacity-80" />

              <div className="absolute bottom-6 left-6 right-6 p-4 rounded bg-black/60 backdrop-blur-md border border-white/10">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-[var(--gold)] shrink-0" />
                  <div>
                    <h5 className="font-serif text-base text-[var(--ivory)]">
                      Chef Aarav Kapoor
                    </h5>
                    <p className="text-[11px] text-[var(--muted)]">
                      Executive Chef & Culinary Director · Ex-Gymkhana & Eleven
                      Madison Park
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Accent badge */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 p-6 rounded bg-[var(--emerald)] border border-[var(--gold)]/40 text-center shadow-xl">
              <p className="text-3xl font-serif text-[var(--gold)]">16+</p>
              <p className="text-[9px] uppercase tracking-widest text-white/80 mt-1">
                Years Perfecting
                <br />
                Woodfire Craft
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="eyebrow">
              <span />
              <span>The Culinary Director</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-serif leading-snug">
              "Cooking over wood fire is not a technique; it is a conversation
              with time."
            </h3>
            <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed font-light">
              Trained in the classical hearths of Lucknow and the multi-starred
              kitchens of Europe, Chef Aarav returned to the fundamental origin
              of dining: the warmth of honest fire, the restorative power of
              whole spices roasted to order, and dishes meant to evoke visceral
              memories.
            </p>
            <p className="text-sm text-[var(--muted)] leading-relaxed font-light">
              Every sauce at 5 Fingers is simmered for over 18 hours in
              handcrafted heavy brass vessels. Our saffron is harvested by hand
              in Pampore, Kashmir, and our charcoal is sustainably coppiced oak
              and ironwood.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-4 border-t border-white/10">
              <div>
                <p className="text-2xl font-serif text-[var(--gold)]">100%</p>
                <p className="text-[10px] uppercase tracking-widest text-[var(--muted)] mt-1">
                  Ironwood Charcoal
                </p>
              </div>
              <div>
                <p className="text-2xl font-serif text-[var(--gold)]">24hr</p>
                <p className="text-[10px] uppercase tracking-widest text-[var(--muted)] mt-1">
                  Slow Simmered Jus
                </p>
              </div>
              <div>
                <p className="text-2xl font-serif text-[var(--gold)]">Single</p>
                <p className="text-[10px] uppercase tracking-widest text-[var(--muted)] mt-1">
                  Estate Kashmir Saffron
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
