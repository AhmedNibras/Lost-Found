import mongoose from "mongoose";
import itemModal from "../models/item.js";

export const createItem = async (req, res) => {
  const item = req.body;
  const newItem = new itemModal({
    ...item,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

  try {
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getItems = async (req, res) => {
  try {
    const items = await itemModal.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getItem = async (req, res) => {
  const { id } = req.params;
  try {
    const item = await itemModal.findById(id);
    res.status(200).json(item);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};

export const getItemByUser = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({message: "User does not exist"})
    }
    const userItems = await itemModal.find({creator: id});
    res.status(200).json(userItems);
}


export const updateItem = async (req, res) => {
  const { id } = req.params;
  const { title, description, creator, imageFile, tags } = req.body;

  try {
    if(!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({message: `No tour exist with id: ${id}`})
  }
  const updatedItem = {
    creator,
    title,
    description,
    tags,
    imageFile,
    _id: id,
  }
  await itemModal.findByIdAndUpdate(id, updatedItem, {new: true});
  res.json(updatedItem);
  } catch (error) {
    res.status(404).json({ message: "Something went wrong" });
  }
};