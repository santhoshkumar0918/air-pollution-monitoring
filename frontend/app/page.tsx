// import Link from "next/link";

// export default function HomePage() {
//   return (
//     <div className="container mx-auto px-4 py-12">
//       <header className="mb-12 text-center">
//         <h1 className="text-4xl font-bold mb-4">
//           Air Quality Blockchain Storage System
//         </h1>
//         <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//           A hybrid system that stores critical air pollution data on the Polygon
//           blockchain while keeping normal readings in a conventional database.
//         </p>
//       </header>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
//           <ul className="space-y-2">
//             <li className="flex items-start">
//               <span className="bg-blue-100 text-blue-800 font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
//                 1
//               </span>
//               <span>Upload your CSV file with air quality measurements</span>
//             </li>
//             <li className="flex items-start">
//               <span className="bg-blue-100 text-blue-800 font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
//                 2
//               </span>
//               <span>
//                 System automatically classifies readings based on PM10 and PM2.5
//                 values
//               </span>
//             </li>
//             <li className="flex items-start">
//               <span className="bg-blue-100 text-blue-800 font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
//                 3
//               </span>
//               <span>
//                 Critical readings (PM10 {">"} 350 μg/m³ or PM2.5 {">"} 55.5
//                 μg/m³) go to blockchain
//               </span>
//             </li>
//             <li className="flex items-start">
//               <span className="bg-blue-100 text-blue-800 font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
//                 4
//               </span>
//               <span>Normal readings are stored in the database</span>
//             </li>
//             <li className="flex items-start">
//               <span className="bg-blue-100 text-blue-800 font-semibold rounded-full w-6 h-6 flex items-center justify-center mr-2 mt-0.5">
//                 5
//               </span>
//               <span>View and analyze all data through the dashboard</span>
//             </li>
//           </ul>
//         </div>

//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h2 className="text-2xl font-semibold mb-4">Why Blockchain?</h2>
//           <p className="mb-4">
//             Critical air pollution events are stored on the Polygon blockchain
//             to provide:
//           </p>
//           <ul className="space-y-2">
//             <li className="flex items-start">
//               <svg
//                 className="h-5 w-5 text-green-500 mr-2 mt-0.5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M5 13l4 4L19 7"
//                 />
//               </svg>
//               <span>
//                 Immutable, tamper-proof records of high pollution events
//               </span>
//             </li>
//             <li className="flex items-start">
//               <svg
//                 className="h-5 w-5 text-green-500 mr-2 mt-0.5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M5 13l4 4L19 7"
//                 />
//               </svg>
//               <span>Public verification of environmental incidents</span>
//             </li>
//             <li className="flex items-start">
//               <svg
//                 className="h-5 w-5 text-green-500 mr-2 mt-0.5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M5 13l4 4L19 7"
//                 />
//               </svg>
//               <span>
//                 Decentralized storage not controlled by any single entity
//               </span>
//             </li>
//             <li className="flex items-start">
//               <svg
//                 className="h-5 w-5 text-green-500 mr-2 mt-0.5"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M5 13l4 4L19 7"
//                 />
//               </svg>
//               <span>Enhanced transparency and trust in environmental data</span>
//             </li>
//           </ul>
//         </div>
//       </div>

//       <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
//         <Link
//           href="/upload"
//           className="py-3 px-6 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 text-center"
//         >
//           Upload CSV Data
//         </Link>
//         <Link
//           href="/dashboard"
//           className="py-3 px-6 bg-gray-100 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-200 transition duration-300 text-center"
//         >
//           View Dashboard
//         </Link>
//       </div>

//       <div className="bg-blue-50 p-6 rounded-lg max-w-3xl mx-auto">
//         <h2 className="text-xl font-semibold mb-3">Air Quality Categories</h2>
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white">
//             <thead>
//               <tr>
//                 <th className="py-2 px-4 border-b">Classification</th>
//                 <th className="py-2 px-4 border-b">PM10 (μg/m³)</th>
//                 <th className="py-2 px-4 border-b">On Blockchain</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td className="py-2 px-4 border-b bg-blue-100">Clean</td>
//                 <td className="py-2 px-4 border-b">0 - 99</td>
//                 <td className="py-2 px-4 border-b">No</td>
//               </tr>
//               <tr>
//                 <td className="py-2 px-4 border-b bg-green-100">Normal</td>
//                 <td className="py-2 px-4 border-b">100 - 199</td>
//                 <td className="py-2 px-4 border-b">No</td>
//               </tr>
//               <tr>
//                 <td className="py-2 px-4 border-b bg-yellow-100">Moderate</td>
//                 <td className="py-2 px-4 border-b">200 - 349</td>
//                 <td className="py-2 px-4 border-b">No</td>
//               </tr>
//               <tr>
//                 <td className="py-2 px-4 border-b bg-orange-100">Attention</td>
//                 <td className="py-2 px-4 border-b">350 - 419</td>
//                 <td className="py-2 px-4 border-b font-semibold">Yes</td>
//               </tr>
//               <tr>
//                 <td className="py-2 px-4 border-b bg-red-100">Alert</td>
//                 <td className="py-2 px-4 border-b">420 - 549</td>
//                 <td className="py-2 px-4 border-b font-semibold">Yes</td>
//               </tr>
//               <tr>
//                 <td className="py-2 px-4 border-b bg-purple-100">Warning</td>
//                 <td className="py-2 px-4 border-b">550 - 649</td>
//                 <td className="py-2 px-4 border-b font-semibold">Yes</td>
//               </tr>
//               <tr>
//                 <td className="py-2 px-4 border-b bg-red-200">Emergency</td>
//                 <td className="py-2 px-4 border-b">{">"} 650</td>
//                 <td className="py-2 px-4 border-b font-semibold">Yes</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }





