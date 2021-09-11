import React, {useState} from 'react';
import {
    Link
} from "react-router-dom";
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import {useStore} from "../store";
import Header from "../components/Header/Header";
import {Avatar} from "@material-ui/core";

export default function UserReposListPage() {
    const {state} = useStore();
    const [error] = useState(false);
    const userInfos = state.userInfos;
    const userReposList = state.userReposList;
    return (
        <div className="flex-1 flex-column">
            <Header/>
            <div className="flex justify-center items-center">
                <Avatar alt={`${userInfos.name}`} src={`${userInfos.avatar_url}`}/>
                <p>{userInfos.name}</p>
            </div>
            {userReposList.map((item,i) => (
                <div className="flex w-3/5" key={item.id}>
                    <div className="flex-none">
                        <FolderOpenIcon/>
                    </div>
                    <p className="flex-grow text-center">
                        <Link to={`/repodetails/${item.id}`}>{item.name}</Link>
                    </p>
                </div>
            ))}
            {error ?
                <div
                    className=" my-3 block text-sm text-left text-red-600 bg-red-500 bg-opacity-10 border border-red-400 h-12 flex items-center p-4 rounded-md"
                    role="alert"
                >
                    Une erreur est survenue
                </div> : null}
        </div>
    )
}
