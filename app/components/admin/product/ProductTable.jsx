"use client";
import Table from "../../ui/table/TableMain";
import TableHeader from "../../ui/table/TableHeader";
import TableHeadCell from "../../ui/table/TableHeadCell";
import TableBody from "../../ui/table/TableBody";
import TableRow from "../../ui/table/TableRow";
import TableCell from "../../ui/table/TableCell";
import TableActions from "../../ui/table/TableActions";
import { useProductContext } from "@/app/context/ProductContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Loader from "../../ui/loader/pageSpinner";
import Pagination from "../../ui/pagination/pagination";
import AppImage from "../../ui/Image/AppImage";
import SingleProductModal from "./SingleProductModal";

export default function ProductTable() {
  const {
    pagination,
    products,
    getAllProducts,
    loading,
    error,
    deleteProductHandler,
  } = useProductContext();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const URL_IMAGE = process.env.NEXT_PUBLIC_STORAGE_URL;

  useEffect(() => {
    getAllProducts(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.last_page) {
      setCurrentPage(page);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await deleteProductHandler(id);
    } catch (err) {
      console.error("Delete Error", err);
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <>
      <Table>
        <TableHeader>
          <tr>
            <TableHeadCell>ID</TableHeadCell>
            <TableHeadCell>SKU</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Price</TableHeadCell>
            <TableHeadCell>Quantity</TableHeadCell>
            <TableHeadCell>Image</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </tr>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.sku}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>৳{product.price}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>
                <AppImage
                  src={`${URL_IMAGE}${product.thumbnail}`}
                  alt={product.name}
                  className="w-10 h-10 object-cover rounded"
                />
              </TableCell>
              <TableCell>
                <TableActions
                  onView={() => setSelectedProduct(product)}
                  onEdit={() => router.push(`/admin/product/edit/${product.id}`)}
                  onDelete={() => handleDelete(product.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination pagination={pagination} onPageChange={handlePageChange} />

      {/* Product Details Modal */}
      {selectedProduct && (
        <SingleProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
