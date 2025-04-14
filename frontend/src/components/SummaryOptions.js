import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, RadioButton, useTheme } from 'react-native-paper';

const SummaryOptions = ({ 
  summaryType, 
  setSummaryType, 
  summaryLength, 
  setSummaryLength,
  disabled = false
}) => {
  const theme = useTheme();
  
  return (
    <View style={styles.container}>
      {/* Summary Type Options */}
      <View style={styles.optionSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Summary Type
        </Text>
        <RadioButton.Group
          onValueChange={value => setSummaryType(value)}
          value={summaryType}
        >
          <View style={styles.optionsRow}>
            <View style={styles.radioOption}>
              <RadioButton.Item
                label="Brief"
                value="Brief"
                disabled={disabled}
                labelStyle={{ color: theme.colors.text }}
              />
            </View>
            <View style={styles.radioOption}>
              <RadioButton.Item
                label="Detailed"
                value="Detailed"
                disabled={disabled}
                labelStyle={{ color: theme.colors.text }}
              />
            </View>
            <View style={styles.radioOption}>
              <RadioButton.Item
                label="Key Point"
                value="Key Point"
                disabled={disabled}
                labelStyle={{ color: theme.colors.text }}
              />
            </View>
          </View>
        </RadioButton.Group>
      </View>
      
      {/* Summary Length Options */}
      <View style={styles.optionSection}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>
          Summary Length
        </Text>
        <RadioButton.Group
          onValueChange={value => setSummaryLength(value)}
          value={summaryLength}
        >
          <View style={styles.optionsRow}>
            <View style={styles.radioOption}>
              <RadioButton.Item
                label="Short"
                value="Short"
                disabled={disabled}
                labelStyle={{ color: theme.colors.text }}
              />
            </View>
            <View style={styles.radioOption}>
              <RadioButton.Item
                label="Medium"
                value="Medium"
                disabled={disabled}
                labelStyle={{ color: theme.colors.text }}
              />
            </View>
            <View style={styles.radioOption}>
              <RadioButton.Item
                label="Long"
                value="Long"
                disabled={disabled}
                labelStyle={{ color: theme.colors.text }}
              />
            </View>
          </View>
        </RadioButton.Group>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  optionSection: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    paddingHorizontal: 10,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  radioOption: {
    flex: 1,
  },
});

export default SummaryOptions;
