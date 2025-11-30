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

const CustomerHomeScreen = ({ navigation }) => {
  const { user, logout } = useAuth();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const data = await requestService.getCustomerRequests();
      setRequests(data);
    } catch (error) {
      console.error('Error loading requests:', error);
    }
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
          <Text style={styles.subtitle}>Need help with your vehicle?</Text>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('CreateRequest')}
      >
        <Text style={styles.createButtonText}>+ Create Service Request</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>My Requests</Text>
      <ScrollView
        style={styles.requestsList}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={loadRequests} />
        }
      >
        {requests.length === 0 ? (
          <Text style={styles.emptyText}>No requests yet. Create your first request!</Text>
        ) : (
          requests.map((request) => (
            <TouchableOpacity
              key={request.id}
              style={styles.requestCard}
              onPress={() => navigation.navigate('RequestDetail', { request })}
            >
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
              <Text style={styles.issueText} numberOfLines={2}>
                {request.issue_text}
              </Text>
              {request.mechanic && (
                <Text style={styles.mechanicText}>
                  Mechanic: {request.mechanic.name}
                </Text>
              )}
              {request.estimated_cost && (
                <Text style={styles.costText}>
                  Est. Cost: ₹{request.estimated_cost}
                </Text>
              )}
              {request.status === REQUEST_STATUS.COMPLETED && (
                <TouchableOpacity
                  style={styles.rateButton}
                  onPress={() => navigation.navigate('RateMechanic', { request })}
                >
                  <Text style={styles.rateButtonText}>Rate Mechanic</Text>
                </TouchableOpacity>
              )}
            </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  logoutButton: {
    padding: 8,
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 14,
    fontWeight: '600',
  },
  createButton: {
    backgroundColor: '#007AFF',
    margin: 20,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
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
  issueText: {
    fontSize: 14,
    color: '#000',
    marginBottom: 8,
  },
  mechanicText: {
    fontSize: 12,
    color: '#8E8E93',
    marginBottom: 4,
  },
  costText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#007AFF',
    marginTop: 4,
  },
  rateButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#34C759',
    borderRadius: 8,
    alignItems: 'center',
  },
  rateButtonText: {
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

export default CustomerHomeScreen;

