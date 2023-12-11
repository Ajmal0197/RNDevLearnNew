const getBase64OfURLImage = async (url) => await ImgToBase64.getBase64String(url);

const makeCall = (number) => {
  if (number) {
    Linking.openURL(`tel:${number}`);
  }
};

const openURL = (url) => {
  Linking.openURL(url);
};

export { getBase64OfURLImage, makeCall, openURL };
