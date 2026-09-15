export interface Job {
  title: string;
  description: string;
  internshipDescription?: string;
  type: string;
  location: string;
  company?: string;
  experience?: string;
  duration?: string;
  internshipType?: string;
  skills?: string[];
  responsibilities?: string[];
  qualifications?: string[];
  contactDetails?: string[];
  salary?: string;
  category?: string;
  badgeColor?: string;
}