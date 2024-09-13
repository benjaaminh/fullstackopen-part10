import { View, Image, StyleSheet, Pressable, Linking, FlatList } from "react-native"
import theme from "../theme";
import Text from "./Text";
const styles = StyleSheet.create({
    topContainer: {
        backgroundColor: "white",
        flexDirection: "row",
    },
    infoContainer: {
        flexGrow: 0,
        paddingTop: 5,
        paddingLeft: 10,
        flexShrink: 1
    },
    bottomContainer: {
        flexDirection: "row",
        justifyContent: "center",
        backgroundColor: "white",
        paddingBottom: 5
    },
    statsContainer: {
        flexGrow: 1,
        paddingTop: 5,
        paddingLeft: 15
    },
    languagetext: {
        color: "white",
        backgroundColor: theme.colors.primary,
        flexShrink: 1,
        padding: 5,
        borderRadius: 10
    },
    headingText: {
        fontWeight: "bold"
    },
    image: {
        width: 50,
        height: 50,
        margin: 10,
        borderRadius: 10
    },
    languageContainer: {
        flexDirection: "row"
    },
    descriptionText: {
        paddingBottom: 5,
    }
    // ...
});

const roundNumber = (number) => {
    if (number > 1000) {
        return (number / 1000).toFixed(1) + "k";
    }
    return number;
}

const Statistics = ({ text, number }) => {
    return (
        <View style={styles.statsContainer}>
            <Text style={styles.headingText}>{roundNumber(number)}</Text>
            <Text>{text}</Text>
        </View>
    )
}

const Repository = ({ item }) => {
    return (
        <View>
            <View style={styles.topContainer}>
                <Image style={styles.image} source={{ uri: item.ownerAvatarUrl }} />
                <View style={styles.infoContainer}>
                    <Text style={styles.headingText}>{item.fullName}</Text>
                    <Text style={styles.descriptionText}>{item.description}</Text>
                    <View style={styles.languageContainer}>
                        <Text style={styles.languagetext}>{item.language}</Text>
                    </View>
                </View>
            </View>
            <View style={styles.bottomContainer}>
                <Statistics text="Stars" number={item.stargazersCount} />
                <Statistics text="Forks" number={item.forksCount} />
                <Statistics text="Reviews" number={item.reviewCount} />
                <Statistics text="Rating" number={item.ratingAverage} />
            </View>
        </View>
    )
}
export default Repository