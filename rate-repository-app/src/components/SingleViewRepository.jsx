import theme from "../theme";
import Text from "./Text";
import { useNavigate, useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import Repository from "./Repository";
import { View, Pressable, FlatList, StyleSheet } from "react-native";
import {format } from "date-fns"
const RepositoryInfo = ({ repository }) => {

    const onPress = (url) => {
        Linking.openURL(url)
    }
    return (
        <View style={{ backgroundColor: "white" }}>
            <Repository item={repository} />
            <Pressable style={theme.button} onPress={() => onPress(repository.url)}>
                <Text style={{ color: "white" }}>Open in github</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        flexDirection: "row",
    },
    rating: {
        flexShrink:0, //keep circle same size
        width: 45,
        height: 45,
        borderColor: theme.colors.primary,
        borderRadius: 45 / 2,
        borderWidth: 2,
        margin: 5,
        textAlign: "center",
        color: theme.colors.primary,
        paddingTop: 12, //put rating to middle of circle
        fontWeight: "bold"
    },
    infoContainer: {
        flexShrink: 1, //text goes down at border of screen
        paddingTop: 5,
        paddingLeft: 10,
    }
});

export const ReviewItem = ({ review, listView, fullName }) => {
    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.rating}>{review.rating}</Text>
                <View style={styles.infoContainer}>{/*  separate container to get them on top of eachother */}
                    {listView ? <Text style={{ fontWeight: "bold" }}>{fullName}</Text> :
                    <Text style={{ fontWeight: "bold" }}>{review.user.username}</Text>}
                    <Text style={{marginBottom:2, color: "grey"}}>{format(new Date(review.createdAt), "dd.MM.yyyy")}</Text>
                    <Text>{review.text}</Text>
                </View>
            </View>
        </View>
    )
}

const SingleViewRepository = () => {
    const { id } = useParams(); //id requires {} around it
    const { data, loading } = useQuery(GET_REPOSITORY, { // get data from the query
        variables: { id }
    });
    //page will load for a split second on press, so we need to render loading
    if (loading) {
        return <Text>Loading...</Text>;
    }
    const repository = data?.repository;
    const reviewNodes = repository.reviews  //maps the array of edges and retrieves each node
        ? repository.reviews.edges.map(edge => edge.node)
        : [];

    const ItemSeparator = () => <View style={{ height: 10 }} />;

    return (
        <View>
            <FlatList
                data={reviewNodes}
                renderItem={({ item }) => <ReviewItem review={item} />}
                keyExtractor={({ id }) => id}
                ItemSeparatorComponent={ItemSeparator}
                ListHeaderComponent={() => (
                    <View>
                        <RepositoryInfo repository={repository} />
                        <View style={{ height: 10, backgroundColor: 'lightgrey' }} />
                    </View>)}
            />
        </View>
    )
}

export default SingleViewRepository