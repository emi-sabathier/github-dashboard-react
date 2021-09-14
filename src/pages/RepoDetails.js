import React from 'react';
import {useStore} from "../store";
import {Redirect, useParams} from "react-router-dom";
import Header from "../components/Header/Header";
import {Avatar} from "@material-ui/core";
import {StarBorder} from '@material-ui/icons';

export default function RepoDetails() {
    const {state} = useStore();
    let {id} = useParams();
    let idParam = +id;
    const userInfos = state.userInfos;
    const repoDetails = Object.values(state.userReposList).filter(({id}) => id === idParam);
    const isIdExists = Object.values(state.userReposList).find(({id}) => id === idParam);
    // const createdAt = repoDetails[0].created_at.slice(0,10);
    // const updatedAt = repoDetails[0].updated_at.slice(0,10);

    const formatDate = (date) => {
        return date.slice(0, 10);
    }

    const createdAt = formatDate(repoDetails[0].created_at);
    const updatedAt = formatDate(repoDetails[0].updated_at);

    return (
        <>
            {isIdExists ? <div className="flex-1 flex-column">
                <Header/>
                <div className="flex my-5 justify-center items-center">
                    <div className="rounded-full flex justify-center py-3 px-5 bg-gray-300">
                        <Avatar alt={`${userInfos.name}`} src={`${userInfos.avatar_url}`}/>
                        <p className="self-center font-semibold ml-3">{userInfos.name}</p>
                    </div>
                </div>
                <p className="text-center">
                    {userInfos.url}
                </p>
                <div className="flex mx-auto my-5 w-2/3 justify-center items-center">
                    <p className="text-xl font-bold">
                        <a href={`${repoDetails[0].html_url}`}>{repoDetails[0].name}</a>
                    </p>
                    <p className="mx-2 text-center">
                        <StarBorder/>
                        {repoDetails[0].stargazers_count}
                    </p>
                </div>
                <div className="flex w-3/5">

                </div>
                <div className="flex flex-col w-3/5 justify-center items-center mx-auto mb-5">
                    <p className="my-2"><span
                        className="font-semibold">Langage utilisé:</span> {repoDetails[0].language}</p>
                    <p className="my-2"><span className="font-semibold">Crée le:</span> {createdAt} </p>
                    <p className="my-2"><span className="font-semibold">MAJ le:</span> {updatedAt}</p>
                    {repoDetails[0].description ?
                        <p><span className="font-semibold">Description:</span> {repoDetails[0].description}</p> :
                        <p>Aucune description</p>}
                </div>
            </div> : <Redirect path="/"/>}
        </>
    )
}