import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Database, FileText, AlertTriangle, CloudLightning } from 'lucide-react';
import Header from '@/components/layout/header';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header - Using the updated header from file 3 */}
      <Header />
      
      {/* Main content - adjusted for header height */}
      <div className="mt-[5vh]">
        {/* Hero Section from the first file (landing page structure) */}
        <section className="py-12 bg-white h-[89vh] flex items-center">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center">
              {/* Left side - GIF (smaller and centered) */}
              <div className="lg:w-3/5 mb-10 lg:mb-0 flex justify-center items-center">
                <div className="rounded-lg overflow-hidden shadow-md w-[680px]">
                  <Image 
                    src="/air-pollution-monitoring.gif" 
                    alt="Air Pollution Monitoring System" 
                    width={450} 
                    height={450} 
                    className="w-full"
                  />
                </div>
              </div>
              
              {/* Right side - Text (with updated content from second file) */}
              <div className="lg:w-4/5 lg:pl-16">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Air Quality Monitoring with Blockchain
                </h2>
                <p className="text-gray-700 mb-6">
                  A hybrid system that stores critical air pollution data on the Polygon
                  blockchain while keeping normal readings in a conventional database for
                  maximum efficiency and security.
                </p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-start">
                    <div className="bg-yellow-100 p-2 rounded-full mr-4">
                      <AlertTriangle className="h-5 w-5 text-yellow-600" />
                    </div>
                    <p className="text-gray-700">
                      <span className="font-medium">Immutable Records</span> of critical pollution events
                    </p>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-yellow-100 p-2 rounded-full mr-4">
                      <Database className="h-5 w-5 text-yellow-600" />
                    </div>
                    <p className="text-gray-700">
                      <span className="font-medium">Hybrid Storage</span> for cost-effective data management
                    </p>
                  </div>
                </div>
                
                <div className="flex space-x-4">
                  <Link href="/dashboard" className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-6 py-2 rounded-md transition duration-300">
                    View Dashboard
                  </Link>
                  <Link href="/upload" className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-2 rounded-md transition duration-300">
                    Upload CSV Data
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section - From the second file but with styling from first file */}
        <section id="features" className="py-12 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-center mb-10 text-gray-800">How It Works</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Data Collection</h3>
                <p className="text-gray-700">
                  Upload your CSV file with air quality measurements. We collect and process data 
                  from multiple sensors measuring PM2.5, PM10, ozone, and other pollutants.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Hybrid Storage</h3>
                <p className="text-gray-700">
                  Critical readings (PM10 &gt; 350 μg/m³ or PM2.5 &gt; 55.5 μg/m³) go to Polygon blockchain, 
                  while normal readings are stored efficiently in Supabase.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Transparent Monitoring</h3>
                <p className="text-gray-700">
                  Access real-time air quality data through an intuitive dashboard with
                  verified blockchain records of critical pollution events.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Blockchain Section - From the second file but styled to match */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-center mb-10 text-gray-800">Why Blockchain?</h2>
            
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
              <p className="mb-4 text-gray-700">
                Critical air pollution events are stored on the Polygon blockchain to provide:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-yellow-500 mr-2 mt-0.5"
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
                  <span className="text-gray-700">Immutable, tamper-proof records of high pollution events</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-yellow-500 mr-2 mt-0.5"
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
                  <span className="text-gray-700">Public verification of environmental incidents</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-yellow-500 mr-2 mt-0.5"
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
                  <span className="text-gray-700">Decentralized storage not controlled by any single entity</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 text-yellow-500 mr-2 mt-0.5"
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
                  <span className="text-gray-700">Enhanced transparency and trust in environmental data</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Air Quality Categories Table - From the second file with consistent styling */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-6">
            <h2 className="text-2xl font-bold text-center mb-10 text-gray-800">Air Quality Categories</h2>
            
            <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b text-left">Classification</th>
                      <th className="py-2 px-4 border-b text-left">PM10 (μg/m³)</th>
                      <th className="py-2 px-4 border-b text-left">On Blockchain</th>
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
                      <td className="py-2 px-4 border-b">&gt; 650</td>
                      <td className="py-2 px-4 border-b font-semibold">Yes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Footer - From the first file but with updated content */}
        <footer className="bg-black py-8 text-white">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">AirChain Monitor</h3>
                <p className="text-gray-400">
                  Transparent air quality monitoring combining blockchain and traditional database solutions.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
                  <li><Link href="/dashboard" className="text-gray-400 hover:text-white">Dashboard</Link></li>
                  <li><Link href="/upload" className="text-gray-400 hover:text-white">Upload CSV</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Resources</h4>
                <ul className="space-y-2">
                  <li><Link href="/resources/docs" className="text-gray-400 hover:text-white">Documentation</Link></li>
                  <li><Link href="/blockchain/verify" className="text-gray-400 hover:text-white">Blockchain Verification</Link></li>
                  <li><Link href="/resources/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
              <p>&copy; 2025 AirChain Monitor. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}