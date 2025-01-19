```javascript
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';

const DataFetch = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=20')
      .then((response) => response.json())
      .then((json) => setData(json.results))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      {isLoading ? <ActivityIndicator size="large" /> : (
        <FlatList
          data={data}
          keyExtractor={({ email }, index) => email}
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

export default DataFetch;
```