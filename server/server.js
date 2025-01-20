const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Enable CORS for all routes
app.use(express.json());

// Enhanced Product Data
const products = [
  {
    id: 1,
    name: 'Wireless Headphones',
    description: 'High-quality wireless headphones with active noise cancellation for an immersive listening experience.',
    price: 99.99,
    category: 'Electronics',
    image: 'https://media.istockphoto.com/id/516075586/vector/vector-black-headphones.jpg?s=612x612&w=0&k=20&c=uoB_B57tC7Rd_PvJupIlNU5eL6ZM2Z8U2vhH8tDhwY0=',
    brand: 'SoundPro',
    rating: 4.5,
    stock: 150
  },
  {
    id: 2,
    name: 'Gaming Mouse',
    description: 'Ergonomic gaming mouse with customizable RGB lighting and high DPI for fast-paced gaming.',
    price: 49.99,
    category: 'Accessories',
    image: 'https://img.freepik.com/premium-photo/computer-gaming-mouse-white-background-ai_894067-5257.jpg',
    brand: 'Razer',
    rating: 4.3,
    stock: 200
  },
  {
    id: 3,
    name: '4K UHD Monitor',
    description: '27-inch 4K UHD monitor with vibrant colors and a 144Hz refresh rate, ideal for gaming and media consumption.',
    price: 299.99,
    category: 'Electronics',
    image: 'https://media.istockphoto.com/id/611294276/photo/uhd-4k-smart-tv-on-white-background.jpg?s=612x612&w=0&k=20&c=VtBQvDY7t131L2GScWcg6f4mXw1Kcgn3jqLUUD2jP1s=',
    brand: 'Samsung',
    rating: 4.8,
    stock: 50
  },
  {
    id: 4,
    name: 'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with blue switches, customizable backlighting, and high durability for gamers.',
    price: 79.99,
    category: 'Accessories',
    image: 'https://img.freepik.com/premium-photo/gaming-keyboard-with-backlight-isolated-white-background_666369-4.jpg',
    brand: 'Corsair',
    rating: 4.7,
    stock: 120
  },
  {
    id: 5,
    name: 'Smartphone Stand',
    description: 'Adjustable aluminum stand for smartphones and tablets, perfect for watching videos or video conferencing.',
    price: 19.99,
    category: 'Accessories',
    image: 'https://media.istockphoto.com/id/1355329741/photo/smartphone-and-mini-tripod-isolated-on-white.jpg?s=612x612&w=0&k=20&c=NTNniu1wFr2EOVz1TEah1wotQWPBWybh1cqrYPB-cR0=',
    brand: 'PhonePro',
    rating: 4.2,
    stock: 300
  },
];

// Routes
// Get all products
app.get('/api/products', (req, res) => {
  const { category, minPrice, maxPrice, sortBy, order } = req.query;

  let filteredProducts = [...products];

  // Filter by category
  if (category) {
    filteredProducts = filteredProducts.filter(product => product.category.toLowerCase() === category.toLowerCase());
  }

  // Filter by price range
  if (minPrice) {
    filteredProducts = filteredProducts.filter(product => product.price >= parseFloat(minPrice));
  }
  if (maxPrice) {
    filteredProducts = filteredProducts.filter(product => product.price <= parseFloat(maxPrice));
  }

  // Sorting
  if (sortBy && order) {
    filteredProducts = filteredProducts.sort((a, b) => {
      if (order === 'asc') {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      }
    });
  }

  res.json(filteredProducts);
});

// Get a single product by ID
app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find(p => p.id === parseInt(id));

  if (product) {
    res.json(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});

// Get products by category
app.get('/api/products/category/:category', (req, res) => {
  const { category } = req.params;
  const filteredProducts = products.filter(product => product.category.toLowerCase() === category.toLowerCase());

  if (filteredProducts.length > 0) {
    res.json(filteredProducts);
  } else {
    res.status(404).send({ message: 'No products found in this category' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
