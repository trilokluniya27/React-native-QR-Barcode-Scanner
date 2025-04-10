// First Code without adding styles

// import React, {useState, useEffect} from 'react';
// import {View, Text, StyleSheet, Button, ActivityIndicator} from 'react-native';
// import {
//   Camera,
//   useCameraDevice,
//   useCodeScanner,
// } from 'react-native-vision-camera';

// export default function QRCodeScan() {
//   const [hasPermission, setHasPermission] = useState();
//   const [scannedBarcode, setScannedBarcode] = useState('');
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [notFound, setNotFound] = useState(false);

//   const device = useCameraDevice('back');

//   useEffect(() => {
//     const getPermission = async () => {
//       const status = await Camera.requestCameraPermission();
//       setHasPermission(status === 'authorized');
//     };
//     getPermission();
//   }, []);

//   const codeScanner = useCodeScanner({
//     codeTypes: ['ean-13', 'code-128', 'qr'],
//     onCodeScanned: async codes => {
//       if (codes.length > 0) {
//         const scanned = codes[0].value;
//         setScannedBarcode(scanned);
//         await fetchAndCompare(scanned);
//       }
//     },
//   });

//   const fetchAndCompare = async barcode => {
//     try {
//       setLoading(true);
//       setProduct(null);
//       setNotFound(false);

//       const response = await fetch(
//         'https://ddottt6z7ccpe0a-apexdb.adb.me-jeddah-1.oraclecloudapps.com/ords/otrix/oc_pos_item_barcodes_v/',
//       );
//       const text = await response.text();
//       console.log('Raw response text:', text);
//       let data;
//       try {
//         data = JSON.parse(text);
//       } catch (jsonError) {
//         console.error('Invalid JSON:', jsonError);
//         return;
//       }

//       console.log('Parsed JSON:', data);
//       const matched = data.items.find(item => item.barcode === barcode);


//       if (matched) {
//         setProduct(matched);
//       } else {
//         setNotFound(true);
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       setNotFound(true);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (hasPermission === null)
//     return <Text>Requesting Camera Permission...</Text>;
//   if (!hasPermission === false) return <Text>Camera access denied.</Text>;
//   if (!device) return <Text>No camera device found.</Text>;

//   return (
//     <View style={styles.container}>
//       <Camera
//         style={styles.camera}
//         device={device}
//         isActive={true}
//         codeScanner={codeScanner}
//       />

//       <View style={styles.resultBox}>
//         <Text style={styles.label}>Scanned Barcode: {scannedBarcode}</Text>
//         {loading && <ActivityIndicator size="large" color="blue" />}
//         {product && (
//           <>
//             <Text style={styles.result}>🆔 ID: {product.id}</Text>
//             <Text style={styles.result}>📦 Name: {product.item_name}</Text>
//             <Text style={styles.result}>💰 Price: ₹{product.store_name}</Text>
//           </>
//         )}
//         {notFound && (
//           <Text style={styles.resultNotFound}>❌ Product Not Found</Text>
//         )}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {flex: 1, backgroundColor: '#f4f4f4'},
//   camera: {height: 300, width: '100%', marginTop: 30},
//   resultBox: {padding: 20},
//   label: {fontSize: 16, fontWeight: 'bold', marginBottom: 10},
//   result: {fontSize: 16, marginBottom: 6, color: 'green'},
//   resultNotFound: {fontSize: 16, marginTop: 10, color: 'red'},
// });





//second code adding apping and this code ui is best
// Dummy code
// import { Image, StyleSheet, Text, Linking, View, TouchableOpacity } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import { useCameraDevice, Camera, useCodeScanner } from 'react-native-vision-camera';

// export default function App() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [torch, setTorch] = useState(false);
//   const [scannedData, setScannedData] = useState(null);
//   const [scannedType, setScannedType] = useState(null);
//   const [productDetails, setProductDetails] = useState(null);
//   const [noMatch, setNoMatch] = useState(false);

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

//   const device = useCameraDevice('back');

//   const codeScanner = useCodeScanner({
//     codeTypes: ['qr', 'ean-13', 'ean-8', 'code-128', 'aztec', 'codabar', 'code-39', 'code-93', 'data-matrix', 'itf', 'pdf-417', 'upc-a', 'upc-e'],
//     onCodeScanned: async (codes) => {
//       if (codes.length > 0) {
//         const scannedValue = codes[0].value;
//         setScannedData(scannedValue);
//         setScannedType(codes[0].type);
//         await fetchAndCompare(scannedValue);
//       }
//     },
//   });

//   const fetchAndCompare = async barcode => {
//         try {
//           setLoading(true);
//           setProduct(null);
//           setNotFound(false);
    
//           const response = await fetch(
//             'https://ddottt6z7ccpe0a-apexdb.adb.me-jeddah-1.oraclecloudapps.com/ords/otrix/oc_pos_item_barcodes_v/',
//           );
//           const text = await response.text();
//           console.log('Raw response text:', text);
//           let data;
//           try {
//             data = JSON.parse(text);
//           } catch (jsonError) {
//             console.error('Invalid JSON:', jsonError);
//             return;
//           }
    
