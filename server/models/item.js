import mongoose from "mongoose"

const itemSchema = mongoose.Schema({
    title: String,
    description: String,
    name: String,
    creator: String,
    tags: [String],
    imageFile: String,
    createdAt: {
        type: Date,
        default: new Date(),
    },
    // likeCount: {
    //     type: Number,
    //     default: 0,
    // },
});

const itemModal = mongoose.model("Item", itemSchema);

export default itemModal;
