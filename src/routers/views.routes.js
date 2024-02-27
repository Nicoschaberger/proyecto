import { Router } from "express";

import { getViewProduct, getViews } from "../controllers/views.controller.js";

const viewsRouters = Router();

viewsRouters.get('/', getViews);

viewsRouters.get('/products', getViewProduct);

export default viewsRouters;