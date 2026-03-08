import { useEffect, useState } from "react";
import axios from "axios";

function ProductList({ reload }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(""); // for filter
  const [editId, setEditId] = useState(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");

  // Load products from API with optional category filter
  const loadProducts = () => {
    let url = "http://localhost:5000/api/products";
    if (selectedCategory) {
      url += `?category=${selectedCategory}`;
    }
    axios
      .get(url)
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  };

  // Load categories
  const loadCategories = () => {
    axios
      .get("http://localhost:5000/api/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    loadCategories();
    loadProducts();
  }, [reload, selectedCategory]);

  // DELETE
  const remove = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    loadProducts();
  };

  // START EDIT
  const startEdit = (p) => {
    setEditId(p.id);
    setName(p.name);
    setPrice(p.price);
    setStock(p.stock);
    setCategory(p.category_id);
  };

  // UPDATE
  const updateProduct = async (id) => {
    await axios.put(`http://localhost:5000/api/products/${id}`, {
      name,
      price,
      stock,
      category_id: category,
    });
    setEditId(null);
    loadProducts();
  };

  // TOGGLE AVAILABILITY
  const toggleAvailability = async (p) => {
  try {
    const res = await axios.patch(
      `http://localhost:5000/api/products/${p.id}/toggle-availability`
    );

    // Merge the category name from the old product
    const updatedProduct = { ...res.data, category: p.category };

    setProducts(
      products.map((prod) => (prod.id === p.id ? updatedProduct : prod))
    );
  } catch (err) {
    console.error(err);
  }
};

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Product Management</h3>

      {/* CATEGORY FILTER BELOW HEADER */}
      <div className="row mb-3">
        <div className="col-md-4">
          <label className="form-label">Filter by Category</label>
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle">
          <thead className="table-dark">
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Category</th>
              <th>Availability</th>
              <th width="200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>
                  <img
                    src={`http://localhost:5000/uploads/${p.image}`}
                    className="img-thumbnail"
                    width="60"
                  />
                </td>

                {editId === p.id ? (
                  <>
                    <td>
                      <input
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        className="form-control"
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                      />
                    </td>
                    <td>
                      <select
                        className="form-select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      >
                        <option value="">Select Category</option>
                        {categories.map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <button className="btn btn-secondary btn-sm" disabled>
                        {p.is_available ? "Available" : "Unavailable"}
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => updateProduct(p.id)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setEditId(null)}
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>
                      <b>{p.name}</b>
                    </td>
                    <td>₹ {p.price}</td>
                    <td>
                      <span className="badge bg-info">{p.stock}</span>
                    </td>
                    <td>{p.category}</td>
                    <td>
                      <button
                        className={`btn btn-sm ${
                          p.is_available ? "btn-success" : "btn-warning"
                        }`}
                        onClick={() => toggleAvailability(p)}
                      >
                        {p.is_available ? "Available" : "Unavailable"}
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => startEdit(p)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => remove(p.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductList;