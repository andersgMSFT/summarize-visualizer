import { TestCase } from "../../model/InputDataModel";

import "./TestSummaryCard.css";
import { DismissFilled } from "@fluentui/react-icons";
import { Button, Text } from "@fluentui/react-components";
import { getStars } from "../../Utility/Util";

interface ITestScoreCardProps {
  testName: string;
  result: TestCase[];
  closeCard: () => void;
}

const starRange = [1, 2, 3, 4, 5];

function TestSummaryCard(props: ITestScoreCardProps) {
  const { testName, result, closeCard } = props;

  const numberOfTestCases = result.length;
  const starCounts = starRange.map(
    (star) => result.filter((testCase) => testCase.rating === star).length
  );

  const ratingsSum = result.reduce((sum, testCase) => sum + testCase.rating, 0);
  const averageRating = (ratingsSum / numberOfTestCases).toFixed(2);

  const percentages = starCounts.map((count) =>
    ((count / numberOfTestCases) * 100).toFixed(2)
  );

  const failureCount = result.filter((testCase) => testCase.rating <= 2).length;
  const failureRate = ((failureCount / numberOfTestCases) * 100).toFixed(2);

  return (
    <div className="testSummaryCard-container">
      <div className="testSummaryCard-card">
        <div className="testSummaryCard-closeButton">
          <Button
            size="large"
            icon={<DismissFilled />}
            onClick={closeCard}
          />
        </div>
        <div className="testSummaryCard-header">
          <h2>Test Summary</h2>
          <Text>{testName}</Text>
        </div>
        <div className="testSummaryCard-content">
          <div className="testSummaryCard-overview">
            <SummaryValue title="Average Rating" value={averageRating} />
            <SummaryValue
              title="Number of Test Cases"
              value={numberOfTestCases}
            />
            <SummaryValue title="Failure Rate" value={`${failureRate}%`} />
          </div>
          <div className="testSummaryCard-scoreDistribution">
            <h3>Score Distribution</h3>
            {starRange.map((star, id) => (
              <div key={star} className="testSummaryCard-star">
                <div>{getStars(star)}</div>
                <div>
                  <Text>{percentages[id] ?? 0}%</Text>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryValue(props: { title: string; value: string | number }) {
  const { title, value } = props;
  return (
    <div className="testSummaryCard-summaryValue">
      <Text>
        <strong>{title} </strong>
      </Text>
      <Text>{value}</Text>
    </div>
  );
}

export default TestSummaryCard;
