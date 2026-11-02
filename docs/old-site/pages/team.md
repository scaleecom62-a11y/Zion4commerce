# Team: `/team` and `/team/<slug>`

## Team listing: `/team`

Title: "Zion4Commerce Team — Digital Commerce Architects"
Content source: `team_members` table (status = active, sorted by `order_index`), plus `page_content` (page = `team`, sections `hero`, `value_props`, `team_cta`) with fallback text.
Screenshots: `../screenshots/team.desktop.jpg`, `../screenshots/team.mobile.jpg`

**Caveat:** the database was unreachable during capture. The member grid showed "No team members found." The site may show the same thing to real visitors if the bolt.new database is paused. This needs checking in a normal browser.

### 1. Hero

- Pill: Our Team
- H1: Meet the experts behind your growth
- Sub: Experienced ecommerce leaders focused on scaling brands with measurable results
- Chips: Industry Veterans · Expert Team

### 2. Member grid

Each card links to `/team/<slug>`. It shows the headshot, name, role, short bio and LinkedIn link. Members not captured (database). For the hardcoded list, see [home.md](home.md#7-team-team).

### 3. Value props

| Card | Text |
|---|---|
| Proven Expertise | 10+ years combined experience in ecommerce and marketplace growth |
| Collaborative Approach | We work as an extension of your team, not just consultants |
| Results-Driven | Focused on measurable outcomes and sustainable growth |

### 4. CTA (dark section)

- H2: Want to Work with Our Team?
- Sub: Let's discuss how we can help you achieve your ecommerce growth goals.
- Button: **Book a Consultation** → `/connect`

---

## Team profile: `/team/<slug>`

Content source: one `team_members` row matched by `slug`. If no active row matches, the visitor is sent back to `/team`.

Layout:

- "← Back to Team" link
- Left: square headshot, or an initials circle if none
- Right: name, role, `short_bio`, full `bio`, **Connect on LinkedIn** button
- Bottom CTA: "Want to discuss your ecommerce growth?" · "Connect with our team to explore how we can help you scale globally and improve profitability." · **Get in touch** → `/connect`

SEO per profile: page title = `meta_title` or "`<name>` — Zion4Commerce", meta description = `meta_description`, plus JSON-LD `Person` schema (name, jobTitle, description, worksFor Zion4Commerce, sameAs LinkedIn).

`team_members` fields used: `name`, `slug`, `role`, `short_bio`, `bio`, `headshot`, `linkedin_url`, `meta_title`, `meta_description`, `status`, `order_index`.

**Not captured:** the actual profile slugs, full bios and headshots.
