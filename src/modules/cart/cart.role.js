import {roles} from '../../middelware/auth.js';
export const endPoints = {
    create:[roles.User],
    get:[roles.User],
    updateQuantity:[roles.User],
    delete:[roles.User],
}