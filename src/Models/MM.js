import { useState } from "react";
import Tesseract from "tesseract.js";

const ImageScanner = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [formFields, setFormFields] = useState({});
  const [isScanning, setIsScanning] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setPreviewImage(file);
  };

  const handleScan = async () => {
    setIsScanning(true);
    setError(null);

    try {
      const worker = await Tesseract.createWorker();

      try {

        const { data } = await worker.recognize(previewImage);
        console.log("Recognized data:", data);

        // Extract the relevant information from the recognized text
        const extractedFormFields = extractFormFieldsFromText(data.paragraphs);
        setFormFields(extractedFormFields);
      } catch (recognizeError) {
        console.error("Error extracting text:", recognizeError);
        setFormFields({});
        setError(recognizeError);
        await worker.terminate();
      }
    } catch (workerError) {
      console.error("Error setting up Tesseract worker:", workerError);
      setFormFields({});
      setError(workerError);
    } finally {
      setIsScanning(false);
    }
  };

  const extractFormFieldsFromText = (paragraphs) => {
    const formFields = {
      fieldNames: [],
      fieldValues: []
    };
  
    for (const paragraph of paragraphs) {
      const text = paragraph.text;
  
      // Extract the relevant information from the text
      const fieldMatches = text.match(/(\w+)\s*:\s*(.+)/g);
      console.log('fieldMatches')
      console.log(fieldMatches)
      if (fieldMatches) {
        for (const match of fieldMatches) {
          const [fieldName, fieldValue] = match.split(/:(.+)/);
          formFields.fieldNames.push(fieldName.trim());
          formFields.fieldValues.push(fieldValue.trim());
        }
      }
    }
  
    console.log(formFields)
    return formFields;
  };

  return (
    <div>
      <h1>Image Scanner</h1>

      <input type="file" onChange={handleImageUpload} />
      {previewImage && <img src={URL.createObjectURL(previewImage)} alt="Preview" />}

      <button onClick={handleScan} disabled={!previewImage || isScanning}>
        {isScanning ? "Scanning..." : "Scan"}
      </button>

      {error && (
        <div style={{ color: "red", marginTop: "1rem" }}>
          Error: {error.message}
        </div>
      )}

{formFields.length > 0 && (
  <div>
    {formFields.map((field, index) => {
      const [key, value] = Object.entries(field)[0];
      return (
        <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span style={{ marginRight: '0.5rem' }}>{key}:</span>
          <input
            type="text"
            id={`${key}Value`}
            defaultValue={value}
            style={{ border: "1px solid #ccc", padding: "0.5rem", flex: '1' }}
            readOnly
          />
        </div>
      );
    })}
  </div>
)}
    </div>
  );
};

export default ImageScanner;