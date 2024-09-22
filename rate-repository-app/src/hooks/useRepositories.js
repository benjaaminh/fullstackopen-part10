import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
const useRepositories = (sortBy) => {
    let vars ={};

    switch (sortBy) {
        case 'latest':
             vars = {"orderBy":'CREATED_AT', "orderDirection": 'DESC' }
             break
        case 'highest':
             vars = {"orderBy":'RATING_AVERAGE', "orderDirection": 'DESC' }
             break
        case 'lowest':
             vars = {"orderBy":'RATING_AVERAGE', "orderDirection": 'ASC' }
             break
    }

    const { data, error, loading } = useQuery(GET_REPOSITORIES, {
        fetchPolicy: 'cache-and-network',
        variables: vars
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