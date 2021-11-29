import React, { useState } from 'react'
import {
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    Alert,
    Dimensions,
    StyleSheet,
    Keyboard,
    TouchableWithoutFeedback
} from 'react-native';
import { useDispatch } from 'react-redux';
import { setUserLogIn, setUser } from '../Redux/Actions/User'

let { width } = Dimensions.get('window');

const Login = ({ navigation }) => {
    const dispatch = useDispatch();
    const [userName, setuserName] = useState('');

    const login = () => {
        //if (!username) throw error
        if (!userName) {
            return Alert.alert('Enter a username');
        }
        //consume web service to authenticate user and go to home page
        dispatch(setUserLogIn(true));
        dispatch(setUser(userName));
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ padding: 20 }}>
                    <View style={styles.textInput}>
                        <TextInput
                            style={{ width: width * 0.7 }}
                            placeholder={"Enter username"}
                            placeholderTextColor="#000"
                            keyboardType="default"
                            value={userName}
                            onChangeText={text => setuserName(text)}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => login()} style={styles.button}>
                            <Text style={styles.buttonText}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    textInput: {
        backgroundColor: '#F6F6F6',
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        borderRadius: 20,
        borderColor: '#000',
        borderWidth: 2
    },
    buttonContainer: {
        marginTop: 25,
        alignItems: 'center'
    },
    button: {
        backgroundColor: 'black',
        width: 200,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20
    },
    buttonText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    }
})

export {
    Login
}