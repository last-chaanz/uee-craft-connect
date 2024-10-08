// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import { LineChart } from 'react-native-chart-kit';

// const Chart = ({ data }) => {
//   return (
//     <View style={styles.chartContainer}>
//       <Text style={styles.chartTitle}>Sales Over Time</Text>
//       <LineChart
//         data={data}
//         width={350} // Adjust the width according to your design
//         height={220}
//         chartConfig={{
//           backgroundColor: '#FFF',
//           backgroundGradientFrom: '#FFF',
//           backgroundGradientTo: '#FFF',
//           decimalPlaces: 2, // For formatting the numbers
//           color: (opacity = 1) => `rgba(255, 111, 0, ${opacity})`, // Line color
//           style: {
//             borderRadius: 16, // Rounding corners
//           },
//         }}
//         style={{
//           marginVertical: 8,
//           borderRadius: 16, // Rounding corners
//         }}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   chartContainer: {
//     backgroundColor: '#FFF', // Background color of the chart container
//     borderRadius: 10, // Rounded corners for the container
//     elevation: 5, // Elevation for shadow effect
//     padding: 15, // Padding inside the container
//   },
//   chartTitle: {
//     fontSize: 18, // Font size for the chart title
//     fontWeight: 'bold', // Bold text
//     color: '#333', // Title color
//     marginBottom: 10, // Spacing below the title
//   },
// });

// export default Chart;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const Chart = ({ data }) => {
  return (
    <View style={styles.chartContainer}>
      <Text style={styles.chartTitle}>Sales Over Time</Text>
      <LineChart
        data={data}
        width={350} // Adjust the width according to your design
        height={220}
        chartConfig={{
          backgroundColor: '#FFF',
          backgroundGradientFrom: '#FFF',
          backgroundGradientTo: '#FFF',
          decimalPlaces: 2, // For formatting the numbers
          color: (opacity = 1) => `rgba(255, 111, 0, ${opacity})`, // Line color
          style: {
            borderRadius: 16, // Rounding corners
          },
        }}
        style={{
          marginVertical: 8,
          borderRadius: 16, // Rounding corners
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    backgroundColor: '#FFF', // Background color of the chart container
    borderRadius: 10, // Rounded corners for the container
    elevation: 5, // Elevation for shadow effect
    padding: 15, // Padding inside the container
    marginBottom: 20, // Space below the chart
  },
  chartTitle: {
    fontSize: 18, // Font size for the chart title
    fontWeight: 'bold', // Bold text
    color: '#333', // Title color
    marginBottom: 10, // Spacing below the title
  },
});

export default Chart;

