const express = require('express');
const cors = require('cors');
const { spawn, exec } = require('child_process');

const app = express();
const port = 2137;

const PONADPODSTWAOWA_QUERY = "Mój profil jest taki: Moje mocne strony: QUESTION_1; Moje słabe strony: QUESTION_2; Moje hobby: QUESTION_3; Opis mojej idealnej szkoły: QUESTION_4";
const AKADEMICKA_QUERY = "Mój profil jest taki: Czym chcę się zajmować w przyszłości: QUESTION_1; Jakich przedmiotów uczę się najchętniej: QUESTION_2; Wybieram studia dzienne czy zaoczne, dlaczego: QUESTION_3; Jakie dodatkowe aktywności mnie interesują: QUESTION_4";
const POZASZKOLNA_QUERY = "Mój profil jest taki: ";

const SCHOOLS_QUERIES = {
  'akademicka': AKADEMICKA_QUERY,
  'ponadpodstawowa': PONADPODSTWAOWA_QUERY,
  'pozaszkolna': POZASZKOLNA_QUERY
}

app.use(cors())
app.use(express.json())

app.post('/chatgpt', (req, res) => {
    console.log('got query');
    res.set({'content-type': 'application/json; charset=utf-8'})

    const {
      question_1,
      question_2,
      question_3,
      question_4,
      school_type
    } = req.body;

    let cmd = "";
    if (process.platform === "win32") {
        cmd += "cmd /c chcp 65001>nul && ";
    };

    let school_query = SCHOOLS_QUERIES[school_type];
    school_query = school_query.replace('QUESTION_1', question_1);
    school_query = school_query.replace('QUESTION_2', question_2);
    school_query = school_query.replace('QUESTION_3', question_3);
    school_query = school_query.replace('QUESTION_4', question_4);

    cmd += `python3 chatgpt.py ${school_type} data "${school_query}"`
    console.log("looking for school type")

    child = exec(cmd, (err, stdout, stderr) => {
      if (err) res.send({error: stderr});

      result = stdout.toLowerCase();
      if (result === "brak") {
		cmd = `python3 chatgpt.py brak brak ""`;
		return res.send({answer: JSON.stringify({school: 'debil', kierunek: 'debilowaty', explanation: 'no debil i tyle'})})
      }

	console.log(result);

      if (result === "humor") {
	console.log('dupa');
        cmd = 'python3 chatgpt.py humor humor "ok."';
        child2 = exec(cmd, (err, stdout, stderr) => {
          console.log(stdout);
          console.log(stderr);
          return res.send({answer: JSON.stringify({school: "Brak", kierunek: "brak", explanation: stdout}), err: err});
        })
      }
      
      console.log(`got school type: ${result}`)
      const query = `Podaj mi 1 szkołę spośród podanej listy szkół na podstawie mojego profilu. ${school_query}`;
      cmd = `python3 chatgpt.py ${school_type} ${result} "${query} Odpowiedź podaj w formacie JSON, gdzie w polu school bedzie nazwa szkoły, w polu kierunek kierunek który wybrałeś, a w polu explanation krótkie wyjaśnienie dlaczego ta szkoła jest dla mnie odpowiednia (pisz to do mnie, nie w pierwszej osobie)."`

      console.log('looking for school');
      child2 = exec(cmd, (err, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        res.send({answer: stdout, err: err});
      })
    })
})

app.listen(port, err => {
  if (err) {
    console.log(err);
    return process.exit(1);
  }
  console.log(`Server is running on ${port}`);
});
