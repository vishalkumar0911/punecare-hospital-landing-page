import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import RoomsPage from "./pages/RoomsPage";
import DoctorsPage from "./pages/DoctorsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import BookingConfirmationPage from "./pages/BookingConfirmationPage";
import NotFoundPage from "./pages/NotFoundPage";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/"         element={<HomePage />}             />
        <Route path="/rooms"    element={<RoomsPage />}            />
        <Route path="/doctors"  element={<DoctorsPage />}          />
        <Route path="/about"    element={<AboutPage />}            />
        <Route path="/contact"  element={<ContactPage />}          />
        <Route path="/booking-confirmation" element={<BookingConfirmationPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}