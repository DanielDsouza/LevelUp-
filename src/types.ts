export interface UserData {
  goal: string;
  cvText?: string;
  cvFile?: {
    data: string;
    mimeType: string;
  };
  dailyHours: number;
  totalMonths: number;
  experienceLevel: string;
}

export interface Resource {
  title: string;
  url: string;
}

export interface RoadmapStep {
  title: string;
  description: string;
  duration: string;
  resources: Resource[];
  milestones: string[];
}

export interface LearningRoadmap {
  title: string;
  summary: string;
  estimatedTotalHours: number;
  phases: {
    name: string;
    steps: RoadmapStep[];
  }[];
}
