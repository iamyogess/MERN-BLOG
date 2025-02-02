// src/hooks/useActivityLogs.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchActivityLogs = async () => {
  const account = JSON.parse(localStorage.getItem("account") || "{}");
  const token = account.token;

  const response = await axios.get(
    "http://localhost:8000/api/user/activity-log",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

const useActivityLogs = () => {
  return useQuery({
    queryKey: ["activityLogs"],
    queryFn: fetchActivityLogs,
  });
};
export default useActivityLogs;
