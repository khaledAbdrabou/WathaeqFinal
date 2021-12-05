import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableNativeFeedback,
  TouchableOpacity,
  Platform,
  ImageBackground,
} from "react-native";

const MealItem = (props) => {
  let TouchConponent =
    Platform.OS === "android" && Platform.Version >= 21
      ? TouchableNativeFeedback
      : TouchableOpacity;
  return (
    <TouchConponent onPress={props.onSelectMeal}>
      <View style={styles.mealItem}>
        <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
            <View style={styles.titleContailer}>
            <Text style={styles.titleText} numberOfLines={1}>{props.title}</Text>
          </View>

        </View>
        <View style={{ ...styles.mealRow, ...styles.mealDetail }}>
          <Text>{""+props.duration}D</Text>
          <Text>{props.complexity.toUpperCase()}</Text>
          <Text>{props.affordability.toUpperCase()+""}</Text>
        </View>
      </View>
    </TouchConponent>
  );
};

export default MealItem;

const styles = StyleSheet.create({
  mealRow: {
    flexDirection: "row",
    // padding:10,
  },
  mealItem: {
    height: 90,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius:10,
    overflow:"hidden",
    borderColor:"#000",
    borderWidth:1, 
    marginBottom:10,
    // shadowColor: "#000",
    // shadowOpacity: 0.4,
    // shadowOffset: { width: 4, height: 2 },
    // shadowRadius: 10,
    // elevation: 5,
  },
  bgImage: {
    height: "100%",
    width: "100%",
    justifyContent:"flex-end",
  },
  mealHeader: {
    height: "65%",
    justifyContent:"center",

  },
  mealDetail: {
    paddingHorizontal: 10,
    justifyContent: "space-between",
    alignItems:"center",
    height:"15%"
  },
  titleContailer:{
    backgroundColor:"rgba(0, 0,0,0)",
    paddingVertical:6,
    paddingHorizontal: 100,

  },
  titleText:{
    fontFamily:"open-sans-bold",
    fontSize:20,
    textAlign:"center",
    color:"#589D84",

  }
});
