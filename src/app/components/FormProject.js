'use client';
import { useState } from 'react';
import Switch from 'react-switch';

export default function ProjectForm() {
    const [formData, setFormData] = useState({ ProductName: '', Definition: '', Author: '', ExtraField: '',Textfield_TechStack:'', Textfield_ProjectDeployed: ''});
    const [isUsingTechStack, setUsingTechStack] = useState(false);
    const [isProjectDeployed, setProjectDeployed] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleTechStack = (checked) => {
        setUsingTechStack(checked);
    };

    const handleProjectDeployed = (checked) => {
        setProjectDeployed(checked);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Process form data here (e.g., send to an API, log to console, etc.)
        console.log(formData);
    };

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
                    <label htmlFor="Textfield_TechStack" className="block text-gray-700">Tech Stack list</label>
                    <input
                        type="text"
                        id="Textfield_TechStack"
                        name="Textfield_TechStack"
                        value={formData.Textfield_TechStack}
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
                    className="react-switch_2"
                />
            </div>

            {isProjectDeployed && (
                <div className="mb-4">
                    <label htmlFor="Textfield_ProjectDeployed" className="block text-gray-700">Link to your project: </label>
                    <input
                        type="text"
                        id="Textfield_ProjectDeployed"
                        name="Textfield_ProjectDeployed"
                        value={formData.Textfield_ProjectDeployed}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
                    />
                </div>
            )}
            
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
                Submit for Request
            </button>
        </form>
    );
}
