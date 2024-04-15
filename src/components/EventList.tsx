import React from 'react';
import { StyleSheet, FlatList, View} from 'react-native';
import { Event } from '../types/Event';
import EventItemList from './EventItemList.tsx';
import EventItemGrid from './EventItemGrid.tsx';

interface Props {
  events: Event[];
  onViewEvent: (event: Event) => void;
  viewType:'list' | 'grid'
}

const EventList: React.FC<Props> = ({ events, onViewEvent, viewType}) => {
  return (
    <View style={styles.wrapper}>
      <FlatList
        key={viewType}
        data={events}
        numColumns={viewType=='grid' ? 2 : 1}
        renderItem={({ item }) => (
          viewType=='list' ?
          <EventItemList event={item} onPress={() => onViewEvent(item)} /> :
          <EventItemGrid event={item} onPress={() => onViewEvent(item)} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width:'95%',
    marginTop:10,
    alignSelf:'center'
  },
  heading:{
    color:'#999',
    fontSize: 28,
    padding : 15,
    borderBottomColor:'#CCC',
    borderBottomWidth:3,
    fontWeight:'bold'
  },
});

export default EventList;