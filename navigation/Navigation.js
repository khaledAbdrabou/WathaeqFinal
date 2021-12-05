import FamilyS from "../screens/FamilyS";
import CategoryMealsScreen from "../screens/CategoryMealsScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import React from "react";
//import Colors from "../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
// import { Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Platform } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import SettingsS from "../screens/SettingsS";
import CalendarS from "../screens/CalendarS";
import HomeS from "../screens/HomeS";
import SearchS from "../screens/SearchS"
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import CameraTestS from "../screens/CameraTestS";
import HomeS1 from "../screens/HomeSwithdelte";
import EndUserAgreement from "../screens/EndUagreementS";
import OnboardingScreen from "../screens/OnboardingS";
import DocPicker from "../screens/UploadS";
import PersonalInfo from "../screens/PersonalInfo"

// credentials context
import { CredentialsContext } from '../components/Credentialscontext';



//colors
import { Colors } from '../constants/styles';
import PersonalInfoS from "../screens/PersonalInfo";
import ProfileScreen from "../screens/NSettingS";
import SearchS1 from "../screens/SearchS1";
import { CameraTestS1 } from "../screens/CameraTestS1";

const { darkLight, brand, tertiary, secondary } = Colors;

const Stack = createNativeStackNavigator();

const Tab =
  Platform.OS === "android"
    ? createMaterialBottomTabNavigator()
    : createBottomTabNavigator();
const Drawer = createDrawerNavigator();
// function LogoTitle() {
//   return (
//     <Image
//       style={{ width: 50, height: 50 }}
//       source={require('../assets/favicon.png')}
//     />
//   );
// }

function MainStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Categories"
      screenOptions={{
        headerStyle: {
          backgroundColor: "#589D84",
        },
        
      }}
    >
      <Stack.Screen
        name="Family"
        component={FamilyS}

        options={{
          title: "Family",
          headerTintColor: "#fff",
          
        }}
      />
      <Stack.Screen
        name="CategoryMeals"
        component={CategoryMealsScreen}
        options={{ title: "Category Meals" }}
      />
      <Stack.Screen
        name="MealDetail"
        component={MealDetailScreen}
        options={{ title: "Meal Detail" }}
      />

    </Stack.Navigator>
  );
}
const SettingSnavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#589D84",
      },
    }}
  >
    <Stack.Screen
      name="Settings"
      component={SettingsS}
      options={{
        title: "Settings",
        headerTintColor: "#fff",
     
      }}
    />
  </Stack.Navigator>
);
const HomeSnavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#589D84",
        margin:10,
      },
    }}
  >
    <Stack.Screen
      name="Home"
      component={HomeS}
      options={{
        title: "Home",
        headerTintColor: "#fff",
        
      }}
    />
  </Stack.Navigator>
);
const SearchSnavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#589D84",
      },
    }}
  >
    <Stack.Screen
      name="Search"
      component={SearchS1}
      options={{
        title: "Search",
        headerTintColor: "#fff",
       
      }}
    />
  </Stack.Navigator>
);
const CalendarSnavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#589D84",
      },
    }}
  >
    <Stack.Screen
      name="Calender"
      component={CalendarS}
      options={{
        title: "Calendar",
        headerTintColor: "#fff",
        
      }}
    />
  </Stack.Navigator>
);

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.secondary,
        shifting: Platform.OS === "android",
      }}
      initialRouteName='HomeScreen'
      activeColor="white"
      shifting={Platform.OS === "android"}
      barStyle={{ backgroundColor: "#589D84"}}
    >
      <Tab.Screen
        name="Searchscreen"
        component={SearchSnavigator}
        options={{
          tabBarLabel: "Search",

          tabBarIcon: (tabinfo) => {
            return (
              <Ionicons name="search" size={23} color={tabinfo.color} />
            );
          },

          tabBarColor: "#fffff",
        }}
      />
      <Tab.Screen
        name="CalendarScreen"
        component={CalendarSnavigator}
        options={{
          tabBarLabel: "Calendar",
          tabBarIcon: (tabinfo) => {
            return <Ionicons name="calendar" size={23} color={tabinfo.color} />;
          },
          tabBarColor: Colors.secondary,
        }}
      />
      <Tab.Screen
        name="HomeScreen"
        component={HomeSnavigator}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: (tabinfo) => {
            return <Ionicons name="home" size={23} color={tabinfo.color} />;
          },
          tabBarColor: Colors.secondary,
        }}
      />
      <Tab.Screen
        name="FamilyS"
        component={MainStackNavigator}
        options={{
          tabBarLabel: "Family",
          tabBarIcon: (tabinfo) => {
            return <Ionicons name="people-circle-outline" size={23} color={tabinfo.color} />;
                          },
          tabBarColor: Colors.secondary,
        }}
      />
        <Tab.Screen
          name="SettingsScreen"
          component={SettingSnavigator}
          options={{
            tabBarLabel: "Settings",
            tabBarIcon: (tabinfo) => {
              return <Ionicons name="settings" size={23} color={tabinfo.color} />;
            },
            tabBarColor: Colors.secondary,
          }}
        />
    </Tab.Navigator>
  );
}

const DrawerNavigator = () => {
  return (


    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor:Colors.secondary,
        
        
      }}
      >
      <Drawer.Screen name="Home" component={Tabs} />
      <Drawer.Screen name="Camera" component={CameraTestS1} />
      <Drawer.Screen name="EUA" component={EndUserAgreement} />
      <Drawer.Screen name="Onboarding" component={OnboardingScreen} />
      <Drawer.Screen name="PersonalinfoS" component={PersonalInfoS} />
      <Drawer.Screen name="proflescreen" component={ProfileScreen} />
      
  



    </Drawer.Navigator>

  );
};



const RootStack = () => {
  return (
    <CredentialsContext.Consumer>
      {({ storedCredentials }) => (
        <NavigationContainer style={{ backgroundColor: 'red' }}>
          <Stack.Navigator
            screenOptions={{
              headerShown :false,
               headerStyle: {
                backgroundColor: 'Transparent',
                
               },
               headerTintColor: tertiary,
              headerTransparent: true,
              headerTitle: '',
              headerLeftContainerStyle: {
                 paddingLeft: 20,
               },
              
            }}
          >
            {storedCredentials ? (
              <Stack.Screen
                options={{
                  headerTintColor: "#ffff",
                }}
                name="Mainapp"
                component={DrawerNavigator}
              />
            ) : (
              <>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Signup" component={Signup} />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </CredentialsContext.Consumer>
  );
};

export default RootStack;
