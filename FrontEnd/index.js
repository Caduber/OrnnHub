function pesquisa()
{
    let nome = document.getElementById("nome").value;
    let tag = document.getElementById("tag").value;

    sessionStorage.setItem("nome", nome);
    sessionStorage.setItem("tag", tag);

    window.location.href = "https://caduber.github.io/OrnnHub/profile.html";
}
