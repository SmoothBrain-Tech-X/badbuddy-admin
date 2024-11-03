"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ControlledInputText from "../../../../_components/Controlled/ControlledInputText";
import { Button } from "@mantine/core";
import { useEffect } from "react";
import {
  facilitieSchema,
  type FacilitieSchemaType,
} from "@/schemas/facilitie/facilitie.schema";

interface Props {
  type: "create" | "edit";
  onFinish?: (data: FacilitieSchemaType) => void;
  data?: FacilitieSchemaType;
  isLoading?: boolean;
}

export default function FacilitieForm(props: Props) {
  const {
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<FacilitieSchemaType>({
    resolver: zodResolver(facilitieSchema),
  });

  const onFinish = (data: FacilitieSchemaType) => {
    console.log(data);
    props.onFinish?.(data);
  };

  useEffect(() => {
    if (props.data) {
      setValue("facilitie_id", props.data.facilitie_id);
      setValue("name", props.data.name);
    }
  }, [props.data, setValue]);

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onFinish)}>
      <ControlledInputText
        control={control}
        name="name"
        props={{
          label: "Name",
          placeholder: "Name",
          withAsterisk: true,
          className: "w-full",
        }}
      />
      <div>
        <Button loading={props.isLoading} type="submit">
          {props.type === "create" ? "Create" : "Save"}
        </Button>
      </div>
    </form>
  );
}
