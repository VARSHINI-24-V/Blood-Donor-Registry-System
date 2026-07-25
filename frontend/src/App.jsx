import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Donors from "./pages/Donors";
import AddDonor from "./pages/AddDonor";
import DonationHistory from "./pages/DonationHistory";
import Eligibility from "./pages/Eligibility";
import EditDonor from "./pages/EditDonor";
import { Routes, Route } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <div className="container">
        <Sidebar />

        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/donors" element={<Donors />} />
            <Route path="/add-donor" element={<AddDonor />} />
            <Route path="/history" element={<DonationHistory />} />
            <Route path="/eligibility" element={<Eligibility />} />
            <Route path="/edit/:id" element={<EditDonor />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;