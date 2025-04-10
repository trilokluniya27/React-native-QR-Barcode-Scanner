// import { StyleSheet, Text, View } from 'react-native'
// import React,{useState,useEffect} from 'react'
// import { useCameraDevice,Camera } from 'react-native-vision-camera';

// const App = () => {
  
//   const device = useCameraDevice('back');
//   const [hasPermission, setHasPermission] = useState(null);
//   const [torch, setTorch] = useState(false);

//   useEffect(() => {
//     const getCameraPermission = async () => {
//       const status = await Camera.requestCameraPermission();
//       setHasPermission(status === 'authorized');
//     };
//     getCameraPermission();
//   }, []);

//   const toggleTorch = () => {
//     setTorch((current) => !current);
//   };


//   if (hasPermission === null) {
//     return <Text>Requesting camera permission...</Text>;
//   }

//   if (hasPermission===false) {
//     return <Text>Access Denied</Text>;
//   }

//   if (!device) {
//     return <Text>No Camera Device Found</Text>;
//   }



//   return (
//     <View style={styles.container}>
//     <Camera
//       style={StyleSheet.absoluteFill}
//       device={device}
//       isActive={true} // Fixed undefined prop
//       torch={torch ? 'on' : 'off'}
//       enableZoomGesture={true}
//     />
//     <Text onPress={toggleTorch} style={styles.button}>Toggle Flash</Text>
//   </View>
//   )
// }

// export default App

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'blue',
//   },
//   button: {
//     color: 'white',
//     textAlign: 'center',
//     marginTop: 20,
//   },
      

// })





// import * as React from 'react'
// import { useCallback, useRef, useState } from 'react'
// import type { AlertButton } from 'react-native'
// import { Alert, Linking, StyleSheet, View } from 'react-native'
// import type { Code } from 'react-native-vision-camera'
// import { useCameraDevice, useCodeScanner } from 'react-native-vision-camera'
// import { Camera } from 'react-native-vision-camera'
// // import { CONTENT_SPACING, CONTROL_BUTTON_SIZE, SAFE_AREA_PADDING } from './Constants'
// // import { useIsForeground } from './hooks/useIsForeground'
// // import { StatusBarBlurBackground } from './views/StatusBarBlurBackground'
// // import { PressableOpacity } from 'react-native-pressable-opacity'
// // import IonIcon from 'react-native-vector-icons/Ionicons'
// // import type { Routes } from './Routes'
// // import type { NativeStackScreenProps } from '@react-navigation/native-stack'
// // import { useIsFocused } from '@react-navigation/core'

// const showCodeAlert = (value: string, onDismissed: () => void): void => {
//   const buttons: AlertButton[] = [
//     {
//       text: 'Close',
//       style: 'cancel',
//       onPress: onDismissed,
//     },
//   ]
//   if (value.startsWith('http')) {
//     buttons.push({
//       text: 'Open URL',
//       onPress: () => {
//         Linking.openURL(value)
//         onDismissed()
//       },
//     })
//   }
//   Alert.alert('Scanned Code', value, buttons)
// }

// // type Props = NativeStackScreenProps<Routes, 'CodeScannerPage'>
// // export function CodeScannerPage({ navigation }: Props): React.ReactElement {
//   // 1. Use a simple default back camera
//   const device = useCameraDevice('back')

//   // 2. Only activate Camera when the app is focused and this screen is currently opened
//   // const isFocused = useIsFocused()
//   // const isForeground = useIsForeground()
//   // const isActive = isFocused && isForeground

//   // 3. (Optional) enable a torch setting
//   const [torch, setTorch] = useState(false)

//   // 4. On code scanned, we show an aler to the user
//   const isShowingAlert = useRef(false)
//   const onCodeScanned = useCallback((codes: Code[]) => {
//     console.log(`Scanned ${codes.length} codes:`, codes)
//     const value = codes[0]?.value
//     if (value == null) return
//     if (isShowingAlert.current) return
//     showCodeAlert(value, () => {
//       isShowingAlert.current = false
//     })
//     isShowingAlert.current = true
//   }, [])

//   // 5. Initialize the Code Scanner to scan QR codes and Barcodes
//   const codeScanner = useCodeScanner({
//     codeTypes: ['qr', 'ean-13'],
//     onCodeScanned: onCodeScanned,
//   })

//   return (
//     <View style={styles.container}>
//       {device != null && (
//         <Camera
//           style={StyleSheet.absoluteFill}
//           device={device}
//           isActive={isActive}
//           codeScanner={codeScanner}
//           torch={torch ? 'on' : 'off'}
//           enableZoomGesture={true}
//         />
//       )}

//       {/* <StatusBarBlurBackground /> */}
// {/* 
//       <View style={styles.rightButtonRow}>
//         <PressableOpacity style={styles.button} onPress={() => setTorch(!torch)} disabledOpacity={0.4}>
//           <IonIcon name={torch ? 'flash' : 'flash-off'} color="white" size={24} />
//         </PressableOpacity>
//       </View> */}

