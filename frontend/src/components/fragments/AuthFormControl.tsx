import React from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";

const AuthFormControl = ({
  field,
  label,
  type,
}: {
  field: React.ComponentProps<typeof Input>;
  label: string;
  type: string;
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <>
      <FormItem className="relative space-y-0 mt-6 ">
        <FormControl>
          <Input
            placeholder=" "
            type={showPassword ? "text" : type}
            {...field}
            className="w-full peer"
            style={{ paddingRight: type === "password" ? "2.5rem" : "" }}
          />
        </FormControl>
        <FormLabel className="absolute pointer-events-none  text-xs  text-gray-800 dark:text-gray-400 duration-300 transform -translate-y-[18px] scale-90 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-purple-700 peer-focus:dark:text-purple-600 peer-placeholder-shown:text-xs peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-[18px] rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">
          {label}
        </FormLabel>
        {type === "password" && (
          <button
            type="button"
            aria-label="Show password"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-1/2 -translate-y-1/2 hover:bg-gray-50 p-2 rounded-md"
          >
            {showPassword ? (
              <EyeIcon
                size={18}
                strokeWidth={1.5}
                className="cursor-pointer text-gray-700"
              />
            ) : (
              <EyeOffIcon
                size={18}
                strokeWidth={1.5}
                className="cursor-pointer text-gray-700"
              />
            )}
          </button>
        )}
      </FormItem>
      <FormMessage className="mb-6" />
    </>
  );
};

export default AuthFormControl;
