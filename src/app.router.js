import connectDB from '../DB/connection.js';
import categoriesRouter from './modules/category/category.router.js';
import subcategoriesRouter from './modules/subcategory/subcategory.router.js';
import productRouter from './modules/product/product.router.js';
import authtRouter from './modules/auth/auth.router.js';
import cartRouter from './modules/cart/cart.router.js';
import cors from 'cors';
const initApp =(app , express) => {
    connectDB ();
    app.use(cors());
    app.use(express.json());
    app.get('/', (req, res) => {
        return res.status(200).json({ message: "success" });
    })
    app.use('/auth', authtRouter);
    app.use('/categories', categoriesRouter);
    app.use('/subcategories', subcategoriesRouter);
    app.use('/products', productRouter);
    app.use('/cart', cartRouter);
    app.use('*', (req, res) => {
        return res.status(404).json({ message: "page not found" });
    })
}

export default initApp;