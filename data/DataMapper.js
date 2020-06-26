import {useEffect} from 'react';
import Fruit from '../models/fruit';
import database from '@react-native-firebase/database';

class DataMapper {
  // Getter
  async getFruit(queryLabel) {
    var fruit;
    await database()
      .ref('/fruits/' + queryLabel)
      .once('value')
      .then(snapshot => {
        var data = snapshot.val();
        var title = data.title;
        var id = data.id;
        var color = data.color;
        var imageUrl = data.imageUrl;
        var description = data.description;
        var peakSeason = data.peakSeason;
        var selectInstructions = data.selectInstructions;
        var eatInstructions = data.eatInstructions;
        fruit = new Fruit(
          title,
          id,
          color,
          imageUrl,
          description,
          peakSeason,
          selectInstructions,
          eatInstructions,
        );
      });
    return fruit;
  }
}

export default DataMapper;
