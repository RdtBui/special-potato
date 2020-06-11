import {useEffect} from 'react';
import Fruit from '../models/fruit';
import database from '@react-native-firebase/database';

class DataMapper {
  // Getter
  async getFruit(resultQuery) {
    var fruit;
    await database()
      .ref('/fruits/' + resultQuery)
      .once('value')
      .then(snapshot => {
        console.log('User Data: ', snapshot.val());
        var data = snapshot.val();
        var name = resultQuery;
        var id = data.id;
        var color = data.color;
        var imageUrl = data.imageUrl;
        var description = data.description;
        var peakSeason = data.peakSeason;
        var selectInstructions = data.selectInstructions;
        var eatInstructions = data.eatInstructions;
        fruit = new Fruit(
          name,
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
