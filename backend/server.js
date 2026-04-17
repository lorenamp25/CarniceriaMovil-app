const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let products = [
  { id: 1, name: "Solomillo", price: 20 },
  { id: 2, name: "Entrecot", price: 15 },
  { id: 3, name: "Chuletas", price: 12 }
];

// Obtener productos
app.get('/products', (req, res) => {
  res.json(products);
});

// Crear pedido
app.post('/order', (req, res) => {
  console.log("Pedido:", req.body);
  res.json({ message: "Pedido realizado" });
});

app.listen(5000, () => console.log('Servidor en http://localhost:5000'));
let orders = [];

app.post('/order', (req, res) => {
  orders.push(req.body);
  res.json({ message: "Pedido guardado" });
});

app.get('/orders', (req, res) => {
  res.json(orders);
});