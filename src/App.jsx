import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import CompleteRegistration from "./pages/CompleteRegistration.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ArticlePage from "./pages/ArticlePage.jsx";
import CategoryPage from "./pages/CategoryPage.jsx";
import Contact from "./pages/Contact.jsx";
import SearchPage from "./pages/SearchPage.jsx";
import OAuthSuccess from "./components/OAuthSuccess.jsx";
import Layout from "./components/Layout.jsx";

function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Routes>
        <Route element={<Layout />}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/contact" element={<Contact />} />

          {/* Dynamic Routes */}
          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/category/:category" element={<CategoryPage />} />

          {/* Feature Routes */}
          <Route path="/search" element={<SearchPage />} />
          <Route path="/oauthsuccess" element={<OAuthSuccess />} />

          {/* Fixed Typo Here ✅ */}
          <Route
            path="/complete-registration"
            element={<CompleteRegistration />}
          />

          {/* Dashboard (later you can protect this) */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* 404 Route */}
          <Route
            path="*"
            element={<h1 className="text-center p-10">404 - Page Not Found</h1>}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
