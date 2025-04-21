import React from "react";
import {
  Card,
  CardHeader,
} from "@fluentui/react-components";
import { Badge } from "@fluentui/react-components";
import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from "@fluentui/react-components";
import { List, ListItem } from "@fluentui/react-components";
import { TestResult } from "../model/InputDataModel";


interface TestResultCardProps {
  result: TestResult;
}

const TestResultCard: React.FC<TestResultCardProps> = ({ result }) => {
  const { scenario, input, userContext, output, evaluation, passed } = result;

  return (
    <Card style={{ marginBottom: "1rem", width: "100%" }}>
      <CardHeader
        header={<strong>{scenario}</strong>}
        description={`${input.currentPageName} — ${userContext.UserProfileSettings.ProfileCaption}`}
      >
        <Badge appearance={passed ? "filled" : "outline"} color={passed ? "success" : "danger"}>
          {passed ? "Passed" : "Failed"}
        </Badge>
      </CardHeader>

      <div>
        <h4>Key Insights</h4>
        <List>
          {output.map((insight, idx) => (
            <ListItem key={idx}>
              <strong>{insight.Source}:</strong> {insight.Description}
            </ListItem>
          ))}
        </List>

        <Accordion>
          <AccordionItem value="evaluation">
            <AccordionHeader>Evaluation Summary</AccordionHeader>
            <AccordionPanel>
              <div style={{ whiteSpace: "pre-wrap" }}>{evaluation}</div>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </div>
    </Card>
  );
};

export default TestResultCard;
