export const uploadImageToCloudinary = async (file: File) => {
    const CLOUDINARY_UPLOAD_URL =
      "https://api.cloudinary.com/v1_1/dl0qa9k1r/image/upload";
    const CLOUDINARY_UPLOAD_PRESET = "moveo123";
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
  
    const response = await fetch(CLOUDINARY_UPLOAD_URL, {
      method: "POST",
      body: formData,
    });
  
    const data = await response.json();
    return data.secure_url;
  };