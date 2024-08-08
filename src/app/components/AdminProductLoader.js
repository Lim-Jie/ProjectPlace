// pages/testing.js
'use client';
import { useEffect, useState } from 'react';
import { fetchDocuments, MoveDocToCollection } from '../firebase/config';
import Image from 'next/image'; // Import Image component from Next.js

const TestingPage = () => {
  const [documents, setDocuments] = useState([]);

  const getDocuments = async () => {
    try {
      const docs = await fetchDocuments('Testing');
      console.log('Fetched documents:', docs); // Debug log
      setDocuments(docs);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleMoveDocument = async (docId, destination) => {
    console.log(`Clicked document ID: ${docId}`);
    try {
      await MoveDocToCollection(docId, 'Testing', destination);
      getDocuments(); // Refresh the document list
    } catch (error) {
      console.error('Error moving document:', error);
    }
  };

  useEffect(() => {
    getDocuments();
  }, []);

  return (
    <div className="p-8">
      <div className="flex flex-wrap">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="border border-gray-300 rounded-lg p-4 m-4 w-72 bg-white"
            onMouseEnter={() => console.log(`Hovering over document ID: ${doc.id}`)} // Debug log
          >
            <h2 className="text-2xl font-bold mb-2">{doc.ProductName}</h2>
            <p className="mb-2 text-gray-500">{doc.Definition}</p>
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
            <p className="mt-4 text-gray-500">
              <strong>TechStack:</strong> {doc.TechStack}
            </p>
            <p className="mt-4 text-gray-500">
              <strong>Author:</strong> {doc.Author}
            </p>
            
            <div className="flex mt-4">
              <button onClick={() => handleMoveDocument(doc.id, 'Forum')}>
                <Image
                  src="icons/CorrectIconParkOutlineCorrect.svg" // Path to your tick icon
                  alt="Accept"
                  width={24}
                  height={24}
                />
              </button>
              <button onClick={() => handleMoveDocument(doc.id, 'Rejected')}>
                <Image
                  src="icons/WrongIconCrossCircled.svg" // Path to your cross icon
                  alt="Reject"
                  width={24}
                  height={24}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestingPage;
