import React from 'react';
import { useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/Redux/configureStore';
import { Router } from './src/Routes/index';

// networkProvider
import { NetworkProvider } from 'react-native-offline'
import Toast from 'react-native-toast-message'

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <React.Fragment>
      <NetworkProvider pingOnlyIfOffline={true} pingInterval={10000} >
        <Provider store={store} >
          <PersistGate persistor={persistor} loading={null} >
            <Router backgroundColor={backgroundStyle} />
            <Toast />
          </PersistGate >
        </Provider>
      </NetworkProvider>
    </React.Fragment>
  );
};

export default App;
