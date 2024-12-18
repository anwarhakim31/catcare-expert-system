import React from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";
import SelectSearchOption from "../ui/select-option-search";

interface PropsType {
  field: React.ComponentProps<typeof Textarea>;
  label: string;
  placeholder: string;
  isLoading: boolean;
  data: {
    id: string;
    value: string;
  }[];
}

const SelectFormControl: React.FC<PropsType> = ({
  field,
  placeholder,
  label,
  isLoading,
  data,
}) => {
  return (
    <FormItem>
      <FormLabel className="text-gray-700">{label}</FormLabel>
      <FormControl>
        <SelectSearchOption
          field={field}
          placeholder={placeholder}
          data={data}
          isLoading={isLoading}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default SelectFormControl;
