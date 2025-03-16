// Scroll to Learn Section
document.getElementById("learn-btn").addEventListener("click", () => {
    document.getElementById("learn-section").scrollIntoView({ behavior: "smooth" });
});

// Scroll to FAQ Section
document.getElementById("faq-btn").addEventListener("click", () => {
    document.getElementById("faq-section").scrollIntoView({ behavior: "smooth" });
});


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

// {id: 4, level: 5, word: 'Diligent', meaning: 'পরিশ্রমী', pronunciation: 'ডিলিজেন্ট'}

const displayCards =(cards)=>{
    // console.log(cards);
    const cardContainer = document.getElementById('card-container');

    cards.forEach(card => {
        // console.log(card);

        const cardCard= document.createElement("div");
        cardCard.innerHTML = `
        <div class="card bg-base-100 shadow-sm">
                <div class="card-body text-center">
                  <h1 class="text-2xl font-bold">${card.word}</h1>
                  <p class="font-semibold mb-2">Meaning /Pronounciation</p>
                  <h1 class="text-lg font-semibold text-gray-700">${card.meaning}</h1>
                  <div class="card-actions justify-between mt-6">
                    <div class="flex justify-between mt-4 w-full">
                        <button class="p-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">
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
        cardContainer.append(cardCard);
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
        <button class="btn btn-outline text-blue-800  hover:bg-blue-800  hover:text-white"><img src="./assets/fa-book-open.png" alt="">Lesson - ${cat.level_no}</button>
        `;
        //append the element
        categoryContainer.append(categoryDiv);
    }
}
loadCategories()
loadCards()