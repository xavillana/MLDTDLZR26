// data/tartas.js
export const tartas = [
  {
    id: "marcos-no-me-tientes",
    name: "Marcos No Me Tientes",
    emoji: "🍰",
    shortDescription: "Vainilla inocente que se vuelve pecadora con frutos rojos.",
    longDescription: "Bizcocho de vainilla esponjoso que finge ser angelical, pero está relleno de crema suave y frutos rojos que te hacen gemir al primer bocado. Prohibida para corazones débiles.",
    ingredients: [ 'Color seductor',
            'Textura aterciopelada',
            'Sabor equilibrado entre cacao y vainilla',
            'Frosting de crema de queso',
            'Ideal para ocasiones románticas'
],
    formats: ["Tarta"],
    price: 35,
    cupcakePrice: 3.8,
    badges: [],
    image: "img/TARTA-MARCOS.JPG",
    sizes: [
      { size: "Pequeña", price: 25, servings: 6 },
      { size: "Mediana", price: 35, servings: 10 },
      { size: "Grande", price: 45, servings: 15 },
      { size: "XL", price: 55, servings: 20 }
    ]
  },
  {
    id: "muerte-por-chocolate",
    name: "Muerte por Chocolate",
    emoji: "🍫",
    shortDescription: "Chocolate tan intenso que debería venir con advertencia.",
    longDescription: "Una orgía de chocolate negro, brownie húmedo y ganache brillante. Para los que no temen caer en la tentación más oscura.",
    ingredients: ["Chocolate 70%", "Brownie", "Ganache", "Cacao puro"],
    formats: ["Tarta"],
    price: 40,
    badges: [],
    image: "img/MUERTEPORCHOCOLATE.JPG",
    sizes: [
      { size: "Pequeña", price: 30, servings: 6 },
      { size: "Mediana", price: 40, servings: 10 },
      { size: "Grande", price: 50, servings: 15 },
      { size: "XL", price: 60, servings: 20 }
    ]
  },
  {
    id: "red-velvet-cake",
    name: "Red Velvet Cake",
    emoji: "🍫",
    shortDescription: "Chocolate tan intenso que debería venir con advertencia.",
    longDescription: "Una orgía de chocolate negro, brownie húmedo y ganache brillante. Para los que no temen caer en la tentación más oscura.",
    ingredients: ["Chocolate 70%", "Brownie", "Ganache", "Cacao puro"],
    formats: ["Tarta"],
    price: 40,
    badges: [],
    image: "img/REDVELVETCAKE.JPG",
    sizes: [
      { size: "Pequeña", price: 30, servings: 6 },
      { size: "Mediana", price: 40, servings: 10 },
      { size: "Grande", price: 50, servings: 15 },
      { size: "XL", price: 60, servings: 20 }
    ]
  },
  {
    id: "tiamisu",
    name: "Tía, Misú",
    emoji: "☕",
    shortDescription: "Tiramisú con actitud rebelde.",
    longDescription: "Café fuerte, mascarpone cremoso y cacao amargo. Un clásico italiano con actitud rebelde.",
    ingredients: ["Café espresso", "Mascarpone", "Savoiardi", "Cacao amargo", "Marsala", "Huevos frescos"],
    formats: ["Tarta"],
    price: 38,
    badges: ["CLÁSICO"],
    image: "img/TIAMISU.JPG",
    sizes: [
      { size: "Pequeña", price: 28, servings: 6 },
      { size: "Mediana", price: 38, servings: 10 },
      { size: "Grande", price: 48, servings: 15 },
      { size: "XL", price: 58, servings: 20 }
    ]
  },
  {
    id: "revolcon-fresnata",
    name: "Revolcón Fresnata",
    emoji: "🍓",
    shortDescription: "Fresas frescas y nata que no pide permiso.",
    longDescription: "Bizcocho ligero, nata montada y fresas maduras. Un verano eterno en cada bocado.",
    ingredients: ["Fresas frescas", "Nata 35%", "Bizcocho genovés", "Azúcar glas", "Vainilla"],
    formats: ["Tarta"],
    price: 36,
    oldPrice: 42,
    badges: ["DESCUENTO"],
    image: "img/FRESNATA.jpg",
    sizes: [
      { size: "Pequeña", price: 26, servings: 6 },
      { size: "Mediana", price: 36, servings: 10 },
      { size: "Grande", price: 46, servings: 15 },
      { size: "XL", price: 56, servings: 20 }
    ]
  }
];
