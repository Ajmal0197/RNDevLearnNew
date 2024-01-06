import { Platform, PermissionsAndroid, Alert } from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import moment from 'moment';
import DocumentPicker, { types } from 'react-native-document-picker';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import ImageCropPicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs';
import { getSystemVersion } from 'react-native-device-info';
import { Image } from 'react-native-compressor';
import { isAndroid } from './helper';

/**
 * Helper function to download a file with permission handling.
 *
 * @function
 * @example
 * // Example of downloading a PDF file with permission handling
 * const downloadParams = {
 *   url: 'https://example.com/sample.pdf',
 *   fileType: 'pdf',
 *   filename: 'sample',
 * };
 * downloadHelperWithPermission(downloadParams);
 *
 * @param {Object} params - The parameters for the download.
 * @param {string} params.url - The URL of the file to download.
 * @param {string} params.fileType - The file type of the downloaded file (eg: image,pdf,doc,docx ...).
 * @param {string} params.filename - The desired filename of the downloaded file.
 * @throws Will throw an error if storage permission is denied.
 */
const downloadFileWithPermission = async ({ url, fileType, filename = '' }) => {
  if (isAndroid()) {
    const deviceVersion = getSystemVersion();
    let granted = PermissionsAndroid.RESULTS.DENIED;
    if (deviceVersion >= 13) {
      granted = PermissionsAndroid.RESULTS.GRANTED;
    } else {
      granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Storage Permission',
          message: 'App needs access to your storage to download files.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
    }
    if (granted) {
      downloadFile(url, fileType, filename);
    } else {
      Alert.alert('Permission Denied', 'Storage permission is required to download files.');
    }
  } else {
    // Handle permissions for iOS or other platforms if needed
    downloadFile(url, fileType, filename);
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

const downloadFile = (url, fileType, filename) => {
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

    const {
      dirs: { DownloadDir, DocumentDir },
    } = ReactNativeBlobUtil.fs;
    const { config } = ReactNativeBlobUtil;
    const aPath = Platform.select({ ios: DocumentDir, android: DownloadDir });
    const fPath = `${aPath}/${filename}-${moment().format()}.${extension}`;

    const configOptions = Platform.select({
      ios: {
        fileCache: true,
        path: fPath,
        // mime: 'application/xlsx',
        // appendExt: 'xlsx',
        // path: filePath,
        // appendExt: fileExt,
        notification: true,
      },

      android: {
        fileCache: false,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: fPath,
          description: 'Downloading xlsx...',
        },
      },
    });

    if (aPath && fPath) {
      config(configOptions)
        .fetch('GET', url, {})
        .progress((_received, _total) => {
          console.log('ReactNativeBlobUtil PROGRESS: ', _received, _total);
        })
        .then((_res) => {
          alert(JSON.stringify(_res));
          console.log('Success: ', _res, fPath);
        });
    } else {
      throw new Error('Directory not found');
    }
  } catch (error) {
    console.log('ReactNativeBlobUtil ERROR: ', error.message);
    return null;
  }
};

const requestDocumentWithPermission = async () => {
  try {
    if (Platform.OS === 'android') {
      // In android 13 no permission is needed

      const deviceVersion = getSystemVersion();
      let granted = PermissionsAndroid.RESULTS.DENIED;
      if (deviceVersion >= 13) {
        granted = PermissionsAndroid.RESULTS.GRANTED;
      } else {
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );
      }
      if (granted) {
        return pickDocument();
      }
    } else {
      // Handle iOS permissions if needed
      return pickDocument();
    }
  } catch (error) {
    console.log('Error checking/requesting permissions:', error);
    return null;
  }
};

const pickDocument = async () => {
  try {
    const result = await DocumentPicker.pick({
      allowMultiSelection: false,
      type: types.pdf,
    });
    if (result) {
      console.log('Picked document:0', result);

      // Check if the selected file is within the 5 MB limit
      const fileSize = await RNFS.stat(result[0]?.uri);
      const maxSize = 2 * 1024 * 1024; // 2 MB in bytes
      if (fileSize.size > maxSize) {
        Alert.alert('File Size Limit Exceeded', 'Please select a file up to 2 MB.');
      } else {
        // The picked document is available in the 'result' object
        console.log('Picked document:1', result, fileSize);
        return {
          name: result[0]?.name,
          type: result[0]?.type,
          uri: result[0]?.uri,
          size: result[0]?.size,
        };
      }
    }
  } catch (err) {
    if (DocumentPicker.isCancel(err)) {
      // User cancelled the document picker
      console.log('Document picker cancelled by user');
    } else {
      // Handle other errors
      console.log('Error picking document:', err);
    }
    return null;
  }
};