//           console.log('Parsed JSON:', data);
//           const matched = data.items.find(item => item.barcode === barcode);
    
    
//           if (matched) {
//             setProduct(matched);
//           } else {
//             setNotFound(true);
//           }
//         } catch (err) {
//           console.error('Error:', err);
//           setNotFound(true);
//         } finally {
//           setLoading(false);
//         }
//       };

//   const onScannedDataPress = () => {
//     if (!scannedData) return;
//     if (scannedType === 'qr' && scannedData.startsWith('http')) {
//       Linking.openURL(scannedData);
//     } else {
//       const searchURL = `https://www.google.com/search?q=${scannedData}`;
//       Linking.openURL(searchURL);
//     }
//   };

//   if (hasPermission === null) return <Text>Requesting camera permission...</Text>;
//   if (!hasPermission === false) return <Text>Access Denied</Text>;
//   if (!device) return <Text>No Camera Device Found</Text>;

//   return (
//     <View style={styles.container}>
//       <View style={styles.scannerContainer}>
//         <View style={styles.cameraContainer}>
//           <Camera
//             style={StyleSheet.absoluteFill}
//             device={device}
//             isActive={true}
//             torch={torch ? 'on' : 'off'}
//             enableZoomGesture={true}
//             codeScanner={codeScanner}
//           />
//           <TouchableOpacity onPress={toggleTorch}>
//             <Image source={require('./images/flash.png')} style={[styles.flashIcon, { height: 40 }]} />
//           </TouchableOpacity>
//         </View>
//       </View>

//       <View style={styles.resultContainer}>
//         <View style={styles.textContainer}>
//           <Text style={styles.resultText}>URL Link:</Text>
//           {scannedData ? (
//             <TouchableOpacity onPress={onScannedDataPress}>
//               <Text style={[styles.dataText, { color: 'blue', textDecorationColor: 'underline' }]}>
//                 {scannedData}
//               </Text>
//             </TouchableOpacity>
//           ) : (
//             <Text style={styles.dataText}>No QR Code / Barcode generate link yet</Text>
//           )}
//         </View>

//         <View style={styles.textContainer}>
//           <Text style={styles.resultText}>Product Data :</Text>
//           {scannedData ? (
//             <Text style={styles.dataText}>{scannedData}</Text>
//           ) : (
//             <Text style={styles.dataText}>No QR Code / Barcode scanned yet</Text>
//           )}
//         </View>

//         <View style={styles.textContainer}>
//           <Text style={styles.resultText}>Product Name :</Text>
//           {productDetails ? (
//             <Text style={[styles.resultText, { color: 'green', fontSize: 15, fontWeight: '500' }]}>
//               {productDetails.item_name}
//             </Text>
//           ) : noMatch ? (
//             <Text style={[styles.resultText, { color: 'red' }]}>Not Found</Text>
//           ) : (
//             <Text style={styles.resultText}>Product Name Will not be Defined</Text>
//           )}
//         </View>

//         <View style={styles.textContainer}>
//           <Text style={styles.resultText}>Store Name:</Text>
//           {productDetails ? (
//             <Text style={[styles.resultText, { color: 'green', fontSize: 15, fontWeight: '500' }]}>
//               {productDetails.store_name || 'N/A'}
//             </Text>
//           ) : noMatch ? (
//             <Text style={[styles.resultText, { color: 'red' }]}>Not Found</Text>
//           ) : (
//             <Text style={styles.resultText}>Store Name Will not be Defined</Text>
//           )}
//         </View>

//         <View style={styles.textContainer}>
//           <Text style={styles.resultText}>Cost :</Text>
//           {productDetails ? (
//             <Text style={[styles.resultText, { color: 'green', fontSize: 15, fontWeight: '500' }]}>
//               ₹{productDetails.cost}
//             </Text>
//           ) : noMatch ? (
//             <Text style={[styles.resultText, { color: 'red' }]}>Not Found</Text>
//           ) : (
//             <Text style={styles.resultText}>Cost Will not be Defined</Text>
//           )}
//         </View>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F1F0E9',
//   },
//   cameraContainer: {
//     height: 250,
//     width: 250,
//     alignContent: 'center',
//     alignItems: 'center',
//     alignSelf: 'center',
//     marginTop: '10%',
//     borderWidth: 2,
//     borderRadius: 10
//   },
//   scannerContainer: {
//     flex: 2,
//     position: 'relative',
//     backgroundColor: '#F2F6D0'
//   },
//   resultContainer: {
//     flex: 2,
//     backgroundColor: '#F2F6D0',
//     padding: 15,
//   },
//   resultText: {
//     fontSize: 15,
//     marginBottom: 3,
//     color: 'black',
//     fontWeight: 'bold',
//     paddingLeft: 10
//   },
//   dataText: {
//     fontSize: 16,
//     color: 'green',
//     marginTop: 10,
//     marginVertical: 10,
//     paddingLeft: 10
//   },
//   textContainer: {
//     borderWidth: 2,
//     borderRadius: 5,
//     marginBottom: 5,
//   },
//   button: {
//     color: 'black',
//     fontSize: 18,
//     marginTop: 331,
//     textDecorationLine: 'underline',
//     backgroundColor: 'green',
//     borderRadius: 5,
//     textAlign: 'center',
//     padding: 5,
//     width: 100
//   },
//   button2: {
//     marginTop: 331,
//     marginLeft: 335,
//     marginBottom: 2,
//     width: 100,
//     borderRadius: 25,
//   },
//   flashIcon: {
//     width: 100,
//     marginLeft: 310,
//     marginTop: 230,
//     tintColor: 'black',
//   },
// });





