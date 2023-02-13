const TimeStamp = () => {
  const currentTime = new Date();
  const currentOffset = currentTime.getTimezoneOffset();
  const ISTOffset = 330;
  const ISTTime = new Date(
    currentTime.getTime() + (ISTOffset + currentOffset) * 60000
  );
  const timestamp = `${ISTTime.getDate()}/${
    ISTTime.getMonth() + 1
  }/${ISTTime.getFullYear()} ${ISTTime.getHours()}:${ISTTime.getMinutes()}:${ISTTime.getSeconds()}:${ISTTime.getMilliseconds()}`;

  return timestamp;
};

export default TimeStamp;