const requestCameraWithPermission = async () => {
  try {
    const cameraPermission = await check(PERMISSIONS.ANDROID.CAMERA);

    if (cameraPermission === RESULTS.GRANTED) {
      console.log('Camera permission already granted');
      return pickImageFromCamera();
    }
    const cameraPermissionResult = await request(PERMISSIONS.ANDROID.CAMERA);

    if (cameraPermissionResult === RESULTS.GRANTED) {
      console.log('Camera permission granted');
      return pickImageFromCamera();
    }
    console.log('Camera permission denied');
  } catch (error) {
    console.log('Error checking/requesting camera permission:', error);
    return null;
  }
};

const requestGalleryWithPermission = async () => {
  try {
    if (Platform.OS === 'android') {
      const deviceVersion = getSystemVersion();
      let granted = PermissionsAndroid.RESULTS.DENIED;
      if (deviceVersion >= 13) {
        granted = PermissionsAndroid.RESULTS.GRANTED;
      } else {
        granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
        );
      }
      if (granted) {
        return pickImageFromGallery();
      }
    } else {
      // On iOS, permissions are typically not required for accessing the photo library
      console.log('iOS platform: No specific permissions required for media library');
      return pickImageFromGallery();
    }
  } catch (error) {
    console.log('Error checking/requesting storage permission:', error);
    return null;
  }
};

const pickImageFromCamera = async () => {
  try {
    const image = await ImageCropPicker.openCamera({
      // width: 300,
      // height: 400,
      cropping: true,
      multiple: false,
      mediaType: 'photo',
    });

    if (image) {
      const maxSize = 2097152; // 2 MB in bytes
      const pathCompressed = await Image.compress(image?.path, {
        // compress image below 2mb
        maxWidth: 1500,
        maxHeight: 1000,
      });
      const imageCompressed = await RNFS.stat(pathCompressed);

      console.log('Picked image from gallery:0', image, imageCompressed);
      if (imageCompressed.size > maxSize) {
        Alert.alert('File Size Limit Exceeded', 'Please select a file up to 2 MB.');
      } else {
        // The picked document is available in the 'result' object

        return {
          name: image?.filename,
          type: image?.mime,
          uri: imageCompressed?.path,
          size: imageCompressed?.size,
        };
      }
    }
  } catch (error) {
    console.log('Error picking image from camera:', error);
    return null;
  }
};

const pickImageFromGallery = async () => {
  try {
    const image = await ImageCropPicker.openPicker({
      // width: 300,
      // height: 400,
      // cropping: true,
      multiple: false,
      mediaType: 'photo',
    });

    if (image) {
      const maxSize = 2097152; // 2 * 1024 * 1024; // 2 MB in bytes
      const pathCompressed = await Image.compress(image?.path, {
        maxWidth: 1500,
        maxHeight: 1000,
      });
      const imageCompressed = await RNFS.stat(pathCompressed);

      console.log('Picked image from gallery:0', image, imageCompressed);
      if (imageCompressed.size > maxSize) {
        Alert.alert('File Size Limit Exceeded', 'Please select a file up to 2 MB.');
      } else {
        // The picked document is available in the 'result' object

        return {
          name: image?.filename,
          type: image?.mime,
          uri: imageCompressed?.path,
          size: imageCompressed?.size,
        };
      }
    }
  } catch (error) {
    console.log('Error picking image from gallery:', error);
    return null;
  }
};

const uploadFileImageOrPdf = async (fileBlob, isFromImagePicker = true) => {
  try {
    const formData = new FormData();
    if (isFromImagePicker) {
      formData.append('file', {
        uri: fileBlob?.path,
        type: fileBlob?.mime,
        name: fileBlob?.filename, // Adjust the filename as needed
      });
    } else {
      formData.append('file', {
        uri: fileBlob[0]?.uri,
        type: fileBlob[0]?.type,
        name: fileBlob[0]?.name, // Adjust the filename as needed
      });
    }

    const response = await fetch('YOUR_API_ENDPOINT', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        // You may need to include additional headers depending on your API requirements
      },
    });

    const responseData = await response.json();
    console.log('File upload response:', responseData);
  } catch (error) {
    console.log('File upload error:', error);
  }
};

export {
  downloadFileWithPermission,
  requestDocumentWithPermission,
  requestCameraWithPermission,
  requestGalleryWithPermission,
};
