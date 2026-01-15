import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Card,
  CardContent,
  Box,
  Grid,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

export default function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", stock: "" });
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addProduct = () => {
    if (!form.name || !form.price || !form.stock) return;
    setProducts([...products, { ...form, id: Date.now() }]);
    setForm({ name: "", price: "", stock: "" });
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const lowStockCount = products.filter((p) => Number(p.stock) < 5).length;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box display="flex" alignItems="center" mb={3}>
        <ShoppingCartIcon fontSize="large" sx={{ mr: 1 }} />
        <Typography variant="h4">Store Keeper Dashboard</Typography>
      </Box>
      <Typography mb={4}>Manage products and inventory</Typography>

      {/* Dashboard Cards */}
      <Grid container spacing={2} mb={4}>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Products</Typography>
              <Typography variant="h4">{products.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{ bgcolor: lowStockCount ? "error.light" : "success.light" }}>
            <CardContent>
              <Typography variant="h6">Low Stock Alerts</Typography>
              <Typography variant="h4">{lowStockCount}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search */}
      <TextField
        label="Search product..."
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Add Product Form */}
      <Box mb={4}>
        <Typography variant="h6" mb={2}>
          Add New Product
        </Typography>
        <TextField
          label="Product Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Stock"
          name="stock"
          type="number"
          value={form.stock}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button variant="contained" sx={{ mt: 2 }} onClick={addProduct}>
          Add Product
        </Button>
      </Box>

      {/* Product List Table */}
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredProducts.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.name}</TableCell>
              <TableCell>${p.price}</TableCell>
              <TableCell>{p.stock}</TableCell>
              <TableCell>
                <Button color="error" onClick={() => deleteProduct(p.id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {filteredProducts.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} align="center">
                No products found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Container>
  );
}
