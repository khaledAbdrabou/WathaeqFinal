import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({selected}) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

    return (
        <View 
            style={{
                width:6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor
            }}
        />
    );
}

const Skip = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Skip</Text>
    </TouchableOpacity>
);

const Next = ({...props}) => (
   
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Next</Text>
    </TouchableOpacity>
);

const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Done</Text>
    </TouchableOpacity>
);

const OnboardingScreen = ({navigation}) => {
    return (
        <Onboarding
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        DotComponent={Dots}
        onSkip={() => navigation.navigate("Login")}
        onDone={() => navigation.navigate("Login")}
        pages={[
          {
            backgroundColor: '#4F8C76',
            image: <Image source={require('../assets/1onboarding.png')} />,
            title: 'Easily Load, Store and Manage your Documents',
            subtitle: 'Central Hub for all your documents',
          },
          {
            backgroundColor: '#D3B7CC',
            image: <Image source={require('../assets/2onboarding.png')} />,
            title: 'Sharing made Easy',
            subtitle: 'Seamlessly Share your Documents using NFC',
          },
          {
            backgroundColor: '#E2E2EE',
            image: <Image source={require('../assets/3onboarding.png' )} />,
            title: 'Search Using Keywords',
            subtitle: "Find the documents Using the content instead of its title",
          },
        ]}
      />
    );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center'
  },
});