let orm = new ORM("php/");

let BOOK_LIST = {};
let MEMBER_LIST = {};

function updateBookList(data) {
    BOOK_LIST = {}
    for (let e of data) {
        BOOK_LIST[e.idLivre] = e.titreLivre;
    }
}

function getRequest(stringVille, callback) {
    let url = "php/requeteVille.php?ville=" + stringVille;
    let requete = new XMLHttpRequest();
    requete.open("GET", url, true);
    requete.addEventListener("load", function () {
        callback(requete);
    });
    requete.send(null);
}

function addMember(name) {
    orm.create_member(name, function (data) {
        updateMemberList();
    });
}

function addBook(name) {
    orm.create_book(name);
    updateAvailableBookList();
}

function updateMemberList(data) {
    if (data != undefined) {
        MEMBER_LIST = {}
        for (let e of data) {
            MEMBER_LIST[e.idAdherent] = new Member(e.idAdherent, e.nomAdherent);
        }
    }

    listeAdherents.innerText = "";
    for (let key in MEMBER_LIST) {
        let member = MEMBER_LIST[key];
        orm.select_borrowed_book_by_id(member.id, function (data) {
            let count_of_borrowed_books = Object.keys(data).length; //todo a modif apres le fixe de Maxime
            // console.log(count_of_borrowed_books);
            let li = member.create_li_element(count_of_borrowed_books);
            listeAdherents.appendChild(li);
        });
    }
}

function updateAvailableBookList(data) {
    listeLivresDisponibles.innerText = "";
    for (let book_data of data) {
        let book = new Book(book_data.idLivre, book_data.titreLivre);
        let li = book.create_li_element();
        listeLivresDisponibles.appendChild(li);
    }
}

function updateBorrowedBookList(data) {
    listeLivresEmpruntes.innerText = "";
    for (let book_data of data) {
        let book = new Book(book_data.idLivre, book_data.titreLivre);
        let li = book.create_li_element();
        listeLivresEmpruntes.appendChild(li);
    }
    orm.select_all("adherent", updateMemberList);
}

let listeAdherents = document.getElementById("listeAdherents");
let listeLivresDisponibles = document.getElementById("listeLivresDisponibles");
let listeLivresEmpruntes = document.getElementById("listeLivresEmpruntes");
let addMemberButton = document.getElementById("ajouterAdherent");
let addBookButton = document.getElementById("ajouterLivre");

listeAdherents.addEventListener("click", function (e) {
    let member = MEMBER_LIST[e.target.id.replace("member", "")];
    orm.select_borrowed_book_by_id(member.id, function (data) {
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

});

//todo
listeLivresDisponibles.addEventListener("click", function (e) {
    let book = BOOK_LIST[e.target.id.replace("book", "")];
    book.borrow();
});

//todo
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

// orm.select_all("adherent", updateMemberList);
orm.select_available_books(updateAvailableBookList);
orm.select_borrowed_books(updateBorrowedBookList);