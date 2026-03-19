// rimbocchiamoci le maniche!

// APPUNTAMENTI
// un appuntamento sarà una STRINGA -> "12:00 - Commercialista", "20:30 - Cinema", etc.
// ARRAY DI ARRAY
// [
//   [], [], [], [], [], [], []
//   [], [], [], [], [], [], []
//   [], [], [], [], [], [], []
//   [], [], [], [], [], [], []
//   [], [], []
// ]

// creo la cassettiera, inizialmente vuota
const appointments = [];

// - per prima cosa cercherei di riempire l'H1 con il nome del mese corrente

// ogni volta che apriamo la pagina il browser dovrà capire la data corrente (dal sistema operativo)
// per farlo, creiamo un OGGETTO DI TIPO DATA
const now = new Date(); // stiamo utilizzando una funzione COSTRUTTORE per creare un OGGETTO di tipo DATA (date)
console.log(now.getTime()); // <- ms passati dal 1 gennaio 1970

// creo un ARRAY DI MESI
const monthsInItalian = [
  "Gennaio", // 0
  "Febbraio", // 1
  "Marzo", // 2
  "Aprile", // 3
  "Maggio", // 4
  "Giugno", // 5
  "Luglio", // 6
  "Agosto", // 7
  "Settembre", // 8
  "Ottobre", // 9
  "Novembre", // 10
  "Dicembre", // 11
];

// noi utilizzeremo now per capire IN CHE MESE SIAMO
const calculateCurrentMonthForH1 = function () {
  // riempiamo l'h1 della pagina con il mese corrente
  // per prima cosa recupero un riferimento nell'HTML all'H1 vuoto
  const h1 = document.querySelector("h1"); // prende il primo e anche ultimo h1 // <h1></h1>
  console.log("risultato di getMonth", now.getMonth());
  // getMonth torna l'INDICE del mese corrente in un ipotetico array di 12 mesi
  // l'array l'ho creato! si chiama monthsInItalian
  const currentMonthIndex = now.getMonth(); // 2 nella giornata di lezione, 19 Marzo
  const currentMonth = monthsInItalian[currentMonthIndex]; // 'Marzo'
  h1.innerText = currentMonth; // metto es. 'Marzo' dentro l'h1 -> <h1>Marzo</h1>
};

calculateCurrentMonthForH1();

// ora l'h1 mostrerà SEMPRE il mese giusto, quello in cui si è aperta la pagina!
// - step successivo: dobbiamo creare la GRIGLIA del calendario
// problema: non sappiamo quanti giorni ha il mese corrente (JS non ce lo espone)
// il numero dei giorni del mese corrente equivarrà al numero delle celle da creare
// COME FACCIAMO A TROVARE IL NUMERO GIUSTO DI CELLE DA CREARE?
// -> strategia: andiamo al PRIMO GIORNO del mese successivo, TOGLIAMO 24ore, otteniamo
// l'ULTIMO GIORNO del mese CORRENTE. Il numero del GIORNO di quella data equivale al numero
// dei giorni del mese corrente.

const numberOfDaysInCurrentMonth = function () {
  // calcoliamo ora la data appartenente al PRIMO GIORNO del mese successivo
  // per farlo generiamo un new Date() NEL FUTURO
  // troviamo il mese corrente
  const currentMonthIndex = now.getMonth(); // 2 per marzo
  const currentYear = now.getFullYear(); // 2026
  // ora con queste informazioni posso creare la data nel futuro del PRIMO giorno del mese SUCCESSIVO
  // voglio creare una Date es. -> new Date(2026, 3, 1) // yyyy mm dd -> 1 aprile 2026
  // new Date(currentYear, currentMonthIndex + 1, 1) // questa data troverebbe sempre il PRIMO del MESE SUCCESSIVO
  const lastDayOfTheMonth = new Date(currentYear, currentMonthIndex + 1, 0); // questo è l'ultimo giorno del mese corrente!
  // ho trovato l'ultimo giorno del mese corrente -> è anche lo 0 del mese successivo!
  // ora che ce l'ho estrapolo il NUMERO del giorno -> es. 31 -> questo è il numero delle celle da creare per questo mese
  const numberOfDays = lastDayOfTheMonth.getDate(); // per marzo, 31; per giugno, 30
  return numberOfDays;
};

const numberOfCells = numberOfDaysInCurrentMonth();
// ora ho il numero delle celle da creare, e tra poco nelle righe successive creerò le celle per il calendario
console.log(`il mese corrente, marzo, ha ${numberOfCells} giorni`);

