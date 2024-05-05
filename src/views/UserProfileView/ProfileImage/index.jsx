import Image from "next/image";

const ProfileImage = () => {
  return (
    <Image
      src="/static/assets/avatar.png"
      alt="logo"
      width={70}
      height={70}
    />
  );
};
export default ProfileImage;
