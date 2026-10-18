import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { read, write } from "../utils/storage";
const C = createContext(null);
export function StoreProvider({ children }) {
  const [cart, setCart] = useState(() => read("fc-cart", [])),
    [wishlist, setWishlist] = useState(() => read("fc-wishlist", [])),
    [user, setUser] = useState(() => read("fc-user", null)),
    [addresses, setAddresses] = useState(() => read("fc-addresses", [])),
    [orders, setOrders] = useState(() => read("fc-orders", []));
  useEffect(() => write("fc-cart", cart), [cart]);
  useEffect(() => write("fc-wishlist", wishlist), [wishlist]);
  useEffect(() => write("fc-user", user), [user]);
  useEffect(() => write("fc-addresses", addresses), [addresses]);
  useEffect(() => write("fc-orders", orders), [orders]);
  const add = (p, qty = 1) =>
    setCart((old) => {
      let found = old.find((x) => x.id === p.id);
      return found
        ? old.map((x) =>
            x.id === p.id ? { ...x, quantity: x.quantity + qty } : x,
          )
        : [...old, { ...p, quantity: qty }];
    });
  const remove = (id) => setCart((old) => old.filter((x) => x.id !== id)),
    quantity = (id, n) =>
      setCart((old) =>
        n < 1
          ? old.filter((x) => x.id !== id)
          : old.map((x) => (x.id === id ? { ...x, quantity: n } : x)),
      );
  const toggle = (p) =>
    setWishlist((old) =>
      old.some((x) => x.id === p.id)
        ? old.filter((x) => x.id !== p.id)
        : [...old, p],
    );
  const subtotal = cart.reduce((a, x) => a + x.price * x.quantity, 0),
    delivery = subtotal === 0 || subtotal >= 499 ? 0 : 40,
    total = subtotal + delivery;
  const value = useMemo(
    () => ({
      cart,
      setCart,
      add,
      remove,
      quantity,
      wishlist,
      toggle,
      user,
      setUser,
      addresses,
      setAddresses,
      orders,
      setOrders,
      subtotal,
      delivery,
      total,
      cartCount: cart.reduce((a, x) => a + x.quantity, 0),
    }),
    [cart, wishlist, user, addresses, orders, subtotal, delivery, total],
  );
  return <C.Provider value={value}>{children}</C.Provider>;
}
export const useStore = () => useContext(C);
