import { StyleSheet, View, Pressable } from "react-native";
import TextInput from "./TextInput";
import { useFormik } from 'formik';
import theme from "../theme";
import Text from "./Text";
import * as yup from "yup"
import useSignIn from "../hooks/useSignIn";
import { useNavigate } from "react-router-native";
import useSignUp from "../hooks/useCreateUser";

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: "lightgrey"
    },
    errorText: {
        color: "#d73a4a",
        marginLeft: 10
    }
});

const initialValues = {
    username: '',
    password: '',
    passwordConfirmation: '',
};

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required'),
    password: yup
        .string()
        .required('Password is required'),
    passwordConfirmation: yup
        .string().oneOf([yup.ref('password'), null]) //check that the value matches reference to password
        .required('Password confirmation is required')
});

export const SignUpForm = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema,
    });

    return (
        <View style={styles.container}>
            <View style={{ backgroundColor: "white" }}>
                <TextInput
                    error={formik.errors.username}
                    placeholder="Username"
                    value={formik.values.username}
                    onChangeText={formik.handleChange('username')}
                />
                {formik.touched.username && formik.errors.username && (
                    <Text style={styles.errorText}>{formik.errors.username}</Text>
                )}
                <TextInput
                    error={formik.errors.password}
                    secureTextEntry={true}
                    placeholder="Password"
                    value={formik.values.password}
                    onChangeText={formik.handleChange('password')}
                />
                {formik.touched.password && formik.errors.password && (
                    <Text style={styles.errorText}>{formik.errors.password}</Text>
                )}
                <TextInput
                    error={formik.errors.passwordConfirmation}
                    secureTextEntry={true}
                    placeholder="Password confirmation"
                    value={formik.values.passwordConfirmation}
                    onChangeText={formik.handleChange('passwordConfirmation')}
                />
                {formik.touched.passwordConfirmation && formik.errors.passwordConfirmation && (
                    <Text style={styles.errorText}>{formik.errors.passwordConfirmation}</Text>
                )}
                <Pressable style={theme.button} onPress={formik.handleSubmit}>
                    <Text style={{ color: "white" }}>Sign up</Text>
                </Pressable>
            </View>
        </View>
    )
};

const SignUp = () => {
    const {signUp} = useSignUp();
    const [signIn] = useSignIn();

    const navigate = useNavigate();

    const onSubmit = async (values) => {
      const { username, password } = values;
  
      try {
        await signUp({username, password}) //sign up
        const login = await signIn({ username, password });  //login with same credentials
        console.log(login);
        navigate("/");
      } catch (e) {
        console.log(e);
      }
    };

    return <SignUpForm onSubmit={onSubmit} />
}

export default SignUp;