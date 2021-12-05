class Meal {
  constructor(
    id,
    categoryIds,
    title,
    affordability,
    complexity,
    duration,
    ingredients,
    steps,
    isGlutenFree,
    isVegan,
    isVegetarian,
  ) {
    this.id = id;
    this.categoryIds = categoryIds;
    this.title = title;
    this.ingredients = ingredients;
    this.steps = steps;
    this.duration = duration;
    this.complexity = complexity;
    this.affordability = affordability;
    this.isGlutenFree = isGlutenFree;
    this.isVegan = isVegan;
    this.isVegetarian = isVegetarian;
  }
}

export default Meal;
