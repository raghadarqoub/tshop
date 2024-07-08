import { roles } from "../../middelware/auth.js";

export const endPoints = {
    getUsers:[roles.Admin],
    userData:[roles.Admin ,roles.User],
    // active:[roles.User],
    // delete:[roles.Admin],
}