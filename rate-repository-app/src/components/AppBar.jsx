import { View, StyleSheet, Pressable, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import Text from './Text';

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
    return (
        <View style={styles.container}>
            <View style={styles.tabContainer}>
                <ScrollView horizontal>
                    <Pressable>
                        <Link to="/">
                            <Text style={styles.text}>Repositories</Text>
                        </Link>
                    </Pressable>
                    <Pressable>
                        <Link to="/signIn">
                            <Text style={styles.text}>Sign in</Text>
                        </Link>
                    </Pressable>
                </ScrollView>
            </View>
        </View>
    )
};

export default AppBar;