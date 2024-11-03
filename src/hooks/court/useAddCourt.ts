import addCourt from "@/services/court/addCourt.service";
import { useMutation } from "@tanstack/react-query";

const useAddCourt = () => {
  return useMutation({
    mutationFn: addCourt,
  });
};

export default useAddCourt;
