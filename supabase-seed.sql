-- SolarGrade Seed Data
-- Run this in the Supabase SQL Editor AFTER the schema

-- ============================================
-- VENDORS (42 total)
-- ============================================

-- INSTALLERS - Active (18)
INSERT INTO vendors (slug, name, category, website, description) VALUES
('sunrun', 'Sunrun', 'installers', 'https://sunrun.com', 'Largest residential solar installer in the US with ~10% market share and 7.5+ GW installed. Offers leases, PPAs, and purchases. Massive scale but mixed reviews on subcontractor quality and post-install support.'),
('freedom-forever', 'Freedom Forever', 'installers', 'https://freedomforever.com', '#1 residential solar contractor on Solar Power World''s 2025 list for the second year running. Operates in 36+ states with 3,000+ employees. Uses regionally focused teams and a 25-year production guarantee.'),
('trinity-solar', 'Trinity Solar', 'installers', 'https://trinitysolar.com', 'Major residential installer across the Northeast. In-house crews in most markets. One of the largest privately held solar companies in the US.'),
('tesla-solar', 'Tesla Solar', 'installers', 'https://tesla.com/solarpanels', 'Tesla''s solar division offering panels, Solar Roof tiles, Powerwall batteries, and Tesla Inverter. Sleek design and tech ecosystem integration. Known for long wait times and inconsistent communication.'),
('sunpower', 'SunPower', 'installers', 'https://sunpower.com', 'Pioneer in high-efficiency panels (22.8%). Filed for bankruptcy in 2024 and halted new installations. Restructured and returned under new ownership. 35+ years in solar. Legacy installs still under warranty.'),
('palmetto-solar', 'Palmetto Solar', 'installers', 'https://palmetto.com', 'Technology-focused solar company using a marketplace model connecting homeowners with local installers. Raised $1.2B+ in capital. Platform approach means variable installer quality.'),
('momentum-solar', 'Momentum Solar', 'installers', 'https://momentumsolar.com', 'National residential installer. Known for aggressive door-to-door sales and mixed reviews on install timelines and payment practices with subcontractors.'),
('blue-raven-solar', 'Blue Raven Solar', 'installers', 'https://blueravensolar.com', 'National installer acquired by SunPower. Operates in 20+ states. Known for competitive pricing and BluePower Plus+ financing option.'),
('freedom-solar-power', 'Freedom Solar Power', 'installers', 'https://freedomsolarpower.com', 'Premium regional installer based in Texas. Known for high install quality, strong communication, and myFreedom customer portal. Won 2025 Buyer''s Choice Award.'),
('elevation-solar', 'Elevation Solar (Powered by Elevation)', 'installers', 'https://poweredbyelevation.com', 'Whole-home energy company combining solar with efficiency upgrades and smart home management. Backed by Bernhard Capital. 25-year panel warranty.'),
('sunnova-energy', 'Sunnova Energy', 'installers', 'https://sunnova.com', 'Residential solar and storage company operating in 48+ states through a dealer network. Offers leases, PPAs, and loans. Filed for bankruptcy in 2025 with asset sale approved.'),
('posigen', 'PosiGen', 'installers', 'https://posigen.com', 'Solar installer focused on making clean energy accessible to low-to-moderate income households. No credit score requirement. Channel partner program supporting local installers.'),
('venture-solar', 'Venture Solar', 'installers', 'https://venturesolar.com', 'Northeast-focused installer with all in-house crews. Known for attention to detail on complex roofs and historic properties. 30-year workmanship warranty. BBB A+ rated.'),
('project-solar', 'Project Solar', 'installers', 'https://projectsolar.io', 'Online solar marketplace that vets local installers and backs them with a double-backed warranty. Lower prices by cutting sales rep costs. DIY option available.'),
('sol-up', 'Sol-Up', 'installers', 'https://solup.com', 'Las Vegas-based installer ranked #17 nationally on Solar Power World''s 2025 list. Strong regional presence in Nevada.'),
('greenspark-solar', 'GreenSpark Solar', 'installers', 'https://greensparksolar.com', '#1 EPC for community solar on the 2025 Top Solar Contractors list. Over 350 MW installed across the Northeast.'),
('petersendean', 'PetersenDean', 'installers', 'https://petersendean.com', 'Combined roofing and solar installer. Offers integrated roof replacement plus solar. Operates primarily in California, Nevada, Texas, and Florida.'),
('freedom-power', 'Freedom Power', 'installers', 'https://gofreedompower.com', 'Texas and Florida installer offering solar, battery backup, generators, and HVAC. Over 24,000 systems installed.');

