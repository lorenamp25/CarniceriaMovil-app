import { useState } from "react";
import chuletasImg from "./assets/chuletas.jpg";

const products = [
  { id: 1, name: "Solomillo", price: 20, category: "Carne", img: "https://images.unsplash.com/photo-1600891964599-f61ba0e24092" },
  { id: 2, name: "Entrecot", price: 15, category: "Carne", img: "https://images.unsplash.com/photo-1558030006-450675393462" },
  { id: 3, name: "Chuletas", price: 12, category: "Carne", img: chuletasImg },
  { id: 4, name: "Hamburguesa premium", price: 10, category: "Preparados", img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd" },
  { id: 5, name: "Costillas BBQ", price: 18, category: "Preparados", img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d" },
  { id: 6, name: "Chorizo artesanal", price: 8, category: "Embutidos", img: "https://images.unsplash.com/photo-1601050690597-df0568f70950" }
];

export default function App() {

  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Todas");
  const [orderDone, setOrderDone] = useState(false);

  const addToCart = (product) => setCart([...cart, product]);

  const removeFromCart = (index) => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  };

  const total = cart.reduce((acc, item) => acc + item.price, 0);

  const makeOrder = () => {
    if (cart.length === 0) return;

    setCart([]);
    setOrderDone(true);
    setTimeout(() => setOrderDone(false), 2000);
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "Todas" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center">

      {/* ANIMACIÓN PEDIDO */}
      {orderDone && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl text-center animate-bounce">
            <h2 className="text-xl font-bold text-green-600">✅ Pedido realizado</h2>
          </div>
        </div>
      )}

      <div className="w-full max-w-md bg-white min-h-screen shadow-lg relative overflow-hidden">

        {/* HEADER */}
        <div className="bg-black text-white p-4 flex justify-between items-center">
          <span className="font-bold">Carnicería</span>
          <span>🛒 {cart.length}</span>
        </div>

        {/* BUSCADOR */}
        <div className="p-4">
          <input
            placeholder="Buscar..."
            className="w-full p-2 border rounded mb-2"
            onChange={(e) => setSearch(e.target.value)}
          />

          <div className="flex gap-2 overflow-x-auto">
            {["Todas", "Carne", "Preparados", "Embutidos"].map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1 rounded text-sm whitespace-nowrap ${category === cat ? "bg-black text-white" : "bg-gray-200"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* PRODUCTOS SCROLL */}
        <div className="p-4 space-y-4 overflow-y-auto pb-28" style={{ maxHeight: "75vh" }}>
          {filteredProducts.map(p => (
            <div key={p.id} className="flex gap-3 bg-gray-50 p-3 rounded-lg shadow-sm">

              <img
                src={p.img}
                alt={p.name}
                className="w-20 h-20 object-cover rounded"
              />

              <div className="flex-1">
                <h3 className="font-bold">{p.name}</h3>
                <p className="text-gray-500 text-sm">{p.price}€</p>

                <button
                  onClick={() => addToCart(p)}
                  className="mt-2 bg-black text-white px-3 py-1 rounded text-sm"
                >
                  Añadir
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* 🛒 CARRITO FIJO ABAJO (MEJOR UX) */}
        {cart.length > 0 && (
          <div className="fixed bottom-0 w-full max-w-md bg-white border-t p-4 shadow-lg">

            {/* LISTA RESUMIDA */}
            <div className="max-h-20 overflow-y-auto mb-2 text-sm">
              {cart.map((c, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span>{c.name}</span>
                  <button onClick={() => removeFromCart(i)}>❌</button>
                </div>
              ))}
            </div>

            {/* TOTAL */}
            <div className="flex justify-between font-bold mb-2">
              <span>Total</span>
              <span>{total}€</span>
            </div>

            {/* BOTÓN */}
            <button
              onClick={makeOrder}
              className="w-full p-3 rounded-lg bg-black text-white"
            >
              Finalizar pedido
            </button>

          </div>
        )}

      </div>

    </div>
  );
}
