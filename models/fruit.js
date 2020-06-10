class Fruit {
  constructor(
    name,
    id,
    color,
    imageUrl,
    description,
    peakSeason,
    selectInstructions,
    eatInstructions,
  ) {
    this.name = name;
    this.id = id;
    this.color = color;
    this.imageUrl = imageUrl;
    this.description = description;
    this.peakSeason = peakSeason;
    this.selectInstructions = selectInstructions;
    this.eatInstructions = eatInstructions;
  }
}

export default Fruit;
