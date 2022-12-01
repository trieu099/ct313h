import axios from 'axios';
const url = import.meta.env.VITE_APP_API_URL;

class LibraryService {
    constructor() {
        this.baseUrl = `${url}/api/books`;
        this.api = axios.create({
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
    }
    async getMany() {
        return (await this.api.get(this.baseUrl)).data;
    }
    async create(book) {
        return (await this.api.post(this.baseUrl, book)).data;
    }
    async deleteMany() {
        return (await this.api.delete(this.baseUrl)).data;
    }
    async get(bookCode) {
        return (await this.api.get(`${this.baseUrl}/${bookCode}`)).data;
    }
    async update(bookCode, book) {
        return (await this.api.put(`${this.baseUrl}/${bookCode}`, book)).data;
    }
    async delete(bookCode) {
        return (await this.api.delete(`${this.baseUrl}/${bookCode}`)).data;
    }
    async findById(bookCode) {
        return await this.books.where('bookCode', bookCode).select('*')
        // .first()
        ;
    }
}

export const bookService = new LibraryService();
