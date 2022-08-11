import { firebaseStorage, firestoreDb } from "../Firebase";
import transform from "../../utils/transformData";
import { isError } from "../../utils/objIsType";
import getExtention from "../../utils/getExtention";

// Types
import { IItem, ITrader } from "../../interface/tradeMatch";

type uploadPath = "item/" | "trader/";

class TradeMatchItem {
	itemPath: uploadPath;

	constructor(itemPath: uploadPath) {
		this.itemPath = itemPath;
	}
	// GET
	getItemById = async (itemId: string) => {
		try {
			const docRef = firestoreDb.getDocRef(this.itemPath, itemId);
			const doc = await firestoreDb.getDoc(docRef);
			if (!doc) throw new Error("Document not found")
			if(this.itemPath === "item/") {
				const item: IItem[] = transform.toItem([doc]);
				return item[0];
			} else {
				const trader: ITrader[] = transform.toTrader([doc]);
				return trader[0];
			}
		} catch (error) {
			if(isError(error)) return new Error(error.message);
		}
	};

	// CREATE
	createItem = async <T, K extends { imgUrl?: string }>(
		item: T,
		updateData: K,
		file?: File,
	) => {
		try {
			const docRef = firestoreDb.getCollectionRef(this.itemPath);
			const createItemRef = await firestoreDb.addDoc(docRef, item);

			if (!createItemRef) throw new Error("Failed to create item.")
			this.upadateItem<T, K>(createItemRef.id, updateData, {
				file
			});
		} catch (error) {
			if(isError(error)) return new Error(error.message);
		}
	};
	
	uploadImage = async (imageFile: File, imgName: string) => {
		try {
			const fileExt = getExtention(imageFile);
			if(!fileExt) return;
			const imgRef = firebaseStorage.getFileRef(this.itemPath, `${imgName}.${fileExt}`);
			await firebaseStorage.uploadFile(imageFile, imgRef);
			return await firebaseStorage.getFileUrl(imgRef);
		} catch (error) {
			if(isError(error)) return new Error(error.message);
		}
	};

	// UPDATE
	upadateItem = async <T, K extends { imgUrl?: string }>(
		itemId: string, 
		updateData: K, 
		image: {
			imageUrl?: string, 
			file?: File,
		}
	) => {
		try {
			if(image) {
				const imgUrl = await this.updateImage(
					itemId, 
					{
						imageUrl: image.imageUrl, 
						file: image.file
					}
				);
				if (imgUrl && !isError(imgUrl)) updateData.imgUrl = imgUrl;
			}
			const itemRef = firestoreDb.getDocRef(this.itemPath, itemId);
			await firestoreDb.updateDoc(itemRef, updateData);
		} catch (error) {
			if(isError(error)) return new Error(error.message);
		}
	};

	updateImage = async (
		itemId: string, 
		image: {
			imageUrl?: string, 
			file?: File
		}
	) => {
		const { imageUrl, file } = image;
		if(imageUrl) {
			await this.deleteImgByUrl(imageUrl);
			await this.deleteItemField(itemId, "imgUrl");
		}
		if(file) return await this.uploadImage(file, itemId);
	}

	// DELETE
	deleteItem = async (itemId: string, imgUrl?: string | undefined) => {
		try {
			const itemRef = firestoreDb.getDocRef(this.itemPath, itemId);
			await firestoreDb.deleteDoc(itemRef);
			if (imgUrl) await this.deleteImgByUrl(imgUrl);
		} catch (error) {
			if(isError(error)) return new Error(error.message);
		}
  	}

	deleteItemField = async <T>(itemId: string, fieldName: keyof T) => {
		try {
			const itemRef = firestoreDb.getDocRef(this.itemPath, itemId);
			await firestoreDb.deleteDocField(itemRef, fieldName);
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
