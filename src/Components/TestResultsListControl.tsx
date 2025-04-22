import React, { useState } from "react";
import { List, ListItem } from "@fluentui/react-components";
import { TestResult } from "../model/InputDataModel";
import TestResultCard from "./TestResultCard";

import "./TestResultsListControl.css";

interface ITestResultsListControlProps {
  results: TestResult[];
}

const TestResultsListControl: React.FC<ITestResultsListControlProps> = ({
  results,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleItemClick = (index: number) => {
    console.log("Clicked item index:", index); // Debugging line
    setSelectedIndex(index);
  };

  return (
    <>
      <List className="test-results-list">
      {results.map((result, index) => (
        <ListItem
        key={index}
        style={styles.listItem}
        onClick={() => handleItemClick(index)}
        className={
          selectedIndex === index ? "selected" : ""
        }
        >
        <div style={styles.row}>
          <div style={styles.start}>
          {index + 1}. {result.input.currentPageName} (
          {result.userContext.UserProfileSettings.ProfileCaption})
          </div>
          <div style={styles.middle}>- {result.scenario}</div>
          <div style={styles.end}>
          {result.passed ? "✅ Passed" : "❌ Failed"}
          </div>
        </div>
        </ListItem>
      ))}
      </List>
      {selectedIndex !== null && (
      <div className="test-result-card-container">
        <button
        onClick={() => setSelectedIndex(null)}
        style={{ marginBottom: "1rem" }}
        >
        Hide
        </button>
        <TestResultCard result={results[selectedIndex]} />
      </div>
      )}
    </>
  );
};

export default TestResultsListControl;

const styles = {
  row: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    gap: "1rem",
  },
  listItem: {
    cursor: "pointer",
    transition: "background 0.2s",
    borderRadius: "4px",
    padding: "0.5rem",
    marginBottom: "0.2rem",
    userSelect: "none",
  },
  start: {
    width: "20rem",
    textAlign: "left" as const,
  },
  middle: {
    flex: 1,
    textAlign: "left" as const,
  },
  end: {
    minWidth: "6rem",
    textAlign: "right" as const,
  },
};
