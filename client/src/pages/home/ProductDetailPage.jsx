//CURRENT WORKING CODE - 1
// import { useState, useEffect, useContext } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import AuthContext from '../../context/AuthContext'

// export default function ProductDetailPage() {
//   const { authUser } = useContext(AuthContext)
//   const { id } = useParams()
//   const navigate = useNavigate()

//   const [car, setCar] = useState(null)
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     tags: [],
//   })
//   const [images, setImages] = useState([])
//   const [imageIdsToDelete, setImageIdsToDelete] = useState([])
//   const [loading, setLoading] = useState(false)

//   // Fetch car details on mount
//   useEffect(() => {
//     const fetchCarDetails = async () => {
//       try {
//         const response = await fetch(`/api/user/cars/${id}`)
//         const data = await response.json()
//         console.log(data)

//         if (response.ok) {
//           setCar(data)
//           // Directly set the formData from fetched car data
//           setFormData({
//             title: data.title || '',
//             description: data.description || '',
//             tags: data.tags || [],
//           })
//           setImages(data.images || [])
//         } else {
//           console.error('Car not found')
//         }
//       } catch (error) {
//         console.error('Error fetching car details:', error)
//       }
//     }
//     fetchCarDetails()
//   }, [id])

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }))
//   }

//   const handleTagRemove = (index) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       tags: prevData.tags.filter((_, i) => i !== index),
//     }))
//   }

//   const handleImageDelete = (publicId) => {
//     setImageIdsToDelete((prev) => [...prev, publicId])
//   }

//   const handleSetMainImage = (index) => {
//     const newImages = [...images]
//     const temp = newImages[0]
//     newImages[0] = newImages[index]
//     newImages[index] = temp
//     setImages(newImages)
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!authUser) return

//     const data = new FormData()
//     data.append('title', formData.title)
//     data.append('description', formData.description)
//     formData.tags.forEach((tag) => {
//       data.append('tags[]', tag)
//     })
//     data.append('imageIdsToDelete', JSON.stringify(imageIdsToDelete))

//     // Handle images
//     images.forEach((image) => {
//       data.append('images', image)
//     })

//     try {
//       setLoading(true)
//       const response = await fetch(`/api/user/cars/${id}`, {
//         method: 'PUT',
//         headers: {
//           Authorization: `Bearer ${authUser.token}`,
//         },
//         body: data,
//       })

//       const result = await response.json()
//       if (!response.ok) {
//         throw new Error(result.message || 'Failed to update car')
//       }
//       navigate(`/`)
//     } catch (error) {
//       console.error('Error updating car:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (!car) return <div>Loading...</div>

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
//       <div className="max-w-3xl w-full bg-white rounded-lg shadow-md p-6">
//         <h1 className="text-3xl font-bold text-gray-800 mb-4">
//           Edit Car Details
//         </h1>

//         {/* Form to Edit Car Details */}
//         <form onSubmit={handleSubmit} className="space-y-6">
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
//               className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
//               required
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
//               className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none resize-y"
//               required
//             />
//           </div>

//           {/* Tags */}
//           <div>
//             <label
//               htmlFor="tags"
//               className="block text-gray-600 font-medium mb-2"
//             >
//               Tags
//             </label>
//             <div className="flex flex-wrap gap-2">
//               {formData.tags.map((tag, index) => (
//                 <div
//                   key={index}
//                   className="bg-gray-200 text-gray-800 px-4 py-1 rounded-full"
//                 >
//                   {tag}
//                   <button
//                     type="button"
//                     onClick={() => handleTagRemove(index)}
//                     className="ml-2 text-red-500"
//                   >
//                     &times;
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Images */}
//           <div>
//             <label className="block text-gray-600 font-medium mb-2">
//               Images
//             </label>
//             <div className="grid grid-cols-3 gap-4">
//               {images.map((image, index) => (
//                 <div key={index} className="relative">
//                   <img
//                     src={image.url}
//                     alt={`Car Image ${index + 1}`}
//                     className="w-full h-auto rounded-md"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => handleSetMainImage(index)}
//                     className="absolute top-2 right-2 text-white bg-blue-500 rounded-full p-1"
//                   >
//                     ★
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => handleImageDelete(image.public_id)}
//                     className="absolute top-2 right-10 text-white bg-red-500 rounded-full p-1"
//                   >
//                     ✖
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
//           >
//             {loading ? 'Loading...' : 'Save changes'}
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }

