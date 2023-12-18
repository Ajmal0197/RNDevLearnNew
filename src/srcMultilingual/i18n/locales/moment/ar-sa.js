/* eslint-disable yoda */
/* eslint-disable no-undef */
//! moment.js locale configuration
//! locale : Arabic (Saudi Arabia) [ar-sa]

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' && typeof require === 'function'
    ? factory(require('moment'))
    : typeof define === 'function' && define.amd
    ? define(['moment'], factory)
    : factory(global.moment);
})(this, (moment) => {
  const symbolMap = {
    1: '١',
    2: '٢',
    3: '٣',
    4: '٤',
    5: '٥',
    6: '٦',
    7: '٧',
    8: '٨',
    9: '٩',
    0: '٠',
  };
  const numberMap = {
    '١': '1',
    '٢': '2',
    '٣': '3',
    '٤': '4',
    '٥': '5',
    '٦': '6',
    '٧': '7',
    '٨': '8',
    '٩': '9',
    '٠': '0',
  };

  const arSa = moment.defineLocale('ar-sa', {
    months: 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split('_'),
    monthsShort: 'يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر'.split(
      '_'
    ),
    weekdays: 'الأحد_الإثنين_الثلاثاء_الأربعاء_الخميس_الجمعة_السبت'.split('_'),
    weekdaysShort: 'أحد_إثنين_ثلاثاء_أربعاء_خميس_جمعة_سبت'.split('_'),
    weekdaysMin: 'ح_ن_ث_ر_خ_ج_س'.split('_'),
    weekdaysParseExact: true,
    longDateFormat: {
      LT: 'HH:mm',
      LTS: 'HH:mm:ss',
      L: 'DD/MM/YYYY',
      LL: 'D MMMM YYYY',
      LLL: 'D MMMM YYYY HH:mm',
      LLLL: 'dddd D MMMM YYYY HH:mm',
    },
    meridiemParse: /ص|م/,
    isPM(input) {
      return 'م' === input;
    },
    meridiem(hour, _minute, _isLower) {
      if (hour < 12) {
        return 'ص';
      }
      return 'م';
    },
    calendar: {
      sameDay: '[اليوم على الساعة] LT',
      nextDay: '[غدا على الساعة] LT',
      nextWeek: 'dddd [على الساعة] LT',
      lastDay: '[أمس على الساعة] LT',
      lastWeek: 'dddd [على الساعة] LT',
      sameElse: 'L',
    },
    relativeTime: {
      future: 'في %s',
      past: 'منذ %s',
      s: 'ثوان',
      m: 'دقيقة',
      mm: '%d دقيقة',
      mmm: '%d دقائق',
      h: 'ساعة',
      hh: '%d ساعة',
      hhh: '%d ساعات',
      d: 'يوم',
      dd: '%d أيام',
      ddd: '%d يوم',
      M: 'شهر',
      MM: '%d شهر',
      MMM: '%d أشهر',
      y: 'سنة',
      yy: '%d سنة',
      yyy: '%d سنوات',
    },
    preparse(string) {
      return string.replace(/[١٢٣٤٥٦٧٨٩٠]/g, (match) => numberMap[match]).replace(/،/g, ',');
    },
    postformat(string) {
      return string.replace(/\d/g, (match) => symbolMap[match]).replace(/,/g, '،');
    },
    week: {
      dow: 0, // Sunday is the first day of the week.
      doy: 6, // The week that contains Jan 1st is the first week of the year.
    },
  });

  return arSa;
});
