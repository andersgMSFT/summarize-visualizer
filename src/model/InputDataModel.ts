// models.ts

export interface Field {
    id: number;
    value: string | number | boolean;
  }
  
  export interface Fields {
    [key: string]: Field;
  }
  
  export interface MetaData {
    objectId: number;
    objectType: string;
  }
  
  export interface PageSection {
    metaData: MetaData;
    fields: Fields;
  }
  
  export interface InputData {
    currentPageName: string;
    fields: Fields;
    relatedPages: {
      [key: string]: PageSection[];
    };
  }
  
  export interface Insight {
    Value: string | number;
    SourceId: number;
    Score: number | string;
    Description: string;
    Source: string;
    SourceContext: any;
  }
  
  export interface UserContext {
    WorkDate: string;
    UserLanguage: string | null;
    UserProfileSettings: {
      ProfileCaption: string;
      ProfileDescription: string;
    };
  }
  
  export interface TestResult {
    scenario: string;
    input: InputData;
    userContext: UserContext;
    output: Insight[];
    evaluation: string;
    passed: boolean;
  }
  