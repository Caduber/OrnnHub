function pesquisa()
{
    let nome = document.getElementById("nome").value;
    let tag = document.getElementById("tag").value;

    sessionStorage.setItem("nome", nome);
    sessionStorage.setItem("tag", tag);

    window.location.href = "http://localhost:5500/FrontEnd/profile.html";
}
