import fs from 'fs'
import config from './app/configs/prepConfig.js'
import path from 'path'

function GenFiles(config){
    console.log(`Generating dummy files: size=${config.size} n_files=${config.n_files} path=${config.path}`)
    fs.mkdirSync(config.path, {recursive:true})
    let data = Array(config.size)
    for (let j = 0; j < config.size; j++){
        data.push("0")
    }
    let str_data = data.join("")
    for (let i = 0; i < config.n_files; i++){
        fs.writeFileSync(path.join(config.path,`${i}.txt`), str_data)
    }
}

console.log("==== Loadbalancer-Appication: Dummy file generator ====");
GenFiles(config.SMALL);
GenFiles(config.LARGE);