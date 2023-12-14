/* eslint-disable no-alert */
import * as Keychain from 'react-native-keychain';

// Function to check if biometric authentication is supported
const isBiometrySupported = async () => {
  try {
    const biometryType = await Keychain.getSupportedBiometryType();
    console.log('getSupportedBiometryType', biometryType);
    alert(biometryType);
    return !!biometryType;
  } catch (error) {
    console.log('Error checking biometry support:', error.message);
    alert(JSON.stringify(error.message));
    return false;
  }
};

// Function to save credentials with biometric protection
const saveCredentialsWithBiometry = async (username, password) => {
  try {
    await Keychain.setGenericPassword(username, password, {
      accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
      accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
    });
    console.log('Credentials saved successfully with biometry protection in keychain');
    alert(JSON.stringify('Credentials saved successfully with biometry protection in keychain'));
  } catch (error) {
    console.log('Error saving credentials:', error.message);
    // Handle specific errors (e.g., user canceled biometric enrollment)
    if (error.name === 'BiometryEnrollmentCancel') {
      console.log('Biometric enrollment canceled by the user.');
      alert(JSON.stringify('Biometric enrollment canceled by the user.'));
    } else {
      console.log('Unknown error:', error);
      alert(JSON.stringify(error.message));
    }
  }
};

// Function to retrieve credentials with biometric authentication
const getCredentialsWithBiometry = async () => {
  try {
    const credentials = await Keychain.getGenericPassword({
      accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
    });
    return credentials;
  } catch (error) {
    console.log('Error retrieving credentials:', error.message);
    alert(JSON.stringify(error.message));
    // Handle specific errors (e.g., biometric authentication failed)
    if (error.message.includes('authentication failed')) {
      console.log('Biometric authentication failed.');
      alert(JSON.stringify('Biometric authentication failed.'));
    } else {
      console.log('Unknown error:', error);
      alert(JSON.stringify(error));
    }
    return null;
  }
};

// Example usage
const callBiometric = async () => {
  const biometrySupported = await isBiometrySupported();

  if (biometrySupported) {
    // Save credentials with biometric protection
    await saveCredentialsWithBiometry('username', 'password');

    // Retrieve credentials with biometric authentication
    const credentials = await getCredentialsWithBiometry();

    if (credentials) {
      console.log('Username:', credentials.username);
      console.log('Password:', credentials.password);
      alert(JSON.stringify(credentials.username + credentials.password));
    } else {
      console.log('Biometric authentication failed or credentials not found.');
      alert(JSON.stringify('Biometric authentication failed or credentials not found.'));
    }
  } else {
    console.log('Biometry not supported on this device.');
    alert('Biometry not supported on this device.');
  }
};

export default callBiometric;
