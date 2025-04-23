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
} from "@fluentui/react-components";
import { Insight } from "../model/InputDataModel";

const columns: TableColumnDefinition<Insight>[] = [
  createTableColumn<Insight>({
    columnId: "score",
    compare: (a, b) => {
      return a.Score - b.Score;
    },
    renderHeaderCell: () => {
      return "Score";
    },
    renderCell: (insight) => {
      return <TableCellLayout>{insight.Score}</TableCellLayout>;
    },
  }),
  createTableColumn<Insight>({
    columnId: "description",
    compare: (a, b) => {
      return a.Description.localeCompare(b.Description);
    },
    renderHeaderCell: () => {
      return "description";
    },
    renderCell: (insight) => {
      return <TableCellLayout>{insight.Description}</TableCellLayout>;
    },
  }),
];

export const InsightsListControl = (props: { insights: Insight[] }) => {
  const { insights } = props;

  const [sortState, setSortState] = React.useState<
    Parameters<NonNullable<DataGridProps["onSortChange"]>>[1]
  >({
    sortColumn: "file",
    sortDirection: "ascending",
  });
  const onSortChange: DataGridProps["onSortChange"] = (
    e: any,
    nextSortState: any
  ) => {
    setSortState(nextSortState);
  };

  return (
    <DataGrid
      items={insights}
      columns={columns}
      sortable
      sortState={sortState}
      onSortChange={onSortChange}
      style={{ minWidth: "500px" }}
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
          <DataGridRow<Insight> key={rowId}>
            {({ renderCell }) => (
              <DataGridCell>{renderCell(item)}</DataGridCell>
            )}
          </DataGridRow>
        )}
      </DataGridBody>
    </DataGrid>
  );
};
