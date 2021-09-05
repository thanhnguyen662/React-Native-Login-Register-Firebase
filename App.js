import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'react-native-elements';
import Home from './src/screens/Home';

export default function App() {
    return (
        <SafeAreaProvider>
            <ThemeProvider>
                <NavigationContainer>
                    <Home />
                </NavigationContainer>
            </ThemeProvider>
        </SafeAreaProvider>
    );
}
