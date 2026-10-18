import { Link, useNavigate } from "react-router-dom";
import { User, Package, MapPin, LogOut } from "lucide-react";
import toast from "react-hot-toast";
import { useStore } from "../context/StoreContext";
import { Empty } from "../components/shared";

export function ProfilePage() {
  const s = useStore();
  if (!s.user)
    return (
      <Empty
        icon="👋"
        title="Welcome to FreshCart"
        desc="Sign in to see your account."
        to="/login"
        action="Sign in"
      />
    );
  return (
    <main className="container py-10">
      <h1 className="text-3xl font-black">My account</h1>
      <div className="panel mt-6 max-w-xl">
        <div className="flex items-center gap-4">
          <div className="bg-green-100 text-green-800 rounded-full p-4">
            <User />
          </div>
          <div>
            <h2 className="font-bold text-xl">{s.user.name}</h2>
            <p className="text-sm text-gray-500">{s.user.email}</p>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 gap-3 mt-6">
          <Link className="btn-secondary" to="/orders">
            <Package size={17} /> My orders
          </Link>
          <Link className="btn-secondary" to="/addresses">
            <MapPin size={17} /> Addresses
          </Link>
        </div>
        <button
          className="mt-6 text-sm text-red-500 flex gap-2"
          onClick={() => {
            s.setUser(null);
            toast.success("Signed out");
          }}
        >
          <LogOut size={16} /> Sign out
        </button>
      </div>
    </main>
  );
}

export function LoginPage() {
  const s = useStore(),
    nav = useNavigate();
  return (
    <main className="container py-16">
      <form
        className="panel max-w-md mx-auto"
        onSubmit={(e) => {
          e.preventDefault();
          let f = new FormData(e.target);
          s.setUser({
            name: f.get("name") || f.get("email").split("@")[0],
            email: f.get("email"),
          });
          toast.success("You are signed in");
          nav("/profile");
        }}
      >
        <p className="eyebrow">WELCOME BACK</p>
        <h1 className="text-3xl font-black mt-1">Sign in</h1>
        <label className="field-label">
          Name
          <input name="name" placeholder="Your name" />
        </label>
        <label className="field-label">
          Email
          <input
            type="email"
            name="email"
            required
            placeholder="you@example.com"
          />
        </label>
        <label className="field-label">
          Password
          <input
            type="password"
            required
            minLength="4"
            placeholder="At least 4 characters"
          />
        </label>
        <button className="btn-primary w-full justify-center mt-5">
          Sign in
        </button>
        <p className="text-xs text-gray-500 mt-4">
          Demo sign in only. Use any email and password.
        </p>
      </form>
    </main>
  );
}

export function SignupPage() {
  return <LoginPage />;
}

export function AddressesPage() {
  const s = useStore();
  return (
    <main className="container py-10">
      <h1 className="text-3xl font-black">Saved addresses</h1>
      <form
        className="panel max-w-xl mt-6"
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.target;
          const addr = form.address.value;
          s.setAddresses([...s.addresses, addr]);
          form.reset();
          toast.success("Address saved");
        }}
      >
        <label className="field-label">
          Address
          <textarea
            name="address"
            required
            placeholder="House, street, area, city, PIN"
          />
        </label>
        <button className="btn-primary mt-3">Save address</button>
      </form>
      <div className="grid gap-3 max-w-xl mt-5">
        {s.addresses.map((a, i) => (
          <div key={i} className="panel flex justify-between">
            {a}
            <button
              className="text-red-500"
              onClick={() =>
                s.setAddresses(s.addresses.filter((_, j) => j !== i))
              }
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}

export function NotFound() {
  return (
    <main className="container text-center py-24">
      <h1 className="text-6xl font-black text-[#168a55]">404</h1>
      <p className="text-gray-500 mt-3">This aisle doesn't exist.</p>
      <Link className="btn-primary inline-flex mt-6" to="/">
        Back to FreshCart
      </Link>
    </main>
  );
}
