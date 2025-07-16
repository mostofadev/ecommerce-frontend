"use client"
import Image from "next/image";
import Layout from "./components/admin/layout/layout";
import TopMenu from "./components/page/header/TopMenu";
import MainMenu from "./components/page/header/MainMenu";
import BannerSlider from "./components/page/banner/banner";
import CategorySlider from "./components/page/category/CategorySlider";
import ProductGrid from "./components/page/product/ProductGrid";
import Footer from "./components/page/footer/footer";
import LayoutPage from "./components/ui/layout/layout";
import NewProduct from "./components/page/product/newProduct";
import BestSeller from "./components/page/product/bestProduct";

export default function Home() {
  return (
   <>
   <LayoutPage>
    <BannerSlider />
    <CategorySlider/>
    <ProductGrid />
    <NewProduct />
    <BestSeller />
   </LayoutPage>
   
   
   </>
  );
}
