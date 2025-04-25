import { Fields, InputData } from "../model/InputDataModel";
import { Text, Title3, Title1, Subtitle2 } from "@fluentui/react-components";

interface IInputPageDataCardProps {
  pageData: InputData;
}

export function InputPageDataCard({ pageData }: IInputPageDataCardProps) {
  
  return (
    <div>
        <Title1>{pageData.currentPageName}</Title1>
        <Section title="fields" fields={pageData.fields} />
    </div>
  );
}

function Section(props: { title: string; fields: Fields }) {
  const { title, fields } = props;

  const fieldEntries = Object.entries(fields);

  const elements = fieldEntries.map(([key, value]) => {
    console.log("key", key, "value", value);
    return (
      <div key={key}>
        <Subtitle2>{key}</Subtitle2>
        <Text>{value.value.toString()}</Text>
      </div>
    );
  });

  return (
    <div style={{ marginBottom: "20px" }}>
      <Title3>{title}</Title3>
      {elements}
    </div>
  );

}

export function openPageWithDocumentData(pageData: InputData) {
  const url = new URL(window.location.href);
  localStorage.setItem("documentData", JSON.stringify(pageData));
  const width = 800;
  const height = 600;
  const left = (window.screen.width - width) / 2;
  const top = (window.screen.height - height) / 2;
  window.open(
    url.toString(),
    "_blank",
    `width=${width},height=${height},left=${left},top=${top}`
  );
}