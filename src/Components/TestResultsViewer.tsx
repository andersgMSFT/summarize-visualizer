import React, { useState } from "react";
import { TestResult } from "../model/InputDataModel";
import TestResultCard from "./TestResultCard";

import "./TestResultsViewer.css";
import TestResultsListControl from "./TestResultsListControl";

interface ITestResultsViewerProps {
  results: TestResult[];
}

const TestResultsViewer: React.FC<ITestResultsViewerProps> = (
  props: ITestResultsViewerProps
) => {
  const { results } = props;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    console.log("Clicked item index:", index); // Debugging line
    setSelectedIndex(index);
  };

  return (
    <>
      <TestResultsListControl results={results} openCard={handleItemClick} />
      {selectedIndex !== null && (
        <div className="test-result-card-container">
          <TestResultCard
            result={results[selectedIndex]}
            closeCard={() => setSelectedIndex(null)}
          />
        </div>
      )}
    </>
  );
};

export default TestResultsViewer;
