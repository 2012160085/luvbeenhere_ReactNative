import * as tf from "@tensorflow/tfjs";
import { decodeJpeg } from "@tensorflow/tfjs-react-native";
import * as FileSystem from "expo-file-system";

export const TensorFromUri = async (uri) => {
  console.log("trans..");
  const imgB64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  
  const imgBuffer = tf.util.encodeString(imgB64, "base64").buffer;
  const raw = new Uint8Array(imgBuffer);
  const imageTensor = decodeJpeg(raw);
  console.log("transed");
  return imageTensor;
};

export const resizeImage = async (uri) => {

};
