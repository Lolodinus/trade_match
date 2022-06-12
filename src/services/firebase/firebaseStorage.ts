import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "../../config/firebase";

// Types
import { FirebaseStorage } from "firebase/storage";
type path = "item/" | "trader/";
const storage = getStorage(app);

class FBStorage {
  storage: FirebaseStorage;
  constructor(storage: FirebaseStorage) {
    this.storage = storage;
  }
  uploadFile = async (
    file: File,
    filePath: path,
    fileName: string,
    extention: string
  ) => {
    try {
      const storageRef = ref(
        this.storage,
        `${filePath}${fileName}${extention}`
      );
      const uploadfile = await uploadBytes(storageRef, file);
      return getDownloadURL(uploadfile.ref);
    } catch (error) {
      console.log(error);
    }
  };
}

const firebaseStorage = new FBStorage(storage);
export default firebaseStorage;
