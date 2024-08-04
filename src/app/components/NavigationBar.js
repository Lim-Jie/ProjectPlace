import AdminIcon from './AdminIcon'; // Import the AdminIcon component
import UploadProjectsIcon from './UploadProjectIcon';
import HomeIcon from './HomeIcon';

export default function NavBar() {

    return (
        <nav className="w-full bg-gray-100 text-white p-4 flex justify-between items-center m-0 p-0">
            <div className="text-2xl text-black">ProjectPlace</div>
            <div className="flex space-x-9"> {/* Adjust space-x value for desired spacing */}
                <HomeIcon />
                <AdminIcon />
                <UploadProjectsIcon />
            </div>
        </nav>
    );
}
