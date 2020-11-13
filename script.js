let myLibrary = [
    {
        title: "Example Title",
        author: "Some Author",
        pages: 150,
        read: true
    },
];

let title = document.querySelector("#title");
let author = document.querySelector("#author");
let pages = document.querySelector("#pages");
let read = document.querySelector("#read");
const form = document.querySelector('#form');
let showform = document.querySelector('#showform');
const cards = document.querySelector("#cards");

const submit = document.querySelector('#submit');
const cancel = document.querySelector('.cancel');

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read.checked;
}

function addBookToLibrary() {
    if (title.value !== '' && pages.value !== '' && author.value !== '') {
        myLibrary.push(new Book(title.value, author.value, pages.value, read));
        return true;
    }
    return false;
}

function displayBooks() {
    cards.innerHTML = '';
    myLibrary.forEach(obj => {
        const div = document.createElement('div');
        const delBook = document.createElement('button');
        delBook.setAttribute('data-attribute', myLibrary.indexOf(obj));
        delBook.innerHTML = 'x';
        div.appendChild(delBook);

        for (let keys in obj) {
            let para = document.createElement('p');
            para.style.fontSize = "15px";
            let header2 = document.createElement('h2');
            header2.style.fontSize = "28px";
            header2.style.borderBottom = "3px solid black";
            let header3 = document.createElement('h3');
            if (keys === 'title'){
            header2.innerHTML = obj[keys];
           
            div.appendChild(header2);
            }else if (keys === 'author') {
                para.innerHTML = 'by';
                div.appendChild(para);
                header3.innerHTML = obj[keys];
                header3.style.fontSize = "20px";
                div.appendChild(header3);
            } else if (keys === "pages" ) {
             para.innerHTML = `${obj[keys]} pages `;
             para.style.fontSize = "15px";
             div.appendChild(para);
            } else if (keys === 'read') {
                let readStatus = (obj[keys]) ? "checked" : '';
                const label = document.createElement('label');
                label.innerHTML = `Read: <input type="checkbox" data-read=${myLibrary.indexOf(obj)} ${readStatus}>`;
                div.appendChild(label);
            }
        }
        cards.appendChild(div);
    })
}

displayBooks();

showform.addEventListener('click', function () {
    form.style.display = "grid";
})

submit.addEventListener('click', function (e) {
    if (addBookToLibrary()) {
        e.preventDefault();
        form.style.display = "none";
        form.reset();
    }
    displayBooks();
});

cancel.addEventListener('click', function(e) {
    e.preventDefault();
    form.style.display = "none";
    form.reset();
})

window.addEventListener('click', function(e) {
    console.log(e.target);
    if (e.target.getAttribute('data-attribute')) {
        myLibrary.splice(e.target.getAttribute('data-attribute'), 1);
        displayBooks();
    } else if (e.target.getAttribute('data-read')
    ) {
        let obj = myLibrary[e.target.getAttribute('data-read')].read;
       myLibrary[e.target.getAttribute('data-read')].read = (obj) ? false: true;
       displayBooks();
    } 
})

