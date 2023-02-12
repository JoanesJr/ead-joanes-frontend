import * as crypto  from "crypto-js";
import {Environment} from "../../environment/index";

export class Cryptograpy {

    static encrypted(value: string): string {
        const pwd = Environment.SEGREDO;

        const crypted = crypto.AES.encrypt(value, pwd).toString();
        // const crypted = cipher.update(value, 'utf8', 'hex');
        return crypted;

    }

    static decrypted(value: string): string {
        const pwd = Environment.SEGREDO;
        const bytes  = crypto.AES.decrypt(value, pwd);
        const originalText = bytes.toString(crypto.enc.Utf8);

        return originalText;


    }


}

