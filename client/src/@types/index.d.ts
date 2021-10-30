export interface Profile {
  user: string;
  company: string;
  website: string;
  location: string;
  bio: string;
  status: string;
  githubusername: string;
  skills: string;
  social?: {
    youtube: string;
    facebook: string;
    twitter: string;
    instagram: string;
    linkedin: string;
  };
}
