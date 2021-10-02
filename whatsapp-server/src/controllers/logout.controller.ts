export const logout = async (_: any, res: any) => {
  res.clearCookie("wc_RTN");
  res.status(200).json({
    hi: "Thanks for testing...!",
  });
};
