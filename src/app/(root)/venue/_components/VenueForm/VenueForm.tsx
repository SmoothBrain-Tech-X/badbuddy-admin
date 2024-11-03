"use client";
import {
  venueSchema,
  type VenueSchemaType,
} from "@/schemas/venues/venue.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import ControlledInputText from "../../../../_components/Controlled/ControlledInputText";
import { ActionIcon, Button, InputLabel } from "@mantine/core";
import { useEffect } from "react";
import ControlledInputTextarea from "../../../../_components/Controlled/ControlledInputTextarea";
import ControlledSelect from "@/app/_components/Controlled/ControlledSelect";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import ControlledTimeInput from "@/app/_components/Controlled/ControlledTimeInput";
import ControlledSwitch from "@/app/_components/Controlled/ControlledSwitch";

interface Props {
  type: "create" | "edit";
  onFinish?: (data: VenueSchemaType) => void;
  data?: VenueSchemaType;
  isLoading?: boolean;
}

export default function VenueForm(props: Props) {
  const {
    control,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<VenueSchemaType>({
    resolver: zodResolver(venueSchema),
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "open_range",
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
      setValue("open_range", props.data.open_range);
      setValue("email", props.data.email);
      setValue("image_urls", props.data.image_urls);
      setValue("location", props.data.location);
    }
  }, [props.data, setValue]);

  const day = [
    { value: "Monday", label: "Monday" },
    { value: "Tuesday", label: "Tuesday" },
    { value: "Wednesday", label: "Wednesday" },
    { value: "Thursday", label: "Thursday" },
    { value: "Friday", label: "Friday" },
    { value: "Saturday", label: "Saturday" },
    { value: "Sunday", label: "Sunday" },
  ];

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
        <ControlledInputText
          control={control}
          name="location"
          props={{
            label: "Location",
            placeholder: "Location",
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
      <div className="flex flex-col gap-2">
        <InputLabel>Open Range</InputLabel>
        {fields.map((field, index) => (
          <div className="flex items-baseline gap-3" key={field.id}>
            <ControlledSelect
              control={control}
              name={`open_range.${index}.day`}
              props={{
                label: "Day",
                data: day,
              }}
            />
            <ControlledTimeInput
              control={control}
              name={`open_range.${index}.open_time`}
              props={{
                label: "Open Time",
                withAsterisk: true,
              }}
            />
            <ControlledTimeInput
              control={control}
              name={`open_range.${index}.close_time`}
              props={{
                label: "Close Time",
                withAsterisk: true,
              }}
            />
            <ControlledSwitch
              control={control}
              name={`open_range.${index}.is_open`}
              props={{
                label: "Is Open",
                className: "translate-y-[35px]",
              }}
            />
            <div className="translate-y-[35px]">
              <ActionIcon
                onClick={() => remove(index)}
                color="red"
                variant="subtle"
              >
                <IconTrash />
              </ActionIcon>
            </div>
          </div>
        ))}
        <ActionIcon
          onClick={() =>
            append({ day: "", close_time: "", open_time: "", is_open: false })
          }
        >
          <IconPlus />
        </ActionIcon>
      </div>
      <Button loading={props.isLoading} type="submit">
        {props.type === "create" ? "Create" : "Save"}
      </Button>
    </form>
  );
}
