import { useRef, useState } from "react";
import Markdown from "react-markdown";

import { Button } from "@fluentui/react-components";
import { WindowNewRegular } from "@fluentui/react-icons";

import { InputData, TestCase } from "../../model/InputDataModel";
import { InsightsListControl } from "./InsightsListControl";

import "./TestCaseCard.css";

interface TestCaseardProps {
  testCase: TestCase | null;
}

export function TestCaseCard(props: TestCaseardProps) {
  const { testCase } = props;
  const hasSelectedTestCase = testCase !== null;

  const containerRef = useRef<HTMLDivElement>(null);
  const [insightsWidth, setInsightsWidth] = useState(50); // percentage

  const onMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startWidth = insightsWidth;

    const onMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const delta = e.clientX - startX;
      const containerWidth = containerRef.current.offsetWidth;
      const newWidth = ((startWidth / 100) * containerWidth + delta) / containerWidth * 100;
      setInsightsWidth(Math.max(20, Math.min(80, newWidth)));
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  if (!hasSelectedTestCase) {
    return <div className="testCaseCard-placeholder">
      <div>
        Select test case to learn more
      </div>
    </div>;
  }

  return (
    <div className="testCaseCard-card" ref={containerRef}>
      <div className="testCaseCard-card-content" >
        <div
          className="testCaseCard-insights"
          style={{ width: `${insightsWidth}%`, paddingRight: "8px" }}
        >
          <InsightsListControl insights={testCase.output} />
        </div>
        <div
          className="testCaseCard-divider"
          onMouseDown={onMouseDown}
        />
        <div
          className="testCaseCard-evaluation"
          style={{ width: `${100 - insightsWidth}%`, paddingLeft: "8px" }}
        >
          <LlmEvaluation markdownString={testCase.evaluation} testCase={testCase} />
        </div>
      </div>
    </div>
  );
}

function LlmEvaluation(props: { markdownString: string, testCase: TestCase }) {
  const { markdownString, testCase } = props;
  return (
    <div className="testCaseCard-evaluation-container">
      <div className="testCaseCard-data-popout">
        <Button
          size="large"
          icon={<WindowNewRegular />}
          title={"Open input data in new window"}
          onClick={() => openPageDataInNewWindow(testCase.input)}
        />
      </div>
      <Markdown>{markdownString}</Markdown>
    </div>
  );
}


// utils/windowUtils.ts
export function openPageDataInNewWindow(data: InputData) {
  localStorage.setItem("documentData", JSON.stringify(data));
  window.open(
    window.location.href,
    "_blank",
    "width=900,height=800,left=100,top=100,noopener,noreferrer"
  );
}
