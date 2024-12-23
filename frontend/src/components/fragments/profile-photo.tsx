import { useAuthContext } from "@/context/AuthContext";
import usePostPhoto from "@/hooks/image/usePostPhoto";
import { ResponseError } from "@/lib/ResponseError";
import { ALLOW_FILE_TYPE } from "@/utils/constant";
import { formatSplitName } from "@/utils/helpers";
import { Plus, X } from "lucide-react";
import Image from "next/image";
import React from "react";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const ProfilePhoto = ({
  form,
  isEdit,
  setLoading,
}: {
  form: FieldValues;
  isEdit: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const context = useAuthContext();
  const [progress, setProgress] = React.useState(0);
  const [hover, setHover] = React.useState(false);

  const { mutate: mutatePhoto, isPending: isPendingPhoto } = usePostPhoto(
    (value) => setProgress(value)
  );

  React.useEffect(() => {
    if (isPendingPhoto) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [isPendingPhoto, setLoading]);

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!ALLOW_FILE_TYPE.includes(file?.type || "")) {
      return toast.error("Format file tidak sesuai");
    }

    if (file) {
      mutatePhoto(file, {
        onSuccess: (data) => {
          form.setValue("photo", data.url);
          e.target.value = "";

          setProgress(0);
        },
        onError: (error) => {
          ResponseError(error as Error);
          e.target.value = "";
          setProgress(0);
        },
      });
    }
  };

  return (
    <>
      <figure
        onClick={() =>
          form.watch("photo")
            ? form.setValue("photo", "")
            : inputRef.current?.click()
        }
        onMouseEnter={() => {
          if (progress === 0) setHover(true);
        }}
        onMouseLeave={() => setHover(false)}
        className={`${
          isEdit ? "pointer-events-auto cursor-pointer" : "pointer-events-none "
        } relative mx-auto w-[120px] h-[120px] bg-orange-300 rounded-full border border-gray-300 overflow-hidden`}
      >
        {form.watch("photo") ? (
          <Image
            src={form.watch("photo")}
            alt={context?.userData?.fullname || ""}
            width={150}
            height={150}
            className="w-full h-full object-cover rounded-full"
            priority
          />
        ) : (
          <figcaption className="text text-xs text-gray-500 w-full h-full flex justify-center items-center select-none">
            <span className="text-5xl text-white  uppercase">
              {formatSplitName(context?.userData?.fullname || "")}
            </span>
          </figcaption>
        )}
        {isPendingPhoto && progress > 0 && (
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80 hover:opacity-50 flex items-center justify-center">
            <p className="text-white text-base">{progress}%</p>
          </div>
        )}
        {hover && (
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-80 hover:opacity-50 flex items-center justify-center z-10">
            {form.watch("photo") ? (
              <X className="text-white" size={20} />
            ) : (
              <Plus className="text-white" scale={20} />
            )}
          </div>
        )}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={inputRef}
          disabled={!isEdit}
          onChange={handleChangeImage}
        />
      </figure>
      <p
        className={`${
          isEdit ? "opacity-100" : "opacity-0"
        } text-xs text-center mt-4`}
      >
        <span className="font-medium">Format Gambar</span>: .jpg, .jpeg, .png
      </p>
    </>
  );
};

export default ProfilePhoto;
