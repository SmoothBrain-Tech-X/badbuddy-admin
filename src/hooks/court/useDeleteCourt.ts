import deleteCourt from "@/services/court/deleteCourt.service";
import updateCourt from "@/services/court/updateCourt.service";
import { useMutation } from "@tanstack/react-query";

const useDeleteCourt = () => {
  return useMutation({
    mutationFn: deleteCourt,
  });
};

export default useDeleteCourt;
