import {
  venueSchema,
  type VenueSchemaType,
} from "@/schemas/venues/venue.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ControlledInputText from "../../../../_components/Controlled/ControlledInputText";
import { Button } from "@mantine/core";
import { useEffect } from "react";
import ControlledInputTextarea from "../../../../_components/Controlled/ControlledInputTextarea";
import ControlledSelect from "../../../../_components/Controlled/ControlledSelect";
import ControlledTimeInput from "../../../../_components/Controlled/ControlledTimeInput";
import { venueStatus } from "utils/VenueStatusMap";

interface Props {
  type: "create" | "edit";
  onFinish?: (data: VenueSchemaType) => void;
  data?: VenueSchemaType;
  isLoading?: boolean;
}

export default function UserManagementForm(props: Props) {
  const {
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<VenueSchemaType>({
    resolver: zodResolver(venueSchema),
  });

  const onFinish = (data: VenueSchemaType) => {
    console.log(data);
    props.onFinish?.(data);
  };

  useEffect(() => {
    if (props.data) {
      setValue("name", props.data.name);
      setValue("email", props.data.email);
      setValue("phone", props.data.phone);
      setValue("address", props.data.address);
      setValue("description", props.data.description);
      setValue("email", props.data.email);
      setValue("image_urls", props.data.image_urls);
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
      <ControlledInputTextarea
        control={control}
        name="image_urls"
        props={{
          label: "Image Urls",
          placeholder: "Image Urls",
          withAsterisk: true,
        }}
      />
      <div className="flex items-baseline gap-5">
        <ControlledInputText
          control={control}
          name="address"
          props={{
            label: "Address",
            placeholder: "Address",
            withAsterisk: true,
          }}
        />
      </div>
      <div className="flex items-baseline gap-3">
        <ControlledInputText
          control={control}
          name="phone"
          props={{
            label: "Phone",
            placeholder: "08xxxxxxxx",
            withAsterisk: true,
          }}
        />
        <ControlledInputText
          control={control}
          name="email"
          props={{
            label: "Email",
            placeholder: "Email",
            withAsterisk: true,
          }}
        />
      </div>
      {/* <div className="flex items-baseline gap-3">
        <ControlledTimeInput
          control={control}
          name="open_time"
          props={{
            label: "Open Time",
            placeholder: "Select open time",
            withAsterisk: true,
            className: "w-full",
          }}
        />
        <ControlledTimeInput
          control={control}
          name="close_time"
          props={{
            label: "Close Time",
            placeholder: "Select close time",
            withAsterisk: true,
            className: "w-full",
          }}
        />
      </div>
      <ControlledSelect
        control={control}
        name="status"
        props={{
          label: "Status",
          placeholder: "Status",
          data:
            venueStatus.map((status) => ({
              value: status.value,
              label: status.label,
            })) ?? [],
        }}
      /> */}
      <Button loading={props.isLoading} type="submit">
        {props.type === "create" ? "Create" : "Save"}
      </Button>
    </form>
  );
}
