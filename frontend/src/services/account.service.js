import axios from 'axios';
const url = import.meta.env.VITE_APP_API_URL;

class AccountService {
    constructor() {
        this.baseUrl = `${url}/api/register`;
        this.api = axios.create({
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });
    }
    
    async create(accs) {
        return (await this.api.post(this.baseUrl, accs)).data;
    }
    
    
    async update(accUsername, acc) {
        return (await this.api.put(`${this.baseUrl}/${accUsername}`, acc)).data;
    }
    
}

export const accountService = new AccountService();
