import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import UserPage from "../pages/UserPage";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/user-details" element={<UserPage />} />
    </Routes>
  );
};
