import createVenue from "@/services/venue/createVenue.service";
import { useMutation } from "@tanstack/react-query";

const useCreateVenue = () => {
  return useMutation({
    mutationFn: createVenue,
  });
};

export default useCreateVenue;
