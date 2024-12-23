import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const usePostPhoto = (setProgress: (value: number) => void) => {
  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUD_PRESET!);
      const originalFileName = `catcare/${new Date().getTime()}/${
        file.name.split(".")[0]
      }`;
      formData.append("public_id", originalFileName);

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;

            const percentage = Math.floor((loaded * 100) / (total || 1));

            setProgress(percentage);
          },
        }
      );

      return res.data;
    },
  });
};

export default usePostPhoto;
