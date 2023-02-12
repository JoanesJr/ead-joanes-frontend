import { Cryptograpy } from "../crypto";

export class LocalStorage {

    static getItem(value: string): string | null {
        const valueEncrypted = localStorage.getItem(value);
        if (valueEncrypted) {
            const decrypted = Cryptograpy.decrypted(valueEncrypted);
            return decrypted;
        }
       
        
        return null;
        
    }

    static setItem(name: string, value: string): void {
        const valueEncrypted = Cryptograpy.encrypted(value);
        // console.log(valueEncrypted);
        // console.log(name);
        localStorage.setItem(name, valueEncrypted);
    }

    static removeItem(name: string): void {
        localStorage.removeItem(name);
    }
}