import React, {Suspense, lazy, useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Route, Switch, withRouter} from "react-router-dom";
import Layout from "../layout/Layout";
import {Container} from "react-bootstrap";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

const App = props => {
    useEffect(() => {
        setInterval(() => {
            syncCommits();
        }, 60000)
    }, [])

    const syncCommits = async () => {
        await axios.post('/api/repositories/sync');

        document.dispatchEvent(new Event('CommitsSynced'))
    }

    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <Layout>
                <Container>
                    <Switch location={props.location}>
                        <Route path="/repository/:repository" component={lazy(() => import('../containers/Repository'))}/>
                        <Route path="/" exact component={lazy(() => import('../containers/Index'))}/>
                    </Switch>
                </Container>

                <ToastContainer/>
            </Layout>
        </Suspense>
    );
}

export default withRouter(App);