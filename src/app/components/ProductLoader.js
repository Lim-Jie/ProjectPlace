// pages/testing.js
'use client';
import { useEffect, useState } from 'react';
import { fetchDocuments } from '../firebase/config';


const TestingPage = () => {
  const [documents, setDocuments] = useState([]);

  const getDocuments = async () => {
    const docs = await fetchDocuments('Forum');
    setDocuments(docs);
  };

  useEffect(() => {
    getDocuments();
  }, []);

  return (
    <div className="p-8">
      <div className="flex flex-wrap">
        {documents.map((doc, index) => (
          <div
            key={index}
            className="border border-gray-300 rounded-lg p-4 m-4 w-72 bg-white "
          >
            {/* Render ProductName */}
            <h2 className="text-2xl font-bold mb-2">{doc.ProductName}</h2>
            
            {/* Render Definition */}
            <p className="mb-2 text-gray-500">{doc.Definition}</p>
            
            {/* Render Image */}
            {doc.imageUrl && (
              <img
                src={doc.imageUrl}
                alt="Document Image"
                className="w-full h-auto rounded-lg"
              />
            )}
            

            {doc.Link && (
              <p className="mt-4">
                <strong>Website:</strong>{" "}
                <a
                  href={doc.Link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {doc.Link}
                </a>
              </p>
            )}

            {/* Render Tech Stack */}
            <p className="mt-4 text-gray-500"><strong>TechStack:</strong> {doc.TechStack}</p>
            
            {/* Render Author */}
            <p className="mt-4 text-gray-500"><strong>Author:</strong> {doc.Author}</p>
            


          </div>
          
        ))}
      </div>
    </div>
  );
};

export default TestingPage;
