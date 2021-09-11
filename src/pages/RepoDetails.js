import React from 'react';
import {useStore} from "../store";
import {useParams} from "react-router-dom";
import Header from "../components/Header/Header";
import {Avatar} from "@material-ui/core";
import {StarBorder} from '@material-ui/icons';

export default function RepoDetails() {
    const {state} = useStore();
    let {id} = useParams();
    let idParam = +id;
    const userInfos = state.userInfos;
    const repoDetails = Object.values(state.userReposList).filter(({id}) => id === idParam);
    return (
        <div className="flex-1 flex-column">
            <Header/>
            <div className="flex flex-row w-3/5">
                <div className="flex-none">
                    <Avatar alt={`${userInfos.name}`} src={`${userInfos.avatar_url}`}/>
                </div>
                <div>
                    <p className="flex-grow text-center">
                        {userInfos.name}
                    </p>
                    <p className="flex-grow text-center">
                        <StarBorder/>
                        {repoDetails[0].stargazers_count}
                    </p>
                    <p className="flex-grow text-center">
                        {userInfos.url}
                    </p>
                </div>
            </div>
            <div className="flex w-3/5">
                <p>{repoDetails[0].name}</p>
            </div>
            <div className="flex w-3/5">
                <p>{repoDetails[0].language}</p>
            </div>
            {repoDetails[0].description ?
                <div className="flex w-3/5">
                    <p>{repoDetails[0].description}</p>
                </div> : <p>Aucune description</p>}

        </div>
    )
}
