import {roles} from "../../middelware/auth.js";
export const endPoints = {
    create:[roles.Admin],
    get:[roles.Admin ,roles.User],
    active:[roles.User],
    delete:[roles.Admin],
}