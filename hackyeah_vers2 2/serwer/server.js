const express = require('express');
const cors = require('cors');
const { spawn, exec } = require('child_process')

const app = express();
const port = 2137;

app.use(cors())
app.use(express.json())

app.post('/chatgpt', (req, res) => {
    console.log('got query');
    res.set({'content-type': 'application/json; charset=utf-8'})

    const {education_status, future_plans, hobby, about_me} = req.body;

    const query = `Podaj mi 1 szkołę spośród podanej listy szkół na podstawie mojego profilu. Odpowiadaj jedynie poprzez nazwę szkół, (teraz wpisz /),  kierunkiem, który mam wybrać i maksymalnie 20-wyrazowym wytłumaczeniem wyboru. Mój profil jest taki: W przyszłości chcę się zajmować: ${future_plans}. Hobby: ${hobby}. Moje oceny: ${education_status}. Dodatkowe informacje: ${about_me}. Pamiętaj, żeby zwracać się na ty`;

    console.log('running python');
    console.log(query);

    let cmd = "";
    if (process.platform === "win32") { 
        cmd += "cmd /c chcp 65001>nul && "; 
    };
    cmd += `python3 chatgpt.py "${query}"`
    
    child = exec(cmd, (err, stdout, stderr) => {
        console.log(stdout);
        console.log(stderr);
        res.send({answer: stdout, err: err});
    })
})

app.listen(port, err => {
  if (err) {
    console.log(err);
    return process.exit(1);
  }
  console.log(`Server is running on ${port}`);
});