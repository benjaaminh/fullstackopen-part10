import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

export const RepositoryListContainer = ({repositories, onPress}) => {
  const repositoryNodes = repositories && repositories.edges //maps the array of edges and retrieves each node
    ? repositories.edges.map(edge => edge.node)
    : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({item})=><RepositoryItem item={item} singleView={false}/>}
      // other props
      />
    );
}

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {
  const {repositories} = useRepositories();

  return (
    <RepositoryListContainer repositories={repositories}/>
  );
};

export default RepositoryList;