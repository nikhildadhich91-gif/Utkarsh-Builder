import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import { FadeUp } from '../components/ui/FadeUp';

export const NotFoundPage: React.FC = () => {
  useEffect(() => {
    document.title = "404 Page Not Found | Utkarsh Builder";
    
    // Set meta description dynamically
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'The page you are looking for does not exist. Return to Utkarsh Builder home page for premium construction services in Rajasthan.');
    }
  }, []);

  return (
    <main className="min-h-screen bg-[#FAF7F5] flex flex-col justify-center items-center px-6 relative overflow-hidden">
      {/* Terracotta blurred background blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#C92C15]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#C92C15]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full text-center space-y-8 relative z-10">
        <FadeUp delay={0.1}>
          <span className="text-9xl font-extrabold text-[#C92C15]/10 select-none block tracking-tighter">
            404
          </span>
        </FadeUp>

        <div className="space-y-4">
          <FadeUp delay={0.2}>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#111111] tracking-tight">
              Page Not Found
            </h1>
          </FadeUp>
          <FadeUp delay={0.3}>
            <p className="text-sm font-medium text-[#6F6F6F] leading-relaxed">
              We can't find the page you're looking for. It might have been moved, deleted, or never existed in the first place.
            </p>
          </FadeUp>
        </div>

        <FadeUp delay={0.4} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto bg-[#C92C15] text-white hover:bg-[#D43B13] transition-all py-3.5 px-6 rounded-xl font-semibold tracking-wide flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:scale-[1.02] active:scale-95 text-sm uppercase"
          >
            <Home className="h-4 w-4" />
            <span>Go to Home</span>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto bg-white text-black hover:bg-gray-50 border border-black/5 transition-all py-3.5 px-6 rounded-xl font-semibold tracking-wide flex items-center justify-center gap-2 cursor-pointer shadow-md hover:scale-[1.02] active:scale-95 text-sm uppercase"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Go Back</span>
          </button>
        </FadeUp>
      </div>
    </main>
  );
};

export default NotFoundPage;
