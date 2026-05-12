 

import { getUser } from "@/api/auth";
import { useQuery } from "@tanstack/react-query";
 

const useUser = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["getUser"],
    queryFn: getUser,
  });

  return {
    isPending,
    error,
    isAuthenticated: data?.role === "authenticated",
  };
};

export default useUser;
