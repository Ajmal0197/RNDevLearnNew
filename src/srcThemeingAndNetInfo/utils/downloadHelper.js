import { Platform, PermissionsAndroid, Alert } from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { isAndroid, isIOS } from './helper';

/**
 * Helper function to download a file with permission handling.
 *
 * @function
 * @example
 * // Example of downloading a PDF file with permission handling
 * const downloadParams = {
 *   url: 'https://example.com/sample.pdf',
 *   filename: 'sample',
 *   fileType: 'pdf',
 * };
 * downloadHelperWithPermission(downloadParams);
 *
 * @param {Object} params - The parameters for the download.
 * @param {string} params.url - The URL of the file to download.
 * @param {string} params.filename - The desired filename of the downloaded file.
 * @param {string} params.fileType - The file type of the downloaded file (eg: image,pdf,doc,docx ...).
 * @throws Will throw an error if storage permission is denied.
 */
const downloadFileWithPermission = async ({ url, filename, fileType }) => {
  if (isAndroid()) {
    const granted = await requestStoragePermission();
    if (granted) {
      downloadFile(url, filename, fileType);
    } else {
      Alert.alert('Permission Denied', 'Storage permission is required to download files.');
    }
  } else {
    // Handle permissions for iOS or other platforms if needed
    downloadFile(url, filename, fileType);
  }
};

// Function to request storage permission on Android
const requestStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Storage Permission',
        message: 'App needs access to your storage to download files.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } catch (err) {
    console.error('Error requesting permission:', err);
    return false;
  }
};

const getMimeType = (extension) => {
  switch (extension) {
    case 'pdf':
      return 'application/pdf';
    case 'jpg':
      return 'image/jpeg';
    case 'doc':
      return 'application/msword';
    case 'docx':
      return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
    // Add more cases as needed
    default:
      return 'application/octet-stream'; // Default mime type for unknown file types
  }
};

const downloadFile = (url, filename, fileType) => {
  try {
    let extension = null;
    switch (fileType) {
      case 'image':
        extension = 'jpg';
        break;
      case 'pdf':
        extension = 'pdf';
        break;
      case 'doc':
      case 'docx':
        extension = fileType;
        break;
      default:
        // You can add more cases for different file types
        break;
    }

    if (!extension) {
      throw new Error(`Unsupported file extension: ${fileType}`);
    }

    const { dirs } = ReactNativeBlobUtil.fs;
    const documentDir = dirs?.DocumentDir;
    const path = isIOS() ? dirs.DocumentDir : dirs.DownloadDir;
    const filePath = `${path}/${filename}.${extension}`;
    const configOptions = Platform.select({
      ios: {
        path: filePath,
        notification: true,
      },
      android: {
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: filePath,
          description: 'Downloading...',
          mime: getMimeType(extension),
        },
      },
    });

    if (dirs && documentDir) {
      ReactNativeBlobUtil.config(configOptions)
        .fetch('GET', url, {})
        .progress((_received, _total) => {
          console.log('ReactNativeBlobUtil PROGRESS: ', _received, _total);
        })
        .then((_res) => {
          alert(JSON.stringify(_res));
          console.log('Success: ', _res, filePath);
        });
    } else {
      throw new Error('Directory not found');
    }
  } catch (error) {
    console.log('ReactNativeBlobUtil ERROR: ', error.message);
  }
};

export default downloadFileWithPermission;
