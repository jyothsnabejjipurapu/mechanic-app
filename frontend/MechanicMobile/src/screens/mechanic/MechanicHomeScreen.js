import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Alert,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { requestService } from '../../services/requestService';
import { REQUEST_STATUS } from '../../utils/constants';

const MechanicHomeScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      setLoading(true);
      const data = await requestService.getMechanicRequests();
      setRequests(data);
    } catch (error) {
      console.error('Error loading requests:', error);
      Alert.alert('Error', 'Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (requestId) => {
    try {
      await requestService.acceptRequest(requestId);
      Alert.alert('Success', 'Request accepted successfully');
      loadRequests();
    } catch (error) {
      Alert.alert('Error', error.response?.data?.error || 'Failed to accept request');
    }
  };

  const handleComplete = async (requestId) => {
    Alert.alert(
      'Complete Request',
      'Mark this request as completed?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Complete',
          onPress: async () => {
            try {
              await requestService.completeRequest(requestId);
              Alert.alert('Success', 'Request marked as completed');
              loadRequests();
            } catch (error) {
              Alert.alert('Error', error.response?.data?.error || 'Failed to complete request');
            }
          },
        },
      ]
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case REQUEST_STATUS.REQUESTED:
        return '#FF9500';
      case REQUEST_STATUS.ACCEPTED:
        return '#007AFF';
      case REQUEST_STATUS.COMPLETED:
        return '#34C759';
      default:
        return '#8E8E93';
    }
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await logout();
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, {user?.name}</Text>
          <Text style={styles.subtitle}>Manage your service requests</Text>
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={styles.profileButton}
          >
            <Text style={styles.profileButtonText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Service Requests</Text>
      <ScrollView
        style={styles.requestsList}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={loadRequests} />
        }
      >
        {requests.length === 0 ? (
          <Text style={styles.emptyText}>No requests available</Text>
        ) : (
          requests.map((request) => (
            <View key={request.id} style={styles.requestCard}>
              <View style={styles.requestHeader}>
                <Text style={styles.requestId}>Request #{request.id}</Text>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(request.status) },
                  ]}
                >
                  <Text style={styles.statusText}>{request.status}</Text>
                </View>
              </View>
              <Text style={styles.customerName}>Customer: {request.customer.name}</Text>
              <Text style={styles.issueText}>{request.issue_text}</Text>
              <Text style={styles.locationText}>
                Location: {request.customer_lat.toFixed(4)}, {request.customer_lng.toFixed(4)}
              </Text>
              {request.distance_km && (
                <Text style={styles.distanceText}>
                  Distance: {request.distance_km} km
                </Text>
              )}
              {request.estimated_cost && (
                <Text style={styles.costText}>
                  Est. Cost: ₹{request.estimated_cost}
                </Text>
              )}

              {request.status === REQUEST_STATUS.REQUESTED && (
                <TouchableOpacity
                  style={styles.acceptButton}
                  onPress={() => handleAccept(request.id)}
                >
                  <Text style={styles.buttonText}>Accept Request</Text>
                </TouchableOpacity>
              )}

              {request.status === REQUEST_STATUS.ACCEPTED && (
                <TouchableOpacity
                  style={styles.completeButton}
                  onPress={() => handleComplete(request.id)}
                >
                  <Text style={styles.buttonText}>Mark as Completed</Text>
                </TouchableOpacity>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 4,
  },
  headerButtons: {
    flexDirection: 'row',
    marginTop: 15,
    gap: 10,
  },
  profileButton: {
    padding: 8,
    backgroundColor: '#007AFF',
    borderRadius: 6,
    flex: 1,
    alignItems: 'center',
  },
  profileButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  logoutButton: {
    padding: 8,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 15,
    color: '#000',
  },
  requestsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  requestCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  requestHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  requestId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  customerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  issueText: {
    fontSize: 14,
    color: '#000',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 4,
  },
  distanceText: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 4,
  },
  costText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    marginBottom: 10,
    marginTop: 4,
  },
  acceptButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  completeButton: {
    backgroundColor: '#34C759',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  emptyText: {
    textAlign: 'center',
    color: '#8E8E93',
    marginTop: 40,
    fontSize: 16,
  },
});

export default MechanicHomeScreen;

