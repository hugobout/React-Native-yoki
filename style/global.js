import {StyleSheet} from 'react-native';

export const globalStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    width: '100%',
    paddingTop: 10,
    backgroundColor: 'gold',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
});
