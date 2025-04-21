import { TestResult } from '../model/InputDataModel';
import Papa from 'papaparse'

function parseTestLine(csvLine: any): TestResult {
  const { scenario: scenario, input: inputJson, userContext: userContextJson, output: outputJson, evaluation } = csvLine;

  const input = JSON.parse(inputJson);
  const userContext = JSON.parse(userContextJson);
  const output = JSON.parse(outputJson);
  const passed = csvLine['passed\r']?.trim().toLowerCase() === 'true';

  return {
    scenario,
    input,
    userContext,
    output,
    evaluation,
    passed,
  };
}

export function parseTestResult(csvFile: string): TestResult[] {
  const result = Papa.parse(csvFile, {
    delimiter: ';',
    newline: '\n',
    header: true,
    skipEmptyLines: true
  });

  console.log('Parsed lines: ', result); // Debugging line

  result.errors.forEach((error) => {
    console.error('Error parsing line:', error); // Log parsing errors
    throw new Error(`Error parsing line: ${error.message}`);
  });

  return result.data.map(parseTestLine);
}