//       {/* Back Button */}
//       {/* <PressableOpacity style={styles.backButton} onPress={navigation.goBack}>
//         <IonIcon name="chevron-back" color="white" size={35} />
//       </PressableOpacity> */}
//     </View>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//   },
//   button: {
//     marginBottom: CONTENT_SPACING,
//     width: CONTROL_BUTTON_SIZE,
//     height: CONTROL_BUTTON_SIZE,
//     borderRadius: CONTROL_BUTTON_SIZE / 2,
//     backgroundColor: 'rgba(140, 140, 140, 0.3)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   rightButtonRow: {
//     position: 'absolute',
//     right: SAFE_AREA_PADDING.paddingRight,
//     top: SAFE_AREA_PADDING.paddingTop,
//   },
//   backButton: {
//     position: 'absolute',
//     left: SAFE_AREA_PADDING.paddingLeft,
//     top: SAFE_AREA_PADDING.paddingTop,
//   },
// })



// import { StyleSheet, Text, View } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import { useCameraDevice, Camera, useCodeScanner } from 'react-native-vision-camera';
// import MaterialIcons from 'react-native-vector-icons'



// export default function App() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [torch, setTorch] = useState(false);
//   const [scannedData, setScannedData] = useState(null);

//   useEffect(() => {
//     const getCameraPermission = async () => {
//       const status = await Camera.requestCameraPermission();
//       setHasPermission(status === 'authorized');
//     };
//     getCameraPermission();
//   }, []);

//   const toggleTorch = () => {
//     setTorch((current) => !current);
//   };

//   const device = useCameraDevice('back'); // Hook inside component

//   const codeScanner = useCodeScanner({
//     codeTypes: ['qr','ean-13','ean-8','code-128','aztec','codabar','code-39','code-93','data-matrix','itf','pdf-417','upc-a','upc-e'], // Only scan QR codes
//     onCodeScanned: (codes) => {
//       if (codes.length > 0) {
//         setScannedData(codes[0].value); // Set scanned data
//       }
//     },
//   });

//   if (hasPermission === null) {
//     return <Text>Requesting camera permission...</Text>;
//   }

//   if (hasPermission) { // (!hasPermission) is original code for taking the permission to user
//     return <Text>Access Denied</Text>;
//   }

//   if (!device) {
//     return <Text>No Camera Device Found</Text>;
//   }

//   return (
//     <View style={styles.container}>
//       {/* QR Scanner (50% of the screen) */}
//       <View style={styles.scannerContainer}>
//         <Camera
//           style={StyleSheet.absoluteFill}
//           device={device}
//           isActive={true}
//           torch={torch ? 'on' : 'off'}
//           enableZoomGesture={true}
//           codeScanner={codeScanner}
//         />
        
//         <View><Text onPress={toggleTorch} style={styles.button2}>Flash</Text></View>
//         <View><Text onPress={toggleTorch} style={styles.button}>Flash</Text></View>
//       </View>

//       {/* Scanned Data Display (Bottom 50%) */}
//       <View style={styles.resultContainer}>
//       {/* <Text style={styles.resultText}>Scanner Type:</Text> */}
//       {/* <Text style={styles.dataText}>{}</Text> */}
//       <View style={styles.textContainer}>
//       <Text style={styles.resultText}>Product Data:</Text>
//       <Text style={styles.dataText}>{scannedData || "No QR Code / Barcode scanned yet"}</Text>
//       </View>
//         <View style={styles.textContainer}>
//         <Text style={styles.resultText}>Product Name :</Text>
//         </View>
//         <View style={styles.textContainer}>
//         <Text style={styles.resultText}>Quantity:</Text>
//         </View>
//         <View style={styles.textContainer}>
//         <Text style={styles.resultText}>Cost :</Text>
//         </View>
       
//         {/* <Text onPress={toggleTorch} style={styles.button}> */}
//          {/* <MaterialIcons name={torch ? 'flash' : 'flash-off'} color="white" size={24} />Flash Off */}
//         {/* </Text> */}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'black',
//   },
//   scannerContainer: {
//     flex: 1, // 50% of screen
    
//   },
//   resultContainer: {
//     flex: 1, // 50% of screen
//     // justifyContent: 'center',
//     // alignItems: 'center',
//     backgroundColor: '#F2F6D0',
//     // marginTop:-40,
//     padding: 20,
//   },
//   resultText: {
//     fontSize: 18,
//     // borderBottomWidth:2,
//     marginBottom:5,
//     color: 'black',
//     // backgroundColor:'black',
//     fontWeight: 'bold',
//     paddingLeft:10
//   },
//   dataText: {
//     fontSize: 16,
//     color: 'green',
//     marginTop:10,
//     marginVertical: 10,
//     paddingLeft:10 
    
//   },
//   textContainer:{
//       borderWidth:2,
//       borderRadius:5,
//       marginBottom:5,
      
//   },
//   button: {
//     color: 'black',
//     fontSize: 18,
//     marginTop: 331,
//     textDecorationLine: 'underline',
//     backgroundColor:'green',
//     borderRadius:5,
//     textAlign:'center',
//     padding:5,
//     width:100
//   },
//   button2: {
//     color: 'black',
//     fontSize: 18,
//     marginTop: 15,
//     textDecorationLine: 'underline',
//     backgroundColor:'yellow',
//     borderRadius:5,
//     // textAlign:'right',
//     marginLeft:250,
//     padding:5,
//     width:100
//   },
// });