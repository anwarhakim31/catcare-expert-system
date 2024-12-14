import React from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";

interface PropsType {
  field: React.ComponentProps<typeof Textarea>;
  label: string;
  placeholder: string;
}

const AreaFormControl: React.FC<PropsType> = ({
  field,
  placeholder,
  label,
}) => {
  return (
    <FormItem>
      <FormLabel className="text-gray-700">{label}</FormLabel>
      <FormControl>
        <Textarea
          placeholder={placeholder}
          className="resize-none"
          {...field}
        />
      </FormControl>

      <FormMessage />
    </FormItem>
  );
};

export default AreaFormControl;
