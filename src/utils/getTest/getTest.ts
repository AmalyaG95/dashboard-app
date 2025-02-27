import axios from "axios";

const getTest = async (id: string) => {
  try {
    const response = await axios.get(`http://localhost:3100/tests/${id}`);
    const data = response.data;

    return data;
  } catch (e) {
    console.error("Error getting the test:", e);
  }
};

export default getTest;
