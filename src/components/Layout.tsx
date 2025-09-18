import React, { useState } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import MapContainer from './MapContainer';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <Header onMenuToggle={toggleSidebar} />
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        {/* Map Area */}
        <main className="flex-1 p-4 lg:p-6">
          <MapContainer />
        </main>
      </div>
    </div>
  );
};

export default Layout;