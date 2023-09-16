const express = require('express');
const cors = require('cors');
const { spawn, exec } = require('child_process')

const app = express();
const port = 5000;

app.use(cors())
app.use(express.json())

app.post('/chatgpt', (req, res) => {
    console.log('got query');
    res.set({'content-type': 'application/json; charset=utf-8'})

    const {education_status, future_plans, hobby, about_me} = req.body;

    const query = `Aktualny status edukacyjny: ${education_status}. Czym chcesz się zajmować w przyszłości: ${future_plans}. Czy masz jakieś ulubione hobby lub zainteresowania pozanaukowe: ${hobby}. Opisz siebie jak najdokładniej możesz, opowiedz nam o czym zechcesz - im więcej napiszesz, tym dokładniej dobierzemy Ci kierunek: ${about_me}.`;

    console.log('running python');

    let cmd = "";
    if (process.platform === "win32") { 
        cmd += "cmd /c chcp 65001>nul && "; 
    };
    cmd += `py chatgpt.py "${query}"`
    
    child = exec(cmd, (err, stdout, stderr) => {
        console.log(stdout);
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