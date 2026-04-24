import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
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
import OAuthSuccess from "./components/OAuthSuccess";

function App() {
  return (
    <>
      <div className="bg-gray-100">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/article/:id" element={<ArticlePage />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/complete-registration"
              element={<CompleteRegistration />}
            />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/oauthsuccess" element={<OAuthSuccess />} />
            <Route path="/search" element={<Search />} />
          </Route>
        </Routes>
      </div>
    </>
  );
}

export default App;
