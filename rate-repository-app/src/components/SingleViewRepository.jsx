import theme from "../theme";
import Text from "./Text";
import { useNavigate, useParams } from "react-router-native";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import Repository from "./Repository";
import { View, Pressable, FlatList } from "react-native";

const ReviewItem = ( {review} ) => {
    console.log(review.id+"idsda")
    return (
        <View>
            <Text>{review.id}</Text>
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
    const item = data?.repository;

    const reviewNodes = item.reviews  //maps the array of edges and retrieves each node
        ? item.reviews.edges.map(edge => edge.node)
        : [];
    console.log(reviewNodes);
    console.log(reviewNodes[0].id)
    const onPress = (url) => {
        Linking.openURL(url)
    }

    return (
        <View>
            <Repository item={item} singleView={true} />
            <View style={{ backgroundColor: "white" }}>
                <Pressable style={theme.button} onPress={() => onPress(item.url)}>
                    <Text style={{ color: "white" }}>Open in github</Text>
                </Pressable>
                <FlatList
                    data={reviewNodes}
                    renderItem={({ item }) => <ReviewItem review={item} />}
                    keyExtractor={({ id }) => id}
/*                     ListHeaderComponent={() => <Repository item={item} />}
 */                />
            </View>
        </View>
    )
}

export default SingleViewRepository