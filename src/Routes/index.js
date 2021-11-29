import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../Screens/Home';
import { Login } from '../Screens/Login';
import { Details } from '../Screens/Details';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = (props) => {
    return (
        <Tab.Navigator
            // screenOptions={({ route }) => ({
            //     tabBarIcon: ({ focused, color, size }) => {
            //         let iconName = '';
            //         if (route.name === 'Home') {
            //             iconName = focused
            //                 ? 'home'
            //                 : 'home';
            //         } else if (route.name === 'Settings') {
            //             iconName = focused ? 'cog' : 'cog'
            //         }

            //         // You can return any component that you like here!
            //         return <Icon name={iconName} size={size} color={color} />;
            //     },
            // })}
            tabBarOptions={{
                activeTintColor: '#09B44D',
                inactiveTintColor: '#D0D1D2',
                tabStyle: { backgroundColor: '#F6F6F6' },
                showLabel: false
            }}>
            <Tab.Screen options={{ headerShown: false }} name="Home" component={HomeNavigator} />
        </Tab.Navigator>
    );
};

const HomeNavigator = () => {
    return (
        <React.Fragment>
            <Stack.Navigator headerMode="none">
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Details" component={Details} />
            </Stack.Navigator>
        </React.Fragment>
    )
};


const LogInStack = () => {
    return (
        <React.Fragment>
            <Stack.Navigator headerMode="none">
                <Stack.Screen name="Login" component={Login} />
            </Stack.Navigator>
        </React.Fragment>
    );
};

export const Router = () => {
    const userStatus = useSelector((state) => state.user.isLogIn);
    return (
        <React.Fragment>
            <NavigationContainer>
                <Stack.Navigator headerMode="none">
                    {
                        userStatus ? (
                            <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeStack} />
                        ) :
                            (
                                <Stack.Screen options={{ headerShown: false }} name="Login" component={LogInStack} />
                            )
                    }
                </Stack.Navigator>
            </NavigationContainer>
        </React.Fragment>
    );
};