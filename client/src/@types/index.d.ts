export interface Profile {
  user?: any;
  company: string;
  website: string;
  location: string;
  bio: string;
  status: string;
  githubusername: string;
  skills: [];
  social?: Social;
  education?: any[];
  experience?: any[];
}

export interface Social {
  youtube: string;
  facebook: string;
  twitter: string;
  instagram: string;
  linkedin: string;
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  from: string;
  to: string;
  current: boolean;
  description: string;
  _id?: string;
}

export interface Education {
  school: string;
  degree: string;
  fieldofstudy: string;
  from: string;
  to: string;
  current: boolean;
  description: string;
  _id?: string;
}

export interface Post {
  _id?: string;
  user: string;
  text: string;
  name: string;
  avatar: string;
  date: string;
  likes: string[];
  comments: [IComment];
}

export interface IComment {
  user: string;
  text: string;
  name: string;
  avatar: string;
  date: string;
  _id: string;
}
