import { DELETE_REVIEW } from "../graphql/mutations";
import { useApolloClient, useMutation } from "@apollo/client";
import { ME } from "../graphql/queries";

const useDeleteReview = () => {
    const [mutate, result] = useMutation(DELETE_REVIEW);

    const deleteReview = async (id) => {
        const { data } = await mutate({ //remember to put brackets around data
            variables: { deleteReviewId: id }, //remember to define variable to use
            refetchQueries: [ //will refetch me to refresh review list
                ME
            ]
        });
        return data
    };

    return [ deleteReview, result ]
};

export default useDeleteReview