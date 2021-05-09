import { React, useEffect } from 'react';

export default function Dashboard() {
  useEffect(() => {
    document.title = 'Dashboard - BTAkademi Instagram Clone';
  });

  return (
    <div className="bg-gray-background">
      <div className="mx-auth max-w-screen-lg">
        <p className="text-center text-2xl">Dashboard!</p>
      </div>
    </div>
  );
}
