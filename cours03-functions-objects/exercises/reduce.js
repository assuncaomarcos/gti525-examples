const transactions = [
    {amount: 200},
    {amount: -50},
    {amount: 300},
    {amount: -75}
];

const totalBalance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);

console.log(`Solde total : ${totalBalance >= 0 ? '+' : '-'}${Math.abs(totalBalance)}`);
