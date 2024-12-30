import { compareSync, hashSync } from "bcrypt";

export default class CypherController {
    static hashPassword(password){
        return hashSync(password, 10);
    }

    static comparePassword(password, hash){

        return compareSync(password, hash);
    }
}