import { View, Pressable } from "react-native"
import { useNavigate } from "react-router-native";
import Repository from "./Repository";
const RepositoryItem = ({  item }) => {
    const navigate = useNavigate();
    const onPress = () => {
        navigate(`/repository/${item.id}`)
    }
    return (
        <Pressable onPress={onPress}>
            <View testID="repositoryItem">
                <Repository item={item}/>
            </View>
        </Pressable>)
}

export default RepositoryItem