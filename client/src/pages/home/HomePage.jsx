import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'

export default function HomePage() {
  const { authUser, setAuthUser } = useContext(AuthContext)
  const navigate = useNavigate()
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authUser) {
      navigate('/login')
    } else {
      fetchCars()
    }
  }, [authUser, navigate])

  const fetchCars = async () => {
    try {
      const response = await fetch('/api/user/cars', {
        headers: { Authorization: `Bearer ${authUser.token}` },
      })
      if (response.ok) {
        const data = await response.json()
        setCars(data)
      } else {
        console.error('Error fetching cars:', response.statusText)
      }
    } catch (error) {
      console.error('Error fetching cars:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include', // Ensure cookies are sent
      })
      if (response.ok) {
        // Clear user data from context and redirect to login page
        setAuthUser(null) // Clear the authUser context
        navigate('/login') // Redirect to login page
      } else {
        console.error('Error logging out:', response.statusText)
      }
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
      <h1 className="text-slate-700 font-bold text-3xl lg:text-5xl mb-5">
        Manage your <span className="text-slate-500">car collection</span>
        <br />
        with ease and style
      </h1>
      <div className="text-gray-400 text-xs sm:text-sm">
        Your personal space for managing and tracking your car collection.
        <br />
        View, update, and organize all your vehicles in one place.
      </div>

      {/* Logout Button */}
      {authUser && (
        <button
          onClick={handleLogout}
          className="px-6 py-2 bg-slate-700 text-white rounded-md hover:opacity-95 focus:outline-none drop-shadow-lg self-start"
        >
          Logout
        </button>
      )}

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {cars.length === 0 && (
          <p className="text-center text-xl text-gray-600">
            It looks like you don&apos;t have any cars yet. Create one and start
            building your collection!
          </p>
        )}

        <button
          onClick={() => navigate('/create-product')}
          className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none drop-shadow-lg"
        >
          Create Product
        </button>

        {loading ? (
          <div>Loading cars...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars.map((car) => (
              <div
                key={car._id}
                className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full cursor-pointer"
                onClick={() => navigate(`/car/${car._id}`)}
              >
                <img
                  src={car.images[0]?.url}
                  alt={car.title}
                  className="h-[220px] w-full object-cover hover:scale-105 cursor-pointer transition-transform duration-300"
                />
                <div className="p-3 flex flex-col gap-2">
                  <h2 className="text-lg font-semibold text-slate-700">
                    {car.title}
                  </h2>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {car.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {car.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-slate-500 text-white text-xs px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
