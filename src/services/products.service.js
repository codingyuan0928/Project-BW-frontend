import axios from "axios";

const API_URL = "https://backend-app-igahudbo5a-de.a.run.app/api/products";
const user = localStorage.getItem("user");
const auth = user ? JSON.parse(user).token : null;

class ProductService {
  post(imgUrl, title, categories, description, inventory, price, shopname) {
    return axios.post(
      API_URL,
      {
        imgUrl,
        title,
        categories,
        description,
        inventory,
        price,
        shopname,
      },
      { headers: { Authorization: auth } }
    );
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
