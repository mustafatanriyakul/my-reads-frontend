import axiosInstance from "./axiosInstance";

export const addToMyBooks = async (bookId, status, onSuccess) => {
  try {
    const response = await axiosInstance.post("/mybooks/add", {
      bookId,
      status,
    });

    if (response.data.message === "Book added.") {
      alert(response.data.message);
      if (onSuccess) onSuccess(bookId, status);
    }
  } catch (error) {
    console.log(error);
    alert(error.response.data.message);
  }
};

export const updateBookStatus = async (bookId, status, onSuccess) => {
  try {
    const response = await axiosInstance.post("/mybooks/update", {
      bookId,
      status,
    });

    if (response.data.message === "Book status changed.") {
      if (onSuccess) onSuccess(bookId, status);
    }
  } catch (error) {
    console.log(error);
    alert(error.response.data.message);
  }
}
export const formatStatus = (status) => {
    switch (status) {
      case "TO_READ":
        return "want to read";
      case "CURRENTLY_READING":
        return "currently reading";
      case "READ":
        return "read";

      default:
        return status;
    }
  };
;
