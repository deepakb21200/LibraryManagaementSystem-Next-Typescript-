

import { MAX_FILE_UPLOAD_SIZE } from "./constants";

export const getFormattedDate = (date:string) => {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};




// export const validImageCheck = (file) => {
//   if ((file.size / (1024 * 1024)).toFixed(2) > MAX_FILE_UPLOAD_SIZE) {
//     return "Maximum file upload size is 1 MB.";
//   }
//   //image ka size bytes me show kartah browser
//   if (!file.type.startsWith("image/")) {
//     return "Please upload only images.";
//   }
// };



export const validImageCheck = (file: File): string | undefined => {
  const sizeInMB = Number((file.size / (1024 * 1024)).toFixed(2));

  if (sizeInMB > MAX_FILE_UPLOAD_SIZE) {
    return "Maximum file upload size is 1 MB.";
  }

  if (!file.type.startsWith("image/")) {
    return "Please upload only images.";
  }

  return undefined;
};