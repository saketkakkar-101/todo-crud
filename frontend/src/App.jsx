import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, deleteTodo, loadFromLocalStorage, updateTodo } from './redux/productSlice.js'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const dispatch = useDispatch()
  const [filters, setFilters] = useState({ search: '', category: '', sort: '' })
  const { products } = useSelector((state) => state.todos)
  const [todo, setTodo] = useState({ name: '', price: '', category: '', description: '' })
  const [edit, setEdit] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 4

  const handleChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    dispatch(loadFromLocalStorage())
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()

    const { name, price, category, description } = todo
    if (!name || !price || !category || !description) {
      toast.error("Please fill all fields!")
      return
    }

    const productDetails = {
      name,
      price: Number(price),
      category,
      description
    }

    if (edit === null) {
      dispatch(addTodo(productDetails))
      toast.success("Product Added!")
    } else {
      dispatch(updateTodo({ ...productDetails, _id: edit }))
      toast.info("Product Updated!")
    }

    setTodo({ name: '', price: '', category: '', description: '' })
    setEdit(null)
  }

  const handleEdit = (prod) => {
    setTodo({
      name: prod.name,
      price: prod.price,
      category: prod.category,
      description: prod.description
    })
    setEdit(prod._id)
  }

  const handleDelete = (id) => {
    dispatch(deleteTodo(id))
    toast.error("Product Deleted!")
  }

  const filteredProducts = products
    .filter((p) =>
      p.name.toLowerCase().includes(filters.search.toLowerCase()) &&
      (filters.category ? p.category === filters.category : true)
    )
    .sort((a, b) => {
      if (filters.sort === 'asc') return a.price - b.price
      if (filters.sort === 'desc') return b.price - a.price
      return 0
    })

  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage)
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage)

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-500 to-purple-900 flex justify-center pt-12 font-sans">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="w-full max-w-4xl bg-white rounded-2xl p-8 shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center text-purple-800 mb-8">🔥 Product Manager</h2>

        {/* Filters */}
        <form className="flex flex-wrap gap-4 mb-8">
          <input
            type="text"
            placeholder="Search..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="flex-1 p-4 rounded-xl border-2 border-purple-700 bg-purple-100 font-semibold text-purple-900"
          />
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            className="flex-1 p-4 rounded-xl border-2 border-purple-700 bg-purple-100 font-semibold text-purple-900"
          >
            <option value="">All Categories</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="electronics">Electronics</option>
          </select>
          <select
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            className="flex-1 p-4 rounded-xl border-2 border-purple-700 bg-purple-100 font-semibold text-purple-900"
          >
            <option value="">Sort By</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </form>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-10">
          <input type="text" name="name" placeholder="Product Name" value={todo.name} onChange={handleChange} className="p-4 rounded-xl border-2 border-purple-700 bg-purple-100" />
          <input type="number" name="price" placeholder="Price (₹)" value={todo.price} onChange={handleChange} className="p-4 rounded-xl border-2 border-purple-700 bg-purple-100" />
          <input type="text" name="category" placeholder="Category" value={todo.category} onChange={handleChange} className="p-4 rounded-xl border-2 border-purple-700 bg-purple-100" />
          <input type="text" name="description" placeholder="Description" value={todo.description} onChange={handleChange} className="p-4 rounded-xl border-2 border-purple-700 bg-purple-100" />
          <button type="submit" className="p-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-extrabold text-lg">
            {edit === null ? 'Add Product' : 'Update Product'}
          </button>
        </form>

        {/* Product List */}
        <ul className="space-y-6">
          {paginatedProducts.map((prod) => (
            <li key={prod._id} className="bg-gradient-to-br from-purple-400 to-pink-400 text-white rounded-2xl p-6 shadow-xl">
              <div className="text-2xl font-extrabold text-center mb-1">{prod.name}</div>
              <div className="text-lg font-bold text-center mb-3">₹ {prod.price} • {prod.category}</div>
              <div className="italic text-center mb-4">{prod.description}</div>
              <div className="flex justify-center gap-4">
                <button onClick={() => handleEdit(prod)} className="px-5 py-2 bg-yellow-400 text-purple-900 font-bold rounded-full">✏️ Edit</button>
                <button onClick={() => handleDelete(prod._id)} className="px-5 py-2 bg-red-600 text-white font-bold rounded-full">🗑️ Delete</button>
              </div>
            </li>
          ))}
        </ul>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-10">
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="px-4 py-2 rounded bg-purple-700 text-white font-bold disabled:bg-gray-400">Prev</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={`px-4 py-2 rounded ${currentPage === i + 1 ? 'bg-pink-500 text-white' : 'bg-gray-200 text-purple-800'} font-semibold`}>
              {i + 1}
            </button>
          ))}
          <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)} className="px-4 py-2 rounded bg-purple-700 text-white font-bold disabled:bg-gray-400">Next</button>
        </div>
      </div>
    </div>
  )
}

export default App


// import React from 'react'
// import {
//   BarChart2,
//   ShoppingCart,
//   Users,
//   DollarSign,
//   Settings,
// } from 'lucide-react'

// const App = () => {
//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-purple-800 text-white p-6 space-y-6">
//         <h1 className="text-3xl font-bold">MyApp</h1>
//         <nav className="space-y-4">
//           <div className="flex items-center gap-3 hover:bg-purple-700 p-2 rounded">
//             <BarChart2 /> Dashboard
//           </div>
//           <div className="flex items-center gap-3 hover:bg-purple-700 p-2 rounded">
//             <ShoppingCart /> Orders
//           </div>
//           <div className="flex items-center gap-3 hover:bg-purple-700 p-2 rounded">
//             <Users /> Users
//           </div>
//           <div className="flex items-center gap-3 hover:bg-purple-700 p-2 rounded">
//             <DollarSign /> Revenue
//           </div>
//           <div className="flex items-center gap-3 hover:bg-purple-700 p-2 rounded">
//             <Settings /> Settings
//           </div>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-8">
//         {/* Header */}
//         <div className="flex justify-between items-center mb-8">
//           <h2 className="text-2xl font-bold text-purple-800">Dashboard Overview</h2>
//           <div className="text-gray-600">👤 Welcome, Admin</div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500">
//             <p className="text-gray-500">Total Sales</p>
//             <h3 className="text-2xl font-bold text-purple-700">₹120,000</h3>
//           </div>
//           <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
//             <p className="text-gray-500">Orders</p>
//             <h3 className="text-2xl font-bold text-green-700">524</h3>
//           </div>
//           <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
//             <p className="text-gray-500">Users</p>
//             <h3 className="text-2xl font-bold text-yellow-700">1320</h3>
//           </div>
//           <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
//             <p className="text-gray-500">Refunds</p>
//             <h3 className="text-2xl font-bold text-red-700">18</h3>
//           </div>
//         </div>

//         {/* Placeholder Chart/Content */}
//         <div className="mt-10 p-6 bg-white rounded-xl shadow-md text-gray-600">
//           📊 Chart or Detailed Table will be here
//         </div>
//       </main>
//     </div>
//   )
// }

// export default App


