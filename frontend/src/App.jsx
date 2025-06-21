

// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { addTodo, deleteTodo, loadFromLocalStorage, updateTodo } from './redux/productSlice.js'

// const App = () => {
//   const dispatch = useDispatch()
//   const [filters, setFilters] = useState({ search: '', category: '', sort: '' })
//   const { products } = useSelector((state) => state.todos)
//   const [todo, setTodo] = useState({ name: '', price: '', category: '', description: '' })
//   const [edit, setEdit] = useState(null)

//   const handleChange = (e) => {
//     setTodo({ ...todo, [e.target.name]: e.target.value })
//   }

//   useEffect(() => {
//     dispatch(loadFromLocalStorage())
//   }, [dispatch])

//   const handleSubmit = (e) => {
//     e.preventDefault()

//     if (!todo.name || !todo.price || !todo.category || !todo.description) {
//       alert("Please fill all fields!")
//       return
//     }

//     const productDetails = {
//       name: todo.name,
//       price: Number(todo.price),
//       category: todo.category,
//       description: todo.description
//     }

//     if (edit === null) {
//       dispatch(addTodo(productDetails))
//     } else {
//       dispatch(updateTodo({ ...productDetails, _id: edit }))
//     }

//     setTodo({ name: '', price: '', category: '', description: '' })
//     setEdit(null)
//   }

//   const handleEdit = (prod) => {
//     setTodo({
//       name: prod.name,
//       price: prod.price,
//       category: prod.category,
//       description: prod.description
//     })
//     setEdit(prod._id)
//   }

//   const filteredProducts = products
//     .filter((p) =>
//       p.name.toLowerCase().includes(filters.search.toLowerCase()) &&
//       (filters.category ? p.category === filters.category : true)
//     )
//     .sort((a, b) => {
//       if (filters.sort === 'asc') return a.price - b.price
//       if (filters.sort === 'desc') return b.price - a.price
//       return 0
//     })

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-br from-purple-500 to-purple-900 flex justify-center pt-12 font-sans">
//       <div className="w-full max-w-4xl bg-white rounded-2xl p-8 shadow-2xl">
//         <h2 className="text-4xl font-extrabold text-center text-purple-800 mb-8">🔥 Product Manager</h2>

//         <form className="flex flex-wrap gap-4 mb-8">
//           <input
//             type="text"
//             placeholder="Search..."
//             value={filters.search}
//             onChange={(e) => setFilters({ ...filters, search: e.target.value })}
//             className="flex-1 p-4 rounded-xl border-2 border-purple-700 bg-purple-100 font-semibold text-purple-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
//           />
//           <select
//             value={filters.category}
//             onChange={(e) => setFilters({ ...filters, category: e.target.value })}
//             className="flex-1 p-4 rounded-xl border-2 border-purple-700 bg-purple-100 font-semibold text-purple-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
//           >
//             <option value="">All Categories</option>
//             <option value="men">Men</option>
//             <option value="women">Women</option>
//             <option value="electronics">Electronics</option>
//           </select>
//           <select
//             value={filters.sort}
//             onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
//             className="flex-1 p-4 rounded-xl border-2 border-purple-700 bg-purple-100 font-semibold text-purple-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
//           >
//             <option value="">Sort By</option>
//             <option value="asc">Price: Low to High</option>
//             <option value="desc">Price: High to Low</option>
//           </select>
//         </form>

