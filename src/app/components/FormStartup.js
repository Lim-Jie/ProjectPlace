'use client';
import { useState } from 'react';


export default function StartupForm() {
    const [formData, setFormData] = useState({ name: '', email: '' });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Process form data here (e.g., send to an API, log to console, etc.)
        console.log(formData);
    };

    return(
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-4xl px-4">
        <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">Product Name</label>
            <input
                type="text"
                id="ProductName"
                name="ProductName"
                value={formData.ProductName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                required
            />
        </div>
        <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Definition</label>
            <input
                type="text"
                id="Definition"
                name="Definition"
                value={formData.Definition}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                required
            />
        </div>
        <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
            Submit for Request
        </button>
    </form>
    );
    
}