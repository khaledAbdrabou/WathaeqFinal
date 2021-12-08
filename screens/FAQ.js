import * as React from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView,TouchableHighlight } from 'react-native';
import { Constants, WebBrowser } from 'expo';
import Dummylist from "../data/Dummylist";



const Visibleitem = props => {
    const{data} = props;
    return (
      
    <View style={styles.rowFront}>
      <TouchableOpacity>
        <View>
          <Text style = {styles.title} numberOfLines={1}>
            {data.item.title}
          </Text>
          <Text style = {styles.details} numberOfLines={1}>
            {data.item.details}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
    );
  };
  
const renderItem = (data, rowMap) =>{
    return( <Visibleitem data={data}/>)
    };



const faqs = (props) => {

    return (
      <SafeAreaView style={{ flex: 1 }}>   
      <View style={styles.container}>
      <FlatList
          style={{width:'100%'}}
          data={Dummylist}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
          <TouchableHighlight
            key={item.key}
       
          
            style={{ borderRadius: 50}}>
            <View style={styles.item}>
            <Text style={styles.list}><Text style ={styles.boldingname}>{(item.title)}{"\n"}{"\n"}</Text>{(item.details)} </Text>
            </View>
          </TouchableHighlight>
      )}
    />
      </View>
    </SafeAreaView>


        

    );
  }
export default faqs;

const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    container:{
      marginTop:17

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
      fontWeight: 'normal',
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