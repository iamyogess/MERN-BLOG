import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const signup = async ({ name, email, password }) => {
  try {
    const { data } = await api.post("/user/register", {
      name,
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

const login = async ({ email, password }) => {
  try {
    const { data } = await api.post("/user/login", {
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
      "http://127.0.0.1:8000/api/user/profile",
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
      "http://127.0.0.1:8000/api/user/updateProfile",
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

const uploadProfilePicture = async ({ token, formData }) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.put(
      "http://127.0.0.1:8000/api/user/uploadProfilePicture",
      formData,
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

const sendBloggerRequest = async ({ token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    console.log("Sending request with config:", config);
    const { data } = await axios.post(
      "http://127.0.0.1:8000/api/user/blogger-request",
      {}, // Use an empty object as the body
      config
    );
    console.log("Response data:", data);
    return data;
  } catch (error) {
    console.error("Error in sendBloggerRequest:", error);
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

const getBloggerRequests = async ({ token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.get(
      "http://127.0.0.1:8000/api/user/get-request",
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

const rejectBloggerRequests = async ({ token, bloggerId }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.put(
      `http://127.0.0.1:8000/api/user/reject-blogger/${bloggerId}`,
      {}, // No request body, but still required for PUT
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

const approveBloggerRequests = async ({ token, bloggerId }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const { data } = await axios.put(
      `http://127.0.0.1:8000/api/user/approve-blogger/${bloggerId}`,
      {}, // No request body, but still required for PUT
      config
    );
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  } //fixxxx
};

const getVerifiedBloggerRequests = async ({ token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const { data } = await axios.get(
      "http://127.0.0.1:8000/api/user/get-bloggers",
      config
    );
    return data.bloggers; // Assuming `data.bloggers` contains the array of bloggers
  } catch (error) {
    if (error.response && error.response.data.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error(error.message);
  }
};

export {
  signup,
  login,
  getUserProfile,
  updateProfile,
  uploadProfilePicture,
  sendBloggerRequest,
  getBloggerRequests,
  rejectBloggerRequests,
  approveBloggerRequests,
  getVerifiedBloggerRequests,
};
