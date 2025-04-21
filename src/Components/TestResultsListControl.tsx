import React, { useState } from "react";
import {
  List,
  ListItem,
  Dialog,
  DialogSurface,
  DialogBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogTrigger,
  Button,
} from "@fluentui/react-components";
import { TestResult } from "../model/InputDataModel";
import TestResultCard from "./TestResultCard"; // Make sure this exists

interface ITestResultsListControlProps {
  results: TestResult[];
}

const TestResultsListControl: React.FC<ITestResultsListControlProps> = ({ results }) => {
  const [selectedResult, setSelectedResult] = useState<TestResult | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleItemClick = (result: TestResult) => { 
    console.log("Clicked item:", result); // Debugging line
    setSelectedResult(result);
    setDialogOpen(true);
  };

  return (
    <>
      <List>
        {results.map((result, index) => (
          <ListItem
            key={index}
            style={styles.listItem}
            onClick={() => handleItemClick(result)}
          >
            <div style={styles.row}>
              <div style={styles.start}>
                {index + 1}. {result.input.currentPageName} ({result.userContext.UserProfileSettings.ProfileCaption})
              </div>
              <div style={styles.middle}>- {result.scenario}</div>
              <div style={styles.end}>{result.passed ? "✅ Passed" : "❌ Failed"}</div>
            </div>
          </ListItem>
        ))}
      </List>
      {selectedResult && <div>
        <TestResultCard result={selectedResult} />
        </div>
        }
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
