// import book data
import { bookData } from "./book-data.js";
//set varibles
let main =document.querySelector(".main")
let ul;
let bookinfo = document.querySelector(".bookInfo");
let commentButt = document.querySelector("#comment");
let b;
let button = document.querySelector('#add');
let favButt = document.querySelector('#fav');

let pageButt =document.querySelector('#page');
let infodis= document.querySelector('.yourBook')
let favList = document.querySelector('#favList');
let allBooks = document.querySelector('#allBooks');
let titleSort = document.querySelector('#title');
let authorSort = document.querySelector('#author');
let favArr =[];

const searchInput = document.querySelector('.input');
const clearButton = document.querySelector('#clear');
const list = document.querySelector('#list');


let comBox = document.querySelector('#comment-box');
let post= document.getElementById("post");
let uno = document.querySelector('#unordered');

//bookshelf class set up

class Bookshelf{
    constructor(bookArr){
        this.bookArr=bookArr;
    }

    //loops over book array and renders a book for each object in the array

    render(arr){
        let bookcount = 0;
        const shelf = arr.map((obj)=>{
                 b = new Book(obj.author, obj.language, obj.subject, obj.title);
           ul= main.appendChild(document.createElement('li'));
           
           // add a class name of i to equal the index of that book in the book array so i can access the book obj with its class name

            ul.id=`${bookcount}`;
            ul.className='book'
           // diplays book title and author for each book
            ul.innerHTML=obj.title+" by: " +obj.author[0];
            bookcount++ 
        })
    }

    //adds event listener to each ul created above on click each books information will be displayed 

