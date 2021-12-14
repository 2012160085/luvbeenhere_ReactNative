import { useState, useEffect } from 'react';
import axios from 'axios';
import client from '../apollo';



export const useGlobalMutation = async ({ query, variables }) => {
    console.log("DDDDDDDDDDDDDDDDDDDDDDDD");
    const filenames = [];
    const res = await client.mutate({
        mutation: query,
        variables,
    })
    console.log("COMPLETE!!!!!!!!!");
};

