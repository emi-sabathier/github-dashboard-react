import React, {useState} from 'react';
import axios from "axios";
import {BASE_URL} from '../constants/constants'
import {API_REQUEST, USER_INFOS, ERROR, USER_REPOS_LIST} from "../store/actions";
import {useStore} from "../store";
import {useHistory} from 'react-router-dom';
import Header from "../components/Header/Header";

export default function UserSearchPage() {
    const {state, dispatch} = useStore();
    const [username, setUsername] = useState('');
    const [formErrors, setFormErrors] = useState('');
    const history = useHistory();

    const getUserInfos = async () => {
        dispatch({type: API_REQUEST});
        await axios.get(`${BASE_URL}/users/${username}`)
            .then(res => {
                dispatch({type: USER_INFOS, payload: res.data});
                getReposList(res.data.repos_url);
                history.push('/reposlist')
            })
            .catch(err => {
                dispatch({type: ERROR, error: true});
                if (err.response.status === 404) {
                    setFormErrors("L'utilisateur n'existe pas.")
                } else {
                    setFormErrors('Une erreur est survenue.')
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

    const handleChange = (e) => {
        setUsername(e.target.value)
    }

    const handleSubmit = async () => {
        if (username === '') {
            setFormErrors('Le champ est vide');
        } else {
            await getUserInfos();
        }
    }

    return (
        <div className="flex-1 flex-column">
            <Header/>
            <div className="mb-3 pt-0 flex flex-row">
                <input type="text"
                       placeholder="Placeholder"
                       value={username}
                       onChange={handleChange}
                       className="px-3 py-3 placeholder-gray-400 text-gray-600 relative border-b bg-white bg-white text-sm border-gray-400 outline-none focus:outline-none focus:ring w-full"/>
                <button onClick={handleSubmit}
                        className="bg-purple-500 text-white active:bg-purple-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button">
                    Search
                </button>
            </div>
            {formErrors ? <p>{formErrors}</p> : null}
        </div>
    )
}
