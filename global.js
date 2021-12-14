import { makeVar } from "@apollo/client";
import axios from "axios";

export const globalPromise = makeVar(() => console.log("Not Initialized"));

export const globalState = makeVar("0");