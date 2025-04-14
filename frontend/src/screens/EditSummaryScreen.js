import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Surface, Button, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import SummaryOptions from '../components/SummaryOptions';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';

import useSummaryStore from '../store/summaryStore';

const EditSummaryScreen = ({ route, navigation }) => {
  const { summaryId } = route.params;
  const theme = useTheme();
  
  const { 
    currentSummary, 
    fetchSummaryById, 
    updateSummary,
    loading, 
    error, 
    clearError
  } = useSummaryStore();
  
  const [summaryType, setSummaryType] = useState('Brief');
  const [summaryLength, setSummaryLength] = useState('Medium');
  
  // Fetch summary on component mount
  useEffect(() => {
    const loadSummary = async () => {
      try {
        const summary = await fetchSummaryById(summaryId);
        if (summary) {
          setSummaryType(summary.summaryType);
          setSummaryLength(summary.summaryLength);
        }
      } catch (error) {
        console.error('Error fetching summary:', error);
      }
    };
    
    loadSummary();
  }, [summaryId, fetchSummaryById]);
  
  // Handle update
  const handleUpdate = async () => {
    try {
      await updateSummary(summaryId, summaryType, summaryLength);
      Alert.alert(
        'Success',
        'Summary updated successfully',
        [{ text: 'OK', onPress: () => navigation.goBack() }]
      );
    } catch (error) {
      console.error('Error updating summary:', error);
    }
  };
  
  // Handle cancel
  const handleCancel = () => {
    navigation.goBack();
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
      <Surface style={styles.headerContainer}>
        <Ionicons 
          name="create" 
          size={32} 
          color={theme.colors.primary} 
          style={styles.headerIcon}
        />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Edit Summary
        </Text>
      </Surface>
      
      <Surface style={styles.infoContainer}>
        <Text style={[styles.videoTitle, { color: theme.colors.text }]}>
          {currentSummary.videoTitle || 'Untitled Video'}
        </Text>
        <Text style={[styles.videoUrl, { color: theme.colors.text }]}>
          {currentSummary.videoUrl}
        </Text>
      </Surface>
      
      <Surface style={styles.optionsContainer}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Update Summary Options
        </Text>
        
        <Text style={[styles.description, { color: theme.colors.text }]}>
          Changing these options will regenerate the summary with new parameters.
        </Text>
        
        <SummaryOptions
          summaryType={summaryType}
          setSummaryType={setSummaryType}
          summaryLength={summaryLength}
          setSummaryLength={setSummaryLength}
          disabled={loading}
        />
        
        <View style={styles.buttonContainer}>
          <Button
            mode="outlined"
            onPress={handleCancel}
            style={styles.button}
            disabled={loading}
          >
            Cancel
          </Button>
          
          <Button
            mode="contained"
            onPress={handleUpdate}
            style={styles.button}
            loading={loading}
            disabled={loading || (
              summaryType === currentSummary.summaryType && 
              summaryLength === currentSummary.summaryLength
            )}
          >
            Update Summary
          </Button>
        </View>
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
  headerContainer: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
  },
  headerIcon: {
    marginRight: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoContainer: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  videoUrl: {
    fontSize: 14,
    opacity: 0.7,
  },
  optionsContainer: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 8,
  },
});

export default EditSummaryScreen;
