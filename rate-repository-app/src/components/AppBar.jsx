import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link, useNavigate } from 'react-router-native';
import Text from './Text';
import { useQuery } from '@apollo/client';
import { ME } from '../graphql/queries';
import useSignOut from '../hooks/useSignOut';
import { useApolloClient } from "@apollo/client";
import useAuthStorage from '../hooks/useAuthStorage';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#24292e",
        paddingBottom: 5,
        paddingLeft: 5
        // ...
    },
    text: {
        color: "white",
        padding: 5
    },
    tabContainer: {
        flexDirection: "row",
    }
    // ...
});


const AppBar = () => {
    const { data } = useQuery(ME); //data should be in brackets because its an object
    const user = data?.me //data may be null, so put ?
    const signOut = useSignOut();
    const onSignout = async () => {
        await signOut();
    }
    return (
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                <ScrollView horizontal>
                    <Pressable>
                        <Link to="/">
                            <Text style={styles.text}>Repositories</Text>
                        </Link>
                    </Pressable>
                    {user ? (
                        <>
                            <Pressable>
                                <Link to="/review">
                                    <Text style={styles.text}>Create a Review</Text>
                                </Link>
                            </Pressable>
                            <Pressable>
                                <Link to="/reviews">
                                <Text style={styles.text}>My reviews</Text>
                                </Link>
                            </Pressable>
                            <Pressable onPress={onSignout}>
                                <Text style={styles.text}>Sign out</Text>
                            </Pressable>
                        </>
                    )
                        : (
                            <>
                                <Pressable>
                                    <Link to="/signIn">
                                        <Text style={styles.text}>Sign in</Text>
                                    </Link>
                                </Pressable>
                                <Pressable>
                                <Link to="/signUp">
                                    <Text style={styles.text}>Sign up</Text>
                                </Link>
                            </Pressable>
                            </>
                        )}
                </ScrollView>
            </View>
        </View>
    )
};

export default AppBar;