import React, { useState } from "react"
import {
  SlidersHorizontal,
  Users,
  DollarSign,
  ShoppingBag,
  Flame,
  Calendar,
  CheckCircle,
  Clock,
  Search,
  ArrowLeft,
  RefreshCw,
  AlertCircle,
  Utensils,
} from "lucide-react"
import {
  Reservation,
  TakeawayOrder,
  RestaurantTable,
} from "../types/restaurant"

interface StaffDashboardProps {
  onClose: () => void
  reservations: Reservation[]
  orders: TakeawayOrder[]
  tables: RestaurantTable[]
  onUpdateReservationStatus: (
    id: string,
    newStatus: Reservation["status"],
  ) => void
  onUpdateOrderStatus: (id: string, newStatus: TakeawayOrder["status"]) => void
  onToggleTableStatus: (tableId: number) => void
}

export const StaffDashboard: React.FC<StaffDashboardProps> = ({
  onClose,
  reservations,
  orders,
  tables,
  onUpdateReservationStatus,
  onUpdateOrderStatus,
  onToggleTableStatus,
}) => {
  const [activeTab, setActiveTab] =
    useState<"reservations" | "orders" | "tables">("reservations")
  const [searchResQuery, setSearchResQuery] = useState("")
  const [resFilter, setResFilter] =
    useState<"All" | "Confirmed" | "Seated" | "Completed">("All")

  // Total daily revenue mock calculation
  const totalOrderRevenue = orders.reduce((sum, o) => sum + o.total, 0)
  const totalEstimatedCovers = reservations.reduce(
    (sum, r) => sum + r.guests,
    0,
  )
  const estimatedDineInRevenue = totalEstimatedCovers * 95 // average spend $95/cover
  const totalRevenue = totalOrderRevenue + estimatedDineInRevenue

  const filteredReservations = reservations.filter((r) => {
    if (resFilter !== "All" && r.status !== resFilter) return false
    if (searchResQuery.trim()) {
      const q = searchResQuery.toLowerCase()
      return (
        r.guestName.toLowerCase().includes(q) ||
        r.phone.includes(q) ||
        r.id.toLowerCase().includes(q)
      )
    }
    return true
  })

  return (
    <div className="min-h-screen bg-[#05110d] text-[var(--ivory)] font-sans">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-[#071a14]/95 backdrop-blur-md border-b border-[var(--gold)]/30 px-6 lg:px-12 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 hover:border-[var(--gold)] text-xs text-[var(--gold)] bg-white/5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Guest Website</span>
          </button>

          <div className="hidden sm:block h-6 w-px bg-white/10" />

          <div>
            <h1 className="font-serif text-lg tracking-wide text-[var(--ivory)] flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[var(--gold)]" />
              <span>5 Fingers Management Dashboard</span>
            </h1>
            <p className="text-[10px] text-[var(--muted)]">
              Live Service & Floor Operations
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 text-xs rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Live Kitchen Connected</span>
          </div>
          <span className="text-xs text-[var(--muted)] font-mono">
            Service: Dinner
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 lg:p-10 space-y-8">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center justify-between text-xs text-[var(--muted)] mb-2">
              <span>Today's Total Revenue</span>
              <DollarSign className="w-4 h-4 text-[var(--gold)]" />
            </div>
            <p className="text-2xl sm:text-3xl font-serif text-[var(--gold)]">
              ${totalRevenue.toLocaleString()}
            </p>
            <p className="text-[10px] text-emerald-400 mt-1 font-mono">
              +16.4% vs last Sunday
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center justify-between text-xs text-[var(--muted)] mb-2">
              <span>Table Reservations</span>
              <Calendar className="w-4 h-4 text-[var(--gold)]" />
            </div>
            <p className="text-2xl sm:text-3xl font-serif text-[var(--ivory)]">
              {reservations.length} Bookings
            </p>
            <p className="text-[10px] text-[var(--muted)] mt-1">
              {totalEstimatedCovers} total guests expected
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center justify-between text-xs text-[var(--muted)] mb-2">
              <span>Active Takeaway Orders</span>
              <ShoppingBag className="w-4 h-4 text-[var(--gold)]" />
            </div>
            <p className="text-2xl sm:text-3xl font-serif text-[var(--ivory)]">
              {orders.length} Orders
            </p>
            <p className="text-[10px] text-amber-400 mt-1">
              ${totalOrderRevenue.toFixed(2)} active balance
            </p>
          </div>

          <div className="p-5 rounded-xl bg-white/[0.03] border border-white/10">
            <div className="flex items-center justify-between text-xs text-[var(--muted)] mb-2">
              <span>Hearth Kitchen Load</span>
              <Flame className="w-4 h-4 text-orange-400" />
            </div>
            <p className="text-2xl sm:text-3xl font-serif text-[var(--ivory)]">
              82% Load
            </p>
            <p className="text-[10px] text-emerald-400 mt-1">
              Average wait time 22 mins
            </p>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex border-b border-white/10 gap-3">
          <button
            onClick={() => setActiveTab("reservations")}
            className={`pb-3 text-xs uppercase tracking-widest font-semibold transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === "reservations"
                ? "border-[var(--gold)] text-[var(--gold)]"
                : "border-transparent text-[var(--muted)] hover:text-white"
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Table Reservations ({reservations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-3 text-xs uppercase tracking-widest font-semibold transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === "orders"
                ? "border-[var(--gold)] text-[var(--gold)]"
                : "border-transparent text-[var(--muted)] hover:text-white"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Takeaway Queue ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("tables")}
            className={`pb-3 text-xs uppercase tracking-widest font-semibold transition-colors flex items-center gap-2 border-b-2 ${
              activeTab === "tables"
                ? "border-[var(--gold)] text-[var(--gold)]"
                : "border-transparent text-[var(--muted)] hover:text-white"
            }`}
          >
            <Utensils className="w-4 h-4" />
            <span>Floor Plan & Tables ({tables.length})</span>
          </button>
        </div>

        {/* TAB 1: RESERVATIONS LIST */}
        {activeTab === "reservations" && (
          <div className="space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-stretch sm:items-center">
              <div className="relative min-w-[280px]">
                <Search className="w-4 h-4 text-[var(--muted)] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Filter guest name, phone, or reference ID..."
                  value={searchResQuery}
                  onChange={(e) => setSearchResQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-xs text-[var(--ivory)] focus:outline-none focus:border-[var(--gold)]"
                />
              </div>

              <div className="flex gap-2">
                {(["All", "Confirmed", "Seated", "Completed"] as const).map(
                  (status) => (
                    <button
                      key={status}
                      onClick={() => setResFilter(status)}
                      className={`px-3 py-1.5 rounded text-xs uppercase tracking-wider transition-colors ${
                        resFilter === status
                          ? "bg-[var(--emerald)] text-white font-medium"
                          : "bg-white/5 text-[var(--muted)] hover:text-white"
                      }`}
                    >
                      {status}
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* Reservations Table */}
            <div className="rounded-xl border border-white/10 overflow-hidden bg-white/[0.02]">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-white/5 uppercase tracking-wider text-[var(--gold)] font-mono text-[10px]">
                    <tr>
                      <th className="p-4">Ref ID</th>
                      <th className="p-4">Guest</th>
                      <th className="p-4">Time & Date</th>
                      <th className="p-4">Party Size</th>
                      <th className="p-4">Area</th>
                      <th className="p-4">Occasion & Notes</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredReservations.map((res) => (
                      <tr
                        key={res.id}
                        className="hover:bg-white/[0.02] transition-colors"
                      >
                        <td className="p-4 font-mono font-medium text-[var(--gold)]">
                          {res.id}
                        </td>
                        <td className="p-4">
                          <p className="font-semibold text-[var(--ivory)]">
                            {res.guestName}
                          </p>
                          <p className="text-[10px] text-[var(--muted)]">
                            {res.phone}
                          </p>
                        </td>
                        <td className="p-4">
                          <p className="font-medium text-white">{res.time}</p>
                          <p className="text-[10px] text-[var(--muted)]">
                            {res.date}
                          </p>
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 font-medium">
                            {res.guests} Guests
                          </span>
                        </td>
                        <td className="p-4 text-[var(--muted)]">
                          {res.seatingArea}
                        </td>
                        <td className="p-4 max-w-xs">
                          <span className="text-[10px] uppercase tracking-wider text-[var(--gold)] block">
                            {res.occasion}
                          </span>
                          <p className="text-[11px] text-[var(--muted)] truncate">
                            {res.notes || "No special notes"}
                          </p>
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2.5 py-1 rounded text-[10px] uppercase font-semibold font-mono ${
                              res.status === "Confirmed"
                                ? "bg-blue-900/40 text-blue-300 border border-blue-500/30"
                                : res.status === "Seated"
                                  ? "bg-emerald-900/40 text-emerald-300 border border-emerald-500/30"
                                  : res.status === "Completed"
                                    ? "bg-slate-800 text-slate-300"
                                    : "bg-red-900/40 text-red-300"
                            }`}
                          >
                            {res.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          {res.status === "Confirmed" && (
                            <button
                              onClick={() =>
                                onUpdateReservationStatus(res.id, "Seated")
                              }
                              className="px-3 py-1 bg-emerald-700 hover:bg-emerald-600 text-white rounded text-[10px] uppercase tracking-wider"
                            >
                              Seat Guests
                            </button>
                          )}
                          {res.status === "Seated" && (
                            <button
                              onClick={() =>
                                onUpdateReservationStatus(res.id, "Completed")
                              }
                              className="px-3 py-1 bg-[var(--gold)] hover:bg-white text-[var(--night)] font-semibold rounded text-[10px] uppercase tracking-wider"
                            >
                              Complete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TAKEAWAY QUEUE */}
        {activeTab === "orders" && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-5 rounded-xl bg-white/[0.03] border border-white/10 flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                    <div>
                      <span className="font-mono text-xs text-[var(--gold)] font-bold">
                        {order.id}
                      </span>
                      <h4 className="font-semibold text-sm text-[var(--ivory)] mt-0.5">
                        {order.customerName}
                      </h4>
                      <p className="text-[10px] text-[var(--muted)]">
                        {order.phone}
                      </p>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded text-[10px] font-mono uppercase font-semibold ${
                        order.status === "Pending"
                          ? "bg-amber-900/40 text-amber-300 border border-amber-500/30"
                          : order.status === "In the Kitchen"
                            ? "bg-orange-900/40 text-orange-300 border border-orange-500/30"
                            : order.status === "Ready"
                              ? "bg-emerald-900/40 text-emerald-300 border border-emerald-500/30"
                              : "bg-slate-800 text-slate-300"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <p className="text-[10px] uppercase tracking-wider text-[var(--muted)]">
                      Order Items ({order.items.length}):
                    </p>
                    {order.items.map((it, idx) => (
                      <div
                        key={idx}
                        className="flex justify-between text-xs text-[var(--ivory)]"
                      >
                        <span>
                          {it.quantity}x {it.name}
                        </span>
                        <span className="text-[var(--gold)]">
                          ${(it.price * it.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {order.deliveryAddress && (
                    <div className="mt-3 p-2 rounded bg-white/5 text-[11px] text-[var(--muted)] truncate">
                      <strong>Delivery:</strong> {order.deliveryAddress}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[var(--muted)] block">
                      Total Charged
                    </span>
                    <span className="font-serif text-lg font-semibold text-[var(--gold)]">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>

                  {/* Status Progression Button */}
                  {order.status === "Pending" && (
                    <button
                      onClick={() =>
                        onUpdateOrderStatus(order.id, "In the Kitchen")
                      }
                      className="px-3 py-1.5 bg-orange-700 hover:bg-orange-600 text-white rounded text-[11px] uppercase tracking-wider"
                    >
                      Fire in Kitchen &rarr;
                    </button>
                  )}
                  {order.status === "In the Kitchen" && (
                    <button
                      onClick={() => onUpdateOrderStatus(order.id, "Ready")}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded text-[11px] uppercase tracking-wider"
                    >
                      Mark Ready &rarr;
                    </button>
                  )}
                  {order.status === "Ready" && (
                    <button
                      onClick={() => onUpdateOrderStatus(order.id, "Completed")}
                      className="px-3 py-1.5 bg-[var(--gold)] text-[var(--night)] font-semibold rounded text-[11px] uppercase tracking-wider"
                    >
                      Complete &rarr;
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: TABLE FLOOR PLAN MAP */}
        {activeTab === "tables" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-xl text-[var(--ivory)]">
                  Dining Room Floor Plan
                </h3>
                <p className="text-xs text-[var(--muted)]">
                  Click on any table to toggle status or inspect guest
                  assignment
                </p>
              </div>

              <div className="flex items-center gap-4 text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-emerald-600 inline-block" />{" "}
                  Occupied
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-[var(--gold)] inline-block" />{" "}
                  Reserved
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded bg-white/20 inline-block" />{" "}
                  Available
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {tables.map((table) => {
                const color =
                  table.status === "occupied"
                    ? "border-emerald-500/60 bg-emerald-950/40 text-emerald-300"
                    : table.status === "reserved"
                      ? "border-[var(--gold)]/60 bg-[var(--gold)]/10 text-[var(--gold)]"
                      : "border-white/10 bg-white/[0.02] text-[var(--muted)]"

                return (
                  <div
                    key={table.id}
                    onClick={() => onToggleTableStatus(table.id)}
                    className={`p-4 rounded-xl border ${color} cursor-pointer hover:scale-102 transition-transform space-y-2`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-xs font-bold">
                        {table.name}
                      </span>
                      <span className="text-[10px] uppercase font-mono tracking-wider">
                        {table.capacity} Seats
                      </span>
                    </div>

                    <p className="text-[11px] text-[var(--muted)]">
                      {table.area}
                    </p>

                    <div className="pt-2 border-t border-white/10 text-xs">
                      {table.status === "occupied" ? (
                        <div>
                          <span className="text-[9px] uppercase tracking-wider block text-emerald-400 font-semibold">
                            Active Diner
                          </span>
                          <p className="text-white truncate">
                            {table.currentReservation?.guestName ||
                              "Walk-in Guests"}
                          </p>
                        </div>
                      ) : table.status === "reserved" ? (
                        <div>
                          <span className="text-[9px] uppercase tracking-wider block text-[var(--gold)] font-semibold">
                            Reserved · {table.currentReservation?.time}
                          </span>
                          <p className="text-white truncate">
                            {table.currentReservation?.guestName}
                          </p>
                        </div>
                      ) : (
                        <span className="text-[10px] uppercase tracking-wider text-slate-400">
                          Available
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
