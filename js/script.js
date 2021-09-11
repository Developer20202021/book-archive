
    // books div 
    const booksConatainer = document.getElementById('books-container');

    // search field
        const searchField = document.getElementById('search-field');
        
    // spinner add for  default data loading time

        const spinner = document.getElementById('spinner');
        spinner.style.display = 'block';

        //  for screen  default  data  javascript books data load
        const url = `https://openlibrary.org/search.json?q=javascript`;
        fetch(url)
        .then(res => res.json())
        .then(data => getBooks(data))

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

    if (data.numFound === 0) {
        foundBooks.innerText = `No Result Found`;
        foundBooks.style.display = 'block';
    }
         
    else{
        foundBooks.style.display = 'block';
        const searchResultNum = document.getElementById('result-found');
        searchResultNum.innerText = data.numFound;
    }
    
    

     // serach field value clear

    searchField.value ='';
    booksConatainer.textContent = '';

 
    // get ony by one element from an array 

    data.docs.forEach(element => {



    
        //    if image not available or iamge is undefined

        let url;
        if (element.cover_i === undefined) {
             // get image 
         url = `https://covers.openlibrary.org/b/id/10909258-M.jpg`;
   
        }
        else{
        // get image 
         url = `https://covers.openlibrary.org/b/id/${element.cover_i}-M.jpg`;
        
        }
             
   
         if (element.first_publish_year === undefined) {
            element.first_publish_year ='';
         }

   
        // subject  undefined checked


         let subject;

         if (element.subject === undefined) {
            subject = '';
         }
         else{
            subject = element.subject[0] ;
         }



        //  author name undefined checked


         let authorName;
         if (element.author_name === undefined) {

            authorName = '';
    
         }
         else{
             authorName = element.author_name[0];
         }



        //  publisher name  undefined checked

         let publisherName;
         if (element.publisher === undefined) {
           publisherName = '';
         }
         else{
             publisherName = element.publisher[0];
         }



       
        

        
            // book div create 
    const bookDiv = document.createElement('div');
    bookDiv.setAttribute('class', 'card');
    bookDiv.setAttribute('style', 'width: 18rem;');
    bookDiv.innerHTML = `  <img  src=${url} class="card-img-top" alt="...">
    <div class="card-body">
    <h5 class='card-title'>${subject}</h5>
      <p class="card-text author-name"> <span class='by'>by</span> ${authorName}  </p>
      <div class='publish-detail'><p class='publisher'><span class ='publisher-name'>Publisher : </span>${publisherName}</p>
      <p class='publish-time'><span class='year'>First Publish : </span>${ element.first_publish_year}</p>
     </div>
    </div>`;
    booksConatainer.appendChild(bookDiv);
  
    });

    // spinner display none after data  load completed
    spinner.style.display = 'none';
   

    
}


  