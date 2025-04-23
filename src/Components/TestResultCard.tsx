import React from "react";
import { TestResult } from "../model/InputDataModel";
import {
  Text,
} from "@fluentui/react-components";

import Markdown from "react-markdown";
import { InsightsListControl } from "./InsightsListControl";

interface TestResultCardProps {
  result: TestResult;
}

const TestResultCard: React.FC<TestResultCardProps> = ({ result }) => {
  const { scenario, input, userContext, output, evaluation, passed } = result;

  let cardStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginBottom: "20px",
    width: "80vw",
    height: "80vh",
    backgroundColor: "#242424",
  };

  return (
    <div style={cardStyle}>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <Text style={{ color: "#fff", fontSize: "16pt" }}>{scenario}</Text>
        </div>
        <div>
          <Text style={{ color: "#fff" }}>
            <strong>Input:</strong> {input.currentPageName}
          </Text>
        </div>
        <div>
          <Text style={{ color: "#fff" }}>
            <strong>User:</strong>{" "}
            {userContext.UserProfileSettings.ProfileCaption}
          </Text>
        </div>
      </div>
      <div
        style={{
          height: "85%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingTop: "20px",
        }}
      >
        <div style={{ flex: 1, height: "100%", padding: "10px" }}>
          <EvaluationControl evaluation={evaluation} />
        </div>
        <div style={{ flex: 1, height: "100%" }}>
          <InsightsListControl insights={output} />
        </div>
      </div>
    </div>
  );
};

function EvaluationControl(props: { evaluation: string }) {
  const { evaluation } = props;
  return (
    <div
      style={{
        height: "100%",
        textAlign: "left",
        overflowY: "scroll",
      }}
    >
      <Markdown>{evaluation}</Markdown>
    </div>
  );
}

export default TestResultCard;
