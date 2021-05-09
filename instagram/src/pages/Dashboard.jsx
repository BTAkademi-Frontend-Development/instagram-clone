import { React, useEffect } from 'react';
import Header from '../components/Header';
import Timeline from '../components/Timeline';
import Sidebar from '../components/Sidebar';

export default function Dashboard() {
  useEffect(() => {
    document.title = 'Dashboard - BTAkademi Instagram Clone';
  });

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="grid">
        <Timeline />
        <Sidebar />
      </div>
    </div>
  );
}
