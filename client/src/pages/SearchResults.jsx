import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function SearchResults() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(false)
  const { search } = useLocation() // Get the query parameters from the URL
  const navigate = useNavigate()

  const queryParams = new URLSearchParams(search)
  const keyword = queryParams.get('keyword') // Extract the search keyword

  useEffect(() => {
    const fetchSearchResults = async () => {
      setCars([]) // Clear previous results before fetching new ones
      if (keyword) {
        setLoading(true)
        try {
          const response = await fetch(`/api/user/search?keyword=${keyword}`)
          if (!response.ok) {
            throw new Error('Failed to fetch search results')
          }
          const data = await response.json()
          setCars(data) // Set the new search results
        } catch (error) {
          console.error('Error fetching search results:', error)
        } finally {
          setLoading(false)
        }
      }
    }

    fetchSearchResults()
  }, [keyword]) // Re-run effect when `keyword` changes

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-6">Search Results</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.length > 0 ? (
            cars.map((car) => (
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
            ))
          ) : (
            <p>No cars found matching your search.</p>
          )}
        </div>
      )}
    </div>
  )
}
