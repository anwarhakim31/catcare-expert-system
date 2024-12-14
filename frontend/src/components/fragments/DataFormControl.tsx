import React from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

interface typeProps {
  field: React.ComponentProps<typeof Input>;
  label: string;
  type: string;
  placeholder: string;
}

const DataFormControl: React.FC<typeProps> = ({
  field,
  label,
  type,
  placeholder,
}) => {
  return (
    <FormItem>
      <FormLabel className="text-gray-700">{label}</FormLabel>
      <FormControl>
        <Input
          placeholder={placeholder}
          type={type}
          {...field}
          autoComplete="off"
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default DataFormControl;
