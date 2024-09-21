
import { useState } from "react";
import Tesseract from "tesseract.js";

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
      const { data } = await Tesseract.recognize(previewImage, "eng");
      console.log("Recognized text:", data.text);

      // Extract the name and ID from the recognized text
      const nameRegex = /al\.\s(\w+\s\w+)/;
      const idRegex = /(\d{4}\s\d{4}\s\d{4}\s\d{4})/;
      const nameMatch = data.text.match(nameRegex);
      const idMatch = data.text.match(idRegex);

      console.log("Name match:", nameMatch);
      console.log("ID match:", idMatch);

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
