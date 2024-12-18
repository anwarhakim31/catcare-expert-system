import React from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

interface typeProps {
  field: React.ComponentProps<typeof Input>;
  label: string;
  type: string;
  placeholder: string;
  classname?: string;
}

const DataFormControl: React.FC<typeProps> = ({
  field,
  label,
  type,
  placeholder,
  classname,
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
          className={classname}
        />
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};

export default DataFormControl;
