import { isImgExt } from "./objIsType";


export type imgExtantion = "jpg" | "jpeg" | "png" | "swg";

const getExtention = (file: File): imgExtantion | undefined => {
  const fileExt = file.name.split(".")[1];
  if (isImgExt(fileExt)) return fileExt;
};

export default getExtention;
