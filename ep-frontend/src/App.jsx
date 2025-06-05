import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MainContent } from "./pages/Home";
import { ClubDetail } from "./pages/ClubDetail";
import { Footer } from "./components/Footer/Footer";
import { NavBar } from "./components/NavBar";
import { MyBookings } from "./pages/MyBookings";
import { ClubsManagement } from "./pages/ClubsManagement";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
          <Route
            path="/"
            element={<MainContent />}
          />
          <Route
            path="/club/:id"
            element={<ClubDetail />}
          />
          <Route
            path="/clubs-management"
            element={<ClubsManagement />}
          />
          <Route
            path="/bookings"
            element={<MyBookings />}
          />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
