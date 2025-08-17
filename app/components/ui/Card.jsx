// components/Card.jsx
export function Card({ children, className }) {
  return <div className={`rounded-lg border bg-white shadow p-4 ${className}`}>{children}</div>;
}
export function CardHeader({ children }) {
  return <div className="mb-2 font-bold text-lg">{children}</div>;
}
export function CardContent({ children }) {
  return <div>{children}</div>;
}
export function CardTitle({ children }) {
  return <h2 className="text-xl font-semibold">{children}</h2>;
}
export function CardDescription({ children }) {
  return <p className="text-gray-500">{children}</p>;
}

// components/Input.jsx
export function Input(props) {
  return <input {...props} className="border rounded px-3 py-2 w-full focus:outline-none focus:ring focus:border-blue-500" />;
}
