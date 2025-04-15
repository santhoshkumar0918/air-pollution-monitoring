// "use client";

// import React, { useState, useRef, useEffect } from "react";
// import { CloudLightning, ChevronDown, Search, X } from "lucide-react";
// import { motion } from "framer-motion";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// const Header = () => {
//   const [hoveredLink, setHoveredLink] = useState<string | null>(null);
//   const [featuresOpen, setFeaturesOpen] = useState(false);
//   const [searchOpen, setSearchOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState<any[]>([]);
  
//   const router = useRouter();
  
//   const searchRef = useRef<HTMLDivElement>(null);
//   const searchInputRef = useRef<HTMLInputElement>(null);

//   // Close menus when clicking outside
//   useEffect(() => {
//     function handleClickOutside(event: MouseEvent) {
//       if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
//         setSearchOpen(false);
//       }
//     }
    
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // Focus search input when search opens
//   useEffect(() => {
//     if (searchOpen && searchInputRef.current) {
//       searchInputRef.current.focus();
//     }
//   }, [searchOpen]);

//   const features = [
//     {
//       title: "Monitoring Tools",
//       links: [
//         { name: "Air Quality Dashboard", href: "/dashboard" },
//         { name: "Pollution Events", href: "/dashboard/events" },
//         { name: "Historical Data", href: "/dashboard/history" },
//         { name: "Sensor Network", href: "/dashboard/sensors" },
//       ],
//     },
//     {
//       title: "Blockchain Features",
//       links: [
//         { name: "Critical Events Explorer", href: "/blockchain/events" },
//         { name: "Verification Portal", href: "/blockchain/verify" },
//         { name: "Polygon Integration", href: "/blockchain/polygon" },
//         { name: "Smart Contracts", href: "/blockchain/contracts" },
//       ],
//     },
//     {
//       title: "Data Management",
//       links: [
//         { name: "Supabase Database", href: "/data/supabase" },
//         { name: "Data Export Tools", href: "/data/export" },
//         { name: "API Documentation", href: "/data/api" },
//         { name: "CSV Import", href: "/data/import" },
//       ],
//     },
//     {
//       title: "Resources",
//       links: [
//         { name: "Documentation", href: "/resources/docs" },
//         { name: "Air Quality Standards", href: "/resources/standards" },
//         { name: "About AirChain", href: "/resources/about" },
//         { name: "Contact Us", href: "/resources/contact" },
//       ],
//     },
//   ];

//   // All searchable items from the navigation
//   const allItems = features.flatMap(section => 
//     section.links.map(link => ({
//       name: link.name,
//       href: link.href,
//       category: section.title
//     }))
//   );

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const query = e.target.value;
//     setSearchQuery(query);
    
//     if (query.trim() === "") {
//       setSearchResults([]);
//     } else {
//       const filtered = allItems.filter(item => 
//         item.name.toLowerCase().includes(query.toLowerCase()) ||
//         item.category.toLowerCase().includes(query.toLowerCase())
//       );
//       setSearchResults(filtered);
//     }
//   };

//   const handleSearchItemClick = (href: string) => {
//     router.push(href);
//     setSearchOpen(false);
//     setSearchQuery("");
//   };

//   const toggleSearch = () => {
//     setSearchOpen(!searchOpen);
//   };

//   return (
//     <header className="fixed top-0 left-0 w-full bg-black bg-opacity-90 backdrop-blur-lg shadow-lg z-50">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-[11vh]">
//         <div className="flex items-center">
//           <div className="text-yellow-400 font-bold text-2xl flex items-center gap-2">
//             <CloudLightning className="h-8 w-8" />
//             AirChain Monitor
//           </div>
//         </div>

//         <nav className="hidden md:flex space-x-12">
//           <div
//             onMouseEnter={() => setHoveredLink("home")}
//             onMouseLeave={() => setHoveredLink(null)}
//             className="relative flex items-center"
//           >
//             <Link
//               href="/"
//               className="text-gray-300 hover:text-white transition duration-300 text-lg"
//             >
//               Home
//             </Link>
//           </div>

