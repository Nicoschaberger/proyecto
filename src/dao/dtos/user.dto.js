import { createHash } from "../../utils/bcrypt.js";

class UserDTO {
    constructor(user) {
        this.first_name = user.first_name;
        this.last_name = user.last_name;
        this.email = user.email;
        this.password = createHash(user.password);
        this.rol = user.rol;
    }

    static getUserTokenFrom(user) {
        const name = `${user.first_name} ${user.last_name}`;
        return { ...user, name };
    }

    getCurrentUser(){
        return {
            fullName: this.first_name + ' ' + this.last_name,
            email: this.email,
            rol: this.rol
        };  
    }
}

export default UserDTO;