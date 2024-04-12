import { useState, useEffect } from "react";
import api from "../api";

const useDistinctStatuses = () => {
  const [statuses, setStatuses] = useState([]);
  const getDistinctStatuses = async () => {
    try {
      const {
        data: { result },
      } = await api.get("/patient/statuses");
      setStatuses(result.map((status) => status.toLowerCase()));
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getDistinctStatuses();
  }, []);
  return statuses;
};

export default useDistinctStatuses;
