import React, {useState, useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import Signup from './Signup';
import EndUserAgreement from './EndUagreementS';

import {Ionicons } from '@expo/vector-icons';
import { 
    StyledContainer,
    InnerContainer,
    PageLogo,
    PageTitle,
    SubTitle,
    StyledFormArea,
    LeftIcon,
    StyledInputLabel,
    StyledTextInput,
    RightIcon,
    Colors,
    StyledButton,
    ButtonText,
    MsgBox,
    Line,
    ExtraText,
    ExtraView,
    TextLink,
    TextLinkContent


} from '../constants/styles';
import  {View , ActivityIndicator,SafeAreaView} from 'react-native';
import {Formik} from 'formik';

import axios from 'axios';
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';


// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credentials context
import { CredentialsContext } from '../components/Credentialscontext';

const {primary,brand,darkLight} = Colors;




const Login = ({navigation}) => {

    const [hidePassword, setHidePassword ] = useState(true);
    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    // credentials context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
     
    const  handleLogin = (credentials, setSubmitting) => {
        handleMessage(null);
        const url = 'http://api.sianet.me:8000/user/signin';

        axios
          .post(url, credentials)
          .then((response) => {
            const result = response.data;
            const { status, message, data } = result;
    
            if (status !== 'SUCCESS') {
              handleMessage(message, status);
            } else {
                persistLogin({ ...data[0] }, message, status);
            }
            setSubmitting(false);
          })
          .catch((error) => {
            setSubmitting(false);
            handleMessage('An error occurred. Check your network and try again');
            console.log(error.toJSON());
          });
      };

    const handleMessage = (message, type = 'FAILED') => {
        setMessage(message);
        setMessageType(type);
      };

    const persistLogin = (credentials, message, status) => {
        AsyncStorage.setItem('WathaeqCredentials', JSON.stringify(credentials))
          .then(() => {
            handleMessage(message, status);
            setStoredCredentials(credentials);
            console.log(credentials)
          })
          .catch((error) => {
            handleMessage('Persisting login failed');
            console.log(error);
          });
      };

      return(
          
        <SafeAreaView style={{ flex : 1 }}>
        <KeyboardAvoidingWrapper>
        <StyledContainer>
            <StatusBar style='dark'/>
            <InnerContainer>
                <PageLogo resizeMode="cover" source = {require('../assets/AppLogo.png')}/>
                
                <SubTitle>Account Login </SubTitle>

                <Formik
                initialValues={{email: '', password: ''}}
                onSubmit={(values, { setSubmitting }) =>{
                    if (values.email == '' || values.password == '') {
                        handleMessage('Please fill in all fields');
                        setSubmitting(false);
                    } else {
                        handleLogin(values, setSubmitting);
                    }
                }}
                >
                    {({handleChange, handleBlur,handleSubmit,values, isSubmitting})=> (
                        <StyledFormArea>
                         <MyTextInput
                            label="email"
                            placeholder="Email@server.com"
                            placeholderTextColor={darkLight}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType="email-address"
                            icon="mail"
                        />
                         <MyTextInput
                        label="password"
                        placeholder="* * * * * * * *"
                        placeholderTextColor={darkLight}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        icon="lock-closed"
                        secureTextEntry={hidePassword}
                        isPassword={true}
                        hidePassword={hidePassword}
                        setHidePassword= {setHidePassword}
                        /> 
                        <MsgBox type={messageType}>{message}</MsgBox>
                       
                        {!isSubmitting && (
                            <StyledButton onPress={handleSubmit}>
                                <ButtonText>Login</ButtonText>
                            </StyledButton>
                        )}
                        {isSubmitting && (
                            <StyledButton disabled={true}>
                            <ActivityIndicator size="large" color={primary} />
                        </StyledButton>
                        )}

                        <Line />
                        <ExtraView>
                            <ExtraText>Don't have an account already?</ExtraText>
                            <TextLink onPress={() => navigation.navigate('Signup')}>
                                <TextLinkContent>Signup</TextLinkContent>
                             </TextLink>
                        </ExtraView>
                        
                    </StyledFormArea>)}

                </Formik>

            </InnerContainer>
        </StyledContainer>
        </KeyboardAvoidingWrapper>
      </SafeAreaView>
    );
};

const MyTextInput = ({label,isPassword,hidePassword,setHidePassword, icon, ...props}) =>{
    return(
        <View>
            <LeftIcon>
               <Ionicons name={icon} size={25} color={brand} />
            </LeftIcon>
            <StyledInputLabel>{label}</StyledInputLabel>
            <StyledTextInput {...props} />
            {isPassword &&(
                <RightIcon
                onPress={() => {
                    setHidePassword(!hidePassword);
                  }}
                >
                    <Ionicons name={hidePassword  ? 'md-eye-off' :'md-eye'} size = {30} color ={darkLight} />
                </RightIcon>
            )}
        </View>
    )
};




export default Login;