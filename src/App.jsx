import { useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([
    { id: 1, name: "Rice (50kg)", price: 75000, stock: 12 },
    { id: 2, name: "Beans (25kg)", price: 42000, stock: 8 },
    { id: 3, name: "Cooking Oil", price: 18000, stock: 20 }
  ]);

  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const addProduct = () => {
    if (!name || !price || !stock) return;

    setProducts([
      ...products,
      {
        id: Date.now(),
        name,
        price: Number(price),
        stock: Number(stock)
      }
    ]);

    setName("");
    setPrice("");
    setStock("");
  };

  return (
    <div className="container">
      <header className="header">
        <h1>🛒 Store Keeper Dashboard</h1>
        <p>Manage products and inventory</p>
      </header>

      <section className="card">
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </section>

      <section className="card">
        <h2>Add New Product</h2>
        <div className="form">
          <input
            type="text"
            placeholder="Product name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={e => setStock(e.target.value)}
          />
          <button onClick={addProduct}>Add Product</button>
        </div>
      </section>

      <section className="card">
        <h2>Product List</h2>
        {filteredProducts.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price (₦)</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(p => (
                <tr key={p.id}>
                  <td>{p.name}</td>
                  <td>{p.price.toLocaleString()}</td>
                  <td>{p.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default App;
