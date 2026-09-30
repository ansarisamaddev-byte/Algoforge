import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import Articles from './pages/Articles';
import Article from './pages/Article';
import DSA from './pages/DSA';
import SystemDesign from './pages/SystemDesign';
import AI from './pages/AI';
import Engineering from './pages/Engineering';
import NotFound from './pages/NotFound';

function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:bg-forge focus:text-on-forge focus:px-4 focus:py-2 font-mono text-xs">
        Skip to content
      </a>
      <ScrollManager />
      <Header />
      <main id="main" className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Articles />} />
          <Route path="/blog/:slug" element={<Article />} />
          <Route path="/dsa" element={<DSA />} />
          <Route path="/system-design" element={<SystemDesign />} />
          <Route path="/ai" element={<AI />} />
          <Route path="/engineering" element={<Engineering />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
