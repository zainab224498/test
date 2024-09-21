import { useState } from "react";
import { Storage } from "@google-cloud/storage";
import { Vision } from "@google-cloud/vision";

const ImageScanner = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [nameValue, setNameValue] = useState("");
  const [idValue, setIdValue] = useState("");
  const [isScanning, setIsScanning] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setPreviewImage(URL.createObjectURL(file));
  };

  const handleScan = async () => {
    setIsScanning(true);
    try {
      // Upload the image to Google Cloud Storage
      const storage = new Storage({ projectId: "your-project-id" });
      const bucket = storage.bucket("your-bucket-name");
      const blob = bucket.file(`image-${Date.now()}.jpg`);
      await blob.save(await fetch(previewImage).then((res) => res.arrayBuffer()));

      // Use the Google Cloud Vision API to extract text from the image
      const vision = new Vision({ projectId: "your-project-id" });
      const [result] = await vision.detectText(blob.name);
      const textAnnotations = result.textAnnotations;

      // Extract the name and ID from the recognized text
      const nameRegex = /al\.\s(\w+\s\w+)/;
      const idRegex = /(\d{4}\s\d{4}\s\d{4}\s\d{4})/;
      const nameMatch = textAnnotations[0].description.match(nameRegex);
      const idMatch = textAnnotations[0].description.match(idRegex);

      const extractedName = nameMatch ? nameMatch[1] : "";
      const extractedId = idMatch ? idMatch[1] : "";

      setNameValue(extractedName);
      setIdValue(extractedId);
    } catch (error) {
      console.error("Error extracting text:", error);
      setNameValue("");
      setIdValue("");
    } finally {
      setIsScanning(false);
    }
  };

  // The rest of the component remains the same as before

  return (
    <div>
      <h1>Image Scanner</h1>

      <input type="file" onChange={handleImageUpload} />
      {previewImage && <img src={previewImage} alt="Preview" />}

      <button onClick={handleScan} disabled={!previewImage || isScanning}>
        {isScanning ? "Scanning..." : "Scan"}
      </button>

      <div>
        <label htmlFor="nameValue">Name:</label>
        <input
          type="text"
          id="nameValue"
          value={nameValue}
          style={{ border: "1px solid #ccc", padding: "0.5rem" }}
          readOnly
        />
      </div>

      <div>
        <label htmlFor="idValue">ID:</label>
        <input
          type="text"
          id="idValue"
          value={idValue}
          style={{ border: "1px solid #ccc", padding: "0.5rem" }}
          readOnly
        />
      </div>
    </div>
  );
};

export default ImageScanner;