//           <div className="relative flex items-center">
//             <button
//               onClick={() => setFeaturesOpen(!featuresOpen)}
//               className="text-gray-300 hover:text-white transition duration-300 text-lg flex items-center gap-1"
//             >
//               Features
//               <ChevronDown className={`w-4 h-4 transition-transform ${featuresOpen ? "rotate-180" : ""}`} />
//             </button>
//           </div>

//           <div
//             onMouseEnter={() => setHoveredLink("dashboard")}
//             onMouseLeave={() => setHoveredLink(null)}
//             className="relative flex items-center"
//           >
//             <Link
//               href="/dashboard"
//               className="text-gray-300 hover:text-white transition duration-300 text-lg"
//             >
//               Dashboard
//             </Link>
//           </div>
//         </nav>

//         <div className="flex items-center space-x-4">
//           {/* Search Icon */}
//           <div ref={searchRef} className="relative">
//             <button
//               onClick={toggleSearch}
//               className="text-gray-300 hover:text-white transition duration-300"
//             >
//               <Search className="h-5 w-5" />
//             </button>

//             {/* Search Popup */}
//             {searchOpen && (
//               <div className="absolute right-0 mt-2 w-80 bg-gray-900 rounded-md shadow-lg p-4 z-50">
//                 <div className="flex items-center mb-2">
//                   <Search className="h-4 w-4 text-gray-400 mr-2" />
//                   <input
//                     ref={searchInputRef}
//                     type="text"
//                     placeholder="Search features..."
//                     className="bg-gray-800 text-white w-full p-2 rounded-md border border-gray-700 focus:outline-none focus:border-yellow-400"
//                     value={searchQuery}
//                     onChange={handleSearch}
//                   />
//                   <button 
//                     onClick={() => setSearchOpen(false)}
//                     className="ml-2 text-gray-400 hover:text-white"
//                   >
//                     <X className="h-4 w-4" />
//                   </button>
//                 </div>
                
//                 {searchResults.length > 0 ? (
//                   <div className="max-h-60 overflow-y-auto">
//                     {searchResults.map((item, index) => (
//                       <div 
//                         key={index}
//                         className="py-2 px-3 hover:bg-gray-800 rounded-md cursor-pointer flex justify-between"
//                         onClick={() => handleSearchItemClick(item.href)}
//                       >
//                         <span className="text-white">{item.name}</span>
//                         <span className="text-gray-400 text-sm">{item.category}</span>
//                       </div>
//                     ))}
//                   </div>
//                 ) : searchQuery.length > 0 ? (
//                   <div className="py-2 text-gray-400 text-center">No results found</div>
//                 ) : (
//                   <div className="py-2 text-gray-400 text-center">Type to search features</div>
//                 )}
//               </div>
//             )}
//           </div>
          
//           {/* Dashboard Button */}
//           <button
//             onClick={() => router.push('/dashboard')}
//             className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-4 rounded-md transition duration-300"
//           >
//             View Dashboard
//           </button>
//         </div>
//       </div>

//       {/* Features Dropdown */}
//       {featuresOpen && (
//         <div
//           className="absolute top-[11vh] left-0 w-full bg-gray-900 bg-opacity-95 backdrop-blur-lg shadow-xl"
//         >
//           <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//               {features.map((section, index) => (
//                 <div key={index} className="space-y-4">
//                   <h3 className="text-lg font-semibold text-yellow-400 border-b border-yellow-400 pb-2">
//                     {section.title}
//                   </h3>
//                   <ul className="space-y-3">
//                     {section.links.map((link, linkIndex) => (
//                       <li key={linkIndex}>
//                         <Link
//                           href={link.href}
//                           className="text-gray-300 hover:text-white transition duration-300"
//                           onClick={() => setFeaturesOpen(false)}
//                         >
//                           {link.name}
//                         </Link>
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Animated Underline */}
//       <motion.div
//         className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
//         initial={{ x: "-100%" }}
//         animate={{
//           x:
//             hoveredLink === "home"
//               ? "-25%"
//               : hoveredLink === "features"
//               ? "0%"
//               : hoveredLink === "dashboard"
//               ? "25%"
//               : "0%",
//         }}
//         transition={{ duration: 0.5, ease: "easeInOut" }}
//       />
//     </header>
//   );
// };

