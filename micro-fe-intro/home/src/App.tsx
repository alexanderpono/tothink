import React from 'react';
import { Provider } from 'react-redux';

import store from './store';
import Header from './Header';
import Footer from './Footer';

export default function App() {
  return (
    <Provider store={store}>
      <div className="text-3xl mx-auto max-w-6xl">
        <Header />
        <div className="my-10">Home Page Content</div>
        <Footer />
      </div>
    </Provider>
  );
}


