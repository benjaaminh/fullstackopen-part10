import { View, StyleSheet, Pressable, Text } from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight,
        backgroundColor: "#24292e",
        paddingBottom: 10,
        paddingLeft: 10
        // ...
    },
    text: {
        color: "white"
    }
    // ...
});

const AppBar = () => {
    return (
    <View style={styles.container}>
        <Pressable>
            <Text style={styles.text}>Repositories</Text>
        </Pressable>
    </View>
    )
};

export default AppBar;