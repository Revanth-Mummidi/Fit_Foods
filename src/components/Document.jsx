import React, {useState} from 'react'
import Navbar from './Navbar'

function Document() {
  return (
    <div>
    <Navbar/>
    <DocumentUpload/>
    </div>
  )
}

export default Document


const DocumentUpload = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [documentName, setDocumentName] = useState('');
  const [documentDescription, setDocumentDescription] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
  };

  const handleDocumentNameChange = (event) => {
    setDocumentName(event.target.value);
  };

  const handleDocumentDescriptionChange = (event) => {
    setDocumentDescription(event.target.value);
  };

  return (
    <div className="min-h-screen flex items-center justify-center  bg-gradient-to-r from-black to-gray-800">
      <div className="bg-white shadow-md rounded px-8 py-6 w-full md:w-1/2 lg:w-1/3">
        <h2 className="text-2xl font-semibold mb-4">Upload Document</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="file">
            Upload File
          </label>
          <input
            type="file"
            id="file"
            onChange={handleFileUpload}
            className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="documentName">
            Document Name
          </label>
          <input
            type="text"
            id="documentName"
            value={documentName}
            onChange={handleDocumentNameChange}
            className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="documentDescription">
            Document Description
          </label>
          <textarea
            id="documentDescription"
            value={documentDescription}
            onChange={handleDocumentDescriptionChange}
            className="border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Upload
          </button>
          {uploadedFile && (
            <a
              href={URL.createObjectURL(uploadedFile)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-500"
            >
              Open File
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

