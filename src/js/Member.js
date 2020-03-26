class Member {
    constructor(name) {
        this.name = name;
        this.borrowed_books = {};
        this.id = Object.keys(MEMBER_LIST).length;
    }

    create_li_element() {
        let li = document.createElement("li");
        li.innerHTML = this.id  + " - " + this.name;
        li.id = "member" + this.id;
        let n = this.get_count_of_borrowed_book_string();
        if (n != 0) li.innerHTML += " (" + n + ")";
        return li;
    }

    get_count_of_borrowed_book_string() {
        let number_of_borrowed_books = Object.keys(this.borrowed_books).length;
        if (number_of_borrowed_books === 1) return number_of_borrowed_books + " emprunt";
        else if (number_of_borrowed_books !== 0) return number_of_borrowed_books + " emprunts";
        else return 0;
    }
}