import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { 
  Text, 
  Surface, 
  useTheme, 
  Switch, 
  Divider,
  List,
  Slider,
  Button,
  Menu
} from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

import useSettingsStore from '../store/settingsStore';
import ttsService from '../services/ttsService';

const SettingsScreen = () => {
  const theme = useTheme();
  const { 
    theme: themeMode, 
    toggleTheme,
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
  useEffect(() => {
    loadVoices();
  }, [loadVoices]);
  
  // Format rate label
  const formatRateLabel = (rate) => {
    return `${rate.toFixed(1)}x`;
  };
  
  // Format pitch label
  const formatPitchLabel = (pitch) => {
    if (pitch === 1.0) return 'Normal';
    return pitch < 1.0 ? 'Lower' : 'Higher';
  };
  
  // Handle voice selection
  const handleVoiceSelect = (voiceId) => {
    setTTSVoice(voiceId);
    setVoiceMenuVisible(false);
  };
  
  // Test TTS with current settings
  const testTTS = () => {
    ttsService.speak('This is a test of the text-to-speech settings.');
  };
  
  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Surface style={styles.headerContainer}>
        <Ionicons 
          name="settings" 
          size={32} 
          color={theme.colors.primary} 
          style={styles.headerIcon}
        />
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Settings
        </Text>
      </Surface>
      
      {/* Appearance Settings */}
      <Surface style={styles.sectionContainer}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Appearance
        </Text>
        <Divider style={styles.divider} />
        
        <View style={styles.settingRow}>
          <View style={styles.settingTextContainer}>
            <Text style={[styles.settingTitle, { color: theme.colors.text }]}>
              Dark Mode
            </Text>
            <Text style={[styles.settingDescription, { color: theme.colors.text }]}>
              Switch between light and dark theme
            </Text>
          </View>
          <Switch
            value={themeMode === 'dark'}
            onValueChange={toggleTheme}
            color={theme.colors.primary}
          />
        </View>
      </Surface>
      
      {/* TTS Settings */}
      <Surface style={styles.sectionContainer}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Text-to-Speech
        </Text>
        <Divider style={styles.divider} />
        
        <View style={styles.sliderContainer}>
          <View style={styles.sliderLabelRow}>
            <Text style={[styles.settingTitle, { color: theme.colors.text }]}>
              Speech Rate
            </Text>
            <Text style={[styles.settingValue, { color: theme.colors.primary }]}>
              {formatRateLabel(ttsRate)}
            </Text>
          </View>
          <Text style={[styles.settingDescription, { color: theme.colors.text }]}>
            Adjust how fast the text is spoken
          </Text>
          <Slider
            value={ttsRate}
            onValueChange={setTTSRate}
            minimumValue={0.5}
            maximumValue={2.0}
            step={0.1}
            minimumTrackTintColor={theme.colors.primary}
            maximumTrackTintColor={theme.colors.outline}
            thumbTintColor={theme.colors.primary}
            style={styles.slider}
          />
        </View>
        
        <Divider style={styles.divider} />
        
        <View style={styles.sliderContainer}>
          <View style={styles.sliderLabelRow}>
            <Text style={[styles.settingTitle, { color: theme.colors.text }]}>
              Speech Pitch
            </Text>
            <Text style={[styles.settingValue, { color: theme.colors.primary }]}>
              {formatPitchLabel(ttsPitch)}
            </Text>
          </View>
          <Text style={[styles.settingDescription, { color: theme.colors.text }]}>
            Adjust the pitch of the voice
          </Text>
          <Slider
            value={ttsPitch}
            onValueChange={setTTSPitch}
            minimumValue={0.5}
            maximumValue={2.0}
            step={0.1}
            minimumTrackTintColor={theme.colors.primary}
            maximumTrackTintColor={theme.colors.outline}
            thumbTintColor={theme.colors.primary}
            style={styles.slider}
          />
        </View>
        
        <Divider style={styles.divider} />
        
        <View style={styles.voiceContainer}>
          <Text style={[styles.settingTitle, { color: theme.colors.text }]}>
            Voice Selection
          </Text>
          <Text style={[styles.settingDescription, { color: theme.colors.text }]}>
            Choose a voice for text-to-speech
          </Text>
          
          <View style={styles.voiceSelector}>
            <Menu
              visible={voiceMenuVisible}
              onDismiss={() => setVoiceMenuVisible(false)}
              anchor={
                <Button 
                  mode="outlined" 
                  onPress={() => setVoiceMenuVisible(true)}
                  icon="microphone"
                  style={styles.voiceButton}
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
          
          <Button
            mode="contained"
            onPress={testTTS}
            icon="volume-high"
            style={styles.testButton}
          >
            Test Voice
          </Button>
        </View>
      </Surface>
      
      {/* About Section */}
      <Surface style={styles.sectionContainer}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          About
        </Text>
        <Divider style={styles.divider} />
        
        <List.Item
          title="Version"
          description="1.0.0"
          left={props => <List.Icon {...props} icon="information" />}
        />
        
        <List.Item
          title="Made with"
          description="React Native Expo, Express.js, MongoDB, Gemini AI"
          left={props => <List.Icon {...props} icon="heart" />}
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
  sectionContainer: {
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
  divider: {
    marginVertical: 12,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingDescription: {
    fontSize: 14,
    opacity: 0.7,
    marginTop: 2,
  },
  settingValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sliderContainer: {
    marginVertical: 8,
  },
  sliderLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  slider: {
    height: 40,
    marginTop: 8,
  },
  voiceContainer: {
    marginVertical: 8,
  },
  voiceSelector: {
    marginTop: 12,
  },
  voiceButton: {
    marginBottom: 12,
  },
  testButton: {
    marginTop: 12,
  },
});

export default SettingsScreen;
