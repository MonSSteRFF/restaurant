export const checkProcessEnv = () => {
  const config = [
    process.env.JWT_SECRET_ACCESS_CODE,
    process.env.JWT_SECRET_REFRESH_CODE,
    process.env.CREATE_ADMIN_SECRET_KEY,
    process.env.DATABASE_URL,
  ];

  config.forEach((variable) => {
    if (variable === null || variable === undefined || variable === '') {
      throw new Error(`variable ${variable} has null or undefined or ''`);
    }
  });
};
