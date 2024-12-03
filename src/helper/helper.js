import _ from 'lodash';

const typeColors = {
  'Expense': 'rgb(255,99,132)',
  'Savings': '#f9c74f',
  'Investment': 'rgb(54,162,235)',
};

export function getSum(transaction, groupByType = false) {
  console.log("Transactions received in getSum:", transaction); // Debug statement
  let groupedTransactions = _(transaction)
    .groupBy("type")
    .value();
  
  console.log("Grouped Transactions:", groupedTransactions); // Debug statement

  let sum = _(groupedTransactions)
    .map((objs, key) => {
      if (!groupByType) return _.sumBy(objs, 'amount');
      return {
        'type': key,
        'color': typeColors[key] || '#000000', // Use the typeColors map
        'total': _.sumBy(objs, 'amount')
      };
    })
    .value();
  console.log("Sum result:", sum); // Debug statement
  return sum;
}

export function getLabels(transaction) {
  let amountSum = getSum(transaction, true);
  console.log("Amount Sum in getLabels:", amountSum); // Debug statement
  let Total = _.sumBy(amountSum, 'total');
  console.log("Total in getLabels:", Total); // Debug statement
  let percent = _(amountSum)
    .map(objs => _.assign(objs, { percent: (100 * objs.total) / Total }))
    .value();
  console.log("Percent result:", percent); // Debug statement
  return percent;
}

export function chart_Data(transaction, custom) {
  let dataValue = getSum(transaction, true);
  console.log("Data values for chart:", dataValue); // Debug statement
  let bg = _.map(dataValue, 'color'); // Use the colors from the sum
  console.log("Background colors for chart:", bg); // Debug statement

  const config = {
    data: {
      datasets: [{
        data: _.map(dataValue, 'total'),
        backgroundColor: bg,
        hoverOffset: 4,
        borderRadius: 30,
        spacing: 10
      }],
      labels: _.map(dataValue, 'type')  // Adding labels for each type
    },
    options: {
      cutout: 115
    }
  };
  return custom ?? config;
}

export function getTotal(transaction) {
  return _.sum(getSum(transaction));
}
