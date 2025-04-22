import React from "react";
import { TestResult } from "../model/InputDataModel";
import { Display, LargeTitle } from "@fluentui/react-components";

interface TestResultCardProps {
  result: TestResult;
}

const TestResultCard: React.FC<TestResultCardProps> = ({ result }) => {
  const { scenario, input, userContext, output, evaluation, passed } = result;

  return (
    <div>
        <LargeTitle>Test Result</LargeTitle>
        <Display>Display</Display>
    </div>
  );
};

export default TestResultCard;
