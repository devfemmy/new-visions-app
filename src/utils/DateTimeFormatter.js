export const Formatter24to12 = (Time) => {
  // Time is date Object

  const DateTime = new Date(Time);

  const options = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const CovertedDateTime = DateTime.toLocaleString('en-US', options);

  return CovertedDateTime;
};

export const FormatterDate = (Time) => {
  return Time.slice(0, 10);
};
