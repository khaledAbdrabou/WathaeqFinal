import React,{ useEffect, useState, useContext } from "react";
import { FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View, Text, Alert, textInput, Dimensions } from "react-native";
// import Colors from "../constants/Colors";
import FamilyGridTiles from "../components/FamilyGridTiles";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Linking } from "react-native";
import AWS, { ConnectContactLens } from 'aws-sdk';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
import * as DocumentPicker from 'expo-document-picker';
// credentials context
import { CredentialsContext } from '../components/Credentialscontext';
import { TextInput } from "react-native";
import { useSafeAreaFrame } from 'react-native-safe-area-context';



const s3 = new AWS.S3({
  accessKeyId: "AKIAYTHCDTK5GB4HQTVH",
  secretAccessKey: "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",
  region: 'ap-south-1',
  signatureVersion: "v4",
})


const makepretty = (item) => {
  let x = item.name.split('wathaeqapp?');
  return(x[x.length - 1]);
}

const makepretty2 = (item) => {
  let x = item.dateCreated.tostring().split('T')[0];
  return(x);
}







const HomeS = (props) => {
  const [documents, setdocuments] = useState([{
    id:'',
    name: '',
    uri:'',
    date:'',
}])
const DEVICE_HEIGHT = Dimensions.get('screen').height;
const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
const { email } = storedCredentials;
const [ sharename, Setsharename ] = useState('');
const [ doc, setDoc ] = useState();
const [ selecteditems, setselecteditems ] = useState([]);





//upload BS
const bs = React.createRef();
const fall = new Animated.Value(1);


//Share BS
const bs1 = React.createRef();
const fall1 = new Animated.Value(1);

useEffect(() => {
  fetch('http://api.sianet.me:8000/document/list/'+email,{method:'GET'})
  .then(res => {
    if(res.ok){
        return res.json()
    }
}).then(jsonRes => setdocuments(jsonRes));
})
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
     headerRight: () => (
       <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
         <Item
           title="sharebutton"
           iconName="camera-outline"
           onPress={() => props.navigation.navigate('Camera')}
         />
      </HeaderButtons>
     )
  });
}, [props.navigation]);
  const displayItems = (itemData) => {
    return (
      <FamilyGridTiles
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => {
            
        }}
      />
    );
  };
  

 

  const getawsitem = (item) => {
  const url = 'http://api.sianet.me:8000/document/download/'+item._id;
  Linking.openURL(url).catch(err => console.error('Error', err));
  }



  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({ type: "*/*", copyToCacheDirectory: true }).then(response => {
        if (response.type == 'success') {          
          let { name, size, uri } = response;
          let nameParts = name.split('.');
          let fileType = nameParts[nameParts.length - 1];
          var fileToUpload = {
            name: name,
            size: size,
            uri: uri,
            type: "application/" + fileType
          };
          console.log(fileToUpload, '...............file')
          setDoc(fileToUpload);
        } 
      });
      console.log("Doc: " + doc);
      
};

const postDocument = () => {
  const url = "http://api.sianet.me:8000/document/uploadAWS";
  const url2= "http://api.sianet.me:8000/document/uploadDB"
  const fileUri = doc.uri;
  const formData = new FormData();
  formData.append('document', doc);
  formData.append('email',email)
  const options = {
      method: 'POST',
      body: formData,
      headers:{'content-type': 'multipart/form-data'},

  };
  fetch(url, options).catch((error) => console.log(error));
  fetch('http://api.sianet.me:8000/document/uploadDB', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name:doc.name,
      associateduser:email,
    }),
  }); 
  Alert.alert(
    "Upload Succesful",
    "Your Document has succefully been Uploaded",
    [
      { text: "OK", onPress: () => console.log('ok Pressed') }
    ]
  );
};


const handleonlongpress= (item) =>{
  if (selecteditems.includes(item._id)){
    const newlistitem = selecteditems.filter(itemId => itemId !== item._id)
     return setselecteditems(newlistitem)
  }
  setselecteditems([...selecteditems, item._id ])
}
const handleoutsidepress = () =>  setselecteditems([]);



