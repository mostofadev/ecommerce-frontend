"use client";

import Table from "../../ui/table/TableMain";
import TableHeader from "../../ui/table/TableHeader";
import TableHeadCell from "../../ui/table/TableHeadCell";
import TableBody from "../../ui/table/TableBody";
import TableRow from "../../ui/table/TableRow";
import TableCell from "../../ui/table/TableCell";
import TableActions from "../../ui/table/TableActions";
import { useBrandContext } from "@/app/context/BrandContext";
import { useEffect, useState } from "react";
import Pagination from "../../ui/pagination/pagination";
import AppImage from "../../ui/Image/AppImage";
import Loader from "../../ui/loader/pageSpinner";
import { useRouter } from "next/navigation";

// Dummy brand data


export default function BrandTable() {
  const URL_IMAGE = process.env.NEXT_PUBLIC_STORAGE_URL
  const {
      brand,
      getAllBrands,
      DeleteBrands,
      loading,
      pagination,
      error
  } = useBrandContext();
 const router = useRouter();
 const [currentPage, setCurrentPage] = useState(1);
 useEffect(()=> {
        getAllBrands(currentPage)
  },[currentPage])
const handlePageChange = (page) => {
    if (page >= 1 && page <= pagination.last_page) {
      setCurrentPage(page);
    }
  };

 const  handleDelete = (id) => {
  if (confirm('Are you sure to delete this category?')) {
       DeleteBrands(id)
      }
      
   }
  console.log(brand);
  console.log(pagination);
    if (loading) return <Loader/>;
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
          <TableHeadCell>Actions</TableHeadCell>
        </tr>
      </TableHeader>
      <TableBody>
        {brand.map((brand) => (
          <TableRow key={brand.id}>
            <TableCell>{brand.id}</TableCell>
            <TableCell>{brand.name}</TableCell>
            <TableCell>{brand.slug}</TableCell>
            <TableCell>
              <AppImage
                src={`${URL_IMAGE}${brand.image}`}
                alt={brand.slug}
                width={50}
                height={50}
                rounded="none"
              />
            </TableCell>
            
            <TableCell>
              <TableActions
                onEdit={() => router.push(`/admin/brand/update/${brand.id}`)}
                onDelete={() => handleDelete(brand.id)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    <Pagination pagination={pagination} onPageChange={handlePageChange}  />
  
  </>
  );
}