//CURRENT WORKING CODE - 2
// import { useState, useEffect, useContext } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import AuthContext from '../../context/AuthContext'

// export default function ProductDetailPage() {
//   const { authUser } = useContext(AuthContext)
//   const { id } = useParams()
//   const navigate = useNavigate()

//   const [car, setCar] = useState(null)
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     tags: [],
//   })
//   const [images, setImages] = useState([])
//   const [imageIdsToDelete, setImageIdsToDelete] = useState([])
//   const [newTag, setNewTag] = useState('')
//   const [newImages, setNewImages] = useState([])
//   const [loading, setLoading] = useState(false)

//   // Fetch car details on mount
//   useEffect(() => {
//     const fetchCarDetails = async () => {
//       try {
//         const response = await fetch(`/api/user/cars/${id}`)
//         const data = await response.json()
//         if (response.ok) {
//           setCar(data)
//           setFormData({
//             title: data.title || '',
//             description: data.description || '',
//             tags: data.tags || [],
//           })
//           setImages(data.images || [])
//         } else {
//           console.error('Car not found')
//         }
//       } catch (error) {
//         console.error('Error fetching car details:', error)
//       }
//     }
//     fetchCarDetails()
//   }, [id])

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }))
//   }

//   const handleTagRemove = (index) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       tags: prevData.tags.filter((_, i) => i !== index),
//     }))
//   }

//   const handleAddTag = (e) => {
//     e.preventDefault()
//     if (newTag.trim()) {
//       setFormData((prevData) => ({
//         ...prevData,
//         tags: [...prevData.tags, newTag],
//       }))
//       setNewTag('') // Reset tag input
//     }
//   }

//   const handleImageDelete = (publicId) => {
//     setImageIdsToDelete((prev) => [...prev, publicId])
//   }

//   const handleSetMainImage = (index) => {
//     const newImages = [...images]
//     const temp = newImages[0]
//     newImages[0] = newImages[index]
//     newImages[index] = temp
//     setImages(newImages)
//   }

//   const handleImageUpload = (e) => {
//     setNewImages((prev) => [...prev, ...e.target.files])
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!authUser) return

//     const data = new FormData()
//     data.append('title', formData.title)
//     data.append('description', formData.description)
//     formData.tags.forEach((tag) => {
//       data.append('tags[]', tag)
//     })
//     data.append('imageIdsToDelete', JSON.stringify(imageIdsToDelete))

//     // Handle images (both existing and new)
//     images.forEach((image) => {
//       data.append('images', image)
//     })
//     newImages.forEach((image) => {
//       data.append('images', image)
//     })

//     try {
//       setLoading(true)
//       const response = await fetch(`/api/user/cars/${id}`, {
//         method: 'PUT',
//         headers: {
//           Authorization: `Bearer ${authUser.token}`,
//         },
//         body: data,
//       })

//       const result = await response.json()
//       if (!response.ok) {
//         throw new Error(result.message || 'Failed to update car')
//       }
//       setLoading(false)
//       navigate(`/`)
//     } catch (error) {
//       console.error('Error updating car:', error)
//     }
//   }

//   if (!car) return <div>Loading...</div>

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
//       <div className="max-w-3xl w-full bg-white rounded-lg shadow-md p-6">
//         <h1 className="text-3xl font-bold text-gray-800 mb-4">
//           Edit Car Details
//         </h1>

//         {/* Form to Edit Car Details */}
//         <form onSubmit={handleSubmit} className="space-y-6">
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
//               className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
//               required
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
//               className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none resize-y"
//               required
//             />
//           </div>

