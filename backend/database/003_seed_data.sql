-- 003_seed_data.sql
-- IvoxStack Seed Data

-- 1. Initial Settings
INSERT INTO settings (site_name, tagline, phone, whatsapp, email, address, business_hours, social_links)
VALUES (
  'IvoxStack',
  'Digital Solutions Built for Business Growth',
  '+91 98765 43210',
  '919876543210',
  'hello@ivoxstack.com',
  'Ghitorni, New Delhi - 110030',
  'Monday - Saturday: 9:30 AM - 7:30 PM',
  '{"instagram": "https://instagram.com/ivoxstack", "facebook": "https://facebook.com/ivoxstack", "linkedin": "https://linkedin.com/company/ivoxstack"}'::jsonb
) ON CONFLICT DO NOTHING;

-- 2. 15 Services
INSERT INTO services (name, slug, short_description, starting_price, icon, display_order) VALUES
('Website Design & Development', 'website-design-development', 'High-speed, conversion-focused websites, landing pages, and enterprise web solutions.', 2999, 'Globe', 1),
('Creative Design', 'creative-design', 'High-impact social media creatives, promotional posters, and ad designs.', 99, 'Palette', 2),
('Video Editing & Reels', 'video-editing-reels', 'Dynamic short-form video, Instagram reels, motion captions, and direct-response hooks.', 349, 'Video', 3),
('Social Media Management', 'social-media-management', 'Organic brand presence, strategic content calendars, reels, stories, and engagement.', 6999, 'Share2', 4),
('Meta Ads Management', 'meta-ads-management', 'High-ROAS Facebook & Instagram campaigns, custom audiences, retargeting & scaling.', 4999, 'Target', 5),
('Lead Generation', 'lead-generation', 'High-intent B2B & B2C customer acquisition funnels that convert visitors into leads.', 9999, 'Users', 6),
('Google Ads', 'google-ads', 'High-intent search ads, Performance Max campaigns, and display retargeting.', 2999, 'Search', 7),
('Google Business Profile', 'google-business-profile', 'Rank #1 on Google Maps for local searches, review strategies, and lead calls.', 999, 'MapPin', 8),
('Local Business Marketing', 'local-business-marketing', 'Hyper-local advertising, WhatsApp inquiries, and local discovery campaigns.', 7999, 'Store', 9),
('Branding & Identity', 'branding-identity', 'Complete brand books, logos, color systems, stationery, and vector guidelines.', 2999, 'Sparkles', 10),
('Search Engine Optimization (SEO)', 'seo', 'Technical SEO, on-page optimization, local maps ranking, and organic traffic growth.', 4999, 'TrendingUp', 11),
('Marketing Automation', 'marketing-automation', 'Automated WhatsApp routing, lead sync, email workflows, and CRM pipelines.', 4999, 'Cpu', 12),
('WhatsApp Marketing', 'whatsapp-marketing', 'Official WhatsApp template broadcasts, segmentation, automated customer journeys.', 999, 'MessageCircle', 13),
('Content Writing', 'content-writing', 'Persuasive ad copy, website copy, sales letters, and SEO-optimized blogs.', 99, 'PenTool', 14),
('Website Maintenance', 'website-maintenance', 'Regular backups, SSL security, speed optimization, uptime checks, and content updates.', 999, 'ShieldCheck', 15)
ON CONFLICT (slug) DO NOTHING;

-- 3. Featured Portfolio (Specific preserved items)
INSERT INTO portfolio (title, category, client, description, image, pdf_url, project_url, is_featured, display_order) VALUES
('Ultimate iTech Pitch Deck — Built for Tomorrow', 'Advertising', 'Ultimate iTech', 'Official strategic pitch deck, investor presentation design, and forward-looking brand narrative.', '/ultimate-pitch-deck-preview.jpg', '/Ultimate iTech Pitch Deck Final.pdf', NULL, TRUE, 1),
('Indian Trade Mart — Official Marketplace Catalogue', 'Branding', 'Indian Trade Mart', 'Comprehensive multi-category marketplace catalog and brand identity collateral.', '/itm-catalogue-preview.jpg', '/ITM Catalogue.pdf', NULL, TRUE, 2),
('HHH-Jobs — Official Recruitment & Placement Catalogue', 'Branding', 'HHH-Jobs', 'Official recruitment, talent acquisition, and placement catalog design.', '/hhh-catalogue-preview.jpg', '/HHH - JOBS Catalogue.pdf', NULL, TRUE, 3),
('Indian Properties — Official Real Estate & Business Catalogue', 'Branding', 'Indian Properties', 'Comprehensive real estate property showcase, commercial business catalog and floor plans.', '/prop-catalogue-preview.jpg', '/Indian Properties Catalogue.pdf', NULL, TRUE, 4),
('NVA Infracon Web Platform', 'Websites', 'NVA Infracon', 'Full-scale infrastructure corporate portal, architecture showcases, and high-performance layout.', '/itm-post-plans.jpg', NULL, 'https://nvainfracon.com', TRUE, 5);

-- 4. Initial Announcement
INSERT INTO announcements (is_active, text, link_url) VALUES
(TRUE, 'Special Launch Offer — Get 20% Off All Digital Growth Bundles This Month!', '/pricing');
