import { ID, ImageGravity, Permission, Role } from "appwrite";
import { appwriteConfig, storage } from "./config";

// Upload file with public read permission
export async function uploadFile(file) {
  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      file,
      [Permission.read(Role.any())] // Make file publicly viewable
    );
    return uploadedFile;
  } catch (error) {
    console.log("Upload error:", error);
    throw error;
  }
}

// Get file viewable URL
export function getFileView(fileId) {
  return storage.getFileView(appwriteConfig.storageId, fileId);
}
