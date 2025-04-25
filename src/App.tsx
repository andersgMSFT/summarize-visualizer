import { useEffect, useState } from "react";
import "./App.css";
import FileUploadControl from "./Components/FileUploadControl"; // Assuming this component exists
import TestResultViewer from "./Components/TestResultsViewer"; // Assuming this component exists
import { InputData, TestResult } from "./model/InputDataModel";
import { Button } from "@fluentui/react-components";
import { ArrowRepeatAll24Filled } from "@fluentui/react-icons";
import { InputPageDataCard } from "./Components/InputPageDataCard";

enum AppState {
  WaitingForUpload = "waitingforupload",
  VisualizeData = "visualizedata",
  ShowPageData = "showpagedata",
  Error = "error",
}

function App() {
  const [parsedData, setParsedData] = useState<TestResult[]>([]);
  const [pageData, setPageData] = useState<InputData>({} as InputData);
  const [appState, setAppState] = useState<AppState>(AppState.WaitingForUpload);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleFileUploadSuccess(data: any) {
    setParsedData(data);
    setAppState(AppState.VisualizeData);
  }

  function unloadTestData() {
    setParsedData([]);
    setAppState(AppState.WaitingForUpload);
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

  return (
    <>
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          padding: "10px",
        }}
      >
        {appState === AppState.VisualizeData && parsedData.length > 0 && (
          <Button
            size="large"
            icon={<ArrowRepeatAll24Filled />}
            onClick={unloadTestData}
          />
        )}
        <h1
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            margin: 0,
          }}
        >
          Find Insights Test Result Viewer
        </h1>
      </div>
      {renderContent(appState, parsedData, pageData, handleFileUploadSuccess)}
    </>
  );
}

function renderContent(
  appState: AppState,
  parsedData: TestResult[] | null,
  pageData: InputData | null,
  setParsedData: (data: TestResult[]) => void
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
