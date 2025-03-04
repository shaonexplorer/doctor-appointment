import { pinata } from "@/utils/pinata-config";

export async function uploadImage(file) {
  try {
    const response = await pinata.upload.file(file);
    const url = await pinata.gateways.convert(response.IpfsHash);
    return JSON.stringify(url);
  } catch (error) {
    console.log(error);
    alert(error);
  }
}
