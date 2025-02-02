export default function UnauthorizedPage() {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-gray-100 p-4">
        <h1 className="text-6xl font-bold text-red-600">403</h1>
        <p className="mt-4 text-xl text-gray-600">You do not have permission to access this page.</p>
        <a
          href="/"
          className="mt-6 rounded-lg bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-700"
        >
          Go Back Home
        </a>
      </div>
    );
  }
  