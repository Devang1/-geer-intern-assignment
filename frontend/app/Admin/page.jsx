'use client'
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, Edit, LogOut, Save, X } from 'lucide-react';
import mockProducts from "../data/mockProducts";
import '../globals.css';

const AdminPanel = () => {
  const router = useRouter();
  const [mockProducts,setmockProducts]=useState([]);
  const [products, setProducts] = useState(mockProducts);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  async function fetchData() {
          try {
            const res = await fetch('/api/products');
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            const data = await res.json();
            setmockProducts(data);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        }
   useEffect(() => {
        fetchData();
      }, []);
  // Form state for adding/editing products
  const [currentProduct, setCurrentProduct] = useState({
    id: '',
    name: '',
    shape: 'Round',
    collection: 'Ring',
    price: '',
    originalPrice: '',
    discount: '',
    carat: '',
    image: '',
    description: ''
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // Available options
  const shapes = [...new Set(mockProducts.map(p => p.shape))];
  const collections = [...new Set(mockProducts.map(p => p.collection))];
  
  // Format price with Indian Rupees
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      maximumFractionDigits: 0
    }).format(price);
  };

  // Mock login
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
      // Load products from localStorage or use mockProducts
      const savedProducts = JSON.parse(localStorage.getItem('diamondProducts')) || mockProducts;
      setProducts(savedProducts);
    } else {
      setError('Invalid credentials');
    }
  };
  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };
  
  // Product CRUD operations
  const handleAddProduct = () => {
    setCurrentProduct({
      id: '',
      name: '',
      shape: 'Round',
      collection: 'Ring',
      price: '',
      originalPrice: '',
      discount: '',
      carat: '',
      image: '',
      description: ''
    });
    setIsEditing(false);
    setShowForm(true);
  };
  
  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setIsEditing(true);
    setShowForm(true);
  };
  
  const handleDeleteProduct = async(id) => {
    if (confirm('Are you sure you want to delete this product?')) {
  try {
    const res = await fetch(`/api/products/${id}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error(`Failed to delete product. Status: ${res.status}`);
    }

    // Refresh product list from database
    const fetchRes = await fetch('/api/products');
    const updatedList = await fetchRes.json();
    setProducts(updatedList);
  } catch (error) {
    console.error('Error deleting product:', error);
    alert('Failed to delete product. Please try again.');
  }
}

  };
  
  const handleSubmit = async (e) => {
  e.preventDefault();

  // Calculate discount if not provided
  let discount = currentProduct.discount;
  if (!discount && currentProduct.price && currentProduct.originalPrice) {
    const discountValue = Math.round(
      ((Number(currentProduct.originalPrice) - Number(currentProduct.price)) / Number(currentProduct.originalPrice)) * 100
    );
    discount = `${discountValue}%`;
  }

  // Format date (PostgreSQL DATE format: 'YYYY-MM-DD')
  const today = new Date().toISOString().split('T')[0];

  // Prepare product data
  const productPayload = {
    ...currentProduct,
    discount: discount || '0%',
    date: currentProduct.date || today,
  };

  try {
    let res;

    if (isEditing) {
      // PUT request to update a specific product by ID
      res = await fetch(`/api/products/${currentProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productPayload),
      });
    } else {
      // POST request to create a new product
      const { id, ...newProduct } = productPayload;
      res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
    }

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    // ✅ Refresh product list from DB
    const fetchRes = await fetch('/api/products');
    const updatedList = await fetchRes.json();
    setProducts(updatedList);

    // Reset form/UI
    setShowForm(false);
    setCurrentProduct({
      id: '',
      name: '',
      shape: 'Round',
      collection: 'Ring',
      price: '',
      originalPrice: '',
      discount: '',
      carat: '',
      image: '',
      description: '',
      date: '',
    });
    fetchData();
  } catch (error) {
    console.error('Error saving product:', error);
  }
};

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black p-4">
        <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 max-w-md w-full">
          <h1 className="text-2xl font-bold text-center text-white mb-6">Admin Login</h1>
          
          {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white/80 mb-1">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 lg:p-8">
      {/* Admin Header */}
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gradient-gold">Admin Portal - Geer.in</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-black border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black font-semibold px-5 py-2 rounded-xl shadow-md transition-all duration-300 cursor-pointer"
        >
          <LogOut size={16} />
          Logout
        </button>
      </header>
      
      {/* Action Bar */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-medium">
          {products.length} {products.length === 1 ? 'Product' : 'Products'}
        </h2>
        <button
          onClick={handleAddProduct}
          className="flex items-center gap-2 text-sm bg-yellow-500 hover:bg-yellow-400 text-black font-semibold px-3 py-2 rounded-xl shadow-md transition-all duration-300"
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>
      
      {/* Product Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto hide-scrollbar">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {isEditing ? 'Edit Product' : 'Add New Product'}
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-white/70 hover:text-white"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={currentProduct.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Shape</label>
                  <select
                    name="shape"
                    value={currentProduct.shape}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/5 text-white border border-gray-700 rounded-md focus:border-yellow-400 focus:ring-yellow-400 focus:outline-none transition"
                  >
                    {shapes.map(shape => (
                      <option key={shape} value={shape} className='bg-[#333] text-white'>{shape}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Collection</label>
                  <select
                    name="collection"
                    value={currentProduct.collection}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/5 text-white border border-gray-700 rounded-md focus:border-yellow-400 focus:ring-yellow-400 focus:outline-none transition"
                  >
                    {collections.map(collection => (
                      <option key={collection} value={collection} className='bg-[#333] text-white'>{collection}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Carat</label>
                  <input
                    type="text"
                    name="carat"
                    value={currentProduct.carat}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={currentProduct.originalPrice}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    name="price"
                    value={currentProduct.price}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Discount (e.g., 20%)</label>
                  <input
                    type="text"
                    name="discount"
                    value={currentProduct.discount}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    placeholder="Will be calculated if empty"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Image URL</label>
                  <input
                    type="url"
                    name="image"
                    value={currentProduct.image}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-white/20 rounded-lg hover:bg-white/10 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg"
                >
                  <Save size={16} />
                  {isEditing ? 'Update' : 'Save'} Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="relative max-w-xs bg-gradient-to-b from-white/5 to-white/10 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            <div className="relative overflow-hidden bg-gray-100 aspect-square">
              <img 
                src={product.image || '/placeholder-diamond.jpg'} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
              {product.discount && (
                <span className="absolute top-3 right-3 bg-[#1a1a1a] text-white text-xs px-2 py-1 rounded-full font-medium">
                  {product.discount}
                </span>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
              <p className="text-sm text-white/70 mb-2">{product.shape} • {product.collection}</p>
              
              <div className="flex items-center gap-2 mb-2">
                <p className="text-lg font-semibold">₹{formatPrice(product.price)}</p>
                {product.originalPrice && product.originalPrice > product.price && (
                  <p className="text-sm text-white/50 line-through">₹{formatPrice(product.originalPrice)}</p>
                )}
              </div>
              
              <div className="flex justify-between items-center text-sm">
                <span>{product.carat} ct</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="text-blue-400 hover:text-blue-300 p-1"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-400 hover:text-red-300 p-1"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-white/70">No products found. Add your first product!</p>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;