'use client'
import React, { useState, useEffect } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ProductModal from '../components/productModel';

const ProductsPage = () => {
  const [mockProducts, setmockProducts] = useState([]);
  useEffect(() => {
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
      fetchData();
    }, []);
    const [filteredProducts, setFilteredProducts] = useState(mockProducts);
    const [selectedProduct, setSelectedProduct] = useState(null);
  const allShapes = [...new Set(mockProducts.map(p => p.shape))];

  const allCollections = [...new Set(mockProducts.map(p => p.collection))];
  const priceRanges = [
    { label: 'Under ₹10,000', value: '0-10000' },
    { label: '₹10,000 - ₹50,000', value: '10000-50000' },
    { label: '₹50,000 - ₹1,00,000', value: '50000-100000' },
    { label: '₹1,00,000 - ₹3,00,000', value: '100000-300000' },
  ];
  const caratOptions = [
    { label: '0.25 ct', value: '0.25' },
    { label: '0.5 ct', value: '0.5' },
    { label: '1 ct', value: '1' },
    { label: '1.5 ct+', value: '1.5' },
  ];

  const [filters, setFilters] = useState({
    shape: [],
    collection: [],
    price: [],
    carat: [],
    sort: '',
  });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [expandedFilters, setExpandedFilters] = useState({
    shape: true,
    collection: false,
    price: false,
    carat: false,
  });

  const products = mockProducts;
  const formatPrice = (price) => {
            return new Intl.NumberFormat('en-IN', {
             maximumFractionDigits: 0
            }).format(price);};

  const getFilterCounts = () => {
    const shapeCounts = {};
    const collectionCounts = {};
    const priceCounts = {};
    const caratCounts = {};
    allCollections.forEach(collection => {
      collectionCounts[collection] = products.filter(p => p.collection === collection).length;
    });
    allShapes.forEach(shape => {
      shapeCounts[shape] = products.filter(p => p.shape === shape).length;
    });
    priceRanges.forEach(range => {
      const [min, max] = range.value.split('-').map(Number);
      priceCounts[range.value] = products.filter(p => p.price >= min && p.price <= max).length;
    });

    caratOptions.forEach(carat => {
      if (carat.value === '1.5') {
        caratCounts[carat.value] = products.filter(p => p.carat >= 1.5).length;
      } else {
        caratCounts[carat.value] = products.filter(p => p.carat == carat.value).length;
      }
    });

    return { shapeCounts, collectionCounts, priceCounts, caratCounts };
  };

  const { shapeCounts, collectionCounts, priceCounts, caratCounts } = getFilterCounts();

  useEffect(() => {
     allShapes.forEach(shape => {
      shapeCounts[shape] = products.filter(p => p.shape === shape).length;
    });
    let result = [...products];

    if (filters.shape.length > 0) {
      result = result.filter((p) => filters.shape.includes(p.shape));
    }
    if (filters.collection.length > 0) {
      result = result.filter((p) => filters.collection.includes(p.collection));
    }
    if (filters.price.length > 0) {
      result = result.filter((p) => {
        return filters.price.some(range => {
          const [min, max] = range.split('-').map(Number);
          return p.price >= min && p.price <= max;
        });
      });
    }
    if (filters.carat.length > 0) {
      result = result.filter((p) => {
        return filters.carat.some(carat => {
          if (carat === '1.5') return p.carat >= 1.5;
          return p.carat == carat;
        });
      });
    }
    if (filters.sort) {
      switch (filters.sort) {
        case 'a-z':
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'z-a':
          result.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case 'price-low-high':
          result.sort((a, b) => a.price - b.price);
          break;
        case 'price-high-low':
          result.sort((a, b) => b.price - a.price);
          break;
        case 'latest':
          result.sort((a, b) => new Date(b.date) - new Date(a.date));
          break;
        case 'oldest':
          result.sort((a, b) => new Date(a.date) - new Date(b.date));
          break;
        default:
          break;
      }
    }

    setFilteredProducts(result);
  }, [filters, products,allShapes]);
  const searchParams = useSearchParams();
  const categoryFromURL = searchParams.get('category');

  useEffect(() => {
  if (categoryFromURL) {
    const formattedCategory =
      categoryFromURL.charAt(0).toUpperCase() + categoryFromURL.slice(1).toLowerCase();

    setFilters(prev => ({
      ...prev,
      collection: [formattedCategory],
    }));
  }
}, [categoryFromURL]);


  const toggleFilter = (category, value) => {
    setFilters(prev => {
      const currentFilters = [...prev[category]];
      const index = currentFilters.indexOf(value);
      
      if (index === -1) {
        currentFilters.push(value);
      } else {
        currentFilters.splice(index, 1);
      }
      
      return { ...prev, [category]: currentFilters };
    });
  };

  const clearFilters = () => {
    setFilters({
      shape: [],
      collection: [],
      price: [],
      carat: [],
      sort: '',
    });
  };

  const toggleFilterSection = (section) => {
    setExpandedFilters(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const hasActiveFilters = Object.values(filters).some(
    value => Array.isArray(value) ? value.length > 0 : value !== ''
  );

  return (
    <section className="min-h-screen bg-black text-center text-[#333] px-4 sm:px-6 lg:px-12 py-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#1a1a1a] to-[#333] text-white/90 rounded-xl p-8 mb-8 shadow-lg mt-24 sm:mt-12  text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3 font-serif text-gradient-gold">Exquisite Diamond Collection</h1>
        <p className="text-white/90 ">
          Discover timeless elegance with our hand-selected premium diamonds
        </p>
      </div>

      {/* Filters and Sorting Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setMobileFiltersOpen(true)}
            className="md:hidden flex items-center gap-2 bg-[#1a1a1a] text-white px-4 py-2 rounded-lg text-sm"
          >
            <Filter size={16} />
            Filters
          </button>
          <h2 className="text-lg font-medium text-white">{filteredProducts.length} {filteredProducts.length === 1 ? '   Product' : 'Products'}</h2>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative group">
            <select 
              name="sort" 
              value={filters.sort} 
              onChange={(e) => setFilters(prev => ({...prev, sort: e.target.value}))}
              className="appearance-none bg-white/10 border text-white border-white/90 rounded-lg pl-4 pr-8 py-2 w-full md:w-48 focus:ring-2 focus:ring-[#1a1a1a] focus:border-transparent text-sm"
            >
              <option value="" className='bg-[#333] text-white'>Sort By</option>
              <option value="a-z" className='bg-[#333] text-white'>Alphabetical: A-Z</option>
              <option value="z-a" className='bg-[#333] text-white'>Alphabetical: Z-A</option>
              <option value="price-low-high" className='bg-[#333] text-white'>Price: Low to High</option>
              <option value="price-high-low" className='bg-[#333] text-white'>Price: High to Low</option>
              <option value="latest" className='bg-[#333] text-white'>Latest</option>
              <option value="oldest" className='bg-[#333] text-white'>Oldest</option>
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
              <ChevronDown size={16} className="text-[#666]" />
            </div>
          </div>
          
          {hasActiveFilters && (
            <button 
              onClick={clearFilters}
              className="flex items-center gap-1 text-sm text-[#1a1a1a] hover:text-[#555]"
            >
              <X size={16} />
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mb-6 text-white">
          {filters.shape.map(shape => (
            <div key={shape} className="bg-[#333] border border-[#ddd] rounded-full px-3 py-1 text-sm flex items-center gap-1">
              Shape: {shape}
              <button onClick={() => toggleFilter('shape', shape)} className="text-white hover:text-[#FFD700]">
                <X size={14} />
              </button>
            </div>
          ))}
          {filters.collection.map(collection => (
            <div key={collection} className="bg-[#333] border border-[#ddd] rounded-full px-3 py-1 text-sm flex items-center gap-1">
              Collection: {collection}
              <button onClick={() => toggleFilter('collection', collection)} className="text-white hover:text-[#FFD700]">
                <X size={14} />
              </button>
            </div>
          ))}
          {filters.price.map(price => (
            <div key={price} className="bg-[#333]  border border-[#ddd] rounded-full px-3 py-1 text-sm flex items-center gap-1">
              Price: {price.replace('-', ' - ')}
              <button onClick={() => toggleFilter('price', price)} className="text-white hover:text-[#FFD700]">
                <X size={14} />
              </button>
            </div>
          ))}
          {filters.carat.map(carat => (
            <div key={carat} className="bg-[#333]  border border-[#ddd] rounded-full px-3 py-1 text-sm flex items-center gap-1">
              Carat: {carat === '1.5' ? '1.5+' : carat}
              <button onClick={() => toggleFilter('carat', carat)} className="text-white hover:text-[#FFD700]">
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Mobile Filters Overlay */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end">
          <div className="bg-white w-full max-w-xs h-full overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button onClick={() => setMobileFiltersOpen(false)} className="text-[#999] hover:text-[#333]">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-6">
              {/* Shape Filter */}
              <div className="border-b border-[#eee] pb-4">
                <button 
                  onClick={() => toggleFilterSection('shape')}
                  className="flex justify-between items-center w-full text-left"
                >
                  <h4 className="font-medium">Shape</h4>
                  {expandedFilters.shape ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {expandedFilters.shape && (
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {allShapes.map(shape => (
                      <label key={shape} className="flex items-center justify-between gap-2 text-sm cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={filters.shape.includes(shape)}
                            onChange={() => toggleFilter('shape', shape)}
                            className="rounded border-[#ddd] text-[#1a1a1a] focus:ring-[#1a1a1a]"
                          />
                          {shape}
                        </div>
                        <span className="text-xs text-gray-500">({shapeCounts[shape]})</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Collection Filter */}
              <div className="border-b border-[#eee] pb-4">
                <button 
                  onClick={() => toggleFilterSection('collection')}
                  className="flex justify-between items-center w-full text-left"
                >
                  <h4 className="font-medium">Collection</h4>
                  {expandedFilters.collection ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {expandedFilters.collection && (
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {allCollections.map(collection => (
                      <label key={collection} className="flex items-center justify-between gap-2 text-sm cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={filters.collection.includes(collection)}
                            onChange={() => toggleFilter('collection', collection)}
                            className="rounded border-[#ddd] text-[#1a1a1a] focus:ring-[#1a1a1a]"
                          />
                          {collection}
                        </div>
                        <span className="text-xs text-gray-500">({collectionCounts[collection]})</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Price Filter */}
              <div className="border-b border-[#eee] pb-4">
                <button 
                  onClick={() => toggleFilterSection('price')}
                  className="flex justify-between items-center w-full text-left"
                >
                  <h4 className="font-medium">Price Range</h4>
                  {expandedFilters.price ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {expandedFilters.price && (
                  <div className="mt-3 space-y-2">
                    {priceRanges.map(range => (
                      <label key={range.value} className="flex items-center justify-between gap-2 text-sm cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={filters.price.includes(range.value)}
                            onChange={() => toggleFilter('price', range.value)}
                            className="rounded border-[#ddd] text-[#1a1a1a] focus:ring-[#1a1a1a]"
                          />
                          {range.label}
                        </div>
                        <span className="text-xs text-gray-500">({priceCounts[range.value]})</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Carat Filter */}
              <div className="border-b border-[#eee] pb-4">
                <button 
                  onClick={() => toggleFilterSection('carat')}
                  className="flex justify-between items-center w-full text-left"
                >
                  <h4 className="font-medium">Carat</h4>
                  {expandedFilters.carat ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {expandedFilters.carat && (
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {caratOptions.map(carat => (
                      <label key={carat.value} className="flex items-center justify-between gap-2 text-sm cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={filters.carat.includes(carat.value)}
                            onChange={() => toggleFilter('carat', carat.value)}
                            className="rounded border-[#ddd] text-[#1a1a1a] focus:ring-[#1a1a1a]"
                          />
                          {carat.label}
                        </div>
                        <span className="text-xs text-gray-500">({caratCounts[carat.value]})</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            <button 
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-6 w-full bg-[#1a1a1a] text-white py-2 rounded-lg font-medium text-sm"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Desktop Filters Sidebar */}
        <div className="hidden md:block w-64 shrink-0">
          <div className="bg-[#1a1a1a]  text-white/90 rounded-xl shadow-sm p-5 sticky top-24 max-h-[80vh] overflow-y-scroll overflow-x-hidden hide-scrollbar">
            <h3 className="text-lg font-semibold mb-5 text-gradient-gold">Filters</h3>
            
            <div className="space-y-6">
              {/* Shape Filter */}
              <div>
                <button 
                  onClick={() => toggleFilterSection('shape')}
                  className="flex justify-between items-center w-full text-left mb-2"
                >
                  <h4 className="font-medium text-sm">SHAPE</h4>
                  {expandedFilters.shape ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {expandedFilters.shape && (
                  <div className="grid grid-cols-2 gap-2">
                    {allShapes.map(shape => (
                      <label key={shape} className="flex items-center justify-between gap-2 text-sm cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={filters.shape.includes(shape)}
                            onChange={() => toggleFilter('shape', shape)}
                            className="rounded accent-yellow-500 focus:outline-none focus:ring-2 focus:ring-white/90"
                          />
                          {shape}
                        </div>
                        <span className="text-xs text-gray-500">({shapeCounts[shape]})</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Collection Filter */}
              <div>
                <button 
                  onClick={() => toggleFilterSection('collection')}
                  className="flex justify-between items-center w-full text-left mb-2"
                >
                  <h4 className="font-medium text-sm">COLLECTION</h4>
                  {expandedFilters.collection ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {expandedFilters.collection && (
                  <div className="grid grid-cols-1 gap-2">
                    {allCollections.map(collection => (
                      <label key={collection} className="flex items-center justify-between gap-1 text-sm cursor-pointer">
                        <div className="flex items-center gap-1">
                          <input
                            type="checkbox"
                            checked={filters.collection.includes(collection)}
                            onChange={() => toggleFilter('collection', collection)}
                            className="rounded accent-yellow-500 focus:outline-none focus:ring-2 focus:ring-white/90"
                          />
                          {collection}
                        </div>
                        <span className="text-xs text-gray-500 whitespace-nowrap">({collectionCounts[collection]})</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Price Filter */}
              <div>
                <button 
                  onClick={() => toggleFilterSection('price')}
                  className="flex justify-between items-center w-full text-left mb-2"
                >
                  <h4 className="font-medium text-sm">PRICE RANGE</h4>
                  {expandedFilters.price ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {expandedFilters.price && (
                  <div className="space-y-2">
                    {priceRanges.map(range => (
                      <label key={range.value} className="flex items-center justify-between gap-2 text-sm cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={filters.price.includes(range.value)}
                            onChange={() => toggleFilter('price', range.value)}
                            className="rounded accent-yellow-500 focus:outline-none focus:ring-2 focus:ring-white/90"
                          />
                          {range.label}
                        </div>
                        <span className="text-xs text-gray-500">({priceCounts[range.value]})</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Carat Filter */}
              <div>
                <button 
                  onClick={() => toggleFilterSection('carat')}
                  className="flex justify-between items-center w-full text-left mb-2"
                >
                  <h4 className="font-medium text-sm">CARAT</h4>
                  {expandedFilters.carat ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {expandedFilters.carat && (
                  <div className="grid grid-cols-2 gap-2">
                    {caratOptions.map(carat => (
                      <label key={carat.value} className="flex items-center justify-between gap-2 text-sm cursor-pointer">
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={filters.carat.includes(carat.value)}
                            onChange={() => toggleFilter('carat', carat.value)}
                            className="rounded accent-yellow-500 focus:outline-none focus:ring-2 focus:ring-white/90"
                          />
                          {carat.label}
                        </div>
                        <span className="text-xs text-gray-500">({caratCounts[carat.value]})</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1 ">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 justify-items-center ">

              {filteredProducts.map((product) => (
                <div key={product.id}  onClick={() => setSelectedProduct(product)} className=" relative max-w-xs bg-gradient-to-b from-white/5 to-white/10 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden shadow-xl transition-all duration-500 group cursor-pointer hover:shadow-[0_0_20px_rgba(212,175,55,0.6)]">
                  
                  <div className="relative overflow-hidden bg-gray-100 aspect-square">
                    <img 
                      src={product.image || '/placeholder-diamond.jpg'} 
                      alt={product.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <span className="absolute top-3 right-3 bg-[#1a1a1a] text-white text-xs px-2 py-1 rounded-full font-medium">
                      {product.discount} OFF
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-playfair text-xl font-semibold text-gradient-silver-dark mb-2">{product.name}</h3>
                    <div className="flex items-center gap-3 mb-2">
                      <p className="text-lg font-semibold text-white">₹{formatPrice(product.price)}</p>
                      <p className="text-sm text-[#999] line-through">₹{formatPrice(product.originalprice)}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-[#999]">Save ₹{formatPrice(product.originalprice - product.price)}</span>
                    </div>
                  </div>
                
                </div>
               
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-[#666] mb-4">Try adjusting your filters to find what you're looking for.</p>
              <button 
                onClick={clearFilters}
                className="bg-[#1a1a1a] text-white px-6 py-2 rounded-lg hover:bg-[#333] transition text-sm"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
      <ProductModal selectedProduct={selectedProduct} setSelectedProduct={setSelectedProduct} />

    </section>
  );
};

export default ProductsPage;