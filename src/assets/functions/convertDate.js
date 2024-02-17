
class CustomFunctions {
  convertDate(date, sep, lng) {
    let newDate = '';
    switch (lng) {
      case 'fr':
        const frSeparatedDateAndTime = date.split(' ');
        const frSplitedDate = frSeparatedDateAndTime[0].split('-');
        newDate = frSplitedDate[2] + '/' + frSplitedDate[1] + '/' + frSplitedDate[0];
        break;
      default:
        const enSeparatedDateAndTime = date.split(' ');
        const enSplitedDate = enSeparatedDateAndTime[0].split('-');
        newDate = enSplitedDate[0] + '-' + enSplitedDate[1] + '-' + enSplitedDate[2];
        break;
    }
    return newDate;
  }
}

export default new CustomFunctions();