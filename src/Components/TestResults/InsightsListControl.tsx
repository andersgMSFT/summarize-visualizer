import * as React from "react";
import {
  DataGridBody,
  DataGridRow,
  DataGrid,
  DataGridHeader,
  DataGridHeaderCell,
  DataGridCell,
  TableCellLayout,
  TableColumnDefinition,
  createTableColumn,
  DataGridProps,
  Text,
} from "@fluentui/react-components";
import { Insight} from "../../model/InputDataModel";

import "./InsightsListControl.css";

const columns: TableColumnDefinition<Insight>[] = [
  createTableColumn<Insight>({
    columnId: "score",
    compare: (a, b) => {
      return a.Score - b.Score;
    },
    renderHeaderCell: () => {
      return <strong>Score</strong>;
    },
    renderCell: (insight) => {
      return <TableCellLayout>{insight.Score}</TableCellLayout>;
    },
  }),
  createTableColumn<Insight>({
    columnId: "value",
    compare: (a, b) => {
      return a.Value.toString().localeCompare(b.Value.toString());
    },
    renderHeaderCell: () => {
      return <strong>Value</strong>;
    },
    renderCell: (insight) => {
      return <TableCellLayout>{insight.Value}</TableCellLayout>;
    },
  }),
  createTableColumn<Insight>({
    columnId: "source",
    compare: (a, b) => {
      return a.Source.localeCompare(b.Source);
    },
    renderHeaderCell: () => {
      return <strong>Source</strong>;
    },
    renderCell: (insight) => {
      return <TableCellLayout>{insight.Source}</TableCellLayout>;
    },
  }),
];

export const InsightsListControl = (props: { insights: Insight[] }) => {
  const { insights } = props;

  const [sortState, setSortState] = React.useState<
    Parameters<NonNullable<DataGridProps["onSortChange"]>>[1]
  >({
    sortColumn: "score",
    sortDirection: "desc",
  });

  const onSortChange: DataGridProps["onSortChange"] = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _e: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    nextSortState: any
  ) => {
    setSortState(nextSortState);
  };

  return (
    <div className="insightsListControl-container">
      <Text style={{ color: "#fff", fontSize: "14pt" }}>
        <strong>Insights</strong>
      </Text>
      <DataGrid
        items={insights}
        columns={columns}
        sortable
        sortState={sortState}
        onSortChange={onSortChange}
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
              className="insightsListControl-row"
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
};
