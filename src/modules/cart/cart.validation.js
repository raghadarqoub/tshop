import Joi from "joi";

export const creatCartSchema=Joi.object({
    productId: Joi.string().hex().length(24),
});
