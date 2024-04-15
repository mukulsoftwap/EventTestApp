import React, {useState, useEffect} from 'react';
import { View, Text, FlatList, Button } from 'react-native';
import { Event } from '../types/Event';
import EventItem from '../components/EventItemList.tsx';
import { getLoggedInUser, loadUserData, saveUserData } from '../utils/storage.ts';
import { useNavigation } from '@react-navigation/native';
import { User } from '../types/User.ts';

const TrackingListScreen: React.FC  = () => {

  const [trackedEvents, setTrackedEvents] = useState<Event[] | undefined>([]);
  const [userName, setUserName] = useState<string>('');
  const navigation:any = useNavigation();

  useEffect(()=>{
    loadTrakedEvents();
  }, [])

  const loadTrakedEvents = async()=>{
    const userName = await getLoggedInUser();
    setUserName(userName);
    loadUserData(userName).then((userdData)=>{
      setTrackedEvents(userdData?.trackingList);
    });
  }

  const handleRemoveEvent = (event: Event) => {
    const filteredEvent:Event[]|undefined = trackedEvents?.filter((val:Event)=>val.id!=event.id);
    setTrackedEvents(filteredEvent);
    const updatedUserData:User = {
      name : userName,
      trackingList : filteredEvent || []
    }
    saveUserData(updatedUserData);
  };

  const handleViewEvent = (event: Event) => {
    navigation.navigate("EventDetails", {event});
  };

  return (
    <View>
      <FlatList
        data={trackedEvents}
        renderItem={({ item }) => (
          <EventItem event={item} 
            onPress={()=>handleViewEvent(item)}
            onRemoveClick={()=>handleRemoveEvent(item)} />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default TrackingListScreen;
