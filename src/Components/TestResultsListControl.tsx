import React from "react";
import {
  createTableColumn,
  DataGrid,
  DataGridProps,
  TableCellLayout,
  TableColumnDefinition,
  DataGridHeader,
  DataGridBody,
  DataGridCell,
  DataGridHeaderCell,
  DataGridRow,
} from "@fluentui/react-components";
import { Insight, TestResult } from "../model/InputDataModel";

import "./TestResultsListControl.css";
import { getStars } from "../Utility/Util";

interface ITestResultsListControlProps {
  results: TestResult[];
  openCard: (index: number) => void;
}

export default function TestResultsListControl(props: ITestResultsListControlProps) {
  const { results, openCard } = props;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSelectionChange: DataGridProps["onSelectionChange"] = (e: any, data: { selectedItems: any; }) => {
    const index = Number(data.selectedItems.values().next().value);
    console.log("Selected item index:", index); 
    openCard(index);
  };

  const [sortState, setSortState] = React.useState<
  Parameters<NonNullable<DataGridProps["onSortChange"]>>[1]
  >({
    sortColumn: "score",
    sortDirection: "desc",
  });

  const onSortChange: DataGridProps["onSortChange"] = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    e: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    nextSortState: any
  ) => {
    setSortState(nextSortState);
  };

  return (
    <div style={{ width: "100%", height: "100%", overflow: "auto" }}>
      <DataGrid
        items={results}
        columns={columns}
        sortable
        sortState={sortState}
        onSortChange={onSortChange}
        onSelectionChange={onSelectionChange}
        selectionMode="single"
      >
        <DataGridHeader>
          <DataGridRow>
            {({ renderHeaderCell }) => (
              <DataGridHeaderCell>{renderHeaderCell()}</DataGridHeaderCell>
            )}
          </DataGridRow>
        </DataGridHeader>
        <DataGridBody<Insight>>
          {({ item, rowId }) => (
            <DataGridRow<Insight>
              key={rowId}
              style={{ borderBottom: "1px solid black" }}
              >
              {({ renderCell }) => (
                <DataGridCell>{renderCell(item)}</DataGridCell>
              )}
            </DataGridRow>
          )}
        </DataGridBody>
      </DataGrid>
    </div>
  );
}

const columns: TableColumnDefinition<TestResult>[] = [
  createTableColumn<TestResult>({
    columnId: "scenario",
    compare: (a, b) => {
      return a.scenario.localeCompare(b.scenario);
    },
    renderHeaderCell: () => {
      return <strong>Scenario</strong>;
    },
    renderCell: (testResult) => {
      return <TableCellLayout>{testResult.scenario}</TableCellLayout>;
    },
  }),
  createTableColumn<TestResult>({
    columnId: "context",
    compare: (a, b) => {
      return a.userContext.UserProfileSettings.ProfileCaption.localeCompare(
        b.userContext.UserProfileSettings.ProfileCaption
      );
    },
    renderHeaderCell: () => {
      return <strong>Context</strong>;
    },
    renderCell: (testResult) => {
      return (
        <TableCellLayout>
          {testResult.input.currentPageName} - {testResult.userContext.UserProfileSettings.ProfileCaption}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<TestResult>({
    columnId: "evaluation",
    compare: (a, b) => {
      return a.rating - b.rating;
    },
    renderHeaderCell: () => {
      return <strong>Evaluation</strong>;
    },
    renderCell: (testResult) => {
      return <TableCellLayout>{getStars(testResult.rating)}</TableCellLayout>;
    },
  }),
];