//           {/* Tags */}
//           <div>
//             <label
//               htmlFor="tags"
//               className="block text-gray-600 font-medium mb-2"
//             >
//               Tags
//             </label>
//             <div className="flex flex-wrap gap-2">
//               {formData.tags.map((tag, index) => (
//                 <div
//                   key={index}
//                   className="bg-gray-200 text-gray-800 px-4 py-1 rounded-full"
//                 >
//                   {tag}
//                   <button
//                     type="button"
//                     onClick={() => handleTagRemove(index)}
//                     className="ml-2 text-red-500"
//                   >
//                     &times;
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <div className="flex mt-2">
//               <input
//                 type="text"
//                 value={newTag}
//                 onChange={(e) => setNewTag(e.target.value)}
//                 className="p-3 border border-gray-300 rounded-md w-full"
//                 placeholder="Add a new tag"
//               />
//               <button
//                 type="button"
//                 onClick={handleAddTag}
//                 className="ml-2 text-white bg-blue-500 p-3 rounded-md"
//               >
//                 Add Tag
//               </button>
//             </div>
//           </div>

//           {/* Images */}
//           <div>
//             <label className="block text-gray-600 font-medium mb-2">
//               Images
//             </label>
//             <div className="grid grid-cols-3 gap-4">
//               {images.map((image, index) => (
//                 <div key={index} className="relative">
//                   <img
//                     src={image.url}
//                     alt={`Car Image ${index + 1}`}
//                     className="w-full h-auto rounded-md"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => handleSetMainImage(index)}
//                     className="absolute top-2 right-2 text-white bg-blue-500 rounded-full p-1"
//                   >
//                     ★
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => handleImageDelete(image.public_id)}
//                     className="absolute top-2 right-10 text-white bg-red-500 rounded-full p-1"
//                   >
//                     ✖
//                   </button>
//                 </div>
//               ))}
//             </div>

//             <div>
//               <input
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 onChange={handleImageUpload}
//                 className="mt-4"
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
//           >
//             {loading ? 'Loading...' : 'Save changes'}
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }

//FINAL CODE

// import { useState, useEffect, useContext } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import AuthContext from '../../context/AuthContext'

// export default function ProductDetailPage() {
//   const { authUser } = useContext(AuthContext)
//   const { id } = useParams()
//   const navigate = useNavigate()

//   const [car, setCar] = useState(null)
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     tags: [],
//   })
//   const [images, setImages] = useState([])
//   const [imageIdsToDelete, setImageIdsToDelete] = useState([])
//   const [newTag, setNewTag] = useState('')
//   const [newImages, setNewImages] = useState([])
//   const [loading, setLoading] = useState(false)

//   // Fetch car details on mount
//   useEffect(() => {
//     const fetchCarDetails = async () => {
//       try {
//         const response = await fetch(`/api/user/cars/${id}`)
//         const data = await response.json()
//         if (response.ok) {
//           setCar(data)
//           setFormData({
//             title: data.title || '',
//             description: data.description || '',
//             tags: data.tags || [],
//           })
//           setImages(data.images || [])
//         } else {
//           console.error('Car not found')
//         }
//       } catch (error) {
//         console.error('Error fetching car details:', error)
//       }
//     }
//     fetchCarDetails()
//   }, [id])

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }))
//   }

//   const handleTagRemove = (index) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       tags: prevData.tags.filter((_, i) => i !== index),
//     }))
//   }

//   const handleAddTag = (e) => {
//     e.preventDefault()
//     const tag = newTag.trim()
//     if (tag && !formData.tags.includes(tag)) {
//       setFormData((prevData) => ({
//         ...prevData,
//         tags: [...prevData.tags, tag],
//       }))
//       setNewTag('') // Reset tag input
//     }
//   }

//   const handleImageDelete = (publicId) => {
//     // Remove the image from the state (UI)
//     setImages((prevImages) =>
//       prevImages.filter((image) => image.public_id !== publicId),
//     )
//     setImageIdsToDelete((prev) => [...prev, publicId])
//   }

//   const handleSetMainImage = (index) => {
//     const newImages = [...images]
//     const temp = newImages[0]
//     newImages[0] = newImages[index]
//     newImages[index] = temp
//     setImages(newImages)
//   }

//   const handleImageUpload = (e) => {
//     setNewImages((prev) => [...prev, ...e.target.files])
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!authUser) return

