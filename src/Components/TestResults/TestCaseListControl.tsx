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
  OnSelectionChangeData,
} from "@fluentui/react-components";
import { Insight, TestCase } from "../../model/InputDataModel";

import "./TestCaseListControl.css";
import { getStars } from "../../Utility/Util";

interface ITestCaseListControlProps {
  results: TestCase[];
  openCard: (index: number) => void;
}

export default function TestCaseListControl(props: ITestCaseListControlProps) {
  const { results, openCard } = props;
  
  const onSelectionChange: DataGridProps["onSelectionChange"] = (_e: unknown, data: OnSelectionChangeData) => {
    const index = Number(data.selectedItems.values().next().value);
    console.log("Selected item index:", index);
    openCard(index);
  };
  
  const [sortState, setSortState] = React.useState<SortState>({
    sortColumn: "score",
    sortDirection: "desc",
  });
  
  const onSortChange: DataGridProps["onSortChange"] = (
    _e: never,
    nextSortState: SortState
  ) => {
    setSortState(nextSortState);
  };

  return <div className="testCaseListControl-container">
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
            className="testCaseListControl-row"
          >
            {({ renderCell }) => (
              <DataGridCell>{renderCell(item)}</DataGridCell>
            )}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
    </div>;
}


const columns: TableColumnDefinition<TestCase>[] = [
  createTableColumn<TestCase>({
    columnId: "evaluation",
    compare: (a, b) => {
      return a.rating - b.rating;
    },
    renderHeaderCell: () => {
      return <strong>Score</strong>;
    },
    renderCell: (testResult) => {
      return <TableCellLayout>{getStars(testResult.rating)}</TableCellLayout>;
    },
  }),
  createTableColumn<TestCase>({
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
          {testResult.input.currentPageName} -{" "} {testResult.userContext.UserProfileSettings.ProfileCaption}
        </TableCellLayout>
      );
    },
  }),
  createTableColumn<TestCase>({
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
];

type SortState = { sortColumn: string; sortDirection: "asc" | "desc" };