import axios from "axios";
export const baseUrl = "http://localhost:4001" || "";

export const postRequest = async (url, body) => {
  try {
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    let message;

    if (error.response?.data?.message) {
      message = error.response.data.message;
    } else {
      message = error.message;
    }

    return { error: true, status: error.response?.status, message };
  }
};

export const getRequest = async (url) => {
  const response = await fetch(url);

  const data = await response.json();

  if (!response.ok) {
    let message = "An error occurred...";

    if (data?.message) {
      message = data.message;
    }

    return { error: true, status: response.status, message };
  }

  return data;
};
