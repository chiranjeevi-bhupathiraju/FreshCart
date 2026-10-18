import { Route, Routes } from "react-router-dom";
import { Header, Footer } from "./components/shared";
import {
  Home,
  ShopPage,
  SearchPage,
  CategoryPage,
  ProductPage,
} from "./pages/Products";
import {
  CartPage,
  WishlistPage,
  CheckoutPage,
  OrderSuccess,
} from "./pages/Shopping";
import { OrdersPage, OrderDetails } from "./pages/Orders";
import {
  ProfilePage,
  AddressesPage,
  LoginPage,
  SignupPage,
  NotFound,
} from "./pages/Account";

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/category/:category" element={<CategoryPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success/:orderId" element={<OrderSuccess />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/orders/:orderId" element={<OrderDetails />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/addresses" element={<AddressesPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}
