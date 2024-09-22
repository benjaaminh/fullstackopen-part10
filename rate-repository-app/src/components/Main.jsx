import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate, useParams } from 'react-router-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import theme from '../theme';
import RepositoryItem from './RepositoryItem';
import SingleView from './SingleViewRepository';
import SingleViewRepository from './SingleViewRepository';
import ReviewForm from './Review';
import Review from './Review';
import SignUp from './SignUp';
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: "lightgrey",
    fontFamily: theme.fonts.main
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/review" element={<Review/>}/>
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/repository/:id" element={<SingleViewRepository/>}/>
        <Route path="*" element={<Navigate to="/" replace />} /> {/* any route that is not / will redirect to / */}
      </Routes>
    </View>
  );
};

export default Main;