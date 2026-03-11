-- Fix: Re-seed reviews (table was renamed from companies to vendors)
-- Run this in the Supabase SQL Editor to restore reviews

-- Clear any stale reviews
DELETE FROM reviews;

-- Review 1: Sunrun - Jason M.
INSERT INTO reviews (company_id, reviewer_name, company, ratings, review_text, created_at)
SELECT id, 'Jason M.', 'Independent Sub',
  '{"payReliability":2,"communication":2,"installQuality":3,"customerSupport":3,"installSpeed":2,"wouldRecommend":2}'::jsonb,
  'Payment timelines are inconsistent. We''ve waited 60+ days on multiple jobs. Communication from project managers is hit or miss depending on the region. The volume is there but the margins get squeezed and you''re always chasing payments.',
  '2026-02-20'::timestamptz
FROM vendors WHERE slug = 'sunrun';

-- Review 2: Sunrun - Carlos R.
INSERT INTO reviews (company_id, reviewer_name, company, ratings, review_text, created_at)
SELECT id, 'Carlos R.', 'SunWorks Electric',
  '{"payReliability":3,"communication":3,"installQuality":3,"customerSupport":4,"installSpeed":3,"wouldRecommend":3}'::jsonb,
  'Decent volume of work if you can handle the net-45 terms. Warranty support is actually solid once the system is in their platform. Main complaint is the back and forth on change orders and how long approvals take.',
  '2026-01-30'::timestamptz
FROM vendors WHERE slug = 'sunrun';

-- Review 3: Trinity Solar - Mike D.
INSERT INTO reviews (company_id, reviewer_name, company, ratings, review_text, created_at)
SELECT id, 'Mike D.', 'Northeast Solar Co',
  '{"payReliability":4,"communication":4,"installQuality":4,"customerSupport":3,"installSpeed":4,"wouldRecommend":4}'::jsonb,
  'One of the better large installers to sub for in the Northeast. Pay is reliable, usually within 30 days. They communicate well on scheduling and site changes. Install standards are high which keeps quality consistent across crews.',
  '2026-02-12'::timestamptz
FROM vendors WHERE slug = 'trinity-solar';

-- Review 4: Momentum Solar - Dave P.
INSERT INTO reviews (company_id, reviewer_name, company, ratings, review_text, created_at)
SELECT id, 'Dave P.', 'Patriot Power',
  '{"payReliability":1,"communication":2,"installQuality":3,"customerSupport":2,"installSpeed":1,"wouldRecommend":1}'::jsonb,
  'Avoid. We completed 14 installs and had to fight for payment on almost every single one. Always finding reasons to hold back or dispute completed work. Sales team overpromises to homeowners which creates problems on site that fall on the installer.',
  '2026-02-25'::timestamptz
FROM vendors WHERE slug = 'momentum-solar';

-- Review 5: Freedom Solar Power - Ryan K.
INSERT INTO reviews (company_id, reviewer_name, company, ratings, review_text, created_at)
SELECT id, 'Ryan K.', 'Lone Star Electric',
  '{"payReliability":5,"communication":5,"installQuality":5,"customerSupport":4,"installSpeed":5,"wouldRecommend":5}'::jsonb,
  'Best installer we''ve worked with. Pay is on time every time. Project managers are responsive and professional. They hold their crews to a high standard which makes the job easier for everyone. Premium company to partner with.',
  '2026-01-18'::timestamptz
FROM vendors WHERE slug = 'freedom-solar-power';

-- Review 6: Palmetto Solar - Angela S.
INSERT INTO reviews (company_id, reviewer_name, company, ratings, review_text, created_at)
SELECT id, 'Angela S.', 'Green Mountain Installs',
  '{"payReliability":3,"communication":2,"installQuality":3,"customerSupport":3,"installSpeed":2,"wouldRecommend":2}'::jsonb,
  'The platform model means you''re dealing with a tech company, not a solar company. Communication goes through the app which is fine when it works but frustrating when you need a real person. Pay is okay but the process is overly bureaucratic.',
  '2026-02-05'::timestamptz
FROM vendors WHERE slug = 'palmetto-solar';

-- Review 7: Energy Bill Cruncher - Kyle T.
INSERT INTO reviews (company_id, reviewer_name, company, ratings, review_text, created_at)
SELECT id, 'Kyle T.', 'RTP Solar',
  '{"leadQuality":4,"support":4,"integration":3,"roi":5,"transparency":4,"reliability":4}'::jsonb,
  'EBC has been our most cost-effective lead source. At roughly $1,400 per sale versus $5K+ from other companies, the ROI speaks for itself. Lead quality is consistent and their team is responsive.',
  '2026-02-15'::timestamptz
FROM vendors WHERE slug = 'energy-bill-cruncher';

