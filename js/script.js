
    // books div 
    const booksConatainer = document.getElementById('books-container');

    // search field
        const searchField = document.getElementById('search-field');
        
    // spinner add for  default data loading time

        // const spinner = document.getElementById('spinner');
        // spinner.style.display = 'block';

        //  for screen  default  data  javascript books data load
        // const url = `https://openlibrary.org/search.json?q=javascript`;
        // fetch(url)
        // .then(res => res.json())
        // .then(data => getBooks(data))

    // search button
    const searchButton = document.getElementById('search-field-button');
        
    searchButton.addEventListener('click', () =>{
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'block';
  
    // search field value
    const searchFieldValue = searchField.value;

    // data load
    const url = `https://openlibrary.org/search.json?q=${searchFieldValue}`;
    fetch(url)
    .then(res => res.json())
    .then(data => getBooks(data))

    //    when someone  click search button the default data will not be display 

    booksConatainer.textContent = '';
    const foundBooks = document.getElementById('found-books');
    foundBooks.style.display = 'none';


})


const getBooks = (data) =>{

    const foundBooks = document.getElementById('found-books');

    // how many books found and check, if the book number is zero

    if (parseInt(data.numFound)) {
       
        foundBooks.style.display = 'block';
        const searchResultNum = document.getElementById('found-books');
        console.log(data.numFound)
        searchResultNum.innerText = parseInt(data?.numFound);
    }
         
    else{
        foundBooks.innerText = `No Result Found`;
        foundBooks.style.display = 'block';
    }
    
    

     // serach field value clear

    searchField.value ='';
    booksConatainer.textContent = '';

 
    // get ony by one element from an array 

    data?.docs?.forEach(element => {



    
        //    if image not available or iamge is undefined

        let url;
        if (element?.cover_i) {
             // get image 
             url = `https://covers.openlibrary.org/b/id/${element?.cover_i}-L.jpg`;
   
        }
       
             
   

   
        // subject  undefined checked


        //  let subject;

        //  if (element?.title) {
        
        //     subject = element.title[0] ;
        //  }
        //  else{
        //     subject = '';
        //  }



        //  author name undefined checked


        //  let authorName;
        //  if (element?.author_name === undefined) {

        //     authorName = '';
    
        //  }
        //  else{
        //      authorName = element.author_name[0];
        //  }



        //  publisher name  undefined checked

        //  let publisherName;
        //  if (element?.publisher === undefined) {
        //    publisherName = '';
        //  }
        //  else{
        //      publisherName = element?.publisher[0];
        //  }



       
        

        
            // book div create 
    const bookDiv = document.createElement('div');
    bookDiv.setAttribute('class', 'card');
    bookDiv.setAttribute('style', 'width: 18rem;');
    bookDiv.innerHTML = `  <img  src=${url} class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class='card-title'> Book Name: ${element?.title?element.title:' '}</h5>
      <p class="card-text author-name"> <span class='by'>Author Name:</span> ${element?.author_name?.map(author=>author)}  </p>
      <div class='publish-detail'><p class='publisher'><span class ='publisher-name'>Publisher Name : </span>${element?.publisher?.map(publisher=>publisher)}</p>
      <p class='publish-time'><span class='year'>First Publish : </span>${ element?.first_publish_year?element.first_publish_year : ' '}</p>
     </div>
    </div>`;
    booksConatainer.appendChild(bookDiv);
  
    });

    // spinner display none after data  load completed
    spinner.style.display = 'none';
   

    
}


  