export interface CharacterResponseType {
    uid: string;
    properties: {
      name: string;
      gender: string;
      homeworld: string;
      url: string;
      hair_color: string;
      eye_color: string;
      films?: string[];
      starships?: string[];
    };
  }
  
  export interface CharacterType {
    uid: string;
    name: string;
    gender: string;
    homeworld: string;
    url: string;
    isFavourite: boolean;
    hair_color: string;
    eye_color: string;
    films: string[];
    starships: string[];
  }
  