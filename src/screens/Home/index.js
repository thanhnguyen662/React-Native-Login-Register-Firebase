import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Text } from 'react-native';
import Login from '../Login';
import Register from '../Register';

const Tab = createBottomTabNavigator();

function Home(props) {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name='Login'
                component={Login}
                options={{ tabBarIcon: () => <Text>😎</Text> }}
            />
            <Tab.Screen
                name='Register'
                options={{ tabBarIcon: () => <Text>🤩</Text> }}
                component={Register}
            />
        </Tab.Navigator>
    );
}

export default Home;
