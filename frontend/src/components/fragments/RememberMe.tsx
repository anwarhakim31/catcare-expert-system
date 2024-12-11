import React from "react";
import { UseFormReturn } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";

interface FormValues {
  namaPengguna: string;
  sandi: string;
}

const RememberMe = ({ form }: { form: UseFormReturn<FormValues> }) => {
  const [remember, setRemember] = React.useState(
    localStorage.getItem("remember") ? true : false
  );
  const handleRemember = () => {
    if (!remember) {
      localStorage.setItem(
        "remember",
        JSON.stringify({
          namaPengguna: form.getValues("namaPengguna"),
          sandi: form.getValues("sandi"),
        })
      );
      setRemember(true);
    } else {
      localStorage.removeItem("remember");
      form.reset();
      setRemember(false);
    }
  };

  React.useEffect(() => {
    if (remember) {
      localStorage.setItem(
        "remember",
        JSON.stringify({
          namaPengguna: form.watch("namaPengguna"),
          sandi: form.watch("sandi"),
        })
      );
    }
  }, [remember, form]);

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
