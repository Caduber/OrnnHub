function geraHist(data)
{

    let color = ""

    if(data.win)
    {
        color = "win"
    }
    if(data.win == false)
    {
         color = "lose"
    }

    let damagePerGold = ((data.damage * 1000) / data.gold).toFixed(2)
    let damagePerDeath = (data.damageTaken / data.deaths).toFixed(2)

    if (damagePerDeath == "Infinity") {
        damagePerDeath = data.damageTaken;
    }

    hero = document.getElementById("hero").innerHTML
    hero +=`<div class="game ${color}">
            <img class="i" src="https://opgg-static.akamaized.net/meta/images/lol/15.6.1/champion/${data.champ}.png"" alt="icone do personagem">
            <div class="skills">
                <table>
                    <tr>
                        <th>
                            <img id="q" src="https://cdn.communitydragon.org/latest/champion/${data.champId}/ability-icon/q" alt="q do personagem">
                            <label id="q-lbl" for="q">${data.q} vezes</label>
                        </th>
                        <th>
                            <img id="w" src="https://cdn.communitydragon.org/latest/champion/${data.champId}/ability-icon/w" alt="w do personagem">
                            <label id="w-lbl" for="w">${data.w} vezes</label>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <img id="e" src="https://cdn.communitydragon.org/latest/champion/${data.champId}/ability-icon/e" alt="e do personagem">
                            <label id="e-lbl" for="e">${data.e} vezes</label>
                        </th>
                        <th>
                            <img id="r" src="https://cdn.communitydragon.org/latest/champion/${data.champId}/ability-icon/r " alt="r do personagem">
                            <label id="r-lbl" for="r">${data.r} vezes</label>
                        </th>
                    </tr>
                </table>
            </div>
            <div class="metrics">

                <table>
                    <tr>
                        <th>
                            <img class="metric-icon" src="https://raw.communitydragon.org/latest/game/assets/challenges/config/101102/tokens/challenger.png" alt="icone de defesa">
                            <span>${damagePerDeath} DANO/MORTE</span>
                        </th>
                    </tr>
                    <tr>
                        <th>
                            <img class="metric-icon" src="https://raw.communitydragon.org/latest/game/assets/challenges/config/203301/tokens/challenger.png" alt="icone de ataque">
                            <span>${damagePerGold} DANO/1K OURO</span>
                        </th>
                    </tr>
                </table>
            </div>
            <div class="statistics">
                <p>${(data.damagePercent * 100).toFixed(2)}% DANO DO TIME</p>
                <p>${data.damage} DANO CAUSADO</p>
                <p>${data.damageTaken} DANO RECEBIDO</p>
                <p>${data.gold} OURO GASTO</p>
            </div>
        </div>`


        return hero;
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
        data = await response.json()

        //console.log(data)

        if(data.erro != "erro")
        {
            document.getElementById("hero").innerHTML = `<h1 id="icon"><img src="https://raw.communitydragon.org/latest/game/assets/ux/summonericons/profileicon${data[0].icon}.png" alt="icone">${data[0].nome}</h1>`

            for (let i = 0; i < data.length; i++) {
                document.getElementById("hero").innerHTML = geraHist(data[i])
            }
        }if(data.erro == "erro")
        {
            window.alert("invocador n encontrado")
        }
    }catch(err)
    {
        console.error(err)
    }
})

async function loadPage()
{

}