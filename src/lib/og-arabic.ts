// Arabic text for next/og share cards. Satori draws Arabic letters joined,
// but it measures each letter in its unjoined (wider) form and lays text out
// left to right, so words come out reversed with uneven gaps. Here the text
// is joined ahead of time (Unicode presentation forms, which measure the same
// as they draw) and split into word items in visual order. The card then lays
// the items out right to left with flex-direction: row-reverse.

// Letters U+0621–U+063A and U+0641–U+064A, in order, with how many
// presentation forms each has in U+FE80–U+FEF4: 1 joins nothing (hamza),
// 2 joins only the letter before it, 4 joins both sides.
const FORM_COUNTS: [number, string][] = [
  [0x0621, "12222424244444222244444444"],
  [0x0641, "4444444224"],
];

const LETTER_FORMS = new Map<string, number[]>();
{
  let next = 0xfe80;
  for (const [start, counts] of FORM_COUNTS) {
    [...counts].forEach((n, i) => {
      const forms = Array.from({ length: Number(n) }, (_, k) => next + k);
      LETTER_FORMS.set(String.fromCharCode(start + i), forms);
      next += Number(n);
    });
  }
}

const TATWEEL = "\u0640";
// Lam followed by these alefs becomes one ligature (isolated form; +1 is final).
const LAM_ALEF: Record<string, number> = { "آ": 0xfef5, "أ": 0xfef7, "إ": 0xfef9, "ا": 0xfefb };
// Vowel marks are dropped: Satori would place them as separate glyphs.
const MARKS = /[\u064B-\u0652\u0670]/g;

const joinsBefore = (c?: string) => c === TATWEEL || (c !== undefined && (LETTER_FORMS.get(c)?.length ?? 0) > 1);
const joinsAfter = (c?: string) => c === TATWEEL || (c !== undefined && LETTER_FORMS.get(c)?.length === 4);

/** Replace each Arabic letter with the presentation form for its position in the word. */
export function shapeArabic(text: string): string {
  const chars = [...text.replace(MARKS, "")];
  let out = "";
  for (let i = 0; i < chars.length; i++) {
    const c = chars[i];
    const forms = LETTER_FORMS.get(c);
    if (!forms) {
      out += c;
      continue;
    }
    const before = forms.length > 1 && joinsAfter(chars[i - 1]);
    if (c === "ل" && LAM_ALEF[chars[i + 1]]) {
      out += String.fromCharCode(LAM_ALEF[chars[i + 1]] + (before ? 1 : 0));
      i++;
      continue;
    }
    const after = forms.length === 4 && joinsBefore(chars[i + 1]);
    // Form order: isolated, final, initial, medial.
    out += String.fromCharCode(forms[before ? (after ? 3 : 1) : after ? 2 : 0]);
  }
  return out;
}

// U+200F/U+200E are the invisible direction marks; the Arabic comma (U+060C)
// is punctuation, not a right-to-left letter.
const RTL = /[\u0590-\u060B\u060D-\u08FF\uFB1D-\uFDFF\uFE70-\uFEFF\u200F]/;
const LTR = /[A-Za-z\u00C0-\u024F\u200E]/;
const DIGIT = /[0-9]/;
const MIRROR: Record<string, string> = { "(": ")", ")": "(", "[": "]", "]": "[", "«": "»", "»": "«", "<": ">", ">": "<" };

/**
 * Direction of each character in a right-to-left line, following the parts of
 * the Unicode bidi algorithm that matter here, so the card orders text the
 * way the browser does on the page:
 * - digits form numbers, with "." "," ":" between digits and a trailing "%";
 * - a number after English text belongs to it ("Kong 3.8"); otherwise it
 *   counts as right to left for the spaces and punctuation around it;
 * - spaces and punctuation between two left-to-right items stay left to right,
 *   everything else follows the line.
 * "L" characters keep their order, "R" characters are reversed.
 */
