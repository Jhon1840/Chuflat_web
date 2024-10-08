'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, ArrowLeft, X, Trash2 } from "lucide-react"

type Product = {
  id: number
  nombre: string
  precio: string
  codigo: string
  existencia: number
}

type CartItem = Product & { quantity: number }

export default function MerchandisePage() {
  const [products, setProducts] = useState<Product[]>([])
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/productos')
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        const data = await response.json()
        setProducts(data)
        setIsLoading(false)
      } catch (error) {
        setError('Error al cargar productos. Por favor vuelvelo a intentar.')
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id)
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevItems, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const getTotalItems = () => cartItems.reduce((total, item) => total + item.quantity, 0)

  const getTotalPrice = () => cartItems.reduce((total, item) => total + parseFloat(item.precio) * item.quantity, 0)

  const openModal = (product: Product) => {
    setSelectedProduct(product)
  }

  const closeModal = () => {
    setSelectedProduct(null)
  }

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen)
  }

  if (isLoading) {
    return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading...</div>
  }

  if (error) {
    return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">{error}</div>
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-black py-4 sticky top-0 z-10 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-red-500 hover:text-red-400 transition-colors">CHUFLAY</Link>
          <button 
            className="bg-red-500 hover:bg-red-600 rounded-full p-2 relative transition-colors"
            onClick={toggleCart}
          >
            <ShoppingCart className="h-6 w-6" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-red-500 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                {getTotalItems()}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/" className="text-red-500 hover:text-red-400 flex items-center transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <h1 className="text-5xl font-bold mb-8 text-center">Chuflay Merchandise</h1>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4 justify-center">
          <select className="bg-gray-800 border border-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500">
            <option value="">Category</option>
            <option value="all">All</option>
            <option value="clothing">Clothing</option>
            <option value="accessories">Accessories</option>
            <option value="music">Music</option>
          </select>
          <select className="bg-gray-800 border border-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500">
            <option value="">Sort By</option>
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
          <input 
            type="search" 
            placeholder="Search merchandise..." 
            className="bg-gray-800 border border-gray-700 text-white rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105">
              <div className="aspect-w-1 aspect-h-1 cursor-pointer" onClick={() => openModal(product)}>
                <Image src="/placeholder.svg?height=300&width=300" alt={product.nombre} width={300} height={300} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.nombre}</h3>
                <p className="text-red-400 text-lg font-bold mb-4">${parseFloat(product.precio).toFixed(2)}</p>
                <button 
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black py-8 mt-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            {['Facebook', 'Twitter', 'Instagram', 'YouTube'].map((social) => (
              <a key={social} href="#" className="hover:text-red-500 transition-colors">
                {social}
              </a>
            ))}
          </div>
          <p className="text-gray-400">© 2023 Chuflay. All rights reserved.</p>
        </div>
      </footer>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg max-w-lg w-full">
            <div className="relative">
              <Image src="/placeholder.svg?height=300&width=300" alt={selectedProduct.nombre} width={300} height={300} className="w-full h-64 object-cover rounded-t-lg" />
              <button 
                onClick={closeModal}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-4">
              <h3 className="text-2xl font-bold mb-2">{selectedProduct.nombre}</h3>
              <p className="text-red-400 text-xl font-bold mb-4">${parseFloat(selectedProduct.precio).toFixed(2)}</p>
              <p className="text-gray-300 mb-4">Code: {selectedProduct.codigo}</p>
              <p className="text-gray-300 mb-4">In stock: {selectedProduct.existencia}</p>
              <button 
                className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
                onClick={() => { addToCart(selectedProduct); closeModal(); }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Sidebar */}
      <div className={`fixed inset-y-0 right-0 w-full sm:w-96 bg-gray-800 shadow-lg transform ${isCartOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out z-50`}>
        <div className="h-full flex flex-col">
          <div className="p-4 bg-gray-900 flex justify-between items-center">
            <h2 className="text-xl font-bold">Your Cart</h2>
            <button onClick={toggleCart} className="text-gray-500 hover:text-white">
              <X className="h-6 w-6" />
            </button>
          </div>
          <div className="flex-grow overflow-y-auto p-4">
            {cartItems.length === 0 ? (
              <p className="text-gray-400">Your cart is empty</p>
            ) : (
              cartItems.map(item => (
                <div key={item.id} className="flex items-center mb-4 bg-gray-700 p-2 rounded-lg">
                  <Image src="/placeholder.svg?height=64&width=64" alt={item.nombre} width={64} height={64} className="w-16 h-16 object-cover rounded mr-4" />
                  <div className="flex-grow">
                    <h3 className="font-semibold">{item.nombre}</h3>
                    <p className="text-sm text-gray-400">${parseFloat(item.precio).toFixed(2)}</p>
                    <div className="flex items-center mt-2">
                      <button 
                        className="bg-gray-600 text-white px-2 py-1 rounded"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button 
                        className="bg-gray-600 text-white px-2 py-1 rounded"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))
            )}
          </div>
          <div className="p-4 bg-gray-900">
            <div className="flex justify-between items-center mb-4">
              <span className="font-semibold">Total:</span>
              <span className="font-bold text-xl">${getTotalPrice().toFixed(2)}</span>
            </div>
            <button 
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
              onClick={() => alert('Proceeding to checkout...')}
              disabled={cartItems.length === 0}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}