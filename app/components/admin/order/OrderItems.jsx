"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/admin/order/Card";
import AppImage from "../../ui/Image/AppImage";

const OrderItemsSection = ({ order }) => {
  const URL_IMAGE = process.env.NEXT_PUBLIC_STORAGE_URL;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">Order Items ({order.items?.length || 0})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {order.items?.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border border-gray-200 rounded-lg p-4 shadow-sm"
          >
            {/* Left: Product Image + Info */}
            <div className="flex items-start gap-4 w-full sm:w-2/3">
              <AppImage
                src={
                  item.product?.thumbnail
                    ? `${URL_IMAGE}${item.product.thumbnail}`
                    : "/placeholder.png"
                }
                width={80}
                height={80}
                rounded="md"
                alt={item.product_name}
                className="object-cover border"
              />

              <div>
                <h4 className="text-lg font-semibold text-gray-800">{item.product_name}</h4>

                <div className="mt-2 text-sm text-gray-600 space-y-1">
                  <div>
                    <strong>SKU:</strong> {item.sku}
                  </div>
                  <div>
                    <strong>Quantity:</strong> {item.quantity}
                  </div>
                  <div className="flex items-center gap-3">
                    <strong>Variant:</strong>
                    <span className="flex items-center gap-1">
                      <span className="text-gray-500">Color:</span>
                      <span 
                        style={{
                            display: "inline-block",
                            width: "20px",
                            height: "20px",
                            backgroundColor: item.variant?.color || "transparent",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            marginLeft: "6px",
                            marginRight: "12px",
                            verticalAlign: "middle"
                        }}
                        ></span>
                    </span>
                    <span className="text-gray-500">Size: {item.variant?.size || "-"}</span>
                  </div>
                  <div>
                    <strong>Unit Price:</strong> ৳{Number(item.unit_price).toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Total Price */}
            <div className="text-right sm:text-center sm:w-1/3">
              <div className="text-lg font-bold text-gray-900">
                ৳{Number(item.total_price).toFixed(2)}
              </div>
              <div className="text-sm text-gray-500">Total Price</div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default OrderItemsSection;
