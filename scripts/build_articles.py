"""Build src/content/articles.json from the live GeeTex Shopify blog.

Sources: sitemap_articles_1.xml for the full URL list, Atom feeds for the
first 30 posts per blog, and the article page itself for the rest.
Article HTML is reduced to an allowlist of safe tags; images are dropped
(we do not reuse the reference site's imagery).
"""
import json, re, sys, time, html, urllib.request
from html.parser import HTMLParser
from xml.etree import ElementTree as ET

FEEDS_DIR, OUT = sys.argv[1], sys.argv[2]
UA = {"User-Agent": "Mozilla/5.0 (content migration for site owner)"}
ATOM = "{http://www.w3.org/2005/Atom}"

ALLOWED = {"p", "h2", "h3", "h4", "ul", "ol", "li", "strong", "b", "em", "i",
           "a", "blockquote", "table", "thead", "tbody", "tr", "th", "td", "br", "hr"}
VOID = {"br", "hr"}
DROP_CONTENT = {"script", "style", "noscript", "iframe", "svg", "img", "picture", "figure", "button", "form"}
HEADING_DOWN = {"h1": "h2"}  # article body must not contain a second h1


class Sanitizer(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.out, self.stack, self.skip = [], [], 0

    def handle_starttag(self, tag, attrs):
        if tag in DROP_CONTENT:
            if tag not in ("img",):
                self.skip += 1
            return
        if self.skip:
            return
        tag = HEADING_DOWN.get(tag, tag)
        if tag not in ALLOWED:
            return
        if tag == "a":
            href = dict(attrs).get("href") or ""
            href = re.sub(r"^https?://(www\.)?geetexyarn\.com", "", href)
            href = {"/collections/all": "/pages/product-range", "/blogs/news": "/blogs/geetex-blog"}.get(href, href)
            if href.startswith("/pages/") or href.startswith("/blogs/") or href.startswith("/products/") or href.startswith("/collections/") or href == "/":
                self.out.append(f'<a href="{html.escape(href, quote=True)}">')
            elif href.startswith("https://") or href.startswith("http://") or href.startswith("mailto:") or href.startswith("tel:"):
                self.out.append(f'<a href="{html.escape(href, quote=True)}" rel="noopener nofollow" target="_blank">')
            else:
                self.out.append("<a>")
        else:
            self.out.append(f"<{tag}>")
        if tag not in VOID:
            self.stack.append(tag)

    def handle_endtag(self, tag):
        if tag in DROP_CONTENT:
            if tag != "img" and self.skip:
                self.skip -= 1
            return
        if self.skip:
            return
        tag = HEADING_DOWN.get(tag, tag)
        if tag in ALLOWED and tag not in VOID and tag in self.stack:
            while self.stack:
                t = self.stack.pop()
                self.out.append(f"</{t}>")
                if t == tag:
                    break

    def handle_data(self, data):
        if not self.skip:
            self.out.append(html.escape(data, quote=False))

    def result(self):
        while self.stack:
            self.out.append(f"</{self.stack.pop()}>")
        s = "".join(self.out)
        s = re.sub(r"<(p|li|h2|h3|h4|strong|em|a)>\s*</\1>", "", s)
        s = re.sub(r"\s+\n", "\n", s)
        return s.strip()


def clean(fragment):
    p = Sanitizer()
    p.feed(fragment)
    p.close()
    return p.result()


def text_of(fragment):
    t = re.sub(r"<[^>]+>", " ", fragment)
    return re.sub(r"\s+", " ", html.unescape(t)).strip()


def fetch(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read().decode("utf-8", "replace")


def article_body_from_page(page):
    # Horizon theme: body lives in the first <rte-formatter> of the blog_post_content block
    b = page.find("blog_post_content")
    if b != -1:
        m = re.search(r"<rte-formatter[^>]*>", page[b:])
        if m:
            start = b + m.end()
            end = page.find("</rte-formatter>", start)
            if end != -1:
                return page[start:end]
    m = re.search(r'<div[^>]*itemprop="articleBody"[^>]*>', page)
    if not m:
        return None
    # walk forward matching nested divs
    i, depth = m.end(), 1
    for t in re.finditer(r"<(/?)div\b", page[i:]):
        depth += -1 if t.group(1) else 1
        if depth == 0:
            return page[i:i + t.start()]
    return None


def meta(page, name):
    m = re.search(r'<meta[^>]+(?:name|property)="%s"[^>]+content="([^"]*)"' % re.escape(name), page)
    return html.unescape(m.group(1)) if m else None


feed_entries = {}
for blog in ("geetex-blog", "decorative-and-handicraft-yarn"):
    root = ET.parse(f"{FEEDS_DIR}/{blog}-1.atom").getroot()
    for e in root.findall(f"{ATOM}entry"):
        url = e.find(f"{ATOM}link").get("href")
        feed_entries[url] = {
            "title": e.find(f"{ATOM}title").text.strip(),
            "published": e.find(f"{ATOM}published").text,
            "author": (e.find(f"{ATOM}author/{ATOM}name").text or "").strip(),
            "summary": text_of(e.find(f"{ATOM}summary").text or "") if e.find(f"{ATOM}summary") is not None else "",
            "raw": e.find(f"{ATOM}content").text or "",
        }

sm = open(f"{FEEDS_DIR}/sm-sitemap_articles_1.xml", encoding="utf-8").read()
urls = re.findall(r"<loc>(https://geetexyarn\.com/blogs/[^<]+)</loc>", sm)
articles, failed = [], []
for url in urls:
    blog, handle = url.split("/")[4], url.split("/")[5]
    if url in feed_entries:
        fe = feed_entries[url]
        body, title, pub, author, summary = fe["raw"], fe["title"], fe["published"], fe["author"], fe["summary"]
    else:
        try:
            page = fetch(url)
            time.sleep(0.4)
        except Exception as ex:  # noqa: BLE001
            failed.append((url, str(ex)))
            continue
        body = article_body_from_page(page)
        if body is None:
            failed.append((url, "no articleBody"))
            continue
        title = meta(page, "og:title") or handle
        m = re.search(r'<time[^>]*datetime="([^"]+)"', page)
        pub = m.group(1) if m else None
        author = "Ritesh Goyal" if "Ritesh Goyal" in page else "GeeTex"
        summary = meta(page, "description") or ""
    cleaned = clean(body)
    if not summary:
        summary = text_of(cleaned)[:220]
    title = re.sub(r"^GEO-\d+\s*\|\s*", "", title).strip()
    articles.append({
        "blog": blog, "handle": handle, "title": title, "published": pub,
        "author": author, "summary": summary[:300], "html": cleaned,
        "sourceUrl": url,
    })

articles.sort(key=lambda a: a["published"] or "", reverse=True)
json.dump(articles, open(OUT, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print("articles:", len(articles), "failed:", len(failed))
for f in failed:
    print("FAILED", *f)
