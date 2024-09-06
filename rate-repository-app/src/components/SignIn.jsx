import { StyleSheet, View, Pressable } from "react-native";
import TextInput from "./TextInput";
import { useFormik } from 'formik';
import theme from "../theme";
import Text from "./Text";
import * as yup from "yup"


const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: "lightgrey"
    },
    button: {
        backgroundColor: theme.colors.primary,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 6,
        margin: 10,
        borderRadius: 6
    },
    errorText: {
        color: "#d73a4a",
        marginLeft: 10
    }
});

const initialValues = {
    username: '',
    password: '',
};

const validationSchema = yup.object().shape({
    username: yup
        .string()
        .required('Username is required'),
    password: yup
        .string()
        .required('Password is required'),
});

const SignInForm = ({ onSubmit }) => {
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
                <Pressable style={styles.button} onPress={formik.handleSubmit}>
                    <Text style={{ color: "white" }}>Sign in</Text>
                </Pressable>
            </View>
        </View>
    )
};

const SignIn = () => {
    const onSubmit = (values) => {
        console.log(values);
    }

    return <SignInForm onSubmit={onSubmit} />
}

export default SignIn;