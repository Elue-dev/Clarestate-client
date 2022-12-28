export const protectVerify = (userID: string | undefined) => {
  if (userID?.length !== 24) {
    location.assign("/auth/login");
  }
};