-- INSTALLERS - Defunct (12)
INSERT INTO vendors (slug, name, category, website, description) VALUES
('adt-solar', 'ADT Solar (Sunpro Solar)', 'installers', NULL, 'Formerly Sunpro Solar, acquired by ADT in 2021. Was #2 residential installer nationally. Exited solar in 2024 and stopped accepting new customers.'),
('titan-solar-power', 'Titan Solar Power', 'installers', NULL, 'Formerly one of the largest residential installers. Went out of business in 2023-2024. Aggressive expansion outpaced operational capacity.'),
('lumio', 'Lumio (formerly Vivint Solar)', 'installers', NULL, 'Previously Vivint Solar before rebranding. Ceased operations during the 2023-2024 downturn. Left many customers with orphaned installations and unfulfilled warranties.'),
('vision-solar', 'Vision Solar', 'installers', NULL, 'National residential installer that ceased operations in 2023-2024. Known for aggressive sales practices. Multiple states filed consumer complaints before closure.'),
('solcius', 'Solcius', 'installers', NULL, 'Residential installer that went out of business in 2024. Closed abruptly leaving customers mid-install with incomplete projects.'),
('infinity-energy', 'Infinity Energy', 'installers', NULL, 'Florida-based residential installer that ceased operations in 2024. Had been one of the fastest-growing installers before the market correction.'),
('sunworks-isun', 'Sunworks (iSun)', 'installers', NULL, 'Publicly traded installer that ceased operations. Previously operated as both Sunworks and iSun across residential and commercial markets.'),
('erus-energy', 'Erus Energy', 'installers', NULL, 'Solar installer that went out of business during the 2023-2024 industry correction.'),
('solarworks', 'Solarworks', 'installers', NULL, 'Solar installation company that ceased operations during the industry downturn of 2023-2024.'),
('suntuity', 'Suntuity', 'installers', NULL, 'Residential installer that went out of business during the 2023-2024 market correction. Had operated across multiple states.'),
('encore-solar', 'Encore Solar', 'installers', NULL, 'Installer known for poor installations and broken panels, particularly in Colorado. Ceased operations leaving customers without warranty support.'),
('kayo-energy', 'Kayo Energy', 'installers', NULL, 'Solar installer that went out of business during the 2023-2024 shakeout. Casualty of the market correction.');

-- LEAD VENDORS (5)
INSERT INTO vendors (slug, name, category, website, description) VALUES
('energy-bill-cruncher', 'Energy Bill Cruncher', 'leads', 'https://energybillcruncher.com', 'Lead generation platform for solar installers. Known for high-volume, cost-effective leads with strong conversion potential.'),
('solar-reviews', 'Solar Reviews', 'leads', 'https://solarreviews.com', 'Premium solar lead provider and consumer review platform. Higher price point with variable lead quality.'),
('modernize', 'Modernize (Quinstreet)', 'leads', 'https://modernize.com', 'Home services lead marketplace owned by Quinstreet. Provides shared leads across solar, roofing, HVAC.'),
('elocal', 'eLocal', 'leads', 'https://elocal.com', 'Pay-per-call and pay-per-lead provider. Mixed reputation for lead quality and billing practices.'),
('energysage', 'EnergySage', 'leads', 'https://energysage.com', 'Online solar marketplace where homeowners compare quotes from pre-screened installers. Higher intent leads.');