const deletedocs = () =>  {
  for(const meow of selecteditems)
  {
    const data = {id: meow, user: email}
    console.log(data)
    fetch('http://api.sianet.me:8000/document/delete/',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
}

const sharedocs = () => {
  for(const meow of selecteditems)
  {
    const data = {id: meow, entity: sharename}
    fetch('http://api.sianet.me:8000/document/share',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
}
// SHare name is the name of search
// console.log(sharename);

const stopsharedocs = () => {
  for(const meow of selecteditems)
  {
    const data = {id: meow}
    console.log(meow);
    fetch('http://api.sianet.me:8000/document/stopshare',{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }
}

const Printing = () =>  console.log(selecteditems);

const getselected = (item) => selecteditems.includes(item._id);


renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload document</Text>
        <Text style={styles.panelSubtitle}>Choose Your Document</Text>
      </View>
      <TouchableOpacity style={styles.panelButton} onPress={pickDocument} >
        <Text style={styles.panelButtonTitle}>Select Document</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={postDocument}>
        <Text style={styles.panelButtonTitle}>Upload Document</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );


 renderInner1 = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>share document</Text>
        <Text style={styles.panelSubtitle}>Choose the Document you want to Share</Text>
      </View>
      <TextInput style={styles.inputbutton}
      placeholder= ' Name of The reciever '
      onChangeText = {(val) => Setsharename(val)}
      
      
      />


      <TouchableOpacity style={styles.panelButton} onPress={() => sharedocs(selecteditems)} >
        <Text style={styles.panelButtonTitle}>Share Document</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.panelButton} onPress={() => stopsharedocs(selecteditems)}>
        <Text style={styles.panelButtonTitle}>Stop sharing Document</Text>
      </TouchableOpacity>
      {/* <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity> */}
    </View>
  );

  renderHeader1 = () => (
    <View style={styles.header}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  );
;
  


  return (
    <SafeAreaView style={styles.screen}>
    
    
    
    <BottomSheet
      ref={bs}
      snapPoints={[460, 0]}
      renderContent={renderInner}
      renderHeader={renderHeader}
      initialSnap={1}
      callbackNode={fall}
      enabledGestureInteraction={true}
    />


    <BottomSheet
      ref={bs1}
      snapPoints={[460, 0]}
      renderContent={renderInner1}
      renderHeader={renderHeader1}
      initialSnap={1}
      callbackNode={fall1}
      enabledGestureInteraction={true}
    />



    <View style={{ flexDirection :"row", paddingTop:'5%', paddingBottom :'2%',}}>

       <TouchableOpacity
            onPress={() => bs.current.snapTo(0) + bs1.current.snapTo(1)}
            style={{ 
              elevation: 8,
              backgroundColor: "#589D84",
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 22,
              marginHorizontal:10,
              margin:5, 
              }}>
           {/* <Text style={{ 
                 fontSize: 18,
                 color: "#fff",
                 fontWeight: "bold",
                 alignSelf: "center",
                 textTransform: "uppercase"
           }}>Upload</Text> */}
              <Ionicons name="cloud-upload-outline" size={25} color="white"/>
      </TouchableOpacity>
      <TouchableOpacity
            onPress={() => bs1.current.snapTo(0) + bs.current.snapTo(1)}
            style={{ 
              elevation: 8,
              backgroundColor: "#589D84",
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 22,
              margin:5, 
              marginHorizontal:10,
              }}>
           {/* <Text style={{ 
                 fontSize: 18,
                 color: "#fff",
                 fontWeight: "bold",
                 alignSelf: "center",
                 textTransform: "uppercase"
           }}>Share</Text> */}
           <Ionicons name="share-outline" size={25} color="white"/>
      </TouchableOpacity>
      <TouchableOpacity
            onPress={() => handleoutsidepress()}
            style={{ 
              elevation: 8,
              backgroundColor: "#589D84",
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 22,
              margin:5, 
              marginHorizontal:10,
              }}>
           {/* <Text style={{ 
                 fontSize: 18,
                 color: "#fff",
                 fontWeight: "bold",
                 alignSelf: "center",
                 textTransform: "uppercase"
           }}> UnSelect </Text> */}
           <Ionicons name="close-circle-outline" size={25} color="white"/>
      </TouchableOpacity>
      <TouchableOpacity
            onPress={() => deletedocs(selecteditems) + handleoutsidepress()}
            style={{ 
              elevation: 8,
              backgroundColor: "#589D84",
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 22,
              margin:5, 
              marginHorizontal:10,
              }}>
           {/* <Text style={{ 
                 fontSize: 18,
                 color: "#fff",
                 fontWeight: "bold",
                 alignSelf: "center",
                 textTransform: "uppercase"
           }}> UnSelect </Text> */}
           <Ionicons name="trash-outline" size={25} color="white"/>
      </TouchableOpacity>


    </View>
          <FlatList
          style={{width:'95%'}}
          data={documents}
          keyExtractor={(item, index) => 'key'+index}
          renderItem={({ item, index, separators }) => (
          <TouchableOpacity
            key={item.key}
            onPress={() => getawsitem(item)}
            onLongPress= {() =>handleonlongpress(item)}
            selected={getselected(item)}
            //onLongPress= {() => console.log(item)}
            style={{ borderRadius: 50}}>
            <View style={styles.item}>
            <Text style={styles.list}> <Text style ={styles.boldingname}>Name:</Text> {makepretty(item)} {"\n"}{"\n"}<Text style ={styles.boldingname}> Date Uploaded:</Text> { item.dateCreated }</Text>
            </View>
          {  getselected(item) && <View style={styles.overlay}/>}
          </TouchableOpacity>
      )}
    />

    </SafeAreaView>
  
  );
 
};
export default HomeS;

/*
{DATA.map(document =>
       <TouchableOpacity style={styles.button} onPress={() => getItem(document)}>
        <Text style={{ textTransform: 'uppercase', fontWeight: 'bold'}}>Name: {document.name}{"\n"}</Text>
       </TouchableOpacity>
        )}
 */

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
    marginVertical: 7,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#589D84',
    alignItems: 'center',
    marginVertical: 7,
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