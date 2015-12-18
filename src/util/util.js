import moment from 'moment';

export default class Util {

  static capitalise(s) {
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  static timeFromNow(date) {
    return moment(date).fromNow()
  }

}