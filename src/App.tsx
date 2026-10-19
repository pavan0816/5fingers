import { useEffect, useState, useMemo } from "react"
import { Navbar } from "./components/Navbar"
import { Hero } from "./components/Hero"
import { SignatureCollection } from "./components/SignatureCollection"
import { StoryPhilosophy } from "./components/StoryPhilosophy"
import { MenuSection } from "./components/MenuSection"
import { DegustationSection } from "./components/DegustationSection"
import { AmbianceGallery } from "./components/AmbianceGallery"
import { AccoladesReviews } from "./components/AccoladesReviews"
import { Footer } from "./components/Footer"
import { ReservationModal } from "./components/ReservationModal"
import { TakeawayDrawer } from "./components/TakeawayDrawer"
import { DishDetailModal } from "./components/DishDetailModal"
import { StaffDashboard } from "./components/StaffDashboard"
import { ToastContainer, ToastMessage } from "./components/Toast"

import {
  MENU_ITEMS,
  INITIAL_RESERVATIONS,
  INITIAL_TAKEAWAY_ORDERS,
  RESTAURANT_TABLES,
} from "./data/menuData"
import {
  MenuItem,
  CartItem,
  Reservation,
  TakeawayOrder,
  RestaurantTable,
} from "./types/restaurant"

