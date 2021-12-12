
import CustomHeaderButton from "../components/CustomHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import React, { useState, useEffect, useContext } from 'react';
import { TextInput } from "react-native";
import { Linking } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { CredentialsContext } from '../components/Credentialscontext';

// import all the components we are going to use
import { SafeAreaView, Text, StyleSheet, View, FlatList,TouchableOpacity } from 'react-native';
import { SearchBar } from 'react-native-elements';
import { requestPermissionsAsync } from "expo-calendar";





const makepretty2 = (item) => {
  let x = item.doc.split('wathaeqapp?');
  return(x[x.length - 1]);
}

const getawsitem2 = (item) => {
  const url = 'http://api.sianet.me:8000/document/download-text/'+item._id;
  Linking.openURL(url).catch(err => console.error('Error', err));
  }

const SearchS1 = (props) => {
  // const [search, setSearch] = useState('');
  const [ Searchname, Setsearchname ] = useState('');
  const [documents, setdocuments] = useState([{
    id:'',
    name: '',
    uri:'',
    date:'',
}])

const [text, settext] = useState([{
  doc:'',
  text:''
}])

const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
const { email } = storedCredentials;


const searchdocs = () => {
    fetch('http://api.sianet.me:8000/document/search/'+email,{
      method:'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        term:Searchname
      })})
     
      .then((response) => response.json())
      .then((responseJson) => {
        // setFilteredDataSource(responseJson);
       settext(responseJson);
       
       
        
      })
      .catch((error) => {
        console.error(error);
      });
}







  useEffect(() => {
    props.navigation.setOptions({
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="menu"
            iconName="ios-menu"
            onPress={() =>props.navigation.toggleDrawer() }
          />
        </HeaderButtons>
      ),
    });
  }, [props.navigation]);




  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
      <TextInput style={styles.inputbutton}
      placeholder= ' Document Name Or Content '
      onChangeText = {(val) => Setsearchname(val)}
      />
      <TouchableOpacity style={styles.panelButton} onPress={() => searchdocs()} >
        <Text style={styles.panelButtonTitle}>Search Document</Text>
      </TouchableOpacity>

<FlatList
          style={{width:'100%'}}
          data={text}
          keyExtractor={(item, index) => 'key'+index}
          renderItem={({ item, index, separators }) => (
          <TouchableOpacity
            key={item.key}
            onPress={() => getawsitem2(item)}
          
            style={{ borderRadius: 50}}>
            <View style={styles.item}>
            <Text style={styles.list}> <Text style ={styles.boldingname}>Name:</Text> {makepretty2(item)} </Text>
            </View>
          </TouchableOpacity>
      )}
    />
      </View>
    </SafeAreaView>
  );
};



export default SearchS1;


const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: 'absolute',
    width: '90%',
    height: '88%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignSelf: 'auto',
    margin:8,
    marginLeft:20,
    marginRight:20,
    borderRadius: 10,
    



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
