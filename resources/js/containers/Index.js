import React, {useEffect, useState} from "react";
import Repositories from "../components/Repositories";
import AddRepository from "../components/AddRepository";
import axios from "axios";

const Index = props => {
    const [repositories, setRepositories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchRepositories();

        document.addEventListener('CommitsSynced', function () {
            fetchRepositories();
        })
    }, [])

    const fetchRepositories = async () => {
        const response = await axios.get('/api/repositories');
        setRepositories(response.data.repositories)
    }

    const addRepository = async (e, owner, repository) => {
        e.preventDefault();

        setLoading(true);
        try {
            const response = await axios.post('/api/repositories', {owner, repository});
            setRepositories(repos => {
                return [response.data.repository, ...repos];
            })
        } catch (e) {
            // toast.error(e.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="my-4">
            <div className="mb-5">
                <h3>Add Repository</h3>
                <AddRepository
                    isLoading={loading}
                    onSubmit={(e, owner, repo) => addRepository(e, owner, repo)}
                />
            </div>

            <h3>Repositories</h3>
            <Repositories repositories={repositories}/>
        </section>
    );
}

export default Index;