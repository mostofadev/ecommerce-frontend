"use client";
import LayoutPage from '@/app/components/ui/layout/layout';
import FilterMenu from '@/app/components/page/shop/FilterMenu';
import FilterProductGrid from '@/app/components/page/shop/FilterProductGrid';
import { ProductFilterProvider } from '@/app/context/ProductFilterContext';

export default function ShopPage() {
  return (
    <ProductFilterProvider>
      <LayoutPage>
        <div className="min-h-screen bg-white py-12 px-4 sm:px-8 lg:px-16">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/4">
              <FilterMenu />
            </div>
            <div className="w-full md:w-3/4">
              <FilterProductGrid />
            </div>
          </div>
        </div>
      </LayoutPage>
    </ProductFilterProvider>
  );
}
