import express from "express";
const router = express.Router();
import auth from "../middleware/auth.js";

import {
  createItem,
  getItems,
  getItem,
  getItemByUser,
  updateItem,
} from "../controllers/item.js";

router.post("/", auth, createItem);
router.get("/", getItems);
router.get("/:id", getItem);
router.patch("/:id", auth, updateItem);
router.get("/userItems/:id", auth, getItemByUser);


export default router;
