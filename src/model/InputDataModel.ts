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
    parts: {
      [key: string]: PageSection[];
    };
  }
  
  export interface Insight {
    Value: string | number;
    SourceId: number;
    Score: number;
    Description: string;
    Source: string;
    SourceContext: string | number;
  }
  
  export interface UserContext {
    WorkDate: string;
    UserLanguage: string | null;
    UserProfileSettings: {
      ProfileCaption: string;
      ProfileDescription: string;
    };
  }
  
  export interface TestCase {
    scenario: string;
    input: InputData;
    userContext: UserContext;
    output: Insight[];
    evaluation: string;
    rating: number;
  }
  