import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, deleteTodo, loadFromLocalStorage, updateTodo } from './redux/productSlice.js'

const App = () => {
  const dispatch = useDispatch()
  const [filters, setFilters] = useState({ search: '', category: '', sort: '' })
  const { products } = useSelector((state) => state.todos)
  const [todo, setTodo] = useState({ name: '', price: '', category: '', description: '' })
  const [edit, setEdit] = useState(null)

  const handleChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    dispatch(loadFromLocalStorage())
  }, [dispatch])

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!todo.name || !todo.price || !todo.category || !todo.description) {
      alert("Please fill all fields!")
      return
    }

    const productDetails = {
      name: todo.name,
      price: Number(todo.price),
      category: todo.category,
      description: todo.description
    }

    if (edit === null) {
      dispatch(addTodo(productDetails))
    } else {
      dispatch(updateTodo({ ...productDetails, _id: edit }))
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

  // const filteredProducts = products
  // .filter((p) =>
  //   p.name.toLowerCase().includes(filters.search.toLowerCase()) &&
  //   (filters.category ? p.category === filters.category : true)
  // )
  // .sort((a, b) => {
  //   if (filters.sort === 'asc') return a.price - b.price
  //   if (filters.sort === 'desc') return b.price - a.price
  //   return 0
  // })

const filteredProducts = products
.filter((p) => 
p.name.toLowerCase().includes(filters.search.toLowerCase()) && 
(filters.category ? p.category === filters.category : true)
)
.sort((a,b) => {
  if (filters.sort === 'asc') return a.price - b.price
  if (filters.sort === 'desc') return b.price - a.price
  return 0
})

  return (
    <div style={outerContainer}>
      <div style={innerContainer}>
        <h2 style={headingStyle}>🔥 Product Manager</h2>

        <form style={{ display: 'flex', gap: 10, marginBottom: 30, flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Search..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            style={{ ...inputStyle, flex: 1 }}
          />
          <select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            style={{ ...inputStyle, flex: 1 }}
          >
            <option value="">All Categories</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="electronics">Electronics</option>
          </select>
          <select
            value={filters.sort}
            onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            style={{ ...inputStyle, flex: 1 }}
          >
            <option value="">Sort By</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </form>


        <form onSubmit={handleSubmit} style={formStyle}>
          <input
            type="text"
            name='name'
            placeholder="Product Name"
            value={todo.name}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="number"
            name='price'
            placeholder="Price (₹)"
            value={todo.price}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="text"
            name='category'
            placeholder="Category"
            value={todo.category}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="text"
            name='description'
            placeholder="Description"
            value={todo.description}
            onChange={handleChange}
            style={inputStyle}
          />
          <button type='submit' style={submitButtonStyle}>
            {edit === null ? 'Add Product' : 'Update Product'}
          </button>
        </form>

        <ul style={listStyle}>
  {filteredProducts.map((prod) => (
    <li key={prod._id} style={productCard} className="product-card">
      <div style={productTitle}>{prod.name}</div>
      <div style={productInfo}>₹ {prod.price} &middot; {prod.category}</div>
      <div style={productDescription}>{prod.description}</div>
      <div style={buttonGroup}>
        <button onClick={() => handleEdit(prod)} style={editButton} className="btn-hover">✏️ Edit</button>
        <button onClick={() => dispatch(deleteTodo(prod._id))} style={deleteButton} className="btn-hover">🗑️ Delete</button>
      </div>
    </li>
  ))}
</ul>

      </div>

      {/* Add CSS for animations and hover effects */}
      <style>{`
        .product-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .product-card:hover {
          transform: translateY(-10px) scale(1.03);
          box-shadow: 0 15px 25px rgba(118, 75, 162, 0.6);
          cursor: pointer;
        }
        .btn-hover {
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .btn-hover:hover {
          transform: scale(1.1);
          box-shadow: 0 8px 15px rgba(0,0,0,0.3);
        }
        input:focus {
          border-color: #f50057 !important;
          box-shadow: 0 0 8px #f50057 !important;
          outline: none !important;
        }
        button:focus {
          outline: 2px solid #f50057 !important;
          outline-offset: 2px !important;
        }
      `}</style>
    </div>
  )
}

const outerContainer = {
  width: '100vw',
  minHeight: '100vh',
  background: 'radial-gradient(circle at top left, #9c27b0, #6a1b9a)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-start',
  paddingTop: 50,
  boxSizing: 'border-box',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
}

const innerContainer = {
  width: '100%',
  maxWidth: 950,
  backgroundColor: '#fff',
  borderRadius: 20,
  padding: 35,
  boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
}

const headingStyle = {
  textAlign: 'center',
  fontSize: '3rem',
  color: '#6a1b9a',
  marginBottom: 35,
  fontWeight: '900',
  letterSpacing: '2px',
  textShadow: '0 3px 7px rgba(106, 27, 154, 0.8)',
  userSelect: 'none',
}

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 18,
  marginBottom: 60,
}

const inputStyle = {
  padding: '16px 20px',
  borderRadius: 14,
  border: '2.5px solid #6a1b9a',
  fontSize: 17,
  fontWeight: '700',
  color: '#4a148c',
  backgroundColor: '#f4e6ff',
  boxShadow: 'inset 2px 2px 8px rgba(106, 27, 154, 0.2)',
  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
  outline: 'none',
}

const submitButtonStyle = {
  padding: '16px 0',
  borderRadius: 30,
  border: 'none',
  background: 'linear-gradient(90deg, #ff4081 0%, #7c4dff 100%)',
  color: '#fff',
  fontWeight: '900',
  fontSize: 20,
  cursor: 'pointer',
  boxShadow: '0 8px 25px rgba(252, 69, 148, 0.7)',
  userSelect: 'none',
  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
}

submitButtonStyle[':hover'] = {
  transform: 'scale(1.07)',
  boxShadow: '0 12px 35px rgba(252, 69, 148, 0.9)',
}

const listStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
}