function directions(chars: string[]): ("L" | "R")[] {
  type T = "L" | "R" | "EN" | null;
  const types: T[] = chars.map((c) => (RTL.test(c) ? "R" : LTR.test(c) ? "L" : DIGIT.test(c) ? "EN" : null));
  // Separators inside a number and a percent sign after one are part of it.
  types.forEach((t, i) => {
    if (t) return;
    const c = chars[i];
    if (/[.,:]/.test(c) && types[i - 1] === "EN" && types[i + 1] === "EN") types[i] = "EN";
    else if (c === "%" && types[i - 1] === "EN") types[i] = "EN";
  });
  // A number takes the direction of the strong text before it if that is English.
  let lastStrong: "L" | "R" = "R";
  const resolved: T[] = types.map((t) => {
    if (t === "L" || t === "R") lastStrong = t;
    return t === "EN" && lastStrong === "L" ? "L" : t;
  });
  // Bracket pairs take one direction for both halves: right to left if there
  // is right-to-left text (or a number) inside, left to right if the inside
  // and the text before the pair are both left to right.
  const open: number[] = [];
  chars.forEach((c, i) => {
    if (c === "(" || c === "[") open.push(i);
    else if ((c === ")" || c === "]") && open.length) {
      const start = open.pop()!;
      const inside = resolved.slice(start + 1, i);
      const before = resolved.slice(0, start).reverse().find((t) => t !== null) ?? "R";
      const d = inside.some((t) => t === "R" || t === "EN")
        ? "R"
        : inside.includes("L") && before === "L" ? "L" : inside.includes("L") ? "R" : null;
      resolved[start] = resolved[i] = d;
    }
  });
  const out: ("L" | "R")[] = [];
  // Remaining numbers keep their own order but act as right to left for their neighbours.
  const side = (t: T) => (t === "L" ? "L" : "R");
  for (let i = 0; i < chars.length; i++) {
    const t = resolved[i];
    if (t) {
      out.push(t === "R" ? "R" : "L");
      continue;
    }
    let j = i;
    while (j < chars.length && !resolved[j]) j++;
    const before = i > 0 ? side(resolved[i - 1]) : "R";
    const after = j < chars.length ? side(resolved[j]) : "R";
    const d = before === "L" && after === "L" ? "L" : "R";
    for (let k = i; k < j; k++) out.push(d);
    i = j - 1;
  }
  return out;
}

/**
 * One line of Arabic (with any embedded English) as word items, in reading
 * order, each already in visual order. Items break at right-to-left spaces,
 * so an English phrase like "social intelligence" stays one item.
 */
export function arabicItems(text: string): string[] {
  // Ordinary whitespace only: a no-break space (see content.ts) must not split an item.
  const chars = [...shapeArabic(text.replace(/[ \t\r\n]+/g, " ").trim())];
  const dirs = directions(chars);
  const items: { c: string; d: "L" | "R" }[][] = [[]];
  chars.forEach((c, i) => {
    const item = items[items.length - 1];
    // A prefix like "الـ" or "بـ" stays on the same line as its word.
    const prefix = item.length > 0 && item[item.length - 1].c === TATWEEL;
    if (c === " " && dirs[i] === "R" && !prefix) items.push([]);
    // Direction marks have done their job above and have no glyph to draw.
    else if (c !== "\u200E" && c !== "\u200F") item.push({ c, d: dirs[i] });
  });
  return items
    .filter((item) => item.length > 0)
    .map((item) => {
      // Runs of one direction, in reverse; right-to-left runs reversed and mirrored.
      const runs: { d: "L" | "R"; s: string[] }[] = [];
      for (const { c, d } of item) {
        const last = runs[runs.length - 1];
        if (last && last.d === d) last.s.push(c);
        else runs.push({ d, s: [c] });
      }
      return runs
        .reverse()
        .map((r) => (r.d === "L" ? r.s.join("") : r.s.reverse().map((c) => MIRROR[c] ?? c).join("")))
        .join("");
    });
}
