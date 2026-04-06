---
title: "Why we need an open standard for machine-readable resumes"
headline: "Why VitaeFlow"
description: "Every ATS parses resumes differently, and they all get it wrong sometimes. What if the PDF itself carried structured data?"
date: 2026-04-06
---

## The problem everyone ignores

You upload your resume to a job platform. The system asks you to "review your information." Your job title is in the city field. Your education dates are wrong. Half your skills are missing.

This happens because every ATS, job board, and HR tool parses PDF resumes using heuristics — pattern matching, layout analysis, sometimes machine learning. It works most of the time. But "most of the time" means millions of resumes are parsed incorrectly every day.

The root cause isn't bad software. It's that **PDF is a visual format, not a data format.** A PDF tells a renderer where to draw text on a page. It says nothing about what that text means. Extracting structured data from a PDF is reverse engineering — and reverse engineering is inherently fragile.

## What if the PDF carried its own data?

There's a feature of the PDF specification that most people don't know about: **PDF/A-3 allows embedding file attachments inside a PDF.** The PDF looks and behaves exactly the same — but it carries additional files that software can read.

This isn't new or experimental. The European Union already uses this mechanism at scale for electronic invoicing ([Factur-X](https://factur-x.org)/[ZUGFeRD](https://www.ferd-net.de/standards/zugferd/index.html)): a PDF invoice that humans can read, with embedded XML data that accounting systems can extract instantly. It's proven, it scales, and it's mandatory for B2B invoices in France.

**VitaeFlow applies the same idea to resumes, using JSON instead of XML.** A VitaeFlow PDF is a normal resume that anyone can open, print, and read. Inside, it carries a JSON attachment with structured resume data. Any tool that supports VitaeFlow can extract this data instantly and perfectly — no heuristic parsing needed. Tools that don't support it simply see a normal PDF. A VitaeFlow resume works everywhere a PDF works — email, Google Drive, any ATS. The structured data is a bonus, not a requirement.

## What the data looks like

The embedded JSON follows a defined schema:

```json
{
  "version": "0.1",
  "profile": "standard",
  "basics": {
    "givenName": "Marie",
    "familyName": "Laurent",
    "email": "marie@example.com",
    "headline": "Senior Frontend Developer"
  },
  "work": [{ "organization": "TechCorp", "position": "Lead Developer", "startDate": "2021-03" }],
  "skills": [{ "category": "Frontend", "items": [{ "name": "TypeScript" }, { "name": "React" }] }]
}
```

The full schema covers education, languages, certifications, projects, and more. Only `basics` is required — everything else is optional.

## Who is this for?

**ATS vendors & job boards** — Instead of maintaining fragile parsing pipelines, detect VitaeFlow data in uploaded PDFs and extract it directly. Perfect structured data, zero guesswork.

**Resume builders & career tools** — Export VitaeFlow PDFs so your users' resumes arrive pre-structured at VitaeFlow-compatible ATS. One feature that makes your tool more valuable.

**HR tech developers** — Integrate `@vitaeflow/sdk` to read and write structured resumes in a few lines of code, instead of building custom parsers for every resume format.

**Candidates** — Better parsing means your resume is read correctly. No more "please review your information."

## Open by design

A resume standard only works if nobody owns it. VitaeFlow is fully open source under the MIT license — the spec, the tools, the website. No vendor lock-in, no proprietary format, no gatekeeping.

Standards succeed through adoption, not control. If VitaeFlow is useful, people will use it. If it's not, no amount of marketing will save it. That's the bet.

## Try it out

VitaeFlow ships with an SDK, a CLI, and web tools to get started. Everything is on [GitHub](https://github.com/VitaeFlow), published on npm, and ready to use.

- [Getting started](/docs/) — from install to working code in under 5 minutes
- [GitHub](https://github.com/VitaeFlow) — spec, SDK, CLI, and website source
- `npm install @vitaeflow/sdk`

If you build tools that process resumes, I'd love to hear how this could fit into your workflow. Open an issue, start a discussion, or just try the SDK and tell me what breaks.
