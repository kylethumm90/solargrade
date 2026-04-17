export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  category: 'News' | 'Insights' | 'Product' | 'Industry'
  author: string
  date: string
  readTime: string
  coverEmoji: string
  content: string
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'welcome-to-solargrade',
    title: 'Welcome to SolarGrade',
    excerpt:
      'Why the solar industry needs a transparent review platform, and what we\'re building to fix it.',
    category: 'News',
    author: 'The SolarGrade Team',
    date: '2026-04-10',
    readTime: '4 min read',
    coverEmoji: '\u2600\uFE0F',
    content: `The solar industry runs on reputation, but reputation in solar is currently broken.

Right now, if you want to know whether a lead vendor pays on time, whether an installer actually finishes jobs, or whether a CRM is worth the monthly fee, you have two options: ask around in a private Facebook group, or learn the hard way.

Neither is good enough.

## What SolarGrade Is

SolarGrade is a review platform where solar professionals rate the companies they actually work with. Installers, lead vendors, CRMs, call centers, financing companies, software tools - all rated by people with real experience.

Think of it as Glassdoor for the solar industry. Every review is categorized, structured, and tied to a real relationship (subcontractor, sales rep, homeowner, partner) so readers can weigh it accordingly.

## Why Now

The industry has grown faster than its accountability systems. Good companies lose business because of anonymous bad-faith posts. Bad companies keep operating because their victims have nowhere to warn others. Both problems have the same root cause: no shared, structured record of how companies actually behave.

We\'re building that record.

## What\'s Next

We\'re in beta and actively onboarding companies, reviewers, and industry partners. If you have a company to add, a review to submit, or feedback on how we should build this, we want to hear from you.

This is just the beginning.`,
  },
  {
    slug: 'how-we-verify-reviews',
    title: 'How We Verify Reviews (And Why It Matters)',
    excerpt:
      'A three-stage verification system that protects reviewers, is fair to companies, and makes ratings you can trust.',
    category: 'Product',
    author: 'The SolarGrade Team',
    date: '2026-04-03',
    readTime: '5 min read',
    coverEmoji: '\u2705',
    content: `A review platform is only as good as the reviews on it. If anyone can post anything anonymously, the signal gets drowned out by noise - and worse, by bad-faith attacks.

We\'ve designed a three-stage verification system to make SolarGrade reviews something you can actually trust.

## Stage 1: Manual Review (Live Now)

Every review submitted to SolarGrade goes through a manual approval process before it goes live. Nothing is auto-published. Obvious spam, fake reviews, and bad-faith submissions are filtered out before anyone sees them.

This is slower than automated approval, but the trade-off is worth it while the platform is young.

## Stage 2: Authenticated Reviews (Coming Soon)

Reviews will be tied to a verified login. Your email isn\'t shown publicly, but it adds a layer of accountability and makes duplicate or sockpuppet submissions much harder.

## Stage 3: Verified Reviews (The Goal)

Reviewers will be able to privately submit proof of their working relationship with a company - a subcontractor agreement, an invoice, a dealer contract. That information stays private, but verified reviews earn a badge and carry more weight in the rating system.

The end state: real credibility without exposing your identity.`,
  },
  {
    slug: 'why-structured-ratings-matter',
    title: 'Why Structured Ratings Beat a Single Star Score',
    excerpt:
      'One number hides everything that actually matters. Here\'s how we break reviews down so companies and readers get the full picture.',
    category: 'Insights',
    author: 'The SolarGrade Team',
    date: '2026-03-24',
    readTime: '3 min read',
    coverEmoji: '\u2B50',
    content: `Most review sites boil a company down to a single number between one and five stars. That number is useless.

A four-star installer could be a company that pays on time, installs well, and has middling communication. Or it could be a company with amazing communication but chronic payment delays. Same score, completely different experiences for the person deciding whether to work with them.

## How SolarGrade Rates Companies

Every review on SolarGrade is broken down into specific, category-appropriate dimensions. For installers, that means:

- Payment Reliability
- Communication
- Install Quality
- Customer Support
- Install Speed
- Would Recommend

Lead vendors, CRMs, software tools, and sales orgs each have their own rating dimensions tailored to what actually matters in that category.

## Why This Is Good for Companies

Nuance protects companies too. One weak score in a single dimension doesn\'t sink an otherwise strong profile. A company that\'s great at the work but slow on communication can improve the one thing - and reviewers can see exactly where the strengths are.

Detail is fairer than a single number. It\'s better for reviewers, better for readers, and better for the good companies trying to stand out.`,
  },
  {
    slug: 'solar-industry-reputation-in-2026',
    title: 'The State of Solar Industry Reputation in 2026',
    excerpt:
      'What we\'re hearing from subs, reps, and installers about how trust is currently built (and broken) in the solar industry.',
    category: 'Industry',
    author: 'The SolarGrade Team',
    date: '2026-03-12',
    readTime: '6 min read',
    coverEmoji: '\uD83D\uDCCA',
    content: `We\'ve spent the last few months talking to subcontractors, sales reps, installers, and homeowners about how they decide who to work with in the solar industry. A few patterns stood out.

## Reputation Lives in Private Channels

Almost everyone we talked to said the same thing: their vetting process starts in a private Facebook group, a WhatsApp thread, or a phone call with a trusted peer. That works, until it doesn\'t. Private channels are slow, regional, and heavily biased toward whoever shouts loudest.

## Bad Actors Rotate

Because reputation isn\'t durable, bad actors can rebrand, relocate, or simply wait out the memory of the group. A company that burned a crew in Arizona last year can easily find new subs in Texas this year.

## Good Companies Lose Out

The companies hurt most by the current system are actually the good ones. They can\'t point new partners to a record of consistent, long-term positive reviews. They rely on word of mouth that doesn\'t scale.

## What We\'re Building Toward

SolarGrade is trying to make reputation in solar portable, durable, and structured. Not a replacement for the informal networks, but a public record that complements them.

If you\'ve had experiences - good or bad - we\'d love a review. The more the industry contributes, the more useful this becomes for everyone.`,
  },
]

export function getAllPosts(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug)
}

export function formatPostDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export const CATEGORY_COLORS: Record<BlogPost['category'], string> = {
  News: '#f59e0b',
  Insights: '#3b82f6',
  Product: '#8b5cf6',
  Industry: '#10b981',
}