//     const data = new FormData()
//     data.append('title', formData.title)
//     data.append('description', formData.description)
//     formData.tags.forEach((tag) => {
//       data.append('tags[]', tag)
//     })

//     // Handle image deletions (delete only if there are images to delete)
//     if (imageIdsToDelete.length > 0) {
//       data.append('imageIdsToDelete', JSON.stringify(imageIdsToDelete))
//     }

//     // Handle images (both existing and new)
//     images.forEach((image) => {
//       data.append('images', image)
//     })
//     newImages.forEach((image) => {
//       data.append('images', image)
//     })

//     try {
//       setLoading(true)
//       const response = await fetch(`/api/user/cars/${id}`, {
//         method: 'PUT',
//         headers: {
//           Authorization: `Bearer ${authUser.token}`,
//         },
//         body: data,
//       })

//       const result = await response.json()
//       if (!response.ok) {
//         throw new Error(result.message || 'Failed to update car')
//       }
//       setLoading(false)
//       navigate(`/`)
//     } catch (error) {
//       console.error('Error updating car:', error)
//     }
//   }

//   if (!car) return <div>Loading...</div>

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
//       <div className="max-w-3xl w-full bg-white rounded-lg shadow-md p-6">
//         <h1 className="text-3xl font-bold text-gray-800 mb-4">
//           Edit Car Details
//         </h1>

//         {/* Form to Edit Car Details */}
//         <form onSubmit={handleSubmit} className="space-y-6">
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
//               className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
//               required
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
//               className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none resize-y"
//               required
//             />
//           </div>

//           {/* Tags */}
//           <div>
//             <label
//               htmlFor="tags"
//               className="block text-gray-600 font-medium mb-2"
//             >
//               Tags
//             </label>
//             <div className="flex flex-wrap gap-2">
//               {formData.tags.map((tag, index) => (
//                 <div
//                   key={index}
//                   className="bg-gray-200 text-gray-800 px-4 py-1 rounded-full"
//                 >
//                   {tag}
//                   <button
//                     type="button"
//                     onClick={() => handleTagRemove(index)}
//                     className="ml-2 text-red-500"
//                   >
//                     &times;
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <div className="flex mt-2">
//               <input
//                 type="text"
//                 value={newTag}
//                 onChange={(e) => setNewTag(e.target.value)}
//                 className="p-3 border border-gray-300 rounded-md w-full"
//                 placeholder="Add a new tag"
//               />
//               <button
//                 type="button"
//                 onClick={handleAddTag}
//                 className="ml-2 text-white bg-blue-500 p-3 rounded-md"
//               >
//                 Add Tag
//               </button>
//             </div>
//           </div>

//           {/* Images */}
//           <div>
//             <label className="block text-gray-600 font-medium mb-2">
//               Images
//             </label>
//             <div className="grid grid-cols-3 gap-4">
//               {images.map((image, index) => (
//                 <div key={index} className="relative">
//                   <img
//                     src={image.url}
//                     alt={`Car Image ${index + 1}`}
//                     className="w-full h-auto rounded-md"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => handleSetMainImage(index)}
//                     className="absolute top-2 right-2 text-white bg-blue-500 rounded-full p-1"
//                   >
//                     ★
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => handleImageDelete(image.public_id)}
//                     className="absolute top-2 right-10 text-white bg-red-500 rounded-full p-1"
//                   >
//                     ✖
//                   </button>
//                 </div>
//               ))}
//             </div>

//             <div>
//               <input
//                 type="file"
//                 accept="image/*"
//                 multiple
//                 onChange={handleImageUpload}
//                 className="mt-4"
//               />
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md"
//           >
//             {loading ? 'Saving...' : 'Save Changes'}
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }

// import { useState, useEffect, useContext } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import AuthContext from '../../context/AuthContext'

// export default function ProductDetailPage() {
//   const { authUser } = useContext(AuthContext)
//   const { id } = useParams()
//   const navigate = useNavigate()

//   const [car, setCar] = useState(null)
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     tags: [],
//   })
//   const [images, setImages] = useState([])
//   const [imageIdsToDelete, setImageIdsToDelete] = useState([])
//   const [newTag, setNewTag] = useState('')
//   const [newImages, setNewImages] = useState([])
//   const [loading, setLoading] = useState(false)

