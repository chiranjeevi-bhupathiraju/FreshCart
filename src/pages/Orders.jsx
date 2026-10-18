import { Link, useParams } from "react-router-dom";
import { RefreshCw } from "lucide-react";
import toast from "react-hot-toast";
import { useStore } from "../context/StoreContext";
import { money } from "../utils/currency";
import { Empty } from "../components/shared";

export function OrdersPage() {
  const s = useStore();
  return (
    <main className="container py-10">
      <h1 className="text-3xl font-black">Your orders</h1>
      {!s.orders.length ? (
        <Empty
          icon="📦"
          title="No orders yet"
          desc="Your completed orders will show up here."
          to="/shop"
          action="Start shopping"
        />
      ) : (
        <div className="grid gap-3 mt-7">
          {s.orders.map((o) => (
            <Link
              to={`/orders/${o.id}`}
              className="panel flex justify-between items-center"
              key={o.id}
            >
              <div>
                <b>Order {o.id}</b>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(o.createdAt).toLocaleString()} · {o.items.length}{" "}
                  items
                </p>
              </div>
              <div className="text-right">
                <b>{money(o.total)}</b>
                <p className="text-xs text-green-700 mt-1">{o.status}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

export function OrderDetails() {
  const { orderId } = useParams(),
    s = useStore(),
    o = s.orders.find((x) => x.id === orderId);
  if (!o)
    return (
      <main className="container">
        <Empty
          icon="📦"
          title="Order not found"
          desc="This order isn't in your saved history."
          to="/orders"
          action="Order history"
        />
      </main>
    );
  return (
    <main className="container py-10">
      <p className="eyebrow">ORDER CONFIRMED</p>
      <h1 className="text-3xl font-black">Order {o.id}</h1>
      <div className="panel mt-6">
        <p>
          {o.status} · {new Date(o.createdAt).toLocaleString()}
        </p>
        <p className="mt-2 text-sm text-gray-500">{o.address}</p>
        {o.items.map((p) => (
          <div className="flex justify-between border-t mt-4 pt-3" key={p.id}>
            <span>
              {p.title} × {p.quantity}
            </span>
            <span>{money(p.price * p.quantity)}</span>
          </div>
        ))}
        <b className="block text-right mt-5">Total {money(o.total)}</b>
        <button
          className="btn-primary mt-5"
          onClick={() => {
            o.items.forEach((x) => s.add(x, x.quantity));
            toast.success("Items added to cart");
          }}
        >
          Order again <RefreshCw size={16} />
        </button>
      </div>
    </main>
  );
}