-- CRM SYSTEMS (3)
INSERT INTO vendors (slug, name, category, website, description) VALUES
('gohighlevel', 'GoHighLevel', 'crm', 'https://gohighlevel.com', 'All-in-one CRM and marketing automation platform popular with agencies and home service businesses.'),
('salesforce', 'Salesforce', 'crm', 'https://salesforce.com', 'Enterprise CRM with solar-specific configurations. Powerful but complex with steep learning curve.'),
('hubspot', 'HubSpot', 'crm', 'https://hubspot.com', 'Inbound-focused CRM with strong marketing automation. Free tier available. Growing solar adoption.');

-- SOFTWARE (2)
INSERT INTO vendors (slug, name, category, website, description) VALUES
('activeprospect', 'ActiveProspect', 'software', 'https://activeprospect.com', 'TCPA compliance and lead verification. TrustedForm and LeadConduit for lead legitimacy.'),
('aurora-solar', 'Aurora Solar', 'software', 'https://aurorasolar.com', 'Solar design and sales software. Industry standard for residential solar system design, proposals, and permitting.');

-- FINANCING (2)
INSERT INTO vendors (slug, name, category, website, description) VALUES
('goodleap', 'GoodLeap', 'financing', 'https://goodleap.com', 'Leading solar loan platform offering point-of-sale financing. Used by many installers as primary financing partner.'),
('mosaic', 'Mosaic', 'financing', 'https://joinmosaic.com', 'Solar loan provider offering competitive rates and dealer tools. One of the largest residential solar lenders in the US.');


-- ============================================
-- REVIEWS (15 total)
-- ============================================

-- Review 1: Sunrun - Jason M.
INSERT INTO reviews (vendor_id, reviewer_name, company, ratings, review_text, created_at)
SELECT id, 'Jason M.', 'Independent Sub',
  '{"payReliability":2,"communication":2,"installQuality":3,"customerSupport":3,"installSpeed":2,"wouldRecommend":2}'::jsonb,
  'Payment timelines are inconsistent. We''ve waited 60+ days on multiple jobs. Communication from project managers is hit or miss depending on the region. The volume is there but the margins get squeezed and you''re always chasing payments.',
  '2026-02-20'::timestamptz
FROM vendors WHERE slug = 'sunrun';

-- Review 2: Sunrun - Carlos R.
INSERT INTO reviews (vendor_id, reviewer_name, company, ratings, review_text, created_at)
SELECT id, 'Carlos R.', 'SunWorks Electric',
  '{"payReliability":3,"communication":3,"installQuality":3,"customerSupport":4,"installSpeed":3,"wouldRecommend":3}'::jsonb,
  'Decent volume of work if you can handle the net-45 terms. Warranty support is actually solid once the system is in their platform. Main complaint is the back and forth on change orders and how long approvals take.',
  '2026-01-30'::timestamptz
FROM vendors WHERE slug = 'sunrun';

-- Review 3: Trinity Solar - Mike D.
INSERT INTO reviews (vendor_id, reviewer_name, company, ratings, review_text, created_at)
SELECT id, 'Mike D.', 'Northeast Solar Co',
  '{"payReliability":4,"communication":4,"installQuality":4,"customerSupport":3,"installSpeed":4,"wouldRecommend":4}'::jsonb,
  'One of the better large installers to sub for in the Northeast. Pay is reliable, usually within 30 days. They communicate well on scheduling and site changes. Install standards are high which keeps quality consistent across crews.',
  '2026-02-12'::timestamptz
FROM vendors WHERE slug = 'trinity-solar';

