import axios from 'axios';
const url = import.meta.env.VITE_APP_API_URL;

class CustomerService {
    constructor() {
        this.baseUrl = `${url}/api/customer`;
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
    async create(cus) {
        return (await this.api.post(this.baseUrl, cus)).data;
    }
    async deleteMany() {
        return (await this.api.delete(this.baseUrl)).data;
    }
    async get(listId) {
        return (await this.api.get(`${this.baseUrl}/${listId}`)).data;
    }
    async update(listId, cus) {
        return (await this.api.put(`${this.baseUrl}/${listId}`, cus)).data;
    }
    async delete(listId, cus) {
        return (await this.api.delete(`${this.baseUrl}/${listId}`, cus)).data;
    }
    async findById(listId) {
        return await this.cuss.where('listId', listId).select('*')
        // .first()
        ;
}
}

export const customerService = new CustomerService();
