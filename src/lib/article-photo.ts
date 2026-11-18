import "server-only";
import { photos, type Photo } from "./images";
import type { Article } from "./articles";

type PhotoKey = keyof typeof photos;

/**
 * Articles carry no images of their own (the Shopify images were not migrated), so each one is given a cover
 * from the site's own photo library, matched to its topic by title keywords. First matching rule wins; within a
 * rule the photo is picked by a hash of the handle, so the choice is stable and neighbouring cards vary.
 */
const rules: { match: RegExp; pool: PhotoKey[] }[] = [
  { match: /rangoli|festival|diya/i, pool: ["rangolicDiya"] },
  { match: /door mat|carpet|rug/i, pool: ["carpet"] },
  { match: /wall hanging|home d[eé]cor|accessor/i, pool: ["tassels", "woven", "crochetSquares"] },
  { match: /diamond|metallic|mercy|polyester/i, pool: ["tassels", "skeins", "dyedRack"] },
  { match: /crochet|handicraft|handcraft|craft/i, pool: ["crochetSquares", "crochet", "pastelYarnTable", "yarnBallsNeedles"] },
  { match: /colou?r|shade|dye|fastness/i, pool: ["dyedRack", "yarnConesShelf", "skeins", "coneWarehouse"] },
  { match: /pilling|shrinkage|wash|soft|feel|fib(er|re)|fabric/i, pool: ["chunky", "cream", "woven", "handKnitting"] },
  { match: /breakage|needle|machine|downtime|operator|speed|output|humidity|efficien/i, pool: ["windingMachines", "spinning", "factoryTeal", "hero"] },
  { match: /lot|track|data|digital|test|audit|contamination|defect|inconsistent|consisten|quality/i, pool: ["handThread", "whiteSpools", "spinning", "pastelCones"] },
  { match: /export|dispatch|deliver|supply|inventory|wholesale|bulk|forecast|peak season|order|sourcing/i, pool: ["coneWarehouse", "winding", "yarnConesShelf"] },
  { match: /custom|blend|exclusive|innovation|unique|trend|signature/i, pool: ["blended", "skeins", "pastelCones"] },
  { match: /supplier|partner|trust|brand|price|cost|cheap|margin|profit|cash|payment|commercial|premium/i, pool: ["hosiery", "pastelCones", "blended", "whiteSpools"] },
  { match: /factory|capacity|production|planning|manufactur/i, pool: ["millAisle", "factoryFloor", "winding"] },
];

const fallback: Record<Article["blog"], PhotoKey[]> = {
  "geetex-blog": ["loom", "hosiery", "millAisle"],
  "decorative-and-handicraft-yarn": ["crochetSquares", "tassels", "skeins"],
};

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

export function articlePhoto(a: Pick<Article, "blog" | "handle" | "title">): Photo {
  const pool = rules.find((r) => r.match.test(a.title))?.pool ?? fallback[a.blog];
  return photos[pool[hash(a.handle) % pool.length]];
}
