import jinja2, os

SITE_URL = "https://theknotandnarratives.com"  # placeholder — update to your real domain

env = jinja2.Environment(
    loader=jinja2.FileSystemLoader("/home/claude/build/templates"),
    autoescape=False,
    trim_blocks=True,
    lstrip_blocks=True,
)

PAGES = [
    dict(template="home.html", out="index.html", page_id="home", path="/", hero_page=True,
         title="the Knot and Narratives | Wedding Photography & Cinematic Video, Agartala",
         meta_description="Wedding photography and cinematic films by the Knot and Narratives, based in Agartala, Tripura. Pre-wedding shoots, wedding photography, and cinematic video."),

    dict(template="portfolio.html", out="portfolio.html", page_id="portfolio", path="/portfolio.html", hero_page=True,
         title="Portfolio | the Knot and Narratives",
         meta_description="Browse recent wedding and pre-wedding photography from the Knot and Narratives, Agartala."),

    dict(template="services.html", out="services.html", page_id="services", path="/services.html", hero_page=True,
         title="Services | Wedding Photography & Cinematic Video",
         meta_description="Pre-wedding shoots, wedding photography, wedding videography and cinematic video, plus baby shower and birthday photography — the Knot and Narratives, Agartala."),

    dict(template="pricing.html", out="pricing.html", page_id="pricing", path="/pricing.html", hero_page=True,
         title="Pricing & Packages | the Knot and Narratives",
         meta_description="Wedding photography and cinematic video packages starting at ₹1,25,000, from the Knot and Narratives, Agartala."),

    dict(template="about.html", out="about.html", page_id="about", path="/about.html", hero_page=True,
         title="About | the Knot and Narratives",
         meta_description="Meet Nilanjan Das, founder and lead photographer at the Knot and Narratives, a wedding photography and cinematic film studio in Agartala."),

    dict(template="gallery.html", out="gallery.html", page_id="gallery", path="/gallery.html", hero_page=True,
         title="Client Gallery | the Knot and Narratives",
         meta_description="Private client gallery access for couples photographed by the Knot and Narratives."),

    dict(template="privacy.html", out="privacy.html", page_id="privacy", path="/privacy.html", hero_page=True,
         title="Privacy Policy | the Knot and Narratives",
         meta_description="Privacy policy for the Knot and Narratives website and photography services."),

    dict(template="terms.html", out="terms.html", page_id="terms", path="/terms.html", hero_page=True,
         title="Terms & Conditions | the Knot and Narratives",
         meta_description="Terms and conditions for booking photography and videography services with the Knot and Narratives."),
]

OUT_DIR = "/home/claude/site"

for page in PAGES:
    tpl = env.get_template(page["template"])
    html = tpl.render(site_url=SITE_URL, **page)
    with open(os.path.join(OUT_DIR, page["out"]), "w") as f:
        f.write(html)
    print("built", page["out"])

print("done")
