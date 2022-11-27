import axios from 'axios';
const url = import.meta.env.VITE_APP_API_URL;

class LibraryService {
    constructor() {
        this.baseUrl = `${url}/api/library`;
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
    async create(library) {
        return (await this.api.post(this.baseUrl, library)).data;
    }
    async deleteMany() {
        return (await this.api.delete(this.baseUrl)).data;
    }
    async get(id) {
        return (await this.api.get(`${this.baseUrl}/${id}`)).data;
    }
    async update(id, library) {
        return (await this.api.put(`${this.baseUrl}/${id}`, library)).data;
    }
    async delete(id) {
        return (await this.api.delete(`${this.baseUrl}/${id}`)).data;
    }
}

export const bookService = new LibraryService();
