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
        'x-rapidapi-key': '544727a05dmshe7e455284bae3a8p1520c7jsne7ba47ff870b',
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
    let swiper = document.querySelector("swiper-container ");
    swiper.innerHTML = "";
    for (const recipy of recipes) {
        let newelement = document.createElement("swiper-slide");
        newelement.innerHTML = `
        <img src=${recipy.thumbnail_url} alt=${recipy.name}></img>
        `
        swiper.appendChild(newelement);
        newelement.addEventListener("click", (e) => {
            const newWindow = window.open('', '_blank');
            newWindow.document.write(`
            <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${recipy.name}</title>
    <link rel="stylesheet" href="newpage.css">
</head>

<body>
    <div class="head">
        <div class="image">
            <img src=${recipy.thumbnail_url}
                alt="Recipy Image">
        </div>
        <div class="other">
            <h2>${recipy.name}</h2>
            <div class="other_info">
                <div class="info">
                    <p>Total</p>
                    <span>${recipy.total_time_tier.display_tier}</span>
                </div>
                <div class="info">
                    <p>Calories</p>
                    <span>${recipy.nutrition.calories}</span>
                </div>
                <div class="info">
                    <p>Fat</p>
                    <span>${recipy.nutrition.fat}</span>
                </div>
            </div>
            <div class="description">
            ${recipy.description}
            </div>
        </div>
    </div>
    <section class="ingredients">
        <div class="ingredient">
            <h2>Ingredients</h2>
            <ul class="items-ingredient">
               ${recipy.sections[0].components.map(e => {
                if (e.raw_text=="n/a") {
                    return ""
                }
                else{

                    return `<li style="list-style:ethiopic-halehame">${e.raw_text}</li>`
                }
            }).join('')} 

            </ul>
        </div>
        <div class="nutritions">
            <h2>Nutritions</h2>
            <ul class="items-nutritions">
              ${Object.entries(recipy.nutrition).map(([key, value]) => {
                if (key === 'updated_at') {
                   return " "
                }
                return `<li>${key}: ${value}</li>`;
            }).join('')}
            </ul>
        </div>
    </section>
    <section class="ratings">
        <div class="instructions">
            <h2>Instructions</h2>
            <ul class="item-instruction">
                ${recipy.instructions.map(e=>{
                        return `<li style="list-style:ethiopic-halehame">${e.display_text}</li>`
                }).join("")}
            </ul>
            <div class="user">
                <div class="positive">
                    <span class="emoji">😀</span>
                    <span class="Rating">${recipy.user_ratings.count_positive}</span>
                </div>
                <div class="negative">
                    <span class="emoji">😞</span>
                    <span class="Rating">${recipy.user_ratings.count_negative}</span>
                </div>
            </div>
        </div>
        <div class="userrating">
            <h2>Video</h2>
            <div class="video">
                <video
                    src=${recipy.original_video_url}
                    autoplay controls muted></video>
            </div>
        </div>
    </section>
</body>

</html>
            `);
            newWindow.document.close();
        })
    }

})();