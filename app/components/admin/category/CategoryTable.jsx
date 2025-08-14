"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCategoryContext } from "@/app/context/CategoryContext";

import Table from "../../ui/table/TableMain";
import TableHeader from "../../ui/table/TableHeader";
import TableHeadCell from "../../ui/table/TableHeadCell";
import TableBody from "../../ui/table/TableBody";
import TableRow from "../../ui/table/TableRow";
import TableCell from "../../ui/table/TableCell";
import TableActions from "../../ui/table/TableActions";
import Pagination from "../../ui/pagination/pagination";
import Image from "next/image";
import Loader from "../../ui/loader/pageSpinner";
import AppImage from "../../ui/Image/AppImage";

export default function CategoryTable() {
  const router = useRouter();
  const URL_IMAGE = process.env.NEXT_PUBLIC_STORAGE_URL;

  const {
    categories,
    getAllCategories,
    DeleteCategory,
    pagination,
    loading,
    error,
  } = useCategoryContext();

  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    getAllCategories(currentPage);
  }, [currentPage]);

  const handleDelete = (id) => {
    if (confirm("Are you sure to delete this category?")) {
      DeleteCategory(id).then(() => {
        getAllCategories(currentPage); // refresh current page
      });
    }
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.last_page) {
      setCurrentPage(page);
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="p-4 text-red-500">Error: {error}</p>;

  return (
    <>
      <Table>
        <TableHeader>
          <tr>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Slug</TableHeadCell>
            <TableHeadCell>Image</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </tr>
        </TableHeader>
        <TableBody>
          {Array.isArray(categories) && categories?.length > 0 ? (
            categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>
                  {typeof category.slug === "string"
                    ? category.slug
                    : typeof category.slug === "object" && category.slug.slug
                    ? category.slug.slug
                    : "No Slug"}
                </TableCell>
                <TableCell>
                  {category.image ? (
                    <AppImage
                      src={`${URL_IMAGE}${category.image}`}
                      alt={category.name}
                      className="w-10 h-10 object-cover rounded"
                      width={50}
                      height={50}
                      rounded="none"
                    />
                  ) : (
                    <span>No image</span>
                  )}
                </TableCell>
                <TableCell>
                  <TableActions
                    onEdit={() => router.push(`/admin/category/${category.id}`)}
                    onDelete={() => handleDelete(category.id)}
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                No categories found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </>
  );
}
