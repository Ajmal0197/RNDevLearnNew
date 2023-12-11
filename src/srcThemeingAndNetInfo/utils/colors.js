export const Colors = {
  commonWhite: '#FFFFFF',
  commonBlack: '#000000',
  commonDanger: '#bb2124',
  commonRed: '#FF0000',
};

const light = {
  colors: {
    themeColor: '#FFFFFF',
    white: '#000000',
    sky: '#DE5E69',
    gray: 'gray',
    ...Colors,
  },
};

const dark = {
  colors: {
    themeColor: '#000000',
    white: '#FFFFFF',
    sky: '#831a23',
    gray: 'white',
    ...Colors,
  },
};

export default { light, dark };
