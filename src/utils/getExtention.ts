const getExtention = (file: File) => {
  return `.${file.name.split(".")[1]}`;
};

export default getExtention;
