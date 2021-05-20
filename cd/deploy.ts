import env from "dotenv"
env.config()

import { NodeSSH } from "node-ssh"

const ssh = new NodeSSH()

const deploy = async () => {
    if (process.env.PORT) {
        await ssh.connect({
            host: process.env.HOST,
            username: process.env.ID,
            password: process.env.PW,
            port: process.env.PORT
        })
    }
    else {
        await ssh.connect({
            host: process.env.HOST,
            username: process.env.ID,
            password: process.env.PW
        })
    }
    const check2 = await ssh.execCommand(`
        cd ci-cd-template && 
        git pull
    `)
    console.log(check2)
    process.exit(0)
}

deploy()