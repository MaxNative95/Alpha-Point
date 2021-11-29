// Foo.jsx
import Toast from 'react-native-toast-message';


export const showToast = (message) => {
   return Toast.show({
      type: 'error',
      text1: message,
    //   text2: message
    });
  }