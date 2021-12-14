import { gql, makeVar } from "@apollo/client";

import client from "../apollo";
import { ArrayOfLength } from "./utils";

const RECOMMAND_PHOTO = gql`
  mutation clusterPhotos($files: [Upload]!) {
    clusterPhotos(images: $files) {
      cluster
      error
      ok
    }
  }
`;
const request = (variables) => client.mutate({
    mutation: RECOMMAND_PHOTO,
    variables
})
export const requestPhotoRecommandAPI = async (uploads, sliceLength) => {
  const uploadSlices = [];
  for (var i = 0; i < parseInt(uploads.length / sliceLength) + 1; i++) {
    uploadSlices.push(uploads.slice(i, i + sliceLength));
  }
 
  const requests = uploadSlices.map((slice) => request({
        
  }))
  console.log(resp);
  console.log("COMPLETE!!!!!!!!!");
};
