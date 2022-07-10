import { firebaseStorage, firestoreDb } from "../firebase";
import { transformDataToItem } from "../firebase/transformData";
import getExtention from "../../utils/getExtention";
import { isError, isImgExt, isItem } from "../../utils/objIsType";

type uploadPath = "item/" | "trader/";

class TradeMatchItem {
	itemPath: uploadPath;

	constructor(itemPath: uploadPath) {
		this.itemPath = itemPath;
	}

	getItemById = async (itemId: string) => {
		try {
			const docRef = firestoreDb.getDocRef(this.itemPath, itemId);
			const doc = await firestoreDb.getDoc(docRef);
			if (!doc) throw new Error("Doc not found");
			const item = transformDataToItem([doc]);
			return item[0];
		} catch (error) {
			if(isError(error)) return new Error(error.message);
		}
	};

	createItem = async <T, K extends { imgUrl?: string }>(
		item: T,
		file: File | undefined,
		updateData: K
	) => {
		try {
			const createItemRef = await firestoreDb.addDoc(this.itemPath, item);

			if (!file || !createItemRef) return;
			
			const fileExt = getExtention(file);
			if(!isImgExt(fileExt)) throw new Error("File is not image");
			const fileRef = firebaseStorage.getFileRef(this.itemPath, `${createItemRef.id}.${fileExt}`);
			await firebaseStorage.uploadFile(file, fileRef);

			const imgUrl = await firebaseStorage.getFileUrl(fileRef);
			if (!imgUrl)  throw new Error("Img url not found");
			updateData.imgUrl = imgUrl;

			firestoreDb.updateDoc(createItemRef, updateData);
		} catch (error) {
			if(isError(error)) return new Error(error.message);
		}
	};

	upadateItem = async <T>(itemId: string, updateData: T) => {
		try {
			const itemRef = firestoreDb.getDocRef(this.itemPath, itemId);
			await firestoreDb.updateDoc(itemRef, updateData);
		} catch (error) {
			if(isError(error)) return new Error(error.message);
		}
	};

	deleteItemField = async (itemId: string, fieldName: string) => {
		try {
			const itemRef = firestoreDb.getDocRef(this.itemPath, itemId);
			await firestoreDb.deleteDocField(itemRef, fieldName);
		} catch (error) {
			if(isError(error)) return new Error(error.message);
		}
	};

	deleteItem = async (itemId: string, imgUrl?: string | undefined) => {
		try {
			const itemRef = firestoreDb.getDocRef(this.itemPath, itemId);
			await firestoreDb.deleteDoc(itemRef);
			if (imgUrl) await this.deleteImgByUrl(imgUrl);
		} catch (error) {
			if(isError(error)) return new Error(error.message);
		}
  	}

	// item image
	uploadImage = async (imageFile: File, imgName: string) => {
		try {
			const fileExt = getExtention(imageFile);
			if(!isImgExt(fileExt)) throw new Error("File is not image");
			const imgRef = firebaseStorage.getFileRef(this.itemPath, `${imgName}.${fileExt}`);
			await firebaseStorage.uploadFile(imageFile, imgRef);
			return await firebaseStorage.getFileUrl(imgRef);
		} catch (error) {
			if(isError(error)) return new Error(error.message);
		}
		
	};

	deleteImgByUrl = async (imageUrl: string) => {
		try {
			const imgRef = firebaseStorage.getFileRefByUrl(imageUrl);
			await firebaseStorage.deleteFile(imgRef);
		} catch (error) {
			if(isError(error)) return new Error(error.message);
		}
	};
}

export default TradeMatchItem;
