import { Route, Routes } from "react-router";

import "./App.scss";

import Home from "./pages/Home/Home";
import Dashboard from "./pages/Dashboard/Dashboard";
import Test from "./pages/Test/Test";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="results/:testId" element={<Test title="Results" />} />
        <Route path="finalize/:testId" element={<Test title="Finalize" />} />
      </Routes>
    </div>
  );
}

export default App;
