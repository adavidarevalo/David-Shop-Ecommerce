export const reports = [
  {
    text: 'Usuarios que mas compran',
    value: 0,
    type: 'USERS_WHO_BUY_THE_MOST',
  },
  {
    text: 'Productos mas vendidos',
    value: 1,
    type: 'MOST_SELLED_PRODUCTS',
  },
];

export const colors = [
  `255, 99, 132`,
  `54, 162, 235`,
  `255, 206, 86`,
  `75, 192, 192`,
  `153, 102, 255`,
  `255, 159, 64`,
];

export const defaultChartData: any = {
  labels: [],
  datasets: [
    {
      label: '',
      data: [],
      backgroundColor: [],
      borderColor: [],
      borderWidth: 1,
    },
  ],
};
