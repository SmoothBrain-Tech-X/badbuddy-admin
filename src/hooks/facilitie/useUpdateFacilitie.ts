import updateFacilitie from "@/services/facilitie/updateFacilitie.service";
import { useMutation } from "@tanstack/react-query";

const useUpdateFacilitie = () => {
  return useMutation({
    mutationFn: updateFacilitie,
  });
};

export default useUpdateFacilitie;
