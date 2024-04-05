import axios from "axios";

const API_URL = "http://localhost:8080/api/products";
const user = localStorage.getItem("user");
const auth = user
  ? JSON.parse(user).token
  : "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjBmZGQ5NzgyZTlhMzJkYmQ1N2U3MjgiLCJlbWFpbCI6Imd1ZXN0MDAxQGZha2UuY29tIiwiaWF0IjoxNzEyMzE1ODE2fQ.EwnbMEgqkZpW80Jse2c9-OYz29Nx3zKmjII2AVblr7A";

class ProductService {
  post(formData) {
    return axios.post(API_URL, formData, {
      headers: {
        Authorization: auth,
        "Content-Type": "multipart/form-data",
      },
    });
  }
  patch(buyerId, productId, quantity) {
    return axios.patch(
      `${API_URL}/${buyerId}/${productId}`,
      {
        quantity,
      },
      { headers: { Authorization: auth } }
    );
  }
  async fetchHomepageData(url) {
    try {
      const response = await axios.get(url, {
        headers: { Authorization: auth },
      });
      const parsedData = response.data;
      return parsedData;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
  purchaseProduct(productId, buyerId, quantityToPurchase) {
    return axios.post(
      `${API_URL}/purchase/${productId}`,
      {
        buyerId: buyerId,
        buyers: {
          quantity: quantityToPurchase,
        },
      },
      {
        headers: { Authorization: auth },
      }
    );
  }
  acquireProductsByShopname(shopname) {
    return axios.get(`${API_URL}/shop/${shopname}`, {
      headers: { Authorization: auth },
    });
  }
}

export default new ProductService();
