const express = require('express')
const { exec } = require("child_process");

const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/', (req, res) => {
    console.log(req.body)
    // pbcopy("test")
    req.body.command.forEach(element => {
        execCommand(element)    
    });
    res.sendStatus(200)
}) 

app.post('/copy', (req, res) => {
    console.log(req.body)
    pbcopy(req.body.text)
    
    res.sendStatus(200)
}) 

function pbcopy(data) {
    var proc = require('child_process').spawn('pbcopy'); 
    proc.stdin.write(data); proc.stdin.end();
}

function execCommand(command) {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
