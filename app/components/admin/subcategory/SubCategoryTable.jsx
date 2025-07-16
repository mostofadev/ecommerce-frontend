"use client";

import Table from "../../ui/table/TableMain";
import TableHeader from "../../ui/table/TableHeader";
import TableHeadCell from "../../ui/table/TableHeadCell";
import TableBody from "../../ui/table/TableBody";
import TableRow from "../../ui/table/TableRow";
import TableCell from "../../ui/table/TableCell";
import TableActions from "../../ui/table/TableActions";
import { useSubCategoryContext } from "../../../context/SubCategoryContext";
import { useEffect, useState } from "react";
import Pagination from "../../ui/pagination/pagination";
import AppImage from "../../ui/Image/AppImage";
import Loader from "../../ui/loader/pageSpinner";
import { useRouter } from "next/navigation";

export default function SubCategoryTable() {
  const URL_IMAGE = process.env.NEXT_PUBLIC_STORAGE_URL;

  const {
    subCategories,
    getAllSubCategories,
    deleteSubCategoryHandler,
    loading,
    pagination,
    error,
  } = useSubCategoryContext();

  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getAllSubCategories(currentPage);
  }, [currentPage]);
console.log(subCategories);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.last_page) {
      setCurrentPage(page);
    }
  };
console.log(subCategories);

  const handleDelete = (id) => {
    if (confirm("Are you sure to delete this sub-category?")) {
      deleteSubCategoryHandler(id);
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
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Slug</TableHeadCell>
            <TableHeadCell>Image</TableHeadCell>
            <TableHeadCell>Category</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </tr>
        </TableHeader>
        <TableBody>
          {subCategories.map((subCategory) => (
            <TableRow key={subCategory.id}>
              <TableCell>{subCategory.id}</TableCell>
              <TableCell>{subCategory.name}</TableCell>
              <TableCell>{subCategory.slug}</TableCell>
              {/* <TableCell>{URL_IMAGE}{subCategory.image}</TableCell> */}
              <TableCell>
                <AppImage
                  src={`${URL_IMAGE}/${subCategory.image}`}
                  alt={subCategory.slug}
                  width={48}
                  height={48}
                  rounded="full"
                />
              </TableCell>
              <TableCell>{subCategory.category?.name || "N/A"}</TableCell>
              <TableCell>
                <TableActions
                  onEdit={() => router.push(`/admin/subcategory/update/${subCategory.id}`)}
                  onDelete={() => handleDelete(subCategory.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Pagination pagination={pagination} onPageChange={handlePageChange} />
    </>
  );
}
