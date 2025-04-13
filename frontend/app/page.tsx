import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Database, FileText, AlertTriangle } from 'lucide-react';
import Header from './components/layout/header';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <Header />
      
      {/* Main content - adjusted for header height */}
      <div className="mt-[11vh]">
        {/* Hero Section - Now full screen height */}
        <section className="py-12 bg-white h-[89vh] flex items-center">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center">
              {/* Left side - GIF (smaller and centered) */}
              <div className="lg:w-3/5 mb-10 lg:mb-0 flex justify-center items-center">
                <div className="rounded-lg overflow-hidden shadow-md w-[660px]">
                  <Image 
                    src="/air-pollution-monitoring.gif" 
                    alt="Air Pollution Monitoring System" 
                    width={500} 
                    height={350} 
                    className="w-full"
                  />
                </div>
              </div>
              
              {/* Right side - Text (unchanged) */}
              <div className="lg:w-3/5 lg:pl-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Air Quality Monitoring with Blockchain
                </h2>
                <p className="text-gray-700 mb-6">
                  Our innovative system combines traditional databases with blockchain 
                  technology to create tamper-proof records of critical air pollution events 
                  while efficiently managing regular air quality data.
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
                  <Link href="#features" className="border border-gray-300 hover:border-gray-400 px-6 py-2 rounded-md transition duration-300">
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section - Unchanged */}
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
                  Collect and process air quality data from multiple sensors measuring PM2.5, 
                  PM10, ozone, and other pollutants.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
                  <Database className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Hybrid Storage</h3>
                <p className="text-gray-700">
                  Store regular readings in Supabase and critical events on Polygon blockchain
                  for maximum efficiency and security.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center mb-4">
                  <AlertTriangle className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Transparent Monitoring</h3>
                <p className="text-gray-700">
                  Access real-time air quality data through an intuitive dashboard with
                  verified blockchain records of pollution events.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer - Unchanged */}
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
                  <li><Link href="#features" className="text-gray-400 hover:text-white">Features</Link></li>
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