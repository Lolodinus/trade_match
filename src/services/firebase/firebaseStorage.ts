import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from "firebase/storage";
import { app } from "../../config/firebase";

// Types
import { FirebaseStorage, StorageReference } from "firebase/storage";
type path = "item/" | "trader/";
const storage = getStorage(app);

class FBStorage {
  storage: FirebaseStorage;
  constructor(storage: FirebaseStorage) {
    this.storage = storage;
  }
  getFileRef = (fullFilePath: string) => {
    return ref(this.storage, fullFilePath);
  };
  getFileRefByUrl = (url: string) => {
    return ref(this.storage, url);
  };
  getFileUrl = async (fileRef: StorageReference) => {
    return await getDownloadURL(fileRef);
  };
  uploadFile = async (file: File, fileRef: StorageReference) => {
    await uploadBytes(fileRef, file);
  };
  deleteFile = async (fileRef: StorageReference) => {
    try {
      deleteObject(fileRef);
    } catch (error) {
      console.log(error);
    }
  };
}

const firebaseStorage = new FBStorage(storage);
export default firebaseStorage;
