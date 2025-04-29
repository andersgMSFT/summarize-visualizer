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

function TestSummaryCard(props: ITestScoreCardProps) {
  const { testName, result, closeCard } = props;
  
  const numberOfTestCases = result.length;
  const starCounts = [1, 2, 3, 4, 5].map(
    (star) => result.filter((testCase) => testCase.rating === star).length
  );

  const averageRating =
    Math.round(
      (result.reduce((acc, testCase) => acc + testCase.rating, 0) /
        numberOfTestCases) *
        10
    ) / 10;

  const percentages = starCounts.map(
    (count) => ((count / numberOfTestCases) * 100).toFixed(2)
  );

  return (
    <div className="testSummaryCard-container">
      <div className="testSummaryCard-card">
        <div style={{textAlign: "left"}}>
          <Button style={{textAlign: "left"}} size="large" icon={<DismissFilled />} onClick={closeCard} />
        </div>     
        <h2>Test Summary</h2>
        <Text>{testName}</Text>
        <div className="testSummaryCard-Overview">
            <Text>
              <strong>Average Rating:</strong>
            </Text>
            <Text>{averageRating}</Text>

            <Text>
              <strong>Number of cases:</strong>
            </Text>
            <Text>{numberOfTestCases}</Text>

        </div>
        <div className="testSummaryCard-scoreDistribution">
          <h3>
            Score Distribution 
          </h3>
            {[1, 2, 3, 4, 5].map((star, id) => (
              <div key={star} className="testSummaryCard-star">
                <div>
                {getStars(star)}
                </div>
                <div>
                <Text>{percentages[id]}%</Text>
                </div>
              </div>
            ))}

        </div>
      </div>
    </div>
  );
}

export default TestSummaryCard;
