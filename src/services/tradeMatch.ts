import { firestoreDb, firebaseStorage } from "../services/firebase";
import getExtention from "../utils/getExtention";

class TradeMatch {
  createItem = async <T, K extends { imgUrl?: string | undefined }>(
    item: T,
    tableDb: string,
    imageFile?: File,
    updateData?: K
  ): Promise<void> => {
    const itemId: string | undefined = await firestoreDb.addDoc(tableDb, item);
    if (imageFile && itemId && updateData) {
      const imgURL = await this.uploadUrl(imageFile, itemId);
      if (!imgURL) return;
      updateData.imgUrl = imgURL;
      this.upadateItem<K>(`${tableDb}/${itemId}`, updateData);
    }
  };
  upadateItem = <T>(docPath: string, updateData: T) => {
    firestoreDb.updateDoc(docPath, updateData);
  };
  uploadUrl = async (imageFile: File, imgName: string) => {
    return await firebaseStorage.uploadFile(
      imageFile,
      "item/",
      imgName,
      getExtention(imageFile)
    );
  };
}

const tradeMatch = new TradeMatch();
export default tradeMatch;
