import getVenue, { type IGetVenue } from "@/services/venue/getVenue.service";
import { useQuery } from "@tanstack/react-query";

const useGetVenue = (props: IGetVenue) => {
  return useQuery({
    queryKey: ["getVenue", props.venue_id],
    queryFn: () => getVenue(props),
  });
};

export default useGetVenue;
