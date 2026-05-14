import { notFound } from "next/navigation";
import { VERSE_BY_ID, VERSES, getNeighbors } from "@/lib/data";
import { VerseDisplay } from "@/components/VerseDisplay";

export function generateStaticParams() {
  return VERSES.map((v) => ({ id: v.id }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const v = VERSE_BY_ID[decodeURIComponent(params.id)];
  if (!v) return {};
  return {
    title: `${v.sura_name} · ${v.aya_number}`,
    description: v.tafsir.mokhtasr.slice(0, 140),
  };
}

export default function VersePage({ params }: { params: { id: string } }) {
  const id = decodeURIComponent(params.id);
  const verse = VERSE_BY_ID[id];
  if (!verse) notFound();
  const { prev, next } = getNeighbors(id);
  return <VerseDisplay verse={verse} prev={prev} next={next} />;
}
