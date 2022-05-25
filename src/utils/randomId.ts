import { v4 as uuidv4 } from "uuid";

export default function getRandomId(): string {
  return uuidv4();
}
