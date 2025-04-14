import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, HelperText, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { isValidYouTubeUrl } from '../utils/helpers';

const YouTubeUrlInput = ({ 
  value, 
  onChangeText, 
  onSubmit,
  loading = false
}) => {
  const theme = useTheme();
  const [error, setError] = useState('');
  
  // Handle URL validation
  const handleValidation = (url) => {
    if (!url.trim()) {
      setError('Please enter a YouTube URL');
      return false;
    }
    
    if (!isValidYouTubeUrl(url)) {
      setError('Please enter a valid YouTube URL');
      return false;
    }
    
    setError('');
    return true;
  };
  
  // Handle URL submission
  const handleSubmit = () => {
    if (handleValidation(value)) {
      onSubmit(value);
    }
  };
  
  // Handle URL change
  const handleChangeText = (text) => {
    onChangeText(text);
    if (error) {
      handleValidation(text);
    }
  };
  
  // Handle paste from clipboard
  const handlePaste = async () => {
    try {
      const text = await Clipboard.getStringAsync();
      if (text) {
        onChangeText(text);
      }
    } catch (error) {
      console.error('Error pasting from clipboard:', error);
    }
  };
  
  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label="YouTube URL"
        value={value}
        onChangeText={handleChangeText}
        placeholder="https://www.youtube.com/watch?v=..."
        autoCapitalize="none"
        autoCorrect={false}
        keyboardType="url"
        returnKeyType="go"
        onSubmitEditing={handleSubmit}
        right={
          <TextInput.Icon
            icon="content-paste"
            onPress={handlePaste}
            forceTextInputFocus={false}
          />
        }
        left={
          <TextInput.Icon
            icon="youtube"
            forceTextInputFocus={false}
          />
        }
        error={!!error}
        disabled={loading}
        style={styles.input}
      />
      
      {error ? (
        <HelperText type="error" visible={!!error}>
          {error}
        </HelperText>
      ) : null}
      
      <Button
        mode="contained"
        onPress={handleSubmit}
        loading={loading}
        disabled={loading || !value.trim()}
        icon={({ size, color }) => (
          <Ionicons name="search" size={size} color={color} />
        )}
        style={styles.button}
      >
        Generate Summary
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  input: {
    width: '100%',
  },
  button: {
    marginTop: 10,
  },
});

export default YouTubeUrlInput;
