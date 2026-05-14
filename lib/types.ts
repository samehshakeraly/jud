export type StartsWith = "مَنْ" | "ومَنْ";

export interface Verse {
  id: string;
  sura_number: number;
  sura_name: string;
  aya_number: number;
  page: number;
  verse_text: string;
  starts_with: StartsWith;
  man_type: string;
  man_type_notes: string;
  tafsir: {
    mokhtasr: string;
    moyassar: string;
  };
  word_meanings: {
    seraj: string;
  };
  hidayat: {
    items: string[];
    raw: string;
  };
  reflection_question: string;
  metadata: {
    is_makki: boolean;
    starts_with_man: boolean;
    fetch_errors: string[];
  };
}

export interface VersesFile {
  metadata: {
    title: string;
    total_verses: number;
    total_suras: number;
    sources: Record<string, string>;
    schema_version: string;
  };
  verses: Verse[];
}

export interface SuraGroup {
  number: number;
  name: string;
  is_makki: boolean;
  verses: Verse[];
}
