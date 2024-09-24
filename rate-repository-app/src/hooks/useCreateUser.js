import { CREATE_USER } from "../graphql/mutations";
import { useMutation } from "@apollo/client";

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