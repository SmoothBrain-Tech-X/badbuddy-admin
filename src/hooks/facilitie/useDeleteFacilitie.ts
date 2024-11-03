import createFacilitie from "@/services/facilitie/createFacilitie.service";
import deleteFacilitie from "@/services/facilitie/deleteFacilitie.service";
import { useMutation } from "@tanstack/react-query";

const useDeleteFacilitie = () => {
  return useMutation({
    mutationFn: deleteFacilitie,
  });
};

export default useDeleteFacilitie;
