import { venueSchema } from "@/schemas/venues/venue.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@mantine/core";
import { useEffect } from "react";
import {
  updateRoleSchema,
  type UpdateRoleSchemaType,
} from "@/schemas/user/updateRole.schema";
import ControlledSelect from "@/app/_components/Controlled/ControlledSelect";

interface Props {
  type: "create" | "edit";
  onFinish?: (data: UpdateRoleSchemaType) => void;
  data?: UpdateRoleSchemaType;
  isLoading?: boolean;
}

export default function UpdateRoleForm(props: Props) {
  const {
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateRoleSchemaType>({
    resolver: zodResolver(updateRoleSchema),
  });

  const onFinish = (data: UpdateRoleSchemaType) => {
    console.log(data);
    props.onFinish?.(data);
  };

  useEffect(() => {
    if (props.data) {
      setValue("role", props.data.role);
      setValue("user_id", props.data.user_id);
    }
  }, [props.data, setValue]);

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onFinish)}>
      <ControlledSelect
        control={control}
        name="role"
        props={{
          label: "Role",
          placeholder: "Role",
          withAsterisk: true,
          data: [
            { label: "Admin", value: "admin" },
            { label: "User", value: "user" },
            { label: "Venue", value: "venue" },
          ],
        }}
      />
      <Button loading={props.isLoading} type="submit">
        {props.type === "create" ? "Create" : "Save"}
      </Button>
    </form>
  );
}
