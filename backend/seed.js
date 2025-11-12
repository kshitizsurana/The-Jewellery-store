const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const jewelryData = [
  {
    name: "Diamond Solitaire Ring",
    description: "Elegant 1-carat diamond solitaire ring set in 18k white gold. Perfect for engagements and special occasions.",
    type: "ring",
    material: "18k White Gold, Diamond",
    price: 2999.99,
    inStock: true
  },
  {
    name: "Pearl Necklace Classic",
    description: "Timeless strand of cultured pearls with 14k gold clasp. A sophisticated addition to any jewelry collection.",
    type: "necklace",
    material: "Cultured Pearls, 14k Gold",
    price: 899.99,
    inStock: true
  },
  {
    name: "Rose Gold Tennis Bracelet",
    description: "Stunning tennis bracelet featuring cubic zirconia stones set in rose gold plating.",
    type: "bracelet",
    material: "Rose Gold, Cubic Zirconia",
    price: 449.99,
    inStock: true
  },
  {
    name: "Sapphire Stud Earrings",
    description: "Beautiful blue sapphire stud earrings set in sterling silver with secure butterfly backs.",
    type: "earrings",
    material: "Sterling Silver, Sapphire",
    price: 299.99,
    inStock: true
  },
  {
    name: "Luxury Swiss Watch",
    description: "Premium Swiss automatic watch with leather strap and sapphire crystal face.",
    type: "watch",
    material: "Stainless Steel, Leather",
    price: 1599.99,
    inStock: true
  },
  {
    name: "Emerald Pendant",
    description: "Exquisite emerald pendant on a delicate gold chain. Perfect for adding elegance to any outfit.",
    type: "necklace",
    material: "14k Gold, Emerald",
    price: 1299.99,
    inStock: true
  },
  {
    name: "Diamond Wedding Band",
    description: "Classic diamond wedding band with channel-set diamonds in platinum setting.",
    type: "ring",
    material: "Platinum, Diamond",
    price: 1899.99,
    inStock: true
  },
  {
    name: "Silver Charm Bracelet",
    description: "Delicate silver charm bracelet with heart, star, and flower charms included.",
    type: "bracelet",
    material: "Sterling Silver",
    price: 199.99,
    inStock: true
  },
  {
    name: "Ruby Drop Earrings",
    description: "Elegant ruby drop earrings in gold setting, perfect for special occasions.",
    type: "earrings",
    material: "14k Gold, Ruby",
    price: 799.99,
    inStock: true
  },
  {
    name: "Vintage Art Deco Ring",
    description: "Stunning vintage-inspired art deco ring with intricate geometric patterns and diamonds.",
    type: "ring",
    material: "14k Gold, Diamond",
    price: 2499.99,
    inStock: true
  },
  {
    name: "Gold Chain Necklace",
    description: "Classic 18k gold chain necklace, versatile piece that complements any style.",
    type: "necklace",
    material: "18k Gold",
    price: 649.99,
    inStock: true
  },
  {
    name: "Designer Sports Watch",
    description: "Modern sports watch with chronograph function and water resistance up to 100m.",
    type: "watch",
    material: "Titanium, Rubber",
    price: 899.99,
    inStock: true
  }
];

async function main() {
  console.log('Seeding jewelry data...');
  
  for (const jewelry of jewelryData) {
    await prisma.jewelry.create({
      data: jewelry
    });
  }
  
  console.log('Jewelry data seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
