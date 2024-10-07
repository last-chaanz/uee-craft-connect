import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import * as DocumentPicker from 'react-native-document-picker';

const ReportGeneration = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filter, setFilter] = useState('');
  const [reportType, setReportType] = useState('');
  const [reportFormat, setReportFormat] = useState('pdf'); // Default format
  const [loading, setLoading] = useState(false); // Loading state

  // Handle report generation
  const handleGenerateReport = async () => {
    if (!startDate || !endDate) {
      Alert.alert('Error', 'Please select both start and end dates.');
      return;
    }

    // Check if end date is after start date
    if (new Date(endDate) < new Date(startDate)) {
      Alert.alert('Error', 'End date must be after start date.');
      return;
    }

    setLoading(true); // Set loading to true

    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf, DocumentPicker.types.xlsx], // Allow both PDF and Excel formats
      });
      console.log('Report Generated and Downloaded:', res.uri);
      showSuccessToast();
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('Report download cancelled');
      } else {
        console.error('Error generating report:', err);
      }
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const showSuccessToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Report Generated',
      text2: 'Your report was downloaded successfully!',
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Report Generation</Text>
        <Text style={styles.subtitle}>
          Generate detailed reports about sales, orders, and performance metrics.
        </Text>
      </View>

      <View style={styles.datePickerContainer}>
        <Text style={styles.sectionTitle}>Select Date Range</Text>
        <View style={styles.datePickers}>
          <DatePicker
            style={styles.datePicker}
            date={startDate}
            mode="date"
            placeholder="Start Date"
            format="YYYY-MM-DD"
            minDate="2020-01-01"
            maxDate="2030-12-31"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={setStartDate}
          />
          <DatePicker
            style={styles.datePicker}
            date={endDate}
            mode="date"
            placeholder="End Date"
            format="YYYY-MM-DD"
            minDate="2020-01-01"
            maxDate="2030-12-31"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            onDateChange={setEndDate}
          />
        </View>
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.sectionTitle}>Add Filter</Text>
        <TextInput
          style={styles.filterInput}
          placeholder="Filter by product, category, etc."
          value={filter}
          onChangeText={setFilter}
        />
      </View>

      <View style={styles.reportOptionsContainer}>
        <Text style={styles.sectionTitle}>Select Report Type</Text>
        
        <TouchableOpacity 
          style={styles.optionCard} 
          onPress={() => setReportType('Sales Report')}
        >
          <Icon name="bar-chart-outline" size={30} color="#FF6F00" />
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>Sales Report</Text>
            <Text style={styles.optionDescription}>Generate a report for sales over a period of time.</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.optionCard} 
          onPress={() => setReportType('Performance Report')}
        >
          <Icon name="analytics-outline" size={30} color="#FF6F00" />
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>Performance Report</Text>
            <Text style={styles.optionDescription}>Track product and order performance metrics.</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.optionCard} 
          onPress={() => setReportType('Orders Report')}
        >
          <Icon name="receipt-outline" size={30} color="#FF6F00" />
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>Orders Report</Text>
            <Text style={styles.optionDescription}>Generate a detailed report for all processed orders.</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.reportFormatContainer}>
        <Text style={styles.sectionTitle}>Choose Format</Text>
        <View style={styles.formatButtons}>
          <TouchableOpacity 
            style={styles.formatButton} 
            onPress={() => setReportFormat('pdf')}
          >
            <Icon name="document-outline" size={20} color="#FFF" />
            <Text style={styles.formatButtonText}>PDF Format</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.formatButton} 
            onPress={() => setReportFormat('excel')}
          >
            <Icon name="document-text-outline" size={20} color="#FFF" />
            <Text style={styles.formatButtonText}>Excel Format</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.generateButtonContainer}>
        <TouchableOpacity 
          style={styles.generateButton} 
          onPress={handleGenerateReport} 
          disabled={loading} // Disable button while loading
        >
          <Text style={styles.generateButtonText}>
            {loading ? 'Generating...' : 'Generate Report'}
          </Text>
        </TouchableOpacity>
      </View>

      <Toast />
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#f8f8f8',
  },
  header: {
    backgroundColor: '#FF6F00',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
  },
  datePickerContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  datePickers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  datePicker: {
    width: '48%',
  },
  filterContainer: {
    marginBottom: 20,
  },
  filterInput: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    fontSize: 16,
    elevation: 5,
  },
  reportOptionsContainer: {
    marginBottom: 20,
  },
  optionCard: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 5,
  },
  optionTextContainer: {
    marginLeft: 10,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
  },
  reportFormatContainer: {
    marginBottom: 20,
  },
  formatButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  formatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6F00',
    padding: 10,
    borderRadius: 10,
    width: '48%',
  },
  formatButtonText: {
    color: '#FFF',
    marginLeft: 5,
    fontSize: 16,
  },
  generateButtonContainer: {
    alignItems: 'center',
  },
  generateButton: {
    backgroundColor: '#FF6F00',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  generateButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ReportGeneration;
