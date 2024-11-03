import getUsersSearch, {
  type IGetUsersSearch,
} from "@/services/user/getUsersSearch.service";
import { useQuery } from "@tanstack/react-query";

const useGetUsersSearch = (props: IGetUsersSearch) => {
  return useQuery({
    queryKey: ["useGetUsersSearch", props.q, props.limit, props.offset],
    queryFn: () => getUsersSearch(props),
  });
};

export default useGetUsersSearch;
