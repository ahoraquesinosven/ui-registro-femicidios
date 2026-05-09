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
    <img 
      src={user.pictureUrl}
      style={{
        width: "2em",
        height: "2em",
        borderRadius: "50%",
      }}
    />
      { showName && (
        <span className="ms-2 align-middle">{user.name}</span>
      )}
    </>
  )
}
