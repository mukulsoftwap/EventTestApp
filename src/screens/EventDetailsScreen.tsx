import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-toast-message';
import { loadUserData, getLoggedInUser, saveUserData } from '../utils/storage';
import { User } from '../types/User';

type EventDetailsRouteProp = RouteProp<RootStackParamList, 'EventDetails'>;

interface Props {
  route:EventDetailsRouteProp
}

const EventDetailsScreen: React.FC<Props> = ({ route }) => {

  const { event } = route.params;

  const handleTrackEvent = async() => {
    const userName = await getLoggedInUser();
    const userData = await loadUserData(userName);
    const isAlreadyExist = userData?.trackingList.filter((e)=>e.id==event.id);
    console.log("isAlreadyExist", isAlreadyExist);
    if(isAlreadyExist && isAlreadyExist?.length>0){
      Toast.show({
        type: 'info',
        text1: 'Already Exist',
        text2: 'Event is already in tracking list 👋'
      });
    }else{
      const updatedTrakingData:User = {
        name : userName,
        trackingList: userData ? [event, ...userData.trackingList] : [event]
      }
      saveUserData(updatedTrakingData).then(()=>{
        Toast.show({
          type: 'success',
          text1: 'Added',
          text2: 'Event is successfully added in tracking list'
        });
      })
    }
  };

  return (
    <View>
      <Image source={{ uri: event.thumbnail }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.heading}>{event.name}</Text>
        <View style={styles.chip}>
          <View style={styles.chipset}>
            <Icon name="map-marker" size={20} color="#000" /> 
            <Text style={styles.text}>{event.location}</Text>
          </View>
          <View style={styles.chipset}>
            <Icon name="cash-multiple" size={20} color="#000" /> 
            <Text style={styles.text}>{event.entryType === 'paid' ? 'Paid' : 'Free'}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleTrackEvent} style={styles.trackBtn}>
          <Text style={styles.buttonText}>Track Event</Text>
        </TouchableOpacity>
      </View>
      <Toast position='top' topOffset={20}/>
    </View>
  );
};

const styles = StyleSheet.create({
  content:{
    display:'flex',
    flexDirection:'column',
    padding:15
  },
  trackBtn: {
    width:'100%',
    padding: 10,
    borderRadius:25,
    backgroundColor:'#2684fc',
    alignItems:'center',
    alignSelf:'center',
    marginTop:20
  },
  buttonText:{
    fontSize:18,
    color:'#FFF',
    fontWeight:'bold'
  },
  text: {
    color:'#000',
    marginLeft:5
  },
  chip:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    marginTop:20
  },
  chipset:{
    display:'flex',
    flexDirection:'row',
    backgroundColor:'#FFF',
    borderRadius: 15,
    color:'#000',
    paddingLeft:15,
    paddingRight:15,
    paddingTop:5,
    paddingBottom:5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 1,
    marginRight:10
  },
  heading:{
    color:'#000',
    fontSize: 24,
    fontWeight:'bold'
  },
  image:{
    width: '100%', 
    height: 250
  }
});

export default EventDetailsScreen;
