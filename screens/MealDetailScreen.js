import React, { useCallback, useEffect } from "react";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/CustomHeaderButton";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../store/actions/meals";
const ListItem = (props) => (
  <View style={styles.listItem}>
    <Text>{props.children}</Text>
  </View>
);
const OtherInfo = (props) => (
  <View
    style={{
      ...styles.listItem,
      justifyContent: "space-between",
      flexDirection: "row",
    }}
  >
    <Text>{props.text1}</Text>
    <Text style={{ fontWeight: "bold" }}>{props.text2Condition ? "Yes" : "No"}</Text>
  </View>
);
const MealDetailScreen = (props) => {
  const title = props.route.params.title;
  const { navigation } = props;
  const backgroundColor = props.route.params.backgroundColor;
  const mealId = props.route.params.mealId;
  const meals = useSelector((state) => state.meals.meals);
  const meal = meals.find((meal) => meal.id === mealId);
  const isFav = useSelector((state) =>
    state.meals.favoriteMeals.some((meal) => meal.id === mealId)
  );
  const dispatch = useDispatch();
  const toggleFavoriteHandler = () => {
    dispatch(toggleFavorite(mealId));
  };
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
          <Item
            title="search"
            iconName={isFav ? "ios-star" : "ios-star-outline"}
            onPress={toggleFavoriteHandler}
          />
        </HeaderButtons>
      ),
      headerTitle: title,
      headerStyle: {
        backgroundColor,
      },
    });
  }, [navigation, dispatch, mealId, isFav]);
  return (
    <ScrollView>
      <Image source={{ uri: meal.imageUrl }} style={styles.image} />

      <View style={styles.detailesContainter}>
        <Text>{meal.duration}D</Text>
        <Text>{meal.complexity.toUpperCase()}</Text>
        <Text>{meal.affordability.toUpperCase()}</Text>
      </View>
      <Text style={styles.title}>Document Info</Text>
      {meal.ingredients.map((text) => (
        <ListItem key={text}>{text}</ListItem>
      ))}
      <Text style={styles.title}>Context</Text>
      {meal.steps.map((text) => (
        <ListItem key={text}>{text}</ListItem>
      ))}
      <Text style={styles.title}>Other info</Text>
      <OtherInfo text1="New Upload" text2Condition={meal.isGlutenFree} />
      <OtherInfo text1="Upcoming Event" text2Condition={meal.isVegan} />
      <OtherInfo text1="Family Upload" text2Condition={meal.isVegetarian} />
    </ScrollView>
  );
};
export default MealDetailScreen;
const styles = StyleSheet.create({
  detailesContainter: {
    flexDirection: "row",
    padding: 15,
    justifyContent: "space-around",
  },
  image: {
    width: "0%",
    height: 0,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    textAlign: "center",
  },
  listItem: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
  },
  displayOtherInfo: {},
});
