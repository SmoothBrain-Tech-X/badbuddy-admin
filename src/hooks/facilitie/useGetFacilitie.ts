import getFacilitie, {
  type IGetFacilitie,
} from "@/services/facilitie/getFacilitie.service";
import { useQuery } from "@tanstack/react-query";

const useGetFacilitie = (props: IGetFacilitie) => {
  return useQuery({
    queryKey: ["useGetFacilitie", props.facilitie_id],
    queryFn: () => getFacilitie(props),
  });
};

export default useGetFacilitie;
