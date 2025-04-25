import React from "react";
import { TestResult } from "../model/InputDataModel";
import { Button, Text } from "@fluentui/react-components";
import { DismissFilled, DocumentOnePageRegular } from "@fluentui/react-icons";

import Markdown from "react-markdown";
import { InsightsListControl } from "./InsightsListControl";
import { openPageWithDocumentData } from "./InputPageDataCard";
import { getStars } from "../Utility/Util";


interface TestResultCardProps {
  result: TestResult;
  closeCard: () => void;
}

const TestResultCard: React.FC<TestResultCardProps> = (
  props: TestResultCardProps
) => {
  const { scenario, input, userContext, output, evaluation, rating } =
    props.result;
  const { closeCard } = props;

  const cardStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    marginBottom: "20px",
    width: "90vw",
    height: "90vh",
    backgroundColor: "#242424",
  };

  return (
    <div style={cardStyle}>
      <Button
        size="large"
        icon={<DismissFilled />}
        onClick={closeCard}
      ></Button>
      <div
        style={{
          display: "flex",
          alignContent: "center",
          flexDirection: "column",
        }}
      >
        <div>
          <Text style={{ color: "#fff", fontSize: "16pt" }}>
            {input.currentPageName} -{" "}
            {userContext.UserProfileSettings.ProfileCaption}
          </Text>
        </div>
        <div>
          <Text style={{ color: "#fff", fontSize: "14pt" }}>
            <strong>Scenario: </strong> {scenario}
          </Text>
        </div>
        <div style={{ alignSelf: "end" }}>
            <Button size="large" icon={<DocumentOnePageRegular/>} onClick={() => openPageWithDocumentData(input)} >
            Open Page Data
            </Button>
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
        <div style={{ flex: 1, height: "100%", paddingRight: "20px" }}>
          <InsightsListControl insights={output} />
        </div>
        <div style={{ flex: 2, height: "100%", paddingLeft: "20px" }}>
          <EvaluationControl evaluation={evaluation} rating={rating} />
        </div>
      </div>
    </div>
  );
};

function EvaluationControl(props: { evaluation: string; rating: number }) {
  const { evaluation, rating } = props;
  return (
    <>
      <Text style={{ color: "#fff", fontSize: "20pt", textAlign: "center" }}>
        <strong>{getStars(rating)}</strong>
      </Text>
      <div
        style={{
          height: "100%",
          textAlign: "left",
          overflowY: "auto",
        }}
      >
        <Markdown>{evaluation}</Markdown>
      </div>
    </>
  );
}

export default TestResultCard;
