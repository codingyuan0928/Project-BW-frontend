import axios from "axios";

const API_URL = "http://localhost:8080/api/user";

class AuthService {
  login(email, password) {
    return axios.post(API_URL + "/login", { email, password });
  }
  logout() {
    localStorage.removeItem("user");
    localStorage.setItem(
      "user",
      JSON.stringify({
        token:
          "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjBmZGQ5NzgyZTlhMzJkYmQ1N2U3MjgiLCJlbWFpbCI6Imd1ZXN0MDAxQGZha2UuY29tIiwiaWF0IjoxNzEyMzE1ODE2fQ.EwnbMEgqkZpW80Jse2c9-OYz29Nx3zKmjII2AVblr7A",
      })
    );
  }

  register(
    method,
    avatarUrl,
    username,
    password,
    email,
    name,
    address,
    sex,
    sellerAvatarUrl,
    shopname
  ) {
    const url = API_URL + "/register";
    const requestData = {
      buyer: { avatarUrl, username, password, email, name, address, sex },
      seller: { sellerAvatarUrl, shopname },
    };
    const lowercasedMethod = method.toLowerCase();
    if (lowercasedMethod === "post" || lowercasedMethod === "patch") {
      return axios({
        method: lowercasedMethod,
        url: url,
        data: requestData,
      }).catch((error) => {
        console.error(`${lowercasedMethod} error:`, error);
        throw error;
      });
    } else {
      return Promise.reject(new Error(`Invalid method: ${method}`));
    }
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
