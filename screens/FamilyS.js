import React,{ useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import { CATEGORIES } from "../data/dummy-data";
// import Colors from "../constants/Colors";
import FamilyGridTiles from "../components/FamilyGridTiles";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
const FamilyS = (props) => {
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
  const displayItems = (itemData) => {
    return (
      <FamilyGridTiles
        title={itemData.item.title}
        color={itemData.item.color}
        onSelect={() => {
          props.navigation.navigate({
            name: "CategoryMeals",
            params: {
              categoryId: itemData.item.id,
              categoryTitle: itemData.item.title,
              backgroundColor: itemData.item.color,
            },
          });
        }}
      />
    );
  };
  return (
    // <View style={styles.screen}>

    <FlatList
      keyExtractor={(item, index) => item.id}
      numColumns={2}
      data={CATEGORIES}
      renderItem={displayItems}
    />
    // </View>
  );
};
export default FamilyS;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
