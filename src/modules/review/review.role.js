import { roles } from "../../middelware/auth.js";

export const endPoints = {
    create:[roles.User],
    // get:[roles.Admin ,roles.User],
    // update:[roles.Admin],
    // delete:[roles.Admin],
    // getUser:[roles.User]
}