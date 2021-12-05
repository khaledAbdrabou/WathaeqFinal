import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./navigation/Navigation";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { enableScreens } from "react-native-screens";
import mealReducer from "./store/reducers/meals";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";


// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credentials context
import { CredentialsContext } from './components/Credentialscontext';

//font
import useFonts from './constants/useFonts';


enableScreens();

const rootReducer = combineReducers({
  meals: mealReducer,
});

const store = createStore(rootReducer);
const loadFont = () => {
  return Font.loadAsync({
    Regular: require('./constants/Hooks/RobotoCondensed-Regular.ttf'),
    Bold: require('./constants/Hooks/RobotoCondensed-Bold.ttf'),
  });
};
export default function App() {
  //const [dataLoaded, setDataLoaded] = useState(false);
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState("");

  const checkLoginCredentials = () => {
    AsyncStorage.getItem('WathaeqCredentials')
      .then((result) => {
        if (result !== null) {
          setStoredCredentials(JSON.parse(result));
        } else {
          setStoredCredentials(null);
        }
      })
      .catch((error) => console.log(error));
  };


  
  

  if (!appReady) {
    return <AppLoading 
    startAsync={checkLoginCredentials} 
    onFinish={() => setAppReady(true)} 
    onError={console.warn} />;
  }


  

  
  return (
    <Provider store={store}>
      <CredentialsContext.Provider value={{ storedCredentials, setStoredCredentials }}> 
      
          <Navigation />
 
      </CredentialsContext.Provider>
    </Provider>
  );
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
