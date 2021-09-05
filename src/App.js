import {Route, Switch} from "react-router-dom";
import UserSearchPage from "./pages/UserSearchPage";
import UserReposListPage from "./pages/UserReposListPage";
import RepoDetails from "./pages/RepoDetails";

function App() {
    return (
        <Switch>
            <Route exact path='/'>
                <UserSearchPage/>
            </Route>
            <Route exact path='/reposlist'>
                <UserReposListPage/>
            </Route>
            <Route exact path='/repodetails'>
                <RepoDetails/>
            </Route>
        </Switch>
    );
}

export default App;
