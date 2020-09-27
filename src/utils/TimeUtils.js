export const getFormattedDate = (epochSeconds, monthFormat='long') => {
  const date = new Date(epochSeconds * 1000);
  return date.toLocaleString('default', { month: monthFormat, day: 'numeric'});
};

export const getFormattedTime = epochSeconds => {
  const date = new Date(epochSeconds * 1000);
  return date.toLocaleString('default', { hour: 'numeric', minute: '2-digit'});
};
