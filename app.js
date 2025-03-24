require('dotenv').config();

let key = process.env.RIOT_API_KEY;

let invocador = 
{
    nome: "",
    tag: "",
    puuid: ""
}

class GameInfo
{
    constructor(lvl, nome, tag, icon, champ, q, w, e, r, missing)
    {
        this.lvl = lvl,
        this.nome = nome,
        this.tag = tag,
        this.icon = icon,
        this.champ = champ,
        this.q = q,
        this.w = w,
        this.e = e,
        this.r = r,
        this.missing = missing
    }
}

//invocador.nome = "T1 Cazeus";
//invocador.tag = "LNA";


async function getPuuid(nome, tag)
{
    try
    {
        response = await fetch(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${nome}/${tag}?api_key=${key}`);
        let data = await response.json();
        
        return data.puuid;
    }catch(err)
    {
        console.error("ERRO: ", err);
    }
}

async function getHist(puuid)
{
    try
    {
        response = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=10&api_key=${key}`)
        data = await response.json();
        return data;
    }catch(err)
    {
        console.error(err)
    }
}

async function getGameData(game, puuid)
{
    let numPlayer = -1
    try
    {
        response = await fetch(`https://americas.api.riotgames.com/lol/match/v5/matches/${game}?api_key=${key}`)
        data = await response.json();
        for (let i = 0; i < data.metadata.participants.length; i++) {
            if(data.metadata.participants[i] == puuid)
            {
                numPlayer = i;
            }
        }
        return data.info.participants[numPlayer];
    }catch(err)
    {
        console.error(err)
    }
}

async function handleGameData(data) //lvl, nome, tag, icon,
{
    let playerGameData = new GameInfo(data.summonerLevel, data.riotIdGameName, data.riotIdTagline, data.profileIcon, data.championName, data.spell1Casts, data.spell2Casts, data.spell3Casts, data.spell4Casts, data.enemyMissingPings);
    return playerGameData;
}

async function teste(nome, tag)
{
    invocador.nome = nome;
    invocador.tag = tag;
    invocador.puuid = await getPuuid(invocador.nome, invocador.tag);
    partidas = await getHist(invocador.puuid);
    //console.log(partidas);
    conteudo = await getGameData(partidas[2], invocador.puuid)
    console.log(conteudo);
    info = await handleGameData(conteudo)
    //console.log(info);
    return info;
}

module.exports = { getPuuid, getHist, getGameData, handleGameData, teste }