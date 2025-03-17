import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white text-gray-800">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <h2 className="text-3xl font-semibold text-gray-900">Not Found</h2>
      <p className="text-gray-600 mt-2">Could not find requested resource</p>
      <Link href="/">
        <h1 className="mt-4 px-4 py-2 text-white font-semibold bg-gray-900 rounded-xl shadow-md hover:bg-gray-500 transition">Return Home</h1>
      </Link>
    </div>
  );
}
