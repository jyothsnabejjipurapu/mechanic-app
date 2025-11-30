import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { mechanicService } from '../../services/mechanicService';
import { requestService } from '../../services/requestService';
import { getCurrentLocation } from '../../utils/location';
import { BASE_FARE, PER_KM_RATE } from '../../utils/constants';

const CreateRequestScreen = ({ navigation }) => {
  const [issueText, setIssueText] = useState('');
  const [mechanics, setMechanics] = useState([]);
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingMechanics, setLoadingMechanics] = useState(false);

  useEffect(() => {
    getLocationAndMechanics();
  }, []);

  const getLocationAndMechanics = async () => {
    try {
      setLoadingMechanics(true);
      const loc = await getCurrentLocation();
      setLocation(loc);
      
      const nearbyMechanics = await mechanicService.getNearbyMechanics(
        loc.latitude,
        loc.longitude
      );
      setMechanics(nearbyMechanics);
    } catch (error) {
      Alert.alert('Error', 'Failed to get location. Please enable location services.');
      console.error('Location error:', error);
    } finally {
      setLoadingMechanics(false);
    }
  };

  const calculateCost = (distance) => {
    return BASE_FARE + (distance * PER_KM_RATE);
  };

  const handleCreateRequest = async () => {
    if (!issueText.trim()) {
      Alert.alert('Error', 'Please describe the issue');
      return;
    }

    if (!selectedMechanic) {
      Alert.alert('Error', 'Please select a mechanic');
      return;
    }

    if (!location) {
      Alert.alert('Error', 'Location not available');
      return;
    }

    setLoading(true);
    try {
      await requestService.createRequest({
        issue_text: issueText,
        customer_lat: location.latitude,
        customer_lng: location.longitude,
        mechanic_id: selectedMechanic.user.id,
      });
      Alert.alert('Success', 'Service request created successfully', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.error || 'Failed to create request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Create Service Request</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Describe the Issue</Text>
        <TextInput
          style={styles.textArea}
          placeholder="e.g., Flat tyre, Battery dead, Engine overheating..."
          value={issueText}
          onChangeText={setIssueText}
          multiline
          numberOfLines={4}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.label}>Nearby Mechanics</Text>
          <TouchableOpacity onPress={getLocationAndMechanics}>
            <Text style={styles.refreshText}>Refresh</Text>
          </TouchableOpacity>
        </View>

        {loadingMechanics ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : mechanics.length === 0 ? (
          <Text style={styles.emptyText}>No nearby mechanics available</Text>
        ) : (
          mechanics.map((mechanic) => {
            const distance = mechanic.distance_km || 0;
            const estimatedCost = calculateCost(distance);
            const isSelected = selectedMechanic?.id === mechanic.id;

            return (
              <TouchableOpacity
                key={mechanic.id}
                style={[
                  styles.mechanicCard,
                  isSelected && styles.mechanicCardSelected,
                ]}
                onPress={() => setSelectedMechanic(mechanic)}
              >
                <View style={styles.mechanicInfo}>
                  <Text style={styles.mechanicName}>{mechanic.user.name}</Text>
                  <Text style={styles.mechanicSkill}>{mechanic.skill_type}</Text>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.ratingText}>⭐ {mechanic.rating_avg}</Text>
                    <Text style={styles.ratingCount}>
                      ({mechanic.rating_count} reviews)
                    </Text>
                  </View>
                </View>
                <View style={styles.mechanicDetails}>
                  <Text style={styles.distanceText}>
                    {distance.toFixed(2)} km away
                  </Text>
                  <Text style={styles.costText}>₹{estimatedCost.toFixed(2)}</Text>
                  {isSelected && (
                    <View style={styles.selectedBadge}>
                      <Text style={styles.selectedText}>Selected</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })
        )}
      </View>

      <TouchableOpacity
        style={[styles.submitButton, loading && styles.submitButtonDisabled]}
        onPress={handleCreateRequest}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Create Request</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#000',
  },
  section: {
    marginBottom: 30,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#000',
  },
  refreshText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    minHeight: 100,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
  },
  mechanicCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#E5E5EA',
  },
  mechanicCardSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F8FF',
  },
  mechanicInfo: {
    marginBottom: 10,
  },
  mechanicName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  mechanicSkill: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#000',
    marginRight: 5,
  },
  ratingCount: {
    fontSize: 12,
    color: '#8E8E93',
  },
  mechanicDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  distanceText: {
    fontSize: 14,
    color: '#8E8E93',
  },
  costText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  selectedBadge: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  selectedText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: '#8E8E93',
    marginTop: 20,
    fontSize: 16,
  },
});

export default CreateRequestScreen;

