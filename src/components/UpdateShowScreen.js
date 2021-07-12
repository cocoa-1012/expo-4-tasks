import React, { useEffect, useState } from 'react';
import { View, KeyboardAvoidingView, TextInput, TouchableOpacity, SafeAreaView, Text, ScrollView, StyleSheet } from 'react-native';
import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyBPW78HmyUEDztZkONh2I82fElnn6ZTmKQ",
    authDomain: "testa-fbfc4.firebaseapp.com",
    projectId: "testa-fbfc4",
    storageBucket: "testa-fbfc4.appspot.com",
    messagingSenderId: "510857575653",
    databaseURL: "https://testa-fbfc4-default-rtdb.firebaseio.com",
    appId: "1:510857575653:web:909aca9d71e4e930fc680c",
    measurementId: "G-Z6DDN80ERV"
};
// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app()
}

const UpdateShowScreen = ({ navigation, route }) => {

    useEffect(() => {
        listenProducts();
    }, [])

    const { productId, title, price, description } = route.params;

    const [newTitle, setTitle] = useState(title);
    const [newPrice, setPrice] = useState(price);
    const [newDescription, setDescription] = useState(description);
    const [products, setProducts] = useState([]);
    // update button clicked
    const onsubmit = () => {
        if (title == '') {
            alert('Please fill title')
        } else if (price == '') {
            alert('Please fill price')
        } else if (description == '') {
            alert('Please fill description')
        }
        else {
            const newObj = { id: productId, title: newTitle, price: newPrice, description: newDescription }
            const tempProducts = [...products];
            const index = tempProducts.findIndex(x => x.id === productId);
            tempProducts[index] = newObj;
            setProducts(tempProducts);
            storeProducts(tempProducts)
            // go to show screen
            navigation.navigate('Show')
        }
    }
    // store data to firebase
    const storeProducts = (newProduct) => {
        firebase
            .database()
            .ref('products')
            .set({
                productList: newProduct
            });
    }
    // read data from firebase
    const listenProducts = () => {
        firebase.database().ref('products').on('value', (snapshot) => {
            const productList = snapshot.val().productList;
            setProducts(productList);
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1 }}>
                <ScrollView keyboardShouldPersistTaps="handled">
                    <View style={styles.labelGroup}>
                        <Text style={styles.label}>Title :</Text>
                        <TextInput
                            style={styles.title}
                            onChangeText={
                                (title) => setTitle(title)
                            }
                            value={newTitle} />
                    </View>
                    <View style={styles.labelGroup}>
                        <Text style={styles.label}>Price :</Text>
                        <TextInput
                            style={styles.title}
                            onChangeText={
                                (price) => setPrice(price)
                            }
                            value={newPrice} />
                    </View>
                    <KeyboardAvoidingView>
                        <View >
                            <Text style={{ marginLeft: 15, marginTop: 30, fontSize: 20 }}>Description :</Text>
                            <TextInput style={styles.input}
                                underlineColorAndroid="transparent"
                                placeholder="Enter Description"
                                placeholderTextColor="gray"
                                onChangeText={
                                    (description) => setDescription(description)
                                }
                                value={newDescription}
                                numberOfLines={7}
                                multiline={true}
                            />
                        </View>
                        <TouchableOpacity style={styles.button} onPress={() => onsubmit()} >
                            <Text style={styles.text}>UPDATE</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default UpdateShowScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    text: {
        color: 'white',
        fontSize: 20,
        fontWeight: "900"
    },
    input: {
        marginLeft: 25,
        marginRight: 25,
        marginTop: 5,
        borderColor: 'gray',
        borderWidth: 1,
        textAlignVertical: 'top',
        padding: 10,
        fontSize: 20,
        color: "black"
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#00bfff',
        padding: 10,
        marginTop: 15,
        marginLeft: 35,
        marginRight: 35,
        borderRadius: 5
    },
    previewImg: {
        marginTop: 0,
        marginLeft: 30,
        marginRight: 30,
        height: 150,
        width: 200,
        borderWidth: 3,
        borderColor: "#ff8833",
        alignSelf: 'center',
    },
    labelGroup: {
        flex: 1,
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    title: {
        borderBottomWidth: 1,
        marginTop: 10,
        height: 20,
        width: 250,
        fontSize: 20
    },
    label: {
        fontSize: 20,
        marginTop: 5,
        padding: 0,
        textAlignVertical: 'center'
    }
});