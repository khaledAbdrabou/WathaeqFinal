import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Switch,SafeAreaView } from "react-native";
import CustomHeaderButton from "../components/CustomHeaderButton";
import Colors from "../constants/Colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";
import { setFilter } from "../store/actions/meals";
import { Ionicons } from '@expo/vector-icons';
import {
  Avatar,
  Title,
  Caption,
  TouchableRipple,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credentials context
import { CredentialsContext } from '../components/Credentialscontext';

const FilterSwitch = (props) => (
  <View style={styles.filterContainter}>
    <Text>{props.label}</Text>
    <Switch
      value={props.state}
      onValueChange={props.onChange}
      trackColor={{ true: Colors.primary }}
      thumbColor={Colors.secondary}
    />
  </View>
);
const FilterTab = (props) => (
  <View style={styles.filterContainter}>
    <Text>{props.label}</Text>
    <Ionicons name="chevron-forward" size={28} color="#589D84" />

  </View>
);


const SettingsS = (props) => {
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  const { fullName, email,phoneNumber } = storedCredentials;

  const clearLogin = () => {
    AsyncStorage.removeItem('WathaeqCredentials')
      .then(() => {
        setStoredCredentials("");
      })
      .catch((error) => console.log(error));
  };
  


  const [isNewupload, setisNewUpload] = useState(false);
  const [isUpcomingEvents, setisUpcomingEvents] = useState(false);
  const [isNewFamilyUpload, setisNewFamilyUpload] = useState(false);
  const { navigation } = props;
  const dispatch = useDispatch();
  const setFilteHandler = (filters) => {
    dispatch(setFilter(filters));
  };

  

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="menu"
            iconName="ios-menu"
            onPress={() => navigation.toggleDrawer()}
          />
        </HeaderButtons>
      ),
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="Logout"
            iconName="log-out"
            onPress={clearLogin}
          />
        </HeaderButtons>
      ),
    });
  }, [
    navigation,
    dispatch,
    isNewupload,
    isNewFamilyUpload,
    isUpcomingEvents,
  ]);
  return (
    <SafeAreaView style={styles.container}>

    <View
            style={{
                borderBottomColor: '#777777',
                borderBottomWidth: 1,
                padding:1,
                
            }}
            />

      <View style={styles.userInfoSection}>
        <View style={{flexDirection: 'row', marginTop: 15}}>
          <Avatar.Image 
            source={require('../assets/Pf.png')}
            size={80}
          />
          <View style={{marginLeft: 20}}>
            <Title style={[styles.title, {
              marginTop:15,
              marginBottom: 6,
            }]}>{fullName}</Title>
            <Caption style={styles.caption}></Caption>
          </View>
        </View>
      </View>

      <View style={styles.userInfoSection}>
        <View style={styles.row}>
          <Icon name="map-marker-radius" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>United Arab Emirates </Text>
        </View>
        <View style={styles.row}>
          <Icon name="phone" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{phoneNumber}</Text>
        </View>
        <View style={styles.row}>
          <Icon name="email" color="#777777" size={20}/>
          <Text style={{color:"#777777", marginLeft: 20}}>{email}</Text>
        </View>
      </View>

      {/* <View style={styles.infoBoxWrapper}>
          <View style={[styles.infoBox, {
            borderRightColor: '#dddddd',
            borderRightWidth: 1
          }]}>
            <Title>₹140.50</Title>
            <Caption>Wallet</Caption>
          </View>
          <View style={styles.infoBox}>
            <Title>12</Title>
            <Caption>Orders</Caption>
          </View>
      </View> */}

        <Text style={styles.title}>Help</Text>
        <View
            style={{
                borderBottomColor: '#777777',
                borderBottomWidth: 1,
                padding:10,
                
            }}
            />

      <View style={styles.menuWrapper}>
        <TouchableRipple onPress={() => navigation.navigate('faqs')          }>
          <View style={styles.menuItem}>
            <Icon name="help-circle-outline" color="#589D84" size={25}/>
            <Text style={styles.menuItemText}> FAQ's</Text>
          </View>
        </TouchableRipple>
      
        <TouchableRipple >
          <View style={styles.menuItem}>
            <Icon name="note" color="#589D84" size={25}/>
            <Text style={styles.menuItemText}>Terms & conditions</Text>
          </View>
        </TouchableRipple>
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color="#589D84" size={25}/>
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>

      </View>
    </SafeAreaView>
  );
};

export default SettingsS;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    fontSize: 22,
    margin: 10,
    textAlign: "left",
  },
  subtitle: {
    fontSize: 12,
    margin: 1,
    textAlign: "center",
  },
  filterContainter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    
  },
  container: {
    flex: 1,
  },
  userInfoSection: {
    paddingHorizontal: 30,
    marginBottom: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  infoBoxWrapper: {
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flexDirection: 'row',
    height: 100,
  },
  infoBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuWrapper: {
    marginTop: 10,
    
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 30,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 20,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
