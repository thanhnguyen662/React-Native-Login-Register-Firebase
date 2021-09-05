import React, { useState } from 'react';
import { Alert } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import { Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth } from '../../firebase';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [rePassword, setRePassword] = useState('');

    const handleClickRegisterButton = async () => {
        if (!username || !password || !displayName || !photoURL || !rePassword)
            return alertFunc('Error', 'Do not leave it blank');

        if (password !== rePassword)
            return alertFunc('Error', 'Password not match');

        const formData = {
            username,
            password,
        };

        try {
            await auth
                .createUserWithEmailAndPassword(
                    formData.username,
                    formData.password
                )
                .then((user) => {
                    const message = `Register success with ${user.user.email}`;
                    alertFunc('Success', message);
                });

            await auth.currentUser.updateProfile({
                displayName,
                photoURL,
            });
        } catch (error) {
            alertFunc('Error', String(error).split(': ')[1]);
        }
    };

    const alertFunc = (status, description) => {
        Alert.alert(status, description, [{ text: 'OK' }]);
    };

    return (
        <View style={styles.registerForm}>
            <Text style={styles.headerStyle}>Register Form</Text>
            <Input
                placeholder='Username'
                leftIcon={{ type: 'font-awesome', name: 'user' }}
                onChangeText={(value) => setUsername(value)}
            />
            <Input
                placeholder='Display name'
                leftIcon={{ type: 'font-awesome', name: 'address-book' }}
                onChangeText={(value) => setDisplayName(value)}
            />
            <Input
                placeholder='Avatar'
                leftIcon={{ type: 'font-awesome', name: 'user-circle' }}
                onChangeText={(value) => setPhotoURL(value)}
            />
            <Input
                placeholder='Password'
                leftIcon={{ type: 'font-awesome', name: 'lock' }}
                onChangeText={(value) => setPassword(value)}
                secureTextEntry={true}
            />
            <Input
                placeholder='Confirm Password'
                leftIcon={{ type: 'font-awesome', name: 'lock' }}
                onChangeText={(value) => setRePassword(value)}
                secureTextEntry={true}
            />
            <Button
                buttonStyle={{
                    width: 250,
                    textAlign: 'center',
                }}
                title='Login now'
                icon={
                    <Icon
                        name='arrow-right'
                        size={15}
                        color='white'
                        style={styles.icon}
                    />
                }
                onPress={handleClickRegisterButton}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    registerForm: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 60,
        paddingRight: 60,
    },
    headerStyle: {
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 35,
    },
    icon: {
        marginRight: 8,
    },
    modalContainer: {},
    modal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        backgroundColor: 'white',
    },
    displayName: {
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 20,
    },
    email: {
        marginTop: 5,
        marginBottom: 20,
    },
});

export default Register;
