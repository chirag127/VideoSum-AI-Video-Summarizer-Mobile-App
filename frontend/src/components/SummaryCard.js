import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card, Text, Button, Chip, useTheme } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import Markdown from 'react-native-markdown-display';
import { formatDate, extractVideoId, getYouTubeThumbnail, truncateText } from '../utils/helpers';

const SummaryCard = ({ 
  summary, 
  onPress, 
  onReadAloud, 
  onShare, 
  onEdit, 
  onDelete,
  isPlaying = false,
  compact = false
}) => {
  const theme = useTheme();
  
  // Get video thumbnail
  const videoId = extractVideoId(summary.videoUrl);
  const thumbnailUrl = summary.videoThumbnailUrl || getYouTubeThumbnail(videoId);
  
  // Render compact card for history list
  if (compact) {
    return (
      <TouchableOpacity onPress={onPress}>
        <Card style={styles.compactCard}>
          <View style={styles.compactContent}>
            <Image 
              source={{ uri: thumbnailUrl || 'https://via.placeholder.com/120x68' }} 
              style={styles.compactThumbnail}
              resizeMode="cover"
            />
            <View style={styles.compactTextContainer}>
              <Text style={styles.compactTitle} numberOfLines={2}>
                {summary.videoTitle || 'Untitled Video'}
              </Text>
              <Text style={styles.compactDate}>
                {formatDate(summary.createdAt)}
              </Text>
              <View style={styles.compactChips}>
                <Chip 
                  style={styles.miniChip} 
                  textStyle={styles.miniChipText}
                >
                  {summary.summaryType}
                </Chip>
                <Chip 
                  style={styles.miniChip} 
                  textStyle={styles.miniChipText}
                >
                  {summary.summaryLength}
                </Chip>
              </View>
            </View>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
  
  // Render full card for detail view
  return (
    <Card style={styles.card}>
      <Card.Cover 
        source={{ uri: thumbnailUrl || 'https://via.placeholder.com/640x360' }} 
        style={styles.thumbnail}
      />
      
      <Card.Title
        title={summary.videoTitle || 'Untitled Video'}
        subtitle={formatDate(summary.createdAt)}
        titleNumberOfLines={2}
      />
      
      <Card.Content>
        <View style={styles.chipContainer}>
          <Chip style={styles.chip} mode="outlined">
            {summary.summaryType}
          </Chip>
          <Chip style={styles.chip} mode="outlined">
            {summary.summaryLength}
          </Chip>
        </View>
        
        <View style={styles.markdownContainer}>
          <Markdown
            style={{
              body: { color: theme.colors.text },
              heading1: { color: theme.colors.text },
              heading2: { color: theme.colors.text },
              heading3: { color: theme.colors.text },
              heading4: { color: theme.colors.text },
              heading5: { color: theme.colors.text },
              heading6: { color: theme.colors.text },
              paragraph: { color: theme.colors.text },
              list_item: { color: theme.colors.text },
              bullet_list: { color: theme.colors.text },
              ordered_list: { color: theme.colors.text },
              blockquote: { color: theme.colors.text },
              code_block: { backgroundColor: theme.colors.surfaceVariant, color: theme.colors.text },
              code_inline: { backgroundColor: theme.colors.surfaceVariant, color: theme.colors.text },
              link: { color: theme.colors.primary },
              hr: { backgroundColor: theme.colors.outline },
            }}
          >
            {summary.summaryText}
          </Markdown>
        </View>
      </Card.Content>
      
      <Card.Actions style={styles.actions}>
        <Button
          mode={isPlaying ? "contained" : "outlined"}
          onPress={onReadAloud}
          icon={({ size, color }) => (
            <Ionicons 
              name={isPlaying ? "pause" : "volume-high"} 
              size={size} 
              color={color} 
            />
          )}
        >
          {isPlaying ? 'Pause' : 'Read Aloud'}
        </Button>
        
        <Button
          mode="outlined"
          onPress={onShare}
          icon={({ size, color }) => (
            <Ionicons name="share-outline" size={size} color={color} />
          )}
        >
          Share
        </Button>
        
        <Button
          mode="outlined"
          onPress={onEdit}
          icon={({ size, color }) => (
            <Ionicons name="create-outline" size={size} color={color} />
          )}
        >
          Edit
        </Button>
        
        <Button
          mode="outlined"
          onPress={onDelete}
          icon={({ size, color }) => (
            <Ionicons name="trash-outline" size={size} color={color} />
          )}
        >
          Delete
        </Button>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: 10,
    marginHorizontal: 16,
    elevation: 4,
  },
  thumbnail: {
    height: 200,
  },
  chipContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  chip: {
    marginRight: 8,
  },
  markdownContainer: {
    marginTop: 10,
  },
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 8,
  },
  // Compact card styles
  compactCard: {
    marginVertical: 6,
    marginHorizontal: 16,
    elevation: 2,
  },
  compactContent: {
    flexDirection: 'row',
    padding: 8,
  },
  compactThumbnail: {
    width: 120,
    height: 68,
    borderRadius: 4,
  },
  compactTextContainer: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'space-between',
  },
  compactTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  compactDate: {
    fontSize: 12,
    opacity: 0.7,
  },
  compactChips: {
    flexDirection: 'row',
  },
  miniChip: {
    height: 24,
    marginRight: 4,
  },
  miniChipText: {
    fontSize: 10,
  },
});

export default SummaryCard;
