
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
import { tokenVar } from "../apollo";



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

const client = new ApolloClient({
  link: authLink.concat(onErrorLink).concat(uploadHttpLink),
  cache,
});






export const uploadJob = makeVar(0);
export const uploadProgress = makeVar(0);
export const uploadState = makeVar(false);
const WORKING = "upload_working";
const UPLOADING = "upload_uploading";
const DONE = "upload_done";

const UPLOAD_PHOTO = gql`
  mutation uploadPhoto($upload: Upload!) {
    uploadSinglePhoto(upload: $upload) {
      file
      ok
    }
  }
`;


export const PostVisit = async ({ query, variables }) => {
  console.log("Start Func");
  uploadState(true)
  uploadJob(variables.photoPosts.length);
  uploadProgress(0);
  const uploads = variables.photoPosts.map((post) => post.file);
  const uploadResponse = []
  const uploadParam = uploads.map((upload) => {
    return {
      mutation: UPLOAD_PHOTO,
      variables: { upload },
    }
  });
  const postWrapper = async (param) => {
    const a = await client.mutate(param)
    uploadResponse.push(a)
    uploadProgress(uploadProgress() + 1)
  }
  
  await uploadParam.reduce(async (previousPromise, nextPost) => {
    await previousPromise;
    return postWrapper(nextPost);
  }, Promise.resolve());

  const files = uploadResponse.map((resp) => {
    return resp.data.uploadSinglePhoto.file
  })
  // console.log("---------------------------------BEFORE---------------------------------");
  // console.log(variables);
  variables.photoPosts.map((post, index) => post.file = files[index]);
  // console.log("---------------------------------AFTER---------------------------------");
  // console.log(variables);
  const resp = await client.mutate({
    mutation: query,
    variables
  })
  console.log(resp);
  uploadState(false);
  console.log("COMPLETE!!!!!!!!!");
};
