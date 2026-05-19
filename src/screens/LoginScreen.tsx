import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { loginDriver } from '../api/authApi';

type Props = {
  navigation: any;
};

const LoginScreen = ({ navigation }: Props) => {
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateMobile = (num: string) => /^\d{10}$/.test(num);

  const handleLogin = async () => {
    setError('');
    if (!validateMobile(mobile)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    try {
      setLoading(true);
      const response = await loginDriver(mobile);
      console.log(response, 'otp for login')
      if (response?.status_code == 200) {
        navigation.navigate('Otp', { mobile });
      } else {
        const msg = response?.message || 'Login failed. Please try again.';
        setError(msg);
        Alert.alert('Login Failed', msg);
      }
    } catch (err: any) {
      const msg = err.message || 'Login failed. Please try again.';
      setError(msg);
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1A2E" />
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled">
        <View style={styles.card}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.logoCircle}>
              <Text style={styles.logoText}>T</Text>
            </View>
            <Text style={styles.appName}>TATD Driver</Text>
            <Text style={styles.tagline}>Trusted Driver Portal</Text>
          </View>

          {/* Form */}
          <Text style={styles.label}>Mobile Number</Text>
          <View style={[styles.inputWrapper, error ? styles.inputError : null]}>
            <Text style={styles.prefix}>+91</Text>
            <TextInput
              style={styles.input}
              value={mobile}
              onChangeText={text => {
                setMobile(text.replace(/\D/g, '').slice(0, 10));
                setError('');
              }}
              placeholder="Enter 10-digit number"
              placeholderTextColor="#8892b0"
              keyboardType="phone-pad"
              maxLength={10}
              autoFocus
            />
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.85}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Send OTP</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.footerNote}>
            An OTP will be sent to your registered mobile number.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: '#1A1A2E' },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#1A1A2E',
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#16213E',
    borderRadius: 24,
    padding: 28,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 8,
  },
  logoText: { fontSize: 32, fontWeight: '800', color: '#fff' },
  appName: { fontSize: 24, fontWeight: '700', color: '#E2E8F0', marginBottom: 4 },
  tagline: { fontSize: 13, color: '#8892b0', letterSpacing: 1 },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#A0AEC0',
    marginBottom: 8,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F3460',
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#2D3748',
    paddingHorizontal: 14,
    marginBottom: 8,
  },
  inputError: { borderColor: '#FC5C7D' },
  prefix: {
    fontSize: 16,
    color: '#6C63FF',
    fontWeight: '700',
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 52,
    fontSize: 17,
    color: '#E2E8F0',
    letterSpacing: 1,
  },
  errorText: {
    color: '#FC5C7D',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 4,
  },
  button: {
    backgroundColor: '#6C63FF',
    borderRadius: 12,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  footerNote: {
    marginTop: 16,
    textAlign: 'center',
    fontSize: 12,
    color: '#4A5568',
  },
});

export default LoginScreen;
