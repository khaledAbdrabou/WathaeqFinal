import React, { useContext } from 'react';
import { StatusBar } from 'expo-status-bar';

import {
  Avatar,
  WelcomeImage,
  PageTitle,
  SubTitle,
  StyledFormArea,
  StyledButton,
  InnerContainer,
  WelcomeContainer,
  ButtonText,
  Line,
} from '../constants/styles';

// Async storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// credentials context
import { CredentialsContext } from '../components/Credentialscontext';

const PersonalInfoS = () => {
  // credentials context
  const { storedCredentials, setStoredCredentials } = useContext(CredentialsContext);

  const { name, email } = storedCredentials;

  
  const clearLogin = () => {
    AsyncStorage.removeItem('WathaeqCredentials')
      .then(() => {
        setStoredCredentials("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      <StatusBar style="light" />
      <InnerContainer>
        

        <WelcomeContainer>
          <PageTitle welcome={true}>Welcome! </PageTitle>
          <SubTitle welcome={true}>{name || ''}</SubTitle>
          <SubTitle welcome={true}>{email || ''}</SubTitle>

          <StyledFormArea>

            <Line />
            <StyledButton onPress={clearLogin}>
              <ButtonText>Logout</ButtonText>
            </StyledButton>
          </StyledFormArea>
        </WelcomeContainer>
      </InnerContainer>
    </>
  );
};

export default PersonalInfoS;