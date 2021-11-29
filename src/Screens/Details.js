import React, { useEffect, useState } from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'
import LineChart from '../Components/LineChart'
import axios from 'axios';

const Details = ({ route }) => {

    const { id, name, price_usd } = route.params.details

    const [data, setData] = useState(price_usd)


    const getData = async (req = 1) => {

        try {
            const request = await axios.get(`https://api.coinlore.net/api/ticker/?id=${id}`)
            setData('')
            if (request.status === 200) {
                const priceCoin = request.data[0].price_usd
                setData(priceCoin)
            }


            if (req > 4) {
                return
            }

            return setTimeout(() => getData(req + 1), 3000)

        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <View style={{ flex: 1, alignItems: 'center' }}>
            <Text>Details {name}</Text>
            <LineChart price={data} />
        </View>
    )
};


export { Details };
