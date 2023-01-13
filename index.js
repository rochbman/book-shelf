// import book data
import { bookData } from "./book-data.js";
//set varibles
let main =document.querySelector(".main")
let ul;
let bookinfo = document.querySelector(".bookInfo");
let commentButt = document.querySelector("#comment");
let b;
let add = document.querySelector('#add');
let favButt = document.querySelector('#fav');
let close = document.querySelector('#close');
let infodis= document.querySelector('.yourBook')
let favList = document.querySelector('#favList');
let allBooks = document.querySelector('#allBooks');
let titleSort = document.querySelector('#title');
let authorSort = document.querySelector('#author');
let favArr =[];
let currBook ;
let currBook2;

//comment varibles

let post= document.getElementById("post");
let comBox = document.querySelector('#comment-box');
let uno = document.querySelector('#unordered');

// establish a comment key value pair to each book so i can add comments to later. do it here so it will carry over if books are sorted or somthing

bookData.forEach((obj)=>obj.comments=[])


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
           
           // add a id name  to equal the index of that book in the book array so i can access the book obj with its id later add classname for styleing

            ul.id=`${bookcount}`;
            ul.className='book'
           // diplays book title and author for each book
            ul.innerHTML=obj.title+" by: " +obj.author[0];
            bookcount++ 
        })
    }

    //adds event listener to each ul created above on click each books information will be displayed 

    clickclack(){
        
        
        //function to post comments

        function postClick (){
            document.querySelectorAll(".comm").forEach(el => el.remove());
            let commentBoxValue= comBox.value;
            currBook2.push(commentBoxValue)
            // console.log(currBook2)
            currBook2.forEach((string)=>{
                let li = document.createElement("li");
                let text = document.createTextNode(string);
                li.className='comm';
                li.appendChild(text);
                document.getElementById("unordered").appendChild(li);
            })
        }

        //function to make the comment box and comments appear put it up here so i can remove this function when a book is selected

        function commentButtclick(){
            let post= document.getElementById("post");
             
            // console.log(currBook2)
           
            //clear comments list
            document.querySelectorAll(".comm").forEach(el => el.remove());
            //display comment stuff
            comBox.style.display="block";
            post.style.display="block";
            uno.style.display="block";
            
            //diplays all current coments of current book
            currBook2. forEach((string)=>{
                let li = document.createElement("li");
                let text = document.createTextNode(string);
                li.className='comm';
                li.appendChild(text);
                document.getElementById("unordered").appendChild(li);
            })
            //add the click listener to the post button here so it doesnt do wierd stuff
            post.addEventListener("click",postClick );
        }

        //this is to clear all event listeners will call later to clean up when a new bookshelf is rendered

        function clearEvents(){
            let oof=document.querySelectorAll("li")
            oof.forEach(el => el.remove());
            oof.forEach((li)=>{
                commentButt.removeEventListener('click', commentButtclick);
                post.removeEventListener('click', postClick);
            })
        }

        
       // All HAIL THE MOTHER LOOP!!! this loop is the heart of the functionality of the site it lets me add the event listeners to all books and reference them easily

        for(let i=0; i<this.bookArr.length;i++){
            let aBook=this.bookArr[i];
            
            let u=document.getElementById(`${i}`);
            u.addEventListener('click',function uclick(){
                console.log(aBook)
                

                //set these so there isnt referecne to 'i' messing with stuff

                currBook=aBook;
                currBook2=aBook.comments;

                //clear comments list
                document.querySelectorAll(".comm").forEach(el => el.remove());

                //make book info diplay when a book is selected
                bookinfo.innerHTML=`Your book is ${aBook.title} by ${aBook.author} it is writen in ${aBook.language}. This book's subjects include' ${aBook.subject} `;
                
                //remove old click listerns so the dont carry over from the last book clicked

                commentButt.removeEventListener('click', commentButtclick);
                post.removeEventListener('click', postClick);
                

                // make the comment stuff go away when a new book is seleted

                comBox.style.display="none";
                post.style.display="none";
                uno.style.display="none";

                //make favorite button and book info div apper when a book is selected

                infodis.style.display='block';
                favButt.style.display='block';

                // give button listener to push that books obj into an array of favorite books

                favButt.addEventListener('click', function favButtClick(){
                    //if this project taught me anything its to remove event listeners when your done with them
                    favButt.removeEventListener('click', favButtClick)
                    favArr.push(currBook);
                    
                    //this is kind of a bandaid but it works so a temp solution that works i can live with in the context of this project
                    currBook=null;
                    //sort and filter to make sure the are no dups
                    favArr.sort()
                    let filtered= favArr.filter(function(item, pos) {
                        return favArr.indexOf(item) == pos;
                    })
                    favArr=filtered
                    //remove the favorite button when its clicked
                    favButt.style.display="none"
    
                })
                
                // add click listener to the comment button here so its accocciated with the right book
                commentButt.addEventListener('click', commentButtclick);
                
            })  
        } 

        //add listener to fav books button to clear bookshelf and diplay only users favorited books
        favList.addEventListener('click',function(){
            clearEvents()
            // this is the rest of that bandaid solution from above
            for(let i =0;i<favArr.length;i++){
                if(favArr[i]===null){
                    favArr.splice(i,i)   
                }  
            }
            console.log(favArr)
            // clear bookshelf
            document.querySelectorAll("li").forEach(el => el.remove());
            //create and 
            let favShelf= new Bookshelf(favArr)
            favShelf.render(favArr)
            favShelf.clickclack(favArr)
            infodis.style.display='none';
        })

        // collect info on book the user wants to obj and push the new book into book data and render a new collection of books 

        add.addEventListener('click',function(){

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
                comments:[] 
            }
            console.log(yourBook)
            //delete all books
        
            document.querySelectorAll("li").forEach(el => el.remove());
        
            clearEvents()
            
            //  adds all books again but new list has the users book included
        
            bookData.push(yourBook);
            const yourBS= new Bookshelf(bookData);
            console.log(bookData);
            yourBS.render(bookData);
            yourBS.clickclack(bookData);
        });

        //add listener to all books button to display all books again and it will still include any books the user added

        allBooks.addEventListener('click',function(){
            clearEvents()

            document.querySelectorAll("li").forEach(el => el.remove());
            const yourBS= new Bookshelf(bookData);
            // console.log(bookData);
            yourBS.render(bookData);
            yourBS.clickclack(bookData);
            infodis.style.display='none';
        })

        

        

        close.addEventListener('click',()=> infodis.style.display='none')

        // sort by title  

        titleSort.addEventListener('click', function(){
            clearEvents()
            let sortedBookData = bookData.sort((a, b) => (a.title < b.title) ? -1 : 1);
            console.log(sortedBookData);
            const sortedBs= new Bookshelf(sortedBookData);
            sortedBs.render(sortedBookData);
            sortedBs.clickclack();
            infodis.style.display='none';
            

        })

        authorSort.addEventListener('click', function(){
            let all=document.querySelectorAll("li")
            all.forEach(el => el.remove());
            all.forEach((li)=>{
                commentButt.removeEventListener('click', commentButtclick);
                post.removeEventListener('click', postClick);
            })
            document.querySelectorAll("li").forEach(el => el.remove());
            let sortedBookData = bookData.sort((a, b) => (a.author < b.author) ? -1 : 1);
            console.log(sortedBookData);
            const sortedBs= new Bookshelf(sortedBookData);
            sortedBs.render(sortedBookData);
            sortedBs.clickclack();
            infodis.style.display='none';
            
        })

        
    }
}

//book class setup

class Book{
    constructor(author,language,subject,title,){
        this.author=author;
        this.language=language;
        this.subject=subject;
        this.title=title;
        this.comments=[];   
    } 
}

    //create new bookshelf the render all books and add the event listeners

    let bs= new Bookshelf(bookData)
    bs.render(bookData)
    bs.clickclack()

