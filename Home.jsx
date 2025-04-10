import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'


const Home = () => {
  return (
    <View>
        {/* <Image source={require('./images/qr.png')} style={styles.images}/> */}
        <Image source={require('./images/scan.png')} style={styles.images}/>
        {/* <TouchableOpacity> */}
            <Text 
            style={{fontSize:25,
            textAlign:'center',
            marginTop:-50,
            backgroundColor:'#09122C',
            borderRadius:40,
            padding:10,
            color:'white'}}>QR | Barcode ScanApp</Text>
            
        {/* </TouchableOpacity> */}
      
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
    images:{
        height:400,
        width:'100%',
        marginTop:150
    }
})