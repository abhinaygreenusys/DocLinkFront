import { useState, useEffect } from "react";
import api from "../api";

const useDistinctValues = (dataKey) => {
  const [values, setValues] = useState([]);
  const getDistinctValues = async () => {
    try {
      const {
        data: { result },
      } = await api.get("/patient/suggestions/prescription");
      setValues(result[dataKey].map((item) => item.toLowerCase()));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getDistinctValues();
  }, []);
  return values;
};

export default useDistinctValues;
