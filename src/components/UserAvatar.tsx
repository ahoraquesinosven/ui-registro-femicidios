import Avatar from "@mui/material/Avatar";

export type UserAvatarProps = {
  user: {
    pictureUrl: string,
    name: string,
  },
  showName: boolean | null,
}

export default function UserAvatar({user, showName}: UserAvatarProps) {
  return (
    <>
      <Avatar
        src={user.pictureUrl}
        alt={user.name}
        sx={{
          width: "2em",
          height: "2em",
        }}
      />
      {showName && (
        <span style={{ margin: '0.5em' }}>{user.name}</span>
      )}
    </>
  );
}
