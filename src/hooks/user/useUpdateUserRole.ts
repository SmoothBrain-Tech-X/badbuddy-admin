import updateUserRole from "@/services/user/updateUserRole.service";
import { useMutation } from "@tanstack/react-query";

const useUpdateUserRole = () => {
  return useMutation({
    mutationFn: updateUserRole,
  });
};

export default useUpdateUserRole;
