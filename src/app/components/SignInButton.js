export default function NavigationButton({ }) {
    return (
        <a
            href={"http://localhost:3000/api/auth/signin"}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded inline-block text-center"
        >
            {"sign In"}
        </a>
    );
}