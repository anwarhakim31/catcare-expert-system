import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";

interface FormValues {
  username: string;
  password: string;
}

const isBrowser = typeof window !== "undefined";

const RememberMe = ({ form }: { form: UseFormReturn<FormValues> }) => {
  const [remember, setRemember] = React.useState(false);
  const handleRemember = () => {
    if (!remember) {
      localStorage.setItem(
        "remember",
        JSON.stringify({
          username: form.getValues("username"),
          password: form.getValues("password"),
        })
      );
      setRemember(true);
      localStorage.setItem("check", "true");
    } else {
      localStorage.removeItem("remember");
      setRemember(false);
      localStorage.removeItem("check");
    }
  };

  React.useEffect(() => {
    if (isBrowser && localStorage.getItem("check")) {
      setRemember(true);
    }
  }, [remember]);

  return (
    <div className="flex items-center space-x-2 ">
      <Checkbox
        id="remember"
        className="data-[state=checked]:bg-orange-500 border-gray-300"
        onCheckedChange={handleRemember}
        checked={remember}
      />
      <label
        htmlFor="remember"
        className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Ingat Saya
      </label>
    </div>
  );
};

export default RememberMe;
