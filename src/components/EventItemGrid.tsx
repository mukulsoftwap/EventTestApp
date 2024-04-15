import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Event } from '../types/Event';
import { green } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';

interface Props {
  event: Event;
  onPress: () => void;
}

const EventItemGrid: React.FC<Props> = ({ event, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.gridItem}>
        <Image source={{ uri: event.thumbnail }} style={styles.image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.eventName} numberOfLines={2}>{event.name}</Text>
          <Text style={styles.location}>{event.location}</Text>
          <Text style={styles.entryType}>{event.entryType === 'paid' ? 'Paid' : 'Free'}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width:'50%',
    padding: 10,
  },
  gridItem:{
    backgroundColor:'#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    height:170,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
  },
  image: {
    width: '100%',
    height: 80,
    marginRight: 10,
    borderTopRightRadius:10,
    borderTopLeftRadius:10
  },
  detailsContainer: {
    flex: 1,
    padding:5
  },
  eventName: {
    color:'#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
  entryType: {
    fontSize: 14,
    color: 'green',
  },
});

export default EventItemGrid;