-- Review 8: GoHighLevel - Kyle T.
INSERT INTO reviews (company_id, reviewer_name, company, ratings, review_text, created_at)
SELECT id, 'Kyle T.', 'RTP Solar',
  '{"customization":5,"support":3,"integration":4,"roi":5,"reporting":4,"reliability":4}'::jsonb,
  'GHL is the backbone of our entire operation. Automations, funnels, pipeline management. Support can be slow but the community fills the gaps. For the price point, nothing else comes close.',
  '2026-01-20'::timestamptz
FROM vendors WHERE slug = 'gohighlevel';

-- Review 9: Freedom Forever - Brian T.
INSERT INTO reviews (company_id, reviewer_name, company, ratings, review_text, created_at)
SELECT id, 'Brian T.', 'Solar Pros West',
  '{"payReliability":4,"communication":4,"installQuality":4,"customerSupport":5,"installSpeed":4,"wouldRecommend":4}'::jsonb,
  'Freedom Forever''s 25-year production guarantee is the real deal. They back it up. Pay is reliable, usually net-30. The regional team model means your experience depends heavily on which market you''re in, but overall a solid partner.',
  '2026-02-18'::timestamptz
FROM vendors WHERE slug = 'freedom-forever';

-- Review 10: Tesla Solar - Amanda W.
INSERT INTO reviews (company_id, reviewer_name, company, ratings, review_text, created_at)
SELECT id, 'Amanda W.', 'Spark Electric',
  '{"payReliability":3,"communication":1,"installQuality":4,"customerSupport":3,"installSpeed":2,"wouldRecommend":2}'::jsonb,
  'Install quality is good when they finally show up. Communication is basically nonexistent. We''ve waited months for project updates. Everything goes through an app with no real human contact. If you can handle the frustration, the product itself is solid.',
  '2026-01-25'::timestamptz
FROM vendors WHERE slug = 'tesla-solar';

-- Review 11: Titan Solar Power - Greg L.
INSERT INTO reviews (company_id, reviewer_name, company, ratings, review_text, created_at)
SELECT id, 'Greg L.', 'Desert Sun Installs',
  '{"payReliability":1,"communication":1,"installQuality":2,"customerSupport":1,"installSpeed":1,"wouldRecommend":1}'::jsonb,
  'Went out of business owing us over $40K for completed installs. No communication, no warning. One day the phones just stopped being answered. Anyone still owed money, get in line with the creditors. This is exactly why SolarGrade needs to exist.',
  '2026-01-10'::timestamptz
FROM vendors WHERE slug = 'titan-solar-power';

-- Review 12: Lumio - Kevin S.
INSERT INTO reviews (company_id, reviewer_name, company, ratings, review_text, created_at)
SELECT id, 'Kevin S.', 'Mountain West Solar',
  '{"payReliability":1,"communication":1,"installQuality":2,"customerSupport":1,"installSpeed":1,"wouldRecommend":1}'::jsonb,
  'Vivint Solar rebranded to Lumio and then collapsed. Left hundreds of subcontractors unpaid and thousands of homeowners with systems nobody will service. The door-to-door model was always about volume over quality. Classic cautionary tale.',
  '2026-02-02'::timestamptz
FROM vendors WHERE slug = 'lumio';

-- Review 13: Venture Solar - Tim F.
INSERT INTO reviews (company_id, reviewer_name, company, ratings, review_text, created_at)
SELECT id, 'Tim F.', 'Homeowner',
  '{"payReliability":5,"communication":5,"installQuality":5,"customerSupport":5,"installSpeed":5,"wouldRecommend":5}'::jsonb,
  '36 panels installed in one day. The crew was professional and efficient. From consultation to final walkthrough, communication was outstanding. The 30-year workmanship warranty gives real peace of mind. Best solar experience I''ve heard of from anyone.',
  '2026-02-08'::timestamptz
FROM vendors WHERE slug = 'venture-solar';

-- Review 14: Elevation Solar - Rachel M.
INSERT INTO reviews (company_id, reviewer_name, company, ratings, review_text, created_at)
SELECT id, 'Rachel M.', 'Homeowner',
  '{"payReliability":4,"communication":4,"installQuality":5,"customerSupport":4,"installSpeed":3,"wouldRecommend":4}'::jsonb,
  'The whole-home approach is what sold me. They didn''t just slap panels on the roof. They looked at insulation, HVAC efficiency, everything. The system is producing above what they quoted. Only knock is pricing could be more transparent upfront.',
  '2026-01-22'::timestamptz
FROM vendors WHERE slug = 'elevation-solar';

-- Review 15: Solcius - Mark H.
INSERT INTO reviews (company_id, reviewer_name, company, ratings, review_text, created_at)
SELECT id, 'Mark H.', 'Bright Future Solar',
  '{"payReliability":1,"communication":1,"installQuality":2,"customerSupport":1,"installSpeed":1,"wouldRecommend":1}'::jsonb,
  'Closed overnight. We had 6 installs in progress. Homeowners calling us asking what happened, and we had no answers because Solcius ghosted everyone. Still trying to get paid for completed work. Another one that grew too fast on borrowed time.',
  '2026-02-14'::timestamptz
FROM vendors WHERE slug = 'solcius';
