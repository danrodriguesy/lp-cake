export interface Testimonial {
  id: number;
  avatar: string;
  name: string;
  role: string;
  company: string;
  quote: string;
}

export interface Project {
  id: number;
  slug?: string;
  name?: string;
  description: string;
  gifUrl: string;
}

export interface SpawningThumbnail {
  id: number;
  x: number;
  y: number;
  url: string;
  rotation: number;
  scale: number;
  opacity: number;
}
