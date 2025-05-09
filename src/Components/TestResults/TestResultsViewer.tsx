import React, { useState } from "react";
import { TestCase } from "../../model/InputDataModel";
import { TestCaseCard } from "./TestCaseCard";

import "./TestResultsViewer.css";
import TestCaseListControl from "./TestCaseListControl";

interface ITestResultsViewerProps {
  results: TestCase[];
}

const TestResultsViewer: React.FC<ITestResultsViewerProps> = (
  props: ITestResultsViewerProps
) => {
  const { results } = props;
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const handleItemClick = (index: number) => {
    console.log("Clicked item index:", index);
    setSelectedIndex(index);
  };

  const selectedTestCase = selectedIndex > -1 ? results[selectedIndex] : null;

  return <div className="testResultsViewer-container">
      <TestCaseListControl
        results={results}
        openCard={handleItemClick}
        isHidden={selectedTestCase !== null}
      />
      <TestCaseCard
        testCase={selectedTestCase}
      />
    </div>
};

export default TestResultsViewer;
