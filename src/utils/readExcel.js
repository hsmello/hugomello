import * as XLSX from 'xlsx';

/**
 * Reads an Excel file from the public folder and returns JSON.
 * @param {string} filePath - Path relative to public folder, e.g. "/data/projects_financial_data.xlsx"
 * @returns {Promise<Array<Object>>} - Parsed rows as objects
 */
export const readExcelFile = async (filePath) => {
  try {
    // Fetch the Excel file from the public folder
    const url = process.env.PUBLIC_URL + filePath;
    const response = await fetch(url);

    if (!response.ok) {
      console.error(`Failed to fetch Excel file. Status: ${response.status}`);
      return [];
    }

    const arrayBuffer = await response.arrayBuffer();

    // Read workbook
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });

    // Get the first sheet
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Convert sheet to JSON
    const data = XLSX.utils.sheet_to_json(worksheet);

    console.log(`Fetched ${data.length} rows from Excel`); // Debug info
    return data;
  } catch (error) {
    console.error('Error reading Excel file:', error);
    return [];
  }
};
