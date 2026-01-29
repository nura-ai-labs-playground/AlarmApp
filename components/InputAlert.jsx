import { Modal, View, TextInput, Button } from 'react-native';
import React from 'react';

export default function InputAlert({ visible, text, setText, onSubmit, onClose }) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={{ flex:1, justifyContent:'center', backgroundColor:'rgba(0,0,0,0.4)' }}>
        <View style={{ backgroundColor:'#fff', padding:20, margin:40, borderRadius:10 }}>
          <TextInput
            placeholder="Alarm label"
            value={text}
            style={{borderWidth:1,margin:10}}
            onChangeText={setText}
             // 🔥 smooth keyboard
          />
          <Button title="OK" onPress={onSubmit} />
        </View>
      </View>
    </Modal>
  );
}