-- Review 4: Momentum Solar - Dave P.
INSERT INTO reviews (vendor_id, reviewer_name, company, ratings, review_text, created_at)
SELECT id, 'Dave P.', 'Patriot Power',
  '{"payReliability":1,"communication":2,"installQuality":3,"customerSupport":2,"installSpeed":1,"wouldRecommend":1}'::jsonb,
  'Avoid. We completed 14 installs and had to fight for payment on almost every single one. Always finding reasons to hold back or dispute completed work. Sales team overpromises to homeowners which creates problems on site that fall on the installer.',
  '2026-02-25'::timestamptz
FROM vendors WHERE slug = 'momentum-solar';

-- Review 5: Freedom Solar Power - Ryan K.
INSERT INTO reviews (vendor_id, reviewer_name, company, ratings, review_text, created_at)
SELECT id, 'Ryan K.', 'Lone Star Electric',
  '{"payReliability":5,"communication":5,"installQuality":5,"customerSupport":4,"installSpeed":5,"wouldRecommend":5}'::jsonb,
  'Best installer we''ve worked with. Pay is on time every time. Project managers are responsive and professional. They hold their crews to a high standard which makes the job easier for everyone. Premium company to partner with.',
  '2026-01-18'::timestamptz
FROM vendors WHERE slug = 'freedom-solar-power';

-- Review 6: Palmetto Solar - Angela S.
INSERT INTO reviews (vendor_id, reviewer_name, company, ratings, review_text, created_at)
SELECT id, 'Angela S.', 'Green Mountain Installs',
  '{"payReliability":3,"communication":2,"installQuality":3,"customerSupport":3,"installSpeed":2,"wouldRecommend":2}'::jsonb,
  'The platform model means you''re dealing with a tech company, not a solar company. Communication goes through the app which is fine when it works but frustrating when you need a real person. Pay is okay but the process is overly bureaucratic.',
  '2026-02-05'::timestamptz
FROM vendors WHERE slug = 'palmetto-solar';

-- Review 7: Energy Bill Cruncher - Kyle T.
INSERT INTO reviews (vendor_id, reviewer_name, company, ratings, review_text, created_at)
SELECT id, 'Kyle T.', 'RTP Solar',
  '{"leadQuality":4,"support":4,"integration":3,"roi":5,"transparency":4,"reliability":4}'::jsonb,
  'EBC has been our most cost-effective lead source. At roughly $1,400 per sale versus $5K+ from other vendors, the ROI speaks for itself. Lead quality is consistent and their team is responsive.',
  '2026-02-15'::timestamptz
FROM vendors WHERE slug = 'energy-bill-cruncher';

-- Review 8: GoHighLevel - Kyle T.
INSERT INTO reviews (vendor_id, reviewer_name, company, ratings, review_text, created_at)
SELECT id, 'Kyle T.', 'RTP Solar',
  '{"leadQuality":5,"support":3,"integration":4,"roi":5,"transparency":4,"reliability":4}'::jsonb,
  'GHL is the backbone of our entire operation. Automations, funnels, pipeline management. Support can be slow but the community fills the gaps. For the price point, nothing else comes close.',
  '2026-01-20'::timestamptz
FROM vendors WHERE slug = 'gohighlevel';

-- Review 9: Freedom Forever - Brian T.
INSERT INTO reviews (vendor_id, reviewer_name, company, ratings, review_text, created_at)
SELECT id, 'Brian T.', 'Solar Pros West',
  '{"payReliability":4,"communication":4,"installQuality":4,"customerSupport":5,"installSpeed":4,"wouldRecommend":4}'::jsonb,
  'Freedom Forever''s 25-year production guarantee is the real deal. They back it up. Pay is reliable, usually net-30. The regional team model means your experience depends heavily on which market you''re in, but overall a solid partner.',
  '2026-02-18'::timestamptz
FROM vendors WHERE slug = 'freedom-forever';

