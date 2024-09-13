import { View, Image, StyleSheet, Pressable } from "react-native"
import theme from "../theme";
import Text from "./Text";
import { useNavigate, useParams } from "react-router-native";
import useRepository from "../hooks/useRepository";
import { useQuery } from "@apollo/client";
import { GET_REPOSITORY } from "../graphql/queries";
import Repository from "./Repository";


const SingleViewRepository = () => {
const {id} = useParams(); //id requires {} around it
    const { data, loading } = useQuery(GET_REPOSITORY, { // get data from the query
        variables: { id }
    });
    //page will load for a split second on press, so we need to render loading
    if (loading) {
        return <Text>Loading...</Text>;
    }
    const item = data?.repository;
    return (
            <Repository item={item} singleView={true}/>
        )
}

export default SingleViewRepository