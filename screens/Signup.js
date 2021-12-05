import React, {useState, useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';


import { 
    StyledContainer,
    InnerContainer,
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
import { View,TouchableOpacity ,ActivityIndicator,SafeAreaView} from 'react-native';
import {Formik} from 'formik';
import axios from 'axios';
const {primary,brand,darkLight} = Colors;
import KeyboardAvoidingWrapper from '../components/KeyboardAvoidingWrapper';

// async-storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credentials context
import { CredentialsContext } from '../components/Credentialscontext';


const Signup = ({navigation}) => {
    const [hidePassword, setHidePassword] = useState(true);
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date(2000, 0, 1));

    const [message, setMessage] = useState();
    const [messageType, setMessageType] = useState();

    // credentials context
    const {storedCredentials, setStoredCredentials} = useContext(CredentialsContext);
     
    const handleSignup = (credentials, setSubmitting) => {
      handleMessage(null);
      const url = 'http://api.sianet.me:8000/user/signup';
      console.log(credentials);
      axios
        .post(url, credentials)
        .then((response) => {
          const result = response.data;
          const { status, message, data } = result;
  
          if (status !== 'SUCCESS') {
            handleMessage(message, status);
          } else {
            persistLogin({ ...data } ,message, status);
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

  
    // Actual value to be sent
    const [dob, setDob] = useState();
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(false);
      setDate(currentDate);
      setDob(currentDate);
    };
  
    const showDatePicker = () => {
      setShow('date');
    };

    const persistLogin = (credentials, message, status) => {
      AsyncStorage.setItem('WathaeqCredentials', JSON.stringify(credentials))
        .then(() => {
          handleMessage(message, status);
          setStoredCredentials(credentials);
        })
        .catch((error) => {
          handleMessage('Persisting login failed');
          console.log(error);
        });
    };
  
      
  
    return (
      <SafeAreaView style={{ flex : 1 }}>
      <KeyboardAvoidingWrapper behavior="pospaddingition">
        <StyledContainer>
          <StatusBar style="dark" />
          <InnerContainer>
            <PageTitle>Wathaeq</PageTitle>
            <SubTitle>Account Signup</SubTitle>
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onChange}
                style={{
                  backgroundColor: 'yellow',
                }}
              />
            )}
  
            <Formik
              initialValues={{ fullName: '', email: '', dateOfBirth: '',phoneNumber:'', password: '', confirmPassword: '' }}
              onSubmit={(values, { setSubmitting }) => {
                //values = { ...values, dateOfBirth: dob };
                if (
                  values.email == '' ||
                  values.password == '' ||
                  values.fullName == '' ||
                  values.dateOfBirth == '' ||
                  values.phoneNumber == '' ||
                  values.confirmPassword == ''
                ) {
                  handleMessage('Please fill in all fields');
                  setSubmitting(false);
                } else if (values.password !== values.confirmPassword) {
                  handleMessage('Passwords do not match');
                  setSubmitting(false);
                } else {
                  handleSignup(values, setSubmitting);
                }
              }}

            >
              {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
                <StyledFormArea>
                  <MyTextInput
                    label="Full Name"
                    placeholder="Khaled Abdrabou"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange('fullName')}
                    onBlur={handleBlur('fullName')}
                    value={values.fullName}
                    icon="person"
                  />
                  <MyTextInput
                    label="Email Address"
                    placeholder="KhaledAbdrabou@gmail.com"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    keyboardType="email-address"
                    icon="mail"
                  />
                  <MyTextInput
                    label="Date of Birth"
                    placeholder="YYYY - MM - DD"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange('dateOfBirth')}
                    onBlur={handleBlur('dateOfBirth')}
                    value={values.dateOfBirth}
                    icon="calendar"
                    editable={true}
                    isDate={true}
                    showDatePicker={showDatePicker}
                  />
                 <MyTextInput
                    label="Phone Number"
                    placeholder="+971-5*******"
                    placeholderTextColor={darkLight}
                    defaultValue = '+971'
                    onChangeText={handleChange('phoneNumber')}
                    onBlur={handleBlur('phoneNumber')}
                    value={values.phoneNumber}
                    keyboardType="phone-pad"
                    icon="call"
                  />
                  <MyTextInput
                    label="Password"
                    placeholder="* * * * * * * *"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    secureTextEntry={hidePassword}
                    icon="lock-closed"
                    isPassword={true}
                    hidePassword={hidePassword}
                    setHidePassword={setHidePassword}
                  />
                  <MyTextInput
                    label="Confirm Password"
                    placeholder="* * * * * * * *"
                    placeholderTextColor={darkLight}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    secureTextEntry={hidePassword}
                    icon="lock-closed"
                    isPassword={true}
                    hidePassword={hidePassword}
                    setHidePassword={setHidePassword}
                  />
                  <MsgBox type={messageType}>{message}</MsgBox>
  
              
                  {!isSubmitting && (
                    <StyledButton onPress={handleSubmit}>
                      <ButtonText>Signup</ButtonText>
                    </StyledButton>
                  )}
                  {isSubmitting && (
                    <StyledButton disabled={true}>
                      <ActivityIndicator size="large" color={primary} />
                    </StyledButton>
                  )}
  
                  <Line />
                  <ExtraView>
                      <ExtraText>already have an account?</ExtraText>
                        <TextLink onPress={() => navigation.navigate('Login')}>
                          <TextLinkContent>Login</TextLinkContent>
                        </TextLink>
                  </ExtraView>
                </StyledFormArea>
              )}
            </Formik>
          </InnerContainer>
        </StyledContainer>
        </KeyboardAvoidingWrapper>
        </SafeAreaView>
    );
  };
  
  const MyTextInput = ({ label, icon, isPassword, hidePassword, setHidePassword, isDate, showDatePicker, ...props }) => {
    return (
      <View>
        <LeftIcon>
          <Ionicons name={icon} size={25} color={brand} />
        </LeftIcon>
        <StyledInputLabel>{label}</StyledInputLabel>
  
        {isDate && (
          <TouchableOpacity onPress={showDatePicker}>
            <StyledTextInput {...props} />
          </TouchableOpacity>
        )}
        {!isDate && <StyledTextInput {...props} />}
  
        {isPassword && (
          <RightIcon
            onPress={() => {
              setHidePassword(!hidePassword);
            }}
          >
            <Ionicons fullName={hidePassword ? 'md-eye-off' : 'md-eye'} size={30} color={darkLight} />
          </RightIcon>
        )}
      </View>
    );
  };
  
  export default Signup;