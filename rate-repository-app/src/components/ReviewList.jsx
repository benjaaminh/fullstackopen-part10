import { useQuery } from "@apollo/client";
import { ME } from "../graphql/queries";
import Text from "./Text";
import { FlatList, View, Pressable, StyleSheet, Alert } from "react-native";
import { ReviewItem } from "./SingleViewRepository";
import theme from "../theme";

const handleDeletePress= () => {
    Alert.alert(
        "Delete review",
        "Are you sure you want to delete this review?",
        [
            { text: 'Cancel',  
                onPress: () => console.log('Cancel Pressed'),  
                style: 'cancel',  },
                {text: 'OK', onPress: () => console.log('OK Pressed')},  
        ]
    )
}

const handleViewPress = () => {
    return (
        console.log("aloo")
    )
}

const ReviewList = () => {
    const styles = StyleSheet.create({
        container: {
            backgroundColor: "white",
            flexDirection: "row",
            justifyContent:"center",
        },
        reviewButton: {
            flex:1,
            margin: 5,
            paddingTop: 10,
            borderRadius: 4
        },
        listContainer: {
            flex:1
        }
    });

    const { data, loading } = useQuery(ME, { // get data from the query
        variables: { includeReviews: true }
    });

    if (loading) {
        return <Text>Loading...</Text>;
    }
    const repositories = data.repository
    console.log(repositories)s
    const myReviews = data.me.reviews
    const reviewNodes = myReviews  //maps the array of edges and retrieves each node
        ? myReviews.edges.map(edge => edge.node)
        : [];
    const ItemSeparator = () => <View style={{ height: 10 }} />;
    return (
        <View style={styles.listContainer}>
            <FlatList
                data={reviewNodes}
                renderItem={({ item }) => ( //buttons
                <View> 
                <ReviewItem review={item} listView={true} /* fullName={data.repository.fullName} */ />
                <View style={styles.container}>
                    <Pressable onPress={handleViewPress} style={[theme.button, styles.reviewButton]}><Text style={{color: "white"}}>View repository</Text></Pressable>
                    <Pressable onPress={handleDeletePress} style={[theme.button, styles.reviewButton, {backgroundColor: "red"}]}><Text style={{color: "white"}}>Delete review</Text></Pressable>
                </View>
                </View>)
                }
                ItemSeparatorComponent={ItemSeparator}
            />
        </View>
    )
}
export default ReviewList