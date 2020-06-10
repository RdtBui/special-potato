import Fruit from '../models/fruit';
import database from '@react-native-firebase/database';

class DataMapper {
  // TODO: map the data to the Fruit model object and link data to results screen
  // Getter
  getData(resultQuery) {
    database()
      .ref('/fruits/' + resultQuery)
      .once('value')
      .then(snapshot => {
        console.log('User Data: ', snapshot.val());
      });
  }
}

export default DataMapper;
