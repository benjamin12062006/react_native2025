import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

const ThemedView: React.FC<ViewProps> = ({ style, children, ...props }) => {
  return (
    <View style={[styles.default, style]} {...props}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  default: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default ThemedView;
