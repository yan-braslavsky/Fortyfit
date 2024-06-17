const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

const primaryColorLight = '#2f95dc';
const secondaryColorLight = '#ffcc00';
const ternaryColorLight = '#ff4081';

const primaryColorDark = '#1f78b4';
const secondaryColorDark = '#ffa500';
const ternaryColorDark = '#ff4081';

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
    border: '#e1e1e1',
    card: '#f8f8f8',
    notification: '#ff3b30',
    primary: primaryColorLight,
    secondary: secondaryColorLight,
    ternary: ternaryColorLight,
    smallText: '#a1a1a1',
    separator : '#eee'
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
    border: '#333',
    card: '#1c1c1c',
    notification: '#ff453a',
    primary: primaryColorDark,
    secondary: secondaryColorDark,
    ternary: ternaryColorDark,
    smallText: '#000',
    separator : "rgba(255,255,255,0.1)"
  },
};