const productCard = {
  background: 'linear-gradient(135deg, #957dad, #d291bc)',
  borderRadius: 20,
  padding: 30,
  marginBottom: 25,
  color: '#fff',
  boxShadow: '0 12px 35px rgba(0,0,0,0.35)',
  userSelect: 'none',
}

const productTitle = {
  fontSize: '2rem',
  fontWeight: '900',
  marginBottom: 10,
  textShadow: '0 3px 8px rgba(0,0,0,0.45)',
  textAlign: 'center',
}

const productInfo = {
  fontSize: '1.1rem',
  fontWeight: '700',
  marginBottom: 18,
  textAlign: 'center',
  letterSpacing: '0.1em',
  textShadow: '0 2px 5px rgba(0,0,0,0.3)',
}

const productDescription = {
  fontSize: '1.05rem',
  fontWeight: '500',
  textAlign: 'center',
  lineHeight: 1.6,
  marginBottom: 25,
  fontStyle: 'italic',
  textShadow: '0 1px 5px rgba(0,0,0,0.35)',
}

const buttonGroup = {
  display: 'flex',
  justifyContent: 'center',
  gap: 18,
}

const editButton = {
  padding: '12px 28px',
  backgroundColor: '#ffca28',
  border: 'none',
  borderRadius: 25,
  color: '#4a148c',
  fontWeight: '800',
  fontSize: '1rem',
  cursor: 'pointer',
  boxShadow: '0 6px 18px rgba(255, 202, 40, 0.7)',
  transition: 'background-color 0.3s ease',
  userSelect: 'none',
}

const deleteButton = {
  padding: '12px 28px',
  backgroundColor: '#e53935',
  border: 'none',
  borderRadius: 25,
  color: '#fff',
  fontWeight: '800',
  fontSize: '1rem',
  cursor: 'pointer',
  boxShadow: '0 6px 18px rgba(229, 57, 53, 0.75)',
  transition: 'background-color 0.3s ease',
  userSelect: 'none',
}

export default App