-- Review 10: Tesla Solar - Amanda W.
INSERT INTO reviews (vendor_id, reviewer_name, company, ratings, review_text, created_at)
SELECT id, 'Amanda W.', 'Spark Electric',
  '{"payReliability":3,"communication":1,"installQuality":4,"customerSupport":3,"installSpeed":2,"wouldRecommend":2}'::jsonb,
  'Install quality is good when they finally show up. Communication is basically nonexistent. We''ve waited months for project updates. Everything goes through an app with no real human contact. If you can handle the frustration, the product itself is solid.',
  '2026-01-25'::timestamptz
FROM vendors WHERE slug = 'tesla-solar';

-- Review 11: Titan Solar Power - Greg L.
INSERT INTO reviews (vendor_id, reviewer_name, company, ratings, review_text, created_at)
SELECT id, 'Greg L.', 'Desert Sun Installs',
  '{"payReliability":1,"communication":1,"installQuality":2,"customerSupport":1,"installSpeed":1,"wouldRecommend":1}'::jsonb,
  'Went out of business owing us over $40K for completed installs. No communication, no warning. One day the phones just stopped being answered. Anyone still owed money, get in line with the creditors. This is exactly why SolarGrade needs to exist.',
  '2026-01-10'::timestamptz
FROM vendors WHERE slug = 'titan-solar-power';

-- Review 12: Lumio - Kevin S.
INSERT INTO reviews (vendor_id, reviewer_name, company, ratings, review_text, created_at)
SELECT id, 'Kevin S.', 'Mountain West Solar',
  '{"payReliability":1,"communication":1,"installQuality":2,"customerSupport":1,"installSpeed":1,"wouldRecommend":1}'::jsonb,
  'Vivint Solar rebranded to Lumio and then collapsed. Left hundreds of subcontractors unpaid and thousands of homeowners with systems nobody will service. The door-to-door model was always about volume over quality. Classic cautionary tale.',
  '2026-02-02'::timestamptz
FROM vendors WHERE slug = 'lumio';

-- Review 13: Venture Solar - Tim F.
INSERT INTO reviews (vendor_id, reviewer_name, company, ratings, review_text, created_at)
SELECT id, 'Tim F.', 'Homeowner',
  '{"payReliability":5,"communication":5,"installQuality":5,"customerSupport":5,"installSpeed":5,"wouldRecommend":5}'::jsonb,
  '36 panels installed in one day. The crew was professional and efficient. From consultation to final walkthrough, communication was outstanding. The 30-year workmanship warranty gives real peace of mind. Best solar experience I''ve heard of from anyone.',
  '2026-02-08'::timestamptz
FROM vendors WHERE slug = 'venture-solar';

-- Review 14: Elevation Solar - Rachel M.
INSERT INTO reviews (vendor_id, reviewer_name, company, ratings, review_text, created_at)
SELECT id, 'Rachel M.', 'Homeowner',
  '{"payReliability":4,"communication":4,"installQuality":5,"customerSupport":4,"installSpeed":3,"wouldRecommend":4}'::jsonb,
  'The whole-home approach is what sold me. They didn''t just slap panels on the roof. They looked at insulation, HVAC efficiency, everything. The system is producing above what they quoted. Only knock is pricing could be more transparent upfront.',
  '2026-01-22'::timestamptz
FROM vendors WHERE slug = 'elevation-solar';

-- Review 15: Solcius - Mark H.
INSERT INTO reviews (vendor_id, reviewer_name, company, ratings, review_text, created_at)
SELECT id, 'Mark H.', 'Bright Future Solar',
  '{"payReliability":1,"communication":1,"installQuality":2,"customerSupport":1,"installSpeed":1,"wouldRecommend":1}'::jsonb,
  'Closed overnight. We had 6 installs in progress. Homeowners calling us asking what happened, and we had no answers because Solcius ghosted everyone. Still trying to get paid for completed work. Another one that grew too fast on borrowed time.',
  '2026-02-14'::timestamptz
FROM vendors WHERE slug = 'solcius';
