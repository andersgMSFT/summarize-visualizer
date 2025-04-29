import { useState } from 'react';
import { parseTestResult } from './ParseTestResult';
import { TestCase } from '../../model/InputDataModel';

export interface IFileUploadResult
{
    result?: TestCase[];
    fileName?: string;
}

export interface FileUploadControlProps {
    setParsedData: (result: IFileUploadResult) => void;
}

export function FileUploadControl(props: FileUploadControlProps) {
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

// Helper functions
function handleTestResultFile(file: File): Promise<IFileUploadResult> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const testData = parseTestResult(event.target?.result as string);
                resolve({result: testData, fileName: file.name});
            } catch (error) {
                reject(error);
            }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
    });
}