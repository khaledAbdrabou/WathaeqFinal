import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity,Alert, Button, Image,Modal,Pressable } from 'react-native';
import { Camera } from 'expo-camera';
import { Ionicons, } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { CredentialsContext } from '../components/Credentialscontext';
import ImageModal from 'react-native-image-modal';

export  function CameraTestS1({navigation}) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);
  const { email } = storedCredentials;
  const [modalVisible, setModalVisible] = useState(false);

useEffect(() => {
    (async () => {
      const  cameraStatus  = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
      const  galleryStatus  = await   ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted')
})();
  }, []);
const takePicture = async () => {
    if(camera){
      const data = await camera.takePictureAsync(null);
      console.log(data)
      setImage(data.uri)
      var fileToUpload = {
        name:  Date.now()+'.jpeg',
        width: data.width,
        height: data.height,
        type: 'image/*',
        uri: data.uri
      }
      //setDoc(fileToUpload);
      const url = "http://api.sianet.me:8000/document/uploadAWS";
      //const url2= "http://api.sianet.me:8000/document/uploadDB"
      const formData = new FormData();
        formData.append('document', fileToUpload);
        formData.append('email',email)
        const upoptions = {
            method: 'POST',
            body: formData,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
        };
        fetch(url, upoptions).catch((error) => console.log(error));
        fetch('http://api.sianet.me:8000/document/uploadDB', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name:fileToUpload.name,
            associateduser: email
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
    
  }

const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Image,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
});
console.log(result);
if (!result.cancelled) {
      setImage(result.uri);
    }
};
if (hasCameraPermission === null || hasGalleryPermission === false) {
    return <View />;
}
if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
}

return (
<View style={{ flex: 1 }}>
              <Camera 
                        ref={ref => setCamera(ref)} 
                        style={{flex : 1}} 
                        type={type} 
                        ratio={'1:1'}
                      >

                  <Ionicons
                      name="arrow-back-outline"
                      style={{ color: "#fff", fontSize: 40, margin :20, marginVertical :40}}
                      onPress= { () => navigation.navigate('Home') }
                  />
              <View style={{flex:1, flexDirection:"row",margin:30,justifyContent:'space-between'}}>
                <TouchableOpacity
                  style={{
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'transparent' 
                                  
                  }}
                  onPress={()=>pickImage()}>
                  <Ionicons
                      name="images-outline"
                      style={{ color: "#fff", fontSize: 35}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                  }}
                  onPress={()=> takePicture()}
                  
                  
                  >
                  <Ionicons
                      name="camera-outline"
                      style={{ color: "#fff", fontSize: 40}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                  }}
                
                  >
                     <ImageModal
                      resizeMode="contain"
                      imageBackgroundColor= 'rgba(52, 52, 52, 0)'
                      style={{
                        width: 35,
                        height: 35,
                      }}
                      source={{
                        uri: image,
                      }}
                    />
                  
                </TouchableOpacity>
              </View>

               
            </Camera>
            
    
        </View>)






//       */}




}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});














