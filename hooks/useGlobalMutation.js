import { useState, useEffect } from 'react';
import axios from 'axios';
import client from '../apollo';



export const useGlobalMutation = async ({ query, variables }) => {

    const filenames = [];
    const res = await client.mutate({
        mutation: query,
        variables,
    })
 
};

