/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputData, Insight, ScoreEnum, TestCase, UserContext } from '../../model/InputDataModel';
import Papa from 'papaparse'

function parseTestLine(csvLine: any): TestCase {
  const { scenario: scenario, input: inputJson, userContext: userContextJson, output: outputJson, evaluation } = csvLine;
  
  const input = parseJson<InputData>(inputJson, 'InputData');
  // Fix for casing issue in the CSV file
  input.currentPageName = input.currentPageName || (input as any).CurrentPageName;
  
  const userContext = parseJson<UserContext>(userContextJson, 'UserContext');
  const insights = parseJson<Insight[]>(outputJson, 'Insight[]');
  
  // Convert ScoreEnum string values to enum values
  if (Array.isArray(insights)) {
    insights.forEach((insight) => {
      insight.Score = MapToScoreEnum(insight.Score);
    });
  }
  
  let rating = Number(csvLine['rating\r']?.trim());
  if (isNaN(rating) || rating < 0 || rating > 5) {
    console.warn(`Invalid rating value: ${rating}. Assigning default value.`);
    rating = rating < 0 ? 0 : 5;
  }
  
  return {
    scenario,
    input,
    userContext,
    output: insights,
    evaluation,
    rating,
  };
}

export function parseTestResult(csvFile: string): TestCase[] {
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

// NOTE: Not used in this version
function MapToScoreEnum (value: string | number): ScoreEnum {
  if (typeof value === 'number') {
    return value as ScoreEnum;
  }
  
  const map: Record<string, ScoreEnum> = {
    "very low": ScoreEnum.VeryLow,
    "low": ScoreEnum.Low,
    "medium": ScoreEnum.Medium,
    "high": ScoreEnum.High,
    "very high": ScoreEnum.VeryHigh,
  };
  
  return map[value.toLowerCase()];
};

function parseJson<T>(jsonString: string, typeName: string): T {
  try {
    return JSON.parse(jsonString) as T;
  } catch (error) {
    console.error(`Error parsing ${typeName}:`, error);
    throw new Error(`Failed to parse ${typeName}`);
  }
}