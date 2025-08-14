import Skeleton from "../Skeleton";

export default function UserProfileSkeleton() {
  return (
    <div className="flex justify-center px-4 mt-10 animate-pulse">
      <div className="rounded-xl p-6 sm:p-8 space-y-8 w-full max-w-3xl bg-white shadow">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 sm:gap-0">
          <Skeleton className="h-8 w-40 sm:w-60 rounded" />
          <Skeleton className="h-8 w-20 rounded" />
        </div>

        {/* Profile Image */}
        <div className="flex justify-center flex-row gap-6 md:gap-8">
          <div className="w-[150px] h-[150px] rounded-full overflow-hidden bg-gray-200">
            <Skeleton className="w-full h-full rounded-full" />
          </div>
        </div>

        {/* Form Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full rounded" />
          ))}

          {/* Optional image upload field placeholder */}
          {/* <Skeleton className="h-24 w-full sm:col-span-2 rounded" /> */}
        </div>

        {/* Buttons */}
        {/* <div className="flex justify-end gap-4 mt-4">
          <Skeleton className="h-10 w-24 rounded" />
          <Skeleton className="h-10 w-24 rounded" />
        </div> */}
      </div>
    </div>
  );
}
