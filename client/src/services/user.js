import axios from "axios";

const signup = async ({ name, email, password }) => {
  try {
    const { data } = await axios.post(
      "http://127.0.0.1:5000/api/user/register",
      {
        name,
        email,
        password,
      }
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

const login = async ({ email, password }) => {
  try {
    const { data } = await axios.post("http://127.0.0.1:5000/api/user/login", {
      email,
      password,
    });
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

const getUserProfile = async ({ token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.get(
      "http://127.0.0.1:5000/api/user/profile",
      config
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

const updateProfile = async ({ token, userData }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.put(
      "http://127.0.0.1:5000/api/user/updateProfile",
      userData,
      config
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export { signup, login, getUserProfile, updateProfile };
