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
import { imgExtantion } from "../../utils/getExtention";

type path = "item/" | "trader/";
type img = `${string}.${imgExtantion}`;


const storage = getStorage(app);
class FBStorage {
	storage: FirebaseStorage;

	constructor(storage: FirebaseStorage) {
		this.storage = storage;
	}

	// GET REFERENCE
	getFileRef = (folder: path, image: img) => {
		return ref(this.storage, `${folder}${image}`);
	};
	
	getFileRefByUrl = (url: string) => {
		return ref(this.storage, url);
	};
	
	// GET FILE
	getFileUrl = async (fileRef: StorageReference) => {
		try {
			return await getDownloadURL(fileRef);
		} catch (error) {
			throw new Error("Failed to get URL");
		}
	};

	// CREATE FILE
	uploadFile = async (file: File, fileRef: StorageReference) => {
		try {
			await uploadBytes(fileRef, file);
		} catch (error) {
			throw new Error("Failed to upload file");
		}
	};

	// DELETE FILE
	deleteFile = async (fileRef: StorageReference) => {
		try {
			await deleteObject(fileRef);
		} catch (error) {
			throw new Error("Failed to delete file");
		}
	};
}

const firebaseStorage = new FBStorage(storage);
export default firebaseStorage;
