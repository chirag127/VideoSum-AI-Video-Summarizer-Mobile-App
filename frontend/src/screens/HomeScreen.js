import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Surface, useTheme } from 'react-native-paper';
import * as Clipboard from 'expo-clipboard';
import { Ionicons } from '@expo/vector-icons';

import YouTubeUrlInput from '../components/YouTubeUrlInput';
import SummaryOptions from '../components/SummaryOptions';
import SummaryCard from '../components/SummaryCard';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import TTSControls from '../components/TTSControls';

import useSummaryStore from '../store/summaryStore';
import ttsService from '../services/ttsService';
import { shareText } from '../utils/helpers';

const HomeScreen = ({ navigation }) => {
  const theme = useTheme();
  const { 
    url, 
    setUrl, 
    summaryType, 
    setSummaryType, 
    summaryLength, 
    setSummaryLength,
    loading, 
    error, 
    clearError,
    generateSummary,
    currentSummary,
    setCurrentSummary,
    deleteSummary,
    resetForm
  } = useSummaryStore();
  
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Stop TTS when component unmounts
  useEffect(() => {
    return () => {
      if (isPlaying) {
        ttsService.stop();
      }
    };
  }, [isPlaying]);
  
  // Handle URL submission
  const handleSubmit = async () => {
    try {
      const summary = await generateSummary();
      // Reset form after successful generation
      resetForm();
    } catch (error) {
      console.error('Error generating summary:', error);
    }
  };
  
  // Handle read aloud
  const handleReadAloud = () => {
    if (isPlaying) {
      ttsService.stop();
      setIsPlaying(false);
    } else {
      ttsService.speak(currentSummary.summaryText);
      setIsPlaying(true);
    }
  };
  
  // Handle share
  const handleShare = async () => {
    if (!currentSummary) return;
    
    const shareContent = `Summary for "${currentSummary.videoTitle}":\n\n${currentSummary.summaryText}\n\nOriginal Video: ${currentSummary.videoUrl}`;
    
    await shareText(shareContent, 'Share Summary');
  };
  
  // Handle edit
  const handleEdit = () => {
    if (!currentSummary) return;
    
    navigation.navigate('EditSummary', { summaryId: currentSummary._id });
  };
  
  // Handle delete
  const handleDelete = () => {
    if (!currentSummary) return;
    
    Alert.alert(
      'Delete Summary',
      'Are you sure you want to delete this summary?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteSummary(currentSummary._id);
              setCurrentSummary(null);
            } catch (error) {
              console.error('Error deleting summary:', error);
            }
          }
        }
      ]
    );
  };
  
  // Handle paste from clipboard
  const handlePaste = async () => {
    try {
      const text = await Clipboard.getStringAsync();
      if (text) {
        setUrl(text);
      }
    } catch (error) {
      console.error('Error pasting from clipboard:', error);
    }
  };
  
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Surface style={styles.headerContainer}>
        <Ionicons 
          name="logo-youtube" 
          size={40} 
          color={theme.colors.error} 
          style={styles.logo}
        />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          YouTube Video Summarizer
        </Text>
      </Surface>
      
      <Surface style={styles.inputContainer}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Enter YouTube URL
        </Text>
        
        <YouTubeUrlInput
          value={url}
          onChangeText={setUrl}
          onSubmit={handleSubmit}
          loading={loading}
        />
        
        <SummaryOptions
          summaryType={summaryType}
          setSummaryType={setSummaryType}
          summaryLength={summaryLength}
          setSummaryLength={setSummaryLength}
          disabled={loading}
        />
      </Surface>
      
      {loading && (
        <LoadingIndicator message="Generating summary..." />
      )}
      
      {error && (
        <ErrorMessage
          message={error}
          onRetry={handleSubmit}
          onDismiss={clearError}
        />
      )}
      
      {currentSummary && (
        <View style={styles.summaryContainer}>
          <SummaryCard
            summary={currentSummary}
            onReadAloud={handleReadAloud}
            onShare={handleShare}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isPlaying={isPlaying}
          />
          
          <Surface style={styles.ttsContainer}>
            <TTSControls
              text={currentSummary.summaryText}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
          </Surface>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  headerContainer: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 2,
  },
  logo: {
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  summaryContainer: {
    marginTop: 16,
  },
  ttsContainer: {
    borderRadius: 8,
    marginTop: 16,
    elevation: 2,
  },
});

export default HomeScreen;