//   // Fetch car details on mount
//   useEffect(() => {
//     const fetchCarDetails = async () => {
//       try {
//         const response = await fetch(`/api/user/cars/${id}`)
//         const data = await response.json()
//         if (response.ok) {
//           setCar(data)
//           setFormData({
//             title: data.title || '',
//             description: data.description || '',
//             tags: data.tags || [],
//           })
//           setImages(data.images || [])
//         } else {
//           console.error('Car not found')
//         }
//       } catch (error) {
//         console.error('Error fetching car details:', error)
//       }
//     }
//     fetchCarDetails()
//   }, [id])

//   const handleChange = (e) => {
//     const { name, value } = e.target
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }))
//   }

//   const handleTagRemove = (index) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       tags: prevData.tags.filter((_, i) => i !== index),
//     }))
//   }

//   const handleAddTag = (e) => {
//     e.preventDefault()
//     const tag = newTag.trim()
//     if (tag && !formData.tags.includes(tag)) {
//       setFormData((prevData) => ({
//         ...prevData,
//         tags: [...prevData.tags, tag],
//       }))
//       setNewTag('') // Reset tag input
//     }
//   }

//   const handleImageDelete = (publicId) => {
//     // Remove the image from the state (UI)
//     setImages((prevImages) =>
//       prevImages.filter((image) => image.public_id !== publicId),
//     )
//     setImageIdsToDelete((prev) => [...prev, publicId])
//   }

//   const handleNewImageDelete = (fileName) => {
//     // Filter out the image with the specified file name
//     setNewImages((prevNewImages) =>
//       prevNewImages.filter((image) => image.file.name !== fileName),
//     )
//   }

//   const handleImageUpload = (e) => {
//     const files = e.target.files
//     const newImagesArray = []

//     // Create preview URLs for each selected file
//     for (let i = 0; i < files.length; i++) {
//       newImagesArray.push({
//         file: files[i], // Store the file object for later upload
//         preview: URL.createObjectURL(files[i]), // Generate a local URL for preview
//       })
//     }

//     setNewImages((prev) => [...prev, ...newImagesArray])
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()

//     if (!authUser) return

//     const data = new FormData()
//     data.append('title', formData.title)
//     data.append('description', formData.description)
//     formData.tags.forEach((tag) => {
//       data.append('tags[]', tag)
//     })

//     // Handle image deletions (delete only if there are images to delete)
//     if (imageIdsToDelete.length > 0) {
//       data.append('imageIdsToDelete', JSON.stringify(imageIdsToDelete))
//     }

//     // Handle images (both existing and new)
//     images.forEach((image) => {
//       data.append('images', image)
//     })
//     newImages.forEach((image) => {
//       data.append('images', image.file)
//     })

//     try {
//       setLoading(true)
//       const response = await fetch(`/api/user/cars/${id}`, {
//         method: 'PUT',
//         headers: {
//           Authorization: `Bearer ${authUser.token}`,
//         },
//         body: data,
//       })

//       const result = await response.json()
//       if (!response.ok) {
//         throw new Error(result.message || 'Failed to update car')
//       }
//       setLoading(false)
//       navigate(`/`)
//     } catch (error) {
//       console.error('Error updating car:', error)
//     }
//   }

//   if (!car) return <div>Loading...</div>

//   return (
//     <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
//       <div className="max-w-3xl w-full bg-white rounded-lg shadow-md p-6">
//         <h1 className="text-3xl font-bold text-gray-800 mb-4">
//           Edit Car Details
//         </h1>

//         {/* Form to Edit Car Details */}
//         <form onSubmit={handleSubmit} className="space-y-6">
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
//               className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
//               required
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
//               className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none resize-y"
//               required
//             />
//           </div>

