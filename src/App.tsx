import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "@/contexts/auth_context";
import { ThemeProvider } from "@/contexts/theme_context";

import Header from "@/components/header";

import HomePage from "@/pages/home_page";
import LoginPage from "@/pages/login_page";
import RegisterPage from "@/pages/register_page";
import BookDetailPage from "@/pages/book_detail_page";
import BookshelfPage from "@/pages/bookshelf_page";
import ReaderPage from "@/pages/reader_page";
import ProfilePage from "@/pages/profile_page";
import NotFound from "@/pages/NotFound";

const query_client = new QueryClient();

const App = () => (
  <QueryClientProvider client={query_client}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/book/:id" element={<BookDetailPage />} />
              <Route path="/bookshelf" element={<BookshelfPage />} />
              <Route path="/reader/:id" element={<ReaderPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
