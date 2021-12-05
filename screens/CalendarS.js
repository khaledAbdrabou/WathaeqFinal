import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity,Text} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {Card, Avatar} from 'react-native-paper';
import CustomHeaderButton from "../components/CustomHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";


const timeToString = (time) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};

const Schedule = (props) => {
  const [items, setItems] = useState({});

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
            title="Add"
            iconName="add-circle"
            
          />
        </HeaderButtons>
      )
    });
  }, [props.navigation]);


  const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{marginRight: 15, marginTop: 17}}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text>{item.name}</Text>

            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1}}>
      <Agenda
        items={{
          '2021-09-22': [{name: 'Doctor Appointment', height:90 }],
          '2021-09-23': [{name: 'Blood Test', height: 80}],
          '2021-09-24': [],
          '2021-09-25': [{name: 'Doctor Visit'}, {name: 'Doctor : Dr. Ahmad'}]
        }}
        loadItemsForMonth={loadItems}
        selected={'2021-09-26'}
        renderItem={renderItem}
      />
    </View>
  );
};

export default Schedule;