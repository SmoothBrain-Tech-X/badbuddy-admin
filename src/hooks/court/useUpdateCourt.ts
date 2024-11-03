import updateCourt from "@/services/court/updateCourt.service";
import { useMutation } from "@tanstack/react-query";

const useUpdateCourt = () => {
  return useMutation({
    mutationFn: updateCourt,
  });
};

export default useUpdateCourt;