// ora che so quanti giorni ha il mese corrente, posso creare le CELLE del calendario!
// dovrò crearne ${numberOfCells} // 31
const createCalendarCells = function () {
  // in questa funzione andremo ad appendere alla sezione vuota del calendario "numberOfCells" celle
  // prendiamo un riferimento alla section vuota in HTML
  const emptySectionInHTML = document.getElementById("calendar"); // <section></section>
  // per numberOfCells volte...
  for (let i = 0; i < numberOfCells; i++) {
    // qui basta che vada a creare UNA cella, l'operazione verrà ripetuta numberOfCellsVolte (31 x marzo)
    // creiamo una cella
    const dayCell = document.createElement("div"); // <div></div>
    // aggiungo al div vuoto appena creato la classe CSS "day", che lo rende inline-block, dimensionato etc.
    dayCell.classList.add("day"); // la classe day è "preconfezionata" nel CSS -> <div class="day"></div>
    // ora creiamo il contenuto, che avrò il numero del giorno -> dobbiamo creare e inserire un h3
    const dayCellValue = document.createElement("h3"); // <h3></h3>
    // inserisco dentro questo h3 il giorno corrente
    dayCellValue.innerText = i + 1; // ?
    // appendiamo l'h3 al div della cella
    dayCell.appendChild(dayCellValue); // <div class="day"> <h3>1</h3> </div>

    // CHICCA: prima di appendere dayCell al calendario, controlliamo se questa dayCell è proprio quella
    // relativa alla giornata di oggi -> SE lo è, le daremo la classe aggiuntiva "color-epic"
    if (i + 1 === now.getDate()) {
      dayCell.classList.add("color-epic");
    }

    // ultima cosa prima di appendere la cella nella section: la rendiamo CLICCABILE
    // la cella non (ancora) in HTML, non posso sfruttare il metodo a) che Stefano mi aveva detto
    // per aggiungere un event listener (non posso fare "onclick=miaFunzione()")
    // ho bisogno del metodo b), quello via JS!
    dayCell.addEventListener("click", function () {
      console.log("CELLA CLICCATA!", i + 1);

      //   però PRIMA di evidenziare la cella cliccata, mi occupo di DESELEZIONARE celle
      // potenzialemnte già "selected" -> TOLGO TUTTE LE CLASSI SELECTED GIÀ APPLICATE
      const previousSelected = document.querySelector(".day.selected"); // questa, se esiste, è la cella dove PRIMA avevo cliccato!
      console.log("CELLA PRECEDENTEMENTE SELEZIONATA", previousSelected);
      if (previousSelected !== null) {
        // se c'era già una cella selezionata... la deseleziono!
        previousSelected.classList.remove("selected"); // le tolgo il bordo viola
      }
      // voglio EVIDENZIARE la cella cliccata
      dayCell.classList.add("selected");

      // voglio portare il suo numero nella sezione del form in basso a sx
      //   prendiamo un riferimento a quella sezione del form in basso a sx
      const spanWithDay = document.getElementById("newMeetingDay"); // all'inizio ha il titolo provvisorio "click on a day"
      // sovrascrivo il titolo provvisorio
      spanWithDay.innerText = i + 1; // lo sostituisco con l'etichetta della cella
      //   evidenzio ora lo span
      spanWithDay.classList.add("hasDay"); // quando il titolo provvisorio viene sostituito dal numero, lo ingrandisco
      //   invoco la funzione fillAppointmentsList in modo da riempire la lista sottostante con gli appuntamenti della giornata
      // ora MOSTRO la sezione degli appuntamenti se la giornata contiene eventi,
      // altrimenti la NASCONDO
      if (appointments[i].length > 0) {
        // mostro gli appuntamenti
        fillAppointmentsList();
        showAppointments();
      } else {
        hideAppointments();
      }
    });

    // appendo la dayCell alla section del calendario (vuota)
    emptySectionInHTML.appendChild(dayCell);

    // inoltre, per OGNI GIORNO del calendario, creo un "cassetto" nella "cassettiera"
    appointments.push([]); // così ottengo per ogni cella un posticino dove salvarci gli eventi
  }

  // vediamo com'è la nostra cassettiera per gli eventi
  console.log("BANCA DATI", appointments);
};

createCalendarCells();

