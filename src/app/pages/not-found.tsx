import { Link } from "react-router";
import { Heart, Home } from "lucide-react";

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="w-24 h-24 rounded-full bg-[#FF9EC5] flex items-center justify-center mx-auto mb-8">
          <Heart className="w-12 h-12 text-white fill-white" />
        </div>
        <h1 className="text-6xl font-semibold text-foreground mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-foreground mb-3">Page not found</h2>
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Oops! It looks like this page got lost in translation. Let's get you back on track.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-white rounded-lg hover:bg-foreground/90 transition-colors font-medium"
        >
          <Home className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
