import React from 'react';
import Header from 'home/Header';
import Footer from 'home/Footer';

export default function App() {
  return (
      <div className="text-3xl mx-auto max-w-6xl">
        <Header />
        <div className="my-10">Home Page Content</div>
        <Footer />
      </div>
  );
}


