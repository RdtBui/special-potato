class Fruit {
  constructor(
    id,
    categoryIds,
    name,
    color,
    imageUrl,
    peakSeason,
    pickInstructions,
    eatInstructions,
  ) {
    this.id = id;
    this.categoryIds = categoryIds;
    this.name = name;
    this.color = color;
    this.imageUrl = imageUrl;
    this.peakSeason = peakSeason;
    this.pickInstructions = pickInstructions;
    this.eatInstructions = eatInstructions;
  }
}

export default Fruit;
