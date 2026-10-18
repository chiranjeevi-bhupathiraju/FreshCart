import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ShoppingCart,
  Minus,
  Plus,
  Trash2,
  ArrowRight,
  CheckCircle,
  RefreshCw,
} from "lucide-react";
import toast from "react-hot-toast";
import { useStore } from "../context/StoreContext";
import { money } from "../utils/currency";
import { ProductGrid, Empty, Summary } from "../components/shared";

export function CartPage() {
  const s = useStore();
  return (
    <main className="container py-10">
      <h1 className="text-3xl font-black">
        Your cart{" "}
        <span className="text-gray-400 text-lg">({s.cartCount} items)</span>
      </h1>
      {s.cart.length === 0 ? (
        <Empty
          icon="🛒"
          title="Your cart is waiting"
          desc="Add something fresh to get started."
          to="/shop"
          action="Start shopping"
        />
      ) : (
        <div className="grid lg:grid-cols-[1fr_360px] gap-8 mt-7">
          <div className="grid gap-3">
            {s.cart.map((p) => (
              <div
                key={p.id}
                className="bg-white border rounded-2xl p-4 flex gap-4 items-center"
              >
                <Link
                  to={`/product/${p.id}`}
                  className="w-20 h-20 rounded-xl bg-gray-50 flex items-center justify-center"
                >
                  <img
                    src={p.thumbnail}
                    className="product-image max-w-full max-h-full object-contain"
                  />
                </Link>
                <div className="flex-1">
                  <Link to={`/product/${p.id}`} className="font-bold">
                    {p.title}
                  </Link>
                  <div className="text-sm text-gray-500 mt-1">
                    {money(p.price)} each
                  </div>
                </div>
                <div className="flex items-center border rounded-lg">
                  <button
                    className="p-2"
                    onClick={() => s.quantity(p.id, p.quantity - 1)}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-sm w-6 text-center">{p.quantity}</span>
                  <button
                    className="p-2"
                    onClick={() => s.quantity(p.id, p.quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <b className="hidden sm:block w-24 text-right">
                  {money(p.price * p.quantity)}
                </b>
                <button
                  onClick={() => s.remove(p.id)}
                  aria-label="Remove item"
                  className="p-2 text-red-400"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            ))}
          </div>
          <Summary s={s} />
        </div>
      )}
    </main>
  );
}

export function WishlistPage() {
  const s = useStore();
  return (
    <main className="container py-10">
      <h1 className="text-3xl font-black mb-7">Your wishlist</h1>
      {s.wishlist.length ? (
        <ProductGrid products={s.wishlist} />
      ) : (
        <Empty
          icon="💚"
          title="Keep the good stuff close"
          desc="Save products here and come back whenever you're ready."
          to="/shop"
          action="Explore products"
        />
      )}
    </main>
  );
}

export function CheckoutPage() {
  const s = useStore(),
    nav = useNavigate(),
    [busy, setBusy] = useState(false);
  function place(e) {
    e.preventDefault();
    if (busy) return;
    if (!s.cart.length) {
      toast.error("Your cart is empty");
      return;
    }
    setBusy(true);
    let id = `FC${Date.now().toString().slice(-8)}`,
      o = {
        id,
        items: s.cart,
        total: s.total,
        createdAt: new Date().toISOString(),
        status: "Confirmed",
        address: e.target.address.value,
        slot: e.target.slot.value,
        payment: e.target.payment.value,
      };
    s.setOrders([o, ...s.orders]);
    s.setCart([]);
    nav(`/order-success/${id}`);
  }
  if (!s.cart.length)
    return (
      <main className="container">
        <Empty
          icon="🧺"
          title="Your cart is empty"
          desc="Add a few favorites before checkout."
          to="/shop"
          action="Browse products"
        />
      </main>
    );
  return (
    <main className="container py-10">
      <h1 className="text-3xl font-black">Checkout</h1>
      <form
        onSubmit={place}
        className="grid lg:grid-cols-[1fr_360px] gap-8 mt-7"
      >
        <div className="grid gap-5">
          <section className="panel">
            <h2 className="font-bold text-xl">Delivery details</h2>
            <label className="field-label">
              Full address
              <input
                name="address"
                required
                placeholder="House, street, area, city, PIN"
              />
            </label>
            <label className="field-label">
              Delivery slot
              <select name="slot">
                <option>Today, 5–7 PM</option>
                <option>Tomorrow, 9–11 AM</option>
                <option>Tomorrow, 5–7 PM</option>
              </select>
            </label>
          </section>
          <section className="panel">
            <h2 className="font-bold text-xl">Payment method</h2>
            <div className="grid sm:grid-cols-3 gap-3 mt-4">
              {["UPI", "Card", "Cash on delivery"].map((x) => (
                <label
                  key={x}
                  className="border rounded-xl p-3 text-sm flex gap-2"
                >
                  <input
                    type="radio"
                    name="payment"
                    value={x}
                    defaultChecked={x === "UPI"}
                  />
                  {x}
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Demo checkout. No real payment will be collected.
            </p>
          </section>
        </div>
        <aside className="panel h-fit">
          <h2 className="font-bold text-xl">Your order</h2>
          {s.cart.map((x) => (
            <div key={x.id} className="flex justify-between text-sm mt-3">
              <span>
                {x.title} × {x.quantity}
              </span>
              <span>{money(x.price * x.quantity)}</span>
            </div>
          ))}
          <div className="border-t mt-4 pt-4 flex justify-between font-bold">
            <span>Total</span>
            <span>{money(s.total)}</span>
          </div>
          <button
            disabled={busy}
            className="btn-primary w-full justify-center mt-5"
          >
            {busy ? "Placing order…" : "Place order"}
          </button>
        </aside>
      </form>
    </main>
  );
}

export function OrderSuccess() {
  const { orderId } = useParams();
  return (
    <main className="container text-center py-24">
      <CheckCircle size={62} className="mx-auto text-[#168a55]" />
      <h1 className="text-3xl font-black mt-5">Order confirmed!</h1>
      <p className="text-gray-500 mt-2">
        Thanks for shopping with FreshCart. Your order <b>{orderId}</b> is on
        its way.
      </p>
      <div className="flex justify-center gap-3 mt-7">
        <Link className="btn-primary" to={`/orders/${orderId}`}>
          View order
        </Link>
        <Link className="btn-secondary" to="/shop">
          Continue shopping
        </Link>
      </div>
    </main>
  );
}
