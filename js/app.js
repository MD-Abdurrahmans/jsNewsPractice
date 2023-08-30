

const handleNewsLoad = async () => {


    const newsServer = await fetch("https://openapi.programming-hero.com/api/news/categories")
    const newsDataJson = await newsServer.json();


    const newsCategory = newsDataJson.data.news_category;

    const categoryContainer = document.getElementById('news-container-category');

    newsCategory.slice(0, 7).forEach(res => {

        // console.log(res)
        const div = document.createElement('div');


        div.innerHTML = `
       
       <a   onclick="handleCategory('${res.category_id}')"  class="tab tab-bordered">${res.category_name}</a> 


       `

        categoryContainer.appendChild(div);





    })






}


// handle category

const handleCategory = async (categoryId) => {

    const cardContainer = document.getElementById('cardContainer');

    cardContainer.innerHTML ='';
    const newsCardServer = await fetch(`https://openapi.programming-hero.com/api/news/category/${categoryId}`)

    const newsCardJson = await newsCardServer.json();

    const newsData = newsCardJson.data;



    newsData.forEach(res => {


 console.log(res)


 const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
        const div = document.createElement('div');

        div.innerHTML = `
  
  <div class="flex flex-col overflow-hidden rounded-lg shadow-lg">
  <div class="flex-shrink-0">
  <img class="object-cover w-full h-48"
   src="${res.image_url}">
  </div>
  <div class="flex flex-col justify-between flex-1 p-6 bg-white">
    <div class="flex-1">
      <a href="#" class="block mt-2">

       <div class='flex justify-between'>
       <p class="text-xl font-semibold text-neutral-600">${res.title.slice(0,30)}</p>


       <div>
        <button class='btn bg-rose-600 text-white'>${res?.rating.badge || 'not Found'}</button>
       </div>
       
       </div>

        <p class="mt-3 text-base text-gray-500">${res.details.slice(0,180)}</p>
      </a>
    </div>

    <div class ='flex justify-between  items-center ' >
    
    <div class="flex items-center mt-6">
    <div class="flex-shrink-0">
      <a href="https://twitter.com/Mike_Andreuzza">
        <span class="sr-only">Michael Andreuzza</span>
        <img class="w-10 h-10 rounded-full" src="${res.thumbnail_url} alt="">
      </a>
    </div>

    <div class="ml-3">
      <p class="text-sm font-medium text-neutral-600">
        <a href="https://twitter.com/Mike_Andreuzza" class="hover:underline">${res?.author.name || 'uknown'}</a>
      </p>
      <div class="flex space-x-1 text-sm text-gray-500">
        <time datetime="2020-03-16">  ${res?.author?.published_date || 'Not Written'}</time>
       
      
      </div>
    </div>

  </div>

    
     <div>
     
     <button onclick='modalDetailsLoad("${res._id}")'  class='btn bg-emerald-700 text-white'>Details</button>
     </div>
    
    </div>

  </div>
</div>


  `
        cardContainer.appendChild(div);


    })





}



const modalDetailsLoad = async (itemId)=>{


    console.log(itemId)

    const modal= document.getElementById('modalContainer');

    const itemServer = await fetch(` https://openapi.programming-hero.com/api/news/${itemId}`)
 const itemJson = await itemServer.json();
 const dataDetails=itemJson.data[0];


 modal.innerHTML=`
 
 
 <div class="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-24 max-w-7xl">
 <div class="grid grid-cols-1">
   <div class="w-full max-w-lg mx-auto my-4 bg-white shadow-xl rounded-xl">
     <img alt="team" class="flex-shrink-0 object-cover object-center w-16 h-16 mx-auto -mt-8 rounded-full shadow-xl aboslute" src="${dataDetails.thumbnail_url}">

     <div class="p-6 lg:text-center">
       <span class="mb-8 text-xs font-semibold tracking-widest text-blue-600 uppercase"> Info</span>
       <h4 class="mt-8 text-2xl font-semibold leading-none tracking-tighter text-neutral-600 lg:text-3xl">${dataDetails?.author?.name}</h4>
       <p class="mt-3 text-base leading-relaxed text-gray-500">description: ${dataDetails.details
       }</p>

       <div class="rating">
       <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
       <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400"  />
       <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
       <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" checked/>
       <input type="radio" name="rating-2" class="mask mask-star-2 bg-orange-400" />
        <spa class='font-bold text-base pl-1 ' > ${dataDetails.rating.number        }</span>
        <spa class='font-bold text-base pl-1 ' > <i class="fa-solid fa-eye space-x-1 "></i>  ${dataDetails.total_view}</span>
     </div>


           
    <div class="modal-action">
    <!-- if there is a button in form, it will close the modal -->
    <button class="btn">Close</button>
  </div>
     
     </div>
   </div>
 </div>
</div>

 `





 modalDetails.showModal();



}

handleCategory('01')

handleNewsLoad()