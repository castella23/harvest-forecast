
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-secondary/20 px-4">
      <div className="text-center glass-card p-8 rounded-xl max-w-md w-full animate-fade-in">
        <h1 className="text-5xl font-display font-medium mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Button asChild className="button-hover">
          <Link to="/" className="flex items-center gap-2">
            <Home size={16} /> Return to Home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
