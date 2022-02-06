export const GetThumbURI = (uri, size) => {
  return uri;
  const s3Url = "https://luvbeenhere-images.s3.ap-northeast-2.amazonaws.com/";
  const newUrl =
    "https://luvbeenhere-images-resized.s3.ap-northeast-2.amazonaws.com/";
  const prefix = size === 300 ? "r300-" : "r600-";

  return uri.replace(s3Url, newUrl + prefix);
};
