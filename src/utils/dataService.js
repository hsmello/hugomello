import { readExcelFile } from './readExcel';

/**
 * Fetch financial data
 */
export const getFinancialData = async () => {
  return await readExcelFile('/data/projects_financial_data.xlsx');
};