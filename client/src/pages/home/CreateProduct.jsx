//FINAL CODE

// import { useState, useContext } from 'react'
// import { useNavigate } from 'react-router-dom'
// import AuthContext from '../../context/AuthContext'

// export default function CreateProduct() {
//   const { authUser } = useContext(AuthContext)
//   const navigate = useNavigate()

//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     tags: [],
//   })
//   const [images, setImages] = useState([])
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const [currentTag, setCurrentTag] = useState('') // Temporary tag input

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }))
//   }

//   const handleImageChange = (e) => {
//     setImages([...e.target.files])
//   }

//   const handleTagAdd = () => {
//     const tag = currentTag.trim()
//     if (tag && !formData.tags.includes(tag)) {
//       setFormData((prevData) => ({
//         ...prevData,
//         tags: [...prevData.tags, tag], // Add tag if it's not already in the list
//       }))
//       setCurrentTag('') // Clear the tag input after adding
//     }
//   }

//   const handleTagRemove = (index) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       tags: prevData.tags.filter((_, i) => i !== index),
//     }))
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     if (!authUser) return

//     setIsSubmitting(true)

//     const data = new FormData()
//     data.append('title', formData.title)
//     data.append('description', formData.description)

//     formData.tags.forEach((tag) => {
//       data.append('tags[]', tag)
//     }) // Append each tag individually

//     images.forEach((image) => {
//       data.append('images', image)
//     })

//     try {
//       const response = await fetch('/api/user/cars', {
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${authUser.token}`,
//         },
//         body: data,
//       })

//       const result = await response.json()

//       if (!response.ok) {
//         throw new Error(result.message || 'Failed to create car')
//       }

//       setFormData({ title: '', description: '', tags: [] })
//       setImages([])
//       navigate('/')
//     } catch (error) {
//       console.error('Error creating car:', error)
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <div
//       className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
//       style={{ backgroundImage: 'url(background-image.jpg)' }}
//     >
//       <div className="absolute inset-0 bg-black opacity-50"></div>
//       <div className="relative max-w-lg w-full bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg p-8 mx-4">
//         <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
//           Create a New Product
//         </h2>
//         <form
//           onSubmit={handleSubmit}
//           className="space-y-6"
//           encType="multipart/form-data"
//         >
//           <div>
//             <label
//               htmlFor="title"
//               className="block text-gray-600 font-medium mb-2"
//             >
//               Title
//             </label>
//             <input
//               type="text"
//               id="title"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               required
//               className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>

//           <div>
//             <label
//               htmlFor="description"
//               className="block text-gray-600 font-medium mb-2"
//             >
//               Description
//             </label>
//             <textarea
//               id="description"
//               name="description"
//               value={formData.description}
//               onChange={handleChange}
//               required
//               className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none resize-y"
//             />
//           </div>

//           {/* Tags input with add/remove functionality */}
//           <div>
//             <label
//               htmlFor="tags"
//               className="block text-gray-600 font-medium mb-2"
//             >
//               Tags
//             </label>
//             <div className="flex items-center space-x-2">
//               <input
//                 type="text"
//                 id="tags"
//                 value={currentTag}
//                 onChange={(e) => setCurrentTag(e.target.value)}
//                 onKeyDown={(e) =>
//                   e.key === 'Enter' && (e.preventDefault(), handleTagAdd())
//                 }
//                 className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
//               />
//               <button
//                 type="button"
//                 onClick={handleTagAdd}
//                 className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
//               >
//                 Add
//               </button>
//             </div>
//             <div className="flex flex-wrap gap-2 mt-2">
//               {formData.tags.map((tag, index) => (
//                 <span
//                   key={index}
//                   className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full flex items-center"
//                 >
//                   {tag}
//                   <button
//                     type="button"
//                     onClick={() => handleTagRemove(index)}
//                     className="ml-2 text-red-500 hover:text-red-700"
//                   >
//                     &times;
//                   </button>
//                 </span>
//               ))}
//             </div>
//           </div>

//           <div>
//             <label
//               htmlFor="images"
//               className="block text-gray-600 font-medium mb-2"
//             >
//               Images (max 10)
//             </label>
//             <input
//               type="file"
//               id="images"
//               multiple
//               accept="image/*"
//               onChange={handleImageChange}
//               className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className={`w-full p-3 rounded-md font-semibold text-white transition-colors ${
//               isSubmitting
//                 ? 'bg-gray-400 cursor-not-allowed'
//                 : 'bg-blue-600 hover:bg-blue-700'
//             }`}
//           >
//             {isSubmitting ? 'Submitting...' : 'Create Product'}
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }

