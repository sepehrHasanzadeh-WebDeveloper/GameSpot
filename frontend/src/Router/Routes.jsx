import { Suspense, lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
const Home = lazy(() => import("../Pages/Home/Home"));
const GiftCards = lazy(() => import("../Pages/GiftCards/GiftCards"));
const Consoles = lazy(() => import("../Pages/ConsolesProduct/Consoles"));

const AllGames = lazy(() => import("../Pages/AllGames/AllGames"));
const Login = lazy(() => import("../Pages/Login/Login"));
const UserPanel = lazy(() => import("../Components/Panel/UserPanel"));
const AdminPanel = lazy(() => import("../Components/Admin/AdminPanel"));
const ProductPage = lazy(() => import("../Pages/ProductPage/ProductPage"));
const ProductGiftCard = lazy(() => import("../Pages/ProductPage/ProductGiftCard"));
const DisksPage = lazy(() => import("../Pages/ProductPage/DisksPage"));
const ConsolePage = lazy(() => import("../Pages/ProductPage/ConsolePage"));
const CartPage = lazy(() => import("../Pages/Cart/CartPage"));
const PaymentPage = lazy(() => import("../Pages/PaymentPage/PaymentPage"));
const AddGiftCards = lazy(() => import("../Components/Admin/Add-EditProduct/AddGiftCards"));
const AddConsole = lazy(() => import("../Components/Admin/Add-EditProduct/ConsoleCards"));
const AddDisk = lazy(() => import("../Components/Admin/Add-EditProduct/AddDisk"));
const NotFound = lazy(() => import("../Components/NotFound/NotFound"))
import NavBar from "../Components/Header/NavBar";
import ProtectedRoute from "./ProtectRoute";
import AdminRoute from "./AdminRoute";

import LoadingCard from "../Components/LoadingCard/LoadingCard";
function AppRoutes() {
  const location = useLocation();
  // useEffect(() => {
  //   axios.post("http://localhost:6500/visit/track", {
  //     path: location.pathname,
  //   });
  // }, [location.pathname]);
  const hideNavBar = location.pathname === "/api/Paymentgateway";
  const hideNavBarForAdmin = location.pathname === "/admin-panel";
  const lostWay = location.pathname === "/*";
  return (
    <>
      {!hideNavBar && !hideNavBarForAdmin && !lostWay && <NavBar />}
      <Suspense fallback={<LoadingCard/>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/GiftCards" element={<GiftCards />} />
        <Route path="/AllConsoles" element={<Consoles />} />
       
        <Route path="/AllGames" element={<AllGames />} />
       
        <Route path="/Submit" element={<Login />} />
        <Route
          path="/userpanel"
          element={
            <ProtectedRoute>
              <UserPanel />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-panel"
          element={
            <AdminRoute>
              <AdminPanel />
            </AdminRoute>
          }
        />
        <Route path="/product-Newitem" element={<ProductPage />} />
        <Route path="/product-giftcard" element={<ProductGiftCard />} />
        <Route path="/product-disk" element={<DisksPage />} />
        <Route path="/product-console" element={<ConsolePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/api/Paymentgateway" element={<PaymentPage />} />
        <Route
          path="/admin-panel/add/giftcard"
          element={
            <AdminRoute>
              <AddGiftCards />
            </AdminRoute>
          }
        />
        <Route
          path="/admin-panel/add/console"
          element={
            <AdminRoute>
              <AddConsole />
            </AdminRoute>
          }
        />
        <Route
          path="/admin-panel/add/disk"
          element={
            <AdminRoute>
              <AddDisk />
            </AdminRoute>
          }
        />
      <Route path="/*" element={<NotFound/>} />
      </Routes>
      </Suspense>
    </>
  );
}
export default AppRoutes;
