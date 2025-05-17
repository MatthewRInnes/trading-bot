import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Navbar from "./components/Navbar";

/**
 * Main application component
 * Sets up routing for the application
 */
const App = () => (
  <>
    {/* Navigation bar */}
    <Navbar />
    <Routes>
      {/* Main trading dashboard route */}
      <Route path="/" element={<Index />} />
      {/* Add all custom routes above the catch-all "*" route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

export default App;
