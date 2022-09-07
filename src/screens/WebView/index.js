/* eslint-disable camelcase */
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { WebView } from 'react-native-webview';

const WebViewComponent = () => {
  const route = useRoute();
  const {live_url} = route.params;
  return (
    <WebView source={{ uri: live_url }} />
  )
}

export default WebViewComponent;