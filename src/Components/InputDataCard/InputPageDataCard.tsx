import React from "react";
import { Fields, InputData, PageSection } from "../../model/InputDataModel";
import { Text } from "@fluentui/react-components";

interface IInputPageDataCardProps {
  pageData: InputData;
}

export function InputPageDataCard({ pageData }: IInputPageDataCardProps) {
  return (
      <div>
        <Text style={{ color: "#fff", fontSize: "20pt" }}>
          {pageData.currentPageName}
        </Text>
        <Section title="fields" fields={pageData.fields} />
        <ExtraInformationControl extraPages={pageData.parts} prefix="Parts"/>
        <ExtraInformationControl extraPages={pageData.relatedPages} prefix="Related pages" />
      </div>
  );
}

function Section(props: { title: string; fields: Fields }) {
  const { title, fields } = props;
  const fieldEntries = Object.entries(fields);

  const [isCollapsed, setIsCollapsed] = React.useState(true);
  const height = (fieldEntries.length * 60) / 3;

  const elements = fieldEntries.map(([key, value]) => {
    return (
      <div key={key} style={{ width: 200, paddingBottom: "10px" }}>
        <strong>
          <Text>{key}</Text>
        </strong>
        <br />
        <Text>{value.value.toString()}</Text>
      </div>
    );
  });

  return (
    <div
      key={title}
      style={{
        marginBottom: "20px",
        textAlign: "left",
        borderBottom: "1px solid #ccc",
      }}
    >
      <Text
        onClick={() => setIsCollapsed(!isCollapsed)}
        style={{ fontSize: "16pt", textAlign: "left" }}
      >
        {title}
      </Text>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          textAlign: "left",
          flexWrap: "wrap",
          maxHeight: isCollapsed ? 0 : height,
          overflow: "hidden",
          borderTop: "1px solid #ccc",
          paddingTop: isCollapsed ? 0 : "5px",
        }}
      >
        {elements}
      </div>
    </div>
  );
}

function ExtraInformationControl(props: {
  extraPages: { [key: string]: PageSection[] };
  prefix?: string;
}) {
  const { extraPages: relatedPages } = props;
  const pages = Object.entries(relatedPages);

  const extraSections = pages.map((page) => {
    const name = props.prefix ? `${props.prefix} - ${page[0]}` : page[0];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const information = (page[1] as any)["fields"] as Fields;
    console.log("name", name);
    console.log("information", information);

    return <Section title={name} fields={information} />;
  });

  return extraSections;
}

// eslint-disable-next-line react-refresh/only-export-components
export function openPageWithDocumentData(pageData: InputData) {
  const url = new URL(window.location.href);
  localStorage.setItem("documentData", JSON.stringify(pageData));
  const width = 1000;
  const height = 700;
  const left = (window.screen.width - width) / 2;
  const top = (window.screen.height - height) / 2;
  window.open(
    url.toString(),
    "_blank",
    `width=${width},height=${height},left=${left},top=${top}`
  );
}
