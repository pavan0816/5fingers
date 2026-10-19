import React, { useState, useMemo } from "react"
import {
  Search,
  Flame,
  Plus,
  Sparkles,
  Filter,
  Info,
  Check,
} from "lucide-react"
import { MenuItem, DietaryTag } from "../types/restaurant"

interface MenuSectionProps {
  items: MenuItem[]
  cartItemIds: Record<string, number>
  onSelectDish: (dish: MenuItem) => void
  onAddToCart: (dish: MenuItem) => void
  onOpenReservation: () => void
}

const CATEGORIES = [
  { id: "all", label: "Complete Menu" },
  { id: "starters", label: "Starters & Small Plates" },
  { id: "tandoor", label: "Tandoor & Hearth" },
  { id: "mains", label: "Mains & Biryanis" },
  { id: "breads", label: "Breads & Sides" },
  { id: "desserts", label: "Desserts" },
  { id: "cocktails", label: "Cellar & Cocktails" },
]

const DIETARY_FILTERS: { label: string value: DietaryTag | "all" }[] = [
  { label: "All Dishes", value: "all" },
  { label: "Chef Special", value: "Chef Special" },
  { label: "Vegetarian", value: "Vegetarian" },
  { label: "Vegan", value: "Vegan" },
  { label: "Gluten-Free", value: "Gluten-Free" },
  { label: "Halal", value: "Halal" },
  { label: "Spicy", value: "Spicy" },
]

