import React, { useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, Switch,SafeAreaView , TouchableOpacity} from "react-native";
import CustomHeaderButton from "../components/CustomHeaderButton";
import Colors from "../constants/Colors";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch } from "react-redux";
import { setFilter } from "../store/actions/meals";
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser'
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

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync('https://wathaeq.wixsite.com/wathaeq');
    setResult(result);
  };
  


  const [isNewupload, setisNewUpload] = useState(false);
  const [isUpcomingEvents, setisUpcomingEvents] = useState(false);
  const [isNewFamilyUpload, setisNewFamilyUpload] = useState(false);
  const [result, setResult] = useState(null);
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
      
       
        <TouchableRipple onPress={() => {}}>
          <View style={styles.menuItem}>
            <Icon name="account-check-outline" color="#589D84" size={25}/>
            <Text style={styles.menuItemText}>Support</Text>
          </View>
        </TouchableRipple>

      </View>

      <TouchableRipple onPress={_handlePressButtonAsync}>
          <View style={styles.menuItem}>
          <Ionicons name="earth-outline" size={25} color="#589D84" />
            <Text style={styles.menuItemText}>Visit our website</Text>
          </View>
        </TouchableRipple>

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

  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 20,
    margin:3
  },
  list:{
    textTransform: 'uppercase', fontWeight: 'normal',
    padding: 20,
    alignSelf: 'auto',
    color:'#212b21',
    
  },

  boldingname:{
    fontWeight: 'bold',
    paddingLeft:0,
    marginLeft:0,
  },
 
  item:{
    backgroundColor:"#dee3de", 
    alignSelf: 'auto',
    margin:8,
    marginLeft:20,
    marginRight:20,
    borderRadius: 10,
  },
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  header: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  inputbutton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#ebebeb',
    alignItems: 'center',
    marginVertical: 17,
    marginRight :20,
    marginLeft :20,

  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#589D84',
    alignItems: 'center',
    marginVertical: 7,
    marginRight :20,
    marginLeft :20,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actionError: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#FF0000',
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a',
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#589D84",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    margin:5,
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  
});