//third code  without adding apping and this code ui is best





// import { Image, StyleSheet, Text,Linking,Alert, View, TouchableOpacity } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import { useCameraDevice, Camera, useCodeScanner } from 'react-native-vision-camera';
// import MaterialIcons from 'react-native-vector-icons'

// export default function App() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [torch, setTorch] = useState(false);
//   const [scannedData, setScannedData] = useState(null);
//   const [scannedType,setScannedType] = useState(null);

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
//         setScannedType(codes[0].type);
//       }
//     },
//   });

//   const onScannedDataPress =() =>{
//     if(!scannedData) return;
//     if(scannedType==='qr' && scannedData.startsWith('http')){
//         Linking.openURL(scannedData);
//     }else{
//         const searchURL = `https://www.google.com/search?q=${scannedData}`;
//         Linking.openURL(searchURL);
//     }
//   };

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
//         <View style={styles.cameraContainer}>
//         <Camera
//           style={StyleSheet.absoluteFill}
//           device={device}
//           isActive={true}
//           torch={torch ? 'on' : 'off'}
//           enableZoomGesture={true}
//           codeScanner={codeScanner}
//         />
//         <TouchableOpacity onPress={toggleTorch}>
//         <Image source={require('./images/flash.png')} style={ [styles.flashIcon, {height:40}]}/>
//          </TouchableOpacity>
//          </View>
//       </View>

//       {/* Scanned Data Display (Bottom 50%) */}
//       <View style={styles.resultContainer}>
//       {/* <Text style={styles.resultText}>Scanner Type:</Text> */}
//       {/* <Text style={styles.dataText}>{}</Text> */}
//       <View style={styles.textContainer}>
//       <Text style={styles.resultText}>URL Link:</Text>
//       {scannedData ?(
//         <TouchableOpacity onPress={onScannedDataPress}>
//              <Text style={[styles.dataText,{color:'blue',textDecorationColor:'underline'}]}>{scannedData || "No QR Code / Barcode scanned yet"}</Text>
//         </TouchableOpacity>
//       ):(
// <Text style={styles.dataText}>No QR Code / Barcode generate link yet</Text>
//       )}

//       </View>

//       <View style={styles.textContainer}>
//       <Text style={styles.resultText}>Product Data :</Text>
//       {scannedData ?(
//              <Text style={[styles.dataText]}>{scannedData || "No QR Code / Barcode scanned yet"}</Text>
//       ):(
// <Text style={styles.dataText}>No QR Code / Barcode scanned yet</Text>
//       )}

//       </View>

//         <View style={styles.textContainer}>
//         <Text style={styles.resultText}>Product Name :</Text>
//         <Text style={[styles.resultText,{color:'green',fontSize:15,fontWeight:500}]}>Product Name Will not be Defined</Text>
//         </View>
//         <View style={styles.textContainer}>
//         <Text style={styles.resultText}>Quantity:</Text>
//         <Text style={[styles.resultText,{color:'green',fontSize:15,fontWeight:500}]}>Quantity Will not be Defined</Text>
//         </View>
//         <View style={styles.textContainer}>
//         <Text style={styles.resultText}>Cost :</Text>
//         <Text style={[styles.resultText,{color:'green',fontSize:15,fontWeight:500}]}>Cost Will not be Defined</Text>
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
//     backgroundColor: '#F1F0E9',
//   },
//   cameraContainer:{
//     height:250,
//     width:250,
//     alignContent:'center',
//     alignItems:'center',
//     alignSelf:'center',
//     marginTop:'10%',
//     borderWidth:2,
//     borderRadius:10

//   },
//   scannerContainer: {
//     flex: 2, // 50% of screen
//     position:'relative',
//     backgroundColor:'#F2F6D0'
//   },
//   resultContainer: {
//     flex: 2, // 50% of screen
//     // justifyContent: 'center',
//     // alignItems: 'center',
//     backgroundColor: '#F2F6D0',
//     // marginTop:-40,
//     padding: 15,
//   },
//   resultText: {
//     fontSize: 15,
//     // borderBottomWidth:2,
//     marginBottom:3,
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
//     marginTop: 331,
//     marginLeft:335,
//     marginBottom:2,
//     width:100,
//     // position:'absolute',
//     // zIndex:1,
//     borderRadius:25,
//     // backgroundColor:'rgba(0,0,0.5',
//     // tintColor:'white'
//   },
//   flashIcon: {
//     // marginTop: 331,
//     // marginLeft:335,
//     // marginBottom:2,
//     width:100,
//     marginLeft:310,
//     marginTop:230,
//     tintColor: 'black', // Ensures visibility (if needed)
//   },
// });
