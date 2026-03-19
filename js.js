const caselle = [];
const casellen = [];
const table = document.getElementById("board");
const accapo = document.createElement("div");
for (let x = 0; x < 90; x++) {
  const div = document.createElement("div");
  const h3 = document.createElement("h3");
  h3.innerText = x + 1;
  div.appendChild(h3);
  div.classList.add("div");
  caselle[x] = div;
  casellen[x] = Number(h3.innerText);
  table.appendChild(div);
}

const Lancio = function (e) {
  const risultato = Math.round(Math.random() * 99);
  console.log("è uscito", risultato);
  console.log(casellen[risultato - 1]);
  let endGame = 0;
  casellen.forEach((n) => {
    endGame += n;
  });
  if (endGame === 9000) {
    endGame = 0;
  } else if (casellen[risultato - 1] != risultato) {
    console.log(risultato, "è già uscito.");
    Lancio();
  } else {
    casellen[risultato - 1] = 100;
    caselle[risultato - 1] = 100;
  }
  console.log(caselle);
  console.log(casellen);
  check(risultato);
};

const check = function (x) {
  const info = document.querySelectorAll(".div h3");
  for (i = 0; i < info.length; i++) {
    if (Number(info[i].innerText) === x) {
      const cell = info[i].parentElement;
      cell.classList.add("crossed");
    }
  }
};
