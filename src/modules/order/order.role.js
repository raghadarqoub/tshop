import { roles } from "../../middelware/auth.js";

export const endpoints = {
    create: [roles.User],
    all : [roles.Admin],
    getOrder: [roles.User],
    changeStatus: [roles.Admin]
}