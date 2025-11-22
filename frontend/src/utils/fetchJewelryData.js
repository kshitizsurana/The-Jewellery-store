/**
 * Jewelry Data Fetcher
 * Fetches real jewelry product data from public APIs
 */

// DummyJSON has a womens-jewellery category with real-looking data
const DUMMYJSON_API = 'https://dummyjson.com/products/category/womens-jewellery';

// Fake Store API has jewelry category
const FAKESTORE_API = 'https://fakestoreapi.com/products/category/jewelery';

/**
 * Fetch jewelry products from DummyJSON
 */
export const fetchFromDummyJSON = async () => {
  try {
    const response = await fetch(DUMMYJSON_API);
    const data = await response.json();
    
    // Transform to our format
    return data.products.map(product => ({
      id: product.id,
      name: product.title,
      price: Math.round(product.price * 100), // Convert to higher price range
      category: getCategoryFromTitle(product.title),
      image: product.thumbnail || product.images[0],
      rating: product.rating,
      reviews: Math.floor(Math.random() * 200) + 50,
      featured: product.rating > 4.5,
      description: product.description,
      inStock: product.stock > 0,
      brand: product.brand || 'Tanishq',
      discount: product.discountPercentage,
      // Additional metadata
      metal: extractMetal(product.title, product.description),
      purity: extractPurity(product.title, product.description),
      gemstone: extractGemstone(product.title, product.description),
      occasion: extractOccasion(product.title, product.description),
      gender: 'Women'
    }));
  } catch (error) {
    console.error('Error fetching from DummyJSON:', error);
    return [];
  }
};

/**
 * Fetch jewelry products from Fake Store API
 */
export const fetchFromFakeStore = async () => {
  try {
    const response = await fetch(FAKESTORE_API);
    const data = await response.json();
    
    // Transform to our format
    return data.map(product => ({
      id: product.id + 1000, // Offset to avoid ID conflicts
      name: product.title,
      price: Math.round(product.price * 100), // Scale up prices
      category: getCategoryFromTitle(product.title),
      image: product.image,
      rating: product.rating?.rate || 4.5,
      reviews: product.rating?.count || Math.floor(Math.random() * 200) + 50,
      featured: product.rating?.rate > 4.5,
      description: product.description,
      inStock: true,
      brand: 'Tanishq',
      // Additional metadata
      metal: extractMetal(product.title, product.description),
      purity: extractPurity(product.title, product.description),
      gemstone: extractGemstone(product.title, product.description),
      occasion: extractOccasion(product.title, product.description),
      gender: 'Women'
    }));
  } catch (error) {
    console.error('Error fetching from Fake Store API:', error);
    return [];
  }
};

/**
 * Fetch and combine jewelry data from multiple sources
 */
export const fetchAllJewelryData = async () => {
  try {
    const [dummyData, fakeStoreData] = await Promise.all([
      fetchFromDummyJSON(),
      fetchFromFakeStore()
    ]);
    
    // Combine and deduplicate
    const allProducts = [...dummyData, ...fakeStoreData];
    
    // Add emoji icons based on category
    return allProducts.map(product => ({
      ...product,
      emoji: getCategoryEmoji(product.category)
    }));
  } catch (error) {
    console.error('Error fetching jewelry data:', error);
    return getFallbackData();
  }
};

/**
 * Helper: Extract category from title
 */
const getCategoryFromTitle = (title) => {
  const lower = title.toLowerCase();
  
  if (lower.includes('ring')) return 'Rings';
  if (lower.includes('necklace') || lower.includes('chain')) return 'Necklaces';
  if (lower.includes('earring') || lower.includes('stud')) return 'Earrings';
  if (lower.includes('bracelet') || lower.includes('bangle')) return 'Bracelets';
  if (lower.includes('watch')) return 'Watches';
  if (lower.includes('gold')) return 'Gold';
  if (lower.includes('diamond')) return 'Diamond';
  
  return 'Jewelry';
};

/**
 * Helper: Get emoji for category
 */
