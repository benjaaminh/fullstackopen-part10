import { LOGIN } from "../graphql/mutations";
import { useApolloClient, useMutation } from "@apollo/client";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
    const authStorage = useAuthStorage();
    const apolloClient = useApolloClient();
    const [mutate, result] = useMutation(LOGIN);

    const signIn = async ({ username, password }) => {
        const credentialData = {
            username,
            password
        }
        const { data } = await mutate({ //remember to put brackets around data
            variables: { credentials: credentialData },
        });
        await authStorage.setAccessToken(data.authenticate.accessToken);
        apolloClient.resetStore();
        return data
    };

    return [signIn, result];
};

export default useSignIn