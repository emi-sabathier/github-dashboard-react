import React, {useEffect, useState} from 'react';
import axios from "axios";
import {BASE_URL} from '../constants/constants'
import {API_REQUEST, USER_INFOS, ERROR, USER_REPOS_LIST} from "../store/actions";
import {useStore} from "../store";
import {useHistory} from 'react-router-dom';
import Header from "../components/Header/Header";
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function UserSearchPage() {
    const {dispatch} = useStore();
    const [inputUsername, setInputUsername] = useState('');
    const [userList, setUserList] = useState([]);
    const [usernameSelection, setUsernameSelection] = useState('');
    const [open, setOpen] = useState(false);
    const [formErrors, setFormErrors] = useState('');
    const history = useHistory();

    const getUsernamesList = async () => {
        if (inputUsername.length >= 2) {
            await axios.get(`${BASE_URL}/search/users?q=${inputUsername} `)
                .then(res => {
                    setUserList(res.data.items);
                })
                .catch(err => {
                    dispatch({type: ERROR, error: true});
                    if (err.response.status === 403) {
                        setFormErrors('API rate limit exceeded.');
                        setOpen(true);
                    } else {
                        setFormErrors('Une erreur est survenue.');
                        setOpen(true);
                    }
                })
        }
    }

    const getUserInfos = async () => {
        dispatch({type: API_REQUEST});
        await axios.get(`${BASE_URL}/users/${inputUsername}`)
            .then(res => {
                dispatch({type: USER_INFOS, payload: res.data});
                getReposList(res.data.repos_url);
                history.push('/reposlist')
            })
            .catch(err => {
                dispatch({type: ERROR, error: true});
                if (err.response.status === 404) {
                    setFormErrors("L'utilisateur n'existe pas.")
                    setOpen(true);
                } else {
                    setFormErrors('Une erreur est survenue.')
                    setOpen(true);
                }
            })
    }

    const getReposList = async (reposUrl) => {
        dispatch({type: API_REQUEST});
        await axios.get(`${reposUrl}`)
            .then(res => {
                dispatch({type: USER_REPOS_LIST, payload: res.data});
            })
            .catch(err => {
                dispatch({type: ERROR, error: true});
            })
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleUserNameSelection = (selection) => {
        setInputUsername(selection);
    }

    const handleChange = (e) => {
        setInputUsername(e.target.value);
        getUsernamesList();
    }

    const handleSubmit = async () => {
        if (inputUsername === '') {
            setOpen(true);
            setFormErrors('Le champ est vide');
        } else {
            await getUserInfos();
        }
    }

    return (
        <div className="flex-1 flex-column">
            <Header/>
            <div className="border-r border-l border-t border-gray-400 flex flex-row mx-5 mt-10 mb-2">
                <input type="text"
                       placeholder="Placeholder"
                       value={inputUsername}
                       onChange={handleChange}
                       className="px-3 py-3 placeholder-gray-400 text-gray-600 relative border-b bg-white bg-white text-sm border-gray-400 outline-none focus:outline-none focus:ring w-full"/>
                <button onClick={handleSubmit}
                        className="bg-purple-500 text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button">
                    Search
                </button>
            </div>
            {userList.length > 0 ? <div
                className="mx-5 grid grid-cols-1 border-t border-r border-l border-b border-gray-400 divide-y divide-gray-400 w-2/4">
                {userList.map((item, index) => (
                    <p className="font-semibold px-3 py-1" key={index}>
                        <a href="#" onClick={() => handleUserNameSelection(item.login)}>{item.login}</a>
                    </p>
                ))}
            </div> : null}

            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message={formErrors}
                action={
                    <>
                        <Button color="secondary" size="small" onClick={handleClose}>
                            Fermer
                        </Button>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small"/>
                        </IconButton>
                    </>
                }
            />
        </div>
    )
}
