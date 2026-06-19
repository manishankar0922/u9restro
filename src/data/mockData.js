export const INITIAL_MENU = [
  {
    id: "item-1",
    name: "Paneer 65 (Andhra Style)",
    description: "Crispy fried cottage cheese cubes tossed in spicy yogurt-chili dressing, seasoned with curry leaves and green chilies.",
    price: 240.00,
    category: "Starters",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=400&q=80",
    tags: ["Veg", "Spicy"],
    spicyLevel: 2,
    inStock: true,
    prepTime: 8,
    popular: true
  },
  {
    id: "item-2",
    name: "Guntur Karam Kodi (Dry)",
    description: "Tender chicken chunks fried and tossed in a fiery, freshly ground Guntur chili spice blend and roasted cashew nuts.",
    price: 320.00,
    category: "Starters",
    image: "https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=400&q=80",
    tags: ["Non-Veg", "Spicy"],
    spicyLevel: 3,
    inStock: true,
    prepTime: 12,
    popular: true
  },
  {
    id: "item-3",
    name: "Andhra Onion Pakoda",
    description: "Crispy sliced onion fritters deep fried with gram flour, curry leaves, and crushed spices. Served with mint chutney.",
    price: 150.00,
    category: "Starters",
    image: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=400&q=80",
    tags: ["Veg", "Gluten-Free"],
    spicyLevel: 1,
    inStock: true,
    prepTime: 7,
    popular: false
  },
  {
    id: "item-4",
    name: "Nellore Chepala Pulusu",
    description: "Traditional tangy fish curry prepared with fresh catch in a sour tamarind gravy, tempered with fenugreek and mustard seeds.",
    price: 450.00,
    category: "Mains",
    image: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=400&q=80",
    tags: ["Non-Veg", "Spicy", "Gluten-Free"],
    spicyLevel: 3,
    inStock: true,
    prepTime: 18,
    popular: true
  },
  {
    id: "item-5",
    name: "Gongura Mamsam Curry",
    description: "A classic Andhra delicacy featuring tender chunks of mutton cooked in a rich gravy flavored with sour sorrel leaves (Gongura).",
    price: 480.00,
    category: "Mains",
    image: "https://images.unsplash.com/photo-1547825407-2d060104b7f8?auto=format&fit=crop&w=400&q=80",
    tags: ["Non-Veg", "Spicy", "Gluten-Free"],
    spicyLevel: 2,
    inStock: true,
    prepTime: 20,
    popular: true
  },
  {
    id: "item-6",
    name: "Andhra Veg Pulao",
    description: "Fragrant basmati rice cooked with seasonal vegetables, aromatic spices, mint, coriander, and served with onion raita.",
    price: 280.00,
    category: "Mains",
    image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=400&q=80",
    tags: ["Veg"],
    spicyLevel: 1,
    inStock: true,
    prepTime: 12,
    popular: false
  },
  {
    id: "item-7",
    name: "Double Ka Meetha",
    description: "A royal Hyderabadi bread pudding soaked in saffron-infused milk, sweetened syrup, topped with ghee-roasted dry fruits.",
    price: 160.00,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=400&q=80",
    tags: ["Veg"],
    spicyLevel: 0,
    inStock: true,
    prepTime: 8,
    popular: true
  },
  {
    id: "item-8",
    name: "Pootharekulu (Jaggery)",
    description: "Traditional paper-like sweet wafer from Atreyapuram, made of rice starch layer, filled with ghee and dry fruits.",
    price: 180.00,
    category: "Desserts",
    image: "https://images.unsplash.com/photo-1605698822071-a8d067756f70?auto=format&fit=crop&w=400&q=80",
    tags: ["Veg"],
    spicyLevel: 0,
    inStock: false, // out of stock initial state to show sync
    prepTime: 5,
    popular: false
  },
  {
    id: "item-9",
    name: "Masala Majjiga (Buttermilk)",
    description: "Refreshing spiced buttermilk mixed with blended yogurt, ginger, green chilies, curry leaves, and coriander.",
    price: 80.00,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1570197788417-0e5ff738823c?auto=format&fit=crop&w=400&q=80",
    tags: ["Veg", "Gluten-Free"],
    spicyLevel: 1,
    inStock: true,
    prepTime: 3,
    popular: true
  },
  {
    id: "item-10",
    name: "South Indian Filter Coffee",
    description: "Strong, aromatic chicory-blended coffee decoction mixed with frothed hot milk in a traditional brass tumbler.",
    price: 90.00,
    category: "Beverages",
    image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80",
    tags: ["Veg", "Gluten-Free"],
    spicyLevel: 0,
    inStock: true,
    prepTime: 4,
    popular: false
  }
];

export const INITIAL_TABLES = [
  { id: "T1", number: 1, capacity: 2, status: "vacant" },
  { id: "T2", number: 2, capacity: 4, status: "vacant" },
  { id: "T3", number: 3, capacity: 2, status: "vacant" },
  { id: "T4", number: 4, capacity: 6, status: "vacant" },
  { id: "T5", number: 5, capacity: 4, status: "occupied", currentOrderId: "order-101" },
  { id: "T6", number: 6, capacity: 4, status: "occupied", currentOrderId: "order-102" },
  { id: "T7", number: 7, capacity: 2, status: "vacant" },
  { id: "T8", number: 8, capacity: 8, status: "vacant" }
];

export const INITIAL_ORDERS = [
  {
    id: "order-101",
    tableNumber: 5,
    items: [
      { id: "item-1", name: "Paneer 65 (Andhra Style)", quantity: 2, price: 240.00, notes: "Make it extra spicy." },
      { id: "item-9", name: "Masala Majjiga (Buttermilk)", quantity: 2, price: 80.00, notes: "" }
    ],
    status: "preparing",
    notes: "Wants extra onions on side.",
    createdAt: new Date(Date.now() - 6 * 60 * 1000).toISOString(), // 6 mins ago
    totalPrice: 640.00
  },
  {
    id: "order-102",
    tableNumber: 6,
    items: [
      { id: "item-2", name: "Guntur Karam Kodi (Dry)", quantity: 1, price: 320.00, notes: "" },
      { id: "item-10", name: "South Indian Filter Coffee", quantity: 1, price: 90.00, notes: "" }
    ],
    status: "pending",
    notes: "",
    createdAt: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
    totalPrice: 410.00
  }
];

export const INITIAL_WAITER_REQUESTS = [
  {
    id: "req-1",
    tableNumber: 5,
    type: "water",
    status: "pending",
    createdAt: new Date(Date.now() - 4 * 60 * 1000).toISOString()
  }
];
