import React, { useState } from "react";
import { TestCase } from "../../model/InputDataModel";
import TestCaseCard from "./TestCaseCard";

import "./TestResultsViewer.css";
import TestCaseListControl from "./TestCaseListControl";

interface ITestResultsViewerProps {
  results: TestCase[];
}

const TestResultsViewer: React.FC<ITestResultsViewerProps> = (
  props: ITestResultsViewerProps
) => {
  const { results } = props;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    console.log("Clicked item index:", index);
    setSelectedIndex(index);
  };

  const showCard =
    selectedIndex !== null &&
    selectedIndex >= 0 &&
    selectedIndex < results.length;

  return (
    <>
      <TestCaseListControl
        results={results}
        openCard={handleItemClick}
        isHidden={showCard}
      />
      {showCard && (
        <TestCaseCard
          result={results[selectedIndex]}
          closeCard={() => setSelectedIndex(null)}
        />
      )}
    </>
  );
};

export default TestResultsViewer;
