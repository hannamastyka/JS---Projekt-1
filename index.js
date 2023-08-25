const obliczWydatki = function (pensjaStartowa, wynagrodzenie, okresPracy) {
  let miesiecznyZarobki = pensjaStartowa;
  let liczbaMieciecy = okresPracy;
  let pensja = wynagrodzenie;
  miesiecznyZarobki = okresPracy * liczbaMieciecy;
  return miesiecznyWydatki;
};
let naszPortfel = obliczWydatki(0, 1000, 1);
console.log(naszPortfel);
