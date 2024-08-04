// pages/testing.js
'use client';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { db } from '../firebase/config';

const TestingPage = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      const querySnapshot = await getDocs(collection(db, 'Testing'));
      const docs = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const data = doc.data();
          if (data.imagePath) {
            const storage = getStorage();
            const imageRef = ref(storage, data.imagePath);
            const imageUrl = await getDownloadURL(imageRef);
            data.imageUrl = imageUrl;
          }
          return data;
        })
      );
      setDocuments(docs);
    };

    fetchDocuments();
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
            {doc.imagePath && (
              <img
                src={doc.imageUrl}
                alt="Document Image"
                className="w-full h-auto rounded-lg"
              />
            )}
            
            {/* Render Founder */}
            <p className="mt-4 text-gray-500"><strong>Founder:</strong> {doc.Founder}</p>
            
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

          </div>
          
        ))}
      </div>
    </div>
  );
};

export default TestingPage;











/*
// pages/testing.js
'use client';
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';

const TestingPage = () => {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    const fetchDocuments = async () => {
      const querySnapshot = await getDocs(collection(db, 'Testing'));
      const docs = querySnapshot.docs.map(doc => doc.data());
      setDocuments(docs);
    };

    fetchDocuments();
  }, []);

  return (
    <div>
      <h1>Testing Collection</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {documents.map((doc, index) => (
          <div key={index} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px', margin: '10px', width: '300px' }}>
            {Object.entries(doc).map(([key, value]) => (
              <p key={key}><strong>{key}:</strong> {value}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestingPage;
*/