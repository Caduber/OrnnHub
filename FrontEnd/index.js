let q = document.getElementById("q")
let w = document.getElementById("w")
let e = document.getElementById("e")
let r = document.getElementById("r")
let i = document.getElementById("i")
let icon = document.getElementById("icon")

function dravenize()
{
    document.getElementById("q").src="https://raw.communitydragon.org/latest/game/assets/characters/draven/hud/icons2d/draven_passive.png"
    document.getElementById("w").src="https://raw.communitydragon.org/latest/game/assets/characters/draven/hud/icons2d/draven_passive.png"
    document.getElementById("e").src="https://raw.communitydragon.org/latest/game/assets/characters/draven/hud/icons2d/draven_passive.png"
    document.getElementById("r").src="https://raw.communitydragon.org/latest/game/assets/characters/draven/hud/icons2d/draven_passive.png"
}

document.getElementById("btn-pesquisa").addEventListener("click", async function(event)
{
    event.preventDefault()

    let nome = document.getElementById("nome").value
    let tag = document.getElementById("tag").value
    let payload = {"nome": nome, "tag": tag}
    //console.log(JSON.stringify(payload))

    try
    {
        let response = await fetch("http://localhost:3000/", {method: "POST", headers:{'Accept': 'application/json','Content-Type': 'application/json'}, body: JSON.stringify(payload)}) //sem o headers, o express fica perdido e fica retornando {}
        let data = await response.json()
        //iconText.innerHTML = `${data.nome}`
        icon.innerHTML = `<img id="icon" src="https://raw.communitydragon.org/latest/game/assets/ux/summonericons/profileicon${data.icon}.png" alt="icone">${data.nome}`
        i.src = `https://opgg-static.akamaized.net/meta/images/lol/15.6.1/champion/${data.champ}.png`
        q.src = `https://opgg-static.akamaized.net/meta/images/lol/15.6.1/spell/${data.champ}Q.png`
        w.src = `https://opgg-static.akamaized.net/meta/images/lol/15.6.1/spell/${data.champ}W.png`
        e.src = `https://opgg-static.akamaized.net/meta/images/lol/15.6.1/spell/${data.champ}E.png`
        r.src = `https://opgg-static.akamaized.net/meta/images/lol/15.6.1/spell/${data.champ}R.png`
        // = `https://opgg-static.akamaized.net/meta/images/lol/15.6.1/champion/${data.champ}.png`
    }catch(err)
    {
        console.error(err)
    }
})