import { StyleSheet, Text,Image, View } from 'react-native'
import React from 'react'

const Settings = () => {
  return (
    <View>
     <Image source={require('./images/profile.png')} style={styles.images}/>
     <Text  style={{fontSize:25,
            textAlign:'center',
            marginTop:4,
            backgroundColor:'#09122C',
            borderRadius:40,
            padding:10,
            color:'white'}}>My Profile </Text>
    </View>
  )
}

export default Settings

const styles = StyleSheet.create({

    images:{
        height:300,
        width:'80%',
        // marginTop:150
        alignSelf:'center'
    }
    
})