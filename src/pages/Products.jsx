import { useMemo, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Star, Leaf, ArrowRight, Heart, ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { getProducts, getProductById, searchProducts } from "../services/api";
import { getMockProductsByCategory } from "../data/mockProducts";
import { useStore } from "../context/StoreContext";
import { money } from "../utils/currency";
import {
  cats,
  ProductCard,
  ProductGrid,
  useLoad,
  Loading,
  LoadError,
} from "../components/shared";

export function Home() {
  const r = useLoad(async (signal) => {
    const result = await getProducts(30, 0, signal);
    return result.products;
  });
  return (
    <>
      <section className="bg-[#f0f7ec]">
        <div className="container py-10 md:py-16 grid md:grid-cols-2 items-center gap-5">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white text-[#168a55] text-xs font-bold">
              <Leaf size={14} /> FRESHNESS YOU CAN TASTE
            </span>
            <h1 className="text-4xl md:text-6xl font-black leading-[1.08] mt-5">
              Fresh groceries,
              <br />
              <span className="text-[#168a55]">delivered to</span>
              <br />
              your door.
            </h1>
            <p className="text-gray-600 mt-5 max-w-md">
              Handpicked produce and everyday favorites, brought to your home
              with care.
            </p>
            <Link to="/shop" className="btn-primary mt-7">
              Shop now <ArrowRight size={17} />
            </Link>
            <p className="text-xs text-gray-500 mt-4">
              ✓ Free delivery over ₹499 &nbsp; ✓ Freshness guaranteed
            </p>
          </div>
          <div className="relative h-64 md:h-[370px] rounded-[32px] bg-[#dcefdc] overflow-hidden flex items-center justify-center">
            <img
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1100&q=85"
              alt="Fresh colorful produce"
            />
            <div className="absolute bottom-5 left-5 bg-white rounded-2xl p-4 shadow-lg">
              <b className="text-[#168a55]">A little greener</b>
              <div className="text-xs text-gray-500 mt-1">
                Everyday good choices.
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container py-12">
        <div className="flex justify-between items-end mb-5">
          <div>
            <p className="eyebrow">FIND YOUR FAVORITES</p>
            <h2 className="section-title">Shop by category</h2>
          </div>
          <Link className="text-sm text-[#168a55] font-bold" to="/shop">
            All products →
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {cats.map(([name, emoji, , imageId]) => (
            <Link
              to={`/category/${encodeURIComponent(name)}`}
              key={name}
              className="bg-white border border-gray-100 rounded-2xl p-3 text-center hover:border-green-300 hover:-translate-y-1 transition"
            >
              <div className="relative h-20 overflow-hidden rounded-xl bg-[#f2f7ef]">
                <span
                  className="absolute inset-0 grid place-items-center text-3xl"
                  aria-hidden="true"
                >
                  {emoji}
                </span>
                <img
                  src={`https://images.unsplash.com/${imageId}?auto=format&fit=crop&w=240&h=160&q=75`}
                  alt=""
                  loading="lazy"
                  className="relative h-full w-full object-cover"
                  onError={(event) => {
                    const slug = name.toLowerCase().replace(/[^a-z]+/g, "-");
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = `/category-images/${slug}.svg`;
                  }}
                />
              </div>
              <div className="text-xs font-semibold mt-3">{name}</div>
            </Link>
          ))}
        </div>
      </section>
      <section className="container py-4">
        <div className="flex justify-between items-end mb-5">
          <div>
            <p className="eyebrow">PICKS FOR YOUR PANTRY</p>
            <h2 className="section-title">Popular products</h2>
          </div>
          <Link className="text-sm text-[#168a55] font-bold" to="/shop">
            View all →
          </Link>
        </div>
        {r.loading ? (
          <Loading />
        ) : r.error ? (
          <LoadError error={r.error} retry={r.retry} />
        ) : (
          <ProductGrid products={r.data.slice(0, 8)} />
        )}
      </section>
      <section className="container mt-12">
        <div className="rounded-3xl bg-[#fff3dd] p-7 md:p-10 flex justify-between items-center">
          <div>
            <span className="text-xs font-bold text-[#bd7820]">
              A LITTLE SOMETHING EXTRA
            </span>
            <h2 className="text-2xl md:text-3xl font-black mt-2">
              Good food, better days.
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Stock up on everyday favorites for less.
            </p>
          </div>
          <Link className="btn-primary" to="/shop">
            Explore deals <ArrowRight size={16} />
          </Link>
        </div>
      </section>
      <section className="container py-12 grid sm:grid-cols-3 gap-5">
        {[
          ["🚚", "Delivered with care", "Fresh picks arrive at your door."],
          ["🌱", "A fresher choice", "Discover good things for your table."],
          ["💚", "Made for your day", "Everyday essentials, made easy."],
        ].map((x) => (
          <div
            key={x[0]}
            className="bg-white rounded-2xl p-5 border border-gray-100 flex gap-4"
          >
            <span className="text-3xl">{x[0]}</span>
            <div>
              <b>{x[1]}</b>
              <p className="text-sm text-gray-500 mt-1">{x[2]}</p>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}

export function Catalog({ category }) {
  const [params, setParams] = useSearchParams(),
    query = params.get("q") || "",
    r = useLoad(
      (sig) =>
        category
          ? Promise.resolve(getMockProductsByCategory(category))
          : query
            ? searchProducts(query, sig)
            : getProducts(100, 0, sig).then((result) => result.products),
      [category, query],
    );
  const [sort, setSort] = useState("");
  let products = useMemo(() => {
    let a = [...r.data];
    if (params.get("stock")) a = a.filter((p) => p.stock > 0);
    if (params.get("discount")) a = a.filter((p) => p.discountPercentage > 10);
    if (params.get("rating")) a = a.filter((p) => p.rating >= 4);
    if (sort === "price-asc") a.sort((x, y) => x.price - y.price);
    if (sort === "price-desc") a.sort((x, y) => y.price - x.price);
    if (sort === "rating") a.sort((x, y) => y.rating - x.rating);
    if (sort === "name") a.sort((x, y) => x.title.localeCompare(y.title));
    return a;
  }, [r.data, params, sort]);
  return (
    <main className="container py-8">
      <div className="mb-7">
        <div className="eyebrow">
          {category ? "FIND YOUR FAVORITES" : "THE FRESHCART COLLECTION"}
        </div>
        <h1 className="text-3xl font-black mt-1">
          {category || (query ? `Results for “${query}”` : "All products")}
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          {products.length} products to explore
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="filter"
        >
          <option value="">Sort by</option>
          <option value="price-asc">Price: low to high</option>
          <option value="price-desc">Price: high to low</option>
          <option value="rating">Top rated</option>
          <option value="name">Name</option>
        </select>
        {[
          ["stock", "In stock"],
          ["discount", "On sale"],
          ["rating", "4+ stars"],
        ].map(([k, v]) => (
          <label key={k} className="filter flex items-center gap-2">
            <input
              type="checkbox"
              checked={!!params.get(k)}
              onChange={(e) => {
                let p = new URLSearchParams(params);
                e.target.checked ? p.set(k, "1") : p.delete(k);
                setParams(p);
              }}
            />
            {v}
          </label>
        ))}
        {[...params.keys()].length > 0 && (
          <button
            onClick={() => setParams({})}
            className="text-xs text-red-500 font-semibold"
          >
            Clear filters
          </button>
        )}
      </div>
      {r.loading ? (
        <Loading />
      ) : r.error ? (
        <LoadError error={r.error} retry={r.retry} />
      ) : (
        <ProductGrid products={products} />
      )}
    </main>
  );
}

export function SearchPage() {
  return <Catalog />;
}

export function ShopPage() {
  return <Catalog />;
}

export function CategoryPage() {
  const { category } = useParams();
  return <Catalog category={decodeURIComponent(category)} />;
}

export function ProductPage() {
  const { id } = useParams(),
    s = useStore(),
    r = useLoad((sig) => getProductById(id, sig), [id]);
  if (r.loading)
    return (
      <main className="container py-20">
        <Loading />
      </main>
    );
  if (r.error)
    return (
      <main className="container">
        <LoadError error={r.error} retry={r.retry} />
      </main>
    );
  let p = r.data;
  return (
    <main className="container py-10 grid md:grid-cols-2 gap-10">
      <div className="rounded-3xl bg-white border p-5 h-[380px] flex items-center justify-center">
        <img
          src={p.thumbnail}
          alt={p.title}
          className="product-image max-h-full max-w-full object-contain"
        />
      </div>
      <div className="py-3">
        <p className="eyebrow">{p.displayCategory}</p>
        <h1 className="text-3xl font-black mt-2">{p.title}</h1>
        <div className="flex gap-2 mt-3 text-sm text-amber-500">
          <Star size={16} fill="currentColor" />
          {p.rating}{" "}
          <span className="text-gray-400">· {p.stock} available</span>
        </div>
        <p className="text-gray-600 leading-7 mt-6">{p.description}</p>
        <div className="mt-6">
          <b className="text-3xl">{money(p.price)}</b>{" "}
          <span className="text-sm text-green-700">
            {Math.round(p.discountPercentage)}% off
          </span>
        </div>
        <div className="flex gap-3 mt-7">
          <button
            className="btn-primary"
            onClick={() => {
              s.add(p);
              toast.success("Added to cart");
            }}
          >
            Add to cart <ShoppingCart size={17} />
          </button>
          <button className="btn-secondary" onClick={() => s.toggle(p)}>
            <Heart size={17} /> Save
          </button>
        </div>
        <div className="mt-8 p-4 bg-green-50 rounded-xl text-sm text-green-900">
          Free delivery over ₹499 · Secure simulated checkout
        </div>
      </div>
    </main>
  );
}
