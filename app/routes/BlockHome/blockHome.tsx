import React, { useState, useEffect } from "react";
import { FiSearch, FiGrid, FiList, FiFilter } from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router";
import Navbar from "~/components/template/Scratch/Navbar/navbar";
import { scratchLogo } from "~/images";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "VSAY || Home page" },
    { name: "login", content: "Welcome to VSAY Portal" },
  ];
}

const BlockHome = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "Scratch Coding",
      description:
        "A visual programming platform that enables users to create interactive stories, games, and animations using drag-and-drop blocks. Perfect for beginners and educators.",
      price: 0.0,
      rating: 4.7,
      image: scratchLogo,
      features: [
        "Block-based programming",
        "Interactive learning",
        "Customizable blocks",
      ],
    },

    {
      id: 2,
      name: "Block coding(coming soon)",
      description: "An visually appealing  platform to learn coding in fun way",
      price: null,
      comingSoon: true,
      rating: 4.8,
      image: "",
      features: ["Interactive learning", "Block-based programming"],
    },
  ]);

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const [showComparison, setShowComparison] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const handleProductSelect = (product) => {
    if (selectedProducts.find((p) => p.id === product.id)) {
      setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));
    } else {
      setSelectedProducts([...selectedProducts, product]);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return a.name.localeCompare(b.name);
  });

  const ProductCard = ({ product }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-lg shadow-lg overflow-hidden  cursor-pointer ${
        viewMode === "grid" ? "w-full" : "flex"
      }`}
      onClick={() => handleScratchClick(product.name)}
    >
      <div
        className={`relative ${viewMode === "grid" ? "h-48" : "w-1/3 h-full"}`}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute top-2 right-2">
          <button
            onClick={() => handleProductSelect(product)}
            className={`p-2 rounded-full ${
              selectedProducts.find((p) => p.id === product.id)
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            ✓
          </button>
        </div>
      </div>
      <div className={`p-4 ${viewMode === "grid" ? "" : "w-2/3"}`}>
        <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-2">{product.description}</p>
        <div className="flex items-center mb-2">
          {/* {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={
                i < Math.floor(product.rating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }
            />
          ))} */}
          {/* <span className="ml-2 text-gray-600">{product.rating}</span> */}
        </div>
        {/* <p className="text-blue-600 font-bold text-xl mb-2">${product.price}</p>     */}
        <div className="flex flex-wrap gap-2">
          {product.features.map((feature, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gray-100 rounded-full text-sm text-gray-600"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );

  const navigate = useNavigate();

  const handleScratchClick = (name) => {
    if (name === "Scratch Coding") {
      navigate("/scratch");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <Navbar />
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <div className="relative flex-1 max-w-xl">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="name">Sort by Name</option>
              {/* <option value="price">Sort by Price</option> */}
              <option value="rating">Sort by Rating</option>
            </select>
            <button
              onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100"
            >
              {viewMode === "grid" ? (
                <FiList size={20} />
              ) : (
                <FiGrid size={20} />
              )}
            </button>
          </div>
        </div>

        <div
          className={`grid ${
            viewMode === "grid"
              ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "grid-cols-1 gap-4"
          }`}
        >
          {sortedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {selectedProducts.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="font-semibold">
                  {selectedProducts.length} products selected
                </span>
                <button
                  onClick={() => setShowComparison(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Compare Products
                </button>
              </div>
              <button
                onClick={() => setSelectedProducts([])}
                className="text-gray-600 hover:text-gray-800"
              >
                Clear Selection
              </button>
            </div>
          </div>
        )}

        <AnimatePresence>
          {showComparison && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-auto">
                <div className="p-4 border-b">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-semibold">
                      Product Comparison
                    </h2>
                    <button
                      onClick={() => setShowComparison(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      ×
                    </button>
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {selectedProducts.map((product) => (
                      <div key={product.id} className="border rounded-lg p-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h3 className="font-semibold mb-2">{product.name}</h3>
                        <p className="text-gray-600 mb-2">
                          {product.description}
                        </p>
                        <p className="text-blue-600 font-bold">
                          ${product.price}
                        </p>
                        <ul className="mt-4">
                          {product.features.map((feature, index) => (
                            <li
                              key={index}
                              className="flex items-center gap-2 mb-1"
                            >
                              <span className="text-green-500">✓</span>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default BlockHome;
