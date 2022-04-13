const express = require('express')
const { exec } = require("child_process");
var os = require('node-os-utils');

const app = express()
const port = 3030

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/usage', (req, res) => {
    getUsage(res)
})

async function getUsage(res) {
    
    var cpu = os.cpu
    

    cpu.usage()
        .then(cpu => {
            os.mem.used()
                .then(info => {
                    let percentage = Number((info.usedMemMb*100)/ info.totalMemMb).toFixed(2)
                    
                    let response = {
                        cpu: `${cpu}`,
                        memory: `${percentage}`
                    }
                    res.send(response);
                })
            
        })

    

}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
