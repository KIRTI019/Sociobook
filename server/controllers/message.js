import Message from "../models/Message.js";

export const getMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    const messages = await Message.find({
      $or: [
        { sender: senderId, receiver: receiverId },
        { sender: receiverId, receiver: senderId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { sender, receiver, content } = req.body;

    const message = new Message({
      sender,
      receiver,
      content,
    });

    const savedMessage = await message.save();

    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
