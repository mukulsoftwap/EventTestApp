import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Event } from '../types/Event';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Props {
  event: Event;
  onRemoveClick?: () => void;
  onPress: () => void;
}

const EventItemList: React.FC<Props> = ({ event, onRemoveClick, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={{ uri: event.thumbnail }} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.eventName}>{event.name}</Text>
        <Text style={styles.location}>{event.location}</Text>
        <Text style={styles.entryType}>{event.entryType === 'paid' ? 'Paid' : 'Free'}</Text>
      </View>
      {onRemoveClick!=null &&
        <TouchableOpacity onPress={onRemoveClick} style={styles.removeIcon}>
            <Icon name="close" size={20} color="#FFF" /> 
        </TouchableOpacity>
      }
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius:10
  },
  detailsContainer: {
    flex: 1,
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
  removeIcon:{
    width:30,
    backgroundColor : '#CCC',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:8
  }
});

export default EventItemList;