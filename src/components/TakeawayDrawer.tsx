import React, { useState } from "react"
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Tag,
  CheckCircle2,
  Clock,
  MapPin,
  Truck,
} from "lucide-react"
import { CartItem, TakeawayOrder } from "../types/restaurant"

interface TakeawayDrawerProps {
  isOpen: boolean
  onClose: () => void
  cart: CartItem[]
  onUpdateQuantity: (dishId: string, delta: number) => void
  onRemoveItem: (dishId: string) => void
  onClearCart: () => void
  onAddOrder: (order: TakeawayOrder) => void
}

export const TakeawayDrawer: React.FC<TakeawayDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onAddOrder,
}) => {
  const [orderType, setOrderType] = useState<"Pickup" | "Delivery">("Pickup")
  const [promoCode, setPromoCode] = useState("")
  const [discountPercent, setDiscountPercent] = useState(0)
  const [promoMessage, setPromoMessage] = useState("")
  const [customerName, setCustomerName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [placedOrder, setPlacedOrder] = useState<TakeawayOrder | null>(null)

  if (!isOpen) return null

  // Pricing calculations
  const subtotal = cart.reduce(
    (sum, item) => sum + item.item.price * item.quantity,
    0,
  )
  const discountAmount = Number((subtotal * discountPercent).toFixed(2))
  const deliveryFee = orderType === "Delivery" && subtotal > 0 ? 6.0 : 0
  const tax = Number(((subtotal - discountAmount) * 0.08).toFixed(2))
  const total = Number(
    (subtotal - discountAmount + deliveryFee + tax).toFixed(2),
  )

  const applyPromo = (e: React.FormEvent) => {
    e.preventDefault()
    const code = promoCode.trim().toUpperCase()
    if (code === "FIRST5") {
      setDiscountPercent(0.15)
      setPromoMessage("Promo FIRST5 applied! 15% discount.")
    } else if (code === "WELCOME") {
      setDiscountPercent(0.1)
      setPromoMessage("Promo WELCOME applied! 10% discount.")
    } else {
      setPromoMessage('Invalid promo code. Try "FIRST5" for 15% off.')
    }
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault()
    if (!customerName.trim() || !phone.trim() || cart.length === 0) return
    if (orderType === "Delivery" && !address.trim()) return

    const newOrder: TakeawayOrder = {
      id: `ORD-${Math.floor(100 + Math.random() * 900)}`,
      customerName,
      phone,
      orderType,
      deliveryAddress: orderType === "Delivery" ? address : undefined,
      items: cart.map((c) => ({
        name: c.item.name,
        quantity: c.quantity,
        price: c.item.price,
      })),
      subtotal,
      tax,
      discount: discountAmount,
      total,
      status: "Pending",
      estimatedTime: orderType === "Pickup" ? "25 mins" : "40 mins",
      createdAt: "Just now",
    }

    onAddOrder(newOrder)
    setPlacedOrder(newOrder)
    onClearCart()
    setIsCheckingOut(false)
  }

  const handleClose = () => {
    setPlacedOrder(null)
    setIsCheckingOut(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex justify-end">
      <div
        className="w-full max-w-md bg-[var(--night)] border-l border-[var(--gold)]/30 h-full flex flex-col justify-between shadow-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-[var(--forest)] to-[var(--night)]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-[var(--gold)] text-[var(--night)]">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg text-[var(--ivory)]">
                Order Takeaway
              </h3>
              <p className="text-[10px] text-[var(--muted)]">
                Hand-crafted fresh from our woodfire hearth
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close drawer"
            className="p-2 rounded-full hover:bg-white/10 text-[var(--muted)] hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6">
          {/* If an order was just placed, show Live Tracker */}
          {placedOrder ? (
            <div className="text-center py-6 space-y-6">
              <div className="w-16 h-16 rounded-full bg-[var(--emerald)]/30 border border-[var(--gold)] text-[var(--gold)] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-[10px] font-mono tracking-widest text-[var(--gold)] bg-[var(--gold)]/10 px-3 py-1 rounded border border-[var(--gold)]/30">
                  {placedOrder.id}
                </span>
                <h4 className="font-serif text-2xl text-[var(--ivory)] mt-2">
                  Order Confirmed
                </h4>
                <p className="text-xs text-[var(--muted)] mt-1">
                  Thank you,{" "}
                  <strong className="text-white">
                    {placedOrder.customerName}
                  </strong>
                  ! Your kitchen ticket has been fired.
                </p>
              </div>

              {/* Live Status Tracker */}
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 text-left space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[var(--gold)] font-medium flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" /> Est. Time:{" "}
                    {placedOrder.estimatedTime}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--emerald)] text-white font-mono uppercase">
                    {placedOrder.status}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-[var(--gold)] h-full w-1/3 animate-pulse" />
                  </div>
                  <div className="flex justify-between text-[9px] text-[var(--muted)]">
                    <span className="text-[var(--gold)] font-medium">
                      1. Received
                    </span>
                    <span>2. In Kitchen</span>
                    <span>3. Ready</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 text-[11px] text-[var(--muted)]">
                  <p>
                    Order Type:{" "}
                    <strong className="text-white">
                      {placedOrder.orderType}
                    </strong>
                  </p>
                  {placedOrder.deliveryAddress && (
                    <p className="truncate">
                      Address:{" "}
                      <span className="text-white">
                        {placedOrder.deliveryAddress}
                      </span>
                    </p>
                  )}
                  <p className="mt-1 font-semibold text-[var(--gold)]">
                    Total: ${placedOrder.total}
                  </p>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-3 bg-[var(--gold)] text-[var(--night)] font-semibold text-xs uppercase tracking-widest rounded hover:bg-white transition-colors"
              >
                Close & Return
              </button>
            </div>
          ) : isCheckingOut ? (
            /* Checkout Form */
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-xs uppercase tracking-wider text-[var(--gold)] font-medium">
                  Guest & Delivery Details
                </span>
                <button
                  type="button"
                  onClick={() => setIsCheckingOut(false)}
                  className="text-xs text-[var(--muted)] hover:text-white"
                >
                  &larr; Back to Cart
                </button>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-[var(--muted)] block mb-1">
                  Your Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Marcus Sterling"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
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
                  placeholder="+1 (555) 123-4567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-lg px-3.5 py-2.5 text-xs text-[var(--ivory)] focus:outline-none focus:border-[var(--gold)]"
                />
              </div>

              {orderType === "Delivery" && (
                <div>
                  <label className="text-xs uppercase tracking-wider text-[var(--muted)] block mb-1">
                    Delivery Address *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Street address, apartment/suite number, buzzer..."
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-lg px-3.5 py-2 text-xs text-[var(--ivory)] focus:outline-none focus:border-[var(--gold)] resize-none"
                  />
                </div>
              )}

              {/* Payment selector preview */}
              <div className="p-3.5 rounded-lg bg-white/[0.03] border border-white/10 text-xs text-[var(--muted)] space-y-1.5">
                <span className="text-[var(--gold)] font-medium block">
                  Payment Method
                </span>
                <p>
                  Card or Contactless Payment processed securely on
                  collection/dispatch.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[var(--gold)] text-[var(--night)] font-semibold text-xs uppercase tracking-widest rounded hover:bg-white transition-colors shadow-lg mt-4"
              >
                Place Order (${total})
              </button>
            </form>
          ) : (
            /* Standard Cart Items View */
            <>
              {/* Order Type Selector */}
              <div className="grid grid-cols-2 p-1 bg-white/[0.05] rounded-lg border border-white/10 text-xs">
                <button
                  type="button"
                  onClick={() => setOrderType("Pickup")}
                  className={`py-2 rounded-md font-medium flex items-center justify-center gap-1.5 transition-colors ${
                    orderType === "Pickup"
                      ? "bg-[var(--gold)] text-[var(--night)] shadow"
                      : "text-[var(--muted)] hover:text-white"
                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Pickup (25m)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setOrderType("Delivery")}
                  className={`py-2 rounded-md font-medium flex items-center justify-center gap-1.5 transition-colors ${
                    orderType === "Delivery"
                      ? "bg-[var(--gold)] text-[var(--night)] shadow"
                      : "text-[var(--muted)] hover:text-white"
                  }`}
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Delivery (40m)</span>
                </button>
              </div>

              {/* Cart Items List */}
              {cart.length === 0 ? (
                <div className="text-center py-16 space-y-3">
                  <ShoppingBag className="w-12 h-12 text-[var(--muted)]/40 mx-auto" />
                  <p className="font-serif text-lg text-[var(--ivory)]">
                    Your bag is empty
                  </p>
                  <p className="text-xs text-[var(--muted)] max-w-xs mx-auto font-light">
                    Explore our woodfire menu and add Chef Aarav’s signatures to
                    your takeaway order.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.item.id}
                      className="p-3.5 rounded-lg bg-white/[0.03] border border-white/10 flex gap-3 items-center justify-between"
                    >
                      <img
                        src={item.item.image}
                        alt={item.item.name}
                        className="w-14 h-14 object-cover rounded shrink-0"
                      />

                      <div className="flex-1 min-w-0 pr-2">
                        <h4 className="font-serif text-sm text-[var(--ivory)] truncate">
                          {item.item.name}
                        </h4>
                        <p className="text-[11px] text-[var(--gold)]">
                          ${item.item.price} each
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center bg-white/10 rounded border border-white/10">
                          <button
                            onClick={() => onUpdateQuantity(item.item.id, -1)}
                            className="p-1 hover:text-[var(--gold)]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.item.id, 1)}
                            className="p-1 hover:text-[var(--gold)]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.item.id)}
                          className="p-1 text-red-400 hover:text-red-300 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Promo Code Input */}
              {cart.length > 0 && (
                <form
                  onSubmit={applyPromo}
                  className="space-y-1.5 pt-2 border-t border-white/10"
                >
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo code (e.g. FIRST5)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 bg-white/5 border border-white/15 rounded px-3 py-1.5 text-xs text-[var(--ivory)] uppercase focus:outline-none focus:border-[var(--gold)]"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 bg-white/10 text-[var(--gold)] border border-white/15 rounded text-xs uppercase tracking-wider hover:bg-white/20"
                    >
                      Apply
                    </button>
                  </div>
                  {promoMessage && (
                    <p
                      className={`text-[11px] ${
                        discountPercent > 0
                          ? "text-emerald-400"
                          : "text-amber-400"
                      }`}
                    >
                      {promoMessage}
                    </p>
                  )}
                </form>
              )}
            </>
          )}
        </div>

        {/* Bottom Checkout Actions */}
        {cart.length > 0 && !placedOrder && !isCheckingOut && (
          <div className="p-5 sm:p-6 border-t border-white/10 bg-[#071712] space-y-3">
            {/* Price breakdown */}
            <div className="space-y-1.5 text-xs text-[var(--muted)]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[var(--ivory)]">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-400">
                  <span>Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              {orderType === "Delivery" && (
                <div className="flex justify-between">
                  <span>Chauffeur Delivery Fee</span>
                  <span className="text-[var(--ivory)]">
                    ${deliveryFee.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span className="text-[var(--ivory)]">${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-white/10 text-sm font-semibold text-[var(--ivory)]">
                <span>Total Amount</span>
                <span className="text-[var(--gold)] font-serif text-lg">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCheckingOut(true)}
              className="w-full py-3.5 bg-[var(--gold)] text-[var(--night)] font-semibold text-xs uppercase tracking-widest rounded hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-xl"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
