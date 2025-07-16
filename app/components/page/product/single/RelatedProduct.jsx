import ProductCard from "../productCard";

const products = [
  {
    id: 1,
    image: "/image/p2.avif",
    title: "Stylish Wireless Headphones with Noise Cancellation",
    price: 89.99,
    originalPrice: 129.99,
    discount: 30,
    rating: 4,
    reviewCount: 142,
    stock: 6,
    isNew: true,
    brand: "SoundMax",
    colors: ["#000000", "#ffffff", "#ff0000"],
  },
  {
    id: 2,
    image: "/image/p.avif",
    title: "Premium Over-Ear Headphones with Hi-Fi Sound",
    price: 109.99,
    originalPrice: 159.99,
    discount: 32,
    rating: 4.5,
    reviewCount: 189,
    stock: 8,
    isNew: false,
    brand: "AudioX",
    colors: ["#000000", "#666666", "#0099ff"],
  },
  {
    id: 3,
    image: "/image/p2.avif",
    title: "Comfortable Bluetooth Earbuds with Charging Case",
    price: 59.99,
    originalPrice: 79.99,
    discount: 25,
    rating: 3.5,
    reviewCount: 78,
    stock: 4,
    isNew: true,
    brand: "BeatPods",
    colors: ["#ff69b4", "#ffffff", "#000000"],
  },
  {
    id: 4,
    image: "/image/p2.avif",
    title: "Lightweight Sports Earphones with Mic",
    price: 39.99,
    originalPrice: 49.99,
    discount: 20,
    rating: 4,
    reviewCount: 98,
    stock: 12,
    isNew: false,
    brand: "RunTunes",
    colors: ["#00cc99", "#000000", "#ffcc00"],
  },
  {
    id: 5,
    image: "/image/p2.avif",
    title: "Noise Cancelling Studio Headphones",
    price: 199.99,
    originalPrice: 249.99,
    discount: 20,
    rating: 5,
    reviewCount: 301,
    stock: 2,
    isNew: true,
    brand: "StudioPro",
    colors: ["#000000", "#444444", "#ffffff"],
  },
];

export default function RelatedProducts() {
  return (
    <section className="mt-8">
      <h3 className="text-xl font-semibold mb-4">Related Products</h3>
      <div className="grid grid-cols-5 gap-4">

        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
}
