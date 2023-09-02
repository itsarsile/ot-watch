export interface User {
  name?: string | null | undefined;
  role?: string;
  username?: string;
  accessToken: string;
}


export interface Disclosure {
  opened: boolean;
  close: () => void;
}

export interface ISFRegistrationModal extends Disclosure {
  supervisors: [],
} 

export interface ISFListModal extends Disclosure {
  
}

export interface IMapDashboard extends Disclosure {
  
}