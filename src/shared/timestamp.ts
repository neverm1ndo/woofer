export type RawTimestamp = [string, string, string];

export class Timestamp {
    
    static stamp() {
        const timestamp = this.parse(Date.now());
        return `[${timestamp}]`;
    }
  
    static format(dateof: Date) {
      const [date, month, year] = [
        dateof.getDate(),
        dateof.getMonth() + 1,
        dateof.getFullYear(),
      ];
      return `${year}-${month}-${date}`;
    }
  
    static convert(str: string) {
      const pad = '00';
      return pad.substring(0, pad.length - str.length) + str;
    }

    static getRawTimestampTuple(date: Date): RawTimestamp {
      return [
        date.getUTCHours(),
        date.getMinutes(),
        date.getSeconds()
      ].map((t) => t.toString()) as RawTimestamp;
    }
  
    static parse(time: string | number) {
      const date = new Date(time);
      const [hours, minutes, seconds] = this.getRawTimestampTuple(date);
     
      return `${this.convert(hours)}:${this.convert(minutes)}:${this.convert(seconds)}`;
    }
  
    static parseCD(time: string | number) {
      const date = new Date(time);
      const [, minutes, seconds] = this.getRawTimestampTuple(date);
      return `${this.convert(minutes)}:${this.convert(seconds)}`;
    }
  }
  