import axios from "axios";

const getTest = async (id: string) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_API_URL}/tests/${id}`
    );
    const data = response.data;

    return data;
  } catch (e) {
    console.error("Error getting the test:", e);
  }
};

export default getTest;
