import mongoose from 'mongoose';

const emailSchema = new mongoose.Schema({
    sender: String,
    recipient: String,
    subject: String,
    body: String,
    date: {
        type: Date,
        default: Date.now
    },
    isRead: {
        type: Boolean,
        default: false
    }
});

export const Email = mongoose.model('Email', emailSchema);  // Named export
