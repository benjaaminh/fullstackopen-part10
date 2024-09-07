import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
const useRepositories = () => {
    const { data, error, loading } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
    });
    const [repositories, setRepositories] = useState();

    const fetchRepositories = async () => {
        if (data !== undefined) {
            setRepositories(data.repositories);
        }
    };

    useEffect(() => {
        fetchRepositories();
    }, [data]); //fetch again if data changes. without this data would not be loaded before page refresh

    return { repositories, loading, refetch: fetchRepositories };
};

export default useRepositories;