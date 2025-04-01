require('dotenv').config();

let key = process.env.RIOT_API_KEY;

let invocador = 
{
    nome: "",
    tag: "",
    puuid: "",
    isValid: true
}

class GameInfo
{
    constructor(lvl, nome, tag, icon, champId, champ, gold, killPercent, damagePercent, damage, dmgTaken, deaths, q, w, e, r, missing, win)
    {
        this.lvl = lvl,
        this.nome = nome,
        this.tag = tag,
        this.icon = icon,
        this.champId = champId,
        this.champ = champ,
        this.gold = gold,
        this.killPercent = killPercent,
        this.damagePercent = damagePercent,
        this.damage = damage,
        this.damageTaken = dmgTaken,
        this.deaths = deaths,
        this.q = q,
        this.w = w,
        this.e = e,
        this.r = r,
        this.missing = missing,
        this.win = win
    }
}


async function getPuuid(nome, tag)
{
    try
    {
        response = await fetch(`https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${nome}/${tag}?api_key=${key}`);
        let data = await response.json();
        if (data.status)
        {
            invocador.isValid = false;
            console.log(data)
        }
        else
        {
            invocador.isValid = true;
        }
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
        //console.log(data.info.participants[numPlayer]);
        return data.info.participants[numPlayer];
    }catch(err)
    {
        console.error(err)
    }
}

async function handleGameData(data)
{
    let playerGameData = new GameInfo(data.summonerLevel, data.riotIdGameName, data.riotIdTagline, data.profileIcon, data.championId, data.championName, data.goldSpent, data.challenges.killParticipation, data.challenges.teamDamagePercentage, data.totalDamageDealtToChampions, data.totalDamageTaken, data.deaths, data.spell1Casts, data.spell2Casts, data.spell3Casts, data.spell4Casts, data.enemyMissingPings, data.win);
    console.log(playerGameData)
    return playerGameData;
}

async function teste(nome, tag)
{
    invocador.nome = nome;
    invocador.tag = tag;
    invocador.puuid = await getPuuid(invocador.nome, invocador.tag);
    if(invocador.isValid)
    {
        partidas = await getHist(invocador.puuid);
        let conteudo = [];
        for (let i = 0; i < 10; i++) {
            info = await handleGameData(await getGameData(partidas[i], invocador.puuid));
            conteudo[i] = info;
        }
        return conteudo;
    }else
    {
        let conteudo = "erro"
        return conteudo
    }
    

}

module.exports = { getPuuid, getHist, getGameData, handleGameData, teste }