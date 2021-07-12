import React, {useRef, useEffect} from 'react';
import { Animated, View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
    useEffect(()=> {
        fadeIn();
    },[])
 
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 5000,
        }).start();
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white', paddingTop: 0 }}>
            <View style={styles.container}>
                <Animated.View
                    style={[
                        styles.fadingContainer,
                        {
                            opacity: fadeAnim, // Bind opacity to animated value
                        },
                    ]}>
                    <Text style={styles.welcome}>WELCOME!</Text>
                </Animated.View>
            </View>
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity
                        style={styles.button} onPress={() => navigation.navigate('Scan')}>
                        <Text style={styles.text}>SCAN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Post')}>
                        <Text style={styles.text}>POST</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Show')}>
                        <Text style={styles.text}>SHOW</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    text: {
        color: 'black',
        fontSize: 20,
        marginLeft: 35,
        marginRight: 35,
    },
    welcome: {
        textAlign: 'center', 
        fontSize: 30, 
        backgroundColor: 'gray', 
        color: 'white', 
        padding: 15},
    button: {
        alignItems: 'center',
        backgroundColor: '#00bfff',
        padding: 10,
        marginTop: 25,
        marginLeft: 35,
        marginRight: 35,
        color: '#ffffff',
        borderRadius: 5,
    },
});