export function App() {
  // Global Navigation & UI states
  const [scrolled, setScrolled] = useState(false)
  const [isReservationOpen, setIsReservationOpen] = useState(false)
  const [reservationOccasion, setReservationOccasion] =
    useState<Reservation["occasion"]>("Casual Dining")
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isDashboardOpen, setIsDashboardOpen] = useState(false)
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null)

  // Data states
  const [cart, setCart] = useState<CartItem[]>([])
  const [reservations, setReservations] =
    useState<Reservation[]>(INITIAL_RESERVATIONS)
  const [orders, setOrders] = useState<TakeawayOrder[]>(INITIAL_TAKEAWAY_ORDERS)
  const [tables, setTables] = useState<RestaurantTable[]>(RESTAURANT_TABLES)
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  // Setup parallax pointer listeners and scroll listener
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    const onPointer = (event: PointerEvent) => {
      document.documentElement.style.setProperty(
        "--pointer-x",
        `${(event.clientX / window.innerWidth - 0.5) * 2}`,
      )
      document.documentElement.style.setProperty(
        "--pointer-y",
        `${(event.clientY / window.innerHeight - 0.5) * 2}`,
      )
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("pointermove", onPointer, { passive: true })
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("pointermove", onPointer)
    }
  }, [])

  // Toast notification helper
  const addToast = (title: string, description?: string) => {
    const id = `${Date.now()}-${Math.random()}`
    setToasts((prev) => [...prev, { id, title, description }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 4000)
  }

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  // Cart operations
  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }, [cart])

  const cartItemIds = useMemo(() => {
    const map: Record<string, number> = {}
    for (const item of cart) {
      map[item.item.id] = item.quantity
    }
    return map
  }, [cart])

  const handleAddToCart = (dish: MenuItem, quantity: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.item.id === dish.id)
      if (existing) {
        return prev.map((i) =>
          i.item.id === dish.id ? { ...i, quantity: i.quantity + quantity } : i,
        )
      }
      return [...prev, { item: dish, quantity }]
    })

    addToast(
      `${dish.name} added to bag`,
      `${quantity} portion${quantity > 1 ? "s" : ""} added to takeaway order.`,
    )
  }

  const handleUpdateCartQuantity = (dishId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((i) => {
          if (i.item.id === dishId) {
            const nextQty = i.quantity + delta
            return nextQty > 0 ? { ...i, quantity: nextQty } : null
          }
          return i
        })
        .filter(Boolean) as CartItem[]
    })
  }

  const handleRemoveFromCart = (dishId: string) => {
    setCart((prev) => prev.filter((i) => i.item.id !== dishId))
  }

  const handleClearCart = () => {
    setCart([])
  }

  // Reservation operations
  const handleOpenReservation = (
    occasion: Reservation["occasion"] = "Casual Dining",
  ) => {
    setReservationOccasion(occasion)
    setIsReservationOpen(true)
  }

  const handleAddReservation = (newRes: Reservation) => {
    setReservations((prev) => [newRes, ...prev])
    addToast(
      "Table Reservation Confirmed",
      `Booking #${newRes.id} for ${newRes.guestName} (${newRes.guests} guests) on ${newRes.date} at ${newRes.time}.`,
    )
  }

  // Takeaway order operations
  const handleAddOrder = (newOrder: TakeawayOrder) => {
    setOrders((prev) => [newOrder, ...prev])
    addToast(
      "Takeaway Order Placed",
      `Order #${newOrder.id} sent to hearth kitchen. Est. prep time ${newOrder.estimatedTime}.`,
    )
  }

  // Dashboard status modifications
  const handleUpdateReservationStatus = (
    id: string,
    newStatus: Reservation["status"],
  ) => {
    setReservations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)),
    )
    addToast(
      "Reservation Updated",
      `Booking #${id} status changed to ${newStatus}`,
    )
  }

  const handleUpdateOrderStatus = (
    id: string,
    newStatus: TakeawayOrder["status"],
  ) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o)),
    )
    addToast("Order Status Updated", `Order #${id} marked as ${newStatus}`)
  }

  const handleToggleTableStatus = (tableId: number) => {
    setTables((prev) =>
      prev.map((t) => {
        if (t.id === tableId) {
          const nextStatus =
            t.status === "available"
              ? "reserved"
              : t.status === "reserved"
                ? "occupied"
                : "available"
          return { ...t, status: nextStatus }
        }
        return t
      }),
    )
  }

  // Quick navigation helpers
  const handleExploreMenu = () => {
    const el = document.getElementById("menu")
    el?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="site">
      {/* If Staff Dashboard is open, render management portal */}
      {isDashboardOpen ? (
        <StaffDashboard
          onClose={() => setIsDashboardOpen(false)}
          reservations={reservations}
          orders={orders}
          tables={tables}
          onUpdateReservationStatus={handleUpdateReservationStatus}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          onToggleTableStatus={handleToggleTableStatus}
        />
      ) : (
        /* Guest Experience View */
        <>
          {/* Header Navigation */}
          <Navbar
            scrolled={scrolled}
            cartCount={cartCount}
            onOpenCart={() => setIsCartOpen(true)}
            onOpenReservation={() => handleOpenReservation("Casual Dining")}
            onToggleDashboard={() => setIsDashboardOpen(true)}
            isDashboardOpen={isDashboardOpen}
          />

          <main>
            {/* 1. Hero Section with 3D Depth & Steam */}
            <Hero
              onOpenReservation={() => handleOpenReservation("Casual Dining")}
              onOpenCart={() => setIsCartOpen(true)}
              onExploreMenu={handleExploreMenu}
            />

            {/* 2. Signature Collection Showcase */}
            <SignatureCollection
              items={MENU_ITEMS}
              onSelectDish={(dish) => setSelectedDish(dish)}
              onAddToCart={(dish) => handleAddToCart(dish)}
              onExploreFullMenu={handleExploreMenu}
            />

            {/* 3. The 5 Fingers Philosophy & Executive Chef */}
            <StoryPhilosophy />

            {/* 4. Complete Interactive Dining & Takeaway Menu */}
            <MenuSection
              items={MENU_ITEMS}
              cartItemIds={cartItemIds}
              onSelectDish={(dish) => setSelectedDish(dish)}
              onAddToCart={(dish) => handleAddToCart(dish)}
              onOpenReservation={() => handleOpenReservation("Casual Dining")}
            />

            {/* 5. The Chef's 7-Course Degustation Journey */}
            <DegustationSection
              onReserveTasting={() => handleOpenReservation("Tasting Menu")}
            />

            {/* 6. Ambiance & Architecture Gallery */}
            <AmbianceGallery />

            {/* 7. Critic Accolades & Verified Reviews */}
            <AccoladesReviews />
          </main>

          {/* 8. Comprehensive Footer with Newsletter, Hours & Location */}
          <Footer
            onOpenReservation={() => handleOpenReservation("Casual Dining")}
            onOpenCart={() => setIsCartOpen(true)}
          />
        </>
      )}

      {/* Interactive Modals and Drawers */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        onAddReservation={handleAddReservation}
        initialOccasion={reservationOccasion}
      />

      <TakeawayDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onAddOrder={handleAddOrder}
      />

      <DishDetailModal
        dish={selectedDish}
        onClose={() => setSelectedDish(null)}
        onAddToCart={(dish, qty) => handleAddToCart(dish, qty)}
        inCartQty={selectedDish ? cartItemIds[selectedDish.id] || 0 : 0}
      />

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  )
}

export default App
