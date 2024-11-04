"use client";
import {
  venueSchema,
  type VenueSchemaType,
} from "@/schemas/venues/venue.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import ControlledInputText from "../../../../_components/Controlled/ControlledInputText";
import { ActionIcon, Button, Divider, InputLabel } from "@mantine/core";
import { useEffect } from "react";
import ControlledInputTextarea from "../../../../_components/Controlled/ControlledInputTextarea";
import ControlledSelect from "@/app/_components/Controlled/ControlledSelect";
import { IconPlus, IconTrash } from "@tabler/icons-react";
import ControlledTimeInput from "@/app/_components/Controlled/ControlledTimeInput";
import ControlledSwitch from "@/app/_components/Controlled/ControlledSwitch";
import { venueStatus } from "utils/VenueStatusMap";
import useGetFacilities from "@/hooks/facilitie/useGetFacilities";
import useGetProvinces from "@/hooks/location/useGetProvinces";
import ControlledInputNumber from "@/app/_components/Controlled/ControlledInputNumber";

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

  const getFacilities = useGetFacilities();
  const getProvinces = useGetProvinces();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "open_range",
  });

  const {
    fields: facilitieFields,
    append: facilitieAppend,
    remove: facilitieRemove,
  } = useFieldArray({
    control,
    name: "facilities",
  });

  const {
    fields: ruleFields,
    append: ruleAppend,
    remove: ruleRemove,
  } = useFieldArray({
    control,
    name: "rules",
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
      setValue("status", props.data.status);
      setValue("facilities", props.data.facilities);
      setValue("rules", props.data.rules);
      setValue("latitude", props.data.latitude);
      setValue("longitude", props.data.longitude);
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
      <div className="flex justify-between gap-3">
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
        <ControlledSelect
          control={control}
          name="status"
          props={{
            label: "Status",
            data:
              venueStatus.map((status) => ({
                value: status.value,
                label: status.label,
              })) ?? [],
            className: "w-full",
          }}
        />
      </div>
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
        <ControlledSelect
          control={control}
          name="location"
          props={{
            label: "Location",
            data: getProvinces.data?.map((province) => ({
              value: province.name_en,
              label: `${province.name_en} (${province.name_th})`,
            })),
            className: "w-full",
            searchable: true,
          }}
        />
      </div>
      <div className="flex justify-around gap-3">
        <ControlledInputNumber
          control={control}
          name="latitude"
          props={{
            label: "Latitude",
            placeholder: "Latitude",
            withAsterisk: true,
          }}
        />
        <ControlledInputNumber
          control={control}
          name="longitude"
          props={{
            label: "Longitude",
            placeholder: "Longitude",
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
            append({
              day: "",
              is_open: false,
              open_time: new Date().toISOString(),
              close_time: new Date().toISOString(),
            })
          }
        >
          <IconPlus />
        </ActionIcon>
      </div>
      <Divider my={5} />
      <div className="flex flex-col gap-2">
        <InputLabel>Rules</InputLabel>
        {ruleFields.map((field, index) => (
          <div className="flex items-baseline gap-3" key={field.id}>
            <ControlledInputText
              control={control}
              name={`rules.${index}.rule`}
              props={{
                placeholder: "Rule",
                withAsterisk: true,
              }}
            />
            <div className="translate-y-[6px]">
              <ActionIcon
                onClick={() => ruleRemove(index)}
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
            ruleAppend({
              rule: "",
            })
          }
        >
          <IconPlus />
        </ActionIcon>
      </div>
      <Divider my={5} />
      <div className="flex flex-col gap-2">
        <InputLabel>Facilities</InputLabel>
        {facilitieFields.map((field, index) => (
          <div className="flex items-baseline gap-3" key={field.id}>
            <ControlledSelect
              control={control}
              name={`facilities.${index}.id`}
              props={{
                data: getFacilities.data?.facilities.map((facilitie) => ({
                  value: facilitie.id,
                  label: facilitie.name,
                })),
                searchable: true,
              }}
            />
            <div className="translate-y-[8px]">
              <ActionIcon
                onClick={() => facilitieRemove(index)}
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
            facilitieAppend({
              id: "",
            })
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
