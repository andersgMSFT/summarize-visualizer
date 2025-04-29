import React from "react";
import { InputData, TestCase, UserContext } from "../../model/InputDataModel";
import { Button, Text } from "@fluentui/react-components";
import { DismissFilled, DocumentOnePageRegular } from "@fluentui/react-icons";
import Markdown from "react-markdown";

import { InsightsListControl } from "./InsightsListControl";
import { openPageWithDocumentData } from "../InputDataCard/InputPageDataCard";
import { getStars } from "../../Utility/Util";

import "./TestCaseCard.css";

interface TestCaseardProps {
  result: TestCase;
  closeCard: () => void;
}

const TestCaseCard: React.FC<TestCaseardProps> = ({
  result,
  closeCard,
}) => {
  const { scenario, input, userContext, output, evaluation, rating } = result;

  return (
    <div className="testCaseCard-container">
      <div className="testCaseCard-card">
        <Button size="large" icon={<DismissFilled />} onClick={closeCard}/>
        <TestResultCardHeader scenario={scenario} input={input} userContext={userContext} />
        <div className="testCaseCard-content">
          <div className="testCaseCard-insights">
            <InsightsListControl insights={output} />
          </div>
          <div className="testCaseCard-evaluation">
            <EvaluationControl evaluation={evaluation} rating={rating} />
          </div>
        </div>
      </div>
    </div>
  );
};

function TestResultCardHeader({scenario, input, userContext, }: { scenario: string; input: InputData; userContext: UserContext; }) {
  return (
    <div className="testCaseCard-header">
      <div>
        <Text className="testCaseCard-title">
          {input.currentPageName} -{" "}
          {userContext.UserProfileSettings.ProfileCaption}
        </Text>
      </div>
      <div>
        <Text className="testCaseCard-scenario">
          <strong>Scenario: </strong> {scenario}
        </Text>
      </div>
      <div className="testCaseCard-open-page-button">
        <Button
          size="large"
          icon={<DocumentOnePageRegular />}
          onClick={() => openPageWithDocumentData(input)}
        >
          Open Page Data
        </Button>
      </div>
    </div>
  );
}

function EvaluationControl({
  evaluation,
  rating,
}: {
  evaluation: string;
  rating: number;
}) {
  return (
    <>
      <Text className="testCaseCard-evaluation-text">
        <strong>{getStars(rating)}</strong>
      </Text>
      <div className="testCaseCard-evaluation-container">
        <Markdown>{evaluation}</Markdown>
      </div>
    </>
  );
}

export default TestCaseCard;
