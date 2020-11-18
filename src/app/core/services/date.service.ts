export class DateService {
  static getDate(fullDate) {
    let indexOfT = fullDate.indexOf("T");
    let date = fullDate.slice(0, indexOfT);

    return date;
  }

  static getTime(fullDate) {
    let indexOfT = fullDate.indexOf("T");

    let time = fullDate.slice(indexOfT + 1);
    return time;
  }
}
