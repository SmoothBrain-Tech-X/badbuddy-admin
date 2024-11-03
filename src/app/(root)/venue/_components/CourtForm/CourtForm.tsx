import ControlledInputNumber from "@/app/_components/Controlled/ControlledInputNumber";
import ControlledInputText from "@/app/_components/Controlled/ControlledInputText";
import ControlledInputTextarea from "@/app/_components/Controlled/ControlledInputTextarea";
import ControlledSelect from "@/app/_components/Controlled/ControlledSelect";
import {
  courtSchema,
  type CourtSchemaType,
} from "@/schemas/court/court.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@mantine/core";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { courtStatus } from "utils/CourtStatusMap";

interface Props {
  type: "create" | "edit";
  onFinish?: (data: CourtSchemaType) => void;
  data?: CourtSchemaType;
  isLoading?: boolean;
}

export default function CourtForm(props: Props) {
  const {
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<CourtSchemaType>({
    resolver: zodResolver(courtSchema),
  });

  const onFinish = (data: CourtSchemaType) => {
    console.log(data);
    props.onFinish?.(data);
  };

  useEffect(() => {
    if (props.data && props.type === "edit") {
      setValue("court_id", props.data.court_id);
      setValue("name", props.data.name);
      setValue("description", props.data.description);
      setValue("price_per_hour", props.data.price_per_hour);
      setValue("status", props.data.status);
    }
  }, [props.data, props.type, setValue]);

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onFinish)}>
      <ControlledInputText
        control={control}
        name="name"
        props={{
          label: "Name",
          placeholder: "Name",
          withAsterisk: true,
        }}
      />
      <ControlledInputTextarea
        control={control}
        name="description"
        props={{
          label: "Description",
          placeholder: "Description",
          withAsterisk: true,
        }}
      />
      <ControlledInputNumber
        control={control}
        name="price_per_hour"
        props={{
          label: "Rate",
          placeholder: "Rate per hour",
          withAsterisk: true,
          thousandSeparator: true,
        }}
      />
      {props.type === "edit" && (
        <ControlledSelect
          control={control}
          name="status"
          props={{
            label: "Status",
            placeholder: "Status",
            data: courtStatus.map((status) => ({
              label: status.label,
              value: status.value,
            })),
            withAsterisk: true,
          }}
        />
      )}
      <Button
        loading={props.isLoading}
        loaderProps={{ size: "sm" }}
        type="submit"
      >
        {props.type === "create" ? "Create" : "Save"}
      </Button>
    </form>
  );
}
