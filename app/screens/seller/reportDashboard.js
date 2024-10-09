import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import Icon from 'react-native-vector-icons/Ionicons';
import { API_BASE_URL } from '@env';

const ReportScreen = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");

  // Fetch report data from API
  const fetchReports = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/reports`);
      if (!response.ok) throw new Error('Failed to fetch reports');
      const data = await response.json();
      setReports(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Filter reports based on search query
  const filteredReports = reports.filter((report) =>
    report.title.toLowerCase().includes(filter.toLowerCase())
  );

  // Prepare data for the LineChart
  const reportData = {
    labels: filteredReports.map(report => report.date), // Assuming each report has a date
    datasets: [
      {
        data: filteredReports.map(report => report.value), // Assuming each report has a numerical value
        strokeWidth: 2,
        color: (opacity = 1) => `rgba(255, 111, 0, ${opacity})`,
      },
    ],
  };

  // Render loading state
  const renderLoading = () => <ActivityIndicator size="large" color="#FF6F00" />;

  // Render error state
  const renderError = () => <Text style={styles.errorText}>{error}</Text>;

  // Render report item
  const renderReportItem = ({ item }) => (
    <View style={styles.reportCard}>
      <Icon name="document-outline" size={30} color="#FF6F00" />
      <View style={styles.reportDetails}>
        <Text style={styles.reportTitle}>{item.title}</Text>
        <Text style={styles.reportDate}>{item.date}</Text>
        <Text style={styles.reportValue}>Value: {item.value}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search reports..."
        value={filter}
        onChangeText={setFilter}
      />

      {/* Line Chart */}
      <View style={styles.chartContainer}>
        <Text style={styles.sectionTitle}>Report Trends</Text>
        <LineChart
          data={reportData}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={{
            backgroundGradientFrom: '#FFF',
            backgroundGradientTo: '#FFF',
            color: (opacity = 1) => `rgba(255, 111, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            strokeWidth: 2,
            propsForDots: {
              r: '4',
              strokeWidth: '2',
              stroke: '#FF6F00',
            },
          }}
          bezier
          style={{ borderRadius: 10 }}
        />
      </View>

      {/* Report List */}
      {loading ? (
        renderLoading()
      ) : error ? (
        renderError()
      ) : (
        <FlatList
          data={filteredReports}
          renderItem={renderReportItem}
          keyExtractor={(item) => item._id.toString()} // Ensure unique key as string
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<Text style={styles.emptyText}>No reports found.</Text>}
        />
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  searchInput: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    fontSize: 16,
    elevation: 3,
  },
  chartContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  reportCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  reportDetails: {
    marginLeft: 10,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  reportDate: {
    fontSize: 14,
    color: '#666',
  },
  reportValue: {
    fontSize: 14,
    color: '#FF6F00',
  },
  listContainer: {
    paddingBottom: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
  },
});

export default ReportScreen;
