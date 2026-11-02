-- Publish the six people who were already public on the old website, with the
-- LinkedIn links shown there. Everyone else stays hidden until an editor turns them on.
update public.profiles set show_on_website = true, website_order = 10, linkedin_url = 'https://www.linkedin.com/in/arjun-s-0522936a/', website_role = 'Founder and CEO'
  where trim(full_name) = 'Arjun S' and is_active;
update public.profiles set show_on_website = true, website_order = 20, linkedin_url = 'https://www.linkedin.com/in/aditya-sah-b0121b101/'
  where trim(full_name) = 'Aditya Sah' and is_active;
update public.profiles set show_on_website = true, website_order = 30, linkedin_url = 'https://www.linkedin.com/in/shambhavi-kumar-7a82b821b/'
  where trim(full_name) = 'Shambhavi Kumar' and is_active;
update public.profiles set show_on_website = true, website_order = 40, linkedin_url = 'https://www.linkedin.com/in/prathyush-akansh/'
  where trim(full_name) = 'Prathyush Akansh' and is_active;
update public.profiles set show_on_website = true, website_order = 50, linkedin_url = 'https://www.linkedin.com/in/madhusmita-mohanty-4357b5148/'
  where trim(full_name) = 'Madhusmita Mohanty' and is_active;
update public.profiles set show_on_website = true, website_order = 60, linkedin_url = 'https://www.linkedin.com/in/bhuvan-v-4544b0375/'
  where trim(full_name) = 'Bhuvan V' and is_active;
