import { LOGIN } from "../graphql/mutations";
import { useMutation } from "@apollo/client";
const useSignIn = () => {
    const [mutate, result] = useMutation(LOGIN);

    const signIn = async ({ username, password }) => {
        const credentialData = {
            username,
            password
        }
        const {data} = await mutate({ //remember to put brackets around data
            variables: { credentials: credentialData },
        });
        return data
    };

    return [signIn, result];
};

export default useSignIn