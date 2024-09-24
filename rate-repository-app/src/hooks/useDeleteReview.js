import { DELETE_REVIEW } from "../graphql/mutations";
import { useApolloClient, useMutation } from "@apollo/client";

const useDeleteReview = () => {
    const [mutate, result] = useMutation(DELETE_REVIEW);

    const deleteReview = async (id) => {
        const { data } = await mutate({ //remember to put brackets around data
            variables: { deleteReviewId: id }, //remember to define variable to use
        });
        return data
    };

    return [ deleteReview, result]
};

export default useDeleteReview