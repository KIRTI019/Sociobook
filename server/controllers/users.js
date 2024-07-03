import User from "../models/User.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getSearchUser = async (req, res) => {
  try {
      const { query } = req.query.query.toLowerCase();
      const filteredUsers = await User.find({
        $or: [
          { userName: { $regex: query, $options: 'i' } }, 
          { displayName: { $regex: query, $options: 'i' } },
        ],
      });

      const formattedFriends = filteredUsers.map(
        ({ _id, userName, displayName, picturePath, follower, following }) => {
          return { _id, userName, displayName, picturePath, follower, following};
        }
      );
    
      res.status(200).json(formattedFriends);
  } catch (err) {
    res.status(404).json({ message: err.message });
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
        return { _id, userName, displayName, picturePath, follower, following};
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