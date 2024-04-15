import React, {useState} from 'react';
import { View, Text, Modal, StyleSheet, TextInput, Pressable, TouchableOpacity } from 'react-native';
import EventList from '../components/EventList';
import { Event } from '../types/Event';
import { useNavigation } from '@react-navigation/native';

const events: Event[] = [
  {
    id:1,
    name : "Metallica Concert in Palace Ground",
    thumbnail : "https://wtsindiamedia.s3.amazonaws.com/sitemedia/2011/10/DSC_1039-1024x687.jpg",
    entryType : "paid",
    location : "Banglore"
  },
  {
    id:2,
    name : "Saree Exhibition in Malleswaram Grounds",
    thumbnail : "https://cdn.shopify.com/s/files/1/0562/8792/0217/t/7/assets/bangalore-flea-market-stalls.jpg?v=1655294618",
    entryType : "free",
    location : "Banglore"
  },
  {
    id:3,
    name : "Wine tasting event in Links Brewery",
    thumbnail : "https://res.cloudinary.com/dwzmsvp7f/image/fetch/q_75,f_auto,w_1316/https%3A%2F%2Fmedia.insider.in%2Fimage%2Fupload%2Fc_crop%2Cg_custom%2Fv1692789211%2Fy7w35abeepgvvu5w71bf.png",
    entryType : "paid",
    location : "Banglore"
  },
  {
    id:4,
    name : "Startups Meet in Kanteerava Indoor Stadium",
    thumbnail : "https://content.jdmagicbox.com/v2/comp/bangalore/q6/080pxx80.xx80.171130135111.j7q6/catalogue/kanteerava-indoor-stadium-sampangi-rama-nagar-bangalore-indoor-stadiums-glegtchfn5.jpg",
    entryType : "paid",
    location : "Banglore"
  },
  {
    id:5,
    name : "Summer Noon Party in Kumara Park",
    thumbnail : "https://www.holidify.com/images/cmsuploads/compressed/bangalore1am_20190918155811.jpg",
    entryType : "paid",
    location : "Banglore"
  },
  {
    id:6,
    name : "Rock and Roll nights in Sarjapur Road",
    thumbnail : "https://cdn0.weddingwire.in/vendor/7388/3_2/640/jpg/big3_15_77388.jpeg",
    entryType : "paid",
    location : "Banglore"
  },
  {
    id:7,
    name : "Barbecue Fridays in Whitefield",
    thumbnail : "https://d4t7t8y8xqo0t.cloudfront.net/resized/720X480/group%2F5743%2Fmenu020210928051822.jpg",
    entryType : "paid",
    location : "Banglore"
  },
  {
    id:8,
    name : "Summer workshop in Indiranagar",
    thumbnail : "https://i.ytimg.com/vi/viU7CA44-MY/maxresdefault.jpg",
    entryType : "free",
    location : "Banglore"
  },
  {
    id:9,
    name : "Impressions & Expressions in MG Road",
    thumbnail : "https://whatshappbangalore.files.wordpress.com/2013/04/iic-1.jpg",
    entryType : "free",
    location : "Banglore"
  },
  {
    id:10,
    name : "Italian carnival in Electronic City",
    thumbnail : "https://casa-belvedere.org/wp-content/uploads/2022/01/venice-carnival-g8bc48513e_1920.jpg",
    entryType : "free",
    location : "Banglore"
  }
];

const EventListScreen: React.FC = () => {

  const [userName, setUserName] = useState<string>('');
  const [viewType, setViewType] = useState<'list' | 'grid'>('list');
  const navigation:any = useNavigation();

  const handleViewEvent = (event: Event) => {
    navigation.navigate("EventDetails", {event});
  };

  const onListToggle = ()=>{
    setViewType(viewType=='list' ? 'grid' : 'list');
  }

  const gotoTrackScreen = ()=>{
    navigation.navigate("TrackingList");
  }

  return (
    <View style={styles.centeredView}>
      <View style={styles.header}>
        <Text style={styles.heading}>Events</Text>
        <View style={styles.controls}>
          <TouchableOpacity  style={styles.controlBtn} onPress={gotoTrackScreen}>
            <Text style={styles.toggleText}>Track Event</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlBtn} onPress={onListToggle}>
            <Text style={styles.toggleText}>View Type : {viewType}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <EventList events={events} onViewEvent={handleViewEvent} viewType={viewType}/>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    marginBottom : 80
  },
  viewType:{
    backgroundColor:'red'
  },
  toggleText:{
    color:'#000'
  },
  controlBtn:{
    backgroundColor:'#FFF',
    borderRadius: 5,
    padding:5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 2,
    marginRight:10
  },
  header:{
    display:'flex',
    flexDirection:'row',
    borderBottomColor:'#CCC',
    borderBottomWidth:3,
    justifyContent:'space-between'
  },
  heading:{
    color:'#999',
    fontSize: 20,
    padding : 15,
    fontWeight:'bold'
  },
  controls:{
    display:'flex',
    flexDirection:'row',
    alignItems:'center'
  }
});

export default EventListScreen;