```javascript
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, LogBox } from 'react-native';

const DataFetchSolution = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://randomuser.me/api/?results=20');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setData(json.results);
      } catch (error) {
        setError(error);
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      {isLoading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.name.first}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default DataFetchSolution;
```