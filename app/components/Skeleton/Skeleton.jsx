export default function Skeleton({ className = "" }) {
  return (
    <div
      className={`relative overflow-hidden bg-gray-100 rounded-md ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 -translate-x-full   via-gray-50 to-transparent" />
      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}
