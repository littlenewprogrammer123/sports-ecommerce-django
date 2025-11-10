import React from "react";
import "./Testimonials.css"; // import the CSS you pasted

const testimonials = [
  {
    name: "Rahul K.",
    message:
      "Best sports shop ever! Got my cricket bat at a great price and delivery was super fast 🏏🔥",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    stars: 5,
  },
  {
    name: "Sneha P.",
    message:
      "Amazing collection of jerseys. The quality is premium and I love the discounts 💯",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    stars: 4,
  },
  {
    name: "Arjun M.",
    message:
      "Customer service is top-notch. Got my football kit in 2 days. Highly recommend ⚽",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-5 bg-light">
      <div className="container text-center">
        <h2 className="fw-bold mb-4">💬 What Our Customers Say</h2>
        <div className="row justify-content-center g-4">
          {testimonials.map((t, index) => (
            <div className="col-md-4" key={index}>
              <div className="card">
                <div className="header">
                  <img src={t.image} alt={t.name} className="image" />
                  <div>
                    <div className="stars">
                      {Array.from({ length: t.stars }).map((_, i) => (
                        <svg
                          key={i}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                        </svg>
                      ))}
                    </div>
                    <p className="name">{t.name}</p>
                  </div>
                </div>
                <p className="message">{t.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
