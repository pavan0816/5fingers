import React, { useState } from "react"
import {
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  ArrowRight,
  Check,
} from "lucide-react"

export const Footer: React.FC<{
  onOpenReservation: () => void
  onOpenCart: () => void
}> = ({ onOpenReservation, onOpenCart }) => {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail("")
    }
  }

  return (
    <footer
      className="bg-[#030c08] text-[var(--ivory)] pt-20 pb-12 border-t border-[rgba(214,183,119,0.25)] relative overflow-hidden"
      id="contact"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24">
        {/* Top Newsletter Card */}
        <div className="p-8 sm:p-12 rounded-2xl bg-gradient-to-r from-[var(--forest)] to-[var(--night)] border border-[rgba(214,183,119,0.3)] mb-16 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="eyebrow mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[var(--gold)]" />
              <span>Private Cellar & Menu Invitations</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[var(--ivory)]">
              Join the Five Fingers Gastronomy Circle
            </h3>
            <p className="text-xs sm:text-sm text-[var(--muted)] mt-2 font-light">
              Receive privileged access to seasonal white truffle releases, rare
              single-estate wine dinners, and exclusive dining room
              reservations.
            </p>
          </div>

          <div className="lg:col-span-5">
            {subscribed ? (
              <div className="flex items-center gap-2 p-4 bg-emerald-950/80 border border-emerald-500/40 rounded-lg text-emerald-300 text-xs">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>
                  Thank you. Your invitation to the private circle has been
                  reserved.
                </span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your private email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-xs text-[var(--ivory)] placeholder-[var(--muted)] focus:outline-none focus:border-[var(--gold)]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[var(--gold)] text-[var(--night)] font-semibold text-xs uppercase tracking-widest rounded-lg hover:bg-white transition-colors shrink-0"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-16 border-b border-white/10 text-xs">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <div
              className="logo cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <span>5</span>
              <div>
                <b>FINGERS</b>
                <small>FINE DINING & HEARTH</small>
              </div>
            </div>
            <p className="text-[var(--muted)] leading-relaxed font-light">
              Honoring the five senses and primordial elements through ancient
              ironwood charcoal, single-estate Himalayan spices, and refined
              modern hospitality.
            </p>
            <div className="pt-2 flex items-center gap-2 text-[var(--gold)] text-[11px]">
              <ShieldCheck className="w-4 h-4 text-[var(--gold)]" />
              <span>Certified 100% Halal Meats</span>
            </div>
          </div>

          {/* Col 2: Service Hours */}
          <div className="space-y-3">
            <span className="font-serif text-sm tracking-wider uppercase text-[var(--gold)] block font-semibold">
              Hours of Service
            </span>
            <div className="space-y-2 text-[var(--muted)]">
              <div>
                <p className="text-white font-medium">Dinner Service</p>
                <p className="text-[11px]">Tuesday – Sunday: 17:30 – 23:00</p>
              </div>
              <div>
                <p className="text-white font-medium">Weekend Lunch Service</p>
                <p className="text-[11px]">Friday – Sunday: 12:00 – 14:30</p>
              </div>
              <div>
                <p className="text-white font-medium">Mondays</p>
                <p className="text-[11px]">
                  Closed for farm foraging & hearth curing
                </p>
              </div>
            </div>
          </div>

          {/* Col 3: Location & Concierge */}
          <div className="space-y-3">
            <span className="font-serif text-sm tracking-wider uppercase text-[var(--gold)] block font-semibold">
              Location & Contact
            </span>
            <div className="space-y-2.5 text-[var(--muted)]">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[var(--gold)] shrink-0 mt-0.5" />
                <span>
                  42 Heritage Promenade, Mayfair District
                  <br />
                  Valet parking provided on arrival
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[var(--gold)] shrink-0" />
                <span>+1 (555) 843-3464</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[var(--gold)] shrink-0" />
                <span>concierge@5fingersrestaurant.com</span>
              </p>
            </div>
          </div>

          {/* Col 4: Quick Links */}
          <div className="space-y-3">
            <span className="font-serif text-sm tracking-wider uppercase text-[var(--gold)] block font-semibold">
              Quick Reservations
            </span>
            <div className="flex flex-col gap-2">
              <button
                onClick={onOpenReservation}
                className="text-left text-[var(--muted)] hover:text-[var(--gold)] transition-colors flex items-center justify-between py-1 border-b border-white/5"
              >
                <span>Book a Table Online</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onOpenCart}
                className="text-left text-[var(--muted)] hover:text-[var(--gold)] transition-colors flex items-center justify-between py-1 border-b border-white/5"
              >
                <span>Order Takeaway & Delivery</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <a
                href="#experience"
                className="text-left text-[var(--muted)] hover:text-[var(--gold)] transition-colors flex items-center justify-between py-1 border-b border-white/5"
              >
                <span>Chef's 7-Course Degustation</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
              <a
                href="#gallery"
                className="text-left text-[var(--muted)] hover:text-[var(--gold)] transition-colors flex items-center justify-between py-1 border-b border-white/5"
              >
                <span>Private Dining & Vault Inquiry</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[var(--muted)]">
          <p>
            © {new Date().getFullYear()} 5 Fingers Fine Dining Restaurant & Fire
            Hearth. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer">
              Privacy Policy
            </span>
            <span className="hover:text-white cursor-pointer">
              Terms of Service
            </span>
            <span className="hover:text-white cursor-pointer">
              Allergen Protocol
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}
