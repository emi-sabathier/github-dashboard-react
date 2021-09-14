import {Route, Switch} from "react-router-dom";
import UserSearchPage from "./pages/UserSearchPage";
import UserReposListPage from "./pages/UserReposListPage";
import RepoDetails from "./pages/RepoDetails";
import NotFound from "./pages/NotFound";

function App() {
    return (
        <>
            <Switch>
                <Route exact path='/'>
                    <UserSearchPage/>
                </Route>
                <Route path='/reposlist'>
                    <UserReposListPage/>
                </Route>
                <Route path='/repodetails/:id'>
                    <RepoDetails/>
                </Route>
                <Route>
                    <NotFound />
                </Route>
            </Switch>
        </>
    );
}

export default App;
