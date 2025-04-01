import React from "react";
import { Avatar, Stack, Typography } from "@mui/material";
import { orange } from "@mui/material/colors";

const UserAvatar: React.FC = () => {
  const user = JSON.parse(sessionStorage.getItem("user") || "null");

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Avatar sx={{ bgcolor: orange[600], width: 40, height: 40 }}>
        {(user?.firstName || " ")[0]}{(user?.lastName || " ")[0]}
      </Avatar>
      <Typography variant="body1" sx={{ fontWeight: 600, color: "white" }}>
        {user?.firstName} {user?.lastName}
      </Typography>
    </Stack>
  );
};

export default UserAvatar;