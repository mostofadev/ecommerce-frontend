import axios from "../lib/axiosInstance";

export const OrderAdminService = {
  async getAllOrders({ search = "", status = "", page = 1 }) {
    const response = await axios.get("/admin/orders", {
      params: { search, status, page },
    });
    return response.data.data;
  },

  async deleteOrder(id) {
    await axios.delete(`/admin/orders/${id}`);
  },

  async updateStatus(id, status) {
    return await axios.put(`/admin/orders/${id}`, { status });
  },

  async getSingleOrder(id) {
    const res = await axios.get(`/admin/orders/${id}`);
    return res.data.data;
  },

  async createOrder(payload) {
    const res = await axios.post("/admin/orders", payload);
    return res.data;
  },
};
