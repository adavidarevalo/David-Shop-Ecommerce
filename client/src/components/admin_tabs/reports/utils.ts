import moment from 'moment';

export const formatDate = (from: Date, to: Date) => {
  return {
    from: moment(from).startOf('day').format('YYYY/MM/DD HH:mm:ss').toString(),
    to: moment(to).endOf('day').format('YYYY/MM/DD HH:mm:ss').toString(),
  };
};
