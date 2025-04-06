import axiosInstance from "../api/axiosInstance";

export const createProject = async ({ title, description, joinCode }) => {
  const response = await axiosInstance.post("/projects", {
    title,
    description,
    joinCode,
    tags: [],
  });

  return response.data;
};