//           {/* Tags */}
//           <div>
//             <label
//               htmlFor="tags"
//               className="block text-gray-600 font-medium mb-2"
//             >
//               Tags
//             </label>
//             <div className="flex flex-wrap gap-2">
//               {formData.tags.map((tag, index) => (
//                 <div
//                   key={index}
//                   className="bg-gray-200 text-gray-800 px-4 py-1 rounded-full"
//                 >
//                   {tag}
//                   <button
//                     type="button"
//                     onClick={() => handleTagRemove(index)}
//                     className="ml-2 text-red-500"
//                   >
//                     &times;
//                   </button>
//                 </div>
//               ))}
//             </div>
//             <div className="flex mt-2">
//               <input
//                 type="text"
//                 value={newTag}
//                 onChange={(e) => setNewTag(e.target.value)}
//                 className="p-3 border border-gray-300 rounded-md w-full"
//                 placeholder="Add a new tag"
//               />
//               <button
//                 type="button"
//                 onClick={handleAddTag}
//                 className="ml-2 text-white bg-blue-500 p-3 rounded-md"
//               >
//                 Add Tag
//               </button>
//             </div>
//           </div>

//           {/* Images */}
//           <div>
//             <label className="block text-gray-600 font-medium mb-2">
//               Images
//             </label>
//             <div className="grid grid-cols-3 gap-4">
//               {/* Display existing images */}
//               {images.map((image, index) => (
//                 <div key={index} className="relative">
//                   <img
//                     src={image.url}
//                     alt={`Car Image ${index + 1}`}
//                     className="w-full h-auto rounded-md"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => handleImageDelete(image.public_id)}
//                     className="cursor-pointer absolute top-1 right-1 text-white bg-black bg-opacity-40 rounded-2xl p-2"
//                     // className="absolute top-2 right-10 text-white bg-red-500 rounded-full p-1"
//                   >
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       strokeWidth={1.5}
//                       stroke="currentColor"
//                       className="size-6"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
//                       />
//                     </svg>
//                   </button>
//                 </div>
//               ))}

//               {/* Display previews for newly selected images */}
//               {newImages.map((newImage, index) => (
//                 <div key={index} className="relative">
//                   <img
//                     src={newImage.preview}
//                     alt={`Preview ${index + 1}`}
//                     className="w-full h-auto rounded-md"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => handleNewImageDelete(newImage.file.name)} // You may need a different identifier for deletion
//                     className="absolute top-2 right-2 text-white bg-red-500 rounded-full p-1"
//                   >
//                     ✖
//                   </button>
//                 </div>
//               ))}
//             </div>

//             <input
//               type="file"
//               accept="image/*"
//               multiple
//               onChange={handleImageUpload}
//               className="mt-2"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full p-3 bg-blue-600 text-white font-semibold rounded-md"
//           >
//             {loading ? 'Saving...' : 'Save Changes'}
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }

// final final code
import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AuthContext from '../../context/AuthContext'

