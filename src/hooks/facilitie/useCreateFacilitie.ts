import createFacilitie from "@/services/facilitie/createFacilitie.service";
import { useMutation } from "@tanstack/react-query";

const useCreateFacilitie = () => {
  return useMutation({
    mutationFn: createFacilitie,
  });
};

export default useCreateFacilitie;
