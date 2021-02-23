export default class GotService {
    constructor(){
        this._apiBase = 'https://www.anapioficeandfire.com/api/';

        this.isSet = this.isSet.bind(this);
    }

    getResource = async (url) => {
        const response = await fetch(`${this._apiBase}${url}`);
    
        //# Checking that the fetch was successful
        //The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500. Instead, it will resolve normally (with ok status set to false), and it will only reject on network failure or if anything prevented the request from completing.
        if(!response.ok){
            throw new Error(`Could not fetch ${url}, status ${response.status}`);
        }
    
        return await response.json();      
    }

    //Api characters, books, houses
    getAllCharacters = async () => {
        const res= await this.getResource(`/characters?page=5&pageSize=10/`);
        return res.map(this._transformCharacter)
    }

    getCharacter = async(id) => {
        const character = await this.getResource(`/characters/${id}/`);
        return this._transformCharacter(character);
    }

    getAllBooks = async () => {
        const res = await this.getResource(`/books/`);
        return res.map(this._transformBook);
    }
    
    getBook = async (id) => {
        const book = await this.getResource(`/books/${id}/`);
        return this._transformBook(book);
    }

    getAllHouses = async () => {
        const res = await this.getResource(`/houses/`);
        return res.map(this._transformHouse);
    }
    
    getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}/`);
        return this._transformHouse(house);
    }

    isSet(data) {//to fill fields without data
       return data ? data : 'Data not found...';
    } 

    _extracId = (value) => {//to get only id of char
       const idRegExp = /\/([0-9]*)$/;
       return value.url.match(idRegExp)[1];//only number was captured by '([0-9]*)'
    }

    _transformCharacter = (char) => {
        return {
            id: this._extracId(char),
            name: this.isSet(char.name),
            gender: this.isSet(char.gender),
            born: this.isSet(char.born),
            died: this.isSet(char.died),
            culture: this.isSet(char.culture)
        }
    }

    _transformHouse = (house) => {
        return {
            id: this._extracId(house),
            name: this.isSet(house.name),
            region: this.isSet(house.region),
            words: this.isSet(house.words),
            overlord: this.isSet(house.overlord),
            coatOfArms: this.isSet(house.coatOfArms)
        }
    }

    _transformBook = (book) => {
        return {
            id: this._extracId(book),
            name: this.isSet(book.name),
            numberOfPages: this.isSet(book.numberOfPages),
            publisher: this.isSet(book.publisher),
            released: this.isSet(book.released),
            country: this.isSet(book.country)
        }
    }
} 