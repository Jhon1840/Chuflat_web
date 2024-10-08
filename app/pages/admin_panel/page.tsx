"use client"
import { useState } from 'react'
import { PlusCircle, Edit, Trash2, X, ShoppingBag, Package } from "lucide-react"
import Link from "next/link"

// Tipos
type Product = {
  id: number
  name: string
  price: number
  image: string
  description: string
}

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

type Order = {
  id: number
  userId: number
  products: { productId: number; quantity: number }[]
  totalAmount: number
  status: OrderStatus
  date: string
}

// Datos iniciales
const initialProducts: Product[] = [
  { id: 1, name: "Electric Dreams T-Shirt", price: 25, image: "/placeholder.svg?height=300&width=300", description: "Show off your Chuflay fandom with this electrifying t-shirt featuring our 'Electric Dreams' album artwork." },
  { id: 2, name: "Chuflay Logo Hoodie", price: 45, image: "/placeholder.svg?height=300&width=300", description: "Stay warm and stylish with our premium hoodie featuring the iconic Chuflay logo." },
  { id: 3, name: "Signed Poster", price: 20, image: "/placeholder.svg?height=300&width=300", description: "A limited edition poster signed by all members of Chuflay. A must-have for any true fan!" },
]

const initialOrders: Order[] = [
  { id: 1, userId: 1, products: [{ productId: 1, quantity: 2 }, { productId: 3, quantity: 1 }], totalAmount: 70, status: 'pending', date: '2023-06-01' },
  { id: 2, userId: 2, products: [{ productId: 2, quantity: 1 }], totalAmount: 45, status: 'shipped', date: '2023-05-28' },
  { id: 3, userId: 1, products: [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 1 }], totalAmount: 70, status: 'delivered', date: '2023-05-15' },
]

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [orders, setOrders] = useState<Order[]>(initialOrders)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products')

  const openProductModal = (product: Product | null = null) => {
    setCurrentProduct(product)
    setIsProductModalOpen(true)
  }

  const closeProductModal = () => {
    setCurrentProduct(null)
    setIsProductModalOpen(false)
  }

  const handleProductSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const newProduct: Product = {
      id: currentProduct ? currentProduct.id : Date.now(),
      name: formData.get('name') as string,
      price: Number(formData.get('price')),
      image: formData.get('image') as string,
      description: formData.get('description') as string,
    }

    if (currentProduct) {
      setProducts(products.map(p => p.id === currentProduct.id ? newProduct : p))
    } else {
      setProducts([...products, newProduct])
    }
    closeProductModal()
  }

  const deleteProduct = (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== id))
    }
  }

  const updateOrderStatus = (orderId: number, newStatus: OrderStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ))
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-black py-4 sticky top-0 z-10 shadow-lg">
        <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-red-500 hover:text-red-400 transition-colors">CHUFLAY</Link>
          <h1 className="text-2xl font-bold">Admin Panel</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex mb-8">
          <button
            onClick={() => setActiveTab('products')}
            className={`py-2 px-4 font-bold ${activeTab === 'products' ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-300'} rounded-tl-lg rounded-tr-lg`}
          >
            Manage Products
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-2 px-4 font-bold ${activeTab === 'orders' ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-300'} rounded-tl-lg rounded-tr-lg ml-2`}
          >
            Order History
          </button>
        </div>

        {activeTab === 'products' && (
          <>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Manage Products</h2>
              <button
                onClick={() => openProductModal()}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition-colors flex items-center"
              >
                <PlusCircle className="mr-2" />
                Add New Product
              </button>
            </div>

            {/* Product Table */}
            <div className="overflow-x-auto">
              <table className="w-full bg-gray-800 shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="py-3 px-4 text-left">Image</th>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Price</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product.id} className="border-b border-gray-700">
                      <td className="py-3 px-4">
                        <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                      </td>
                      <td className="py-3 px-4">{product.name}</td>
                      <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => openProductModal(product)}
                          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-2 rounded mr-2 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteProduct(product.id)}
                          className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {activeTab === 'orders' && (
          <>
            <h2 className="text-3xl font-bold mb-8">Order History</h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-gray-800 shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-700">
                  <tr>
                    <th className="py-3 px-4 text-left">Order ID</th>
                    <th className="py-3 px-4 text-left">User ID</th>
                    <th className="py-3 px-4 text-left">Products</th>
                    <th className="py-3 px-4 text-left">Total Amount</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Date</th>
                    <th className="py-3 px-4 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-700">
                      <td className="py-3 px-4">{order.id}</td>
                      <td className="py-3 px-4">{order.userId}</td>
                      <td className="py-3 px-4">
                        {order.products.map((p, index) => (
                          <div key={index}>
                            Product ID: {p.productId}, Quantity: {p.quantity}
                          </div>
                        ))}
                      </td>
                      <td className="py-3 px-4">${order.totalAmount.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded ${
                          order.status === 'pending' ? 'bg-yellow-500' :
                          order.status === 'processing' ? 'bg-blue-500' :
                          order.status === 'shipped' ? 'bg-purple-500' :
                          order.status === 'delivered' ? 'bg-green-500' :
                          'bg-red-500'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">{order.date}</td>
                      <td className="py-3 px-4">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                          className="bg-gray-700 border border-gray-600 text-white rounded px-2 py-1"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </main>

      {/* Product Modal */}
      {isProductModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 rounded-lg max-w-lg w-full">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h3 className="text-2xl font-bold">{currentProduct ? 'Edit Product' : 'Add New Product'}</h3>
              <button 
                onClick={closeProductModal}
                className="text-gray-500 hover:text-white transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleProductSubmit} className="p-4">
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={currentProduct?.name}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-300 mb-1">Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  defaultValue={currentProduct?.price}
                  required
                  min="0"
                  step="0.01"
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="image" className="block text-sm font-medium text-gray-300 mb-1">Image URL</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  defaultValue={currentProduct?.image}
                  required
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <textarea
                  id="description"
                  name="description"
                  defaultValue={currentProduct?.description}
                  required
                  rows={3}
                  className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                ></textarea>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded transition-colors"
                >
                  {currentProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}