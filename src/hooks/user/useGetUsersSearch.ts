import getUsersSearch, { type IGetUsersSearch } from "@/services/user/getUsersSearch.service";
import getVenuesSearch from "@/services/venue/getVenuesSearch.service";
import { useQuery } from "@tanstack/react-query";

const useGetUsersSearch = (props: IGetUsersSearch) => {
  return useQuery({
    queryKey: [
      "useGetUsersSearch",
      props.q,
      props.limit,
      props.offset,
      props.play_level,
      props.location,
    ],
    queryFn: () => getUsersSearch(props),
  });
};

export default useGetUsersSearch;
