import React from 'react';
import {useStore} from "../store";

export default function UserReposListPage () {
    const {state} = useStore();
    console.log('state repo',state)
    return(
        <p>user repos list</p>
    )
}
