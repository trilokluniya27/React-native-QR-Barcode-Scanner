import { Image, StyleSheet, Text, Linking, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useCameraDevice, Camera, useCodeScanner } from 'react-native-vision-camera';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [torch, setTorch] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [scannedType, setScannedType] = useState(null);

  const [product, setProduct] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCameraPermission = async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    };
    getCameraPermission();
  }, []);

  const toggleTorch = () => {
    setTorch((current) => !current);
  };

  const device = useCameraDevice('back');

  const fetchAndCompare = async (barcode) => {
    try {
            setLoading(true);
            setProduct(null);
            setNotFound(false);
      
            const response = await fetch(
              'https://ddottt6z7ccpe0a-apexdb.adb.me-jeddah-1.oraclecloudapps.com/ords/otrix/oc_pos_item_barcodes_v/',
            );
            const text = await response.text();
            console.log('Raw response text:', text);
            let data;
            try {
              data = JSON.parse(text);
            } catch (jsonError) {
              console.error('Invalid JSON:', jsonError);
              return;
            }
      
            console.log('Parsed JSON:', data);
            const matched = data.items.find(item => item.barcode === barcode);
      
      
            if (matched) {
              setProduct(matched);
            } else {
              setNotFound(true);
            }
          } catch (err) {
            console.error('Error:', err);
            setNotFound(true);
          } finally {
            setLoading(false);
          }
  };

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13', 'ean-8', 'code-128', 'aztec', 'codabar', 'code-39', 'code-93', 'data-matrix', 'itf', 'pdf-417', 'upc-a', 'upc-e'],
    onCodeScanned: async (codes) => {
      if (codes.length > 0) {
        const scannedValue = codes[0].value;
        setScannedData(scannedValue);
        setScannedType(codes[0].type);
        await fetchAndCompare(scannedValue);
      }
    },
  });

  const onScannedDataPress = () => {
    if (!scannedData) return;
    if (scannedType === 'qr' && scannedData.startsWith('http')) {
      Linking.openURL(scannedData);
    } else {
      const searchURL = `https://www.google.com/search?q=${scannedData}`;
      Linking.openURL(searchURL);
    }
  };

  if (hasPermission === null) return <Text>Requesting camera permission...</Text>;
  if (!hasPermission === false) return <Text>Access Denied</Text>;
  if (!device) return <Text>No Camera Device Found</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.scannerContainer}>
        <View style={styles.cameraContainer}>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            torch={torch ? 'on' : 'off'}
            enableZoomGesture={true}
            codeScanner={codeScanner}
          />
          <TouchableOpacity onPress={toggleTorch}>
            <Image source={require('./images/flash.png')} style={[styles.flashIcon, { height: 40 }]} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.resultContainer}>
        {/* <View style={styles.textContainer}>
          <Text style={styles.resultText}>URL Link:</Text>
          {scannedData ? (
            <TouchableOpacity onPress={onScannedDataPress}>
              <Text style={[styles.dataText, { color: 'blue', textDecorationColor: 'underline' }]}>
                {scannedData}
              </Text>
            </TouchableOpacity>
          ) : (
            <Text style={styles.dataText}>No QR Code / Barcode generate link yet</Text>
          )}
        </View> */}

        <View style={styles.textContainer}>
          <Text style={styles.resultText}>Product Barcode No :</Text>
          {scannedData ? (
            <Text style={styles.dataText}>{scannedData}</Text>
          ) : (
            <Text style={styles.dataText}>No QR Code / Barcode scanned yet</Text>
          )}
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.resultText}>Product Name :</Text>
          <Text style={[styles.resultText, { color: 'green', fontSize: 15, fontWeight: 500 }]}>
          {product?.item_name ? `${product.item_name}` :  'Cost Will not be Defined'}
          </Text>
        </View>


        <View style={styles.textContainer}>
          <Text style={styles.resultText}>Cost :</Text>
          <Text style={[styles.resultText, { color: 'green', fontSize: 15, fontWeight: 500 }]}>
          {product?.cost ? `₹${product.cost}` :  'Cost Will not be Defined'}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.resultText}>Store Name:</Text>
          <Text style={[styles.resultText, { color: 'green', fontSize: 15, fontWeight: 500 }]}>
          {product?.store_name ? `${product.store_name}` :  'Store Name Will not be Defined'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F0E9',
  },
  cameraContainer: {
    height: 250,
    width: 250,
    alignContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: '10%',
    borderWidth: 2,
    borderRadius: 10
  },
  scannerContainer: {
    flex: 2,
    position: 'relative',
    backgroundColor: '#F2F6D0'
  },
  resultContainer: {
    flex: 2,
    backgroundColor: '#F2F6D0',
    padding: 15,
  },
  resultText: {
    fontSize: 15,
    marginBottom: 3,
    color: 'black',
    fontWeight: 'bold',
    paddingLeft: 10
  },
  dataText: {
    fontSize: 16,
    color: 'green',
    marginTop: 10,
    marginVertical: 10,
    paddingLeft: 10
  },
  textContainer: {
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 5,
  },
  button: {
    color: 'black',
    fontSize: 18,
    marginTop: 331,
    textDecorationLine: 'underline',
    backgroundColor: 'green',
    borderRadius: 5,
    textAlign: 'center',
    padding: 5,
    width: 100
  },
  button2: {
    marginTop: 331,
    marginLeft: 335,
    marginBottom: 2,
    width: 100,
    borderRadius: 25,
  },
  flashIcon: {
    width: 100,
    marginLeft: 310,
    marginTop: 230,
    tintColor: 'black',
  },
});