// export default Header;






"use client";

import React, { useState, useRef, useEffect } from "react";
import { CloudLightning, ChevronDown, Search, X, Upload } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const router = useRouter();
  
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node) && sidebarOpen) {
        setSidebarOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen]);

  // Focus search input when search opens
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const features = [
    {
      title: "Monitoring Tools",
      links: [
        { name: "Air Quality Dashboard", href: "/dashboard" },
        { name: "Pollution Events", href: "/dashboard/events" },
        { name: "Historical Data", href: "/dashboard/history" },
        { name: "Sensor Network", href: "/dashboard/sensors" },
      ],
    },
    {
      title: "Blockchain Features",
      links: [
        { name: "Critical Events Explorer", href: "/blockchain/events" },
        { name: "Verification Portal", href: "/blockchain/verify" },
        { name: "Polygon Integration", href: "/blockchain/polygon" },
        { name: "Smart Contracts", href: "/blockchain/contracts" },
      ],
    },
    {
      title: "Data Management",
      links: [
        { name: "Supabase Database", href: "/data/supabase" },
        { name: "Data Export Tools", href: "/data/export" },
        { name: "API Documentation", href: "/data/api" },
        { name: "CSV Import", href: "/data/import" },
        { name: "File Upload", href: "/upload" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "/resources/docs" },
        { name: "Air Quality Standards", href: "/resources/standards" },
        { name: "About AirChain", href: "/resources/about" },
        { name: "Contact Us", href: "/resources/contact" },
      ],
    },
  ];

  // All searchable items from the navigation
  const allItems = features.flatMap(section => 
    section.links.map(link => ({
      name: link.name,
      href: link.href,
      category: section.title
    }))
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === "") {
      setSearchResults([]);
    } else {
      const filtered = allItems.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.category.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filtered);
    }
  };

  const handleSearchItemClick = (href: string) => {
    router.push(href);
    setSearchOpen(false);
    setSearchQuery("");
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <>
      {/* Sidebar */}
      <div 
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-screen w-64 bg-orange-500 transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <div className="text-white font-bold text-xl flex items-center gap-2">
              <CloudLightning className="h-6 w-6" />
              AirChain
            </div>
            <button onClick={toggleSidebar} className="text-white">
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <nav className="space-y-4">
            <Link
              href="/"
              className="block text-white hover:bg-orange-600 px-4 py-2 rounded transition duration-200"
              onClick={() => setSidebarOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/dashboard"
              className="block text-white hover:bg-orange-600 px-4 py-2 rounded transition duration-200"
              onClick={() => setSidebarOpen(false)}
            >
              Dashboard
            </Link>
            <Link
              href="/upload"
              className="block text-white hover:bg-orange-600 px-4 py-2 rounded transition duration-200"
              onClick={() => setSidebarOpen(false)}
            >
              Upload
            </Link>
            
            {features.map((section, index) => (
              <div key={index} className="mt-6">
                <h3 className="text-sm font-semibold text-white uppercase mb-2 px-4">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.links.map((link, linkIndex) => (
                    <Link
                      key={linkIndex}
                      href={link.href}
                      className="block text-white text-sm hover:bg-orange-600 px-4 py-2 rounded transition duration-200"
                      onClick={() => setSidebarOpen(false)}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full bg-black bg-opacity-90 backdrop-blur-lg shadow-lg z-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-[11vh]">
          <div className="flex items-center">
            {/* Mobile menu button */}
            <button 
              onClick={toggleSidebar}
              className="md:hidden text-gray-300 hover:text-white mr-4"
            >
              <ChevronDown className="h-6 w-6 rotate-90" />
            </button>
            
            <div className="text-yellow-400 font-bold text-2xl flex items-center gap-2">
              <CloudLightning className="h-8 w-8" />
              AirChain Monitor
            </div>
          </div>

          <nav className="hidden md:flex space-x-12">
            <div
              onMouseEnter={() => setHoveredLink("home")}
              onMouseLeave={() => setHoveredLink(null)}
              className="relative flex items-center"
            >
              <Link
                href="/"
                className="text-gray-300 hover:text-white transition duration-300 text-lg"
              >
                Home
              </Link>
            </div>

            <div
              onMouseEnter={() => setHoveredLink("dashboard")}
              onMouseLeave={() => setHoveredLink(null)}
              className="relative flex items-center"
            >
              <Link
                href="/dashboard"
                className="text-gray-300 hover:text-white transition duration-300 text-lg"
              >
                Dashboard
              </Link>
            </div>

            <div
              onMouseEnter={() => setHoveredLink("upload")}
              onMouseLeave={() => setHoveredLink(null)}
              className="relative flex items-center"
            >
              <Link
                href="/upload"
                className="text-gray-300 hover:text-white transition duration-300 text-lg"
              >
                Upload
              </Link>
            </div>

            <div className="relative flex items-center">
              <button
                onClick={() => setFeaturesOpen(!featuresOpen)}
                className="text-gray-300 hover:text-white transition duration-300 text-lg flex items-center gap-1"
              >
                Features
                <ChevronDown className={`w-4 h-4 transition-transform ${featuresOpen ? "rotate-180" : ""}`} />
              </button>
            </div>
          </nav>

          <div className="flex items-center space-x-4">
            {/* Search Icon */}
            <div ref={searchRef} className="relative">
              <button
                onClick={toggleSearch}
                className="text-gray-300 hover:text-white transition duration-300"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Search Popup */}
              {searchOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-gray-900 rounded-md shadow-lg p-4 z-50">
                  <div className="flex items-center mb-2">
                    <Search className="h-4 w-4 text-gray-400 mr-2" />
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search features..."
                      className="bg-gray-800 text-white w-full p-2 rounded-md border border-gray-700 focus:outline-none focus:border-yellow-400"
                      value={searchQuery}
                      onChange={handleSearch}
                    />
                    <button 
                      onClick={() => setSearchOpen(false)}
                      className="ml-2 text-gray-400 hover:text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  
                  {searchResults.length > 0 ? (
                    <div className="max-h-60 overflow-y-auto">
                      {searchResults.map((item, index) => (
                        <div 
                          key={index}
                          className="py-2 px-3 hover:bg-gray-800 rounded-md cursor-pointer flex justify-between"
                          onClick={() => handleSearchItemClick(item.href)}
                        >
                          <span className="text-white">{item.name}</span>
                          <span className="text-gray-400 text-sm">{item.category}</span>
                        </div>
                      ))}
                    </div>
                  ) : searchQuery.length > 0 ? (
                    <div className="py-2 text-gray-400 text-center">No results found</div>
                  ) : (
                    <div className="py-2 text-gray-400 text-center">Type to search features</div>
                  )}
                </div>
              )}
            </div>
            
            {/* Upload Button */}
            <button
              onClick={() => router.push('/upload')}
              className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-4 rounded-md transition duration-300 hidden md:block"
            >
              <Upload className="h-4 w-4 inline mr-1" />
              Upload
            </button>
            
            {/* Dashboard Button */}
            <button
              onClick={() => router.push('/dashboard')}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium py-2 px-4 rounded-md transition duration-300"
            >
              View Dashboard
            </button>
          </div>
        </div>

        {/* Features Dropdown */}
        {featuresOpen && (
          <div
            className="absolute top-[11vh] left-0 w-full bg-gray-900 bg-opacity-95 backdrop-blur-lg shadow-xl"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((section, index) => (
                  <div key={index} className="space-y-4">
                    <h3 className="text-lg font-semibold text-yellow-400 border-b border-yellow-400 pb-2">
                      {section.title}
                    </h3>
                    <ul className="space-y-3">
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <Link
                            href={link.href}
                            className="text-gray-300 hover:text-white transition duration-300"
                            onClick={() => setFeaturesOpen(false)}
                          >
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Animated Underline */}
        <motion.div
          className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-yellow-400 to-transparent"
          initial={{ x: "-100%" }}
          animate={{
            x:
              hoveredLink === "home"
                ? "-25%"
                : hoveredLink === "dashboard"
                ? "0%"
                : hoveredLink === "upload"
                ? "25%"
                : "0%",
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </header>
    </>
  );
};

export default Header;