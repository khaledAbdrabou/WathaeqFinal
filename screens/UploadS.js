import React,{useState } from "react";
import { StyleSheet, View,SafeAreaView,TouchableOpacity,Text,Alert } from "react-native";

import * as DocumentPicker from 'expo-document-picker';


const DocPicker = ({navigation}) => {
  const [ doc, setDoc ] = useState();
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
        
  }  
  const meow = () => {
    fetch('http://api.sianet.me:8000/document/uploadDB', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name:doc.name,
      }),
    }); 
  }
  const postDocument = () => {
    const url = "http://api.sianet.me:8000/document/uploadAWS";
    const url2= "http://api.sianet.me:8000/document/uploadDB"
    const fileUri = doc.uri;
    const formData = new FormData();
    formData.append('document', doc);
    
    const options = {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
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
      }),
    }); 
    Alert.alert(
      "Upload Succesful",
      "Your Document has succefully been Upoaded",
      [
        { text: "OK", onPress: () => console.log('ok Pressed') }
      ]
    );
  }




  return ( 
    <SafeAreaView>
      <View>

          <TouchableOpacity onPress={pickDocument} style={styles.appButtonContainer}>
              <Text style={styles.appButtonText}>Select Document</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={postDocument} style={styles.appButtonContainer}>
              <Text style={styles.appButtonText}>Upload Document </Text>
          </TouchableOpacity>

          <TouchableOpacity
             onPress={() => navigation.navigate('Camera')}
            style={{ 
              elevation: 8,
              backgroundColor: "#589D84",
              borderRadius: 10,
              paddingVertical: 10,
              paddingHorizontal: 12,
              margin:5, }}>
           <Text style={{ 
                 fontSize: 18,
                 color: "#fff",
                 fontWeight: "bold",
                 alignSelf: "center",
                 textTransform: "uppercase"
           }}>Pick a photo</Text>
         </TouchableOpacity>

      


      </View>
    </SafeAreaView>       
  )
}


export default DocPicker;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
});