// ora gestiamo l'interazione con il FORM: il form predispone uno spazio per selezionare il giorno
// (che già si riempie correttamente), per selezionare l'ORA e per scrivere un nome per l'appuntamento
// quello che manca è interagire con il suo evento di submit e inserire la stringa dell'evento
// nel cassettino giusto dell'armadio
const form = document.getElementById("meeting-form");
form.addEventListener("submit", function (e) {
  e.preventDefault(); // fermiamo l'aggiornamento automatico della pagina
  // decidiamo cosa fare quando il form viene inviato
  // 1) raccoglierò i dati del form
  //   prendo prima i riferimenti ai DUE campi input!
  const newMeetingTimeInput = document.getElementById("newMeetingTime"); // input ora
  const newMeetingNameInput = document.getElementById("newMeetingName"); // input nome
  // grazie a loro, posso recuperare il VALORE degli input -> proprietà .value
  const newMeetingTime = newMeetingTimeInput.value; // es. "12:00"
  const newMeetingName = newMeetingNameInput.value; // es. "Pranzo fuori"
  // 2) comporrò la stringa relativa all'evento, es. "12:00 - Pranzo"
  // const appointment = newMeetingTime + " - " + newMeetingName // forma classica
  const appointment = `${newMeetingTime} - ${newMeetingName}`; // forma backticks
  // 3) pusho la stringa nell'arrayino corrispondente al giorno che ho cliccato
  console.log("ECCO L'APPUNTAMENTO", appointment);
  console.log("ora dobbiamo salvarlo nel cassettino giusto...");
  //   come trovo il cassettino giusto? prima, quando ho cliccato la cella, mi sono trasportato in basso
  // a sx il numero corrispondente -> era il numero che appariva nella casella che ho cliccato
  //   recuperiamo intanto questo valore
  const spanWithDay = document.getElementById("newMeetingDay"); // questo è lo SPAN contenente il valore del giorno in basso a sx
  // ora, da questo span, recupero il suo contenuto testuale con innerText
  const meetingDay = spanWithDay.innerText; // es. '31'
  // questo è l'indizio più importante per capire in quale cassettino pushare l'evento
  //   solo che è una stringa, e rappresenta "l'etichetta" del giorno, non la posizione giusta nell'array
  // la posizione giusta nell'array è VALORE-1
  let meetingDayAsNumber = parseInt(meetingDay); // da "31" siamo arrivati a 31
  // ora sottratto 1 per trovare l'indice corretto della cassettiera
  meetingDayAsNumber--; // sottraggo 1
  // ora meetingDayAsNumber è l'indice corretto per l'array di array
  appointments[meetingDayAsNumber].push(appointment);
  //   console.log di verifica
  // console.log di verifica
  console.log("APPOINTMENTS DOPO AGGIUNTA EVENTO", appointments);
  // ora coloriamo la cella nel calendario in cui abbiamo aggiunto un appuntamento
  // su quale cella vado ad aggiungere la classe "dot"? su quella che al momento è "selected"
  //   creiamo uno span vuoto
  const dot = document.createElement("span"); // <span></span>
  dot.classList.add("dot"); // <span class="dot"></span>
  // inserisco questo span nella cella attualmente selected
  const selectedCell = document.querySelector(".selected"); // andrà a cercare la classe selected
  // appendo il dot
  selectedCell.appendChild(dot);

  // già che ci siamo, mostriamo la sezione degli appuntamenti
  // dobbiamo anche riempire la lista degli appuntamenti con gli eventi del giorno
  fillAppointmentsList();
  showAppointments();
  // svuoto il form perchè ho salvato i dati
  form.reset();
});

const fillAppointmentsList = function () {
  // questa funzioncina si occuperà di RIEMPIRE la <ul> al momento vuota nel footer
  // quella che dovrebbe mostrarci gli appuntamenti esistenti
  const list = document.getElementById("appointmentsList");
  // dobbiamo riempirla con gli appuntamenti della giornata
  // quale cassettino devo aprire?
  // prendo dal calendario la cella "selected", tolgo 1 al numero e apro il cassettino corrispondente
  const selectedCell = document.querySelector(".day.selected h3"); // h3 della cella con classe "selected"
  // recupero il valore e tolgo 1, così ottengo il cassettino corretto
  const indiceCassettino = parseInt(selectedCell.innerText) - 1; // il valore dell'h3, es. "31", trasformato in numero e sottratto 1
  // apro il cassettino nell'armadio
  const arrayOfAppointments = appointments[indiceCassettino]; // array di appuntamenti per la giornata selezionata
  console.log("APPUNTAMENTI PER IL GIORNO CLICCATO", arrayOfAppointments);
  //   funziona! ora riempiamo la list con un <li> per ogni evento
  //   ...però prima svuotiamo la lista
  list.innerHTML = "";
  for (let i = 0; i < arrayOfAppointments.length; i++) {
    // per ogni appuntamento della giornata...
    // ...creo un <li>
    const newLi = document.createElement("li");
    newLi.innerText = arrayOfAppointments[i];
    list.appendChild(newLi);
  }
};

// creiamo una piccola funzione che MOSTRA la sezione degli appuntamento del giorno (che di default
// avrebbe display: none)
const showAppointments = function () {
  // devo recuperare dal DOM il div con id "appointments"
  const appointmentsDiv = document.getElementById("appointments");
  appointmentsDiv.style.display = "block";
};

const hideAppointments = function () {
  // questa funzione ri-nasconde la sezione degli appointments se la giornata cliccata NON ha niente
  // da fare vedere (la sua lista di appuntamenti è vuota)
  const appointmentsDiv = document.getElementById("appointments");
  appointmentsDiv.style.display = "none";
};
