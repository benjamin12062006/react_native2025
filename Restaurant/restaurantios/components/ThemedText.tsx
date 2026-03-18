import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';

interface ThemedTextProps extends TextProps {
  type?: 'title' | 'link';
}

const ThemedText: React.FC<ThemedTextProps> = ({ type, style, children, ...props }) => {
  const textStyle = [styles.default, type === 'title' && styles.title, type === 'link' && styles.link, style];
  return (
    <Text style={textStyle} {...props}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  default: {
    fontSize: 16,
    color: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  link: {
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },
});

export default ThemedText;