//         <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-10">
//           <input
//             type="text"
//             name="name"
//             placeholder="Product Name"
//             value={todo.name}
//             onChange={handleChange}
//             className="p-4 rounded-xl border-2 border-purple-700 bg-purple-100 font-semibold text-purple-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
//           />
//           <input
//             type="number"
//             name="price"
//             placeholder="Price (₹)"
//             value={todo.price}
//             onChange={handleChange}
//             className="p-4 rounded-xl border-2 border-purple-700 bg-purple-100 font-semibold text-purple-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
//           />
//           <input
//             type="text"
//             name="category"
//             placeholder="Category"
//             value={todo.category}
//             onChange={handleChange}
//             className="p-4 rounded-xl border-2 border-purple-700 bg-purple-100 font-semibold text-purple-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
//           />
//           <input
//             type="text"
//             name="description"
//             placeholder="Description"
//             value={todo.description}
//             onChange={handleChange}
//             className="p-4 rounded-xl border-2 border-purple-700 bg-purple-100 font-semibold text-purple-900 focus:outline-none focus:ring-2 focus:ring-pink-500"
//           />
//           <button
//             type="submit"
//             className="p-4 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-extrabold text-lg shadow-md hover:scale-105 transition-transform"
//           >
//             {edit === null ? 'Add Product' : 'Update Product'}
//           </button>
//         </form>

//         <ul className="space-y-6">
//           {filteredProducts.map((prod) => (
//             <li
//               key={prod._id}
//               className="bg-gradient-to-br from-purple-400 to-pink-400 text-white rounded-2xl p-6 shadow-xl hover:-translate-y-2 hover:scale-105 transform transition duration-300 cursor-pointer"
//             >
//               <div className="text-2xl font-extrabold text-center mb-1">{prod.name}</div>
//               <div className="text-lg font-bold text-center mb-3">₹ {prod.price} • {prod.category}</div>
//               <div className="italic text-center mb-4">{prod.description}</div>
//               <div className="flex justify-center gap-4">
//                 <button
//                   onClick={() => handleEdit(prod)}
//                   className="px-5 py-2 bg-yellow-400 text-purple-900 font-bold rounded-full shadow-md hover:scale-110 transition-transform"
//                 >
//                   ✏️ Edit
//                 </button>
//                 <button
//                   onClick={() => dispatch(deleteTodo(prod._id))}
//                   className="px-5 py-2 bg-red-600 text-white font-bold rounded-full shadow-md hover:scale-110 transition-transform"
//                 >
//                   🗑️ Delete
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   )
// }

// export default App


import React from 'react'
import {
  BarChart2,
  ShoppingCart,
  Users,
  DollarSign,
  Settings,
} from 'lucide-react'

const App = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-purple-800 text-white p-6 space-y-6">
        <h1 className="text-3xl font-bold">MyApp</h1>
        <nav className="space-y-4">
          <div className="flex items-center gap-3 hover:bg-purple-700 p-2 rounded">
            <BarChart2 /> Dashboard
          </div>
          <div className="flex items-center gap-3 hover:bg-purple-700 p-2 rounded">
            <ShoppingCart /> Orders
          </div>
          <div className="flex items-center gap-3 hover:bg-purple-700 p-2 rounded">
            <Users /> Users
          </div>
          <div className="flex items-center gap-3 hover:bg-purple-700 p-2 rounded">
            <DollarSign /> Revenue
          </div>
          <div className="flex items-center gap-3 hover:bg-purple-700 p-2 rounded">
            <Settings /> Settings
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-purple-800">Dashboard Overview</h2>
          <div className="text-gray-600">👤 Welcome, Admin</div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500">
            <p className="text-gray-500">Total Sales</p>
            <h3 className="text-2xl font-bold text-purple-700">₹120,000</h3>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
            <p className="text-gray-500">Orders</p>
            <h3 className="text-2xl font-bold text-green-700">524</h3>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
            <p className="text-gray-500">Users</p>
            <h3 className="text-2xl font-bold text-yellow-700">1320</h3>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-red-500">
            <p className="text-gray-500">Refunds</p>
            <h3 className="text-2xl font-bold text-red-700">18</h3>
          </div>
        </div>

        {/* Placeholder Chart/Content */}
        <div className="mt-10 p-6 bg-white rounded-xl shadow-md text-gray-600">
          📊 Chart or Detailed Table will be here
        </div>
      </main>
    </div>
  )
}

export default App
