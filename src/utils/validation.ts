type allowedExtantion = ".jpg" | ".jpeg" | ".png" | ".svg";

interface IFileValidationOptions {
  extention?: allowedExtantion[];
  minSize?: number;
  maxSize?: number;
}

const fileValidation = (
  file: File,
  option: IFileValidationOptions
): string | undefined => {
  if (option.extention) {
    let ext = option.extention.map((ext) => {
      return ext.replace(".", "");
    });
    const regEx = new RegExp(ext.join("|"), "i");
    if (!regEx.test(file.type)) {
      return `You cannot use a file with the extension ${
        file.type.split("/")?.[1]
      }`;
    }
  }
  if (option.maxSize) {
    if (file.size > option.maxSize) {
      let _size;
      if (option.maxSize < 1000000) {
        _size = Math.floor(option.maxSize / 1000) + " Kb";
      } else {
        _size = Math.floor(option.maxSize / 1000000) + " Mb";
      }
      return `Max file size ${_size}`;
    }
  }
  if (option.minSize) {
    if (file.size < option.minSize) {
      let _size;
      if (option.minSize < 1000000) {
        _size = Math.floor(option.minSize / 1000) + " Kb";
      } else {
        _size = Math.floor(option.minSize / 1000000) + " Mb";
      }
      return `Min file size ${_size}`;
    }
  }
};

export { fileValidation };
