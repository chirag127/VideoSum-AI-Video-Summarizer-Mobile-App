import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

const ErrorMessage = ({ 
  message = 'An error occurred', 
  onRetry = null,
  onDismiss = null
}) => {
  const theme = useTheme();
  
  return (
    <View style={styles.container}>
      <Ionicons 
        name="alert-circle" 
        size={48} 
        color={theme.colors.error} 
      />
      <Text style={[styles.message, { color: theme.colors.text }]}>
        {message}
      </Text>
      <View style={styles.buttonContainer}>
        {onRetry && (
          <Button 
            mode="contained" 
            onPress={onRetry} 
            style={styles.button}
          >
            Retry
          </Button>
        )}
        {onDismiss && (
          <Button 
            mode="outlined" 
            onPress={onDismiss} 
            style={styles.button}
          >
            Dismiss
          </Button>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    margin: 10,
  },
  message: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    marginHorizontal: 5,
  },
});

export default ErrorMessage;
