import { useEffect, useState } from "react";
import "./App.css";
import { FileUploadControl, IFileUploadResult } from "./Components/FileUpload/FileUploadControl"; // Assuming this component exists
import TestResultViewer from "./Components/TestResults/TestResultsViewer"; // Assuming this component exists
import { InputData, TestCase } from "./model/InputDataModel";
import { Button } from "@fluentui/react-components";
import {
  ArrowRepeatAll24Filled,
  DocumentCheckmarkRegular,
} from "@fluentui/react-icons";
import { InputPageDataCard } from "./Components/InputDataCard/InputPageDataCard";
import TestSummaryCard from "./Components/TestSummary/TestSummaryCard";

enum AppState {
  WaitingForUpload = "waitingforupload",
  VisualizeData = "visualizedata",
  ShowPageData = "showpagedata",
  Error = "error",
}

function App() {
  const [parsedData, setParsedData] = useState<IFileUploadResult>({});
  const [pageData, setPageData] = useState<InputData>({} as InputData);
  const [appState, setAppState] = useState<AppState>(AppState.WaitingForUpload);

  const [showSummary, setShowSummary] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleFileUploadSuccess(data: any) {
    setParsedData(data);
    setAppState(AppState.VisualizeData);
    showScoreCard();
  }

  function unloadTestData() {
    setParsedData({});
    setAppState(AppState.WaitingForUpload);
  }

  function showScoreCard() {
    setShowSummary(true);
  }

  function initializePageData() {
    if (appState === AppState.ShowPageData) {
      return;
    }

    const storedData = localStorage.getItem("documentData");
    if (storedData) {
      try {
        localStorage.removeItem("documentData");
        const parsedData = JSON.parse(storedData) as InputData;
        setPageData(parsedData);
        setAppState(AppState.ShowPageData);
      } catch (error) {
        console.error("Failed to parse documentData from localStorage:", error);
      }
    }
  }

  useEffect(() => {
    initializePageData();
  });

  if (appState === AppState.ShowPageData) {
    return <InputPageDataCard pageData={pageData!} />;
  }

  const isDataLoaded = parsedData.result && parsedData.result.length > 0;
  const testCases = parsedData.result || [];
  const testName = parsedData.fileName;

  return (
    <>
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px",
        }}
      >
        <Button
          size="large"
          icon={<ArrowRepeatAll24Filled />}
          onClick={unloadTestData}
          disabled={!isDataLoaded}
          title={isDataLoaded ? "Unload test data" : "No test data loaded"}
        />
        <h1 style={{ margin: 0 }}>Find Insights Test Result Viewer</h1>
        <Button
          size="large"
          icon={<DocumentCheckmarkRegular />}
          onClick={showScoreCard}
          disabled={!isDataLoaded}
          title={isDataLoaded ? "Show test summary" : "No test data loaded"}
        >
          See test summary
        </Button>
      </div>
      {renderContent(appState, testCases, handleFileUploadSuccess)}
      {renderTestSummary(showSummary, testCases, testName!, setShowSummary)}
    </>
  );
}

function renderTestSummary(
  showSummary: boolean,
  parsedData: TestCase[] | null,
  testName: string,
  setShowSummary: (show: boolean) => void,
){
  if (!showSummary || !parsedData) {
    return null;
  }

  return <TestSummaryCard testName={testName} result={parsedData} closeCard={() => setShowSummary(false)}/>;
}

function renderContent(
  appState: AppState,
  parsedData: TestCase[] | null,
  setParsedData: (data: IFileUploadResult) => void
) {
  switch (appState) {
    case AppState.WaitingForUpload:
      return <FileUploadControl setParsedData={setParsedData} />;
    case AppState.VisualizeData:
      return <TestResultViewer results={parsedData!} />;
    case AppState.Error:
      return (
        <p style={{ color: "red" }}>
          An error occurred while processing the data.
        </p>
      );
    default:
      return null;
  }
}

export default App;
