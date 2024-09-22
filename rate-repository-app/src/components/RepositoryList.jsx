import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';
import { useNavigate } from 'react-router-native';
import {Picker} from "@react-native-picker/picker"
import { useState } from 'react';
import { Searchbar } from 'react-native-paper'
import {useDebounce} from 'use-debounce'
import React from 'react';
const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const RepositoryListHeader = ({orderBy, setOrderBy, filter, setFilter}) => {
  return(
    <>
  <Picker style={{margin:10}} selectedValue={orderBy}
  onValueChange={setOrderBy}>
    <Picker.Item label="highest" value="highest"/>
    <Picker.Item label="lowest" value="lowest"/>
    <Picker.Item label='latest' value="latest"/>
  </Picker>
  <Searchbar style={{margin:10}}
  placeholder='Search'
  value={filter}
  onChangeText={setFilter}/>
  </>
  )
 }
export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props
  
  
  return ( <RepositoryListHeader orderBy={props.orderBy} setOrderBy={props.setOrderBy} filter={props.filter} setFilter={props.setFilter}/>) 
  }
    render () {

      const props = this.props
      const repositoryNodes = props.repositories && props.repositories.edges //maps the array of edges and retrieves each node
    ? props.repositories.edges.map(edge => edge.node)
    : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({item})=><RepositoryItem item={item}/>}
        ListHeaderComponent={this.renderHeader}
      />
    );
}
}

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryList = () => {


  const [orderBy, setOrderBy] = useState('latest')

  const [filter, setFilter] = useState('')
  const [debounced] = useDebounce(filter, 500)

  const {repositories} = useRepositories(orderBy, debounced);

  return (
    <RepositoryListContainer repositories={repositories} orderBy={orderBy} setOrderBy={setOrderBy} filter={filter} setFilter={setFilter}/>
  );
};

export default RepositoryList;