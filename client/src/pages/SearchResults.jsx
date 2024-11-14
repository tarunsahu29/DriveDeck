import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function SearchResults() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(false)
  const { search } = useLocation() // Get the query parameters from the URL

  const queryParams = new URLSearchParams(search)
  const keyword = queryParams.get('keyword') // Extract the search keyword

  useEffect(() => {
    // Reset the state when the keyword changes to trigger a fresh search
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
      <h2 className="text-xl font-bold">Search Results</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {cars.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cars.map((car) => (
                <div
                  key={car._id}
                  className="bg-white shadow-lg rounded-lg p-4"
                >
                  {car.images && car.images[0] && (
                    <img
                      src={car.images[0]?.url}
                      alt={car.title}
                      className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                  )}
                  <h3 className="text-lg font-semibold">{car.title}</h3>
                  <p>{car.description}</p>
                  <p className="text-sm text-gray-600">
                    Tags: {car.tags.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No cars found matching your search.</p>
          )}
        </div>
      )}
    </div>
  )
}
