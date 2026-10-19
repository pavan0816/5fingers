export type DietaryTag = "Vegetarian" | "Vegan" | "Gluten-Free" | "Halal" | "Chef Special" | "Spicy"

export interface MenuItem {
  id: string
  name: string
  tagline: string
  description: string
  price: number
  category: "starters" | "tandoor" | "mains" | "breads" | "desserts" | "cocktails"
  image: string
  tags: DietaryTag[]
  spiceLevel?: 0 | 1 | 2 | 3
  ingredients: string[]
  allergens?: string[]
  isChefSignature?: boolean
  calories?: number
  pairing?: string
}

export interface CartItem {
  item: MenuItem
  quantity: number
  specialInstructions?: string
}

export interface Reservation {
  id: string
  guestName: string
  email: string
  phone: string
  date: string
  time: string
  guests: number
  seatingArea: "Main Dining Hall" | "Chef's Counter" | "Botanical Courtyard" | "Private Wine Cellar"
  occasion: "Casual Dining" | "Birthday" | "Anniversary" | "Business" | "Tasting Menu"
  notes?: string
  status: "Confirmed" | "Seated" | "Completed" | "Cancelled"
  createdAt: string
}

export interface TakeawayOrder {
  id: string
  customerName: string
  phone: string
  orderType: "Pickup" | "Delivery"
  deliveryAddress?: string
  items: {
    name: string
    quantity: number
    price: number
  }[]
  subtotal: number
  tax: number
  discount: number
  total: number
  status: "Pending" | "In the Kitchen" | "Ready" | "Completed"
  estimatedTime: string
  createdAt: string
}

export interface RestaurantTable {
  id: number
  name: string
  capacity: number
  area: "Main Dining Hall" | "Chef's Counter" | "Botanical Courtyard" | "Private Wine Cellar"
  status: "available" | "reserved" | "occupied"
  currentReservation?: {
    guestName: string
    time: string
    guests: number
  }
}
