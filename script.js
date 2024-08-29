window.addEventListener("load", () => {
    document.querySelector("nav").style.marginTop = "22px";
    setTimeout(() => {
        document.querySelector("nav").style.width = "40%";
    }, 800);

})
let span = document.querySelectorAll(".type span");
function scroll() {
    if (window.scrollY > 150) {
        for (let i = 0; i <= 500; i++) {
            setTimeout(() => {
                span[0].innerHTML = i + "+";
            }, i * 3);
        }
        for (let i = 0; i <= 1000; i++) {
            setTimeout(() => {
                span[1].innerHTML = i + "+";
            }, i * 1);
        }
        for (let i = 0; i <= 200; i++) {
            setTimeout(() => {
                span[2].innerHTML = i + "+";
            }, i * 10);
            window.removeEventListener("scroll", scroll)
        }
    }
}
window.addEventListener("scroll", scroll)
const url = 'https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&tags=under_30_minutes';
const options = {
    method: 'GET',
    headers: {
        'x-rapidapi-key': '6f3d356613msh297728a391c575ap149f05jsnf273894f8b95',
        'x-rapidapi-host': 'tasty.p.rapidapi.com'
    }
};
async function main() {

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result.results;
    } catch (error) {
        console.error(error);
    }
}
(async function recipes() {
    let recipes = await main();
    let swiper=document.querySelector("swiper-container ");
    console.log(swiper);
    console.log(recipes);
    for (const recipy of recipes) {
        let newelement=document.createElement("swiper-slide");
        newelement.innerHTML=`
        <img src=${recipy.thumbnail_url} alt=${recipy.name}></img>
        `
        swiper.appendChild(newelement);
    }
    
})();