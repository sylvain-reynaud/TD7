class Member {
    constructor(id, name) {
        this.name = name;
        this.id = id;
    }

    create_li_element(count_of_borrowed_book) {
        let li = document.createElement("li");
        li.innerHTML = this.id  + " - " + this.name;
        li.id = "member" + this.id;
        let count_of_borrowed_book_string = this.get_count_of_borrowed_book_string(count_of_borrowed_book);
        if (count_of_borrowed_book_string != 0) li.innerHTML += " (" + count_of_borrowed_book_string + ")";
        return li;
    }

    get_count_of_borrowed_book_string(number_of_borrowed_books) {
        if (number_of_borrowed_books === 1) return number_of_borrowed_books + " emprunt";
        else if (number_of_borrowed_books !== 0) return number_of_borrowed_books + " emprunts";
        else return 0;
    }
}