import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import Home from "./Home";
import Dashboard from "./components/Dashboard";
import { ThemeProvider } from "./components/theme-provider";

function App() {

  return (
    <ThemeProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
    </ThemeProvider>
  );
}

export default App;