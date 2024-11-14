// import { useContext, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import AuthContext from '../../context/AuthContext'

// export default function HomePage() {
//   const { authUser } = useContext(AuthContext)
//   const navigate = useNavigate()

//   useEffect(() => {
//     if (!authUser) {
//       navigate('/login') // Redirect to login page if no authenticated user
//     }
//   }, [authUser, navigate])

//   return (
//     <div
//       className="relative min-h-screen bg-cover bg-center bg-no-repeat"
//       style={{ backgroundImage: 'url(background-image.jpg)' }}
//     >
//       {/* Semi-transparent overlay */}
//       <div className="absolute inset-0 bg-black opacity-50"></div>

//       {/* Content Section */}
//       <div className="relative z-10 flex flex-col justify-center items-center text-white p-6 text-center">
//         <h1 className="text-4xl font-bold mb-4 drop-shadow-md">
//           Welcome to the Home Page
//         </h1>
//         <p className="text-lg mb-6 drop-shadow-md">
//           Explore and create amazing content on our platform.
//         </p>

//         <button
//           className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none drop-shadow-lg"
//           onClick={() => navigate('/create-product')}
//         >
//           Create Product
//         </button>
//       </div>
//     </div>
//   )
// }

//WORKING CODE

// import { useContext, useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import AuthContext from '../../context/AuthContext'

// export default function HomePage() {
//   const { authUser } = useContext(AuthContext)
//   const navigate = useNavigate()

//   const [cars, setCars] = useState([]) // State to store the user's cars
//   const [loading, setLoading] = useState(true) // State to manage loading state

//   // Redirect to login if no authenticated user
//   useEffect(() => {
//     if (!authUser) {
//       navigate('/login') // Redirect to login page if no authenticated user
//     } else {
//       // Fetch cars if the user is authenticated
//       fetchCars()
//     }
//   }, [authUser, navigate])

//   // Function to fetch cars from the backend using fetch
//   const fetchCars = async () => {
//     try {
//       const response = await fetch('/api/user/cars', {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${authUser.token}`, // Include token in request headers
//         },
//       })

//       if (response.ok) {
//         const data = await response.json() // Parse the response JSON data
//         setCars(data) // Update state with the fetched cars
//       } else {
//         console.error('Error fetching cars:', response.statusText)
//       }
//     } catch (error) {
//       console.error('Error fetching cars:', error)
//     } finally {
//       setLoading(false) // Stop loading even if there's an error
//     }
//   }

//   return (
//     <div
//       className="relative min-h-screen bg-cover bg-center bg-no-repeat"
//       style={{ backgroundImage: 'url(background-car.jpeg)' }}
//     >
//       {/* Semi-transparent overlay */}
//       <div className="absolute inset-0 bg-black opacity-50"></div>

//       {/* Content Section */}
//       <div className="relative z-10 flex flex-col justify-center items-center text-white p-6 text-center">
//         <h1 className="text-4xl font-bold mb-4 drop-shadow-md">
//           Welcome to the Home Page
//         </h1>
//         <p className="text-lg mb-6 drop-shadow-md">
//           Explore and create amazing content on our platform.
//         </p>

//         <button
//           className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none drop-shadow-lg"
//           onClick={() => navigate('/create-product')}
//         >
//           Create Product
//         </button>

//         {/* Display User's Cars */}
//         {loading ? (
//           <div className="text-white mt-8">Loading your cars...</div>
//         ) : (
//           <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//             {cars.length > 0 ? (
//               cars.map((car) => (
//                 <div
//                   key={car._id}
//                   className="bg-white bg-opacity-70 p-4 rounded-lg shadow-lg text-center"
//                 >
//                   <img
//                     src={car.images[0]?.url} // Access the 'url' property of the first image in the images array
//                     alt={car.title}
//                     className="w-full h-48 object-cover rounded-md mb-4"
//                   />
//                   <h2 className="text-xl font-bold text-gray-800">
//                     {car.title}
//                   </h2>
//                   <p className="text-gray-600">{car.description}</p>
//                 </div>
//               ))
//             ) : (
//               <div className="text-white">No cars created yet.</div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

//WORKING CODE FINAL
// import { useContext, useEffect, useState } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// import AuthContext from '../../context/AuthContext'

// export default function HomePage() {
//   const { authUser } = useContext(AuthContext)
//   const navigate = useNavigate()

//   const [cars, setCars] = useState([]) // State to store the user's cars
//   const [loading, setLoading] = useState(true) // State to manage loading state

//   // Redirect to login if no authenticated user
//   useEffect(() => {
//     if (!authUser) {
//       navigate('/login') // Redirect to login page if no authenticated user
//     } else {
//       fetchCars()
//     }
//   }, [authUser, navigate])

//   // Function to fetch cars from the backend using fetch
//   const fetchCars = async () => {
//     try {
//       const response = await fetch('/api/user/cars', {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${authUser.token}`, // Include token in request headers
//         },
//       })

//       if (response.ok) {
//         const data = await response.json() // Parse the response JSON data
//         setCars(data) // Update state with the fetched cars
//       } else {
//         console.error('Error fetching cars:', response.statusText)
//       }
//     } catch (error) {
//       console.error('Error fetching cars:', error)
//     } finally {
//       setLoading(false) // Stop loading even if there's an error
//     }
//   }

//   return (
//     <div
//     // className="p-28 px-3 max-w-6xl mx-auto"
//     // className="relative min-h-screen bg-cover bg-center bg-no-repeat"
//     // style={{ backgroundImage: 'url(background-car.jpeg)' }}
//     >
//       {/* <div className="absolute inset-0 bg-black opacity-50"></div> */}

//       <div className="flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto">
//         <h1 className="text-slate-700 font-bold text-3xl lg:text-5xl mb-5">
//           Manage your <span className="text-slate-500">car collection</span>
//           <br />
//           with ease and style
//         </h1>
//         <div className="text-gray-400 text-xs sm:text-sm">
//           Your personal space for managing and tracking your car collection.
//           <br />
//           View, update, and organize all your vehicles in one place.
//         </div>

//         <Link
//           to={'/'}
//           className="text-xs sm:text-sm text-blue-800 font-bold hover:underline"
//         >
//           Let&apos;s get started...
//         </Link>
//       </div>

//       <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
//         {/* <h1 className="text-4xl font-bold mb-4 drop-shadow-md">
//           Welcome to the Home Page
//         </h1> */}
//         {/* <p className="text-lg mb-6 drop-shadow-md">
//           Explore and create amazing content on our platform.
//         </p> */}

//         <button
//           onClick={() => navigate('/create-product')}
//           className="px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none drop-shadow-lg"
//         >
//           Create Product
//         </button>

//         {loading ? (
//           <div>Loading cars...</div>
//         ) : (
//           <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {cars.map((car) => (
//               <div
//                 key={car.id}
//                 className="relative"
//                 onClick={() => navigate(`/car/${car.id}`)} // Navigate to ProductDetailPage
//               >
//                 <img
//                   src={car.images[0]?.url}
//                   alt={car.title}
//                   className="w-full h-48 object-cover rounded-md mb-4"
//                 />
//                 <h2 className="text-xl font-bold">{car.title}</h2>
//                 <p className="text-gray-600">{car.description}</p>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// HomePage.jsx
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
                className="relative cursor-pointer"
                onClick={() => navigate(`/car/${car._id}`)}
              >
                <img
                  src={car.images[0]?.url}
                  alt={car.title}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
                <h2 className="text-xl font-bold">{car.title}</h2>
                <p className="text-gray-600">{car.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
