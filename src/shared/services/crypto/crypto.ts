import {createCipher} from "crypto";
const DADOS_CRIPTOGRAFAR = {
    algoritmo : "aes256",
    codificacao : "utf8",
    segredo : "chaves",
    tipo : "hex"
};


export class Crypto {
    // static async encrypted(data) {
    //     const cipher =  createCipher(DADOS_CRIPTOGRAFAR.ALGORITMO, DADOS_CRIPTOGRAFAR.SEGREDO);
    //     cipher.update(data);

        
    //     return cipher.final(DADOS_CRIPTOGRAFAR.tipo);
    // }

    // static async decrypted(data) {
    //     const cipher =  createCipher(DADOS_CRIPTOGRAFAR.ALGORITMO, DADOS_CRIPTOGRAFAR.SEGREDO);
    //     cipher.update(data, DADOS_CRIPTOGRAFAR.TIPO_CRYPTO);
        
    //     return decipher.final();
    // }
    static void() {
        return 'void';
    }
}