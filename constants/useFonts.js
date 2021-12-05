import * as Font from 'expo-font';

export default useFonts = async () =>
  await Font.loadAsync({
    Regular: require('../constants/Hooks/RobotoCondensed-Regular.ttf'),
    Bold: require('../constants/Hooks/RobotoCondensed-Bold.ttf'),
  });