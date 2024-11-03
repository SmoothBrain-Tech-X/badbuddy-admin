import getVenuesSearch, {
  type IGetVenuesSearch,
} from "@/services/venue/getVenuesSearch.service";
import { useQuery } from "@tanstack/react-query";

const useGetVenuesSearch = (props: IGetVenuesSearch) => {
  return useQuery({
    queryKey: ["useGetVenuesSearch", props.q, props.limit, props.offset],
    queryFn: () => getVenuesSearch(props),
  });
};

export default useGetVenuesSearch;
