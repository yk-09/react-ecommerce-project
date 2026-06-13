export default function formatCurrency(currency: number): string{

  return ( currency / 100 ).toFixed(2);

}