
function removeActiveClass(){
    const activeButtons = document.getElementsByClassName("active");
    for(let btn of activeButtons){
        btn.classList.remove("active");
    }
}

function  loadCards(){
    fetch("https://openapi.programming-hero.com/api/level/5")
    .then((response)=>response.json())
    .then((data)=>displayCards(data.data))
}

function loadCategories(){
    // fetch the data
    fetch("https://openapi.programming-hero.com/api/levels/all")
    //convert  promise  to json
    .then((res)=>res.json())
    //send data to disply
    .then((data)=>displayCategories(data.data));
}

const loadCategoryCards = (id) => {
    
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    console.log(url);
    
    fetch(url)
    .then((res)=>res.json())
    .then((data)=>{
        removeActiveClass();
        const clickedButton = document.getElementById(`btn-${id}`);
        clickedButton.classList.add("active");
        console.log(clickedButton);
        displayCards(data.data);
    });
};

const loadCardDetails = (cardId) => {
    console.log(cardId);
    const url = `https://openapi.programming-hero.com/api/word/${cardId}`;
    fetch(url)
    .then((res)=> res.json())
    .then((data)=> displayCardsDetails(data))
}

const displayCardsDetails = (data) => {
    console.log(data);
    document.getElementById("modal_details").showModal();
    const detailsContainer = document.getElementById("details-container");

    // Handle synonyms - Convert array into buttons
    let synonymsHTML = "";
    if (data.data.synonyms && Array.isArray(data.data.synonyms) && data.data.synonyms.length > 0) {
        synonymsHTML = data.data.synonyms
            .map(
                (synonym) => `
            <button class="p-2 text-lg bg-sky-100 border-2 rounded border-sky-200">${synonym}</button>`)
            .join(""); // Joining all buttons into one string
    } else {
        synonymsHTML = `<p class="text-gray-500">No synonyms available</p>`;
    }

    detailsContainer.innerHTML = `
    <div class="card card-border border-sky-200 border-2 bg-base-100 w-full">
        <div class="card-body">
            <h2 class="card-title text-3xl font-semibold ">${data.data.word}</h2>
            <p class="text-xl">Meaning </p>
            <p class="text-gray-700">${data.data.meaning}</p>
            <h3 class="text-xl">Example</h3>
            <p class="text-gray-700">${data.data.sentence}</p>
            <h3 class="text-lg">সমার্থক শব্দ গুলো</h3>
            <div class="flex flex-wrap gap-2">
                ${synonymsHTML}
            </div>
        </div>
    </div>
    `;
};


// {id: 4, level: 5, word: 'Diligent', meaning: 'পরিশ্রমী', pronunciation: 'ডিলিজেন্ট'}

const displayCards =(cards)=>{
    console.log(cards);
    const cardContainer = document.getElementById('card-container');

    cardContainer.innerHTML=" ";

    if(cards.length==0){
        cardContainer.innerHTML=`
        <div class="bg-gray-100 w-10/12 mx-auto rounded-3xl my-12 text-center space-y-3 col-span-3">
            <div class="flex justify-center items-center">
                <img src="./assets/alert-error.png" alt="">
            </div>
            <p class="text-gray-600">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
            <h1 class="text-xl font-semibold">নেক্সট Lesson এ যান</h1>
        </div>
        `;
        return;
    }

    cards.forEach(card => {
        // console.log(card);

        const cardCard= document.createElement("div");
        cardCard.innerHTML = `
        <div class="card bg-base-100 shadow-sm">
                <div class="card-body text-center ">
                  <h1 class="text-2xl font-bold">${card.word}</h1>
                  <p class="font-semibold mb-2">Meaning /Pronounciation</p>
                  <h1 class="text-lg font-semibold text-gray-700">${card.meaning}</h1>
                  <div class="card-actions justify-between mt-6">
                    <div class="flex justify-between mt-4 w-full">
                        <button onclick="loadCardDetails('${card.id}')" class="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
                            <i class="fa fa-info-circle text-gray-600 text-xl"></i>
                        </button>
                        <button class="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
                            <i class="fa fa-volume-up text-gray-600 text-xl"></i>
                        </button>
                    </div>
                  </div>
                </div>
              </div>
        `;
        //append
        cardContainer.appendChild(cardCard);
    });
}

// {id: 101, level_no: 1, lessonName: 'Basic Vocabulary'}


function displayCategories(categories){
    // console.log(categories);$

    //get the   container
    const  categoryContainer =  document.getElementById('category-container')

    //loop opertion on array of object
    for(let cat of categories){
        // console.log(cat);
        //creat element
        const  categoryDiv=document.createElement("div");
        categoryDiv.innerHTML=`
        <button id="btn-${cat.level_no}" onclick="loadCategoryCards(${cat.level_no})" class="btn btn-outline text-blue-800  hover:bg-blue-800  hover:text-white"><img src="./assets/fa-book-open.png" alt="">Lesson - ${cat.level_no}</button>
        `;
        //append the element
        categoryContainer.append(categoryDiv);
    }
}


loadCategories()
// loadCards()