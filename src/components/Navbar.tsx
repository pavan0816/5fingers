import React, { useState } from "react"
import {
  ShoppingBag,
  Calendar,
  SlidersHorizontal,
  Menu,
  X,
  ArrowUpRight,
} from "lucide-react"

interface NavbarProps {
  scrolled: boolean
  cartCount: number
  onOpenCart: () => void
  onOpenReservation: () => void
  onToggleDashboard: () => void
  isDashboardOpen: boolean
}

export const Navbar: React.FC<NavbarProps> = ({
  scrolled,
  cartCount,
  onOpenCart,
  onOpenReservation,
  onToggleDashboard,
  isDashboardOpen,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      {/* Brand Logo */}
      <div
        className="logo cursor-pointer select-none"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="5 Fingers Restaurant Home"
      >
        <span>5</span>
        <div>
          <b>FINGERS</b>
          <small>FINE DINING & HEARTH</small>
        </div>
      </div>

      {/* Desktop Navigation Links */}
      <nav
        className={`nav-links ${mobileMenuOpen ? "open" : ""}`}
        aria-label="Primary navigation"
      >
        <button onClick={() => scrollTo("hero")}>Home</button>
        <button onClick={() => scrollTo("story")}>Our Story</button>
        <button onClick={() => scrollTo("collection")}>Signatures</button>
        <button onClick={() => scrollTo("menu")}>The Menu</button>
        <button onClick={() => scrollTo("experience")}>Degustation</button>
        <button onClick={() => scrollTo("gallery")}>Ambiance</button>
        <button onClick={() => scrollTo("reviews")}>Accolades</button>
        <button onClick={() => scrollTo("contact")}>Contact</button>

        {/* Mobile-only action buttons */}
        <div className="flex md:hidden flex-col gap-3 w-full mt-4 pt-4 border-t border-[rgba(214,183,119,0.2)]">
          <button
            className="flex items-center justify-between px-4 py-3 bg-[rgba(11,73,52,0.6)] text-[var(--gold)] text-xs uppercase tracking-wider rounded"
            onClick={() => {
              setMobileMenuOpen(false)
              onOpenReservation()
            }}
          >
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" /> Book a Table
            </span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <button
            className="flex items-center justify-between px-4 py-3 bg-[rgba(214,183,119,0.15)] text-[var(--ivory)] text-xs uppercase tracking-wider rounded"
            onClick={() => {
              setMobileMenuOpen(false)
              onOpenCart()
            }}
          >
            <span className="flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-[var(--gold)]" /> Order
              Takeaway ({cartCount})
            </span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
          <button
            className="flex items-center justify-between px-4 py-3 bg-[rgba(255,255,255,0.06)] text-[var(--muted)] text-xs uppercase tracking-wider rounded"
            onClick={() => {
              setMobileMenuOpen(false)
              onToggleDashboard()
            }}
          >
            <span className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" /> Staff Dashboard
            </span>
            <span className="text-[10px] bg-[var(--emerald)] px-2 py-0.5 rounded text-white">
              Live
            </span>
          </button>
        </div>
      </nav>

      {/* Nav Actions */}
      <div className="nav-actions">
        {/* Staff Dashboard Portal Link */}
        <button
          className="hidden lg:flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-[var(--muted)] hover:text-[var(--gold)] transition-colors py-2 px-3 rounded border border-white/10 hover:border-[var(--gold)]/40 bg-white/5"
          onClick={onToggleDashboard}
          title="Toggle Staff & Management Dashboard"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-[var(--gold)]" />
          <span>{isDashboardOpen ? "Guest View" : "Staff Portal"}</span>
        </button>

        {/* Takeaway Cart Button */}
        <button
          className="takeaway relative flex items-center gap-2 py-2 px-3 text-[var(--ivory)] hover:text-[var(--gold)] transition-colors"
          onClick={onOpenCart}
          aria-label={`View takeaway order (${cartCount} items)`}
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4 text-[var(--gold)]" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-[var(--gold)] text-[var(--night)] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </div>
          <span className="hidden sm:inline">Order takeaway</span>
        </button>

        {/* Book a Table Primary Button */}
        <button
          className="book flex items-center gap-2 text-[var(--ivory)] font-medium"
          onClick={onOpenReservation}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Book a table</span>
        </button>
      </div>

      {/* Mobile Toggle Button */}
      <button
        className="mobile-toggle flex items-center justify-center text-[var(--gold)]"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle navigation"
      >
        {mobileMenuOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>
    </header>
  )
}
