const simpleGit = require('simple-git');
const { join } =require ('path');

const USER = 'Aiyin5';
const PASS = 'A85600636a';
const REPO = 'github.com/Aiyin5/DiscordBot_Aiyin.git';
const remote = `https://${USER}:${PASS}@${REPO}`;
const target = join(__dirname, 'repos', 'discordBot');
console.log(target);
(async () => {
/*    try{
        await simpleGit().clone(remote, target);
    }
    catch (err){
        console.log(err);
    }*/
})()