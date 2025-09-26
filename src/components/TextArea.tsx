import React, { useState } from 'react';
import { TextInput, View, StyleSheet, Text } from 'react-native';

const TextArea = ({placeholder, handleInputChange, value}: {placeholder: string, handleInputChange: any, value: string}) => {
  const [text, setText] = useState('');

  return (
    <View className='w-full'>
      <Text className='font-semibold mb-2 text-lg'>Description</Text>
      <TextInput
        style={styles.textarea}
        placeholder={placeholder}
        multiline={true} // This enables multiline input
        numberOfLines={4} // Optional: Sets an initial number of lines for Android
        onChangeText={handleInputChange}
        value={value}
        textAlignVertical="top" // Optional: Aligns text to the top for Android
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  textarea: {
    height: 100, // You can set a fixed height or use flex-based sizing
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
  },
});

export default TextArea;