const getCategoryEmoji = (category) => {
  const emojiMap = {
    'Rings': '💍',
    'Necklaces': '📿',
    'Earrings': '👂',
    'Bracelets': '⭕',
    'Watches': '⌚',
    'Gold': '🏆',
    'Diamond': '💎',
    'Jewelry': '💎'
  };
  
  return emojiMap[category] || '💎';
};

/**
 * Helper: Extract metal type from text
 */
const extractMetal = (title, description) => {
  const text = `${title} ${description}`.toLowerCase();
  
  if (text.includes('platinum')) return 'Platinum';
  if (text.includes('rose gold')) return 'Rose Gold';
  if (text.includes('white gold')) return 'White Gold';
  if (text.includes('gold')) return 'Gold';
  if (text.includes('silver')) return 'Silver';
  
  return 'Gold'; // Default
};

/**
 * Helper: Extract purity from text
 */
const extractPurity = (title, description) => {
  const text = `${title} ${description}`.toLowerCase();
  
  if (text.includes('24k') || text.includes('24 k')) return '24K';
  if (text.includes('22k') || text.includes('22 k')) return '22K';
  if (text.includes('18k') || text.includes('18 k')) return '18K';
  if (text.includes('14k') || text.includes('14 k')) return '14K';
  if (text.includes('925')) return '925 Silver';
  if (text.includes('950')) return '950 Platinum';
  
  return '18K'; // Default
};

/**
 * Helper: Extract gemstone from text
 */
const extractGemstone = (title, description) => {
  const text = `${title} ${description}`.toLowerCase();
  
  if (text.includes('diamond')) return 'Diamond';
  if (text.includes('ruby')) return 'Ruby';
  if (text.includes('emerald')) return 'Emerald';
  if (text.includes('sapphire')) return 'Sapphire';
  if (text.includes('pearl')) return 'Pearl';
  
  return 'None';
};

/**
 * Helper: Extract occasion from text
 */
const extractOccasion = (title, description) => {
  const text = `${title} ${description}`.toLowerCase();
  
  if (text.includes('wedding') || text.includes('bridal')) return 'Wedding';
  if (text.includes('engagement')) return 'Engagement';
  if (text.includes('anniversary')) return 'Anniversary';
  if (text.includes('party') || text.includes('evening')) return 'Party';
  if (text.includes('festival') || text.includes('traditional')) return 'Festival';
  
  return 'Daily Wear';
};

/**
 * Fallback data if APIs fail
 */
const getFallbackData = () => {
  return [
    {
      id: 1,
      name: "Diamond Solitaire Ring",
      price: 2999,
      category: "Rings",
      emoji: "💍",
      rating: 4.8,
      reviews: 124,
      featured: true,
      description: "Exquisite diamond solitaire in 18K white gold",
      inStock: true,
      brand: "Tanishq",
      metal: "White Gold",
      purity: "18K",
      gemstone: "Diamond",
      occasion: "Engagement",
      gender: "Women"
    },
    {
      id: 2,
      name: "Pearl Necklace",
      price: 899,
      category: "Necklaces",
      emoji: "📿",
      rating: 4.6,
      reviews: 89,
      featured: true,
      description: "Elegant freshwater pearl necklace",
      inStock: true,
      brand: "Tanishq",
      metal: "Gold",
      purity: "22K",
      gemstone: "Pearl",
      occasion: "Party",
      gender: "Women"
    },
    {
      id: 3,
      name: "Gold Hoop Earrings",
      price: 599,
      category: "Earrings",
      emoji: "👂",
      rating: 4.7,
      reviews: 156,
      featured: false,
      description: "Classic 22K gold hoop earrings",
      inStock: true,
      brand: "Tanishq",
      metal: "Gold",
      purity: "22K",
      gemstone: "None",
      occasion: "Daily Wear",
      gender: "Women"
    }
  ];
};

export default {
  fetchFromDummyJSON,
  fetchFromFakeStore,
  fetchAllJewelryData
};
