// simple server to fetch list of lemonades to my web shop
const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 3001;
const helmet = require('helmet'); //

// Serve static files from the 'assets' directory
app.use('/assets', express.static('assets'));
app.use(express.json());


// Array list of lemonades
const lemonades = [
  {
    id: 1,
    name: 'Lemon lemonade',
    description: '',
    quantities: 82,
    price: 7.99,
    imageUrl: '/assets/lemonades/lem-1-lemon-smile.png'
  },
  {
    id: 2,
    name: 'Orange lemonade',
    description: '',
    quantities: 4,
    price: 9.99,
    imageUrl: '/assets/lemonades/lem-2-orange-smile.png'
  },
  {
    id: 3,
    name: 'Watermelon lemonade',
    description: '',
    quantities: 0,
    price: 9.99,
    imageUrl: '/assets/lemonades/lem-3-watermelon-smile.png'
  },
  {
    id: 4,
    name: 'Apple lemonade',
    description: '',
    quantities: 9,
    price: 8.99,
    imageUrl: '/assets/lemonades/lem-4-apple-smile.png'
  },
  {
    id: 5,
    name: 'Strawberry lemonade',
    description: '',
    quantities: 30,
    price: 9.99,
    imageUrl: '/assets/lemonades/lem-8-strawberry-smile.png'
  },
  {
    id: 6,
    name: 'Cherry lemonade',
    description: '',
    quantities: 45,
    price: 9.99,
    imageUrl: '/assets/lemonades/lem-5-cherry-smile.png'
  },
  {
    id: 7,
    name: 'Kiwi lemonade',
    description: '',
    quantities: 12,
    price: 9.99,
    imageUrl: '/assets/lemonades/lem-6-kiwi-smile.png'
  },
  {
    id: 8,
    name: 'Banana lemonade',
    description: '',
    quantities: 7,
    price: 8.99,
    imageUrl: '/assets/lemonades/lem-7-banana-smile.png'
  },
  {
    id: 9,
    name: 'Lemonade, big collection',
    description: '',
    quantities: 20,
    price: 24.99,
    imageUrl: '/assets/lemonades/lemon_Big_buy.png'
  },
];



// Enable All CORS Requests
app.use(cors());

// new cors
const corsOptions = {
  origin: ['http://localhost:3001' , 'https://example.com'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
  
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});



// Endpoint to get the full list of lemonades!
app.get('/api/lemonades', (req, res) => {
  const lemonadesWithImageUrls = lemonades.map((lemonade) => {
    return {
      ...lemonade,
      imageUrl: `http://localhost:3001${lemonade.imageUrl}`, // Update this with your server's URL
    };
  });

  res.json(lemonadesWithImageUrls);
});


// Endpoint to get a specific lemonade by its ID!
app.get('/api/lemonades/:id', (req, res) => {
  const lemonadeId = parseInt(req.params.id, 10);
  const lemonade = lemonades.find((item) => item.id === lemonadeId);

  if (lemonade) {
    res.json(lemonade);
  } else {
    res.status(404).json({ error: 'Lemonade not found' });
  }
});

// Endpoint to call the patch to update the quantities for the lemonade in the list - test!
app.patch('/api/updateQuantities', (req, res) => {
  const updatedQuantities = req.body;

  updatedQuantities.forEach(({ id, quantity }) => {
    const lemonadeIndex = lemonades.findIndex((item) => item.id === id);

    if (lemonadeIndex !== -1) {
      // Check if the requested quantity is valid and less than or equal to the current quantity
      if (quantity >= 0 && quantity <= lemonades[lemonadeIndex].quantities) {
        lemonades[lemonadeIndex].quantities -= quantity;
      }
    }
  });

  res.json({ message: 'Quantities updated successfully' });
});




// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
