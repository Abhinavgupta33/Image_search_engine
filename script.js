
const accesskey = "QiN0ieSC7DcxGJ_Ca9qnPyrIQ5-6VReenOYwgHxYJjc";

const searchbar = document.getElementById("search_bar");
const searchtext = document.getElementById("search_text");
const imageresult = document.getElementById("image_result");
const loadmore = document.getElementById("load_more");

let keyword = "";
let page = 1;

async function searchImages(){
    keyword = searchtext.value;
    const url = `https:api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}&per_page=15`;
    const response = await fetch(url);
    const data = await response.json();

    if(page === 1){
        imageresult.innerHTML = "";
    }

    const results = data.results;

     results.map((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.style.cursor = "pointer";
        image.addEventListener("click", async () => {
         try {
            const response_img = await fetch(result.urls.full);
            const file = await response_img.blob();
            const link = document.createElement("a");
            link.href = URL.createObjectURL(file);
            link.download = 'Cosas_Learning_' + new Date().getTime();
            link.click();
         } catch {
            alert("Failed to download the file!");
         }

        });

      imageresult.appendChild(image);
     });
}

loadmore.addEventListener("click", ()=> {    
    page++;
    searchImages();
})

searchbar.addEventListener("submit", (e) => {    
    e.preventDefault();
    page = 1;
    searchImages();
})

window.addEventListener("load", () => {    
    searchtext.value = "Random Images";
    searchImages();
});

