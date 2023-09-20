import { HashRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import History from "./pages/history";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
