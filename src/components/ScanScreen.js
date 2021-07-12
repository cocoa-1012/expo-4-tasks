import React, { useState, useEffect } from 'react';
import { Text, View, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

const ScanScreen = ({ navigation }) => {

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const [scandata, setScanData] = useState(null);
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    // when barcode scanned
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setScanData(data);
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={{ width: '100%', height: '80%' }}
            />
            <View style={{ flex: 1, margin: 25 }}>
                <Button title={'Tap to Scan Again'}
                    onPress={() => {
                        setScanned(false);
                        setScanData(null)
                    }} />
                <Text></Text>
                <Button title={'Go to POST Product'}
                    onPress={() => navigation.navigate('ScanPost', { scandata })} />
            </View>
        </View>
    );
}

export default ScanScreen;