    clickclack(){
        
       
        for(let i=0; i<this.bookArr.length;i++){
            bookData[i].comments=[];
            
            let u=document.getElementById(`${i}`);
            u.addEventListener('click',function(){
                document.querySelectorAll(".comm").forEach(el => el.remove());
                // comDiv.style.display='none';
                bookinfo.innerHTML=`Your book is ${bookData[i].title} by ${bookData[i].author} it is writen in ${bookData[i].language}. This book's subjects include' ${bookData[i].subject} `;

                

                comBox.style.display="none";
                post.style.display="none";
                uno.style.display="none";
                //make favorite button apper when a book is selected
                infodis.style.display='block';
                favButt.style.display='block';

                // give button listener to push that books obj into an array of favorite books
                favButt.addEventListener('click',function(){
                    favArr.push(bookData[i]);
                    //sort and filter to make sure the are no dups
                    favArr.sort()
                    let filtered= favArr.filter(function(item, pos) {
                        return favArr.indexOf(item) == pos;
                    })
                    favArr=filtered
                    favButt.style.display="none"
                    

                })
                
                commentButt.addEventListener('click',function commentButtclick(){
                    commentButt.removeEventListener('click', commentButtclick);
                   
                    document.querySelectorAll(".comm").forEach(el => el.remove());
                    comBox.style.display="block";
                    post.style.display="block";
                    uno.style.display="block";
                    
                    bookData[i].comments.forEach((string)=>{
                        let li = document.createElement("li");
                        let text = document.createTextNode(string);
                        li.className='comm';
                        li.appendChild(text);
                        document.getElementById("unordered").appendChild(li);

                       
                        
                        

                    })
                    post.addEventListener("click", function postClick (){
                        post.removeEventListener('click', postClick)
                        document.querySelectorAll(".comm").forEach(el => el.remove());
                        let commentBoxValue= document.getElementById("comment-box").value;
                        bookData[i].comments.push(commentBoxValue)
                        bookData[i].comments.forEach((string)=>{
                            let li = document.createElement("li");
                            let text = document.createTextNode(string);
                            li.className='comm';
                            li.appendChild(text);
                            document.getElementById("unordered").appendChild(li);
    
                        })
    
                        
                        
                        
     
                        
     
                    });
                


                })
                
                
            })
            
            
        } 

        //add listener to fav books button to clear bookshelf and diplay only users favorited books
        favList.addEventListener('click',function(){
            
            document.querySelectorAll("li").forEach(el => el.remove());
            let favShelf= new Bookshelf(favArr)
            // console.log(favArr)
            favShelf.render(favArr)
            favShelf.clickclack(favArr)
            infodis.style.display='none';
            

        })

        //add listener to all books button to display all books again and it will still include any books the user added

        allBooks.addEventListener('click',function(){

            document.querySelectorAll("li").forEach(el => el.remove());
            const yourBS= new Bookshelf(bookData);
            // console.log(bookData);
            yourBS.render(bookData);
            yourBS.clickclack(bookData);
            infodis.style.display='none';
            

        })

        // trying to sort by title and author need to find out how to reference both properly here to make these work

        // titleSort.addEventListener('click', function(){
        //     document.querySelectorAll("li").forEach(el => el.remove());
        //     this.bookArr.sort(function(a, b) {
        //         if (a < b) {
                  
        //           return -1;
        //         }
        //         if (a > b) {
                  
        //           return 1
        //         }
        //         return 0
                
        //       })
        //       console.log(bookArr);
        //     //   const sortedBs= new Bookshelf(bookArr);
              
        //     //   sortedBs.render(bookArr);
        //     //   sortedBs.clickclack(bookArr);
              

        // })

        // authorSort.addEventListener('click', function(){
        //     document.querySelectorAll("li").forEach(el => el.remove());
        //     this.bookArr.sort(function(a, b) {
        //         if (a < b) {
                  
        //           return -1;
        //         }
        //         if (a > b) {
                  
        //           return 1
        //         }
        //         return 0
                
        //       })
        //       console.log(this.bookArr);
        //     //   const sortedBs= new Bookshelf(bookData);
              
        //     //   sortedBs.render(bookData);
        //     //   sortedBs.clickclack(bookData);
              

        // })

        searchInput.addEventListener("input", (e) => {
            let value = e.target.value
        
            if (value && value.trim().length > 0){
                 value = value.trim().toLowerCase()
        
                //returning only the results of setList if the value of the search is included in the person's name
                setList(bookData.filter(foundBook => {
                    return foundBook.title.includes(value)
                }))}})
        function setList(results){

            for (const foundBook of results){
                // creating a li element for each result item
                const resultItem = document.createElement('li')
        
                // adding a class to each item of the results
                resultItem.classList.add('result-item')
        
                // grabbing the name of the current point of the loop and adding the name as the list item's text
                const text = document.createTextNode(foundBook.name)
        
                // appending the text to the result item
                resultItem.appendChild(text)
        
                // appending the result item to the list
                list.appendChild(resultItem)
            }  
        }

        function clearList(){
            // looping through each child of the search results list and remove each child
            while (list.firstChild){
                list.removeChild(list.firstChild)
            }
        }

        clearButton.addEventListener("click", () => {
            clearList()
        })
    }
}

//book class setup

class Book{
    constructor(author,language,subject,title){
        this.author=author;
        this.language=language;
        this.subject=subject;
        this.title=title;
        this.comments=[];
        
    } 
}

//create new bookshelf the render all books and add the event listeners

document.addEventListener("DOMContentLoaded", function() {
    let bs= new Bookshelf(bookData)
    bs.render(bookData)
    bs.clickclack()

});







// collect info on book the user wants to obj and push  the new book into book data and render a new collection of books 

button.addEventListener('click',function(){

    //user prompts to collect info

    let yourTitle=prompt("What is the title of your book");
    let yourAuthor=prompt("Who is the Author of your book");
    let yourLang=prompt("What language is you book writen in");
    let yourSub=prompt("What is the subject of this book");

    //create a new book obj

    let yourBook={
        author: [yourAuthor],
        language: yourLang,
        subject: [
          yourSub
        ],
        title: yourTitle,
    }
    
    //delete all books

    document.querySelectorAll("li").forEach(el => el.remove());
    
    //  adds all books again but new list has the users book included

    bookData.push(yourBook);
    const yourBS= new Bookshelf(bookData);
    console.log(bookData);
    yourBS.render(bookData);
    yourBS.clickclack(bookData);
});

