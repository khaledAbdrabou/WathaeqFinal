import React,{ useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, TouchableOpacity, View, Text, TouchableHighlight,Animated } from "react-native";
import {CATEGORIESHOME } from "../data/dummy-data";
// import Colors from "../constants/Colors";
import FamilyGridTiles from "../components/FamilyGridTiles";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { Linking } from "react-native";
import Dummylist from "../data/Dummylist";
import { Ionicons } from '@expo/vector-icons';


import { SwipeListView } from 'react-native-swipe-list-view';


const HomeS1 = (props) => {
  
const [documents, setdocuments] = useState([{
    id:'',
    name: '',
    uri:'',
    date:'',
}])

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


const closeRow = (rowMap, rowKey) => {
  if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
  }
};

const deleteRow = (rowMap, rowKey) => {
  closeRow(rowMap, rowKey);
  const newData = [...listData];
  const prevIndex = listData.findIndex(item => item.key === rowKey);
  newData.splice(prevIndex, 1);
  setListData(newData);
};

const renderItem = (data, rowMap) =>{
return( <Visibleitem data={data}/>)
};

const HiddenItemWithActions = props => {
  const {swipeAnimatedValue, onClose,ondelete} = props;
  return (
    <View style= {styles.rowBack}>
      <Text> left </Text>
      <TouchableOpacity style = {[styles.backRightBtn, styles.backRightBtnLeft]} onPress={onClose}> 
      <View style={styles.trash}> 
      <Ionicons name="close-circle-outline" size={25} color="white"/>
      </View>
      </TouchableOpacity>
      <TouchableOpacity style = {[styles.backRightBtn, styles.backRightBtnRight]} onPress={ondelete}> 
      
      <Animated.View style={[ styles.trash,{
                  transform: [
                      {
                        scale: swipeAnimatedValue.interpolate({
                          inputRange: [-90, -45],
                          outputRange: [1, 0],
                          extrapolate: 'clamp',
                    }),
                  },
                ],
              },
            ]}> 


      <Ionicons name="trash-outline" size={25} color="white"/>
      </Animated.View>

      </TouchableOpacity>

    </View>
  );
}

const renderHiddenItem = (data, rowMap) => {
  return(
    <HiddenItemWithActions
    data = {data}
    rowMap = {rowMap}
    onClose = {() => closeRow(rowMap , data.item.key)}
    ondelete = {() => deleteRow(rowMap , data.item.key)}
    
    />
  ); 
};






useEffect(() => {
    fetch(`http://api.sianet.me:8000/document/list`).then(res => {
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
          title="Upload"
          iconName="cloud-upload"
          onPress={() =>props.navigation.toggleDrawer() }
    
        />
      </HeaderButtons>
    )
  });
}, [props.navigation]);

  const getItem = (item) => {
    // Function for click on an item
    Linking.openURL(item.uri).catch(err => console.error('Error', err));
  };


  return (
    <View style={styles.container}>
      <SwipeListView

      data={Dummylist}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      leftOpenValue={75}
      rightOpenValue = {-150}
      disableRightSwipe
      
      />








    </View>
  );
};
export default HomeS1;

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
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    margin:3
  },
  list:{
    textTransform: 'uppercase', fontWeight: 'bold',
    padding: 5,
    alignSelf: 'stretch',
    color:'white'
  },
  item:{
    backgroundColor:"#4F8C76", 
    alignSelf: 'stretch',
    margin:5,
    borderRadius: 8
  },
  container: {
    backgroundColor: '#f4f4f4',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    margin: 5,
    marginBottom: 15,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rowFrontVisible: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    padding: 10,
    marginBottom: 15,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingRight: 17,
  },
  backRightBtnLeft: {
    backgroundColor: '#589D84',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: '#c4c4c4',
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  trash: {
    height: 25,
    width: 25,
    marginRight: 7,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666',
  },
  details: {
    fontSize: 12,
    color: '#999',
  },

});
