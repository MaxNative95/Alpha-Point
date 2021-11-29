import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, ScrollView, TouchableOpacity, TextInput, Dimensions, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux';
import { setList } from '../Redux/Actions/User'
import axios from 'axios';

import { useIsConnected } from 'react-native-offline';
import { showToast } from '../Utils/Toast'



let { width } = Dimensions.get('window');

const Home = ({ navigation }) => {
    const isConnected = useIsConnected();

    const dispatch = useDispatch();
    const name = useSelector((state) => state.user.name);
    const list = useSelector((state) => state.user.list);


    const [hourChange, setHourChange] = useState(null);
    const [isFilterActive, setIsFilterActive] = useState(false);



    const getData = async () => {
        // we will use async/await to fetch this data
        // store the data into our persistent redux

        let finalData;
        try {
            const request = await axios.get("https://api.coinlore.net/api/tickers/")

            if (request.status === 200) {
                const data = await request.data.data
                finalData = data
                dispatch(setList(data))
            }

        } catch (error) {
            console.log(error)
        }

        return finalData
    }



    const filterByHourChange = async () => {

        setIsFilterActive(true)
        try {
            const duplicateData = await getData();

            if (!hourChange) {
                setIsFilterActive(false)
                return Alert.alert('Field required')
            }

            const number = hourChange

            const newList = duplicateData.filter(coin => {
                return parseInt(coin.percent_change_24h) == number
            });

            dispatch(setList(newList))
            setHourChange('');
            setIsFilterActive(false)
        } catch (e) {
            console.log(e)
            setIsFilterActive(false)
        }

    };


    useEffect(() => {
        console.log('useEffect')
        getData();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.welcomingContainer}>
                <Text style={styles.welcomingText}>Welcome {name} !</Text>
            </View>
            {isConnected ? console.log('conectado') : showToast('offline')}
            <View style={styles.filteringContainer}>
                <View style={styles.textInput}>
                    <TextInput
                        placeholder={"Enter Hour Change"}
                        placeholderTextColor="#000"
                        keyboardType="numeric"
                        value={hourChange}
                        onChangeText={text => setHourChange(text)}
                    />
                </View>
                <TouchableOpacity onPress={() => filterByHourChange()} style={[styles.filterButton, { backgroundColor: isFilterActive ? 'blue' : '#F6F6F6', }]} >

                    <Text style={styles.filterButtonText}>Filter</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{ flex: 1 }}>
                {list && (
                    <View style={{ padding: 20 }}>
                        {/* loop over the data */}
                        {  list.length !== 0 && list.map((item, index) => (
                            <TouchableOpacity onPress={() => isConnected ? navigation.navigate('Details', { details: item }) : showToast('device offline')} style={styles.card} key={index}>
                                <Text style={styles.itemName}>{item.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    )
};

const styles = StyleSheet.create({
    welcomingContainer: {
        height: 50,
        justifyContent: 'center'
    },
    welcomingText: {
        fontSize: 19,
        textAlign: 'center',
        color: '#7D1931',
        fontWeight: 'bold'
    },
    card: {
        backgroundColor: '#000',
        height: 45,
        marginTop: 10,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#000',
        borderWidth: 2
    },
    itemName: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    },
    textInput: {
        height: 45,
        width: width * 0.5,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderRadius: 20,
        borderColor: '#000',
        borderWidth: 2
    },
    filteringContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    filterButton: {
        width: width * 0.15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        borderColor: '#000',
        borderWidth: 2
    },
    filterButtonText: {
        color: '#000'
    }
})

export { Home };
