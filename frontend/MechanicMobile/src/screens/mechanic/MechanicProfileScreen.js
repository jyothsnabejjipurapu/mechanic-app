import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  Switch,
} from 'react-native';
import { mechanicService } from '../../services/mechanicService';
import { getCurrentLocation } from '../../utils/location';
import { SKILL_TYPE_OPTIONS } from '../../utils/constants';

const MechanicProfileScreen = ({ navigation }) => {
  const [profile, setProfile] = useState({
    skill_type: 'GENERAL_REPAIR',
    availability: true,
    latitude: null,
    longitude: null,
  });
  const [loading, setLoading] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await mechanicService.getProfile();
      setProfile({
        skill_type: data.skill_type || 'GENERAL_REPAIR',
        availability: data.availability !== undefined ? data.availability : true,
        latitude: data.latitude,
        longitude: data.longitude,
      });
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const handleGetLocation = async () => {
    try {
      setLoadingLocation(true);
      const location = await getCurrentLocation();
      setProfile({
        ...profile,
        latitude: location.latitude,
        longitude: location.longitude,
      });
      Alert.alert('Success', 'Location updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to get location. Please enable location services.');
    } finally {
      setLoadingLocation(false);
    }
  };

  const handleSave = async () => {
    if (!profile.latitude || !profile.longitude) {
      Alert.alert('Error', 'Please set your location');
      return;
    }

    setLoading(true);
    try {
      await mechanicService.updateProfile({
        skill_type: profile.skill_type,
        availability: profile.availability,
        latitude: profile.latitude,
        longitude: profile.longitude,
      });
      Alert.alert('Success', 'Profile updated successfully', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.error || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Update Profile</Text>

      <View style={styles.section}>
        <Text style={styles.label}>Skill Type</Text>
        <View style={styles.optionsContainer}>
          {SKILL_TYPE_OPTIONS.map(({ key, label }) => (
            <TouchableOpacity
              key={key}
              style={[
                styles.optionButton,
                profile.skill_type === key && styles.optionButtonSelected,
              ]}
              onPress={() => setProfile({ ...profile, skill_type: key })}
            >
              <Text
                style={[
                  styles.optionText,
                  profile.skill_type === key && styles.optionTextSelected,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.switchContainer}>
          <Text style={styles.label}>Availability</Text>
          <Switch
            value={profile.availability}
            onValueChange={(value) => setProfile({ ...profile, availability: value })}
            trackColor={{ false: '#E5E5EA', true: '#34C759' }}
            thumbColor={profile.availability ? '#fff' : '#f4f3f4'}
          />
        </View>
        <Text style={styles.hint}>
          {profile.availability
            ? 'You are available for new requests'
            : 'You are not available for new requests'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Location</Text>
        <TouchableOpacity
          style={styles.locationButton}
          onPress={handleGetLocation}
          disabled={loadingLocation}
        >
          {loadingLocation ? (
            <ActivityIndicator color="#007AFF" />
          ) : (
            <Text style={styles.locationButtonText}>
              {profile.latitude && profile.longitude
                ? 'Update Location'
                : 'Get Current Location'}
            </Text>
          )}
        </TouchableOpacity>
        {profile.latitude && profile.longitude && (
          <View style={styles.locationInfo}>
            <Text style={styles.locationText}>
              Latitude: {profile.latitude.toFixed(6)}
            </Text>
            <Text style={styles.locationText}>
              Longitude: {profile.longitude.toFixed(6)}
            </Text>
          </View>
        )}
      </View>

      <TouchableOpacity
        style={[styles.saveButton, loading && styles.saveButtonDisabled]}
        onPress={handleSave}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveButtonText}>Save Profile</Text>
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
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#000',
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  optionButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E5E5EA',
    backgroundColor: '#fff',
  },
  optionButtonSelected: {
    borderColor: '#007AFF',
    backgroundColor: '#F0F8FF',
  },
  optionText: {
    fontSize: 14,
    color: '#8E8E93',
  },
  optionTextSelected: {
    color: '#007AFF',
    fontWeight: '600',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  hint: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 5,
  },
  locationButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  locationButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  locationInfo: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  locationText: {
    fontSize: 14,
    color: '#000',
    marginBottom: 5,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  saveButtonDisabled: {
    opacity: 0.6,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default MechanicProfileScreen;

