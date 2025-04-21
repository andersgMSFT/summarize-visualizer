import { useState } from 'react';
import './App.css';
import TestResultsListControl from './Components/TestResultsListControl';
import FileUploadControl from './Components/FileUploadControl'; // Assuming this component exists
import { TestResult } from './model/InputDataModel';

enum AppState {
  WaitingForUpload = 'waitingforupload',
  VisualizeData = 'visualizedata',
  Error = 'error',
}

function App() {
  const [parsedData, setParsedData] = useState<any>(null);
  const [appState, setAppState] = useState<AppState>(AppState.WaitingForUpload);
  
  function handleFileUploadSuccess(data: any) {
    setParsedData(data);
    setAppState(AppState.VisualizeData);
  }

  return (
    <>
      <h1>Find Insights Test Result Viewer</h1>
      {renderContent(appState, parsedData, handleFileUploadSuccess)}
    </>
  );
 }

function renderContent(
  appState: AppState,
  parsedData: TestResult[] | null,
  setParsedData: (data: TestResult[]) => void,
) {

  switch (appState) {
    case AppState.WaitingForUpload:
      return <FileUploadControl setParsedData={setParsedData} />;
    case AppState.VisualizeData:
      return <TestResultsListControl results={parsedData!} />;
    case AppState.Error:
      return <p style={{ color: 'red' }}>An error occurred while processing the data.</p>;
    default:
      return null;
  }
}

export default App;
