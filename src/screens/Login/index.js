import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Avatar, Button, Input } from 'react-native-elements';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth } from '../../firebase';

function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [userDetail, setUserDetail] = useState({});

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleClickLoginButton = async () => {
        if (!username || !password)
            return alertFunc('Error', 'Do not leave it blank');

        const formData = {
            username,
            password,
        };

        try {
            await auth
                .signInWithEmailAndPassword(
                    formData.username,
                    formData.password
                )
                .then((user) => {
                    setUserDetail(user.user.providerData[0]);
                })
                .then(() => {
                    setModalVisible(true);
                });
        } catch (error) {
            alertFunc('Error', String(error).split(': ')[1]);
        }
    };

    const alertFunc = (status, description) => {
        Alert.alert(status, description, [{ text: 'OK' }]);
    };

    return (
        <View style={styles.loginForm}>
            <Text style={styles.headerStyle}>Login Form</Text>
            <Input
                placeholder='Username'
                leftIcon={{ type: 'font-awesome', name: 'user' }}
                onChangeText={(value) => setUsername(value)}
            />
            <Input
                placeholder='Password'
                leftIcon={{ type: 'font-awesome', name: 'lock' }}
                onChangeText={(value) => setPassword(value)}
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
                onPress={handleClickLoginButton}
            />

            <Modal isVisible={isModalVisible} style={styles.modalContainer}>
                <View style={styles.modal}>
                    <Avatar
                        size='xlarge'
                        rounded
                        source={{
                            uri: userDetail.photoURL,
                        }}
                    />
                    <Text style={styles.displayName}>
                        {userDetail?.displayName}
                    </Text>
                    <Text style={styles.email}>{userDetail?.email}</Text>
                    <Button title='Hide modal' onPress={toggleModal} />
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    loginForm: {
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

export default Login;
