import getFacilities, {
  type IGetFacilities,
} from "@/services/facilitie/getFacilities.service";
import { useQuery } from "@tanstack/react-query";

const useGetFacilities = (props: IGetFacilities) => {
  return useQuery({
    queryKey: ["useGetFacilities"],
    queryFn: () => getFacilities(props),
  });
};

export default useGetFacilities;
