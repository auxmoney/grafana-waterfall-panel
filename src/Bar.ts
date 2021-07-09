import moment from 'moment'; // eslint-disable-line no-restricted-imports

export class Bar {
  time: moment.Moment;
  endTime: moment.Moment;
  value: moment.Duration;
  name: string;

  constructor(time: number, value: number, name: string, valueUnit: moment.unitOfTime.Base) {
    this.time = moment(time).utc();
    this.value = moment.duration(value, valueUnit);
    this.name = name;
    this.endTime = moment(time).utc().add(this.value);
  }
}
