// console.log(process.argv)
if(process.argv[2] == "dev"){
    require('dotenv').config({ path: `./configs/environment/dev.env` });
}
else{
    require('dotenv').config({ path: `./configs/environment/prod.env` })
}