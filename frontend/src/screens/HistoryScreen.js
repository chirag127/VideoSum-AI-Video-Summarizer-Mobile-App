import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, RefreshControl } from 'react-native';
import { Text, Surface, useTheme, FAB } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import SummaryCard from '../components/SummaryCard';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';

import useSummaryStore from '../store/summaryStore';

const HistoryScreen = ({ navigation }) => {
  const theme = useTheme();
  const { 
    summaries, 
    loading, 
    error, 
    clearError,
    fetchSummaries,
    setCurrentSummary
  } = useSummaryStore();
  
  const [refreshing, setRefreshing] = useState(false);
  
  // Fetch summaries on component mount
  useEffect(() => {
    fetchSummaries();
  }, [fetchSummaries]);
  
  // Handle refresh
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchSummaries();
    setRefreshing(false);
  };
  
  // Handle summary selection
  const handleSelectSummary = (summary) => {
    setCurrentSummary(summary);
    navigation.navigate('SummaryDetail', { summaryId: summary._id });
  };
  
  // Render empty state
  const renderEmptyState = () => (
    <Surface style={styles.emptyContainer}>
      <Ionicons 
        name="document-text-outline" 
        size={64} 
        color={theme.colors.primary} 
      />
      <Text style={[styles.emptyTitle, { color: theme.colors.text }]}>
        No Summaries Yet
      </Text>
      <Text style={[styles.emptyText, { color: theme.colors.text }]}>
        Generate your first summary by entering a YouTube URL on the Home screen.
      </Text>
    </Surface>
  );
  
  // Render list item
  const renderItem = ({ item }) => (
    <SummaryCard
      summary={item}
      onPress={() => handleSelectSummary(item)}
      compact={true}
    />
  );
  
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Surface style={styles.headerContainer}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Your Summary History
        </Text>
      </Surface>
      
      {loading && !refreshing ? (
        <LoadingIndicator message="Loading summaries..." />
      ) : error ? (
        <ErrorMessage
          message={error}
          onRetry={fetchSummaries}
          onDismiss={clearError}
        />
      ) : (
        <FlatList
          data={summaries}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
          ListEmptyComponent={renderEmptyState}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              colors={[theme.colors.primary]}
              tintColor={theme.colors.primary}
            />
          }
        />
      )}
      
      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    padding: 16,
    borderRadius: 0,
    elevation: 2,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 8,
    paddingBottom: 80, // Space for FAB
  },
  emptyContainer: {
    margin: 16,
    padding: 24,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    textAlign: 'center',
    opacity: 0.7,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default HistoryScreen;
