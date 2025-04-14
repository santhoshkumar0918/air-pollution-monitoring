import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Air Quality Blockchain Storage System
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A hybrid system that stores critical air pollution data on the Polygon
          blockchain while keeping normal readings in a conventional database.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                1
              </span>
              <span>Upload your CSV file with air quality measurements</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                2
              </span>
              <span>
                System automatically classifies readings based on PM10 and PM2.5
                values
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                3
              </span>
              <span>
                Critical readings (PM10 {">"} 350 μg/m³ or PM2.5 {">"} 55.5
                μg/m³) go to blockchain
              </span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                4
              </span>
              <span>Normal readings are stored in the database</span>
            </li>
            <li className="flex items-start">
              <span className="bg-blue-100 text-blue-800 font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
                5
              </span>
              <span>View and analyze all data through the dashboard</span>
            </li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Why Blockchain?</h2>
          <p className="mb-4">
            Critical air pollution events are stored on the Polygon blockchain
            to provide:
          </p>
          <ul className="space-y-2">
            <li className="flex items-start">
              <svg
                className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>
                Immutable, tamper-proof records of high pollution events
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Public verification of environmental incidents</span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>
                Decentralized storage not controlled by any single entity
              </span>
            </li>
            <li className="flex items-start">
              <svg
                className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span>Enhanced transparency and trust in environmental data</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
        <Link
          href="/upload"
          className="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 text-center"
        >
          Upload CSV Data
        </Link>
        <Link
          href="/dashboard"
          className="py-3 px-6 bg-gray-100 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition duration-300 text-center"
        >
          View Dashboard
        </Link>
      </div>

      <div className="bg-blue-50 p-6 rounded-lg max-w-3xl mx-auto">
        <h2 className="text-xl font-semibold mb-3">Air Quality Categories</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Classification</th>
                <th className="py-2 px-4 border-b">PM10 (μg/m³)</th>
                <th className="py-2 px-4 border-b">On Blockchain</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b bg-blue-100">Clean</td>
                <td className="py-2 px-4 border-b">0 - 99</td>
                <td className="py-2 px-4 border-b">No</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b bg-green-100">Normal</td>
                <td className="py-2 px-4 border-b">100 - 199</td>
                <td className="py-2 px-4 border-b">No</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b bg-yellow-100">Moderate</td>
                <td className="py-2 px-4 border-b">200 - 349</td>
                <td className="py-2 px-4 border-b">No</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b bg-orange-100">Attention</td>
                <td className="py-2 px-4 border-b">350 - 419</td>
                <td className="py-2 px-4 border-b font-semibold">Yes</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b bg-red-100">Alert</td>
                <td className="py-2 px-4 border-b">420 - 549</td>
                <td className="py-2 px-4 border-b font-semibold">Yes</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b bg-purple-100">Warning</td>
                <td className="py-2 px-4 border-b">550 - 649</td>
                <td className="py-2 px-4 border-b font-semibold">Yes</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b bg-red-200">Emergency</td>
                <td className="py-2 px-4 border-b">{">"} 650</td>
                <td className="py-2 px-4 border-b font-semibold">Yes</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
