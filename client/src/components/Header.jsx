import { Link, useNavigate } from 'react-router-dom'
import { FaSearch } from 'react-icons/fa'
import { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'

export default function Header() {
  const { authUser } = useContext(AuthContext) // Consume the authUser context
  // console.log(authUser)

  const navigate = useNavigate() // For programmatic navigation
  const [searchKeyword, setSearchKeyword] = useState('') // State to track the search input

  // Handle the search submit
  const handleSearch = async (e) => {
    e.preventDefault() // Prevent the form from reloading the page
    if (searchKeyword.trim()) {
      try {
        // Navigate to the search results page with the search query
        navigate(`/search?keyword=${searchKeyword}`)
        setSearchKeyword('')
      } catch (error) {
        console.error('Error during search:', error)
      }
    }
  }

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">Drive</span>
            <span className="text-slate-700">Deck</span>
          </h1>
        </Link>

        <form
          onSubmit={handleSearch}
          className="bg-slate-100 p-3 rounded-lg flex items-center"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)} // Update keyword on change
          />
          <button type="submit">
            <FaSearch className="text-slate-600" />
          </button>
        </form>

        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline cursor-pointer">
              Home
            </li>
          </Link>
          {authUser ? (
            <li className="text-slate-700">
              Welcome, {authUser.username} {/* Display username if logged in */}
            </li>
          ) : (
            <Link to="/login">
              <li className="sm:inline text-slate-700 hover:underline cursor-pointer">
                Sign In
              </li>
            </Link>
          )}
        </ul>
      </div>
    </header>
  )
}
