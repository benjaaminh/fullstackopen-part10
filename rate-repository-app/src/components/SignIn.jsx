import { StyleSheet, View, TextInput, Pressable } from "react-native";
import { useFormik } from 'formik';
import theme from "../theme";
import Text from "./Text";

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexShrink: 1,
        backgroundColor: "lightgrey"
    },
    textinput: {
        margin: 10,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderWidth: 1,
        borderRadius: 9,
        borderColor: "lightgrey",
        color: "grey"

    },
    button: {
        backgroundColor: theme.colors.primary,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 6,
        margin: 10,
        borderRadius: 6
    }
});

const initialValues = {
    username: '',
    password: '',
};

const SignInForm = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues,
        onSubmit,
    });

    return (
        <View style={styles.container}>
            <View style={{backgroundColor: "white"}}>
                <TextInput style={styles.textinput}
                    placeholder="Username"
                    value={formik.values.username}
                    onChangeText={formik.handleChange('username')}
                />
                <TextInput style={styles.textinput}
                    secureTextEntry={true}
                    placeholder="Password"
                    value={formik.values.password}
                    onChangeText={formik.handleChange('password')}
                />
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