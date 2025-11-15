const hiddenNames = {
  1:"Sandra",
  2:"Raimonda",
  3:"Stanislovas",
  4:"Darius",
  5:"Ramune",
  6:"Andrius"
};
let usedNumbers = JSON.parse(localStorage.getItem("usedNumbers")) || [];
function getHiddenName(num){
  if(usedNumbers.includes(num)) return "Šis numeris jau panaudotas!";
  usedNumbers.push(num);
  localStorage.setItem("usedNumbers", JSON.stringify(usedNumbers));
  return hiddenNames[num];
}