export const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  cartItemIds,
  onSelectDish,
  onAddToCart,
  onOpenReservation,
}) => {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedDiet, setSelectedDiet] = useState<DietaryTag | "all">("all")
  const [searchQuery, setSearchQuery] = useState("")

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category filter
      if (selectedCategory !== "all" && item.category !== selectedCategory) {
        return false
      }
      // Dietary tag filter
      if (selectedDiet !== "all" && !item.tags.includes(selectedDiet)) {
        return false
      }
      // Search query filter (matches name, description, ingredients)
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase()
        const matchesName = item.name.toLowerCase().includes(q)
        const matchesDesc = item.description.toLowerCase().includes(q)
        const matchesIng = item.ingredients.some((i) =>
          i.toLowerCase().includes(q),
        )
        if (!matchesName && !matchesDesc && !matchesIng) return false
      }
      return true
    })
  }, [items, selectedCategory, selectedDiet, searchQuery])

  return (
    <section
      className="py-24 px-6 md:px-16 lg:px-24 bg-[#0a1f18] text-[var(--ivory)] relative"
      id="menu"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-white/10 pb-8">
          <div>
            <div className="eyebrow mb-2">
              <span />
              <Sparkles className="w-3.5 h-3.5 text-[var(--gold)]" />
              <span>A La Carte & Hearth Selections</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif text-[var(--ivory)]">
              The Dining Menu
            </h2>
          </div>
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <span className="text-xs text-[var(--muted)]">
              Serving Dinner Daily 17:30 – 23:00
            </span>
            <button
              onClick={onOpenReservation}
              className="text-xs uppercase tracking-widest text-[var(--gold)] border-b border-[var(--gold)] pb-0.5 hover:text-white transition-colors"
            >
              Reserve for dinner &rarr;
            </button>
          </div>
        </div>

        {/* Search Bar & Filters */}
        <div className="space-y-6 mb-12">
          {/* Top row: Category Tabs & Search Bar */}
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Category tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-200 border ${
                    selectedCategory === cat.id
                      ? "bg-[var(--gold)] text-[var(--night)] font-semibold border-[var(--gold)] shadow-md"
                      : "bg-white/[0.04] text-[var(--muted)] border-white/10 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[260px] sm:min-w-[300px]">
              <Search className="w-4 h-4 text-[var(--muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search dish, saffron, lamb, seafood..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.05] border border-white/15 rounded-full pl-10 pr-4 py-2 text-xs text-[var(--ivory)] placeholder-[var(--muted)]/60 focus:outline-none focus:border-[var(--gold)] transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[var(--muted)] hover:text-white"
                >
                  &times;
                </button>
              )}
            </div>
          </div>

          {/* Secondary row: Dietary Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap text-xs">
            <span className="text-[var(--muted)] flex items-center gap-1 text-[11px] mr-1">
              <Filter className="w-3.5 h-3.5 text-[var(--gold)]" /> Filter:
            </span>
            {DIETARY_FILTERS.map((df) => (
              <button
                key={df.value}
                onClick={() => setSelectedDiet(df.value)}
                className={`px-3 py-1 rounded text-[11px] uppercase tracking-wider transition-colors ${
                  selectedDiet === df.value
                    ? "bg-[var(--emerald)] text-white font-medium border border-[var(--emerald)]"
                    : "bg-white/[0.03] text-[var(--muted)] border border-white/5 hover:text-white"
                }`}
              >
                {df.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center bg-white/[0.02] rounded-xl border border-white/10">
            <p className="text-lg font-serif text-[var(--gold)]">
              No culinary creations found
            </p>
            <p className="text-xs text-[var(--muted)] mt-1">
              Try resetting your dietary filter or search keyword.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all")
                setSelectedDiet("all")
                setSearchQuery("")
              }}
              className="mt-4 px-4 py-2 bg-[var(--gold)] text-[var(--night)] text-xs uppercase tracking-wider font-semibold rounded"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((dish) => {
              const inCartQty = cartItemIds[dish.id] || 0

              return (
                <div
                  key={dish.id}
                  className="group bg-gradient-to-b from-white/[0.04] to-white/[0.01] rounded-xl overflow-hidden border border-white/10 hover:border-[var(--gold)]/50 transition-all duration-300 flex flex-col justify-between hover:shadow-2xl hover:shadow-black/50"
                >
                  {/* Dish Image */}
                  <div
                    className="relative h-56 sm:h-60 overflow-hidden cursor-pointer"
                    onClick={() => onSelectDish(dish)}
                  >
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a1f18] via-transparent to-transparent opacity-80" />

                    {/* Price Badge */}
                    <div className="absolute top-3.5 right-3.5 bg-[var(--night)]/90 backdrop-blur-md px-3 py-1 rounded-full border border-[var(--gold)]/40 text-[var(--gold)] font-serif text-sm font-semibold shadow-md">
                      ${dish.price}
                    </div>

                    {/* Chef Signature / Special Tag */}
                    {dish.isChefSignature && (
                      <div className="absolute top-3.5 left-3.5 bg-[var(--emerald)]/90 backdrop-blur-md px-2.5 py-1 rounded text-[9px] uppercase tracking-widest text-white font-medium flex items-center gap-1 border border-white/20">
                        <Sparkles className="w-3 h-3 text-[var(--gold)]" />
                        Signature
                      </div>
                    )}

                    {/* Spice Level Indicator */}
                    {dish.spiceLevel && dish.spiceLevel > 0 && (
                      <div className="absolute bottom-3 right-3.5 flex items-center gap-0.5 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] text-red-400">
                        {Array.from({ length: dish.spiceLevel }).map((_, i) => (
                          <Flame key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Dish Details */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Tagline */}
                      <p className="text-[10px] tracking-widest uppercase text-[var(--gold)] font-medium mb-1">
                        {dish.tagline}
                      </p>

                      {/* Name */}
                      <h3
                        className="font-serif text-xl text-[var(--ivory)] hover:text-[var(--gold)] transition-colors cursor-pointer"
                        onClick={() => onSelectDish(dish)}
                      >
                        {dish.name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-[var(--muted)] line-clamp-2 mt-2 leading-relaxed font-light">
                        {dish.description}
                      </p>

                      {/* Dietary Badges */}
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {dish.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="text-[9px] uppercase tracking-wider bg-white/[0.05] border border-white/10 text-[var(--muted)] px-2 py-0.5 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Card Actions */}
                    <div className="flex items-center justify-between gap-3 pt-4 mt-4 border-t border-white/10">
                      <button
                        onClick={() => onSelectDish(dish)}
                        className="text-xs text-[var(--muted)] hover:text-white flex items-center gap-1 transition-colors"
                      >
                        <Info className="w-3.5 h-3.5" />
                        <span>Details</span>
                      </button>

                      <button
                        onClick={() => onAddToCart(dish)}
                        className={`flex items-center gap-2 px-3.5 py-1.5 rounded text-xs uppercase tracking-wider font-medium transition-all ${
                          inCartQty > 0
                            ? "bg-[var(--gold)] text-[var(--night)] font-semibold shadow-md"
                            : "bg-[var(--emerald)] hover:bg-[#126247] text-white"
                        }`}
                      >
                        {inCartQty > 0 ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>In Bag ({inCartQty})</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add to Order</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
