import { firebaseStorage, firestoreDb } from "../firebase";
import { transformDataToItem } from "../firebase/transformData";
import getExtention from "../../utils/getExtention";

type uploadPath = "item/" | "trader/";

class TradeMatchItem {
  itemPath: uploadPath;

  constructor(itemPath: uploadPath) {
    this.itemPath = itemPath;
  }

  getItemById = async (itemId: string) => {
    try {
      const doc = await firestoreDb.getDocById(this.itemPath, itemId);
      if (!doc) return;
      const item = transformDataToItem([doc]);
      return item[0]; 
    } catch (error) {
      console.log(error);
    }
  };
  createItem = async <T, K extends { imgUrl?: string }>(
    item: T,
    file: File | undefined,
    updateData: K
  ) => {
    const fullPath = this.itemPath.slice(0, -1);
    const createItemRef = await firestoreDb.addDoc(fullPath, item);
    if (!file || !createItemRef) return;
    const imagePath = `${this.itemPath}${createItemRef.id}${getExtention(
      file
    )}`;
    const fileRef = firebaseStorage.getFileRef(imagePath);
    await firebaseStorage.uploadFile(file, fileRef);
    const imgUrl = await firebaseStorage.getFileUrl(fileRef);
    console.log(imgUrl);
    if (!imgUrl) return;
    updateData.imgUrl = imgUrl;
    firestoreDb.updateDoc(createItemRef, updateData);
  };
  upadateItem = <T>(itemId: string, updateData: T) => {
    const fullItemPath = `${this.itemPath}${itemId}`;
    const itemRef = firestoreDb.getDocRef(fullItemPath);
    firestoreDb.updateDoc(itemRef, updateData);
  };
  deleteItemField = (itemId: string, fieldName: string) => {
    const fullItemPath = `${this.itemPath}${itemId}`;
    const itemRef = firestoreDb.getDocRef(fullItemPath);
    firestoreDb.deleteDocField(itemRef, fieldName);
  };
  deleteItem = (itemId: string, imgUrl?: string | undefined) => {
    try {
      const fullItemPath = `${this.itemPath}${itemId}`;
      const itemRef = firestoreDb.getDocRef(fullItemPath);
      firestoreDb.deleteDoc(itemRef);
      if (imgUrl) {
        const imgRef = firebaseStorage.getFileRefByUrl(imgUrl);
        if(imgRef) firebaseStorage.deleteFile(imgRef);
      }
    } catch (error) {
      console.log(error);
    }
  }

  // item image
  uploadImage = async (imageFile: File, imgName: string) => {
    const fullImagePath = `${this.itemPath}${imgName}${getExtention(
      imageFile
    )}`;
    const imgRef = firebaseStorage.getFileRef(fullImagePath);
    firebaseStorage.uploadFile(imageFile, imgRef);
    return firebaseStorage.getFileUrl(imgRef);
  };
  deleteImgByUrl = (imageUrl: string) => {
    const imgRef = firebaseStorage.getFileRefByUrl(imageUrl);
    firebaseStorage.deleteFile(imgRef);
  };
}

export default TradeMatchItem;
