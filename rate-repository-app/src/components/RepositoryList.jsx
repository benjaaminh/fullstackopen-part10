import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import {Picker} from "@react-native-picker/picker"
import { useState } from 'react';


const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const SortBy = ({orderBy, setOrderBy}) => {
  return(
  <Picker selectedValue={orderBy}
  onValueChange={setOrderBy}>
    <Picker.Item label="highest" value="highest"/>
    <Picker.Item label="lowest" value="lowest"/>
    <Picker.Item label='latest' value="latest"/>
  </Picker>
  )
 }
export const RepositoryListContainer = ({repositories, orderBy, setOrderBy}) => {
  const repositoryNodes = repositories && repositories.edges //maps the array of edges and retrieves each node
    ? repositories.edges.map(edge => edge.node)
    : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({item})=><RepositoryItem item={item}/>}
        ListHeaderComponent={() => <SortBy orderBy={orderBy} setOrderBy={setOrderBy}/>}
      />
    );
}

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {

  const [orderBy, setOrderBy] = useState('latest')

  const {repositories} = useRepositories(orderBy);

  return (
    <RepositoryListContainer repositories={repositories} orderBy={orderBy} setOrderBy={setOrderBy}/>
  );
};

export default RepositoryList;