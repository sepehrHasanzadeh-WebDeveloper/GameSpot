import axios from "axios";

export const fetchProduct1 = async () => {
  try {
    const res = await axios.get(
      "http://localhost:6500/products/consoleProduct"
    );
    return res.data;
  } catch (err) {
    
    return [];
  }
};

export const fetchProduct2 = async () => {
  try {
    const res = await axios.get(
      "http://localhost:6500/products/consoleProductS"
    );
    return res.data;
  } catch (err) {
    
    return [];
  }
};
