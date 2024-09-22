import { CREATE_USER, LOGIN } from "../graphql/mutations";
import { useApolloClient, useMutation } from "@apollo/client";
import useAuthStorage from "./useAuthStorage";

const useSignUp = () => {
    const [mutate] = useMutation(CREATE_USER);

    const signUp = async ({ username, password }) => {
        const userData = {
            username,
            password
        }
        const { data } = await mutate({ //remember to put brackets around data
            variables: { user: userData },
        });
        return data?.createUser
    };

    return {signUp};
};

export default useSignUp