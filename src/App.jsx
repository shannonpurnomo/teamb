import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import SensePredict from "./components/SensePredict";
import Optimize from "./components/Optimize";
import Simulate from "./components/Simulate";
import Govern from "./components/Govern";
import Learn from "./components/Learn";

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [selectedBundleForSimulate, setSelectedBundleForSimulate] = useState(null);

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <Dashboard setPage={setPage} />;
      case "sense":
        return <SensePredict />;
      case "optimize":
        return <Optimize setPage={setPage} setSelectedBundleForSimulate={setSelectedBundleForSimulate} />;
      case "simulate":
        return <Simulate selectedBundle={selectedBundleForSimulate} />;
      case "govern":
        return <Govern setPage={setPage} />;
      case "learn":
        return <Learn setPage={setPage} />;
      default:
        return <Dashboard setPage={setPage} />;
    }
  };

  return (
    <div className="app-shell">
      <Sidebar current={page} setPage={setPage} />
      <div className="main-content">
        {renderPage()}
      </div>
    </div>
  );
}