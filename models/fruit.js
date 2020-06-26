class Fruit {
  constructor(
    title,
    id,
    color,
    imageUrl,
    description,
    peakSeason,
    selectInstructions,
    eatInstructions,
  ) {
    this.title = title;
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