export default function ProductDetailPage() {
  const { authUser } = useContext(AuthContext)
  const { id } = useParams()
  const navigate = useNavigate()

  const [car, setCar] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: [],
  })
  const [images, setImages] = useState([])
  const [imageIdsToDelete, setImageIdsToDelete] = useState([])
  const [newTag, setNewTag] = useState('')
  const [newImages, setNewImages] = useState([])
  const [loading, setLoading] = useState(false)

  // Fetch car details on mount
  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`/api/user/cars/${id}`)
        const data = await response.json()
        if (response.ok) {
          setCar(data)
          setFormData({
            title: data.title || '',
            description: data.description || '',
            tags: data.tags || [],
          })
          setImages(data.images || [])
        } else {
          console.error('Car not found')
        }
      } catch (error) {
        console.error('Error fetching car details:', error)
      }
    }
    fetchCarDetails()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleTagRemove = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      tags: prevData.tags.filter((_, i) => i !== index),
    }))
  }

  const handleAddTag = (e) => {
    e.preventDefault()
    const tag = newTag.trim()
    if (tag && !formData.tags.includes(tag)) {
      setFormData((prevData) => ({
        ...prevData,
        tags: [...prevData.tags, tag],
      }))
      setNewTag('') // Reset tag input
    }
  }

  const handleImageDelete = (publicId) => {
    // Remove the image from the state (UI)
    setImages((prevImages) =>
      prevImages.filter((image) => image.public_id !== publicId),
    )
    setImageIdsToDelete((prev) => [...prev, publicId])
  }

  const handleNewImageDelete = (fileName) => {
    // Filter out the image with the specified file name
    setNewImages((prevNewImages) =>
      prevNewImages.filter((image) => image.file.name !== fileName),
    )
  }

  const handleImageUpload = (e) => {
    const files = e.target.files
    const newImagesArray = []

    // Create preview URLs for each selected file
    for (let i = 0; i < files.length; i++) {
      newImagesArray.push({
        file: files[i], // Store the file object for later upload
        preview: URL.createObjectURL(files[i]), // Generate a local URL for preview
      })
    }

    setNewImages((prev) => [...prev, ...newImagesArray])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!authUser) return

    const data = new FormData()
    data.append('title', formData.title)
    data.append('description', formData.description)
    formData.tags.forEach((tag) => {
      data.append('tags[]', tag)
    })

    // Handle image deletions (delete only if there are images to delete)
    if (imageIdsToDelete.length > 0) {
      data.append('imageIdsToDelete', JSON.stringify(imageIdsToDelete))
    }

    // Handle images (both existing and new)
    images.forEach((image) => {
      data.append('images', image)
    })
    newImages.forEach((image) => {
      data.append('images', image.file)
    })

    try {
      setLoading(true)
      const response = await fetch(`/api/user/cars/${id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${authUser.token}`,
        },
        body: data,
      })

      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.message || 'Failed to update car')
      }
      setLoading(false)
      navigate(`/`)
    } catch (error) {
      console.error('Error updating car:', error)
    }
  }

  // Handle Delete
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this car?')) {
      try {
        setLoading(true)
        const response = await fetch(`/api/user/cars/${id}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${authUser.token}`,
          },
        })
        if (response.ok) {
          navigate('/')
        } else {
          throw new Error('Failed to delete the car')
        }
      } catch (error) {
        console.error('Error deleting car:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  if (!car) return <div>Loading...</div>

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <div className="max-w-3xl w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Edit Car Details
        </h1>

        {/* Form to Edit Car Details */}
        <form onSubmit={handleSubmit} className="space-y-6">
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
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
              required
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
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none resize-y"
              required
            />
          </div>

          {/* Tags */}
          <div>
            <label
              htmlFor="tags"
              className="block text-gray-600 font-medium mb-2"
            >
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {formData.tags.map((tag, index) => (
                <div
                  key={index}
                  className="bg-gray-200 text-gray-800 px-4 py-1 rounded-full"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleTagRemove(index)}
                    className="ml-2 text-red-500"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
            <div className="flex mt-2">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                className="p-3 border border-gray-300 rounded-md w-full"
                placeholder="Add a new tag"
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="ml-2 text-white bg-blue-500 p-3 rounded-md"
              >
                Add Tag
              </button>
            </div>
          </div>

          {/* Images */}
          <div>
            <label className="block text-gray-600 font-medium mb-2">
              Images
            </label>
            <div className="grid grid-cols-3 gap-4">
              {/* Display existing images */}
              {images.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image.url}
                    alt={`Car Image ${index + 1}`}
                    className="w-full h-auto rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleImageDelete(image.public_id)}
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
              {/* Display new images */}
              {newImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image.preview}
                    alt={`New Image ${index + 1}`}
                    className="w-full h-auto rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleNewImageDelete(image.file.name)}
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
              <label
                htmlFor="image-upload"
                className="cursor-pointer border-2 border-dashed border-gray-400 w-full h-40 flex justify-center items-center bg-gray-50 text-gray-600 rounded-md"
              >
                <span className="text-lg">Choose Images</span>
              </label>
              <input
                type="file"
                id="image-upload"
                multiple
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white p-3 rounded-md w-full"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Car'}
          </button>

          {/* Delete Button */}
          <button
            type="button"
            onClick={handleDelete}
            className="w-full py-3 bg-red-500 text-white font-semibold rounded-md focus:ring-2 focus:ring-red-500 focus:outline-none"
          >
            {loading ? 'Deleting...' : 'Delete Car'}
          </button>
        </form>
      </div>
    </div>
  )
}
