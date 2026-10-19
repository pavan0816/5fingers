import React, { useState } from "react"
import { Sparkles, Maximize2, X } from "lucide-react"

const GALLERY_SPACES = [
  {
    id: 1,
    title: "The Main Grand Dining Hall",
    category: "dining",
    desc: "Deep emerald velvet banquettes, low hand-blown amber lighting, and brushed brass details.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=88",
    aspect: "tall",
  },
  {
    id: 2,
    title: "The Ironwood Fire Hearth",
    category: "kitchen",
    desc: "An open theater of live embers, clay tandoors, and artisanal copper cookware.",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=88",
    aspect: "wide",
  },
  {
    id: 3,
    title: "The Artisanal Cocktail Lounge",
    category: "bar",
    desc: "Bespoke mixology bar featuring botanical spirits, aged single barrels, and cold smoke infusions.",
    image:
      "https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=1200&q=88",
    aspect: "square",
  },
  {
    id: 4,
    title: "The Starlit Botanical Courtyard",
    category: "courtyard",
    desc: "Surrounded by wild jasmine, flickering braziers, and private stone dining nooks.",
    image:
      "https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=1200&q=88",
    aspect: "square",
  },
  {
    id: 5,
    title: "The Private Sommelier Wine Cellar",
    category: "dining",
    desc: "An intimate 10-seat arched brick vault housing our 1,200-bottle collection of vintage cru.",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=88",
    aspect: "wide",
  },
  {
    id: 6,
    title: "The Chef’s Plating Counter",
    category: "kitchen",
    desc: "Front-row vantage point where our team finishes each plate with precision and tweezers.",
    image:
      "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?auto=format&fit=crop&w=1200&q=88",
    aspect: "tall",
  },
]

export const AmbianceGallery: React.FC = () => {
  const [filter, setFilter] =
    useState<"all" | "dining" | "kitchen" | "bar" | "courtyard">("all")
  const [activePhoto, setActivePhoto] =
    useState<typeof GALLERY_SPACES[0] | null>(null)

  const filtered =
    filter === "all"
      ? GALLERY_SPACES
      : GALLERY_SPACES.filter((s) => s.category === filter)

  return (
    <section
      className="py-24 px-6 md:px-16 lg:px-24 bg-[#081510] text-[var(--ivory)] relative"
      id="gallery"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-8">
          <div>
            <div className="eyebrow mb-2">
              <span />
              <Sparkles className="w-3.5 h-3.5 text-[var(--gold)]" />
              <span>Atmosphere & Interior Architecture</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[var(--ivory)]">
              The Ambiance
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 mt-4 md:mt-0 flex-wrap">
            {[
              { id: "all", label: "All Spaces" },
              { id: "dining", label: "Dining Hall & Vault" },
              { id: "kitchen", label: "The Hearth Kitchen" },
              { id: "bar", label: "Cocktail Bar" },
              { id: "courtyard", label: "Botanical Courtyard" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider transition-colors ${
                  filter === tab.id
                    ? "bg-[var(--gold)] text-[var(--night)] font-semibold"
                    : "bg-white/[0.04] text-[var(--muted)] hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((space) => (
            <div
              key={space.id}
              onClick={() => setActivePhoto(space)}
              className="group relative h-80 rounded-xl overflow-hidden cursor-pointer border border-white/10 hover:border-[var(--gold)]/50 transition-all duration-300"
            >
              <img
                src={space.image}
                alt={space.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--night)] via-[var(--night)]/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

              {/* Hover Zoom Icon */}
              <div className="absolute top-4 right-4 p-2.5 rounded-full bg-black/50 backdrop-blur-md text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4 text-[var(--gold)]" />
              </div>

              {/* Caption */}
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[9px] uppercase tracking-widest text-[var(--gold)] font-medium">
                  Space Showcase
                </span>
                <h3 className="font-serif text-xl text-[var(--ivory)] mt-0.5">
                  {space.title}
                </h3>
                <p className="text-xs text-[var(--muted)] font-light mt-1 line-clamp-2">
                  {space.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setActivePhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[var(--night)] border border-[var(--gold)]/40 rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:text-[var(--gold)] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="max-h-[65vh] overflow-hidden">
              <img
                src={activePhoto.image}
                alt={activePhoto.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 bg-gradient-to-b from-[#0b2b20] to-[#071a14]">
              <span className="text-[10px] uppercase tracking-widest text-[var(--gold)] font-semibold">
                Architectural Showcase
              </span>
              <h3 className="font-serif text-2xl text-[var(--ivory)] mt-1">
                {activePhoto.title}
              </h3>
              <p className="text-sm text-[var(--muted)] mt-2 font-light">
                {activePhoto.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
