// Paslėpti vardai pagal skaičius
const hiddenNames = {
    1: "Sandra",
    2: "Raimonda",
    3: "Stanislovas",
    4: "Darius",
    5: "Ramune",
    6: "Andrius"
};

// Čia saugosime jau panaudotus numerius
let usedNumbers = JSON.parse(localStorage.getItem("usedNumbers")) || [];

function getHiddenName(number) {
    if (usedNumbers.includes(number)) {
        return "Šis numeris jau panaudotas!";
    }

    usedNumbers.push(number);
    localStorage.setItem("usedNumbers", JSON.stringify(usedNumbers));

    return hiddenNames[number];
}
