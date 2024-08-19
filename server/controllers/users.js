import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllUser = async(req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSearchUser = async (req, res) => {
  try {
    let keyword = {};
    const search = req.query.search;

    if (search && search.trim() !== "") {
      keyword = {
        $or: [
          { userName: { $regex: search, $options: "i" } },
          { displayName: { $regex: search, $options: "i" } },
        ],
      };
    }

    const users = await User.find({ keyword });

    res.status(200).json(users);
  } catch (err) {
    console.error("Error in getSearchUser:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};



export const getUserFriends = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    const friends = await Promise.all(
      user.following.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, userName, displayName, picturePath, follower, following }) => {
        return { _id, userName, displayName, picturePath, follower, following };
      }
    );
    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
  try {
    const { id, friendId } = req.params;
    const user = await User.findById(id);
    const following = await User.findById(friendId);

    if (user.following.includes(friendId)) {
      user.following = user.following.filter((id) => id !== friendId);
      following.following = following.following.filter((id) => id !== id);
    } else {
      user.following.push(friendId);
      following.following.push(id);
    }
    await user.save();
    await following.save();

    const friends = await Promise.all(
      user.following.map((id) => User.findById(id))
    );
    const formattedFriends = friends.map(
      ({ _id, userName, displayName, picturePath, follower, following }) => {
        return { _id, userName, displayName, picturePath, follower, following };
      }
    );

    res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
