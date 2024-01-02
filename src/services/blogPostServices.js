import axiosInstance from "../helper/auth.helper";

const blogPostServices = {
  createblogPostService: (data) => axiosInstance.post("/blogPost/add", data),
  getAllblogPostService: () => axiosInstance.get("/blogPost"),

  updateblogPostService: (data) => axiosInstance.put(`//blogPost/${data.id}`, data),
  deleteblogPostService: (data) => axiosInstance.delete(`/blogPost/${data}`),
};

export default blogPostServices;