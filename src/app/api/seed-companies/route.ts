import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

const companies = [
  { name: 'Apricot Solar', category: 'installers', website: 'https://apricotsolar.com', description: 'Growing residential installer operating in multiple Western states. Known for transparent pricing and customer-first approach.' },
  { name: 'SunPro Solar (Legacy)', category: 'installers', website: null, description: 'Original brand before ADT acquisition. Some markets still reference the SunPro name. See ADT Solar for current status.' },
  { name: 'Enphase Certified Installer Network', category: 'installers', website: 'https://enphase.com/installers', description: 'Network of Enphase-certified local installers. Quality varies by individual installer but Enphase certification provides a baseline standard.' },
  { name: 'Nexamp', category: 'installers', website: 'https://nexamp.com', description: 'Community solar developer and installer operating across the Northeast and Midwest. Focused on making solar accessible through community solar subscriptions.' },
  { name: 'iSolar', category: 'installers', website: 'https://isolarusa.com', description: 'Regional residential solar installer. Smaller operation with focus on quality over volume.' },
  { name: 'Certasun', category: 'installers', website: 'https://certasun.com', description: 'Chicago-area residential solar installer. Strong local reputation in the Illinois market. Employee-owned company.' },
  { name: 'Solar Optimum', category: 'installers', website: 'https://solaroptimum.com', description: 'California-based residential and commercial installer. Tesla Powerwall Certified Installer. Known for premium equipment packages.' },
  { name: 'SunLux', category: 'installers', website: 'https://sunlux.com', description: 'California residential solar installer offering high-efficiency panels and battery storage. Focus on premium installations.' },
  { name: 'Dividend Solar (now Dividend Finance)', category: 'installers', website: 'https://dividendfinance.com', description: 'Originally a solar installer, pivoted to become a solar financing platform. Now provides loans and financing to other installers.' },
  { name: 'Pink Energy (formerly Power Home Solar)', category: 'installers', website: null, description: 'Formerly Power Home Solar, rebranded to Pink Energy. Ceased operations in 2022 amid lawsuits and consumer complaints across multiple states. Known for aggressive sales and poor install quality.' },
  { name: 'Sungevity', category: 'installers', website: null, description: 'Early pioneer in remote solar design and sales. Filed for bankruptcy in 2017. Was one of the original residential solar companies before the current wave.' },
  { name: 'Vivint Solar (pre-Lumio)', category: 'installers', website: null, description: 'Major door-to-door residential installer before being acquired and rebranded to Lumio. See Lumio entry for current status.' },
  { name: 'Complete Solar', category: 'installers', website: 'https://completesolar.com', description: 'Technology-driven solar company that partners with local installers for fulfillment. Platform model similar to Palmetto.' },
  { name: 'Elevation (Arizona)', category: 'installers', website: 'https://elevationsolar.com', description: 'Arizona-based residential solar installer. Not to be confused with Powered by Elevation. Strong presence in the Phoenix market.' },
  { name: 'Invention Solar', category: 'leads', website: 'https://inventionsolar.com', description: 'Solar marketing agency and lead generation company. Over a decade of experience serving 4,500+ residential solar companies nationwide. Offers aged leads, live transfers, and digital campaigns.' },
  { name: 'Profitise', category: 'leads', website: 'https://profitise.com', description: 'Solar lead generation network connecting advertisers with qualified solar leads through publisher partnerships. Offers real-time bidding and lead customization.' },
  { name: 'RGR Marketing', category: 'leads', website: 'https://rgrmarketing.com', description: 'Affiliate network providing solar leads with machine and manual QA validation. Also helps advertisers refine sales processes.' },
  { name: 'Qualified Solar Leads (QSL)', category: 'leads', website: 'https://qualifiedsolarleads.com', description: 'Provides solar appointments, aged leads, and live transfers. Markets one-to-one consent leads for higher compliance standards. Nearly a decade of industry experience.' },
  { name: 'DataToLeads', category: 'leads', website: 'https://datatoleads.com', description: 'Data marketplace for purchasing specific solar leads including qualified calls. Supports data standardization, security, and CRM integrations.' },
  { name: 'SolarExclusive', category: 'leads', website: 'https://solarexclusive.com', description: 'Generates solar leads through Google and YouTube with proprietary booking system. Served 2,500+ solar companies. Focuses on pre-set appointments.' },
  { name: 'Angi (formerly Angi\'s List / HomeAdvisor)', category: 'leads', website: 'https://angi.com', description: 'Major home services marketplace that sells solar leads alongside roofing, HVAC, and other categories. High volume but shared leads with variable quality.' },
  { name: 'Thumbtack', category: 'leads', website: 'https://thumbtack.com', description: 'Home services marketplace where solar installers can receive leads from homeowners requesting quotes. Pay-per-lead model with geographic targeting.' },
  { name: 'SaveMyLeads', category: 'leads', website: 'https://savemyleads.com', description: 'Lead automation platform providing solar leads and tools for automatic follow-up. Integrates with CRMs and ad platforms for seamless lead routing.' },
  { name: 'Scoop Solar', category: 'software', website: 'https://scoop.solar', description: 'Project execution and field operations platform for solar, storage, and electrification. CRM plus project management with mobile field data capture. Strong on operational workflows.' },
  { name: 'JobNimbus', category: 'crm', website: 'https://jobnimbus.com', description: 'CRM and project management platform built for contractors including solar installers. Manages leads, jobs, documents, scheduling, and field operations in one system.' },
  { name: 'Sunbase', category: 'crm', website: 'https://sunbasedata.com', description: 'All-in-one solar CRM combining lead management, proposal generation, project tracking, design tools, and field operations. Built specifically for solar installers and EPCs.' },
  { name: 'OpenSolar', category: 'software', website: 'https://opensolar.com', description: 'Free cloud-based solar design, sales, and project management platform with built-in CRM. Includes 3D system modeling, proposals, e-signatures, and financing tools.' },
  { name: 'Solargraf', category: 'software', website: 'https://solargraf.com', description: 'Solar proposal and design software focused on speed and accuracy. Creates professional proposals with financing options. Owned by Enphase Energy.' },
  { name: 'HelioScope', category: 'software', website: 'https://helioscope.com', description: 'Advanced solar design and engineering software for commercial and utility-scale projects. Detailed shading analysis and performance modeling.' },
  { name: 'Zoho CRM', category: 'crm', website: 'https://zoho.com/crm', description: 'Affordable general-purpose CRM frequently customized for solar workflows. Strong automation and integration capabilities at $14-20 per user per month.' },
  { name: 'monday.com', category: 'crm', website: 'https://monday.com', description: 'Visual project management and CRM platform used by high-volume solar sales teams for pipeline management and operational tracking.' },
  { name: 'Shape Software', category: 'crm', website: 'https://setshape.com', description: 'CRM platform popular with marketing-focused solar teams. Strong lead management, dialer integration, and automated follow-up sequences.' },
  { name: 'Enerflo', category: 'software', website: 'https://enerflo.com', description: 'Solar sales platform with built-in CRM, proposal tools, and financing integration. Designed to streamline the solar sales process from lead to contract.' },
  { name: 'SolarNexus', category: 'software', website: 'https://solarnexus.com', description: 'Project management and workflow automation platform for solar installers. Manages the full project lifecycle from sale through interconnection.' },
  { name: 'Podio', category: 'crm', website: 'https://podio.com', description: 'Flexible work management platform used by some solar companies for CRM and project tracking. Highly customizable but requires setup work.' },
  { name: 'Sunlight Financial', category: 'financing', website: 'https://sunlightfinancial.com', description: 'Point-of-sale solar lending platform offering loans through contractor partners. Filed for bankruptcy in 2023. Loans were transferred to other servicers.' },
  { name: 'Dividend Finance', category: 'financing', website: 'https://dividendfinance.com', description: 'Solar and home improvement loan provider offering competitive rates. Works with installers as a financing partner for residential solar projects.' },
  { name: 'Service Finance Company', category: 'financing', website: 'https://svcfin.com', description: 'Home improvement lender including solar financing. Offers dealer programs with competitive rates and quick approvals.' },
  { name: 'Loanpal (now GoodLeap)', category: 'financing', website: null, description: 'Original name before rebranding to GoodLeap. See GoodLeap entry for current information.' },
  { name: 'Sunnova Financial', category: 'financing', website: 'https://sunnova.com', description: 'Financing arm of Sunnova Energy offering leases, PPAs, and loans for residential solar. Filed for bankruptcy in 2025 with Sunnova Energy.' },
  { name: 'Boomsourcing', category: 'callcenter', website: 'https://boomsourcing.com', description: 'Solar-focused call center offering AI-enhanced lead qualification, live transfers, and appointment setting. TCPA and SOC 2 compliant. Scalable from 5 to 500 agents.' },
  { name: 'Callbox', category: 'callcenter', website: 'https://callboxinc.com', description: 'Multi-channel lead generation and appointment setting service. Uses email, phone, and LinkedIn outreach for solar companies targeting commercial accounts.' },
  { name: 'Convoso', category: 'software', website: 'https://convoso.com', description: 'Cloud-based contact center software used by many solar companies for outbound dialing. Not a call center itself but powers many solar sales operations.' },
  { name: 'PhoenixCG', category: 'callcenter', website: 'https://phoenixcg.com', description: 'Solar appointment setting company providing live transfers and pre-qualified appointments for residential solar installers.' },
  { name: 'Rizen Solar', category: 'callcenter', website: 'https://rizensolar.com', description: 'Solar-specific appointment setting and lead generation company. Provides pre-set appointments and live transfers for residential solar.' },
]

export async function POST() {
  const rows = companies.map((v) => ({
    slug: toSlug(v.name),
    name: v.name,
    category: v.category,
    website: v.website,
    description: v.description,
    approved: true,
  }))

  const { data, error } = await supabase.from('vendors').insert(rows).select()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ inserted: data.length, companies: data.map((v) => v.name) })
}