import { useState, useContext, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'

export default function CreateProduct() {
  const { authUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: [],
  })
  const [images, setImages] = useState([]) // Stores the selected image files and previews
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentTag, setCurrentTag] = useState('') // Temporary tag input
  const imageInputRef = useRef() // Reference to the image input element

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).map((file) => ({
      file,
      preview: URL.createObjectURL(file), // Create a preview URL for the image
    }))
    setImages((prevImages) => [...prevImages, ...files])
  }

  const handleImageDelete = (fileName) => {
    // Remove the image from the state based on file name
    setImages((prevImages) =>
      prevImages.filter((image) => image.file.name !== fileName),
    )

    // Update the file input to reflect the deletion (by removing the file from the input's list)
    const inputFiles = Array.from(imageInputRef.current.files)
    const newFiles = inputFiles.filter((file) => file.name !== fileName)
    const dataTransfer = new DataTransfer()
    newFiles.forEach((file) => {
      dataTransfer.items.add(file)
    })
    imageInputRef.current.files = dataTransfer.files
  }

  const handleTagAdd = () => {
    const tag = currentTag.trim()
    if (tag && !formData.tags.includes(tag)) {
      setFormData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, tag], // Add tag if it's not already in the list
      }))
      setCurrentTag('') // Clear the tag input after adding
    }
  }

  const handleTagRemove = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!authUser) return

    setIsSubmitting(true)

    const data = new FormData()
    data.append('title', formData.title)
    data.append('description', formData.description)

    formData.tags.forEach((tag) => {
      data.append('tags[]', tag)
    }) // Append each tag individually

    images.forEach((image) => {
      data.append('images', image.file) // Only append the actual file to FormData
    })

    try {
      const response = await fetch('/api/user/cars', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authUser.token}`,
        },
        body: data,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to create car')
      }

      setFormData({ title: '', description: '', tags: [] })
      setImages([]) // Clear images after submitting
      navigate('/')
    } catch (error) {
      console.error('Error creating car:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: 'url(background-image.jpg)' }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative max-w-lg w-full bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg p-8 mx-4">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
          Create a New Product
        </h2>
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          encType="multipart/form-data"
        >
          <div>
            <label
              htmlFor="title"
              className="block text-gray-600 font-medium mb-2"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-gray-600 font-medium mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none resize-y"
            />
          </div>

          {/* Tags input with add/remove functionality */}
          <div>
            <label
              htmlFor="tags"
              className="block text-gray-600 font-medium mb-2"
            >
              Tags
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                id="tags"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyDown={(e) =>
                  e.key === 'Enter' && (e.preventDefault(), handleTagAdd())
                }
                className="flex-1 p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <button
                type="button"
                onClick={handleTagAdd}
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full flex items-center"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleTagRemove(index)}
                    className="ml-2 text-red-500 hover:text-red-700"
                  >
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label
              htmlFor="images"
              className="block text-gray-600 font-medium mb-2"
            >
              Images (max 10)
            </label>
            {/* Custom file input button */}
            <label
              htmlFor="file-upload"
              className="block text-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-md cursor-pointer"
            >
              Choose Files
            </label>
            <input
              type="file"
              id="file-upload"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              ref={imageInputRef}
              className="hidden" // Hide the file input element
            />
          </div>

          {/* Image Previews with Delete option */}
          <div className="flex flex-wrap gap-4 mt-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image.preview}
                  alt={`Preview ${index + 1}`}
                  className="w-24 h-24 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleImageDelete(image.file.name)}
                  className="cursor-pointer absolute top-1 right-1 text-white bg-black bg-opacity-40 rounded-2xl p-2"
                >
                 <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                </button>
              </div>
            ))}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full p-3 rounded-md font-semibold text-white transition-colors ${
              isSubmitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Create Product'}
          </button>
        </form>
      </div>
    </div>
  )
}
