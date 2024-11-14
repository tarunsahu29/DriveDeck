/* eslint-disable react/prop-types */
export default function SuccessModal({ message, onClose }) {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
        <h2 className="text-2xl text-green-600 font-semibold mb-4">Success</h2>
        <p className="text-lg">{message}</p>
        <button
          onClick={onClose}
          className="mt-5 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Close
        </button>
      </div>
    </div>
  )
}
