import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TextInput, Pressable, TouchableOpacity } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import { User } from './src/types/User';
import { saveUserData, setLoggedInUser } from './src/utils/storage';

const App: React.FC = () => {
  const [userName, setUserName] = useState<string>('');
  const [userAuth, setUserAuth] = useState<boolean>(false);
  
  const handleUserNameChange = (name: string) => {
    setUserName(name);
  };

  const handleUserAuth = ()=>{
    if(userName){
      setLoggedInUser(userName)
      .then(() => {
        setUserAuth(true);
      })
      .catch((error) => console.error('Error loading user tracking list:', error));
    }
  }

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={!userAuth}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.heading}>Enter Your Name</Text>
            <TextInput
              style={styles.input}
              value={userName}
              onChangeText={handleUserNameChange}
            />
            <TouchableOpacity onPress={handleUserAuth} style={styles.button}>
              <Text style={styles.buttonText}>Explore</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {userAuth && <AppNavigator/>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width:'80%',
    minHeight:200,
    display:'flex',
    flexDirection:'column',
    justifyContent:'space-between',
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  heading:{
    color:'#CCC',
    fontSize: 24,
    padding : 10,
    fontWeight:'bold'
  },
  button: {
    width:'100%',
    padding: 10,
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15,
    backgroundColor:'#2684fc',
    alignItems:'center',
  },
  buttonText:{
    fontSize:24,
    color:'#FFF',
    fontWeight:'bold'
  },
  input: {
    width: '80%',
    paddingBottom: 5,
    paddingLeft:0,
    borderBottomColor:'#CCCCCC',
    borderBottomWidth: 3,
    fontSize:24,
    fontWeight:'bold',
    color:'#000'
  },
});

export default App;
