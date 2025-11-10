// src/components/ProductList.js
import React, { useEffect, useState, useContext } from "react";
import API from "../api/api";
import ProductCard from "./ProductCard";
import { CartContext } from "./CartProvider";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    API.get("products/")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-center">Our Products</h2>
      <div className="row">
        {products.length > 0 ? (
          products.map((p) => (
            <ProductCard
              key={p.id}
              productId={p.id}
              name={p.name}
              price={p.price}
              oldPrice={p.oldPrice || null}
              image={p.image || "https://via.placeholder.com/200"}
              description={p.description || "No description available."}
              onAddToCart={() =>
                addToCart({
                  productId: p.id,
                  name: p.name,
                  price: p.price,
                  image: p.image,
                  qty: 1,
                })
              }
            />
          ))
        ) : (
          <p className="text-center">No products available right now.</p>
        )}
      </div>
    </div>
  );
}
