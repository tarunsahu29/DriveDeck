// import { useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import SuccessModal from '../../components/SuccessModal'

// export default function Login() {
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//   })
//   const [error, setError] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [showModal, setShowModal] = useState(false) // State to control modal visibility
//   const navigate = useNavigate()

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.id]: e.target.value,
//     })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault() // Prevent form refresh
//     try {
//       setLoading(true)
//       const res = await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       })
//       const data = await res.json()

//       if (!res.ok || data.error) {
//         setLoading(false)
//         setError(data.error || 'Login failed')
//         return
//       }

//       // On success, show success modal
//       setLoading(false)
//       setError(null)
//       setShowModal(true) // Show the modal on success

//       // Clear form data after successful login
//       setFormData({
//         username: '',
//         email: '',
//         password: '',
//       })

//       // Close the modal and redirect after 2 seconds
//       setTimeout(() => {
//         setShowModal(false)
//         navigate('/') // Redirect to homepage
//       }, 2000) // Adjust time if necessary
//     } catch (error) {
//       setLoading(false)
//       setError(error.message)
//     }
//   }

//   return (
//     <div className="p-3 max-w-lg mx-auto">
//       <h1 className="text-3xl text-center font-semibold my-7">Login</h1>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//         <input
//           type="text"
//           placeholder="Username"
//           className="border p-3 rounded-lg"
//           id="username"
//           value={formData.username}
//           onChange={handleChange}
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           className="border p-3 rounded-lg"
//           id="email"
//           value={formData.email}
//           onChange={handleChange}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           className="border p-3 rounded-lg"
//           id="password"
//           value={formData.password}
//           onChange={handleChange}
//         />
//         <button
//           disabled={loading}
//           className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
//         >
//           {loading ? 'Loading...' : 'Login'}
//         </button>
//       </form>
//       <div className="flex gap-2 mt-5">
//         <p>Don&apos;t have an account?</p>
//         <Link to="/register">
//           <span className="text-blue-700">Sign Up</span>
//         </Link>
//       </div>
//       {error && <p className="text-red-500 mt-5">{error}</p>}

//       {/* Render Success Modal if showModal is true */}
//       {showModal && (
//         <SuccessModal
//           message="Login successful! Redirecting..."
//           onClose={() => setShowModal(false)}
//         />
//       )}
//     </div>
//   )
// }

import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import AuthContext from '../../context/AuthContext'
import SuccessModal from '../../components/SuccessModal'

export default function Login() {
  //if user is already authenticated why to login again man!!
  const { authUser } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (authUser) {
      navigate('/') // Redirect to login page if no authenticated user
    }
  }, [authUser, navigate]) // Re-run the effect when authUser changes

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { setAuthUser } = useContext(AuthContext) // Get setAuthUser from context
  const [showModal, setShowModal] = useState(false) // State to control modal visibility

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()

      if (!res.ok || data.error) {
        setLoading(false)
        setError(data.error || 'Login failed')
        return
      }
      // console.log(data)
      // console.log(data.user)

      setAuthUser(data) // Update authUser in context
      setLoading(false)
      setError(null)
      setShowModal(true)
      // Clear form data after successful login
      setFormData({
        username: '',
        email: '',
        password: '',
      })
      setTimeout(() => {
        setShowModal(false)
        navigate('/') // Redirect to homepage
      }, 2000) // Adjust time if necessary
    } catch (error) {
      setLoading(false)
      setError(error.message)
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? 'Loading...' : 'Login'}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Don&apos;t have an account?</p>
        <Link to="/register">
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}

      {/* Render Success Modal if showModal is true */}
      {showModal && (
        <SuccessModal
          message="Login successful! Redirecting..."
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}
