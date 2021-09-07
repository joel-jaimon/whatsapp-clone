export const mockAPI = (success: any, timeout: any, data: any) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve(data);
      } else {
        reject({ message: "Error" });
      }
    }, timeout);
  });
};