// Adding some feature lilke image and scroolview and clear and scan againg button

// import { Image, StyleSheet, Text, Linking, View, TouchableOpacity, ScrollView } from 'react-native';
// import React, { useState, useEffect } from 'react';
// import { useCameraDevice, Camera, useCodeScanner } from 'react-native-vision-camera';

// export default function App() {
//   const [hasPermission, setHasPermission] = useState(null);
//   const [torch, setTorch] = useState(false);
//   const [scannedData, setScannedData] = useState(null);
//   const [scannedType, setScannedType] = useState(null);
//   const [product, setProduct] = useState(null);
//   const [notFound, setNotFound] = useState(false);
//   const [loading, setLoading] = useState(false);

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

//   const fetchAndCompare = async (barcode) => {
//     try {
//       setLoading(true);
//       setProduct(null);
//       setNotFound(false);

//       const response = await fetch(
//         'https://ddottt6z7ccpe0a-apexdb.adb.me-jeddah-1.oraclecloudapps.com/ords/otrix/oc_pos_item_barcodes_v/',
//       );
//       const text = await response.text();
//       let data;
//       try {
//         data = JSON.parse(text);
//       } catch (jsonError) {
//         console.error('Invalid JSON:', jsonError);
//         return;
//       }

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

//       {/* Scrollable content */}
//       <ScrollView style={styles.resultContainer}>
//         <View style={styles.textContainer}>
//           <Text style={styles.resultText}>Product Barcode No :</Text>
//           {scannedData ? (
//             <Text style={styles.dataText}>{scannedData}</Text>
//           ) : (
//             <Text style={styles.dataText}>No QR Code / Barcode scanned yet</Text>
//           )}
//         </View>

//         {/* Product image preview */}
//         {product?.image_url && (
//           <View style={{ alignItems: 'center', marginVertical: 10 }}>
//             <Image
//               source={{ uri: product.image_url }}
//               style={{ width: 120, height: 120, borderRadius: 10, borderWidth: 1, borderColor: '#ccc' }}
//               resizeMode="contain"
//             />
//           </View>
//         )}

//         <View style={styles.textContainer}>
//           <Text style={styles.resultText}>Product Name :</Text>
//           <Text style={[styles.resultText, { color: 'green', fontSize: 15, fontWeight: 500 }]}>
//             {product?.item_name ? `${product.item_name}` : 'Product Name Will not be Defined'}
//           </Text>
//         </View>

//         <View style={styles.textContainer}>
//           <Text style={styles.resultText}>Cost :</Text>
//           <Text style={[styles.resultText, { color: 'green', fontSize: 15, fontWeight: 500 }]}>
//             {product?.cost ? `₹${product.cost}` : 'Cost Will not be Defined'}
//           </Text>
//         </View>

//         <View style={styles.textContainer}>
//           <Text style={styles.resultText}>Store Name:</Text>
//           <Text style={[styles.resultText, { color: 'green', fontSize: 15, fontWeight: 500 }]}>
//             {product?.store_name ? `${product.store_name}` : 'Store Name Will not be Defined'}
//           </Text>
//         </View>

//         {/* Clear/Scan Again Button */}
//         <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 20 }}>
//           <TouchableOpacity
//             style={{ backgroundColor: '#F44336', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 8 }}
//             onPress={() => {
//               setScannedData(null);
//               setProduct(null);
//               setNotFound(false);
//             }}
//           >
//             <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>🔄 Scan Again / Clear</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
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
//     borderRadius: 10,
//   },
//   scannerContainer: {
//     flex: 2,
//     position: 'relative',
//     backgroundColor: '#F2F6D0',
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
//     paddingLeft: 10,
//   },
//   dataText: {
//     fontSize: 16,
//     color: 'green',
//     marginTop: 10,
//     marginVertical: 10,
//     paddingLeft: 10,
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
//     width: 100,
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

