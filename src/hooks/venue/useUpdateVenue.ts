import updateVenue from "@/services/venue/updateVenue.service";
import { useMutation } from "@tanstack/react-query";

const useUpdateVenue = () => {
  return useMutation({
    mutationFn: updateVenue,
  });
};

export default useUpdateVenue;
