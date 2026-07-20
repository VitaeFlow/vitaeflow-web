import type {
  Basics,
  CertificationEntry,
  EducationEntry,
  LanguageEntry,
  Resume,
  SkillCategory,
  ValidationResult,
  WorkEntry,
} from '@vitaeflow/sdk';

export type SectionKey = 'work' | 'education' | 'skills' | 'languages' | 'certifications';

const SECTION_DEFAULTS: Record<SectionKey, []> = {
  work: [],
  education: [],
  skills: [],
  languages: [],
  certifications: [],
};

export interface EnrichState {
  step: 'upload' | 'edit' | 'download';
  pdfBytes: Uint8Array | null;
  pdfFileName: string;
  basics: Partial<Basics>;
  work: WorkEntry[];
  education: EducationEntry[];
  skills: SkillCategory[];
  languages: LanguageEntry[];
  certifications: CertificationEntry[];
  activeSections: SectionKey[];
  isProcessing: boolean;
  error: string | null;
  validation: ValidationResult | null;
  resultBytes: Uint8Array | null;
}

export type EnrichAction =
  | { type: 'SET_PDF'; bytes: Uint8Array; fileName: string }
  | { type: 'PREFILL'; resume: Resume }
  | { type: 'SET_BASICS'; basics: Partial<Basics> }
  | { type: 'SET_WORK'; work: WorkEntry[] }
  | { type: 'SET_EDUCATION'; education: EducationEntry[] }
  | { type: 'SET_SKILLS'; skills: SkillCategory[] }
  | { type: 'SET_LANGUAGES'; languages: LanguageEntry[] }
  | { type: 'SET_CERTIFICATIONS'; certifications: CertificationEntry[] }
  | { type: 'TOGGLE_SECTION'; section: SectionKey }
  | { type: 'SET_PROCESSING'; value: boolean }
  | { type: 'SET_ERROR'; error: string }
  | { type: 'SET_VALIDATION'; validation: ValidationResult }
  | { type: 'SET_RESULT'; bytes: Uint8Array }
  | { type: 'RESET' };

export const initialState: EnrichState = {
  step: 'upload',
  pdfBytes: null,
  pdfFileName: '',
  basics: {},
  work: [],
  education: [],
  skills: [],
  languages: [],
  certifications: [],
  activeSections: [],
  isProcessing: false,
  error: null,
  validation: null,
  resultBytes: null,
};

export function enrichReducer(state: EnrichState, action: EnrichAction): EnrichState {
  switch (action.type) {
    case 'SET_PDF':
      return { ...state, pdfBytes: action.bytes, pdfFileName: action.fileName, step: 'edit' };

    case 'PREFILL': {
      const r = action.resume;
      const sections: SectionKey[] = [];
      if (r.work?.length) sections.push('work');
      if (r.education?.length) sections.push('education');
      if (r.skills?.length) sections.push('skills');
      if (r.languages?.length) sections.push('languages');
      if (r.certifications?.length) sections.push('certifications');

      return {
        ...state,
        basics: r.basics,
        work: r.work ?? [],
        education: r.education ?? [],
        skills: r.skills ?? [],
        languages: r.languages ?? [],
        certifications: r.certifications ?? [],
        activeSections: sections,
      };
    }

    case 'SET_BASICS':
      return { ...state, basics: action.basics };

    case 'SET_WORK':
      return { ...state, work: action.work };

    case 'SET_EDUCATION':
      return { ...state, education: action.education };

    case 'SET_SKILLS':
      return { ...state, skills: action.skills };

    case 'SET_LANGUAGES':
      return { ...state, languages: action.languages };

    case 'SET_CERTIFICATIONS':
      return { ...state, certifications: action.certifications };

    case 'TOGGLE_SECTION': {
      const has = state.activeSections.includes(action.section);
      return {
        ...state,
        activeSections: has
          ? state.activeSections.filter((s) => s !== action.section)
          : [...state.activeSections, action.section],
        ...(has ? { [action.section]: SECTION_DEFAULTS[action.section] } : {}),
      };
    }

    case 'SET_PROCESSING':
      return { ...state, isProcessing: action.value, error: null, validation: null };

    case 'SET_ERROR':
      return { ...state, error: action.error, isProcessing: false };

    case 'SET_VALIDATION':
      return { ...state, validation: action.validation, isProcessing: false };

    case 'SET_RESULT':
      return { ...state, resultBytes: action.bytes, step: 'download', isProcessing: false };

    case 'RESET':
      return initialState;
  }
}

export function assembleResume(state: EnrichState): Resume {
  const { activeSections } = state;

  const resume: Resume = {
    version: '0.2',
    profile: 'standard',
    basics: state.basics as Basics,
    meta: {
      generator: 'vitaeflow-web',
      createdAt: new Date().toISOString().slice(0, 10),
    },
  };

  if (activeSections.includes('work') && state.work.length) resume.work = state.work;
  if (activeSections.includes('education') && state.education.length) resume.education = state.education;
  if (activeSections.includes('skills') && state.skills.length) resume.skills = state.skills;
  if (activeSections.includes('languages') && state.languages.length) resume.languages = state.languages;
  if (activeSections.includes('certifications') && state.certifications.length) resume.certifications = state.certifications;

  return resume;
}
