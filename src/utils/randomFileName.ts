import { nanoid } from "nanoid";
import path from "path";

export default function randomFileName(fileName: string) {
  const randomFileName = `${Date.now()}${nanoid()}`;
  const formatFile = path.extname(fileName).slice(1);
  return `${randomFileName}.${formatFile}`;
}
