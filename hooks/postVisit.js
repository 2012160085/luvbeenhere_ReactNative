
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  gql,
  makeVar
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { offsetLimitPagination } from "@apollo/client/utilities";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createUploadLink } from "apollo-upload-client";
import { Platform } from "react-native";
import client, { tokenVar } from "../apollo";



const uploadHttpLink = createUploadLink({
  uri: Platform.OS === "android" ? "http://luvbeenhere.com:54000/graphql" : "http://192.168.123.101:54000/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: tokenVar(),
    },
  };
});

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(`GraphQL Error`, graphQLErrors);
  }
  if (networkError) {
    console.log("Network Error", networkError);
  }
});

export const cache = new InMemoryCache();




export const uploadJob = makeVar(0);
export const uploadProgress = makeVar(0);
export const uploadState = makeVar(false);
const WORKING = "upload_working";
const UPLOADING = "upload_uploading";
const DONE = "upload_done";

const UPLOAD_PHOTO = gql`
  mutation uploadPhoto($file:[Upload]!) {
    uploadPhotos(uploads:$file) {
      filenames
      ok
    }
  }
`;


export const PostVisit = async ({ query, variables }) => {
  console.log("Start 1");
  uploadState(true)
  uploadJob(variables.photoPosts.length);
  uploadProgress(0);
  const uploads = variables.photoPosts.map((post) => post.file);
  const uploadParam = {
    mutation: UPLOAD_PHOTO,
    variables: { file: uploads },
  }
  console.log("Start 3");


  const uploadResult = await client.mutate(uploadParam)


  console.log("Start 4");
  console.log(uploadResult);

  const { filenames } = uploadResult.data.uploadPhotos

  console.log("Start 5");
  console.log(filenames);
  // console.log("---------------------------------BEFORE---------------------------------");
  // console.log(variables);
  variables.photoPosts.map((post, index) => post.file = filenames[index]);
  // console.log("---------------------------------AFTER---------------------------------");
  console.log(variables);
  console.log("Start 6");
  const resp = await client.mutate({
    mutation: query,
    variables
  })
  console.log(resp);
  uploadState(false);
  console.log("COMPLETE!!!!!!!!!");
};
