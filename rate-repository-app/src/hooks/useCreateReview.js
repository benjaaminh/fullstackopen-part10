import { CREATE_REVIEW } from "../graphql/mutations";
import { useApolloClient, useMutation } from "@apollo/client";

const useCreateReview = () => {
    const [mutate] = useMutation(CREATE_REVIEW);

    const createReview = async ({ownerName, repositoryName, rating, text}) => {
        const inputFields = { //these are found in graphql
            ownerName,
            repositoryName,
            rating,
            text
        }
        const { data } = await mutate({ //remember to put brackets around data
            variables: { review: inputFields },
        });
        return data?.createReview //check if data exists with ? and return the createreview object from it, as defined in the mutation
    };

    return {createReview};
};

export default useCreateReview