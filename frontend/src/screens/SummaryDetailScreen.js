import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert, Linking } from 'react-native';
import { Surface, useTheme, IconButton, Menu } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import SummaryCard from '../components/SummaryCard';
import TTSControls from '../components/TTSControls';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';

import useSummaryStore from '../store/summaryStore';
import ttsService from '../services/ttsService';
import { copyToClipboard, shareText } from '../utils/helpers';

const SummaryDetailScreen = ({ route, navigation }) => {
  const { summaryId } = route.params;
  const theme = useTheme();
  
  const { 
    currentSummary, 
    fetchSummaryById, 
    loading, 
    error, 
    clearError,
    deleteSummary
  } = useSummaryStore();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  
  // Fetch summary on component mount
  useEffect(() => {
    fetchSummaryById(summaryId);
    
    // Add menu button to header
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerRight}>
          <Menu
            visible={menuVisible}
            onDismiss={() => setMenuVisible(false)}
            anchor={
              <IconButton
                icon="dots-vertical"
                size={24}
                onPress={() => setMenuVisible(true)}
              />
            }
          >
            <Menu.Item
              onPress={() => {
                setMenuVisible(false);
                handleOpenVideo();
              }}
              title="Open Video"
              leadingIcon="youtube"
            />
            <Menu.Item
              onPress={() => {
                setMenuVisible(false);
                handleCopyLink();
              }}
              title="Copy Video Link"
              leadingIcon="content-copy"
            />
          </Menu>
        </View>
      ),
    });
    
    // Stop TTS when component unmounts
    return () => {
      if (isPlaying) {
        ttsService.stop();
      }
    };
  }, [summaryId, navigation, menuVisible, isPlaying]);
  
  // Handle read aloud
  const handleReadAloud = () => {
    if (!currentSummary) return;
    
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
              navigation.goBack();
            } catch (error) {
              console.error('Error deleting summary:', error);
            }
          }
        }
      ]
    );
  };
  
  // Handle open video
  const handleOpenVideo = async () => {
    if (!currentSummary) return;
    
    try {
      await Linking.openURL(currentSummary.videoUrl);
    } catch (error) {
      console.error('Error opening video:', error);
      Alert.alert('Error', 'Could not open the video link');
    }
  };
  
  // Handle copy link
  const handleCopyLink = async () => {
    if (!currentSummary) return;
    
    const success = await copyToClipboard(currentSummary.videoUrl);
    if (success) {
      Alert.alert('Success', 'Video link copied to clipboard');
    } else {
      Alert.alert('Error', 'Could not copy the video link');
    }
  };
  
  if (loading) {
    return <LoadingIndicator message="Loading summary..." />;
  }
  
  if (error) {
    return (
      <ErrorMessage
        message={error}
        onRetry={() => fetchSummaryById(summaryId)}
        onDismiss={clearError}
      />
    );
  }
  
  if (!currentSummary) {
    return (
      <ErrorMessage
        message="Summary not found"
        onDismiss={() => navigation.goBack()}
      />
    );
  }
  
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
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
  headerRight: {
    marginRight: 8,
  },
  ttsContainer: {
    borderRadius: 8,
    marginTop: 16,
    elevation: 2,
  },
});

export default SummaryDetailScreen;
