import React from "react"
import { ArrowRight, Plus, Sparkles, Eye } from "lucide-react"
import { MenuItem } from "../types/restaurant"

interface SignatureCollectionProps {
  items: MenuItem[]
  onSelectDish: (dish: MenuItem) => void
  onAddToCart: (dish: MenuItem) => void
  onExploreFullMenu: () => void
}

export const SignatureCollection: React.FC<SignatureCollectionProps> = ({
  items,
  onSelectDish,
  onAddToCart,
  onExploreFullMenu,
}) => {
  // Take first 3 chef signatures
  const signatureDishes = items
    .filter((item) => item.isChefSignature)
    .slice(0, 3)

  return (
    <section className="collection" id="collection">
      {/* Intro Header */}
      <div className="collection-intro">
        <div>
          <div className="eyebrow dark">
            <span />
            <Sparkles className="w-3.5 h-3.5 text-[var(--gold)]" />
            <span>The Signature Collection</span>
          </div>
          <h2>
            Crafted with fire.
            <br />
            <em>Finished with feeling.</em>
          </h2>
        </div>
        <div className="collection-note">
          <span>01 — 03</span>
          <p>
            A seasonal expression of modern Indian cooking, shaped by memory,
            ancestral flame, and rare single-origin spices.
          </p>
        </div>
      </div>

      {/* Plate Showcase Grid */}
      <div className="plates">
        {signatureDishes.map((plate, index) => {
          const plateClass =
            index === 0
              ? "plate plate-one"
              : index === 1
                ? "plate plate-two"
                : "plate plate-three"
          const num = `0${index + 1}`

          return (
            <article key={plate.id} className={`${plateClass} group`}>
              <div
                className="plate-image cursor-pointer relative overflow-hidden rounded-sm"
                onClick={() => onSelectDish(plate)}
              >
                <img
                  src={plate.image}
                  alt={plate.name}
                  className="transition-transform duration-700 group-hover:scale-105"
                />
                <span>{num}</span>

                {/* Quick overlay preview button */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <button
                    className="p-3 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-[var(--gold)] hover:text-[var(--night)] transition-colors"
                    onClick={(e) => {
                      e.stopPropagation()
                      onSelectDish(plate)
                    }}
                    title="View dish tasting notes"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    className="p-3 bg-[var(--emerald)] text-white rounded-full hover:bg-[var(--gold)] hover:text-[var(--night)] transition-colors shadow-lg"
                    onClick={(e) => {
                      e.stopPropagation()
                      onAddToCart(plate)
                    }}
                    title="Add to Takeaway order"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="plate-copy">
                <div className="flex items-center justify-between mb-1">
                  <small>{plate.tagline}</small>
                  <span className="text-sm font-semibold text-[var(--emerald)]">
                    ${plate.price}
                  </span>
                </div>

                <h3
                  className="cursor-pointer hover:text-[var(--emerald)] transition-colors"
                  onClick={() => onSelectDish(plate)}
                >
                  {plate.name}
                </h3>

                <p className="text-xs text-[#637068] line-clamp-2 mt-1 mb-3">
                  {plate.description}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-[rgba(11,73,52,0.15)]">
                  <div className="flex flex-wrap gap-1.5">
                    {plate.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] uppercase tracking-wider bg-[rgba(11,73,52,0.08)] text-[var(--emerald)] px-2 py-0.5 rounded font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    aria-label={`Add ${plate.name} to takeaway`}
                    onClick={() => onAddToCart(plate)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-[var(--emerald)] hover:text-[var(--gold)] transition-colors group/btn"
                  >
                    <span>Order</span>
                    <Plus className="w-3.5 h-3.5 group-hover/btn:rotate-90 transition-transform" />
                  </button>
                </div>
              </div>
            </article>
          )
        })}
      </div>

      {/* Footer Navigation */}
      <div className="collection-footer">
        <span>
          Curated seasonal dishes created by Executive Chef Aarav Kapoor
        </span>
        <button onClick={onExploreFullMenu} className="group">
          <span>Discover the full menu</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
        </button>
      </div>
    </section>
  )
}
