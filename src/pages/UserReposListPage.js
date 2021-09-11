import React from 'react';
import {
    Link, Redirect
} from "react-router-dom";
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import {useStore} from "../store";
import Header from "../components/Header/Header";
import {Avatar} from "@material-ui/core";

export default function UserReposListPage() {
    const {state} = useStore();
    const userInfos = state.userInfos;
    const userReposList = state.userReposList;
    console.log(state);
    return (
        <>
            <div className="flex-1 flex-column">
                <Header/>
                <div className="flex justify-center items-center">
                    <Avatar alt={`${userInfos.name}`} src={`${userInfos.avatar_url}`}/>
                    <p>{userInfos.name}</p>
                </div>
                {userReposList.map((item, i) => (
                    <div className="flex w-3/5" key={item.id}>
                        <div className="flex-none">
                            <FolderOpenIcon/>
                        </div>
                        <p className="flex-grow text-center font-semibold">
                            <Link to={`/repodetails/${item.id}`}>{item.name}</Link>
                        </p>
                    </div>
                ))}
            </div>
        </>
    )
}
