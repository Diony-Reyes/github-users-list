const GITHUB_TOKEN = "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";

export const baseUrl = "https://api.github.com";

export const path = {
  users: "/users",
  following: "/following",
};

export const getUsers = async (): Promise<User[]> => {
  try {
    const urlToUse = `${baseUrl}${path.users}`;

    const response = await fetch(urlToUse, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("getUsers error: ", error);
    return error;
  }
};

export const getAUser = async (username: string): Promise<UserDetail> => {
  try {
    const urlToUse = `${baseUrl}${path.users}/${username}`;

    const response = await fetch(urlToUse, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${GITHUB_TOKEN}`,
      },
    });

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("getAUser error: ", error);
    return error;
  }
};
