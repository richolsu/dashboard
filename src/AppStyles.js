import { Dimensions, Platform } from 'react-native';
import moment from 'moment';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const _colorSet = {
  mainThemeBackgroundColor: 'white',
  mainThemeForegroundColor: '#3068CC',
  mainTextColor: '#464646',
  mainSubtextColor: '#b6b9bf',
  hairlineColor: '#d6d6d6',  
  whiteColor: 'white',
};

const _fontSet = {
  xxlarge: 40,
  xlarge: 30,
  large: 25,
  middle: 20,
  normal: 16,
  small: 13,
  xsmall: 11,
};

const _sizeSet = {
  buttonWidth: '70%',
  inputWidth: '80%',
  radius: 25,
}

const _iconSet = {
  home: require('../assets/icons/home.png'),
  bars: require('../assets/icons/bars.png'),
  bell: require('../assets/icons/bell.png'),
  feed: require('../assets/icons/feed.png'),
  logo: require('../assets/icons/logo.png'),
  orders: require('../assets/icons/orders.png'),
}

const _iconSizeSet = {
  large: 35,
  normal: 24,
  small: 20,
};

const _styleSet = {
  menuButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    padding: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },

}

const _functions = {
  timeFormat: (timeStamp) => {
    time = "";
    if (timeStamp) {
      if (moment().diff(timeStamp, 'days') == 0) {
        time = moment(timeStamp).format('H:mm');
      } else {
        time = moment(timeStamp).fromNow();
      }
      
    }
    // time = postTime.toUTCString();
    return time;
  }
}


const StyleDict = {
  colorSet: _colorSet,
  iconSet: _iconSet,
  iconSizeSet: _iconSizeSet,
  sizeSet: _sizeSet,
  fontSet: _fontSet,
  styleSet: _styleSet,
  windowW: WINDOW_WIDTH,
  windowH: WINDOW_HEIGHT,
  utils: _functions,
};

export default StyleDict;

