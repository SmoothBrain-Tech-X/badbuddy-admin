import getVenues from "@/services/venue/getVenues.service";
import { useQuery } from "@tanstack/react-query";

const useGetVenues = () => {
  return useQuery({
    queryKey: ["getVenues"],
    queryFn: () => getVenues({}),
  });
};

export default useGetVenues;
