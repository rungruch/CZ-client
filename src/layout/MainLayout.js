import { Outlet } from "react-router-dom";
import "../App.css";
import Navbar from "../component/Nav";
import { AuthProvider } from "../utils/AuthProvider";

const MainLayout = () => {
  return (
    <AuthProvider>
      <div className="main-container unselectable">
        <Navbar />
        <div className="container">
          <Outlet /> {/* your content will be shown in the Outlet */}
        </div>
      </div>
    </AuthProvider>
  );
};

export default MainLayout;
