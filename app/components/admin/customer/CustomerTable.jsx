"use client";

import Table from "../../ui/table/TableMain";
import TableHeader from "../../ui/table/TableHeader";
import TableHeadCell from "../../ui/table/TableHeadCell";
import TableBody from "../../ui/table/TableBody";
import TableRow from "../../ui/table/TableRow";
import TableCell from "../../ui/table/TableCell";
import TableActions from "../../ui/table/TableActions";

// Dummy customer data
const dummyCustomers = [
  {
    id: "c001",
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "01711-123456",
    totalOrders: 5,
    status: "Active",
  },
  {
    id: "c002",
    name: "Bob Smith",
    email: "bob@example.com",
    phone: "01822-654321",
    totalOrders: 2,
    status: "Inactive",
  },
  {
    id: "c003",
    name: "Charlie Davis",
    email: "charlie@example.com",
    phone: "01933-987654",
    totalOrders: 9,
    status: "Active",
  },
];

export default function CustomerTable() {
  return (
    <Table>
      <TableHeader>
        <tr>
          <TableHeadCell>ID</TableHeadCell>
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>Email</TableHeadCell>
          <TableHeadCell>Phone</TableHeadCell>
          <TableHeadCell>Total Orders</TableHeadCell>
          <TableHeadCell>Status</TableHeadCell>
          <TableHeadCell>Actions</TableHeadCell>
        </tr>
      </TableHeader>
      <TableBody>
        {dummyCustomers.map((customer) => (
          <TableRow key={customer.id}>
            <TableCell>{customer.id}</TableCell>
            <TableCell>{customer.name}</TableCell>
            <TableCell>{customer.email}</TableCell>
            <TableCell>{customer.phone}</TableCell>
            <TableCell>{customer.totalOrders}</TableCell>
            <TableCell>
              <span
                className={`px-2 py-1 text-xs rounded-full font-medium
                ${customer.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"}`}
              >
                {customer.status}
              </span>
            </TableCell>
            <TableCell>
              <TableActions
                onView={() => alert("View " + customer.id)}
                onEdit={() => alert("Edit " + customer.id)}
                onDelete={() => alert("Delete " + customer.id)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
