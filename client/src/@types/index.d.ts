export interface Profile {
  user?: string;
  company: string;
  website: string;
  location: string;
  bio: string;
  status: string;
  githubusername: string;
  skills: string;
  social?: Social;
}

export interface Social {
  youtube: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
}
