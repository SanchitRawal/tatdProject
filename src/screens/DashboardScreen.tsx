import React, {useEffect} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState, AppDispatch} from '../store';
import {switchLanguage, clearError} from '../store/languageSlice';

type Props = {
  route: any;
};

const DashboardScreen = ({route}: Props) => {
  const {mobile} = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const {language, loading, error} = useSelector(
    (state: RootState) => state.language,
  );

  useEffect(() => {
    if (error) {
      Alert.alert('Language Switch Failed', error, [
        {text: 'OK', onPress: () => dispatch(clearError())},
      ]);
    }
  }, [error, dispatch]);

  const handleToggleLanguage = () => {
    const newLang = language === 'english' ? 'hindi' : 'english';
    dispatch(switchLanguage(newLang));
  };

  const isEnglish = language === 'english';

  return (
    <ScrollView
      style={styles.bg}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <StatusBar barStyle="light-content" backgroundColor="#1A1A2E" />

      {/* Top greeting */}
      <View style={styles.greetingSection}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>
            {mobile.slice(0, 1)}
          </Text>
        </View>
        <Text style={styles.welcomeLabel}>Welcome back,</Text>
        <Text style={styles.mobileText}>+91 {mobile}</Text>
        <View style={styles.roleBadge}>
          <Text style={styles.roleText}>✦ Trusted Driver</Text>
        </View>
      </View>

      {/* Language Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardIcon}>🌐</Text>
          <Text style={styles.cardTitle}>App Language</Text>
        </View>

        <View style={styles.langRow}>
          <View style={styles.langInfo}>
            <Text style={styles.langLabel}>Current Language</Text>
            <Text style={styles.langValue}>
              {isEnglish ? '🇬🇧  English' : '🇮🇳  हिन्दी'}
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.toggleBtn, loading && styles.toggleDisabled]}
            onPress={handleToggleLanguage}
            disabled={loading}
            activeOpacity={0.85}>
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.toggleText}>
                Switch to {isEnglish ? 'Hindi' : 'English'}
              </Text>
            )}
          </TouchableOpacity>
        </View>

        {/* Toggle indicator */}
        <View style={styles.toggleTrack}>
          <View
            style={[
              styles.toggleThumb,
              !isEnglish && styles.toggleThumbRight,
            ]}
          />
          <Text
            style={[styles.trackLabel, styles.trackLabelLeft, isEnglish && styles.trackLabelActive]}>
            EN
          </Text>
          <Text
            style={[styles.trackLabel, styles.trackLabelRight, !isEnglish && styles.trackLabelActive]}>
            HI
          </Text>
        </View>
      </View>

      {/* Info Card */}
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>📋 Account Info</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoKey}>Mobile</Text>
          <Text style={styles.infoVal}>+91 {mobile}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoKey}>User Type</Text>
          <Text style={styles.infoVal}>Driver</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoKey}>App Version</Text>
          <Text style={styles.infoVal}>2.37</Text>
        </View>
        <View style={[styles.infoRow, {borderBottomWidth: 0}]}>
          <Text style={styles.infoKey}>Language</Text>
          <Text style={styles.infoVal}>
            {isEnglish ? 'English' : 'Hindi'}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  bg: {flex: 1, backgroundColor: '#1A1A2E'},
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#1A1A2E',
  },
  greetingSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6C63FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#6C63FF',
    shadowOffset: {width: 0, height: 6},
    shadowOpacity: 0.5,
    shadowRadius: 14,
    elevation: 10,
  },
  avatarText: {fontSize: 36, fontWeight: '800', color: '#fff'},
  welcomeLabel: {fontSize: 15, color: '#8892b0', marginBottom: 4},
  mobileText: {fontSize: 22, fontWeight: '700', color: '#E2E8F0', marginBottom: 10},
  roleBadge: {
    paddingHorizontal: 16,
    paddingVertical: 5,
    borderRadius: 20,
    backgroundColor: '#0F3460',
    borderWidth: 1,
    borderColor: '#6C63FF',
  },
  roleText: {fontSize: 12, color: '#6C63FF', fontWeight: '600', letterSpacing: 0.5},

  card: {
    backgroundColor: '#16213E',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  cardHeader: {flexDirection: 'row', alignItems: 'center', marginBottom: 16},
  cardIcon: {fontSize: 22, marginRight: 10},
  cardTitle: {fontSize: 17, fontWeight: '700', color: '#E2E8F0'},
  langRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  langInfo: {},
  langLabel: {fontSize: 12, color: '#8892b0', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 0.5},
  langValue: {fontSize: 18, fontWeight: '700', color: '#E2E8F0'},
  toggleBtn: {
    backgroundColor: '#6C63FF',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    shadowColor: '#6C63FF',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
    minWidth: 120,
    alignItems: 'center',
  },
  toggleDisabled: {opacity: 0.6},
  toggleText: {color: '#fff', fontWeight: '700', fontSize: 13},

  toggleTrack: {
    height: 36,
    backgroundColor: '#0F3460',
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#2D3748',
  },
  toggleThumb: {
    position: 'absolute',
    left: 2,
    width: '50%',
    height: 30,
    backgroundColor: '#6C63FF',
    borderRadius: 15,
    shadowColor: '#6C63FF',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  toggleThumbRight: {left: undefined, right: 2},
  trackLabel: {
    flex: 1,
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '700',
    color: '#4A5568',
    zIndex: 1,
  },
  trackLabelLeft: {},
  trackLabelRight: {},
  trackLabelActive: {color: '#fff'},

  infoCard: {
    backgroundColor: '#16213E',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  infoTitle: {fontSize: 17, fontWeight: '700', color: '#E2E8F0', marginBottom: 16},
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#0F3460',
  },
  infoKey: {fontSize: 14, color: '#8892b0'},
  infoVal: {fontSize: 14, fontWeight: '600', color: '#E2E8F0'},
});

export default DashboardScreen;
