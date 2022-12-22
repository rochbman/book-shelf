// import book data
import { bookData } from "./book-data.js";
//set varibles
let main =document.querySelector(".main")
let ul;
let bookinfo = document.querySelector(".bookInfo");
let b;
let button = document.querySelector('button')

//bookshelf class set up

class Bookshelf{
    constructor(bookArr){
        this.bookArr=bookArr;
    }

    //loops over book array and renders a book for each object in the array

    render(){
        for(let i=0; i<this.bookArr.length;i++){
            b = new Book(this.bookArr[i].author, this.bookArr[i].language, this.bookArr[i].subject, this.bookArr[i].title);
           ul= main.appendChild(document.createElement('ul'));
           // add a class name of i to equal the index of that book in the book array so i can access the book obj with its class name
            ul.className=`${i}`;
           // diplays book title and author for each book
            ul.innerHTML=this.bookArr[i].title+" by: " +this.bookArr[i].author[0] 
        }
    }

    //adds event listener to each ul created above on click each books information will be displayed 

    clickclack(){
        for(let i=0; i<this.bookArr.length;i++){
            let u=document.getElementsByClassName(`${i}`);
            u[0].addEventListener('click',function(){
                bookinfo.innerHTML=`Your book is ${bookData[i].title} by ${bookData[i].author} it is writen in ${bookData[i].language}. This book's subjects include' ${bookData[i].subject} `
            })
        } 
    }
}

//book class setup

class Book{
    constructor(author,language,subject,title){
        this.author=author;
        this.language=language;
        this.subject=subject;
        this.title=title;
    } 
}

//create new bookshelf the render all books and add the event listeners

let bs= new Bookshelf(bookData)
bs.render()
bs.clickclack()


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

    document.querySelectorAll("ul").forEach(el => el.remove());
    
    //  adds all books again but new list has the users book included

    bookData.push(yourBook);
    const yourBS= new Bookshelf(bookData);
    console.log(bookData);
    yourBS.render();
    yourBS.clickclack();
});