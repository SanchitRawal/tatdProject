import React, { useState, useRef } from 'react';
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
import { verifyOtp } from '../api/authApi';

type Props = {
  navigation: any;
  route: any;
};

const OtpScreen = ({ navigation, route }: Props) => {
  const { mobile } = route.params;
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputs = useRef<TextInput[]>([]);

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text.replace(/\D/g, '');
    setOtp(newOtp);
    setError('');
    if (text && index < 3) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpStr = otp.join('');
    setError('');
    console.log(otpStr, 'otp str', otpStr.length)
    if (otpStr.length < 4) {
      setError('Please enter the complete 4-digit OTP.');
      return;
    }
    try {
      setLoading(true);
      console.log(mobile, otpStr, 'mobile and otp str')
      const response = await verifyOtp(mobile, otpStr);
      console.log(response, 'otp screeen validation')
      if (response?.status_code == 200) {
        navigation.replace('Dashboard', { mobile });
      } else {
        const msg = response?.message || 'Invalid OTP. Please try again.';
        setError(msg);
        Alert.alert('Verification Failed', msg);
      }
    } catch (err: any) {
      const msg = err.message || 'Verification failed. Please try again.';
      setError(msg);
      Alert.alert('Error', msg);
    } finally {
      setLoading(false);
    }
  };

  const maskedMobile = `+91 XXXXXX${mobile.slice(-4)}`;

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
            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>🔐</Text>
            </View>
            <Text style={styles.title}>Verify OTP</Text>
            <Text style={styles.subtitle}>
              Enter the 4-digit code sent to
            </Text>
            <Text style={styles.mobileText}>{maskedMobile}</Text>
          </View>

          {/* OTP Boxes */}
          <View style={styles.otpRow}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => {
                  if (ref) inputs.current[index] = ref;
                }}
                style={[
                  styles.otpBox,
                  digit ? styles.otpBoxFilled : null,
                  error ? styles.otpBoxError : null,
                ]}
                value={digit}
                onChangeText={text => handleChange(text, index)}
                onKeyPress={e => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
                textAlign="center"
                autoFocus={index === 0}
              />
            ))}
          </View>

          {error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleVerify}
            disabled={loading}
            activeOpacity={0.85}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Verify & Continue</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>← Change Number</Text>
          </TouchableOpacity>
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
  header: { alignItems: 'center', marginBottom: 32 },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#0F3460',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#6C63FF',
  },
  iconText: { fontSize: 32 },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#E2E8F0',
    marginBottom: 8,
  },
  subtitle: { fontSize: 14, color: '#8892b0', textAlign: 'center' },
  mobileText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6C63FF',
    marginTop: 4,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    gap: 12,
  },
  otpBox: {
    flex: 1,
    height: 60,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2D3748',
    backgroundColor: '#0F3460',
    fontSize: 24,
    fontWeight: '700',
    color: '#E2E8F0',
  },
  otpBoxFilled: { borderColor: '#6C63FF' },
  otpBoxError: { borderColor: '#FC5C7D' },
  errorText: {
    color: '#FC5C7D',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
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
  buttonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
  backBtn: { marginTop: 20, alignItems: 'center' },
  backText: { color: '#6C63FF', fontSize: 14, fontWeight: '600' },
});

export default OtpScreen;
