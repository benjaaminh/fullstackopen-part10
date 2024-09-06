import { StyleSheet, View } from 'react-native';
import { Route, Routes, Navigate } from 'react-router-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import theme from '../theme';

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
        <Route path="/signIn" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/" replace />} /> {/* any route that is not / will redirect to / */}
      </Routes>
    </View>
  );
};

export default Main;