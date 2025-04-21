import { useState } from 'react';
import { parseTestResult } from '../Utility/ParseTestResult';
import { TestResult } from '../model/InputDataModel';

function handleTestResultFile(file: File): Promise<TestResult[]> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const testData = parseTestResult(event.target?.result as string);
                resolve(testData);
            } catch (error) {
                reject(error);
            }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
    });
}

interface FileUploadControlProps {
    setParsedData: (data: TestResult[]) => void;
}

function FileUploadControl(props: FileUploadControlProps) {
    const { setParsedData } = props;
    const [error, setError] = useState<string | null>(null);

    const handleFileUpload = async (file: File) => {
        try {
            console.log('File uploaded:', file.name);
            const data = await handleTestResultFile(file);
            setParsedData(data);
            setError(null);
        } catch (err) {
            setError(`Failed to parse the file. Please upload a valid JSON file. Error: ${err instanceof Error ? err.message : String(err)}`);
        }
    };

    return (
        <div
            style={{
                border: '2px dashed #ccc',
                padding: '20px',
                textAlign: 'center',
                marginTop: '20px',
                borderRadius: '10px',
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
                e.preventDefault();
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    handleFileUpload(files[0]);
                }
            }}
        >
            <p>Drag and drop the Test result file here, or click the button below to upload</p>
            <input
                type="file"
                style={{ display: 'none' }}
                id="fileInput"
                onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                        handleFileUpload(e.target.files[0]);
                    }
                }}
            />
            <label htmlFor="fileInput" style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}>
                Choose a file
            </label>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default FileUploadControl;
