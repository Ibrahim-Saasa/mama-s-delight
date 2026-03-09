import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import { CartProvider } from "./hooks/useCart";
import { Suspense, lazy } from "react";
import CuteLoader from "./components/CuteLoader";
import PageTransition from "./components/PageTransition";

const Index = lazy(() => import("./pages/Index"));
const Menu = lazy(() => import("./pages/Menu"));
const Auth = lazy(() => import("./pages/Auth"));
const Profile = lazy(() => import("./pages/Profile"));
const CuisineDetail = lazy(() => import("./pages/CuisineDetail"));
const About = lazy(() => import("./pages/About"));
const Cuisines = lazy(() => import("./pages/Cuisines"));
const Checkout = lazy(() => import("./pages/Checkout"));
const MenuItemDetail = lazy(() => import("./pages/MenuItemDetail"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPostDetail = lazy(() => import("./pages/BlogPostDetail"));
const CreateBlogPost = lazy(() => import("./pages/CreateBlogPost"));
const Desserts = lazy(() => import("./pages/Desserts"));
const Cafe = lazy(() => import("./pages/Cafe"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<CuteLoader />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/menu/:slug" element={<MenuItemDetail />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/cuisines" element={<Cuisines />} />
                <Route path="/cuisine/:slug" element={<CuisineDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/new" element={<CreateBlogPost />} />
                <Route path="/blog/:id" element={<BlogPostDetail />} />
                <Route path="/desserts" element={<Desserts />} />
                <Route path="/cafe" element={<Cafe />} />
                <Route path="/checkout" element={<Checkout />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
