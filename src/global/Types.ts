export interface Location {
  city: string;
  state: string;
}

export interface CarnivalGroup {
  coverPath: string;
  title: string;
  description?: string;
  location: {
    city: string;
    state: string;
  };
}

export interface SearchFields {
  title: string;
  city: string;
}
