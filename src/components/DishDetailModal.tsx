import React, { useState } from "react"
import {
  X,
  Plus,
  Minus,
  Flame,
  Wine,
  Sparkles,
  Check,
  AlertCircle,
} from "lucide-react"
import { MenuItem } from "../types/restaurant"

interface DishDetailModalProps {
  dish: MenuItem | null
  onClose: () => void
  onAddToCart: (dish: MenuItem, quantity: number) => void
  inCartQty: number
}

export const DishDetailModal: React.FC<DishDetailModalProps> = ({
  dish,
  onClose,
  onAddToCart,
  inCartQty,
}) => {
  const [quantity, setQuantity] = useState(1)

  if (!dish) return null

  const handleAdd = () => {
    onAddToCart(dish, quantity)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[var(--night)] border border-[var(--gold)]/40 rounded-2xl shadow-2xl overflow-hidden my-8 grid md:grid-cols-12"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Column: Imagery & Floating Badges */}
        <div className="md:col-span-5 relative h-64 md:h-full min-h-[280px]">
          <img
            src={dish.image}
            alt={dish.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--night)] via-transparent to-transparent md:hidden" />

          {dish.isChefSignature && (
            <div className="absolute top-4 left-4 bg-[var(--emerald)]/90 backdrop-blur-md px-3 py-1 rounded text-[10px] uppercase tracking-widest text-white font-medium flex items-center gap-1 border border-white/20">
              <Sparkles className="w-3 h-3 text-[var(--gold)]" />
              Chef Signature
            </div>
          )}

          <div className="absolute bottom-4 left-4 bg-[var(--night)]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[var(--gold)]/40 text-[var(--gold)] font-serif text-lg font-semibold shadow-md">
            ${dish.price}
          </div>
        </div>

        {/* Right Column: Detailed Culinary Information */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-widest text-[var(--gold)] font-medium">
                {dish.tagline}
              </span>
              <button
                onClick={onClose}
                aria-label="Close dish modal"
                className="p-1 rounded-full hover:bg-white/10 text-[var(--muted)] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-[var(--ivory)] mb-3">
              {dish.name}
            </h3>

            <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed font-light mb-4">
              {dish.description}
            </p>

            {/* Tags & Spice Level */}
            <div className="flex flex-wrap items-center gap-2 mb-4 pb-4 border-b border-white/10">
              {dish.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] uppercase tracking-wider bg-white/[0.05] border border-white/10 text-[var(--muted)] px-2.5 py-0.5 rounded"
                >
                  {tag}
                </span>
              ))}
              {dish.calories && (
                <span className="text-[10px] text-[var(--muted)] font-mono ml-auto">
                  {dish.calories} kcal
                </span>
              )}
            </div>

            {/* Ingredients & Spices */}
            <div className="mb-4">
              <span className="text-[10px] uppercase tracking-wider text-[var(--gold)] block mb-1.5 font-medium">
                Pivotal Ingredients & Heritage Spices
              </span>
              <div className="flex flex-wrap gap-1.5">
                {dish.ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="text-[11px] bg-white/[0.03] text-[var(--ivory)] px-2 py-0.5 rounded border border-white/5"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Wine Pairing Recommendation */}
            {dish.pairing && (
              <div className="p-3 rounded-lg bg-[rgba(11,73,52,0.25)] border border-[rgba(214,183,119,0.3)] flex items-center gap-2.5 text-xs text-[var(--ivory)] mb-4">
                <Wine className="w-4 h-4 text-[var(--gold)] shrink-0" />
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[var(--gold)] font-medium block">
                    Sommelier Pairing
                  </span>
                  <p className="font-serif text-[13px]">{dish.pairing}</p>
                </div>
              </div>
            )}

            {/* Allergens warning */}
            {dish.allergens && dish.allergens.length > 0 && (
              <div className="flex items-center gap-1.5 text-[10px] text-amber-300/80 mb-4">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Allergens: {dish.allergens.join(", ")}</span>
              </div>
            )}
          </div>

          {/* Quantity selector & Add to cart button */}
          <div className="flex items-center gap-4 pt-4 border-t border-white/10 mt-2">
            <div className="flex items-center bg-white/10 rounded-lg border border-white/10 p-1">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 flex items-center justify-center hover:text-[var(--gold)]"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-8 text-center text-xs font-semibold">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 flex items-center justify-center hover:text-[var(--gold)]"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={handleAdd}
              className="flex-1 py-3 bg-[var(--gold)] text-[var(--night)] font-semibold text-xs uppercase tracking-widest rounded-lg hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <Plus className="w-4 h-4" />
              <span>Add to Order · ${(dish.price * quantity).toFixed(2)}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
