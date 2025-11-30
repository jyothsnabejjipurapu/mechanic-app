import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import { ratingService } from '../../services/ratingService';

const RateMechanicScreen = ({ route, navigation }) => {
  const { request } = route.params;
  const [stars, setStars] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (stars === 0) {
      Alert.alert('Error', 'Please select a rating');
      return;
    }

    setLoading(true);
    try {
      await ratingService.addRating({
        mechanic_id: request.mechanic.id,
        service_request_id: request.id,
        stars: stars,
        review_text: reviewText,
      });
      Alert.alert('Success', 'Rating submitted successfully', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.error || 'Failed to submit rating');
    } finally {
      setLoading(false);
    }
  };

  const StarButton = ({ value, onPress, filled }) => (
    <TouchableOpacity onPress={() => onPress(value)} style={styles.starButton}>
      <Text style={[styles.star, filled && styles.starFilled]}>⭐</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Rate Mechanic</Text>
      <Text style={styles.subtitle}>How was your service experience?</Text>

      <View style={styles.mechanicInfo}>
        <Text style={styles.mechanicName}>{request.mechanic.name}</Text>
        <Text style={styles.issueText}>Issue: {request.issue_text}</Text>
      </View>

      <View style={styles.ratingSection}>
        <Text style={styles.label}>Rating</Text>
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((value) => (
            <StarButton
              key={value}
              value={value}
              onPress={setStars}
              filled={value <= stars}
            />
          ))}
        </View>
        <Text style={styles.ratingText}>{stars > 0 ? `${stars} out of 5` : ''}</Text>
      </View>

      <View style={styles.reviewSection}>
        <Text style={styles.label}>Review (Optional)</Text>
        <TextInput
          style={styles.textArea}
          placeholder="Share your experience..."
          value={reviewText}
          onChangeText={setReviewText}
          multiline
          numberOfLines={5}
        />
      </View>

      <TouchableOpacity
        style={[styles.submitButton, loading && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitButtonText}>Submit Rating</Text>
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
    marginBottom: 10,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
    marginBottom: 30,
  },
  mechanicInfo: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 30,
  },
  mechanicName: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  issueText: {
    fontSize: 14,
    color: '#8E8E93',
  },
  ratingSection: {
    marginBottom: 30,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#000',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  starButton: {
    padding: 5,
  },
  star: {
    fontSize: 40,
  },
  starFilled: {
    opacity: 1,
  },
  ratingText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  reviewSection: {
    marginBottom: 30,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    minHeight: 120,
    backgroundColor: '#fff',
    textAlignVertical: 'top',
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
});

export default RateMechanicScreen;

