import React, {useState, useContext} from 'react';
import { StyleSheet, Text, View ,TouchableOpacity,Platform, Alert  } from 'react-native';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { Ionicons, } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';




export default class CameraTestS extends React.Component {
  state = {
    hasPermission: null,
    cameraType: Camera.Constants.Type.back,
    
  }
  

  async componentDidMount() {
    this.getPermissionAsync()
  }

  getPermissionAsync = async () => {
    // Camera roll Permission 
    if (Platform.OS === 'ios') {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
    // Camera Permission
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasPermission: status === 'granted' });
  }

  handleCameraType=()=>{
    const { cameraType } = this.state

    this.setState({cameraType:
      cameraType === Camera.Constants.Type.back
      ? Camera.Constants.Type.front
      : Camera.Constants.Type.back
    })
  }

  takePicture = async () => {
    

    if (this.camera) {
      // let photo = await this.camera.takePictureAsync();
      const options = {quality: 1, uri:true };
      const data = await this.camera.takePictureAsync(options);
      console.log(data);
      //const [ doc, setDoc ] = useState();
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
        // formData.append('email',email)
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
            // associateduser: email
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

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images
    });
    console.log(result);
  }
  

  render(){
    const { hasPermission } = this.state
  
    
    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
          <View style={{ flex: 1 }}>
            <Camera style={{ flex: 1 }} type={this.state.cameraType}  ref={ref => {this.camera = ref}}>
              <View style={{flex:1, flexDirection:"row",justifyContent:"space-between",margin:30}}>
                <TouchableOpacity
                  style={{
                    alignSelf: 'flex-end',
                    alignItems: 'center',
                    backgroundColor: 'transparent'                 
                  }}
                  onPress={()=>this.pickImage()}>
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
                  onPress={()=>this.takePicture()}
                  
                  
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
                  onPress={()=>this.handleCameraType()}
                  >
                  <Ionicons
                      name="camera-reverse-outline"
                      style={{ color: "#fff", fontSize: 40}}
                  />
                </TouchableOpacity>
              </View>
            </Camera>
        </View>
      );
    }
  }
  
}