const days = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
export default (date: string | Date | number ) => days[new Date(date).getDay()];
