'use client';
import { useState, useEffect } from 'react';
import Switch from 'react-switch';
import { useDropzone } from 'react-dropzone';
import { storeFormDataWithEmailVerification } from '../firebase/config';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage'; // Import Firebase Storage
import Image from 'next/image';

export default function ProjectForm() {
    const [formData, setFormData] = useState({
        ProductName: '',
        Definition: '',
        Author: '',
        TechStack: '',
        Link: '',
        Email: '', // Added Email field
    });
    const [file, setFile] = useState(null); // State to keep track of the selected file
    const [isUsingTechStack, setUsingTechStack] = useState(false);
    const [isProjectDeployed, setProjectDeployed] = useState(false);
    const [error, setError] = useState('');

    // Load data from localStorage when component mounts
    useEffect(() => {
        const savedData = localStorage.getItem('projectFormData');
        const savedTechStack = localStorage.getItem('isUsingTechStack');
        const savedProjectDeployed = localStorage.getItem('isProjectDeployed');

        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
        if (savedTechStack) {
            setUsingTechStack(JSON.parse(savedTechStack));
        }
        if (savedProjectDeployed) {
            setProjectDeployed(JSON.parse(savedProjectDeployed));
        }
    }, []);

    // Save data to localStorage whenever formData, isUsingTechStack, or isProjectDeployed changes
    useEffect(() => {
        if (formData.ProductName || formData.Definition || formData.Author || formData.TechStack || formData.Link || formData.Email) {
            localStorage.setItem('projectFormData', JSON.stringify(formData));
        }
        localStorage.setItem('isUsingTechStack', JSON.stringify(isUsingTechStack));
        localStorage.setItem('isProjectDeployed', JSON.stringify(isProjectDeployed));
    }, [formData, isUsingTechStack, isProjectDeployed]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });

        if (name === 'Definition') {
            const wordCount = value.trim().split(/\s+/).length;
            if (wordCount < 20) {
                setError('The Definition field must contain at least 20 words.');
            } else {
                setError('');
            }
        }
    };

    const handleTechStack = (checked) => {
        setUsingTechStack(checked);
    };

    const handleProjectDeployed = (checked) => {
        setProjectDeployed(checked);
    };

    const handleFileChange = (acceptedFiles) => {
        setFile(acceptedFiles[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate form data before submitting
        if (!formData.ProductName || !formData.Definition || !formData.Author || !formData.Email || (isUsingTechStack && !formData.TechStack)) {
            setError('Please fill out all required fields.');
            return;
        }
        if (error) {
            console.log('Form has errors. Cannot submit.');
            return;
        }

        try {
            let imageUrl = '';

            if (file) {
                // Upload image to Firebase Storage
                const storage = getStorage();
                const storageRef = ref(storage, `images/${file.name}`);
                await uploadBytes(storageRef, file);
                imageUrl = await getDownloadURL(storageRef);
            }

            // Add image URL to form data
            const formDataWithImage = { ...formData, imageUrl };

            // Save form data to Firestore and update user document
            await storeFormDataWithEmailVerification('Testing', true, formDataWithImage, formData.Email); // Collection name is 'Testing', auto ID is true
            console.log('Form data saved successfully.');

            // Clear local storage after successful submission
            localStorage.removeItem('projectFormData');
            localStorage.removeItem('isUsingTechStack');
            localStorage.removeItem('isProjectDeployed');

            // Optionally reset form state here if desired
            setFormData({
                ProductName: '',
                Definition: '',
                Author: '',
                TechStack: '',
                Link: '',
                Email: '' // Email field, reset after successful submission
            });
            setUsingTechStack(false);
            setProjectDeployed(false);
            setFile(null);
        } catch (error) {
            console.error('Error saving form data:', error);
        }
    };

    // Dropzone for file upload
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: (acceptedFiles) => handleFileChange(acceptedFiles)
    });

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-4xl px-4">
            <div className="mb-4">
                <label htmlFor="ProductName" className="block text-gray-700">Product Name</label>
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
                <label htmlFor="Definition" className="block text-gray-700">Definition</label>
                <textarea
                    id="Definition"
                    name="Definition"
                    value={formData.Definition}
                    onChange={handleChange}
                    rows={5}
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    required
                />
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </div>
            <div className="mb-4">
                <label htmlFor="Author" className="block text-gray-700">Author</label>
                <input
                    type="text"
                    id="Author"
                    name="Author"
                    value={formData.Author}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="Email" className="block text-gray-700">Email</label>
                <input
                    type="email"
                    id="Email"
                    name="Email"
                    value={formData.Email}
                    onChange={handleChange}
                    className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    required
                />
            </div>
            <div className="mb-4 flex items-center">
                <label className="block text-gray-700 mr-4">Uses a Tech Stack</label>
                <Switch
                    checked={isUsingTechStack}
                    onChange={handleTechStack}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    handleDiameter={30}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={20}
                    width={48}
                    className="react-switch"
                />
            </div>
            {isUsingTechStack && (
                <div className="mb-4">
                    <label htmlFor="TechStack" className="block text-gray-700">Tech Stack list</label>
                    <input
                        type="text"
                        id="TechStack"
                        name="TechStack"
                        value={formData.TechStack}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
            )}
            <div className="mb-4 flex items-center">
                <label className="block text-gray-700 mr-4">Is Project Deployed (Website/App) </label>
                <Switch
                    checked={isProjectDeployed}
                    onChange={handleProjectDeployed}
                    onColor="#86d3ff"
                    onHandleColor="#2693e6"
                    handleDiameter={30}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                    activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
                    height={20}
                    width={48}
                    className="react-switch"
                />
            </div>
            {isProjectDeployed && (
                <div className="mb-4">
                    <label htmlFor="Link" className="block text-gray-700">Link</label>
                    <input
                        type="url"
                        id="Link"
                        name="Link"
                        value={formData.Link}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
            )}
            <div className="mb-4">
                <label htmlFor="file" className="block text-gray-700">Upload Image</label>
                <div {...getRootProps()} className="mt-1 flex items-center justify-center border-2 border-dashed border-gray-300 p-6 rounded-md">
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p className="text-gray-500">Drop the files here ...</p>
                    ) : (
                        <p className="text-gray-500">Drag 'n' drop a file here, or click to select one</p>
                    )}
                </div>
                {file && (
                    <div className="mt-4">
                        <p className="text-gray-700">Selected file: {file.name}</p>
                        <Image src={URL.createObjectURL(file)} alt="Preview" width={200} height={200} />
                    </div>
                )}
            </div>
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
            >
                Submit
            </button>
        </form>
    );
}
