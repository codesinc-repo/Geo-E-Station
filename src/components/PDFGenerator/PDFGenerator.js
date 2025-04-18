// In PDFGenerator.jsx
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { jsPDF } from "jspdf";

const PDFGenerator = ({ companyDetails, selectedProperty }) => {
  const [language, setLanguage] = useState("en"); // Set default language as English

  const generatePDF = () => {
    const { logo, name, address, phone, email } = companyDetails;
    const { titulo, descripcion, foto } = selectedProperty;

    const doc = new jsPDF();

    // Add Property Information
    doc.setFontSize(16);
    doc.text(language === "en" ? "Property Title" : "Título de la propiedad", 10, 10);
    doc.setFontSize(12);
    doc.text(titulo || (language === "en" ? "No Title Available" : "No hay título disponible"), 10, 20);
    doc.setFontSize(12);
    doc.text(descripcion || (language === "en" ? "No Description Available" : "No hay descripción disponible"), 10, 30);

    // Add Company Details
    doc.setFontSize(14);
    doc.text(language === "en" ? "Company Information" : "Información de la empresa", 10, 40);
    doc.text(`${language === "en" ? "Name" : "Nombre"}: ${name}`, 10, 50);
    doc.text(`${language === "en" ? "Address" : "Dirección"}: ${address}`, 10, 60);
    doc.text(`${language === "en" ? "Phone" : "Teléfono"}: ${phone}`, 10, 70);
    doc.text(`${language === "en" ? "Email" : "Correo electrónico"}: ${email}`, 10, 80);

    // Add Company Logo if Provided
    if (logo) {
      const logoImage = URL.createObjectURL(logo);
      doc.addImage(logoImage, "JPEG", 10, 90, 40, 40);
    }

    // Add Property Image if Provided
    if (foto) {
      doc.addImage(foto, "JPEG", 10, 130, 100, 100);
    }

    doc.save(`${titulo || "property"}.pdf`);
  };

  return (
    <div>
      <Button onClick={generatePDF}>{language === "en" ? "Generate PDF" : "Generar PDF"}</Button>
      <Button onClick={() => setLanguage(language === "en" ? "es" : "en")}>
        {language === "en" ? "Switch to Spanish" : "Cambiar a inglés"}
      </Button>
    </div>
  );
};

export default PDFGenerator; // Ensure it's the default export
