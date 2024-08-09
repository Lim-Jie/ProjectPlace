// src/app/components/TableAdmin.js
'use client';
import React, { useEffect, useState } from 'react';
import { fetchDocuments } from '../firebase/config';

const DataTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getDocuments = async () => {
      const docs = await fetchDocuments('User'); // Replace with your collection name
      setData(docs);
    };

    getDocuments();
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
        <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
          <tr>
            <th className="py-3 px-6 text-left">Name</th>
            <th className="py-3 px-6 text-left">Published Documents</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {data.map((item, index) => (
            <tr key={index} className="border-b border-gray-200 hover:bg-gray-100">
              <td className="py-3 px-6 text-left whitespace-nowrap">{item.id}</td>
              <td className="py-3 px-6 text-left">
                <select className="block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300">
                  <option disabled selected>Select a Document</option>
                  {item.publishedDocs && item.publishedDocs.length > 0 ? (
                    item.publishedDocs.map((doc, docIndex) => (
                      <option key={docIndex} value={doc}>{doc}</option>
                    ))
                  ) : (
                    <option>No Published Documents</option>
                  )}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
