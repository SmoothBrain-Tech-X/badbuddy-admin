import getProvinces, {
  type IGetProvinces,
} from "@/services/location/getProvinces.service";
import { useQuery } from "@tanstack/react-query";

const useGetProvinces = (props?: IGetProvinces) => {
  return useQuery({
    queryKey: ["useGetProvinces"],
    queryFn: () => getProvinces(props),
  });
};

export default useGetProvinces;
