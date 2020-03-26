let BOOK_LIST = {};
let MEMBER_LIST = {};


function addMember(name) {
    let member = new Member(name);
    MEMBER_LIST[member.id] = member;
    updateMemberList();
}

function addBook(name) {
    let book = new Book(name);
    BOOK_LIST[book.id] = book;
    updateAvailableBookList();
}

function updateMemberList() {
    listeAdherents.innerText = "";
    for (let key in MEMBER_LIST) {
        let member = MEMBER_LIST[key];
        let li = member.create_li_element();
        listeAdherents.appendChild(li);
    }
}


function updateAvailableBookList() {
    listeLivresDisponibles.innerText = "";
    for (let key in BOOK_LIST) {
        let book = BOOK_LIST[key];
        if (!book.is_borrowed()) {
            let li = book.create_li_element();
            listeLivresDisponibles.appendChild(li);
        }
    }
}

function updateBorrowedBookList() {
    listeLivresEmpruntes.innerText = "";
    for (let key in MEMBER_LIST) {
        let member = MEMBER_LIST[key];
        for (let key in member.borrowed_books) {
            let book = member.borrowed_books[key];
            let li = book.create_li_element();
            listeLivresEmpruntes.appendChild(li);
        }
    }
}


let listeAdherents = document.getElementById("listeAdherents");
let listeLivresDisponibles = document.getElementById("listeLivresDisponibles");
let listeLivresEmpruntes = document.getElementById("listeLivresEmpruntes");
let addMemberButton = document.getElementById("ajouterAdherent");
let addBookButton = document.getElementById("ajouterLivre");

listeAdherents.addEventListener("click", function (e) {
    let member = MEMBER_LIST[e.target.id.replace("member", "")];
    let s = member.get_count_of_borrowed_book_string();
    if (s === 0) {
        alert(member.name + " n'a emprunté aucun livre :(");
        return;
    }
    let msg = member.name + " a " + s + " en ce moment :\n";
    for (let key in member.borrowed_books) {
        let book = member.borrowed_books[key];
        msg += "\n - " + book.name;
    }
    alert(msg);
});

listeLivresDisponibles.addEventListener("click", function (e) {
    let book = BOOK_LIST[e.target.id.replace("book", "")];
    book.borrow();
});

listeLivresEmpruntes.addEventListener("click", function (e) {
    let book = BOOK_LIST[e.target.id.replace("book", "")];
    book.return();
});

addMemberButton.addEventListener("click", function () {
    let name = document.getElementById("nomAdherent");
    addMember(name.value);
});

addBookButton.addEventListener("click", function () {
    let name = document.getElementById("titreLivre");
    addBook(name.value);
});