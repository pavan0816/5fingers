import React, { useState } from "react"
import {
  X,
  Calendar as CalendarIcon,
  Clock,
  Users,
  Sparkles,
  CheckCircle2,
  MapPin,
  HeartHandshake,
} from "lucide-react"
import { Reservation } from "../types/restaurant"

interface ReservationModalProps {
  isOpen: boolean
  onClose: () => void
  onAddReservation: (res: Reservation) => void
  initialOccasion?: "Casual Dining" | "Birthday" | "Anniversary" | "Business" | "Tasting Menu"
}

const TIME_SLOTS = {
  lunch: ["12:00", "12:30", "13:00", "13:30", "14:00"],
  dinner: [
    "17:30",
    "18:00",
    "18:30",
    "19:00",
    "19:30",
    "20:00",
    "20:30",
    "21:00",
    "21:30",
  ],
}

const SEATING_AREAS: { name: Reservation["seatingArea"] desc: string }[] = [
  {
    name: "Main Dining Hall",
    desc: "Central chandelier warmth and velvet banquettes",
  },
  {
    name: "Chef's Counter",
    desc: "Front-row view of the live fire hearth and open kitchen",
  },
  {
    name: "Botanical Courtyard",
    desc: "Jasmine garden dining under atmospheric lanterns",
  },
  {
    name: "Private Wine Cellar",
    desc: "Exclusive brick arched vault with dedicated sommelier",
  },
]

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  onAddReservation,
  initialOccasion = "Casual Dining",
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [guests, setGuests] = useState(2)
  const [date, setDate] = useState("2026-10-20")
  const [time, setTime] = useState("19:30")
  const [seatingArea, setSeatingArea] =
    useState<Reservation["seatingArea"]>("Chef's Counter")
  const [occasion, setOccasion] = useState(initialOccasion)
  const [guestName, setGuestName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [notes, setNotes] = useState("")
  const [confirmedReservation, setConfirmedReservation] =
    useState<Reservation | null>(null)

  if (!isOpen) return null

  const handleConfirm = (e: React.FormEvent) => {
    e.preventDefault()
    if (!guestName.trim() || !phone.trim() || !email.trim()) return

    const newRes: Reservation = {
      id: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
      guestName,
      email,
      phone,
      date,
      time,
      guests,
      seatingArea,
      occasion: occasion as any,
      notes,
      status: "Confirmed",
      createdAt: "Just now",
    }

    onAddReservation(newRes)
    setConfirmedReservation(newRes)
    setStep(3)
  }

  const resetAndClose = () => {
    setStep(1)
    setConfirmedReservation(null)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-[var(--night)] border border-[var(--gold)]/40 rounded-2xl shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-r from-[var(--forest)] to-[var(--night)] border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="eyebrow mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[var(--gold)]" />
              <span>Table Reservation Service</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-[var(--ivory)]">
              Reserve Your Table at 5 Fingers
            </h3>
          </div>
          <button
            onClick={resetAndClose}
            aria-label="Close modal"
            className="p-2 rounded-full hover:bg-white/10 text-[var(--muted)] hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        {step < 3 && (
          <div className="flex border-b border-white/10 px-8 py-3 bg-white/[0.02] text-xs text-[var(--muted)] justify-between">
            <span
              className={step === 1 ? "text-[var(--gold)] font-semibold" : ""}
            >
              1. Date, Time & Seating
            </span>
            <span
              className={step === 2 ? "text-[var(--gold)] font-semibold" : ""}
            >
              2. Guest Contact & Notes
            </span>
          </div>
        )}

        {/* STEP 1: Date, Guests, Seating, Time */}
        {step === 1 && (
          <div className="p-6 sm:p-8 space-y-6">
            {/* Guests Counter */}
            <div>
              <label className="text-xs uppercase tracking-widest text-[var(--gold)] font-medium block mb-2">
                Party Size (Number of Guests)
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setGuests(num)}
                    className={`w-11 h-11 rounded-lg text-sm font-semibold transition-all border ${
                      guests === num
                        ? "bg-[var(--gold)] text-[var(--night)] border-[var(--gold)] shadow-lg"
                        : "bg-white/5 border-white/10 text-[var(--ivory)] hover:border-white/30"
                    }`}
                  >
                    {num}
                  </button>
                ))}
                <span className="text-xs text-[var(--muted)] ml-2">
                  (For 9+ guests, our private dining concierge will assist)
                </span>
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <label className="text-xs uppercase tracking-widest text-[var(--gold)] font-medium block mb-2">
                Reservation Date
              </label>
              <div className="relative max-w-xs">
                <CalendarIcon className="w-4 h-4 text-[var(--gold)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-lg pl-10 pr-4 py-2.5 text-xs text-[var(--ivory)] focus:outline-none focus:border-[var(--gold)]"
                />
              </div>
            </div>

            {/* Time Slots */}
            <div>
              <label className="text-xs uppercase tracking-widest text-[var(--gold)] font-medium block mb-2">
                Available Time Slots
              </label>
              <div className="space-y-3">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[var(--muted)] block mb-1.5">
                    Dinner Service
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {TIME_SLOTS.dinner.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTime(slot)}
                        className={`px-3 py-1.5 rounded text-xs transition-colors border ${
                          time === slot
                            ? "bg-[var(--emerald)] border-[var(--emerald)] text-white font-medium"
                            : "bg-white/5 border-white/10 text-[var(--muted)] hover:text-white hover:border-white/20"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase tracking-wider text-[var(--muted)] block mb-1.5">
                    Lunch Service
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {TIME_SLOTS.lunch.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTime(slot)}
                        className={`px-3 py-1.5 rounded text-xs transition-colors border ${
                          time === slot
                            ? "bg-[var(--emerald)] border-[var(--emerald)] text-white font-medium"
                            : "bg-white/5 border-white/10 text-[var(--muted)] hover:text-white hover:border-white/20"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Seating Area Selection */}
            <div>
              <label className="text-xs uppercase tracking-widest text-[var(--gold)] font-medium block mb-2">
                Atmosphere & Seating Area
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                {SEATING_AREAS.map((area) => (
                  <button
                    key={area.name}
                    type="button"
                    onClick={() => setSeatingArea(area.name)}
                    className={`p-3.5 rounded-lg text-left transition-all border ${
                      seatingArea === area.name
                        ? "bg-[var(--emerald)]/40 border-[var(--gold)] shadow-md"
                        : "bg-white/[0.03] border-white/10 hover:border-white/20"
                    }`}
                  >
                    <p className="font-serif text-sm text-[var(--ivory)]">
                      {area.name}
                    </p>
                    <p className="text-[11px] text-[var(--muted)] mt-1">
                      {area.desc}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Next step button */}
            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-3 bg-[var(--gold)] text-[var(--night)] font-semibold text-xs uppercase tracking-widest rounded hover:bg-white transition-colors"
              >
                Continue to Guest Details &rarr;
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: Guest Contact & Notes */}
        {step === 2 && (
          <form onSubmit={handleConfirm} className="p-6 sm:p-8 space-y-5">
            {/* Summary preview badge */}
            <div className="p-4 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-between text-xs">
              <div>
                <span className="text-[var(--gold)] font-semibold">
                  {guests} Guests · {date} at {time}
                </span>
                <p className="text-[var(--muted)] text-[11px] mt-0.5">
                  {seatingArea}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-[11px] text-[var(--gold)] underline"
              >
                Edit
              </button>
            </div>

            {/* Dining Occasion */}
            <div>
              <label className="text-xs uppercase tracking-widest text-[var(--gold)] font-medium block mb-2">
                Dining Occasion
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  "Casual Dining",
                  "Birthday",
                  "Anniversary",
                  "Business",
                  "Tasting Menu",
                ].map((occ) => (
                  <button
                    key={occ}
                    type="button"
                    onClick={() => setOccasion(occ as any)}
                    className={`px-3 py-1.5 rounded text-xs transition-colors border ${
                      occasion === occ
                        ? "bg-[var(--gold)] text-[var(--night)] font-semibold border-[var(--gold)]"
                        : "bg-white/5 border-white/10 text-[var(--muted)] hover:text-white"
                    }`}
                  >
                    {occ}
                  </button>
                ))}
              </div>
            </div>

            {/* Name & Phone */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-[var(--muted)] block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lady Vivienne Montgomery"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-lg px-3.5 py-2.5 text-xs text-[var(--ivory)] focus:outline-none focus:border-[var(--gold)]"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-[var(--muted)] block mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 000-0000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-lg px-3.5 py-2.5 text-xs text-[var(--ivory)] focus:outline-none focus:border-[var(--gold)]"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[var(--muted)] block mb-1">
                Confirmation Email *
              </label>
              <input
                type="email"
                required
                placeholder="guest@luxury.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-lg px-3.5 py-2.5 text-xs text-[var(--ivory)] focus:outline-none focus:border-[var(--gold)]"
              />
            </div>

            {/* Dietary & Special Notes */}
            <div>
              <label className="text-xs uppercase tracking-wider text-[var(--muted)] block mb-1">
                Dietary Requirements or Special Table Requests
              </label>
              <textarea
                rows={3}
                placeholder="Allergies, high chair, floral arrangement, champagne on arrival..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-lg px-3.5 py-2 text-xs text-[var(--ivory)] focus:outline-none focus:border-[var(--gold)] resize-none"
              />
            </div>

            {/* Submit & Back buttons */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-[var(--muted)] hover:text-white"
              >
                &larr; Back
              </button>

              <button
                type="submit"
                className="px-8 py-3 bg-[var(--gold)] text-[var(--night)] font-semibold text-xs uppercase tracking-widest rounded hover:bg-white transition-colors shadow-lg"
              >
                Confirm Table Reservation
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Instant Confirmation Card */}
        {step === 3 && confirmedReservation && (
          <div className="p-8 sm:p-10 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[var(--emerald)]/30 border border-[var(--gold)] text-[var(--gold)] flex items-center justify-center mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[var(--gold)] bg-[var(--gold)]/10 px-3 py-1 rounded border border-[var(--gold)]/30">
                Booking Reference: {confirmedReservation.id}
              </span>
              <h3 className="font-serif text-3xl text-[var(--ivory)] mt-3">
                Your Table is Reserved
              </h3>
              <p className="text-xs sm:text-sm text-[var(--muted)] mt-2 max-w-md mx-auto">
                Thank you,{" "}
                <strong className="text-[var(--ivory)]">
                  {confirmedReservation.guestName}
                </strong>
                . A confirmation concierge dossier has been dispatched to{" "}
                <strong className="text-[var(--gold)]">
                  {confirmedReservation.email}
                </strong>
                .
              </p>
            </div>

            {/* Summary Ticket Box */}
            <div className="p-5 rounded-xl bg-white/[0.04] border border-white/10 max-w-md mx-auto text-left space-y-2 text-xs">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-[var(--muted)]">Party</span>
                <span className="text-[var(--ivory)] font-semibold">
                  {confirmedReservation.guests} Guests
                </span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-[var(--muted)]">Date & Time</span>
                <span className="text-[var(--ivory)] font-semibold">
                  {confirmedReservation.date} at {confirmedReservation.time}
                </span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="text-[var(--muted)]">Seating Area</span>
                <span className="text-[var(--gold)] font-medium">
                  {confirmedReservation.seatingArea}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">Occasion</span>
                <span className="text-[var(--ivory)]">
                  {confirmedReservation.occasion}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-[var(--muted)] italic">
              A 15-minute grace period is provided. For changes or early
              arrivals, please call our concierge.
            </p>

            <button
              onClick={resetAndClose}
              className="px-8 py-3 bg-[var(--gold)] text-[var(--night)] font-semibold text-xs uppercase tracking-widest rounded hover:bg-white transition-colors"
            >
              Done & Return to Site
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
