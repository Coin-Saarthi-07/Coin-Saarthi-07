import api from "./api";

const createInvoice = async (invoiceData) => {
  try {
    const response = await api.post("/crypto/admin/invoices", invoiceData);
    return response.data;
  } catch (error) {
    console.error("Error creating invoice:", error);
    throw error;
  }
};

export default {
  createInvoice,
};
