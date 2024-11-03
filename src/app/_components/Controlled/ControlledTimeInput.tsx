import {
  type FieldValues,
  type Path,
  type Control,
  Controller,
} from "react-hook-form";
import { TimeInput, type TimeInputProps } from "@mantine/dates";
import { ChangeEvent, ChangeEventHandler } from "react";
import { formatISO, parse, format } from "date-fns";

interface ControlledTimeInputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  props?: TimeInputProps;
}

const ControlledTimeInput = <T extends FieldValues>(
  props: ControlledTimeInputProps<T>,
) => {
  return (
    <Controller
      rules={{ required: true }}
      name={props.name}
      control={props.control}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
          const today = new Date();
          const parsedDate = parse(e.target.value, "HH:mm", today);
          const isoString = formatISO(parsedDate);
          onChange(isoString);
        };
        return (
          <TimeInput
            {...props.props}
            error={error ? error.message : undefined}
            onChange={handleChange}
            value={format(value, "HH:mm")}
          />
        );
      }}
    />
  );
};

export default ControlledTimeInput;
