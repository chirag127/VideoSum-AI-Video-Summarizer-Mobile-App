import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button, Slider, useTheme, Menu, Divider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import ttsService from '../services/ttsService';
import useSettingsStore from '../store/settingsStore';

const TTSControls = ({ 
  text, 
  isPlaying, 
  setIsPlaying 
}) => {
  const theme = useTheme();
  const { 
    ttsRate, 
    ttsPitch, 
    ttsVoice, 
    availableVoices,
    setTTSRate, 
    setTTSPitch, 
    setTTSVoice,
    loadVoices
  } = useSettingsStore();
  
  const [voiceMenuVisible, setVoiceMenuVisible] = React.useState(false);
  
  // Load voices on component mount
  React.useEffect(() => {
    loadVoices();
  }, [loadVoices]);
  
  // Handle play/pause
  const togglePlayback = () => {
    if (isPlaying) {
      ttsService.stop();
      setIsPlaying(false);
    } else {
      ttsService.speak(text);
      setIsPlaying(true);
    }
  };
  
  // Handle rate change
  const handleRateChange = (value) => {
    setTTSRate(value);
  };
  
  // Handle pitch change
  const handlePitchChange = (value) => {
    setTTSPitch(value);
  };
  
  // Handle voice selection
  const handleVoiceSelect = (voiceId) => {
    setTTSVoice(voiceId);
    setVoiceMenuVisible(false);
  };
  
  // Format rate label
  const formatRateLabel = (rate) => {
    return `${rate.toFixed(1)}x`;
  };
  
  // Format pitch label
  const formatPitchLabel = (pitch) => {
    if (pitch === 1.0) return 'Normal';
    return pitch < 1.0 ? 'Lower' : 'Higher';
  };
  
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        Text-to-Speech Controls
      </Text>
      
      <View style={styles.controlRow}>
        <Button
          mode="contained"
          onPress={togglePlayback}
          icon={({ size, color }) => (
            <Ionicons 
              name={isPlaying ? "pause" : "play"} 
              size={size} 
              color={color} 
            />
          )}
          style={styles.playButton}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
        
        <Button
          mode="outlined"
          onPress={() => {
            ttsService.stop();
            setIsPlaying(false);
          }}
          icon={({ size, color }) => (
            <Ionicons name="stop" size={size} color={color} />
          )}
          disabled={!isPlaying}
          style={styles.stopButton}
        >
          Stop
        </Button>
      </View>
      
      <View style={styles.sliderContainer}>
        <View style={styles.sliderLabelRow}>
          <Text style={{ color: theme.colors.text }}>Speed: {formatRateLabel(ttsRate)}</Text>
        </View>
        <Slider
          value={ttsRate}
          onValueChange={handleRateChange}
          minimumValue={0.5}
          maximumValue={2.0}
          step={0.1}
          minimumTrackTintColor={theme.colors.primary}
          maximumTrackTintColor={theme.colors.outline}
          thumbTintColor={theme.colors.primary}
          style={styles.slider}
        />
      </View>
      
      <View style={styles.sliderContainer}>
        <View style={styles.sliderLabelRow}>
          <Text style={{ color: theme.colors.text }}>Pitch: {formatPitchLabel(ttsPitch)}</Text>
        </View>
        <Slider
          value={ttsPitch}
          onValueChange={handlePitchChange}
          minimumValue={0.5}
          maximumValue={2.0}
          step={0.1}
          minimumTrackTintColor={theme.colors.primary}
          maximumTrackTintColor={theme.colors.outline}
          thumbTintColor={theme.colors.primary}
          style={styles.slider}
        />
      </View>
      
      <View style={styles.voiceSelector}>
        <Text style={{ color: theme.colors.text, marginRight: 10 }}>Voice:</Text>
        <Menu
          visible={voiceMenuVisible}
          onDismiss={() => setVoiceMenuVisible(false)}
          anchor={
            <Button 
              mode="outlined" 
              onPress={() => setVoiceMenuVisible(true)}
              icon="microphone"
            >
              {ttsVoice ? 
                availableVoices.find(v => v.identifier === ttsVoice)?.name || 'Select Voice' : 
                'Default Voice'}
            </Button>
          }
        >
          <Menu.Item 
            onPress={() => handleVoiceSelect(null)} 
            title="Default Voice" 
          />
          <Divider />
          {availableVoices.map((voice) => (
            <Menu.Item
              key={voice.identifier}
              onPress={() => handleVoiceSelect(voice.identifier)}
              title={voice.name}
            />
          ))}
        </Menu>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderRadius: 8,
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  controlRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  playButton: {
    flex: 1,
    marginRight: 8,
  },
  stopButton: {
    flex: 1,
    marginLeft: 8,
  },
  sliderContainer: {
    marginBottom: 16,
  },
  sliderLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  slider: {
    height: 40,
  },
  voiceSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
});

export default TTSControls;
