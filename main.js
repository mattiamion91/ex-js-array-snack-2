/*Hai un array di oggetti rappresentanti libri:
​
Snack 1 - Filtra e Modifica
Crea una funzione che somma due numeri.
Crea un array (longBooks) con i libri che hanno più di 300 pagine;
Creare un array (longBooksTitles) che contiene solo i titoli dei libri contenuti in longBooks.
Stampa in console ogni titolo nella console.
Snack 2 - Il primo libro scontato
Creare un array (availableBooks) che contiene tutti i libri disponibili.
Crea un array (discountedBooks) con gli availableBooks, ciascuno con il prezzo scontato del 20% (mantieni lo stesso formato e arrotonda al centesimo)
Salva in una variabile (fullPricedBook) il primo elemento di discountedBooks che ha un prezzo intero (senza centesimi).
Snack 3 - Ordinare gli Autori
Creare un array (authors) che contiene gli autori dei libri.
Crea una variabile booleana (areAuthorsAdults) per verificare se gli autori sono tutti maggiorenni.
Ordina l’array authors in base all’età, senza creare un nuovo array.
(se areAuthorsAdult è true, ordina in ordine crescente, altrimenti in ordine decrescente)
Snack 4 - Calcola l’età media
Creare un array (ages) che contiene le età degli autori dei libri.
Calcola la somma delle età (agesSum) usando reduce.
Stampa in console l’età media degli autori dei libri.
Snack 5 (Bonus) - Raccogli i libri
Nota: a differenza di quanto visto finora negli esempi, per accedere all'API utilizzare l'url base:
http://localhost:3333
al posto di:
https://freetestapi.com/api/v1
Ad esempio:
http://localhost:3333/users
per chiamare l'endpoint /users
Clicca qui per la guida su come installare il Server API Locale!

Usando la l'API http://localhost:3333/books/{id} usa la combinazione di .map() e Promise.all(), per creare una funzione (getBooks) che a partire da un array di id (ids), ritorna una promise che risolve un array di libri (books).
Testala con l’array [2, 13, 7, 21, 19] .
Snack 6 (Bonus) - Ordina i libri
Crea una variabile booleana (areThereAvailableBooks) per verificare se c’è almeno un libro disponibile.
Crea un array (booksByPrice) con gli elementi di books ordinati in base al prezzo (crescente).
Ordina l’array booksByPricein base alla disponibilità (prima quelli disponibili), senza creare un nuovo array.
Snack 7 (Bonus) - Analizza i tag
Usa reduce per creare un oggetto (tagCounts) che conta quante volte ogni tag viene usato tra i libri.*/

const books = [
    {
        title: "React Billionaire",
        pages: 250,
        author: {
            name: 'Alice',
            age: 35
        },
        available: false,
        price: '101€',
        tags: ['advanced', 'js', 'react', 'senior']
    },
    {
        title: "Advanced JS",
        pages: 500,
        author: {
            name: 'Bob',
            age: 20
        },
        available: true,
        price: '25€',
        tags: ['advanced', 'js', 'mid-senior']
    },
    {
        title: "CSS Secrets",
        pages: 320,
        author: {
            name: 'Alice',
            age: 17
        },
        available: true,
        price: '8€',
        tags: ['html', 'css', 'junior']
    },
    {
        title: "HTML Mastery",
        pages: 200,
        author: {
            name: 'Charlie',
            age: 50
        },
        available: false,
        price: '48€',
        tags: ['html', 'advanced', 'junior', 'mid-senior']
    },
];

/*snack1*/

const somma = (a, b) => a + b
console.log(somma(7, 4));

const longBooks = books.filter((b) => b.pages > 300)
console.log(longBooks);

const longBooksTitles = longBooks.map((b) => b.title)
console.log(longBooksTitles);

/*snack2*/

const availableBooks = books.filter((b) => b.available === true)
console.log(availableBooks);

const discountedBooks = availableBooks.map((b) => {
    return {
        ...b,
        price: parseFloat(b.price) * 0.80.toFixed(2)
    }
});
console.log(discountedBooks);

const fullPricedBook = discountedBooks.find((b) => b.price % 1 === 0)
console.log(fullPricedBook);

/*snack3*/

const authors = books.map(b => b.author)

const areAuthorsAdults = authors.every(a => a.age >= 18)
console.log(areAuthorsAdults);

authors.sort((a, b) => {
    if (areAuthorsAdults === true) {
        return a.age - b.age
    } else {
        return b.age - a.age
    }
}
)
console.log(authors);

/*snack4*/

const ages = authors.map((a) => a.age)
console.log(ages);

const agesSum = ages.reduce((acc, curr) => acc + curr, 0)
console.log(agesSum / ages.length);

/*snack5*/

//funnzione di supporto

const localApi = 'http://localhost:3333'

const fetchJson = async (url) => {
    const res = await fetch(url)
    const obj = await res.json()
    return obj
}

const getBooks = async () => {
    try{
        const endpoints = [2, 13, 7, 21, 19]
        const promises = endpoints.map(ep=> fetchJson(`${localApi}/books/${ep}`));
        const books = await Promise.all(promises)
        return books
    }catch(error){
        throw new Error(`errore recupero dati: ${error.message}`)
    }
}

//uso la funz
getBooks()
.then(b=>console.log(b))
.catch(err=> console.error(err))

