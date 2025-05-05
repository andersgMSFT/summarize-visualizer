/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputData, Insight, TestCase, UserContext } from '../../model/InputDataModel';
import Papa from 'papaparse'

export function parseTestResult(csvFile: string): TestCase[] {
  const result = Papa.parse(csvFile, {
    delimiter: ';',
    newline: '\n',
    header: true,
    skipEmptyLines: true
  });

  console.log('Parsed lines: ', result);

  result.errors.forEach((error) => {
    console.error('Error parsing line:', error);
    throw new Error(`Error parsing line: ${error.message}`);
  });

  return result.data.map(parseTestLine);
}

function parseTestLine(csvLine: any): TestCase {
  const { scenario: scenario, input: inputJson, userContext: userContextJson, output: outputJson, evaluation } = csvLine;
  
  const input: InputData = parseInput(inputJson);
  const insights: Insight[] = parseInsights(outputJson);
  const userContext: UserContext = parseJson<UserContext>(userContextJson, 'UserContext');
  const rating = parseRating(csvLine);

  return {
    scenario,
    input,
    userContext,
    output: insights,
    evaluation,
    rating,
  };
}

function parseRating(csvLine: any) {
  let rating = Number(csvLine['rating\r']?.trim());
  if (isNaN(rating) || rating < 0 || rating > 5) {
    console.warn(`Invalid rating value: ${rating}. Assigning default value.`);
    rating = rating < 0 ? 0 : 5;
  }
  return rating;
}

function parseInput(inputJson: any) {
  const input = parseJson<InputData>(inputJson, 'InputData');
  // Fix for casing issue in the CSV file
  input.currentPageName = input.currentPageName || (input as any).CurrentPageName;
  return input;
}

function parseInsights(outputJson: any) {
  let insights: Insight[] = [];
  try {
    insights = parseJson<Insight[]>(outputJson, 'Insight[]');
    if (!insights || !(insights.length > 0)) {
      throw new Error('No insights found in the output JSON.');
    }
  }
  catch {
    console.warn(`Error parsing output JSON: ${outputJson}. Assigning default value.`);
    insights = [{
      SourceId: 0,
      Score: 0,
      Value: !outputJson || outputJson.trim() === '' ? 'No insight could be generated' : outputJson,
      Description: 'N/A',
      Source: 'N/A',
      SourceContext: 'N/A',
    }];
  }
  return insights;
}

function parseJson<T>(jsonString: string, typeName: string): T {
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.error(`Error parsing ${typeName}:`, error);
    throw new Error(`Failed to parse ${typeName}`);
  }
}