"use client";

import Table from "../../../ui/table/TableMain";
import TableHeader from "../../../ui/table/TableHeader";
import TableHeadCell from "../../../ui/table/TableHeadCell";
import TableBody from "../../../ui/table/TableBody";
import TableRow from "../../../ui/table/TableRow";
import TableCell from "../../../ui/table/TableCell";
import TableActions from "../../../ui/table/TableActions";
import { useBannerContext } from "@/app/context/BannerContext";
import { useEffect, useState } from "react";
import Pagination from "../../../ui/pagination/pagination";
import AppImage from "../../../ui/Image/AppImage";
import Loader from "../../../ui/loader/pageSpinner";
import { useRouter } from "next/navigation";

export default function BannerTable() {
  const URL_IMAGE = process.env.NEXT_PUBLIC_STORAGE_URL;
  const {
    banners,
    getAllBannersHandler,
    deleteBannerHandler,
    loading,
    pagination,
    error,
  } = useBannerContext();

  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getAllBannersHandler(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.last_page) {
      setCurrentPage(page);
    }
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure to delete this banner?")) {
      deleteBannerHandler(id);
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
            <TableHeadCell>Title</TableHeadCell>
            <TableHeadCell>Position</TableHeadCell>
            <TableHeadCell>Type</TableHeadCell>
            <TableHeadCell>Image</TableHeadCell>
            <TableHeadCell>Status</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </tr>
        </TableHeader>
        <TableBody>
          {banners.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.position}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>
                <AppImage
                  src={`${URL_IMAGE}${item.image}`}
                  alt={item.title}
                  width={48}
                  height={48}
                  loading="lazy"
                  rounded="none"
                  ImageClass="object-cover  border"
                />
              </TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 text-xs rounded ${
                    item.status ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.status ? "Active" : "Inactive"}
                </span>
              </TableCell>
              <TableCell>
                <TableActions
                  onEdit={() => router.push(`/admin/setting/banner/edit/${item.id}`)}
                  onDelete={() => handleDelete(item.id)}
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
