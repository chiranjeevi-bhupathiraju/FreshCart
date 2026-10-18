const catalog = {
  "Fruits & Vegetables": {
    images: ["photo-1553279768-865429fa0078", "photo-1523049673857-eb18f1d7b578", "photo-1576045057995-568f588f82fb", "photo-1563565375-f3fdfdbefa83", "photo-1464965911861-746a04b4bca6", "photo-1546094096-0df4bcaaa337"],
    items: [
      ["Alphonso Mangoes", 189, "1 kg"], ["Fresh Avocados", 129, "2 pieces"],
      ["Baby Spinach", 45, "200 g"], ["Red Bell Peppers", 79, "500 g"],
      ["Sweet Strawberries", 149, "250 g"], ["Farm Fresh Tomatoes", 39, "1 kg"],
    ],
  },
  "Dairy & Eggs": {
    images: ["photo-1550583724-b2692b85b150", "photo-1506976785307-8732e854ad03", "photo-1488477181946-6428a0291777", "photo-1589985270826-4b7bb135bc9d", "photo-1563636619-e9143da7973b", "photo-1486297678162-eb2a19b0a32d"],
    items: [
      ["Farm Fresh Whole Milk", 68, "1 litre"], ["Free Range Eggs", 115, "6 pieces"],
      ["Creamy Greek Yogurt", 95, "400 g"], ["Salted Butter", 62, "100 g"],
      ["Fresh Paneer", 89, "200 g"], ["Cheddar Cheese Slices", 135, "200 g"],
    ],
  },
  Bakery: {
    images: [
      "https://res.cloudinary.com/babylon/image/upload/v1736847395/babylonstoren/shop/image/image-lr-bread-sourdough-loaf-1-509a32d8ac29.jpg",
      "photo-1555507036-ab1f4038808a",
      "https://d2wvwvig0d1mx7.cloudfront.net/data/org/22429/media/img/cache/1000x0/2309869_1000x0.jpg",
      "photo-1607958996333-41aef7caefaa",
      "https://sklep.polmarkus.com.pl/img/imagecache/13001-14000/product-media/maxi_korn-600x666-nobckgr.webp",
      "photo-1509365465985-25d11c17e812",
    ],
    items: [
      ["Sourdough Bread", 110, "400 g"], ["Butter Croissants", 95, "2 pieces"],
      ["Whole Wheat Sandwich Loaf", 55, "400 g"], ["Chocolate Muffins", 120, "4 pieces"],
      ["Multigrain Buns", 48, "4 pieces"], ["Cinnamon Rolls", 105, "2 pieces"],
    ],
  },
  "Meat & Seafood": {
    images: ["photo-1519708227418-c8fd9a32b7a2", "photo-1607623814075-e51df1bdc82f", "photo-1565680018434-b513d5e5fd47", "photo-1604503468506-a8da13d82791", "photo-1535399831218-d5bd36d1a6b3", "photo-1587593810167-a84920ea0781"],
    items: [
      ["Fresh Atlantic Salmon", 420, "250 g"], ["Boneless Chicken Breast", 225, "500 g"],
      ["Peeled Prawns", 310, "250 g"], ["Chicken Drumsticks", 195, "500 g"],
      ["Fresh Rohu Steaks", 180, "500 g"], ["Chicken Mince", 210, "500 g"],
    ],
  },
  Snacks: {
    images: [
      "photo-1566478989037-eec170784d0b",
      "https://images.unsplash.com/photo-1708453875228-da0a6c448412?auto=format&fit=crop&w=640&h=480&q=80",
      "photo-1578849278619-e73505e9610f",
      "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2018/3/30/1/LS-Library_Masala-Pistachio-Snack-Mix_s4x3.jpg.rend.hgtvcom.1280.720.suffix/1522444124309.webp",
      "https://images.squarespace-cdn.com/content/v1/5f199921334a136b91a5e739/1596129027527-Y9NJELPPZWZRNYXOAQRT/BlackRiverChocolate4.jpg",
      "https://snapcalorie-webflow-website.s3.us-east-2.amazonaws.com/media/food_pics_v2/medium/multigrain_crackers.jpg",
    ],
    items: [
      ["Sea Salt Potato Chips", 35, "150 g"], ["Roasted Almonds", 175, "200 g"],
      ["Classic Salted Popcorn", 55, "3 pack"], ["Masala Trail Mix", 120, "180 g"],
      ["Dark Chocolate Bites", 95, "100 g"], ["Baked Multigrain Crackers", 65, "200 g"],
    ],
  },
  Beverages: {
    images: ["photo-1600271886742-f049cd451bba", "photo-1544145945-f90425340c7e", "https://cdn.shopify.com/s/files/1/0254/7715/2804/files/Green_Tea_and_Leaves.png?v=1649926151", "photo-1505252585461-04db1eb84625", "photo-1442512595331-e89e73853f31", "https://images.deliveryhero.io/image/fd-my/LH/z8oj-hero.jpg?height=384&quality=45&width=512"],
    items: [
      ["Cold Pressed Orange Juice", 110, "1 litre"], ["Sparkling Mineral Water", 45, "750 ml"],
      ["Green Tea Bags", 145, "25 bags"], ["Mango Smoothie", 85, "300 ml"],
      ["Ground Coffee", 220, "250 g"], ["Coconut Water", 55, "200 ml"],
    ],
  },
  "Grains & Pulses": {
    images: ["photo-1586201375761-83865001e31c", "photo-1518843875459-f738682238a6", "photo-1517673132405-a56a62b18caf", "photo-1490645935967-10de6ba17061", "photo-1501436513145-30f24e19fcc4", "photo-1574323347407-f5e1ad6d020b"],
    items: [
      ["Premium Basmati Rice", 165, "1 kg"], ["Red Lentils (Masoor Dal)", 95, "1 kg"],
      ["Rolled Oats", 120, "500 g"], ["Chickpeas (Kabuli Chana)", 110, "1 kg"],
      ["Quinoa", 210, "500 g"], ["Whole Wheat Atta", 245, "5 kg"],
    ],
  },
  Household: {
    images: ["photo-1585421514738-01798e348b17", "photo-1556911220-e15b29be8c8f", "photo-1581578731548-c64695cc6952", "photo-1584622650111-993a426fbf0a", "photo-1556911220-e15b29be8c8f", "photo-1583947215259-38e31be8751f"],
    items: [
      ["Plant Based Dish Soap", 99, "500 ml"], ["Bamboo Paper Towels", 125, "2 rolls"],
      ["Laundry Detergent", 185, "1 litre"], ["Reusable Food Storage Bags", 145, "5 pack"],
      ["All Purpose Surface Cleaner", 110, "750 ml"], ["Compostable Kitchen Sponges", 75, "3 pack"],
    ],
  },
};

export const mockProducts = Object.entries(catalog).flatMap(([category, data]) =>
  data.items.map(([title, price, unitLabel], index) => ({
    id: `freshcart-${category.toLowerCase().replace(/[^a-z]+/g, "-")}-${index + 1}`,
    title,
    description: `${title}, carefully selected for your everyday FreshCart shop.`,
    price,
    discountPercentage: [5, 10, 8, 0, 12, 6][index],
    rating: Number((4.2 + (index % 5) * 0.15).toFixed(1)),
    thumbnail: data.images[index].startsWith("http")
      ? data.images[index]
      : `https://images.unsplash.com/${data.images[index]}?auto=format&fit=crop&w=640&h=480&q=80`,
    images: [],
    category: category.toLowerCase(),
    displayCategory: category,
    brand: "FreshCart Select",
    stock: 12 + index * 3,
    unitLabel,
    isOrganic: false,
  })),
);

export function getMockProductsByCategory(category) {
  const key = Object.keys(catalog).find((name) => name.toLowerCase() === category.toLowerCase());
  return key ? mockProducts.filter((product) => product.displayCategory === key) : [];
}

export function getMockProductById(id) {
  return mockProducts.find((product) => product.id === id);
}
