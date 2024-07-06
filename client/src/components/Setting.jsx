import { Box, Paper, Stack, Typography, Divider} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "../redux/authSlice";

const Setting = ({ postId, friendId }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const isFriend = user.following.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    const response = await fetch(
      `http://localhost:3001/users/${user._id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    dispatch(setFriends({ following: data }));
  };

  return (
    <Box position="fixed">
      <Paper
        sx={{
          width: "400px",
          height: "285px",
        }}
      >
        <Stack
          spacing={2}
          textAlign="center"
          p="1rem 0"
          sx={{
            cursor: "pointer",
          }}
        >
          {isFriend ? (
            <>
              <Typography onClick={() => patchFriend()}>Unfollow</Typography>
            </>
          ) : (
            <>
              <Typography>Not Interested</Typography>
            </>
          )}
          <Divider />
          <Typography>Add To Favourite</Typography>
          <Divider />
          <Typography onClick={() => navigate(`${postId}`)}>
            Go To Post
          </Typography>
          <Divider />
          <Typography>Share To</Typography>
          <Divider />
          <Typography>Copy Link</Typography>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Setting;
