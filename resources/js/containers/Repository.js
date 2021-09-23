import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Badge} from "react-bootstrap";
import CommitsList from "../components/CommitsList";

const Repository = props => {
    const params = useParams();
    const [repository, setRepository] = useState({});

    useEffect(() => {
        fetchRepository();
    }, []);

    const fetchRepository = async () => {
        const response = await axios.get(`/api/repositories/${params.repository}`);

        setRepository(response.data.repository);
    }

    return (
        <div className={'repository py-4'}>
            <div className="heading d-flex">
                <div className="title flex-fill">
                    <h1 className={'btn-link'}>{repository.full_name}</h1>
                    <p>{repository.description}</p>
                </div>

                <div className="details pt-4">
                    <Badge bg="info">{repository.forks} Forks</Badge>
                    <br/>
                    <Badge bg="primary">{repository.watchers} Watchers</Badge>
                </div>
            </div>

            <div className="content">
                {repository.commits !== undefined ? <CommitsList commits={repository.commits}/> : ''}
            </div>
        </div>
    )
}

export default Repository;