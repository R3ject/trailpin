// src/cloudinaryHelpers.js
export const uploadPinPhoto = async (file) => {
    const cloudName = 'dee3oxruv'; // e.g., "mycloudname"
    const uploadPreset = 'TrailPin'; // e.g., "unsigned_preset"
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);
  
    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Cloudinary upload failed");
      }
      const data = await response.json();
      return data.secure_url; // Returns the URL of the uploaded image
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw error;
    }
  };
  