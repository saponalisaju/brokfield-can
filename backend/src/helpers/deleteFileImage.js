const fs = require("fs").promises;

exports.deleteImage = async (userImagePath) => {
  try {
    await fs.access(userImagePath);
    await fs.unlink(userImagePath);
    console.log(" image delete successfully");
  } catch (error) {
    if (error.code === "ENOENT") {
      console.error("image does not exist");
    } else {
      console.error("Error deleting image", error.message);
    }
    throw error;
  }
};
