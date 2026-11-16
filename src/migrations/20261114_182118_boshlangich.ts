import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('uz', 'ru', 'en');
  CREATE TYPE "public"."enum_otts_type" AS ENUM('davlat', 'xorijiy', 'nodavlat');
  CREATE TYPE "public"."enum_partners_dirs" AS ENUM('siyosat', 'kafillik', 'profilaktika', 'huquq', 'talim', 'sport', 'madaniyat', 'fuqarolik', 'vatandosh', 'tahlil', 'vatanparvarlik', 'bandlik', 'oila', 'raqamli', 'xalqaro', 'axborot', 'ekologiya');
  CREATE TYPE "public"."enum_partners_group" AS ENUM('davlat', 'korxona', 'huquq', 'parlament', 'ilmiy', 'nnt', 'oav', 'xalqaro');
  CREATE TYPE "public"."enum_partners_region" AS ENUM('bmt', 'mdh', 'tdt', 'sht', 'osiyo', 'xitoy', 'boshqa');
  CREATE TYPE "public"."enum_staff_socials_net" AS ENUM('Telegram', 'Instagram', 'Facebook');
  CREATE TYPE "public"."enum_staff_qabul_day" AS ENUM('Duşanba', 'Seşanba', 'Çorşanba', 'Payşanba', 'Juma', 'Şanba');
  CREATE TYPE "public"."enum_projects_holat" AS ENUM('davom etmoqda', 'har yili', 'yakunlangan');
  CREATE TYPE "public"."enum_projects_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_version_holat" AS ENUM('davom etmoqda', 'har yili', 'yakunlangan');
  CREATE TYPE "public"."enum__projects_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__projects_v_published_locale" AS ENUM('uz', 'ru', 'en');
  CREATE TYPE "public"."enum_grants_cat" AS ENUM('startap', 'talim', 'ilm', 'ijtimoiy', 'ekologiya', 'ijod');
  CREATE TYPE "public"."enum_grants_origin" AS ENUM('mahalliy', 'xorijiy');
  CREATE TYPE "public"."enum_stipends_rates_base" AS ENUM('prezident', 'nomli', 'alo', 'stip', 'bhm');
  CREATE TYPE "public"."enum_stipends_turi" AS ENUM('prezident', 'nomli', 'idoraviy', 'xorij');
  CREATE TYPE "public"."enum_stipends_icon" AS ENUM('yulduz', 'kitob', 'globus', 'oy', 'tishli', 'tibbiyot', 'yurak', 'qalpoq', 'atom', 'medal', 'qalqon', 'qalam', 'pero', 'kalendar');
  CREATE TYPE "public"."enum_stipends_flag" AS ENUM('uz', 'gb', 'us', 'de', 'hu', 'tr', 'kr', 'jp', 'eu', 'cn');
  CREATE TYPE "public"."enum_contests_cat" AS ENUM('ilm', 'raqamli', 'madaniyat', 'adabiyot', 'tibbiyot', 'sport');
  CREATE TYPE "public"."enum_awards_prize_base" AS ENUM('bhm', 'stip');
  CREATE TYPE "public"."enum_benefits_cat" AS ENUM('talaba', 'oquvchi', 'yosh');
  CREATE TYPE "public"."enum_benefits_icon" AS ENUM('uy', 'kontrakt', 'til', 'avto', 'kurs', 'yotoq', 'magistr', 'kitob', 'bank', 'sertifikat', 'avtobus', 'sovga', 'nota', 'vaucher', 'yulduz', 'qalqon');
  CREATE TYPE "public"."enum_vol_directions_icon" AS ENUM('qol', 'yurak', 'barg', 'gumbaz', 'bayroq', 'qalqon', 'kitob', 'ekran');
  CREATE TYPE "public"."enum_vol_directions_age" AS ENUM('16', '18');
  CREATE TYPE "public"."enum_news_category" AS ENUM('kengash', 'boshlangich', 'imkoniyat', 'tadbir');
  CREATE TYPE "public"."enum_news_kind" AS ENUM('yangilik', 'elon', 'tadbir', 'tabrik');
  CREATE TYPE "public"."enum_news_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__news_v_version_category" AS ENUM('kengash', 'boshlangich', 'imkoniyat', 'tadbir');
  CREATE TYPE "public"."enum__news_v_version_kind" AS ENUM('yangilik', 'elon', 'tadbir', 'tabrik');
  CREATE TYPE "public"."enum__news_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__news_v_published_locale" AS ENUM('uz', 'ru', 'en');
  CREATE TYPE "public"."enum_news_reactions_kind" AS ENUM('like', 'fire', 'dislike', 'angry', 'laugh');
  CREATE TYPE "public"."enum_acts_for" AS ENUM('barcha', 'talaba', 'iqtidor', 'qiz', 'oila', 'himoya', 'bandlik', 'tadbirkor', 'harbiy');
  CREATE TYPE "public"."enum_acts_kind" AS ENUM('Qonun', 'Farmon', 'Qaror', 'Ustav');
  CREATE TYPE "public"."enum_kengash_docs_kind" AS ENUM('qaror', 'farmoyish', 'reja', 'hisobot', 'nizom', 'boshqa');
  CREATE TYPE "public"."enum_templates_cat" AS ENUM('azolik', 'murojaat', 'boshlangich', 'boshqa');
  CREATE TYPE "public"."enum_press_kind" AS ENUM('reliz', 'anons');
  CREATE TYPE "public"."enum_press_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__press_v_version_kind" AS ENUM('reliz', 'anons');
  CREATE TYPE "public"."enum__press_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__press_v_published_locale" AS ENUM('uz', 'ru', 'en');
  CREATE TYPE "public"."enum_albums_type" AS ENUM('uchrashuv', 'yigilish', 'forum', 'taqdimot', 'sayohat', 'sport');
  CREATE TYPE "public"."enum_videos_type" AS ENUM('korsatuv', 'reportaj', 'tadbir');
  CREATE TYPE "public"."enum_videos_series" AS ENUM('istiqlol', 'forum', 'tadbir');
  CREATE TYPE "public"."enum_oav_kind" AS ENUM('online', 'gov');
  CREATE TYPE "public"."enum_oav_lang" AS ENUM('uz', 'ru');
  CREATE TYPE "public"."enum_faqs_cat" AS ENUM('azolik', 'imtiyoz', 'taskilot', 'tadbir', 'murojaat');
  CREATE TYPE "public"."enum_appeals_type" AS ENUM('ariza', 'taklif', 'shikoyat');
  CREATE TYPE "public"."enum_appeals_status" AS ENUM('yangi', 'jarayonda', 'yopildi');
  CREATE TYPE "public"."enum_memberships_status" AS ENUM('yangi', 'takror', 'yuborildi', 'qabul', 'rad');
  CREATE TYPE "public"."enum_volunteers_status" AS ENUM('yangi', 'takror', 'suhbat', 'qabul', 'rad');
  CREATE TYPE "public"."enum_text_errors_status" AS ENUM('yangi', 'tuzatildi', 'rad');
  CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'muharrir', 'operator');
  CREATE TYPE "public"."enum_payload_folders_folder_type" AS ENUM('media');
  CREATE TYPE "public"."enum_bosh_sahifa_benefits_roles_icon" AS ENUM('faol', 'yetakchi', 'volontyor', 'himoya');
  CREATE TYPE "public"."enum__bosh_sahifa_v_version_benefits_roles_icon" AS ENUM('faol', 'yetakchi', 'volontyor', 'himoya');
  CREATE TYPE "public"."enum_ittifoq_sahifa_privileges_group" AS ENUM('ittifoq', 'davlat');
  CREATE TYPE "public"."enum_ittifoq_sahifa_orgs_ngos_g" AS ENUM('talim', 'ijod', 'ijtimoiy', 'iqtisod');
  CREATE TYPE "public"."enum_ittifoq_sahifa_companies_kind" AS ENUM('Media', 'Naşriyot', 'Xizmat');
  CREATE TYPE "public"."enum__ittifoq_sahifa_v_version_privileges_group" AS ENUM('ittifoq', 'davlat');
  CREATE TYPE "public"."enum__ittifoq_sahifa_v_version_orgs_ngos_g" AS ENUM('talim', 'ijod', 'ijtimoiy', 'iqtisod');
  CREATE TYPE "public"."enum__ittifoq_sahifa_v_version_companies_kind" AS ENUM('Media', 'Naşriyot', 'Xizmat');
  CREATE TYPE "public"."enum_aloqa_socials_net" AS ENUM('Telegram', 'Instagram', 'Facebook');
  CREATE TYPE "public"."enum__aloqa_v_version_socials_net" AS ENUM('Telegram', 'Instagram', 'Facebook');
  CREATE TABLE "otts_leader_achievements" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "otts_leader_achievements_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "otts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"type" "enum_otts_type" NOT NULL,
  	"leader_name" varchar,
  	"leader_img_id" integer,
  	"leader_phone" varchar,
  	"leader_email" varchar,
  	"leader_telegram" varchar,
  	"leader_instagram" varchar,
  	"leader_facebook" varchar,
  	"leader_elected" varchar,
  	"leader_members" varchar,
  	"leader_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "otts_locales" (
  	"otm" varchar NOT NULL,
  	"leader_role" varchar,
  	"leader_spec" varchar,
  	"leader_about" varchar,
  	"leader_reception" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "partners_dirs" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_partners_dirs",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "partners" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"group" "enum_partners_group" NOT NULL,
  	"region" "enum_partners_region",
  	"logo_id" integer NOT NULL,
  	"logo_h" numeric,
  	"site" varchar,
  	"domain" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "partners_locales" (
  	"name" varchar NOT NULL,
  	"what" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "departments_tasks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "departments_tasks_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "departments" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "departments_locales" (
  	"short" varchar NOT NULL,
  	"t" varchar NOT NULL,
  	"room" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "staff_duties" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "staff_duties_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "staff_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"net" "enum_staff_socials_net" NOT NULL,
  	"handle" varchar,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "staff" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"name" varchar NOT NULL,
  	"dept_id" integer,
  	"chair" boolean,
  	"img_id" integer NOT NULL,
  	"phone" varchar,
  	"email" varchar,
  	"qabul_day" "enum_staff_qabul_day",
  	"qabul_time" varchar,
  	"qabul_room" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "staff_locales" (
  	"role" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "directions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "directions_locales" (
  	"title" varchar NOT NULL,
  	"short" varchar NOT NULL,
  	"about" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "projects_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "projects_partners_locales" (
  	"t" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"post" numeric
  );
  
  CREATE TABLE "projects_results_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_milestones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone,
  	"post" numeric
  );
  
  CREATE TABLE "projects_milestones_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"n" numeric
  );
  
  CREATE TABLE "projects" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"dir_id" integer,
  	"holat" "enum_projects_holat" DEFAULT 'davom etmoqda',
  	"period" varchar,
  	"national" boolean DEFAULT false,
  	"cover_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_projects_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "projects_locales" (
  	"title" varchar,
  	"lead" varchar,
  	"description" varchar,
  	"audience" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "projects_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_projects_v_version_partners" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_partners_locales" (
  	"t" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_version_results" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"post" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_results_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_version_milestones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone,
  	"post" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_milestones_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_version_posts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"n" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version__order" varchar,
  	"version_dir_id" integer,
  	"version_holat" "enum__projects_v_version_holat" DEFAULT 'davom etmoqda',
  	"version_period" varchar,
  	"version_national" boolean DEFAULT false,
  	"version_cover_id" integer,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__projects_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__projects_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_projects_v_locales" (
  	"version_title" varchar,
  	"version_lead" varchar,
  	"version_description" varchar,
  	"version_audience" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"dir_id" integer NOT NULL,
  	"img_id" integer NOT NULL,
  	"upcoming" boolean DEFAULT false,
  	"post" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "events_locales" (
  	"title" varchar NOT NULL,
  	"type" varchar,
  	"place" varchar,
  	"summary" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "grants" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"cat" "enum_grants_cat" NOT NULL,
  	"origin" "enum_grants_origin" DEFAULT 'mahalliy',
  	"deadline" timestamp(3) with time zone,
  	"url" varchar NOT NULL,
  	"img_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "grants_locales" (
  	"t" varchar NOT NULL,
  	"org" varchar NOT NULL,
  	"amount" varchar NOT NULL,
  	"who" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"cycle" varchar,
  	"note" varchar,
  	"source" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "stipends_rates" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"base" "enum_stipends_rates_base" NOT NULL,
  	"k" numeric
  );
  
  CREATE TABLE "stipends_rates_locales" (
  	"l" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "stipends" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"turi" "enum_stipends_turi" NOT NULL,
  	"icon" "enum_stipends_icon",
  	"flag" "enum_stipends_flag",
  	"deadline" timestamp(3) with time zone,
  	"url" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "stipends_locales" (
  	"t" varchar NOT NULL,
  	"soha" varchar,
  	"org" varchar NOT NULL,
  	"badge_l" varchar,
  	"badge_v" varchar,
  	"who" varchar NOT NULL,
  	"perk" varchar NOT NULL,
  	"cycle" varchar NOT NULL,
  	"text" varchar,
  	"source" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "contests" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"cat" "enum_contests_cat" NOT NULL,
  	"deadline" timestamp(3) with time zone,
  	"window_from" timestamp(3) with time zone,
  	"window_to" timestamp(3) with time zone,
  	"url" varchar NOT NULL,
  	"img_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "contests_locales" (
  	"t" varchar NOT NULL,
  	"org" varchar NOT NULL,
  	"badge_l" varchar,
  	"badge_v" varchar,
  	"who" varchar NOT NULL,
  	"prize" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"cycle" varchar,
  	"source" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "awards_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"from" numeric NOT NULL,
  	"to" numeric NOT NULL,
  	"end" boolean
  );
  
  CREATE TABLE "awards_timeline_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "awards" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"img_id" integer,
  	"prize_base" "enum_awards_prize_base" DEFAULT 'bhm' NOT NULL,
  	"prize_k" numeric NOT NULL,
  	"url" varchar NOT NULL,
  	"extra_url" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "awards_locales" (
  	"t" varchar NOT NULL,
  	"basis" varchar NOT NULL,
  	"who" varchar NOT NULL,
  	"perks" varchar NOT NULL,
  	"how" varchar NOT NULL,
  	"count" varchar NOT NULL,
  	"short" varchar NOT NULL,
  	"fact1" varchar NOT NULL,
  	"fact2" varchar NOT NULL,
  	"when" varchar NOT NULL,
  	"source" varchar,
  	"extra_t" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "benefits" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"cat" "enum_benefits_cat" NOT NULL,
  	"icon" "enum_benefits_icon" NOT NULL,
  	"url" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "benefits_locales" (
  	"t" varchar NOT NULL,
  	"badge_l" varchar,
  	"badge_v" varchar,
  	"who" varchar NOT NULL,
  	"amount" varchar NOT NULL,
  	"how" varchar NOT NULL,
  	"basis" varchar NOT NULL,
  	"from" varchar,
  	"source" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "vol_directions_tasks" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "vol_directions_tasks_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "vol_directions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"icon" "enum_vol_directions_icon" NOT NULL,
  	"age" "enum_vol_directions_age" DEFAULT '16' NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "vol_directions_locales" (
  	"t" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"example" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "news" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"category" "enum_news_category" DEFAULT 'kengash',
  	"published_at" timestamp(3) with time zone,
  	"image_id" integer,
  	"author_id" integer,
  	"kind" "enum_news_kind" DEFAULT 'yangilik',
  	"event_date" timestamp(3) with time zone,
  	"event_place" varchar,
  	"tg_id" numeric,
  	"source" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_news_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "news_locales" (
  	"title" varchar,
  	"image_caption" varchar,
  	"excerpt" varchar,
  	"content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "news_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "news_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_news_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_category" "enum__news_v_version_category" DEFAULT 'kengash',
  	"version_published_at" timestamp(3) with time zone,
  	"version_image_id" integer,
  	"version_author_id" integer,
  	"version_kind" "enum__news_v_version_kind" DEFAULT 'yangilik',
  	"version_event_date" timestamp(3) with time zone,
  	"version_event_place" varchar,
  	"version_tg_id" numeric,
  	"version_source" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__news_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__news_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_news_v_locales" (
  	"version_title" varchar,
  	"version_image_caption" varchar,
  	"version_excerpt" varchar,
  	"version_content" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_news_v_texts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "_news_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "authors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"photo_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "authors_locales" (
  	"position" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "news_ratings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"news_id" integer NOT NULL,
  	"value" numeric NOT NULL,
  	"voter" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "news_reactions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"news_id" integer NOT NULL,
  	"kind" "enum_news_reactions_kind" NOT NULL,
  	"voter" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "act_groups" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "act_groups_locales" (
  	"t" varchar NOT NULL,
  	"lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "acts_for" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_acts_for",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "acts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"grp_id" integer NOT NULL,
  	"kind" "enum_acts_kind" NOT NULL,
  	"y" varchar,
  	"no" varchar,
  	"href" varchar,
  	"reg" varchar,
  	"no_t" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "acts_locales" (
  	"t" varchar NOT NULL,
  	"d" varchar NOT NULL,
  	"org" varchar NOT NULL,
  	"name" varchar,
  	"by" varchar,
  	"kw" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "kengash_docs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"kind" "enum_kengash_docs_kind" NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"no" varchar,
  	"file_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "kengash_docs_locales" (
  	"t" varchar NOT NULL,
  	"d" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "templates" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"cat" "enum_templates_cat" NOT NULL,
  	"file_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "templates_locales" (
  	"t" varchar NOT NULL,
  	"d" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "press_body" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "press_body_locales" (
  	"t" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "press_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "press_facts_locales" (
  	"v" varchar,
  	"k" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "press" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"kind" "enum_press_kind",
  	"date" timestamp(3) with time zone,
  	"album_id" integer,
  	"video_id" integer,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_press_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "press_locales" (
  	"title" varchar,
  	"lead" varchar,
  	"event_when" varchar,
  	"event_time" varchar,
  	"event_place" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_press_v_version_body" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_press_v_version_body_locales" (
  	"t" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_press_v_version_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_press_v_version_facts_locales" (
  	"v" varchar,
  	"k" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_press_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_kind" "enum__press_v_version_kind",
  	"version_date" timestamp(3) with time zone,
  	"version_album_id" integer,
  	"version_video_id" integer,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__press_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__press_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_press_v_locales" (
  	"version_title" varchar,
  	"version_lead" varchar,
  	"version_event_when" varchar,
  	"version_event_time" varchar,
  	"version_event_place" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "albums" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"type" "enum_albums_type" NOT NULL,
  	"post" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "albums_locales" (
  	"title" varchar NOT NULL,
  	"place" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "albums_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "videos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"youtube_id" varchar NOT NULL,
  	"short" boolean,
  	"date" timestamp(3) with time zone,
  	"type" "enum_videos_type",
  	"series" "enum_videos_series",
  	"sec" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "videos_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "oav" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"domain" varchar,
  	"date" timestamp(3) with time zone NOT NULL,
  	"kind" "enum_oav_kind" NOT NULL,
  	"lang" "enum_oav_lang" DEFAULT 'uz' NOT NULL,
  	"url" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "oav_locales" (
  	"title" varchar NOT NULL,
  	"outlet" varchar NOT NULL,
  	"sum" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "faqs_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "faqs_a_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "faqs_li" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "faqs_li_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_order" varchar,
  	"cat" "enum_faqs_cat" NOT NULL,
  	"more_href" varchar,
  	"home" boolean,
  	"azolik" boolean,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "faqs_locales" (
  	"q" varchar NOT NULL,
  	"more_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "appeals" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"type" "enum_appeals_type" NOT NULL,
  	"status" "enum_appeals_status" DEFAULT 'yangi' NOT NULL,
  	"name" varchar NOT NULL,
  	"phone" varchar NOT NULL,
  	"email" varchar NOT NULL,
  	"message" varchar NOT NULL,
  	"file_id" integer,
  	"note" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "appeal_files" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "memberships" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"status" "enum_memberships_status" DEFAULT 'yangi' NOT NULL,
  	"name" varchar NOT NULL,
  	"birth_year" numeric NOT NULL,
  	"phone" varchar NOT NULL,
  	"email" varchar,
  	"place" varchar NOT NULL,
  	"note" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "volunteers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"status" "enum_volunteers_status" DEFAULT 'yangi' NOT NULL,
  	"name" varchar NOT NULL,
  	"birth_year" numeric NOT NULL,
  	"phone" varchar NOT NULL,
  	"place" varchar NOT NULL,
  	"dirs" varchar NOT NULL,
  	"time" varchar,
  	"about" varchar,
  	"note" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "text_errors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL,
  	"context" varchar,
  	"comment" varchar,
  	"page" varchar NOT NULL,
  	"status" "enum_text_errors_status" DEFAULT 'yangi',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"folder_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumb_url" varchar,
  	"sizes_thumb_width" numeric,
  	"sizes_thumb_height" numeric,
  	"sizes_thumb_mime_type" varchar,
  	"sizes_thumb_filesize" numeric,
  	"sizes_thumb_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar
  );
  
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "files" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "files_locales" (
  	"title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'muharrir' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_folders_folder_type" (
  	"order" integer NOT NULL,
  	"parent_id" integer NOT NULL,
  	"value" "enum_payload_folders_folder_type",
  	"id" serial PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "payload_folders" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"folder_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"otts_id" integer,
  	"partners_id" integer,
  	"departments_id" integer,
  	"staff_id" integer,
  	"directions_id" integer,
  	"projects_id" integer,
  	"events_id" integer,
  	"grants_id" integer,
  	"stipends_id" integer,
  	"contests_id" integer,
  	"awards_id" integer,
  	"benefits_id" integer,
  	"vol_directions_id" integer,
  	"news_id" integer,
  	"authors_id" integer,
  	"news_ratings_id" integer,
  	"news_reactions_id" integer,
  	"act_groups_id" integer,
  	"acts_id" integer,
  	"kengash_docs_id" integer,
  	"templates_id" integer,
  	"press_id" integer,
  	"albums_id" integer,
  	"videos_id" integer,
  	"oav_id" integer,
  	"faqs_id" integer,
  	"appeals_id" integer,
  	"appeal_files_id" integer,
  	"memberships_id" integer,
  	"volunteers_id" integer,
  	"text_errors_id" integer,
  	"media_id" integer,
  	"files_id" integer,
  	"users_id" integer,
  	"payload_folders_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "bosh_sahifa_benefits_roles_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "bosh_sahifa_benefits_roles_items_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "bosh_sahifa_benefits_roles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon" "enum_bosh_sahifa_benefits_roles_icon" NOT NULL,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "bosh_sahifa_benefits_roles_locales" (
  	"t" varchar NOT NULL,
  	"h" varchar NOT NULL,
  	"more" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "bosh_sahifa_cta_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "bosh_sahifa_cta_steps_locales" (
  	"t" varchar NOT NULL,
  	"d" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "bosh_sahifa" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"about_year" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "bosh_sahifa_locales" (
  	"hero_kicker" varchar NOT NULL,
  	"hero_lead" varchar NOT NULL,
  	"about_title" varchar NOT NULL,
  	"about_text" varchar NOT NULL,
  	"about_year_label" varchar,
  	"about_ott_label" varchar,
  	"about_partners_label" varchar,
  	"opps_title" varchar,
  	"opps_accent" varchar,
  	"opps_grant_lead" varchar NOT NULL,
  	"opps_grant_desc" varchar NOT NULL,
  	"opps_stip_lead" varchar NOT NULL,
  	"opps_stip_desc" varchar NOT NULL,
  	"opps_vol_lead" varchar NOT NULL,
  	"opps_vol_desc" varchar NOT NULL,
  	"opps_tanlov_lead" varchar NOT NULL,
  	"opps_tanlov_desc" varchar NOT NULL,
  	"benefits_title" varchar NOT NULL,
  	"benefits_lead" varchar NOT NULL,
  	"cta_title" varchar NOT NULL,
  	"cta_text" varchar,
  	"heads_news" varchar,
  	"heads_events" varchar,
  	"heads_faq" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_bosh_sahifa_v_version_benefits_roles_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_bosh_sahifa_v_version_benefits_roles_items_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_bosh_sahifa_v_version_benefits_roles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon" "enum__bosh_sahifa_v_version_benefits_roles_icon" NOT NULL,
  	"href" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_bosh_sahifa_v_version_benefits_roles_locales" (
  	"t" varchar NOT NULL,
  	"h" varchar NOT NULL,
  	"more" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_bosh_sahifa_v_version_cta_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_bosh_sahifa_v_version_cta_steps_locales" (
  	"t" varchar NOT NULL,
  	"d" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_bosh_sahifa_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_about_year" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_bosh_sahifa_v_locales" (
  	"version_hero_kicker" varchar NOT NULL,
  	"version_hero_lead" varchar NOT NULL,
  	"version_about_title" varchar NOT NULL,
  	"version_about_text" varchar NOT NULL,
  	"version_about_year_label" varchar,
  	"version_about_ott_label" varchar,
  	"version_about_partners_label" varchar,
  	"version_opps_title" varchar,
  	"version_opps_accent" varchar,
  	"version_opps_grant_lead" varchar NOT NULL,
  	"version_opps_grant_desc" varchar NOT NULL,
  	"version_opps_stip_lead" varchar NOT NULL,
  	"version_opps_stip_desc" varchar NOT NULL,
  	"version_opps_vol_lead" varchar NOT NULL,
  	"version_opps_vol_desc" varchar NOT NULL,
  	"version_opps_tanlov_lead" varchar NOT NULL,
  	"version_opps_tanlov_desc" varchar NOT NULL,
  	"version_benefits_title" varchar NOT NULL,
  	"version_benefits_lead" varchar NOT NULL,
  	"version_cta_title" varchar NOT NULL,
  	"version_cta_text" varchar,
  	"version_heads_news" varchar,
  	"version_heads_events" varchar,
  	"version_heads_faq" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_who_paras" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_who_paras_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_stats_locales" (
  	"v" varchar NOT NULL,
  	"l" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_more_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_more_stats_locales" (
  	"v" varchar NOT NULL,
  	"l" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_history" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_history_locales" (
  	"y" varchar NOT NULL,
  	"d" varchar,
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_privileges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"group" "enum_ittifoq_sahifa_privileges_group" NOT NULL,
  	"img_id" integer,
  	"medal_id" integer,
  	"badge" boolean
  );
  
  CREATE TABLE "ittifoq_sahifa_privileges_locales" (
  	"t" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"fact" varchar,
  	"num" varchar,
  	"num_l" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_intl_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_intl_facts_locales" (
  	"v" varchar,
  	"l" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_intl_forms" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_intl_forms_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_intl_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_intl_projects_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_palace_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_palace_features_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_city_centre_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_city_centre_facts_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_centres" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"img_id" integer
  );
  
  CREATE TABLE "ittifoq_sahifa_centres_locales" (
  	"region" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_structure_qurultoy_meta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_structure_qurultoy_meta_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_structure_council_meta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_structure_council_meta_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_structure_chair_meta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_structure_chair_meta_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_structure_exec_meta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_structure_exec_meta_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_structure_audit_meta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_structure_audit_meta_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_structure_levels_meta" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_structure_levels_meta_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_structure_levels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_structure_levels_locales" (
  	"t" varchar NOT NULL,
  	"d" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_structure_principles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_structure_principles_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_official" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_official_locales" (
  	"k" varchar NOT NULL,
  	"v" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_priorities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_priorities_locales" (
  	"title" varchar NOT NULL,
  	"item" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_join_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"band" varchar
  );
  
  CREATE TABLE "ittifoq_sahifa_join_steps_locales" (
  	"t" varchar NOT NULL,
  	"d" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_join_rights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_join_rights_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_join_duties" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_join_duties_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_join_ends" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_join_ends_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_orgs_ngos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"g" "enum_ittifoq_sahifa_orgs_ngos_g" NOT NULL,
  	"logo_id" integer
  );
  
  CREATE TABLE "ittifoq_sahifa_orgs_ngos_locales" (
  	"t" varchar NOT NULL,
  	"d" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_orgs_companies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_orgs_companies_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_companies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"kind" "enum_ittifoq_sahifa_companies_kind" NOT NULL,
  	"share" varchar,
  	"logo_id" integer
  );
  
  CREATE TABLE "ittifoq_sahifa_companies_locales" (
  	"t" varchar NOT NULL,
  	"d" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"intl_partners_id" integer,
  	"intl_flags_id" integer,
  	"palace_img_id" integer,
  	"city_centre_img_id" integer,
  	"img_team_id" integer,
  	"img_collage_id" integer,
  	"img_collage_sm_id" integer,
  	"img_leaders_id" integer,
  	"img_pres_youth1_id" integer,
  	"img_pres_youth2_id" integer,
  	"img_seminar_id" integer,
  	"img_girls_id" integer,
  	"img_readers_id" integer,
  	"img_books_id" integer,
  	"img_volunteers_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "ittifoq_sahifa_locales" (
  	"who_motto" varchar,
  	"mission_text" varchar NOT NULL,
  	"quote_text" varchar,
  	"quote_author" varchar,
  	"quote_role" varchar,
  	"intl_text" varchar,
  	"intl_assoc" varchar,
  	"palace_name" varchar,
  	"palace_org" varchar,
  	"palace_text" varchar,
  	"city_centre_name" varchar,
  	"city_centre_text" varchar,
  	"structure_qurultoy_t" varchar NOT NULL,
  	"structure_qurultoy_d" varchar NOT NULL,
  	"structure_council_t" varchar NOT NULL,
  	"structure_council_d" varchar NOT NULL,
  	"structure_chair_t" varchar NOT NULL,
  	"structure_chair_d" varchar NOT NULL,
  	"structure_exec_t" varchar NOT NULL,
  	"structure_exec_d" varchar NOT NULL,
  	"structure_audit_t" varchar NOT NULL,
  	"structure_audit_d" varchar NOT NULL,
  	"join_legal_d" varchar,
  	"join_legal_how" varchar,
  	"join_note" varchar,
  	"join_cta_t" varchar,
  	"join_cta_d" varchar,
  	"orgs_lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "ittifoq_sahifa_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_who_paras" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_who_paras_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_stats_locales" (
  	"v" varchar NOT NULL,
  	"l" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_more_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_more_stats_locales" (
  	"v" varchar NOT NULL,
  	"l" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_history" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_history_locales" (
  	"y" varchar NOT NULL,
  	"d" varchar,
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_privileges" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"group" "enum__ittifoq_sahifa_v_version_privileges_group" NOT NULL,
  	"img_id" integer,
  	"medal_id" integer,
  	"badge" boolean,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_privileges_locales" (
  	"t" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"fact" varchar,
  	"num" varchar,
  	"num_l" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_intl_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_intl_facts_locales" (
  	"v" varchar,
  	"l" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_intl_forms" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_intl_forms_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_intl_projects" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_intl_projects_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_palace_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_palace_features_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_city_centre_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_city_centre_facts_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_centres" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"img_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_centres_locales" (
  	"region" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_structure_qurultoy_meta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_structure_qurultoy_meta_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_structure_council_meta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_structure_council_meta_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_structure_chair_meta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_structure_chair_meta_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_structure_exec_meta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_structure_exec_meta_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_structure_audit_meta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_structure_audit_meta_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_structure_levels_meta" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_structure_levels_meta_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_structure_levels" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_structure_levels_locales" (
  	"t" varchar NOT NULL,
  	"d" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_structure_principles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_structure_principles_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_official" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_official_locales" (
  	"k" varchar NOT NULL,
  	"v" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_priorities" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_priorities_locales" (
  	"title" varchar NOT NULL,
  	"item" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_join_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"band" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_join_steps_locales" (
  	"t" varchar NOT NULL,
  	"d" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_join_rights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_join_rights_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_join_duties" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_join_duties_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_join_ends" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_join_ends_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_orgs_ngos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"g" "enum__ittifoq_sahifa_v_version_orgs_ngos_g" NOT NULL,
  	"logo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_orgs_ngos_locales" (
  	"t" varchar NOT NULL,
  	"d" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_orgs_companies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_orgs_companies_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_companies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"kind" "enum__ittifoq_sahifa_v_version_companies_kind" NOT NULL,
  	"share" varchar,
  	"logo_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_version_companies_locales" (
  	"t" varchar NOT NULL,
  	"d" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_ittifoq_sahifa_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_intl_partners_id" integer,
  	"version_intl_flags_id" integer,
  	"version_palace_img_id" integer,
  	"version_city_centre_img_id" integer,
  	"version_img_team_id" integer,
  	"version_img_collage_id" integer,
  	"version_img_collage_sm_id" integer,
  	"version_img_leaders_id" integer,
  	"version_img_pres_youth1_id" integer,
  	"version_img_pres_youth2_id" integer,
  	"version_img_seminar_id" integer,
  	"version_img_girls_id" integer,
  	"version_img_readers_id" integer,
  	"version_img_books_id" integer,
  	"version_img_volunteers_id" integer,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_locales" (
  	"version_who_motto" varchar,
  	"version_mission_text" varchar NOT NULL,
  	"version_quote_text" varchar,
  	"version_quote_author" varchar,
  	"version_quote_role" varchar,
  	"version_intl_text" varchar,
  	"version_intl_assoc" varchar,
  	"version_palace_name" varchar,
  	"version_palace_org" varchar,
  	"version_palace_text" varchar,
  	"version_city_centre_name" varchar,
  	"version_city_centre_text" varchar,
  	"version_structure_qurultoy_t" varchar NOT NULL,
  	"version_structure_qurultoy_d" varchar NOT NULL,
  	"version_structure_council_t" varchar NOT NULL,
  	"version_structure_council_d" varchar NOT NULL,
  	"version_structure_chair_t" varchar NOT NULL,
  	"version_structure_chair_d" varchar NOT NULL,
  	"version_structure_exec_t" varchar NOT NULL,
  	"version_structure_exec_d" varchar NOT NULL,
  	"version_structure_audit_t" varchar NOT NULL,
  	"version_structure_audit_d" varchar NOT NULL,
  	"version_join_legal_d" varchar,
  	"version_join_legal_how" varchar,
  	"version_join_note" varchar,
  	"version_join_cta_t" varchar,
  	"version_join_cta_d" varchar,
  	"version_orgs_lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_ittifoq_sahifa_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  CREATE TABLE "markaziy_kengash_about_paras" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "markaziy_kengash_about_paras_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "markaziy_kengash_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "markaziy_kengash_stats_locales" (
  	"v" varchar NOT NULL,
  	"l" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "markaziy_kengash_organs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "markaziy_kengash_organs_locales" (
  	"t" varchar NOT NULL,
  	"d" varchar NOT NULL,
  	"meta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "markaziy_kengash_powers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "markaziy_kengash_powers_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "markaziy_kengash_members_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "markaziy_kengash_members_facts_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "markaziy_kengash_members_by_post" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "markaziy_kengash_members_by_post_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "markaziy_kengash_members_fields" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "markaziy_kengash_members_fields_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "markaziy_kengash_leaders_edu" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "markaziy_kengash_leaders_edu_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "markaziy_kengash_leaders_career" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "markaziy_kengash_leaders_career_locales" (
  	"y" varchar NOT NULL,
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "markaziy_kengash_leaders" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"img_id" integer
  );
  
  CREATE TABLE "markaziy_kengash_leaders_locales" (
  	"name" varchar NOT NULL,
  	"full" varchar,
  	"role" varchar NOT NULL,
  	"born" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "markaziy_kengash_bodies_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "markaziy_kengash_bodies_items_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "markaziy_kengash_bodies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "markaziy_kengash_bodies_locales" (
  	"t" varchar NOT NULL,
  	"meta" varchar,
  	"d" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "markaziy_kengash_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"date" varchar NOT NULL,
  	"img_id" integer NOT NULL,
  	"href" varchar
  );
  
  CREATE TABLE "markaziy_kengash_events_locales" (
  	"t" varchar NOT NULL,
  	"d" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "markaziy_kengash" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"images_building_id" integer,
  	"images_delegates_id" integer,
  	"contact_map" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "markaziy_kengash_locales" (
  	"about_lead" varchar NOT NULL,
  	"members_lead" varchar NOT NULL,
  	"members_link" varchar,
  	"members_extra" varchar,
  	"contact_address" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_markaziy_kengash_v_version_about_paras" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_markaziy_kengash_v_version_about_paras_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_markaziy_kengash_v_version_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_markaziy_kengash_v_version_stats_locales" (
  	"v" varchar NOT NULL,
  	"l" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_markaziy_kengash_v_version_organs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_markaziy_kengash_v_version_organs_locales" (
  	"t" varchar NOT NULL,
  	"d" varchar NOT NULL,
  	"meta" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_markaziy_kengash_v_version_powers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_markaziy_kengash_v_version_powers_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_markaziy_kengash_v_version_members_facts" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_markaziy_kengash_v_version_members_facts_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_markaziy_kengash_v_version_members_by_post" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_markaziy_kengash_v_version_members_by_post_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_markaziy_kengash_v_version_members_fields" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_markaziy_kengash_v_version_members_fields_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_markaziy_kengash_v_version_leaders_edu" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_markaziy_kengash_v_version_leaders_edu_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_markaziy_kengash_v_version_leaders_career" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_markaziy_kengash_v_version_leaders_career_locales" (
  	"y" varchar NOT NULL,
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_markaziy_kengash_v_version_leaders" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"img_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_markaziy_kengash_v_version_leaders_locales" (
  	"name" varchar NOT NULL,
  	"full" varchar,
  	"role" varchar NOT NULL,
  	"born" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_markaziy_kengash_v_version_bodies_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_markaziy_kengash_v_version_bodies_items_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_markaziy_kengash_v_version_bodies" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_markaziy_kengash_v_version_bodies_locales" (
  	"t" varchar NOT NULL,
  	"meta" varchar,
  	"d" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_markaziy_kengash_v_version_events" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"date" varchar NOT NULL,
  	"img_id" integer NOT NULL,
  	"href" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_markaziy_kengash_v_version_events_locales" (
  	"t" varchar NOT NULL,
  	"d" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_markaziy_kengash_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_images_building_id" integer,
  	"version_images_delegates_id" integer,
  	"version_contact_map" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_markaziy_kengash_v_locales" (
  	"version_about_lead" varchar NOT NULL,
  	"version_members_lead" varchar NOT NULL,
  	"version_members_link" varchar,
  	"version_members_extra" varchar,
  	"version_contact_address" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "natijalar_report_nums" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"v" varchar NOT NULL
  );
  
  CREATE TABLE "natijalar_report_nums_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "natijalar_years_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"post" numeric
  );
  
  CREATE TABLE "natijalar_years_items_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "natijalar_years" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"y" varchar NOT NULL
  );
  
  CREATE TABLE "natijalar" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"report_post" numeric,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_natijalar_v_version_report_nums" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"v" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_natijalar_v_version_report_nums_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_natijalar_v_version_years_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"post" numeric,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_natijalar_v_version_years_items_locales" (
  	"text" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_natijalar_v_version_years" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"y" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_natijalar_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_report_post" numeric,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "volontyorlik_sahifa_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"v" varchar NOT NULL
  );
  
  CREATE TABLE "volontyorlik_sahifa_stats_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "volontyorlik_sahifa_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "volontyorlik_sahifa_steps_locales" (
  	"t" varchar NOT NULL,
  	"d" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "volontyorlik_sahifa_times" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "volontyorlik_sahifa_times_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "volontyorlik_sahifa_rights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "volontyorlik_sahifa_rights_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "volontyorlik_sahifa_duties" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "volontyorlik_sahifa_duties_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "volontyorlik_sahifa_quiz_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "volontyorlik_sahifa_quiz_a_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "volontyorlik_sahifa_quiz" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "volontyorlik_sahifa_quiz_locales" (
  	"q" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "volontyorlik_sahifa" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"law_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "volontyorlik_sahifa_locales" (
  	"law_t" varchar NOT NULL,
  	"law_no" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "volontyorlik_sahifa_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"vol_directions_id" integer
  );
  
  CREATE TABLE "_volontyorlik_sahifa_v_version_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"v" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_volontyorlik_sahifa_v_version_stats_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_volontyorlik_sahifa_v_version_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_volontyorlik_sahifa_v_version_steps_locales" (
  	"t" varchar NOT NULL,
  	"d" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_volontyorlik_sahifa_v_version_times" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_volontyorlik_sahifa_v_version_times_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_volontyorlik_sahifa_v_version_rights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_volontyorlik_sahifa_v_version_rights_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_volontyorlik_sahifa_v_version_duties" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_volontyorlik_sahifa_v_version_duties_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_volontyorlik_sahifa_v_version_quiz_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_volontyorlik_sahifa_v_version_quiz_a_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_volontyorlik_sahifa_v_version_quiz" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_volontyorlik_sahifa_v_version_quiz_locales" (
  	"q" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_volontyorlik_sahifa_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_law_url" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_volontyorlik_sahifa_v_locales" (
  	"version_law_t" varchar NOT NULL,
  	"version_law_no" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_volontyorlik_sahifa_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"vol_directions_id" integer
  );
  
  CREATE TABLE "aloqa_phones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"v" varchar NOT NULL
  );
  
  CREATE TABLE "aloqa_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"v" varchar NOT NULL
  );
  
  CREATE TABLE "aloqa_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"net" "enum_aloqa_socials_net" NOT NULL,
  	"handle" varchar,
  	"href" varchar NOT NULL
  );
  
  CREATE TABLE "aloqa_law_terms" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "aloqa_law_terms_locales" (
  	"v" varchar NOT NULL,
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "aloqa_law_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "aloqa_law_types_locales" (
  	"t" varchar NOT NULL,
  	"d" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "aloqa" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"coords_lat" numeric NOT NULL,
  	"coords_lon" numeric NOT NULL,
  	"hours_time" varchar,
  	"press_phone" varchar,
  	"press_email" varchar,
  	"press_telegram" varchar,
  	"law_href" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "aloqa_locales" (
  	"address_full" varchar NOT NULL,
  	"address_line" varchar NOT NULL,
  	"address_city" varchar,
  	"address_street" varchar,
  	"address_landmark" varchar,
  	"address_metro" varchar,
  	"address_walk" varchar,
  	"hours_days" varchar,
  	"hours_off" varchar,
  	"press_unit" varchar,
  	"law_title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_aloqa_v_version_phones" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"v" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_aloqa_v_version_emails" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"v" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_aloqa_v_version_socials" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"net" "enum__aloqa_v_version_socials_net" NOT NULL,
  	"handle" varchar,
  	"href" varchar NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_aloqa_v_version_law_terms" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_aloqa_v_version_law_terms_locales" (
  	"v" varchar NOT NULL,
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_aloqa_v_version_law_types" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_aloqa_v_version_law_types_locales" (
  	"t" varchar NOT NULL,
  	"d" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_aloqa_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_coords_lat" numeric NOT NULL,
  	"version_coords_lon" numeric NOT NULL,
  	"version_hours_time" varchar,
  	"version_press_phone" varchar,
  	"version_press_email" varchar,
  	"version_press_telegram" varchar,
  	"version_law_href" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_aloqa_v_locales" (
  	"version_address_full" varchar NOT NULL,
  	"version_address_line" varchar NOT NULL,
  	"version_address_city" varchar,
  	"version_address_street" varchar,
  	"version_address_landmark" varchar,
  	"version_address_metro" varchar,
  	"version_address_walk" varchar,
  	"version_hours_days" varchar,
  	"version_hours_off" varchar,
  	"version_press_unit" varchar,
  	"version_law_title" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "azolik_sahifa_conditions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"band" varchar
  );
  
  CREATE TABLE "azolik_sahifa_conditions_locales" (
  	"k" varchar NOT NULL,
  	"t" varchar,
  	"d" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "azolik_sahifa_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"band" varchar
  );
  
  CREATE TABLE "azolik_sahifa_steps_locales" (
  	"t" varchar NOT NULL,
  	"d" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "azolik_sahifa_after" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "azolik_sahifa_after_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "azolik_sahifa" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "_azolik_sahifa_v_version_conditions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"band" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_azolik_sahifa_v_version_conditions_locales" (
  	"k" varchar NOT NULL,
  	"t" varchar,
  	"d" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_azolik_sahifa_v_version_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"band" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_azolik_sahifa_v_version_steps_locales" (
  	"t" varchar NOT NULL,
  	"d" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_azolik_sahifa_v_version_after" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_azolik_sahifa_v_version_after_locales" (
  	"t" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_azolik_sahifa_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "miqdorlar" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"bhm_v" numeric NOT NULL,
  	"stip_v" numeric NOT NULL,
  	"stip_url" varchar,
  	"stip_sum_prezident" numeric NOT NULL,
  	"stip_sum_nomli" numeric NOT NULL,
  	"stip_sum_alo" numeric NOT NULL,
  	"mb_v" numeric NOT NULL,
  	"mb_url" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "miqdorlar_locales" (
  	"bhm_from" varchar,
  	"bhm_act" varchar,
  	"stip_from" varchar,
  	"stip_source" varchar,
  	"mb_from" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_miqdorlar_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_bhm_v" numeric NOT NULL,
  	"version_stip_v" numeric NOT NULL,
  	"version_stip_url" varchar,
  	"version_stip_sum_prezident" numeric NOT NULL,
  	"version_stip_sum_nomli" numeric NOT NULL,
  	"version_stip_sum_alo" numeric NOT NULL,
  	"version_mb_v" numeric NOT NULL,
  	"version_mb_url" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "_miqdorlar_v_locales" (
  	"version_bhm_from" varchar,
  	"version_bhm_act" varchar,
  	"version_stip_from" varchar,
  	"version_stip_source" varchar,
  	"version_mb_from" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "socials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"telegram" varchar DEFAULT 'https://t.me/poytaxtyoshlari_yi',
  	"instagram" varchar DEFAULT 'https://www.instagram.com/yoshlar.uzb/',
  	"facebook" varchar DEFAULT 'https://www.facebook.com/share/1DZFdJ2wTc/',
  	"youtube" varchar DEFAULT 'https://www.youtube.com/@poytaxtyoshlari_uz',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "otts_leader_achievements" ADD CONSTRAINT "otts_leader_achievements_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."otts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "otts_leader_achievements_locales" ADD CONSTRAINT "otts_leader_achievements_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."otts_leader_achievements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "otts" ADD CONSTRAINT "otts_leader_img_id_media_id_fk" FOREIGN KEY ("leader_img_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "otts_locales" ADD CONSTRAINT "otts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."otts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partners_dirs" ADD CONSTRAINT "partners_dirs_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "partners" ADD CONSTRAINT "partners_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "partners_locales" ADD CONSTRAINT "partners_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "departments_tasks" ADD CONSTRAINT "departments_tasks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."departments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "departments_tasks_locales" ADD CONSTRAINT "departments_tasks_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."departments_tasks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "departments_locales" ADD CONSTRAINT "departments_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."departments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "staff_duties" ADD CONSTRAINT "staff_duties_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."staff"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "staff_duties_locales" ADD CONSTRAINT "staff_duties_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."staff_duties"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "staff_socials" ADD CONSTRAINT "staff_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."staff"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "staff" ADD CONSTRAINT "staff_dept_id_departments_id_fk" FOREIGN KEY ("dept_id") REFERENCES "public"."departments"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "staff" ADD CONSTRAINT "staff_img_id_media_id_fk" FOREIGN KEY ("img_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "staff_locales" ADD CONSTRAINT "staff_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."staff"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "directions_locales" ADD CONSTRAINT "directions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."directions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_partners" ADD CONSTRAINT "projects_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_partners_locales" ADD CONSTRAINT "projects_partners_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_results" ADD CONSTRAINT "projects_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_results_locales" ADD CONSTRAINT "projects_results_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_results"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_milestones" ADD CONSTRAINT "projects_milestones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_milestones_locales" ADD CONSTRAINT "projects_milestones_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_milestones"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_posts" ADD CONSTRAINT "projects_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_dir_id_directions_id_fk" FOREIGN KEY ("dir_id") REFERENCES "public"."directions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects" ADD CONSTRAINT "projects_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "projects_locales" ADD CONSTRAINT "projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_rels" ADD CONSTRAINT "projects_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_partners" ADD CONSTRAINT "_projects_v_version_partners_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_partners_locales" ADD CONSTRAINT "_projects_v_version_partners_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_version_partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_results" ADD CONSTRAINT "_projects_v_version_results_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_results_locales" ADD CONSTRAINT "_projects_v_version_results_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_version_results"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_milestones" ADD CONSTRAINT "_projects_v_version_milestones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_milestones_locales" ADD CONSTRAINT "_projects_v_version_milestones_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_version_milestones"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_posts" ADD CONSTRAINT "_projects_v_version_posts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_parent_id_projects_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."projects"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_dir_id_directions_id_fk" FOREIGN KEY ("version_dir_id") REFERENCES "public"."directions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v" ADD CONSTRAINT "_projects_v_version_cover_id_media_id_fk" FOREIGN KEY ("version_cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_projects_v_locales" ADD CONSTRAINT "_projects_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_rels" ADD CONSTRAINT "_projects_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_dir_id_directions_id_fk" FOREIGN KEY ("dir_id") REFERENCES "public"."directions"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_img_id_media_id_fk" FOREIGN KEY ("img_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events_locales" ADD CONSTRAINT "events_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "grants" ADD CONSTRAINT "grants_img_id_media_id_fk" FOREIGN KEY ("img_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "grants_locales" ADD CONSTRAINT "grants_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stipends_rates" ADD CONSTRAINT "stipends_rates_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stipends"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stipends_rates_locales" ADD CONSTRAINT "stipends_rates_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stipends_rates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "stipends_locales" ADD CONSTRAINT "stipends_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."stipends"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "contests" ADD CONSTRAINT "contests_img_id_media_id_fk" FOREIGN KEY ("img_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "contests_locales" ADD CONSTRAINT "contests_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."contests"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "awards_timeline" ADD CONSTRAINT "awards_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."awards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "awards_timeline_locales" ADD CONSTRAINT "awards_timeline_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."awards_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "awards" ADD CONSTRAINT "awards_img_id_media_id_fk" FOREIGN KEY ("img_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "awards_locales" ADD CONSTRAINT "awards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."awards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "benefits_locales" ADD CONSTRAINT "benefits_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."benefits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vol_directions_tasks" ADD CONSTRAINT "vol_directions_tasks_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vol_directions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vol_directions_tasks_locales" ADD CONSTRAINT "vol_directions_tasks_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vol_directions_tasks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "vol_directions_locales" ADD CONSTRAINT "vol_directions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."vol_directions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news" ADD CONSTRAINT "news_author_id_authors_id_fk" FOREIGN KEY ("author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_locales" ADD CONSTRAINT "news_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_texts" ADD CONSTRAINT "news_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_rels" ADD CONSTRAINT "news_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_rels" ADD CONSTRAINT "news_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_parent_id_news_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."news"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_author_id_authors_id_fk" FOREIGN KEY ("version_author_id") REFERENCES "public"."authors"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_news_v_locales" ADD CONSTRAINT "_news_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_texts" ADD CONSTRAINT "_news_v_texts_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_rels" ADD CONSTRAINT "_news_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_news_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_news_v_rels" ADD CONSTRAINT "_news_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "authors" ADD CONSTRAINT "authors_photo_id_media_id_fk" FOREIGN KEY ("photo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "authors_locales" ADD CONSTRAINT "authors_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "news_ratings" ADD CONSTRAINT "news_ratings_news_id_news_id_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "news_reactions" ADD CONSTRAINT "news_reactions_news_id_news_id_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "act_groups_locales" ADD CONSTRAINT "act_groups_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."act_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "acts_for" ADD CONSTRAINT "acts_for_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."acts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "acts" ADD CONSTRAINT "acts_grp_id_act_groups_id_fk" FOREIGN KEY ("grp_id") REFERENCES "public"."act_groups"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "acts_locales" ADD CONSTRAINT "acts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."acts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kengash_docs" ADD CONSTRAINT "kengash_docs_file_id_files_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."files"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "kengash_docs_locales" ADD CONSTRAINT "kengash_docs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."kengash_docs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "templates" ADD CONSTRAINT "templates_file_id_files_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."files"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "templates_locales" ADD CONSTRAINT "templates_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press_body" ADD CONSTRAINT "press_body_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."press"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press_body_locales" ADD CONSTRAINT "press_body_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."press_body"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press_facts" ADD CONSTRAINT "press_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."press"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press_facts_locales" ADD CONSTRAINT "press_facts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."press_facts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "press" ADD CONSTRAINT "press_album_id_albums_id_fk" FOREIGN KEY ("album_id") REFERENCES "public"."albums"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "press" ADD CONSTRAINT "press_video_id_videos_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."videos"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "press_locales" ADD CONSTRAINT "press_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."press"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_press_v_version_body" ADD CONSTRAINT "_press_v_version_body_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_press_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_press_v_version_body_locales" ADD CONSTRAINT "_press_v_version_body_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_press_v_version_body"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_press_v_version_facts" ADD CONSTRAINT "_press_v_version_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_press_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_press_v_version_facts_locales" ADD CONSTRAINT "_press_v_version_facts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_press_v_version_facts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_press_v" ADD CONSTRAINT "_press_v_parent_id_press_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."press"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_press_v" ADD CONSTRAINT "_press_v_version_album_id_albums_id_fk" FOREIGN KEY ("version_album_id") REFERENCES "public"."albums"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_press_v" ADD CONSTRAINT "_press_v_version_video_id_videos_id_fk" FOREIGN KEY ("version_video_id") REFERENCES "public"."videos"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_press_v_locales" ADD CONSTRAINT "_press_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_press_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "albums_locales" ADD CONSTRAINT "albums_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."albums"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "albums_rels" ADD CONSTRAINT "albums_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."albums"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "albums_rels" ADD CONSTRAINT "albums_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "videos_locales" ADD CONSTRAINT "videos_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "oav_locales" ADD CONSTRAINT "oav_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."oav"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqs_a" ADD CONSTRAINT "faqs_a_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqs_a_locales" ADD CONSTRAINT "faqs_a_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faqs_a"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqs_li" ADD CONSTRAINT "faqs_li_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqs_li_locales" ADD CONSTRAINT "faqs_li_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faqs_li"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "faqs_locales" ADD CONSTRAINT "faqs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "appeals" ADD CONSTRAINT "appeals_file_id_appeal_files_id_fk" FOREIGN KEY ("file_id") REFERENCES "public"."appeal_files"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media" ADD CONSTRAINT "media_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "files_locales" ADD CONSTRAINT "files_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."files"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders_folder_type" ADD CONSTRAINT "payload_folders_folder_type_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_folders" ADD CONSTRAINT "payload_folders_folder_id_payload_folders_id_fk" FOREIGN KEY ("folder_id") REFERENCES "public"."payload_folders"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_otts_fk" FOREIGN KEY ("otts_id") REFERENCES "public"."otts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_partners_fk" FOREIGN KEY ("partners_id") REFERENCES "public"."partners"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_departments_fk" FOREIGN KEY ("departments_id") REFERENCES "public"."departments"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_staff_fk" FOREIGN KEY ("staff_id") REFERENCES "public"."staff"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_directions_fk" FOREIGN KEY ("directions_id") REFERENCES "public"."directions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_projects_fk" FOREIGN KEY ("projects_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_grants_fk" FOREIGN KEY ("grants_id") REFERENCES "public"."grants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_stipends_fk" FOREIGN KEY ("stipends_id") REFERENCES "public"."stipends"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_contests_fk" FOREIGN KEY ("contests_id") REFERENCES "public"."contests"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_awards_fk" FOREIGN KEY ("awards_id") REFERENCES "public"."awards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_benefits_fk" FOREIGN KEY ("benefits_id") REFERENCES "public"."benefits"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_vol_directions_fk" FOREIGN KEY ("vol_directions_id") REFERENCES "public"."vol_directions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "public"."news"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_authors_fk" FOREIGN KEY ("authors_id") REFERENCES "public"."authors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_ratings_fk" FOREIGN KEY ("news_ratings_id") REFERENCES "public"."news_ratings"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_reactions_fk" FOREIGN KEY ("news_reactions_id") REFERENCES "public"."news_reactions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_act_groups_fk" FOREIGN KEY ("act_groups_id") REFERENCES "public"."act_groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_acts_fk" FOREIGN KEY ("acts_id") REFERENCES "public"."acts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_kengash_docs_fk" FOREIGN KEY ("kengash_docs_id") REFERENCES "public"."kengash_docs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_templates_fk" FOREIGN KEY ("templates_id") REFERENCES "public"."templates"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_press_fk" FOREIGN KEY ("press_id") REFERENCES "public"."press"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_albums_fk" FOREIGN KEY ("albums_id") REFERENCES "public"."albums"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_videos_fk" FOREIGN KEY ("videos_id") REFERENCES "public"."videos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_oav_fk" FOREIGN KEY ("oav_id") REFERENCES "public"."oav"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_appeals_fk" FOREIGN KEY ("appeals_id") REFERENCES "public"."appeals"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_appeal_files_fk" FOREIGN KEY ("appeal_files_id") REFERENCES "public"."appeal_files"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_memberships_fk" FOREIGN KEY ("memberships_id") REFERENCES "public"."memberships"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_volunteers_fk" FOREIGN KEY ("volunteers_id") REFERENCES "public"."volunteers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_text_errors_fk" FOREIGN KEY ("text_errors_id") REFERENCES "public"."text_errors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_files_fk" FOREIGN KEY ("files_id") REFERENCES "public"."files"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_folders_fk" FOREIGN KEY ("payload_folders_id") REFERENCES "public"."payload_folders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "bosh_sahifa_benefits_roles_items" ADD CONSTRAINT "bosh_sahifa_benefits_roles_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."bosh_sahifa_benefits_roles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "bosh_sahifa_benefits_roles_items_locales" ADD CONSTRAINT "bosh_sahifa_benefits_roles_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."bosh_sahifa_benefits_roles_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "bosh_sahifa_benefits_roles" ADD CONSTRAINT "bosh_sahifa_benefits_roles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."bosh_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "bosh_sahifa_benefits_roles_locales" ADD CONSTRAINT "bosh_sahifa_benefits_roles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."bosh_sahifa_benefits_roles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "bosh_sahifa_cta_steps" ADD CONSTRAINT "bosh_sahifa_cta_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."bosh_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "bosh_sahifa_cta_steps_locales" ADD CONSTRAINT "bosh_sahifa_cta_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."bosh_sahifa_cta_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "bosh_sahifa_locales" ADD CONSTRAINT "bosh_sahifa_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."bosh_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_bosh_sahifa_v_version_benefits_roles_items" ADD CONSTRAINT "_bosh_sahifa_v_version_benefits_roles_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_bosh_sahifa_v_version_benefits_roles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_bosh_sahifa_v_version_benefits_roles_items_locales" ADD CONSTRAINT "_bosh_sahifa_v_version_benefits_roles_items_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_bosh_sahifa_v_version_benefits_roles_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_bosh_sahifa_v_version_benefits_roles" ADD CONSTRAINT "_bosh_sahifa_v_version_benefits_roles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_bosh_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_bosh_sahifa_v_version_benefits_roles_locales" ADD CONSTRAINT "_bosh_sahifa_v_version_benefits_roles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_bosh_sahifa_v_version_benefits_roles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_bosh_sahifa_v_version_cta_steps" ADD CONSTRAINT "_bosh_sahifa_v_version_cta_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_bosh_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_bosh_sahifa_v_version_cta_steps_locales" ADD CONSTRAINT "_bosh_sahifa_v_version_cta_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_bosh_sahifa_v_version_cta_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_bosh_sahifa_v_locales" ADD CONSTRAINT "_bosh_sahifa_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_bosh_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_who_paras" ADD CONSTRAINT "ittifoq_sahifa_who_paras_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_who_paras_locales" ADD CONSTRAINT "ittifoq_sahifa_who_paras_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa_who_paras"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_stats" ADD CONSTRAINT "ittifoq_sahifa_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_stats_locales" ADD CONSTRAINT "ittifoq_sahifa_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_more_stats" ADD CONSTRAINT "ittifoq_sahifa_more_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_more_stats_locales" ADD CONSTRAINT "ittifoq_sahifa_more_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa_more_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_history" ADD CONSTRAINT "ittifoq_sahifa_history_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_history_locales" ADD CONSTRAINT "ittifoq_sahifa_history_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa_history"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_privileges" ADD CONSTRAINT "ittifoq_sahifa_privileges_img_id_media_id_fk" FOREIGN KEY ("img_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_privileges" ADD CONSTRAINT "ittifoq_sahifa_privileges_medal_id_media_id_fk" FOREIGN KEY ("medal_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_privileges" ADD CONSTRAINT "ittifoq_sahifa_privileges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_privileges_locales" ADD CONSTRAINT "ittifoq_sahifa_privileges_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa_privileges"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_intl_facts" ADD CONSTRAINT "ittifoq_sahifa_intl_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_intl_facts_locales" ADD CONSTRAINT "ittifoq_sahifa_intl_facts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa_intl_facts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_intl_forms" ADD CONSTRAINT "ittifoq_sahifa_intl_forms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_intl_forms_locales" ADD CONSTRAINT "ittifoq_sahifa_intl_forms_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa_intl_forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_intl_projects" ADD CONSTRAINT "ittifoq_sahifa_intl_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_intl_projects_locales" ADD CONSTRAINT "ittifoq_sahifa_intl_projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa_intl_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_palace_features" ADD CONSTRAINT "ittifoq_sahifa_palace_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_palace_features_locales" ADD CONSTRAINT "ittifoq_sahifa_palace_features_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa_palace_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_city_centre_facts" ADD CONSTRAINT "ittifoq_sahifa_city_centre_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_city_centre_facts_locales" ADD CONSTRAINT "ittifoq_sahifa_city_centre_facts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa_city_centre_facts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_centres" ADD CONSTRAINT "ittifoq_sahifa_centres_img_id_media_id_fk" FOREIGN KEY ("img_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_centres" ADD CONSTRAINT "ittifoq_sahifa_centres_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_centres_locales" ADD CONSTRAINT "ittifoq_sahifa_centres_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa_centres"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_structure_qurultoy_meta" ADD CONSTRAINT "ittifoq_sahifa_structure_qurultoy_meta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_structure_qurultoy_meta_locales" ADD CONSTRAINT "ittifoq_sahifa_structure_qurultoy_meta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa_structure_qurultoy_meta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_structure_council_meta" ADD CONSTRAINT "ittifoq_sahifa_structure_council_meta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_structure_council_meta_locales" ADD CONSTRAINT "ittifoq_sahifa_structure_council_meta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa_structure_council_meta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_structure_chair_meta" ADD CONSTRAINT "ittifoq_sahifa_structure_chair_meta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_structure_chair_meta_locales" ADD CONSTRAINT "ittifoq_sahifa_structure_chair_meta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa_structure_chair_meta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_structure_exec_meta" ADD CONSTRAINT "ittifoq_sahifa_structure_exec_meta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_structure_exec_meta_locales" ADD CONSTRAINT "ittifoq_sahifa_structure_exec_meta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa_structure_exec_meta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_structure_audit_meta" ADD CONSTRAINT "ittifoq_sahifa_structure_audit_meta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_structure_audit_meta_locales" ADD CONSTRAINT "ittifoq_sahifa_structure_audit_meta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa_structure_audit_meta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_structure_levels_meta" ADD CONSTRAINT "ittifoq_sahifa_structure_levels_meta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa_structure_levels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_structure_levels_meta_locales" ADD CONSTRAINT "ittifoq_sahifa_structure_levels_meta_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa_structure_levels_meta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_structure_levels" ADD CONSTRAINT "ittifoq_sahifa_structure_levels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_structure_levels_locales" ADD CONSTRAINT "ittifoq_sahifa_structure_levels_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa_structure_levels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_structure_principles" ADD CONSTRAINT "ittifoq_sahifa_structure_principles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_structure_principles_locales" ADD CONSTRAINT "ittifoq_sahifa_structure_principles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa_structure_principles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_official" ADD CONSTRAINT "ittifoq_sahifa_official_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_official_locales" ADD CONSTRAINT "ittifoq_sahifa_official_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa_official"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_priorities" ADD CONSTRAINT "ittifoq_sahifa_priorities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_priorities_locales" ADD CONSTRAINT "ittifoq_sahifa_priorities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa_priorities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_join_steps" ADD CONSTRAINT "ittifoq_sahifa_join_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_join_steps_locales" ADD CONSTRAINT "ittifoq_sahifa_join_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa_join_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_join_rights" ADD CONSTRAINT "ittifoq_sahifa_join_rights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_join_rights_locales" ADD CONSTRAINT "ittifoq_sahifa_join_rights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa_join_rights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_join_duties" ADD CONSTRAINT "ittifoq_sahifa_join_duties_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_join_duties_locales" ADD CONSTRAINT "ittifoq_sahifa_join_duties_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa_join_duties"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_join_ends" ADD CONSTRAINT "ittifoq_sahifa_join_ends_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_join_ends_locales" ADD CONSTRAINT "ittifoq_sahifa_join_ends_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa_join_ends"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_orgs_ngos" ADD CONSTRAINT "ittifoq_sahifa_orgs_ngos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_orgs_ngos" ADD CONSTRAINT "ittifoq_sahifa_orgs_ngos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_orgs_ngos_locales" ADD CONSTRAINT "ittifoq_sahifa_orgs_ngos_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa_orgs_ngos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_orgs_companies" ADD CONSTRAINT "ittifoq_sahifa_orgs_companies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_orgs_companies_locales" ADD CONSTRAINT "ittifoq_sahifa_orgs_companies_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa_orgs_companies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_companies" ADD CONSTRAINT "ittifoq_sahifa_companies_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_companies" ADD CONSTRAINT "ittifoq_sahifa_companies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_companies_locales" ADD CONSTRAINT "ittifoq_sahifa_companies_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa_companies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa" ADD CONSTRAINT "ittifoq_sahifa_intl_partners_id_media_id_fk" FOREIGN KEY ("intl_partners_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa" ADD CONSTRAINT "ittifoq_sahifa_intl_flags_id_media_id_fk" FOREIGN KEY ("intl_flags_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa" ADD CONSTRAINT "ittifoq_sahifa_palace_img_id_media_id_fk" FOREIGN KEY ("palace_img_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa" ADD CONSTRAINT "ittifoq_sahifa_city_centre_img_id_media_id_fk" FOREIGN KEY ("city_centre_img_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa" ADD CONSTRAINT "ittifoq_sahifa_img_team_id_media_id_fk" FOREIGN KEY ("img_team_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa" ADD CONSTRAINT "ittifoq_sahifa_img_collage_id_media_id_fk" FOREIGN KEY ("img_collage_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa" ADD CONSTRAINT "ittifoq_sahifa_img_collage_sm_id_media_id_fk" FOREIGN KEY ("img_collage_sm_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa" ADD CONSTRAINT "ittifoq_sahifa_img_leaders_id_media_id_fk" FOREIGN KEY ("img_leaders_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa" ADD CONSTRAINT "ittifoq_sahifa_img_pres_youth1_id_media_id_fk" FOREIGN KEY ("img_pres_youth1_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa" ADD CONSTRAINT "ittifoq_sahifa_img_pres_youth2_id_media_id_fk" FOREIGN KEY ("img_pres_youth2_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa" ADD CONSTRAINT "ittifoq_sahifa_img_seminar_id_media_id_fk" FOREIGN KEY ("img_seminar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa" ADD CONSTRAINT "ittifoq_sahifa_img_girls_id_media_id_fk" FOREIGN KEY ("img_girls_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa" ADD CONSTRAINT "ittifoq_sahifa_img_readers_id_media_id_fk" FOREIGN KEY ("img_readers_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa" ADD CONSTRAINT "ittifoq_sahifa_img_books_id_media_id_fk" FOREIGN KEY ("img_books_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa" ADD CONSTRAINT "ittifoq_sahifa_img_volunteers_id_media_id_fk" FOREIGN KEY ("img_volunteers_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_locales" ADD CONSTRAINT "ittifoq_sahifa_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."ittifoq_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_rels" ADD CONSTRAINT "ittifoq_sahifa_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."ittifoq_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "ittifoq_sahifa_rels" ADD CONSTRAINT "ittifoq_sahifa_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_who_paras" ADD CONSTRAINT "_ittifoq_sahifa_v_version_who_paras_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_who_paras_locales" ADD CONSTRAINT "_ittifoq_sahifa_v_version_who_paras_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v_version_who_paras"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_stats" ADD CONSTRAINT "_ittifoq_sahifa_v_version_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_stats_locales" ADD CONSTRAINT "_ittifoq_sahifa_v_version_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v_version_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_more_stats" ADD CONSTRAINT "_ittifoq_sahifa_v_version_more_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_more_stats_locales" ADD CONSTRAINT "_ittifoq_sahifa_v_version_more_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v_version_more_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_history" ADD CONSTRAINT "_ittifoq_sahifa_v_version_history_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_history_locales" ADD CONSTRAINT "_ittifoq_sahifa_v_version_history_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v_version_history"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_privileges" ADD CONSTRAINT "_ittifoq_sahifa_v_version_privileges_img_id_media_id_fk" FOREIGN KEY ("img_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_privileges" ADD CONSTRAINT "_ittifoq_sahifa_v_version_privileges_medal_id_media_id_fk" FOREIGN KEY ("medal_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_privileges" ADD CONSTRAINT "_ittifoq_sahifa_v_version_privileges_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_privileges_locales" ADD CONSTRAINT "_ittifoq_sahifa_v_version_privileges_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v_version_privileges"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_intl_facts" ADD CONSTRAINT "_ittifoq_sahifa_v_version_intl_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_intl_facts_locales" ADD CONSTRAINT "_ittifoq_sahifa_v_version_intl_facts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v_version_intl_facts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_intl_forms" ADD CONSTRAINT "_ittifoq_sahifa_v_version_intl_forms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_intl_forms_locales" ADD CONSTRAINT "_ittifoq_sahifa_v_version_intl_forms_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v_version_intl_forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_intl_projects" ADD CONSTRAINT "_ittifoq_sahifa_v_version_intl_projects_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_intl_projects_locales" ADD CONSTRAINT "_ittifoq_sahifa_v_version_intl_projects_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v_version_intl_projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_palace_features" ADD CONSTRAINT "_ittifoq_sahifa_v_version_palace_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_palace_features_locales" ADD CONSTRAINT "_ittifoq_sahifa_v_version_palace_features_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v_version_palace_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_city_centre_facts" ADD CONSTRAINT "_ittifoq_sahifa_v_version_city_centre_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_city_centre_facts_locales" ADD CONSTRAINT "_ittifoq_sahifa_v_version_city_centre_facts_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v_version_city_centre_facts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_centres" ADD CONSTRAINT "_ittifoq_sahifa_v_version_centres_img_id_media_id_fk" FOREIGN KEY ("img_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_centres" ADD CONSTRAINT "_ittifoq_sahifa_v_version_centres_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_centres_locales" ADD CONSTRAINT "_ittifoq_sahifa_v_version_centres_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v_version_centres"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_structure_qurultoy_meta" ADD CONSTRAINT "_ittifoq_sahifa_v_version_structure_qurultoy_meta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_structure_qurultoy_meta_locales" ADD CONSTRAINT "_ittifoq_sahifa_v_version_structure_qurultoy_meta_locales_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v_version_structure_qurultoy_meta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_structure_council_meta" ADD CONSTRAINT "_ittifoq_sahifa_v_version_structure_council_meta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_structure_council_meta_locales" ADD CONSTRAINT "_ittifoq_sahifa_v_version_structure_council_meta_locales__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v_version_structure_council_meta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_structure_chair_meta" ADD CONSTRAINT "_ittifoq_sahifa_v_version_structure_chair_meta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_structure_chair_meta_locales" ADD CONSTRAINT "_ittifoq_sahifa_v_version_structure_chair_meta_locales_pa_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v_version_structure_chair_meta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_structure_exec_meta" ADD CONSTRAINT "_ittifoq_sahifa_v_version_structure_exec_meta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_structure_exec_meta_locales" ADD CONSTRAINT "_ittifoq_sahifa_v_version_structure_exec_meta_locales_par_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v_version_structure_exec_meta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_structure_audit_meta" ADD CONSTRAINT "_ittifoq_sahifa_v_version_structure_audit_meta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_structure_audit_meta_locales" ADD CONSTRAINT "_ittifoq_sahifa_v_version_structure_audit_meta_locales_pa_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v_version_structure_audit_meta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_structure_levels_meta" ADD CONSTRAINT "_ittifoq_sahifa_v_version_structure_levels_meta_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v_version_structure_levels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_structure_levels_meta_locales" ADD CONSTRAINT "_ittifoq_sahifa_v_version_structure_levels_meta_locales_p_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v_version_structure_levels_meta"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_structure_levels" ADD CONSTRAINT "_ittifoq_sahifa_v_version_structure_levels_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_structure_levels_locales" ADD CONSTRAINT "_ittifoq_sahifa_v_version_structure_levels_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v_version_structure_levels"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_structure_principles" ADD CONSTRAINT "_ittifoq_sahifa_v_version_structure_principles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_structure_principles_locales" ADD CONSTRAINT "_ittifoq_sahifa_v_version_structure_principles_locales_pa_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v_version_structure_principles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_official" ADD CONSTRAINT "_ittifoq_sahifa_v_version_official_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_official_locales" ADD CONSTRAINT "_ittifoq_sahifa_v_version_official_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v_version_official"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_priorities" ADD CONSTRAINT "_ittifoq_sahifa_v_version_priorities_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_priorities_locales" ADD CONSTRAINT "_ittifoq_sahifa_v_version_priorities_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v_version_priorities"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_join_steps" ADD CONSTRAINT "_ittifoq_sahifa_v_version_join_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_join_steps_locales" ADD CONSTRAINT "_ittifoq_sahifa_v_version_join_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v_version_join_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_join_rights" ADD CONSTRAINT "_ittifoq_sahifa_v_version_join_rights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_join_rights_locales" ADD CONSTRAINT "_ittifoq_sahifa_v_version_join_rights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v_version_join_rights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_join_duties" ADD CONSTRAINT "_ittifoq_sahifa_v_version_join_duties_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_join_duties_locales" ADD CONSTRAINT "_ittifoq_sahifa_v_version_join_duties_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v_version_join_duties"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_join_ends" ADD CONSTRAINT "_ittifoq_sahifa_v_version_join_ends_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_join_ends_locales" ADD CONSTRAINT "_ittifoq_sahifa_v_version_join_ends_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v_version_join_ends"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_orgs_ngos" ADD CONSTRAINT "_ittifoq_sahifa_v_version_orgs_ngos_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_orgs_ngos" ADD CONSTRAINT "_ittifoq_sahifa_v_version_orgs_ngos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_orgs_ngos_locales" ADD CONSTRAINT "_ittifoq_sahifa_v_version_orgs_ngos_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v_version_orgs_ngos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_orgs_companies" ADD CONSTRAINT "_ittifoq_sahifa_v_version_orgs_companies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_orgs_companies_locales" ADD CONSTRAINT "_ittifoq_sahifa_v_version_orgs_companies_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v_version_orgs_companies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_companies" ADD CONSTRAINT "_ittifoq_sahifa_v_version_companies_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_companies" ADD CONSTRAINT "_ittifoq_sahifa_v_version_companies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_version_companies_locales" ADD CONSTRAINT "_ittifoq_sahifa_v_version_companies_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v_version_companies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v" ADD CONSTRAINT "_ittifoq_sahifa_v_version_intl_partners_id_media_id_fk" FOREIGN KEY ("version_intl_partners_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v" ADD CONSTRAINT "_ittifoq_sahifa_v_version_intl_flags_id_media_id_fk" FOREIGN KEY ("version_intl_flags_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v" ADD CONSTRAINT "_ittifoq_sahifa_v_version_palace_img_id_media_id_fk" FOREIGN KEY ("version_palace_img_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v" ADD CONSTRAINT "_ittifoq_sahifa_v_version_city_centre_img_id_media_id_fk" FOREIGN KEY ("version_city_centre_img_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v" ADD CONSTRAINT "_ittifoq_sahifa_v_version_img_team_id_media_id_fk" FOREIGN KEY ("version_img_team_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v" ADD CONSTRAINT "_ittifoq_sahifa_v_version_img_collage_id_media_id_fk" FOREIGN KEY ("version_img_collage_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v" ADD CONSTRAINT "_ittifoq_sahifa_v_version_img_collage_sm_id_media_id_fk" FOREIGN KEY ("version_img_collage_sm_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v" ADD CONSTRAINT "_ittifoq_sahifa_v_version_img_leaders_id_media_id_fk" FOREIGN KEY ("version_img_leaders_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v" ADD CONSTRAINT "_ittifoq_sahifa_v_version_img_pres_youth1_id_media_id_fk" FOREIGN KEY ("version_img_pres_youth1_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v" ADD CONSTRAINT "_ittifoq_sahifa_v_version_img_pres_youth2_id_media_id_fk" FOREIGN KEY ("version_img_pres_youth2_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v" ADD CONSTRAINT "_ittifoq_sahifa_v_version_img_seminar_id_media_id_fk" FOREIGN KEY ("version_img_seminar_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v" ADD CONSTRAINT "_ittifoq_sahifa_v_version_img_girls_id_media_id_fk" FOREIGN KEY ("version_img_girls_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v" ADD CONSTRAINT "_ittifoq_sahifa_v_version_img_readers_id_media_id_fk" FOREIGN KEY ("version_img_readers_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v" ADD CONSTRAINT "_ittifoq_sahifa_v_version_img_books_id_media_id_fk" FOREIGN KEY ("version_img_books_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v" ADD CONSTRAINT "_ittifoq_sahifa_v_version_img_volunteers_id_media_id_fk" FOREIGN KEY ("version_img_volunteers_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_locales" ADD CONSTRAINT "_ittifoq_sahifa_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_ittifoq_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_rels" ADD CONSTRAINT "_ittifoq_sahifa_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_ittifoq_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_ittifoq_sahifa_v_rels" ADD CONSTRAINT "_ittifoq_sahifa_v_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markaziy_kengash_about_paras" ADD CONSTRAINT "markaziy_kengash_about_paras_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markaziy_kengash"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markaziy_kengash_about_paras_locales" ADD CONSTRAINT "markaziy_kengash_about_paras_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markaziy_kengash_about_paras"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markaziy_kengash_stats" ADD CONSTRAINT "markaziy_kengash_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markaziy_kengash"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markaziy_kengash_stats_locales" ADD CONSTRAINT "markaziy_kengash_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markaziy_kengash_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markaziy_kengash_organs" ADD CONSTRAINT "markaziy_kengash_organs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markaziy_kengash"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markaziy_kengash_organs_locales" ADD CONSTRAINT "markaziy_kengash_organs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markaziy_kengash_organs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markaziy_kengash_powers" ADD CONSTRAINT "markaziy_kengash_powers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markaziy_kengash"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markaziy_kengash_powers_locales" ADD CONSTRAINT "markaziy_kengash_powers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markaziy_kengash_powers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markaziy_kengash_members_facts" ADD CONSTRAINT "markaziy_kengash_members_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markaziy_kengash"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markaziy_kengash_members_facts_locales" ADD CONSTRAINT "markaziy_kengash_members_facts_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markaziy_kengash_members_facts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markaziy_kengash_members_by_post" ADD CONSTRAINT "markaziy_kengash_members_by_post_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markaziy_kengash"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markaziy_kengash_members_by_post_locales" ADD CONSTRAINT "markaziy_kengash_members_by_post_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markaziy_kengash_members_by_post"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markaziy_kengash_members_fields" ADD CONSTRAINT "markaziy_kengash_members_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markaziy_kengash"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markaziy_kengash_members_fields_locales" ADD CONSTRAINT "markaziy_kengash_members_fields_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markaziy_kengash_members_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markaziy_kengash_leaders_edu" ADD CONSTRAINT "markaziy_kengash_leaders_edu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markaziy_kengash_leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markaziy_kengash_leaders_edu_locales" ADD CONSTRAINT "markaziy_kengash_leaders_edu_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markaziy_kengash_leaders_edu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markaziy_kengash_leaders_career" ADD CONSTRAINT "markaziy_kengash_leaders_career_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markaziy_kengash_leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markaziy_kengash_leaders_career_locales" ADD CONSTRAINT "markaziy_kengash_leaders_career_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markaziy_kengash_leaders_career"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markaziy_kengash_leaders" ADD CONSTRAINT "markaziy_kengash_leaders_img_id_media_id_fk" FOREIGN KEY ("img_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "markaziy_kengash_leaders" ADD CONSTRAINT "markaziy_kengash_leaders_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markaziy_kengash"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markaziy_kengash_leaders_locales" ADD CONSTRAINT "markaziy_kengash_leaders_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markaziy_kengash_leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markaziy_kengash_bodies_items" ADD CONSTRAINT "markaziy_kengash_bodies_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markaziy_kengash_bodies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markaziy_kengash_bodies_items_locales" ADD CONSTRAINT "markaziy_kengash_bodies_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markaziy_kengash_bodies_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markaziy_kengash_bodies" ADD CONSTRAINT "markaziy_kengash_bodies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markaziy_kengash"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markaziy_kengash_bodies_locales" ADD CONSTRAINT "markaziy_kengash_bodies_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markaziy_kengash_bodies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markaziy_kengash_events" ADD CONSTRAINT "markaziy_kengash_events_img_id_media_id_fk" FOREIGN KEY ("img_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "markaziy_kengash_events" ADD CONSTRAINT "markaziy_kengash_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markaziy_kengash"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markaziy_kengash_events_locales" ADD CONSTRAINT "markaziy_kengash_events_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markaziy_kengash_events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "markaziy_kengash" ADD CONSTRAINT "markaziy_kengash_images_building_id_media_id_fk" FOREIGN KEY ("images_building_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "markaziy_kengash" ADD CONSTRAINT "markaziy_kengash_images_delegates_id_media_id_fk" FOREIGN KEY ("images_delegates_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "markaziy_kengash_locales" ADD CONSTRAINT "markaziy_kengash_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."markaziy_kengash"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markaziy_kengash_v_version_about_paras" ADD CONSTRAINT "_markaziy_kengash_v_version_about_paras_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markaziy_kengash_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markaziy_kengash_v_version_about_paras_locales" ADD CONSTRAINT "_markaziy_kengash_v_version_about_paras_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markaziy_kengash_v_version_about_paras"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markaziy_kengash_v_version_stats" ADD CONSTRAINT "_markaziy_kengash_v_version_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markaziy_kengash_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markaziy_kengash_v_version_stats_locales" ADD CONSTRAINT "_markaziy_kengash_v_version_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markaziy_kengash_v_version_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markaziy_kengash_v_version_organs" ADD CONSTRAINT "_markaziy_kengash_v_version_organs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markaziy_kengash_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markaziy_kengash_v_version_organs_locales" ADD CONSTRAINT "_markaziy_kengash_v_version_organs_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markaziy_kengash_v_version_organs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markaziy_kengash_v_version_powers" ADD CONSTRAINT "_markaziy_kengash_v_version_powers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markaziy_kengash_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markaziy_kengash_v_version_powers_locales" ADD CONSTRAINT "_markaziy_kengash_v_version_powers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markaziy_kengash_v_version_powers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markaziy_kengash_v_version_members_facts" ADD CONSTRAINT "_markaziy_kengash_v_version_members_facts_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markaziy_kengash_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markaziy_kengash_v_version_members_facts_locales" ADD CONSTRAINT "_markaziy_kengash_v_version_members_facts_locales_parent__fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markaziy_kengash_v_version_members_facts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markaziy_kengash_v_version_members_by_post" ADD CONSTRAINT "_markaziy_kengash_v_version_members_by_post_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markaziy_kengash_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markaziy_kengash_v_version_members_by_post_locales" ADD CONSTRAINT "_markaziy_kengash_v_version_members_by_post_locales_paren_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markaziy_kengash_v_version_members_by_post"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markaziy_kengash_v_version_members_fields" ADD CONSTRAINT "_markaziy_kengash_v_version_members_fields_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markaziy_kengash_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markaziy_kengash_v_version_members_fields_locales" ADD CONSTRAINT "_markaziy_kengash_v_version_members_fields_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markaziy_kengash_v_version_members_fields"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markaziy_kengash_v_version_leaders_edu" ADD CONSTRAINT "_markaziy_kengash_v_version_leaders_edu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markaziy_kengash_v_version_leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markaziy_kengash_v_version_leaders_edu_locales" ADD CONSTRAINT "_markaziy_kengash_v_version_leaders_edu_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markaziy_kengash_v_version_leaders_edu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markaziy_kengash_v_version_leaders_career" ADD CONSTRAINT "_markaziy_kengash_v_version_leaders_career_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markaziy_kengash_v_version_leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markaziy_kengash_v_version_leaders_career_locales" ADD CONSTRAINT "_markaziy_kengash_v_version_leaders_career_locales_parent_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markaziy_kengash_v_version_leaders_career"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markaziy_kengash_v_version_leaders" ADD CONSTRAINT "_markaziy_kengash_v_version_leaders_img_id_media_id_fk" FOREIGN KEY ("img_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_markaziy_kengash_v_version_leaders" ADD CONSTRAINT "_markaziy_kengash_v_version_leaders_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markaziy_kengash_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markaziy_kengash_v_version_leaders_locales" ADD CONSTRAINT "_markaziy_kengash_v_version_leaders_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markaziy_kengash_v_version_leaders"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markaziy_kengash_v_version_bodies_items" ADD CONSTRAINT "_markaziy_kengash_v_version_bodies_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markaziy_kengash_v_version_bodies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markaziy_kengash_v_version_bodies_items_locales" ADD CONSTRAINT "_markaziy_kengash_v_version_bodies_items_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markaziy_kengash_v_version_bodies_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markaziy_kengash_v_version_bodies" ADD CONSTRAINT "_markaziy_kengash_v_version_bodies_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markaziy_kengash_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markaziy_kengash_v_version_bodies_locales" ADD CONSTRAINT "_markaziy_kengash_v_version_bodies_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markaziy_kengash_v_version_bodies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markaziy_kengash_v_version_events" ADD CONSTRAINT "_markaziy_kengash_v_version_events_img_id_media_id_fk" FOREIGN KEY ("img_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_markaziy_kengash_v_version_events" ADD CONSTRAINT "_markaziy_kengash_v_version_events_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markaziy_kengash_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markaziy_kengash_v_version_events_locales" ADD CONSTRAINT "_markaziy_kengash_v_version_events_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markaziy_kengash_v_version_events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_markaziy_kengash_v" ADD CONSTRAINT "_markaziy_kengash_v_version_images_building_id_media_id_fk" FOREIGN KEY ("version_images_building_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_markaziy_kengash_v" ADD CONSTRAINT "_markaziy_kengash_v_version_images_delegates_id_media_id_fk" FOREIGN KEY ("version_images_delegates_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_markaziy_kengash_v_locales" ADD CONSTRAINT "_markaziy_kengash_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_markaziy_kengash_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "natijalar_report_nums" ADD CONSTRAINT "natijalar_report_nums_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."natijalar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "natijalar_report_nums_locales" ADD CONSTRAINT "natijalar_report_nums_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."natijalar_report_nums"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "natijalar_years_items" ADD CONSTRAINT "natijalar_years_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."natijalar_years"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "natijalar_years_items_locales" ADD CONSTRAINT "natijalar_years_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."natijalar_years_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "natijalar_years" ADD CONSTRAINT "natijalar_years_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."natijalar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_natijalar_v_version_report_nums" ADD CONSTRAINT "_natijalar_v_version_report_nums_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_natijalar_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_natijalar_v_version_report_nums_locales" ADD CONSTRAINT "_natijalar_v_version_report_nums_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_natijalar_v_version_report_nums"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_natijalar_v_version_years_items" ADD CONSTRAINT "_natijalar_v_version_years_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_natijalar_v_version_years"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_natijalar_v_version_years_items_locales" ADD CONSTRAINT "_natijalar_v_version_years_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_natijalar_v_version_years_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_natijalar_v_version_years" ADD CONSTRAINT "_natijalar_v_version_years_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_natijalar_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "volontyorlik_sahifa_stats" ADD CONSTRAINT "volontyorlik_sahifa_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."volontyorlik_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "volontyorlik_sahifa_stats_locales" ADD CONSTRAINT "volontyorlik_sahifa_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."volontyorlik_sahifa_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "volontyorlik_sahifa_steps" ADD CONSTRAINT "volontyorlik_sahifa_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."volontyorlik_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "volontyorlik_sahifa_steps_locales" ADD CONSTRAINT "volontyorlik_sahifa_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."volontyorlik_sahifa_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "volontyorlik_sahifa_times" ADD CONSTRAINT "volontyorlik_sahifa_times_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."volontyorlik_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "volontyorlik_sahifa_times_locales" ADD CONSTRAINT "volontyorlik_sahifa_times_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."volontyorlik_sahifa_times"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "volontyorlik_sahifa_rights" ADD CONSTRAINT "volontyorlik_sahifa_rights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."volontyorlik_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "volontyorlik_sahifa_rights_locales" ADD CONSTRAINT "volontyorlik_sahifa_rights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."volontyorlik_sahifa_rights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "volontyorlik_sahifa_duties" ADD CONSTRAINT "volontyorlik_sahifa_duties_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."volontyorlik_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "volontyorlik_sahifa_duties_locales" ADD CONSTRAINT "volontyorlik_sahifa_duties_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."volontyorlik_sahifa_duties"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "volontyorlik_sahifa_quiz_a" ADD CONSTRAINT "volontyorlik_sahifa_quiz_a_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."volontyorlik_sahifa_quiz"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "volontyorlik_sahifa_quiz_a_locales" ADD CONSTRAINT "volontyorlik_sahifa_quiz_a_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."volontyorlik_sahifa_quiz_a"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "volontyorlik_sahifa_quiz" ADD CONSTRAINT "volontyorlik_sahifa_quiz_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."volontyorlik_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "volontyorlik_sahifa_quiz_locales" ADD CONSTRAINT "volontyorlik_sahifa_quiz_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."volontyorlik_sahifa_quiz"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "volontyorlik_sahifa_locales" ADD CONSTRAINT "volontyorlik_sahifa_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."volontyorlik_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "volontyorlik_sahifa_rels" ADD CONSTRAINT "volontyorlik_sahifa_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."volontyorlik_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "volontyorlik_sahifa_rels" ADD CONSTRAINT "volontyorlik_sahifa_rels_vol_directions_fk" FOREIGN KEY ("vol_directions_id") REFERENCES "public"."vol_directions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_volontyorlik_sahifa_v_version_stats" ADD CONSTRAINT "_volontyorlik_sahifa_v_version_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_volontyorlik_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_volontyorlik_sahifa_v_version_stats_locales" ADD CONSTRAINT "_volontyorlik_sahifa_v_version_stats_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_volontyorlik_sahifa_v_version_stats"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_volontyorlik_sahifa_v_version_steps" ADD CONSTRAINT "_volontyorlik_sahifa_v_version_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_volontyorlik_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_volontyorlik_sahifa_v_version_steps_locales" ADD CONSTRAINT "_volontyorlik_sahifa_v_version_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_volontyorlik_sahifa_v_version_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_volontyorlik_sahifa_v_version_times" ADD CONSTRAINT "_volontyorlik_sahifa_v_version_times_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_volontyorlik_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_volontyorlik_sahifa_v_version_times_locales" ADD CONSTRAINT "_volontyorlik_sahifa_v_version_times_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_volontyorlik_sahifa_v_version_times"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_volontyorlik_sahifa_v_version_rights" ADD CONSTRAINT "_volontyorlik_sahifa_v_version_rights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_volontyorlik_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_volontyorlik_sahifa_v_version_rights_locales" ADD CONSTRAINT "_volontyorlik_sahifa_v_version_rights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_volontyorlik_sahifa_v_version_rights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_volontyorlik_sahifa_v_version_duties" ADD CONSTRAINT "_volontyorlik_sahifa_v_version_duties_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_volontyorlik_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_volontyorlik_sahifa_v_version_duties_locales" ADD CONSTRAINT "_volontyorlik_sahifa_v_version_duties_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_volontyorlik_sahifa_v_version_duties"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_volontyorlik_sahifa_v_version_quiz_a" ADD CONSTRAINT "_volontyorlik_sahifa_v_version_quiz_a_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_volontyorlik_sahifa_v_version_quiz"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_volontyorlik_sahifa_v_version_quiz_a_locales" ADD CONSTRAINT "_volontyorlik_sahifa_v_version_quiz_a_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_volontyorlik_sahifa_v_version_quiz_a"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_volontyorlik_sahifa_v_version_quiz" ADD CONSTRAINT "_volontyorlik_sahifa_v_version_quiz_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_volontyorlik_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_volontyorlik_sahifa_v_version_quiz_locales" ADD CONSTRAINT "_volontyorlik_sahifa_v_version_quiz_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_volontyorlik_sahifa_v_version_quiz"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_volontyorlik_sahifa_v_locales" ADD CONSTRAINT "_volontyorlik_sahifa_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_volontyorlik_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_volontyorlik_sahifa_v_rels" ADD CONSTRAINT "_volontyorlik_sahifa_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_volontyorlik_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_volontyorlik_sahifa_v_rels" ADD CONSTRAINT "_volontyorlik_sahifa_v_rels_vol_directions_fk" FOREIGN KEY ("vol_directions_id") REFERENCES "public"."vol_directions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "aloqa_phones" ADD CONSTRAINT "aloqa_phones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."aloqa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "aloqa_emails" ADD CONSTRAINT "aloqa_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."aloqa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "aloqa_socials" ADD CONSTRAINT "aloqa_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."aloqa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "aloqa_law_terms" ADD CONSTRAINT "aloqa_law_terms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."aloqa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "aloqa_law_terms_locales" ADD CONSTRAINT "aloqa_law_terms_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."aloqa_law_terms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "aloqa_law_types" ADD CONSTRAINT "aloqa_law_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."aloqa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "aloqa_law_types_locales" ADD CONSTRAINT "aloqa_law_types_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."aloqa_law_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "aloqa_locales" ADD CONSTRAINT "aloqa_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."aloqa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_aloqa_v_version_phones" ADD CONSTRAINT "_aloqa_v_version_phones_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_aloqa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_aloqa_v_version_emails" ADD CONSTRAINT "_aloqa_v_version_emails_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_aloqa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_aloqa_v_version_socials" ADD CONSTRAINT "_aloqa_v_version_socials_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_aloqa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_aloqa_v_version_law_terms" ADD CONSTRAINT "_aloqa_v_version_law_terms_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_aloqa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_aloqa_v_version_law_terms_locales" ADD CONSTRAINT "_aloqa_v_version_law_terms_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_aloqa_v_version_law_terms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_aloqa_v_version_law_types" ADD CONSTRAINT "_aloqa_v_version_law_types_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_aloqa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_aloqa_v_version_law_types_locales" ADD CONSTRAINT "_aloqa_v_version_law_types_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_aloqa_v_version_law_types"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_aloqa_v_locales" ADD CONSTRAINT "_aloqa_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_aloqa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "azolik_sahifa_conditions" ADD CONSTRAINT "azolik_sahifa_conditions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."azolik_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "azolik_sahifa_conditions_locales" ADD CONSTRAINT "azolik_sahifa_conditions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."azolik_sahifa_conditions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "azolik_sahifa_steps" ADD CONSTRAINT "azolik_sahifa_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."azolik_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "azolik_sahifa_steps_locales" ADD CONSTRAINT "azolik_sahifa_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."azolik_sahifa_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "azolik_sahifa_after" ADD CONSTRAINT "azolik_sahifa_after_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."azolik_sahifa"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "azolik_sahifa_after_locales" ADD CONSTRAINT "azolik_sahifa_after_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."azolik_sahifa_after"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_azolik_sahifa_v_version_conditions" ADD CONSTRAINT "_azolik_sahifa_v_version_conditions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_azolik_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_azolik_sahifa_v_version_conditions_locales" ADD CONSTRAINT "_azolik_sahifa_v_version_conditions_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_azolik_sahifa_v_version_conditions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_azolik_sahifa_v_version_steps" ADD CONSTRAINT "_azolik_sahifa_v_version_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_azolik_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_azolik_sahifa_v_version_steps_locales" ADD CONSTRAINT "_azolik_sahifa_v_version_steps_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_azolik_sahifa_v_version_steps"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_azolik_sahifa_v_version_after" ADD CONSTRAINT "_azolik_sahifa_v_version_after_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_azolik_sahifa_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_azolik_sahifa_v_version_after_locales" ADD CONSTRAINT "_azolik_sahifa_v_version_after_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_azolik_sahifa_v_version_after"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "miqdorlar_locales" ADD CONSTRAINT "miqdorlar_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."miqdorlar"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_miqdorlar_v_locales" ADD CONSTRAINT "_miqdorlar_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_miqdorlar_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "otts_leader_achievements_order_idx" ON "otts_leader_achievements" USING btree ("_order");
  CREATE INDEX "otts_leader_achievements_parent_id_idx" ON "otts_leader_achievements" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "otts_leader_achievements_locales_locale_parent_id_unique" ON "otts_leader_achievements_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "otts_leader_achievements_locales_parent_id_idx" ON "otts_leader_achievements_locales" USING btree ("_parent_id");
  CREATE INDEX "otts__order_idx" ON "otts" USING btree ("_order");
  CREATE INDEX "otts_leader_leader_img_idx" ON "otts" USING btree ("leader_img_id");
  CREATE INDEX "otts_updated_at_idx" ON "otts" USING btree ("updated_at");
  CREATE INDEX "otts_created_at_idx" ON "otts" USING btree ("created_at");
  CREATE UNIQUE INDEX "otts_locales_locale_parent_id_unique" ON "otts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "otts_locales_parent_id_idx" ON "otts_locales" USING btree ("_parent_id");
  CREATE INDEX "partners_dirs_order_idx" ON "partners_dirs" USING btree ("order");
  CREATE INDEX "partners_dirs_parent_idx" ON "partners_dirs" USING btree ("parent_id");
  CREATE INDEX "partners__order_idx" ON "partners" USING btree ("_order");
  CREATE INDEX "partners_logo_idx" ON "partners" USING btree ("logo_id");
  CREATE UNIQUE INDEX "partners_slug_idx" ON "partners" USING btree ("slug");
  CREATE INDEX "partners_updated_at_idx" ON "partners" USING btree ("updated_at");
  CREATE INDEX "partners_created_at_idx" ON "partners" USING btree ("created_at");
  CREATE UNIQUE INDEX "partners_locales_locale_parent_id_unique" ON "partners_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "partners_locales_parent_id_idx" ON "partners_locales" USING btree ("_parent_id");
  CREATE INDEX "departments_tasks_order_idx" ON "departments_tasks" USING btree ("_order");
  CREATE INDEX "departments_tasks_parent_id_idx" ON "departments_tasks" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "departments_tasks_locales_locale_parent_id_unique" ON "departments_tasks_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "departments_tasks_locales_parent_id_idx" ON "departments_tasks_locales" USING btree ("_parent_id");
  CREATE INDEX "departments__order_idx" ON "departments" USING btree ("_order");
  CREATE UNIQUE INDEX "departments_slug_idx" ON "departments" USING btree ("slug");
  CREATE INDEX "departments_updated_at_idx" ON "departments" USING btree ("updated_at");
  CREATE INDEX "departments_created_at_idx" ON "departments" USING btree ("created_at");
  CREATE UNIQUE INDEX "departments_locales_locale_parent_id_unique" ON "departments_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "departments_locales_parent_id_idx" ON "departments_locales" USING btree ("_parent_id");
  CREATE INDEX "staff_duties_order_idx" ON "staff_duties" USING btree ("_order");
  CREATE INDEX "staff_duties_parent_id_idx" ON "staff_duties" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "staff_duties_locales_locale_parent_id_unique" ON "staff_duties_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "staff_duties_locales_parent_id_idx" ON "staff_duties_locales" USING btree ("_parent_id");
  CREATE INDEX "staff_socials_order_idx" ON "staff_socials" USING btree ("_order");
  CREATE INDEX "staff_socials_parent_id_idx" ON "staff_socials" USING btree ("_parent_id");
  CREATE INDEX "staff__order_idx" ON "staff" USING btree ("_order");
  CREATE INDEX "staff_dept_idx" ON "staff" USING btree ("dept_id");
  CREATE INDEX "staff_img_idx" ON "staff" USING btree ("img_id");
  CREATE INDEX "staff_updated_at_idx" ON "staff" USING btree ("updated_at");
  CREATE INDEX "staff_created_at_idx" ON "staff" USING btree ("created_at");
  CREATE UNIQUE INDEX "staff_locales_locale_parent_id_unique" ON "staff_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "staff_locales_parent_id_idx" ON "staff_locales" USING btree ("_parent_id");
  CREATE INDEX "directions__order_idx" ON "directions" USING btree ("_order");
  CREATE UNIQUE INDEX "directions_slug_idx" ON "directions" USING btree ("slug");
  CREATE INDEX "directions_updated_at_idx" ON "directions" USING btree ("updated_at");
  CREATE INDEX "directions_created_at_idx" ON "directions" USING btree ("created_at");
  CREATE UNIQUE INDEX "directions_locales_locale_parent_id_unique" ON "directions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "directions_locales_parent_id_idx" ON "directions_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_partners_order_idx" ON "projects_partners" USING btree ("_order");
  CREATE INDEX "projects_partners_parent_id_idx" ON "projects_partners" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_partners_locales_locale_parent_id_unique" ON "projects_partners_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_partners_locales_parent_id_idx" ON "projects_partners_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_results_order_idx" ON "projects_results" USING btree ("_order");
  CREATE INDEX "projects_results_parent_id_idx" ON "projects_results" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_results_locales_locale_parent_id_unique" ON "projects_results_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_results_locales_parent_id_idx" ON "projects_results_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_milestones_order_idx" ON "projects_milestones" USING btree ("_order");
  CREATE INDEX "projects_milestones_parent_id_idx" ON "projects_milestones" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_milestones_locales_locale_parent_id_unique" ON "projects_milestones_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_milestones_locales_parent_id_idx" ON "projects_milestones_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_posts_order_idx" ON "projects_posts" USING btree ("_order");
  CREATE INDEX "projects_posts_parent_id_idx" ON "projects_posts" USING btree ("_parent_id");
  CREATE INDEX "projects__order_idx" ON "projects" USING btree ("_order");
  CREATE INDEX "projects_dir_idx" ON "projects" USING btree ("dir_id");
  CREATE INDEX "projects_cover_idx" ON "projects" USING btree ("cover_id");
  CREATE UNIQUE INDEX "projects_slug_idx" ON "projects" USING btree ("slug");
  CREATE INDEX "projects_updated_at_idx" ON "projects" USING btree ("updated_at");
  CREATE INDEX "projects_created_at_idx" ON "projects" USING btree ("created_at");
  CREATE INDEX "projects__status_idx" ON "projects" USING btree ("_status");
  CREATE UNIQUE INDEX "projects_locales_locale_parent_id_unique" ON "projects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_locales_parent_id_idx" ON "projects_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_rels_order_idx" ON "projects_rels" USING btree ("order");
  CREATE INDEX "projects_rels_parent_idx" ON "projects_rels" USING btree ("parent_id");
  CREATE INDEX "projects_rels_path_idx" ON "projects_rels" USING btree ("path");
  CREATE INDEX "projects_rels_media_id_idx" ON "projects_rels" USING btree ("media_id");
  CREATE INDEX "_projects_v_version_partners_order_idx" ON "_projects_v_version_partners" USING btree ("_order");
  CREATE INDEX "_projects_v_version_partners_parent_id_idx" ON "_projects_v_version_partners" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_version_partners_locales_locale_parent_id_unique" ON "_projects_v_version_partners_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_version_partners_locales_parent_id_idx" ON "_projects_v_version_partners_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_results_order_idx" ON "_projects_v_version_results" USING btree ("_order");
  CREATE INDEX "_projects_v_version_results_parent_id_idx" ON "_projects_v_version_results" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_version_results_locales_locale_parent_id_unique" ON "_projects_v_version_results_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_version_results_locales_parent_id_idx" ON "_projects_v_version_results_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_milestones_order_idx" ON "_projects_v_version_milestones" USING btree ("_order");
  CREATE INDEX "_projects_v_version_milestones_parent_id_idx" ON "_projects_v_version_milestones" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_version_milestones_locales_locale_parent_id_uniq" ON "_projects_v_version_milestones_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_version_milestones_locales_parent_id_idx" ON "_projects_v_version_milestones_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_posts_order_idx" ON "_projects_v_version_posts" USING btree ("_order");
  CREATE INDEX "_projects_v_version_posts_parent_id_idx" ON "_projects_v_version_posts" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_parent_idx" ON "_projects_v" USING btree ("parent_id");
  CREATE INDEX "_projects_v_version_version__order_idx" ON "_projects_v" USING btree ("version__order");
  CREATE INDEX "_projects_v_version_version_dir_idx" ON "_projects_v" USING btree ("version_dir_id");
  CREATE INDEX "_projects_v_version_version_cover_idx" ON "_projects_v" USING btree ("version_cover_id");
  CREATE INDEX "_projects_v_version_version_slug_idx" ON "_projects_v" USING btree ("version_slug");
  CREATE INDEX "_projects_v_version_version_updated_at_idx" ON "_projects_v" USING btree ("version_updated_at");
  CREATE INDEX "_projects_v_version_version_created_at_idx" ON "_projects_v" USING btree ("version_created_at");
  CREATE INDEX "_projects_v_version_version__status_idx" ON "_projects_v" USING btree ("version__status");
  CREATE INDEX "_projects_v_created_at_idx" ON "_projects_v" USING btree ("created_at");
  CREATE INDEX "_projects_v_updated_at_idx" ON "_projects_v" USING btree ("updated_at");
  CREATE INDEX "_projects_v_snapshot_idx" ON "_projects_v" USING btree ("snapshot");
  CREATE INDEX "_projects_v_published_locale_idx" ON "_projects_v" USING btree ("published_locale");
  CREATE INDEX "_projects_v_latest_idx" ON "_projects_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_projects_v_locales_locale_parent_id_unique" ON "_projects_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_locales_parent_id_idx" ON "_projects_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_rels_order_idx" ON "_projects_v_rels" USING btree ("order");
  CREATE INDEX "_projects_v_rels_parent_idx" ON "_projects_v_rels" USING btree ("parent_id");
  CREATE INDEX "_projects_v_rels_path_idx" ON "_projects_v_rels" USING btree ("path");
  CREATE INDEX "_projects_v_rels_media_id_idx" ON "_projects_v_rels" USING btree ("media_id");
  CREATE INDEX "events_dir_idx" ON "events" USING btree ("dir_id");
  CREATE INDEX "events_img_idx" ON "events" USING btree ("img_id");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE UNIQUE INDEX "events_locales_locale_parent_id_unique" ON "events_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "events_locales_parent_id_idx" ON "events_locales" USING btree ("_parent_id");
  CREATE INDEX "grants__order_idx" ON "grants" USING btree ("_order");
  CREATE INDEX "grants_img_idx" ON "grants" USING btree ("img_id");
  CREATE UNIQUE INDEX "grants_slug_idx" ON "grants" USING btree ("slug");
  CREATE INDEX "grants_updated_at_idx" ON "grants" USING btree ("updated_at");
  CREATE INDEX "grants_created_at_idx" ON "grants" USING btree ("created_at");
  CREATE UNIQUE INDEX "grants_locales_locale_parent_id_unique" ON "grants_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "grants_locales_parent_id_idx" ON "grants_locales" USING btree ("_parent_id");
  CREATE INDEX "stipends_rates_order_idx" ON "stipends_rates" USING btree ("_order");
  CREATE INDEX "stipends_rates_parent_id_idx" ON "stipends_rates" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "stipends_rates_locales_locale_parent_id_unique" ON "stipends_rates_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "stipends_rates_locales_parent_id_idx" ON "stipends_rates_locales" USING btree ("_parent_id");
  CREATE INDEX "stipends__order_idx" ON "stipends" USING btree ("_order");
  CREATE UNIQUE INDEX "stipends_slug_idx" ON "stipends" USING btree ("slug");
  CREATE INDEX "stipends_updated_at_idx" ON "stipends" USING btree ("updated_at");
  CREATE INDEX "stipends_created_at_idx" ON "stipends" USING btree ("created_at");
  CREATE UNIQUE INDEX "stipends_locales_locale_parent_id_unique" ON "stipends_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "stipends_locales_parent_id_idx" ON "stipends_locales" USING btree ("_parent_id");
  CREATE INDEX "contests__order_idx" ON "contests" USING btree ("_order");
  CREATE INDEX "contests_img_idx" ON "contests" USING btree ("img_id");
  CREATE UNIQUE INDEX "contests_slug_idx" ON "contests" USING btree ("slug");
  CREATE INDEX "contests_updated_at_idx" ON "contests" USING btree ("updated_at");
  CREATE INDEX "contests_created_at_idx" ON "contests" USING btree ("created_at");
  CREATE UNIQUE INDEX "contests_locales_locale_parent_id_unique" ON "contests_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "contests_locales_parent_id_idx" ON "contests_locales" USING btree ("_parent_id");
  CREATE INDEX "awards_timeline_order_idx" ON "awards_timeline" USING btree ("_order");
  CREATE INDEX "awards_timeline_parent_id_idx" ON "awards_timeline" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "awards_timeline_locales_locale_parent_id_unique" ON "awards_timeline_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "awards_timeline_locales_parent_id_idx" ON "awards_timeline_locales" USING btree ("_parent_id");
  CREATE INDEX "awards__order_idx" ON "awards" USING btree ("_order");
  CREATE INDEX "awards_img_idx" ON "awards" USING btree ("img_id");
  CREATE UNIQUE INDEX "awards_slug_idx" ON "awards" USING btree ("slug");
  CREATE INDEX "awards_updated_at_idx" ON "awards" USING btree ("updated_at");
  CREATE INDEX "awards_created_at_idx" ON "awards" USING btree ("created_at");
  CREATE UNIQUE INDEX "awards_locales_locale_parent_id_unique" ON "awards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "awards_locales_parent_id_idx" ON "awards_locales" USING btree ("_parent_id");
  CREATE INDEX "benefits__order_idx" ON "benefits" USING btree ("_order");
  CREATE UNIQUE INDEX "benefits_slug_idx" ON "benefits" USING btree ("slug");
  CREATE INDEX "benefits_updated_at_idx" ON "benefits" USING btree ("updated_at");
  CREATE INDEX "benefits_created_at_idx" ON "benefits" USING btree ("created_at");
  CREATE UNIQUE INDEX "benefits_locales_locale_parent_id_unique" ON "benefits_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "benefits_locales_parent_id_idx" ON "benefits_locales" USING btree ("_parent_id");
  CREATE INDEX "vol_directions_tasks_order_idx" ON "vol_directions_tasks" USING btree ("_order");
  CREATE INDEX "vol_directions_tasks_parent_id_idx" ON "vol_directions_tasks" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "vol_directions_tasks_locales_locale_parent_id_unique" ON "vol_directions_tasks_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "vol_directions_tasks_locales_parent_id_idx" ON "vol_directions_tasks_locales" USING btree ("_parent_id");
  CREATE INDEX "vol_directions__order_idx" ON "vol_directions" USING btree ("_order");
  CREATE UNIQUE INDEX "vol_directions_slug_idx" ON "vol_directions" USING btree ("slug");
  CREATE INDEX "vol_directions_updated_at_idx" ON "vol_directions" USING btree ("updated_at");
  CREATE INDEX "vol_directions_created_at_idx" ON "vol_directions" USING btree ("created_at");
  CREATE UNIQUE INDEX "vol_directions_locales_locale_parent_id_unique" ON "vol_directions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "vol_directions_locales_parent_id_idx" ON "vol_directions_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "news_slug_idx" ON "news" USING btree ("slug");
  CREATE INDEX "news_published_at_idx" ON "news" USING btree ("published_at");
  CREATE INDEX "news_image_idx" ON "news" USING btree ("image_id");
  CREATE INDEX "news_author_idx" ON "news" USING btree ("author_id");
  CREATE INDEX "news_kind_idx" ON "news" USING btree ("kind");
  CREATE INDEX "news_event_date_idx" ON "news" USING btree ("event_date");
  CREATE UNIQUE INDEX "news_tg_id_idx" ON "news" USING btree ("tg_id");
  CREATE INDEX "news_updated_at_idx" ON "news" USING btree ("updated_at");
  CREATE INDEX "news_created_at_idx" ON "news" USING btree ("created_at");
  CREATE INDEX "news__status_idx" ON "news" USING btree ("_status");
  CREATE UNIQUE INDEX "news_locales_locale_parent_id_unique" ON "news_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "news_locales_parent_id_idx" ON "news_locales" USING btree ("_parent_id");
  CREATE INDEX "news_texts_order_parent" ON "news_texts" USING btree ("order","parent_id");
  CREATE INDEX "news_rels_order_idx" ON "news_rels" USING btree ("order");
  CREATE INDEX "news_rels_parent_idx" ON "news_rels" USING btree ("parent_id");
  CREATE INDEX "news_rels_path_idx" ON "news_rels" USING btree ("path");
  CREATE INDEX "news_rels_media_id_idx" ON "news_rels" USING btree ("media_id");
  CREATE INDEX "_news_v_parent_idx" ON "_news_v" USING btree ("parent_id");
  CREATE INDEX "_news_v_version_version_slug_idx" ON "_news_v" USING btree ("version_slug");
  CREATE INDEX "_news_v_version_version_published_at_idx" ON "_news_v" USING btree ("version_published_at");
  CREATE INDEX "_news_v_version_version_image_idx" ON "_news_v" USING btree ("version_image_id");
  CREATE INDEX "_news_v_version_version_author_idx" ON "_news_v" USING btree ("version_author_id");
  CREATE INDEX "_news_v_version_version_kind_idx" ON "_news_v" USING btree ("version_kind");
  CREATE INDEX "_news_v_version_version_event_date_idx" ON "_news_v" USING btree ("version_event_date");
  CREATE INDEX "_news_v_version_version_tg_id_idx" ON "_news_v" USING btree ("version_tg_id");
  CREATE INDEX "_news_v_version_version_updated_at_idx" ON "_news_v" USING btree ("version_updated_at");
  CREATE INDEX "_news_v_version_version_created_at_idx" ON "_news_v" USING btree ("version_created_at");
  CREATE INDEX "_news_v_version_version__status_idx" ON "_news_v" USING btree ("version__status");
  CREATE INDEX "_news_v_created_at_idx" ON "_news_v" USING btree ("created_at");
  CREATE INDEX "_news_v_updated_at_idx" ON "_news_v" USING btree ("updated_at");
  CREATE INDEX "_news_v_snapshot_idx" ON "_news_v" USING btree ("snapshot");
  CREATE INDEX "_news_v_published_locale_idx" ON "_news_v" USING btree ("published_locale");
  CREATE INDEX "_news_v_latest_idx" ON "_news_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_news_v_locales_locale_parent_id_unique" ON "_news_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_news_v_locales_parent_id_idx" ON "_news_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_news_v_texts_order_parent" ON "_news_v_texts" USING btree ("order","parent_id");
  CREATE INDEX "_news_v_rels_order_idx" ON "_news_v_rels" USING btree ("order");
  CREATE INDEX "_news_v_rels_parent_idx" ON "_news_v_rels" USING btree ("parent_id");
  CREATE INDEX "_news_v_rels_path_idx" ON "_news_v_rels" USING btree ("path");
  CREATE INDEX "_news_v_rels_media_id_idx" ON "_news_v_rels" USING btree ("media_id");
  CREATE INDEX "authors_photo_idx" ON "authors" USING btree ("photo_id");
  CREATE INDEX "authors_updated_at_idx" ON "authors" USING btree ("updated_at");
  CREATE INDEX "authors_created_at_idx" ON "authors" USING btree ("created_at");
  CREATE UNIQUE INDEX "authors_locales_locale_parent_id_unique" ON "authors_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "authors_locales_parent_id_idx" ON "authors_locales" USING btree ("_parent_id");
  CREATE INDEX "news_ratings_news_idx" ON "news_ratings" USING btree ("news_id");
  CREATE INDEX "news_ratings_voter_idx" ON "news_ratings" USING btree ("voter");
  CREATE INDEX "news_ratings_updated_at_idx" ON "news_ratings" USING btree ("updated_at");
  CREATE INDEX "news_ratings_created_at_idx" ON "news_ratings" USING btree ("created_at");
  CREATE INDEX "news_reactions_news_idx" ON "news_reactions" USING btree ("news_id");
  CREATE INDEX "news_reactions_voter_idx" ON "news_reactions" USING btree ("voter");
  CREATE INDEX "news_reactions_updated_at_idx" ON "news_reactions" USING btree ("updated_at");
  CREATE INDEX "news_reactions_created_at_idx" ON "news_reactions" USING btree ("created_at");
  CREATE INDEX "act_groups__order_idx" ON "act_groups" USING btree ("_order");
  CREATE UNIQUE INDEX "act_groups_slug_idx" ON "act_groups" USING btree ("slug");
  CREATE INDEX "act_groups_updated_at_idx" ON "act_groups" USING btree ("updated_at");
  CREATE INDEX "act_groups_created_at_idx" ON "act_groups" USING btree ("created_at");
  CREATE UNIQUE INDEX "act_groups_locales_locale_parent_id_unique" ON "act_groups_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "act_groups_locales_parent_id_idx" ON "act_groups_locales" USING btree ("_parent_id");
  CREATE INDEX "acts_for_order_idx" ON "acts_for" USING btree ("order");
  CREATE INDEX "acts_for_parent_idx" ON "acts_for" USING btree ("parent_id");
  CREATE INDEX "acts__order_idx" ON "acts" USING btree ("_order");
  CREATE INDEX "acts_grp_idx" ON "acts" USING btree ("grp_id");
  CREATE INDEX "acts_updated_at_idx" ON "acts" USING btree ("updated_at");
  CREATE INDEX "acts_created_at_idx" ON "acts" USING btree ("created_at");
  CREATE UNIQUE INDEX "acts_locales_locale_parent_id_unique" ON "acts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "acts_locales_parent_id_idx" ON "acts_locales" USING btree ("_parent_id");
  CREATE INDEX "kengash_docs_file_idx" ON "kengash_docs" USING btree ("file_id");
  CREATE INDEX "kengash_docs_updated_at_idx" ON "kengash_docs" USING btree ("updated_at");
  CREATE INDEX "kengash_docs_created_at_idx" ON "kengash_docs" USING btree ("created_at");
  CREATE UNIQUE INDEX "kengash_docs_locales_locale_parent_id_unique" ON "kengash_docs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "kengash_docs_locales_parent_id_idx" ON "kengash_docs_locales" USING btree ("_parent_id");
  CREATE INDEX "templates__order_idx" ON "templates" USING btree ("_order");
  CREATE INDEX "templates_file_idx" ON "templates" USING btree ("file_id");
  CREATE INDEX "templates_updated_at_idx" ON "templates" USING btree ("updated_at");
  CREATE INDEX "templates_created_at_idx" ON "templates" USING btree ("created_at");
  CREATE UNIQUE INDEX "templates_locales_locale_parent_id_unique" ON "templates_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "templates_locales_parent_id_idx" ON "templates_locales" USING btree ("_parent_id");
  CREATE INDEX "press_body_order_idx" ON "press_body" USING btree ("_order");
  CREATE INDEX "press_body_parent_id_idx" ON "press_body" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "press_body_locales_locale_parent_id_unique" ON "press_body_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "press_body_locales_parent_id_idx" ON "press_body_locales" USING btree ("_parent_id");
  CREATE INDEX "press_facts_order_idx" ON "press_facts" USING btree ("_order");
  CREATE INDEX "press_facts_parent_id_idx" ON "press_facts" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "press_facts_locales_locale_parent_id_unique" ON "press_facts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "press_facts_locales_parent_id_idx" ON "press_facts_locales" USING btree ("_parent_id");
  CREATE INDEX "press_album_idx" ON "press" USING btree ("album_id");
  CREATE INDEX "press_video_idx" ON "press" USING btree ("video_id");
  CREATE UNIQUE INDEX "press_slug_idx" ON "press" USING btree ("slug");
  CREATE INDEX "press_updated_at_idx" ON "press" USING btree ("updated_at");
  CREATE INDEX "press_created_at_idx" ON "press" USING btree ("created_at");
  CREATE INDEX "press__status_idx" ON "press" USING btree ("_status");
  CREATE UNIQUE INDEX "press_locales_locale_parent_id_unique" ON "press_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "press_locales_parent_id_idx" ON "press_locales" USING btree ("_parent_id");
  CREATE INDEX "_press_v_version_body_order_idx" ON "_press_v_version_body" USING btree ("_order");
  CREATE INDEX "_press_v_version_body_parent_id_idx" ON "_press_v_version_body" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_press_v_version_body_locales_locale_parent_id_unique" ON "_press_v_version_body_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_press_v_version_body_locales_parent_id_idx" ON "_press_v_version_body_locales" USING btree ("_parent_id");
  CREATE INDEX "_press_v_version_facts_order_idx" ON "_press_v_version_facts" USING btree ("_order");
  CREATE INDEX "_press_v_version_facts_parent_id_idx" ON "_press_v_version_facts" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_press_v_version_facts_locales_locale_parent_id_unique" ON "_press_v_version_facts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_press_v_version_facts_locales_parent_id_idx" ON "_press_v_version_facts_locales" USING btree ("_parent_id");
  CREATE INDEX "_press_v_parent_idx" ON "_press_v" USING btree ("parent_id");
  CREATE INDEX "_press_v_version_version_album_idx" ON "_press_v" USING btree ("version_album_id");
  CREATE INDEX "_press_v_version_version_video_idx" ON "_press_v" USING btree ("version_video_id");
  CREATE INDEX "_press_v_version_version_slug_idx" ON "_press_v" USING btree ("version_slug");
  CREATE INDEX "_press_v_version_version_updated_at_idx" ON "_press_v" USING btree ("version_updated_at");
  CREATE INDEX "_press_v_version_version_created_at_idx" ON "_press_v" USING btree ("version_created_at");
  CREATE INDEX "_press_v_version_version__status_idx" ON "_press_v" USING btree ("version__status");
  CREATE INDEX "_press_v_created_at_idx" ON "_press_v" USING btree ("created_at");
  CREATE INDEX "_press_v_updated_at_idx" ON "_press_v" USING btree ("updated_at");
  CREATE INDEX "_press_v_snapshot_idx" ON "_press_v" USING btree ("snapshot");
  CREATE INDEX "_press_v_published_locale_idx" ON "_press_v" USING btree ("published_locale");
  CREATE INDEX "_press_v_latest_idx" ON "_press_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_press_v_locales_locale_parent_id_unique" ON "_press_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_press_v_locales_parent_id_idx" ON "_press_v_locales" USING btree ("_parent_id");
  CREATE INDEX "albums_updated_at_idx" ON "albums" USING btree ("updated_at");
  CREATE INDEX "albums_created_at_idx" ON "albums" USING btree ("created_at");
  CREATE UNIQUE INDEX "albums_locales_locale_parent_id_unique" ON "albums_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "albums_locales_parent_id_idx" ON "albums_locales" USING btree ("_parent_id");
  CREATE INDEX "albums_rels_order_idx" ON "albums_rels" USING btree ("order");
  CREATE INDEX "albums_rels_parent_idx" ON "albums_rels" USING btree ("parent_id");
  CREATE INDEX "albums_rels_path_idx" ON "albums_rels" USING btree ("path");
  CREATE INDEX "albums_rels_media_id_idx" ON "albums_rels" USING btree ("media_id");
  CREATE INDEX "videos_updated_at_idx" ON "videos" USING btree ("updated_at");
  CREATE INDEX "videos_created_at_idx" ON "videos" USING btree ("created_at");
  CREATE UNIQUE INDEX "videos_locales_locale_parent_id_unique" ON "videos_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "videos_locales_parent_id_idx" ON "videos_locales" USING btree ("_parent_id");
  CREATE INDEX "oav_updated_at_idx" ON "oav" USING btree ("updated_at");
  CREATE INDEX "oav_created_at_idx" ON "oav" USING btree ("created_at");
  CREATE UNIQUE INDEX "oav_locales_locale_parent_id_unique" ON "oav_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "oav_locales_parent_id_idx" ON "oav_locales" USING btree ("_parent_id");
  CREATE INDEX "faqs_a_order_idx" ON "faqs_a" USING btree ("_order");
  CREATE INDEX "faqs_a_parent_id_idx" ON "faqs_a" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "faqs_a_locales_locale_parent_id_unique" ON "faqs_a_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "faqs_a_locales_parent_id_idx" ON "faqs_a_locales" USING btree ("_parent_id");
  CREATE INDEX "faqs_li_order_idx" ON "faqs_li" USING btree ("_order");
  CREATE INDEX "faqs_li_parent_id_idx" ON "faqs_li" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "faqs_li_locales_locale_parent_id_unique" ON "faqs_li_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "faqs_li_locales_parent_id_idx" ON "faqs_li_locales" USING btree ("_parent_id");
  CREATE INDEX "faqs__order_idx" ON "faqs" USING btree ("_order");
  CREATE UNIQUE INDEX "faqs_slug_idx" ON "faqs" USING btree ("slug");
  CREATE INDEX "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
  CREATE INDEX "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
  CREATE UNIQUE INDEX "faqs_locales_locale_parent_id_unique" ON "faqs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "faqs_locales_parent_id_idx" ON "faqs_locales" USING btree ("_parent_id");
  CREATE INDEX "appeals_file_idx" ON "appeals" USING btree ("file_id");
  CREATE INDEX "appeals_updated_at_idx" ON "appeals" USING btree ("updated_at");
  CREATE INDEX "appeals_created_at_idx" ON "appeals" USING btree ("created_at");
  CREATE INDEX "appeal_files_updated_at_idx" ON "appeal_files" USING btree ("updated_at");
  CREATE INDEX "appeal_files_created_at_idx" ON "appeal_files" USING btree ("created_at");
  CREATE UNIQUE INDEX "appeal_files_filename_idx" ON "appeal_files" USING btree ("filename");
  CREATE INDEX "memberships_updated_at_idx" ON "memberships" USING btree ("updated_at");
  CREATE INDEX "memberships_created_at_idx" ON "memberships" USING btree ("created_at");
  CREATE INDEX "volunteers_updated_at_idx" ON "volunteers" USING btree ("updated_at");
  CREATE INDEX "volunteers_created_at_idx" ON "volunteers" USING btree ("created_at");
  CREATE INDEX "text_errors_updated_at_idx" ON "text_errors" USING btree ("updated_at");
  CREATE INDEX "text_errors_created_at_idx" ON "text_errors" USING btree ("created_at");
  CREATE INDEX "media_folder_idx" ON "media" USING btree ("folder_id");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumb_sizes_thumb_filename_idx" ON "media" USING btree ("sizes_thumb_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "media_locales_parent_id_idx" ON "media_locales" USING btree ("_parent_id");
  CREATE INDEX "files_updated_at_idx" ON "files" USING btree ("updated_at");
  CREATE INDEX "files_created_at_idx" ON "files" USING btree ("created_at");
  CREATE UNIQUE INDEX "files_filename_idx" ON "files" USING btree ("filename");
  CREATE UNIQUE INDEX "files_locales_locale_parent_id_unique" ON "files_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "files_locales_parent_id_idx" ON "files_locales" USING btree ("_parent_id");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_folders_folder_type_order_idx" ON "payload_folders_folder_type" USING btree ("order");
  CREATE INDEX "payload_folders_folder_type_parent_idx" ON "payload_folders_folder_type" USING btree ("parent_id");
  CREATE INDEX "payload_folders_name_idx" ON "payload_folders" USING btree ("name");
  CREATE INDEX "payload_folders_folder_idx" ON "payload_folders" USING btree ("folder_id");
  CREATE INDEX "payload_folders_updated_at_idx" ON "payload_folders" USING btree ("updated_at");
  CREATE INDEX "payload_folders_created_at_idx" ON "payload_folders" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_otts_id_idx" ON "payload_locked_documents_rels" USING btree ("otts_id");
  CREATE INDEX "payload_locked_documents_rels_partners_id_idx" ON "payload_locked_documents_rels" USING btree ("partners_id");
  CREATE INDEX "payload_locked_documents_rels_departments_id_idx" ON "payload_locked_documents_rels" USING btree ("departments_id");
  CREATE INDEX "payload_locked_documents_rels_staff_id_idx" ON "payload_locked_documents_rels" USING btree ("staff_id");
  CREATE INDEX "payload_locked_documents_rels_directions_id_idx" ON "payload_locked_documents_rels" USING btree ("directions_id");
  CREATE INDEX "payload_locked_documents_rels_projects_id_idx" ON "payload_locked_documents_rels" USING btree ("projects_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_grants_id_idx" ON "payload_locked_documents_rels" USING btree ("grants_id");
  CREATE INDEX "payload_locked_documents_rels_stipends_id_idx" ON "payload_locked_documents_rels" USING btree ("stipends_id");
  CREATE INDEX "payload_locked_documents_rels_contests_id_idx" ON "payload_locked_documents_rels" USING btree ("contests_id");
  CREATE INDEX "payload_locked_documents_rels_awards_id_idx" ON "payload_locked_documents_rels" USING btree ("awards_id");
  CREATE INDEX "payload_locked_documents_rels_benefits_id_idx" ON "payload_locked_documents_rels" USING btree ("benefits_id");
  CREATE INDEX "payload_locked_documents_rels_vol_directions_id_idx" ON "payload_locked_documents_rels" USING btree ("vol_directions_id");
  CREATE INDEX "payload_locked_documents_rels_news_id_idx" ON "payload_locked_documents_rels" USING btree ("news_id");
  CREATE INDEX "payload_locked_documents_rels_authors_id_idx" ON "payload_locked_documents_rels" USING btree ("authors_id");
  CREATE INDEX "payload_locked_documents_rels_news_ratings_id_idx" ON "payload_locked_documents_rels" USING btree ("news_ratings_id");
  CREATE INDEX "payload_locked_documents_rels_news_reactions_id_idx" ON "payload_locked_documents_rels" USING btree ("news_reactions_id");
  CREATE INDEX "payload_locked_documents_rels_act_groups_id_idx" ON "payload_locked_documents_rels" USING btree ("act_groups_id");
  CREATE INDEX "payload_locked_documents_rels_acts_id_idx" ON "payload_locked_documents_rels" USING btree ("acts_id");
  CREATE INDEX "payload_locked_documents_rels_kengash_docs_id_idx" ON "payload_locked_documents_rels" USING btree ("kengash_docs_id");
  CREATE INDEX "payload_locked_documents_rels_templates_id_idx" ON "payload_locked_documents_rels" USING btree ("templates_id");
  CREATE INDEX "payload_locked_documents_rels_press_id_idx" ON "payload_locked_documents_rels" USING btree ("press_id");
  CREATE INDEX "payload_locked_documents_rels_albums_id_idx" ON "payload_locked_documents_rels" USING btree ("albums_id");
  CREATE INDEX "payload_locked_documents_rels_videos_id_idx" ON "payload_locked_documents_rels" USING btree ("videos_id");
  CREATE INDEX "payload_locked_documents_rels_oav_id_idx" ON "payload_locked_documents_rels" USING btree ("oav_id");
  CREATE INDEX "payload_locked_documents_rels_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("faqs_id");
  CREATE INDEX "payload_locked_documents_rels_appeals_id_idx" ON "payload_locked_documents_rels" USING btree ("appeals_id");
  CREATE INDEX "payload_locked_documents_rels_appeal_files_id_idx" ON "payload_locked_documents_rels" USING btree ("appeal_files_id");
  CREATE INDEX "payload_locked_documents_rels_memberships_id_idx" ON "payload_locked_documents_rels" USING btree ("memberships_id");
  CREATE INDEX "payload_locked_documents_rels_volunteers_id_idx" ON "payload_locked_documents_rels" USING btree ("volunteers_id");
  CREATE INDEX "payload_locked_documents_rels_text_errors_id_idx" ON "payload_locked_documents_rels" USING btree ("text_errors_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_files_id_idx" ON "payload_locked_documents_rels" USING btree ("files_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_payload_folders_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_folders_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "bosh_sahifa_benefits_roles_items_order_idx" ON "bosh_sahifa_benefits_roles_items" USING btree ("_order");
  CREATE INDEX "bosh_sahifa_benefits_roles_items_parent_id_idx" ON "bosh_sahifa_benefits_roles_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "bosh_sahifa_benefits_roles_items_locales_locale_parent_id_un" ON "bosh_sahifa_benefits_roles_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "bosh_sahifa_benefits_roles_items_locales_parent_id_idx" ON "bosh_sahifa_benefits_roles_items_locales" USING btree ("_parent_id");
  CREATE INDEX "bosh_sahifa_benefits_roles_order_idx" ON "bosh_sahifa_benefits_roles" USING btree ("_order");
  CREATE INDEX "bosh_sahifa_benefits_roles_parent_id_idx" ON "bosh_sahifa_benefits_roles" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "bosh_sahifa_benefits_roles_locales_locale_parent_id_unique" ON "bosh_sahifa_benefits_roles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "bosh_sahifa_benefits_roles_locales_parent_id_idx" ON "bosh_sahifa_benefits_roles_locales" USING btree ("_parent_id");
  CREATE INDEX "bosh_sahifa_cta_steps_order_idx" ON "bosh_sahifa_cta_steps" USING btree ("_order");
  CREATE INDEX "bosh_sahifa_cta_steps_parent_id_idx" ON "bosh_sahifa_cta_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "bosh_sahifa_cta_steps_locales_locale_parent_id_unique" ON "bosh_sahifa_cta_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "bosh_sahifa_cta_steps_locales_parent_id_idx" ON "bosh_sahifa_cta_steps_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "bosh_sahifa_locales_locale_parent_id_unique" ON "bosh_sahifa_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "bosh_sahifa_locales_parent_id_idx" ON "bosh_sahifa_locales" USING btree ("_parent_id");
  CREATE INDEX "_bosh_sahifa_v_version_benefits_roles_items_order_idx" ON "_bosh_sahifa_v_version_benefits_roles_items" USING btree ("_order");
  CREATE INDEX "_bosh_sahifa_v_version_benefits_roles_items_parent_id_idx" ON "_bosh_sahifa_v_version_benefits_roles_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_bosh_sahifa_v_version_benefits_roles_items_locales_locale_p" ON "_bosh_sahifa_v_version_benefits_roles_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_bosh_sahifa_v_version_benefits_roles_items_locales_pare_idx" ON "_bosh_sahifa_v_version_benefits_roles_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_bosh_sahifa_v_version_benefits_roles_order_idx" ON "_bosh_sahifa_v_version_benefits_roles" USING btree ("_order");
  CREATE INDEX "_bosh_sahifa_v_version_benefits_roles_parent_id_idx" ON "_bosh_sahifa_v_version_benefits_roles" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_bosh_sahifa_v_version_benefits_roles_locales_locale_parent_" ON "_bosh_sahifa_v_version_benefits_roles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_bosh_sahifa_v_version_benefits_roles_locales_parent_id_idx" ON "_bosh_sahifa_v_version_benefits_roles_locales" USING btree ("_parent_id");
  CREATE INDEX "_bosh_sahifa_v_version_cta_steps_order_idx" ON "_bosh_sahifa_v_version_cta_steps" USING btree ("_order");
  CREATE INDEX "_bosh_sahifa_v_version_cta_steps_parent_id_idx" ON "_bosh_sahifa_v_version_cta_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_bosh_sahifa_v_version_cta_steps_locales_locale_parent_id_un" ON "_bosh_sahifa_v_version_cta_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_bosh_sahifa_v_version_cta_steps_locales_parent_id_idx" ON "_bosh_sahifa_v_version_cta_steps_locales" USING btree ("_parent_id");
  CREATE INDEX "_bosh_sahifa_v_created_at_idx" ON "_bosh_sahifa_v" USING btree ("created_at");
  CREATE INDEX "_bosh_sahifa_v_updated_at_idx" ON "_bosh_sahifa_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_bosh_sahifa_v_locales_locale_parent_id_unique" ON "_bosh_sahifa_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_bosh_sahifa_v_locales_parent_id_idx" ON "_bosh_sahifa_v_locales" USING btree ("_parent_id");
  CREATE INDEX "ittifoq_sahifa_who_paras_order_idx" ON "ittifoq_sahifa_who_paras" USING btree ("_order");
  CREATE INDEX "ittifoq_sahifa_who_paras_parent_id_idx" ON "ittifoq_sahifa_who_paras" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "ittifoq_sahifa_who_paras_locales_locale_parent_id_unique" ON "ittifoq_sahifa_who_paras_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ittifoq_sahifa_who_paras_locales_parent_id_idx" ON "ittifoq_sahifa_who_paras_locales" USING btree ("_parent_id");
  CREATE INDEX "ittifoq_sahifa_stats_order_idx" ON "ittifoq_sahifa_stats" USING btree ("_order");
  CREATE INDEX "ittifoq_sahifa_stats_parent_id_idx" ON "ittifoq_sahifa_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "ittifoq_sahifa_stats_locales_locale_parent_id_unique" ON "ittifoq_sahifa_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ittifoq_sahifa_stats_locales_parent_id_idx" ON "ittifoq_sahifa_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "ittifoq_sahifa_more_stats_order_idx" ON "ittifoq_sahifa_more_stats" USING btree ("_order");
  CREATE INDEX "ittifoq_sahifa_more_stats_parent_id_idx" ON "ittifoq_sahifa_more_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "ittifoq_sahifa_more_stats_locales_locale_parent_id_unique" ON "ittifoq_sahifa_more_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ittifoq_sahifa_more_stats_locales_parent_id_idx" ON "ittifoq_sahifa_more_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "ittifoq_sahifa_history_order_idx" ON "ittifoq_sahifa_history" USING btree ("_order");
  CREATE INDEX "ittifoq_sahifa_history_parent_id_idx" ON "ittifoq_sahifa_history" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "ittifoq_sahifa_history_locales_locale_parent_id_unique" ON "ittifoq_sahifa_history_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ittifoq_sahifa_history_locales_parent_id_idx" ON "ittifoq_sahifa_history_locales" USING btree ("_parent_id");
  CREATE INDEX "ittifoq_sahifa_privileges_order_idx" ON "ittifoq_sahifa_privileges" USING btree ("_order");
  CREATE INDEX "ittifoq_sahifa_privileges_parent_id_idx" ON "ittifoq_sahifa_privileges" USING btree ("_parent_id");
  CREATE INDEX "ittifoq_sahifa_privileges_img_idx" ON "ittifoq_sahifa_privileges" USING btree ("img_id");
  CREATE INDEX "ittifoq_sahifa_privileges_medal_idx" ON "ittifoq_sahifa_privileges" USING btree ("medal_id");
  CREATE UNIQUE INDEX "ittifoq_sahifa_privileges_locales_locale_parent_id_unique" ON "ittifoq_sahifa_privileges_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ittifoq_sahifa_privileges_locales_parent_id_idx" ON "ittifoq_sahifa_privileges_locales" USING btree ("_parent_id");
  CREATE INDEX "ittifoq_sahifa_intl_facts_order_idx" ON "ittifoq_sahifa_intl_facts" USING btree ("_order");
  CREATE INDEX "ittifoq_sahifa_intl_facts_parent_id_idx" ON "ittifoq_sahifa_intl_facts" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "ittifoq_sahifa_intl_facts_locales_locale_parent_id_unique" ON "ittifoq_sahifa_intl_facts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ittifoq_sahifa_intl_facts_locales_parent_id_idx" ON "ittifoq_sahifa_intl_facts_locales" USING btree ("_parent_id");
  CREATE INDEX "ittifoq_sahifa_intl_forms_order_idx" ON "ittifoq_sahifa_intl_forms" USING btree ("_order");
  CREATE INDEX "ittifoq_sahifa_intl_forms_parent_id_idx" ON "ittifoq_sahifa_intl_forms" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "ittifoq_sahifa_intl_forms_locales_locale_parent_id_unique" ON "ittifoq_sahifa_intl_forms_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ittifoq_sahifa_intl_forms_locales_parent_id_idx" ON "ittifoq_sahifa_intl_forms_locales" USING btree ("_parent_id");
  CREATE INDEX "ittifoq_sahifa_intl_projects_order_idx" ON "ittifoq_sahifa_intl_projects" USING btree ("_order");
  CREATE INDEX "ittifoq_sahifa_intl_projects_parent_id_idx" ON "ittifoq_sahifa_intl_projects" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "ittifoq_sahifa_intl_projects_locales_locale_parent_id_unique" ON "ittifoq_sahifa_intl_projects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ittifoq_sahifa_intl_projects_locales_parent_id_idx" ON "ittifoq_sahifa_intl_projects_locales" USING btree ("_parent_id");
  CREATE INDEX "ittifoq_sahifa_palace_features_order_idx" ON "ittifoq_sahifa_palace_features" USING btree ("_order");
  CREATE INDEX "ittifoq_sahifa_palace_features_parent_id_idx" ON "ittifoq_sahifa_palace_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "ittifoq_sahifa_palace_features_locales_locale_parent_id_uniq" ON "ittifoq_sahifa_palace_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ittifoq_sahifa_palace_features_locales_parent_id_idx" ON "ittifoq_sahifa_palace_features_locales" USING btree ("_parent_id");
  CREATE INDEX "ittifoq_sahifa_city_centre_facts_order_idx" ON "ittifoq_sahifa_city_centre_facts" USING btree ("_order");
  CREATE INDEX "ittifoq_sahifa_city_centre_facts_parent_id_idx" ON "ittifoq_sahifa_city_centre_facts" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "ittifoq_sahifa_city_centre_facts_locales_locale_parent_id_un" ON "ittifoq_sahifa_city_centre_facts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ittifoq_sahifa_city_centre_facts_locales_parent_id_idx" ON "ittifoq_sahifa_city_centre_facts_locales" USING btree ("_parent_id");
  CREATE INDEX "ittifoq_sahifa_centres_order_idx" ON "ittifoq_sahifa_centres" USING btree ("_order");
  CREATE INDEX "ittifoq_sahifa_centres_parent_id_idx" ON "ittifoq_sahifa_centres" USING btree ("_parent_id");
  CREATE INDEX "ittifoq_sahifa_centres_img_idx" ON "ittifoq_sahifa_centres" USING btree ("img_id");
  CREATE UNIQUE INDEX "ittifoq_sahifa_centres_locales_locale_parent_id_unique" ON "ittifoq_sahifa_centres_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ittifoq_sahifa_centres_locales_parent_id_idx" ON "ittifoq_sahifa_centres_locales" USING btree ("_parent_id");
  CREATE INDEX "ittifoq_sahifa_structure_qurultoy_meta_order_idx" ON "ittifoq_sahifa_structure_qurultoy_meta" USING btree ("_order");
  CREATE INDEX "ittifoq_sahifa_structure_qurultoy_meta_parent_id_idx" ON "ittifoq_sahifa_structure_qurultoy_meta" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "ittifoq_sahifa_structure_qurultoy_meta_locales_locale_parent" ON "ittifoq_sahifa_structure_qurultoy_meta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ittifoq_sahifa_structure_qurultoy_meta_locales_parent_id_idx" ON "ittifoq_sahifa_structure_qurultoy_meta_locales" USING btree ("_parent_id");
  CREATE INDEX "ittifoq_sahifa_structure_council_meta_order_idx" ON "ittifoq_sahifa_structure_council_meta" USING btree ("_order");
  CREATE INDEX "ittifoq_sahifa_structure_council_meta_parent_id_idx" ON "ittifoq_sahifa_structure_council_meta" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "ittifoq_sahifa_structure_council_meta_locales_locale_parent_" ON "ittifoq_sahifa_structure_council_meta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ittifoq_sahifa_structure_council_meta_locales_parent_id_idx" ON "ittifoq_sahifa_structure_council_meta_locales" USING btree ("_parent_id");
  CREATE INDEX "ittifoq_sahifa_structure_chair_meta_order_idx" ON "ittifoq_sahifa_structure_chair_meta" USING btree ("_order");
  CREATE INDEX "ittifoq_sahifa_structure_chair_meta_parent_id_idx" ON "ittifoq_sahifa_structure_chair_meta" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "ittifoq_sahifa_structure_chair_meta_locales_locale_parent_id" ON "ittifoq_sahifa_structure_chair_meta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ittifoq_sahifa_structure_chair_meta_locales_parent_id_idx" ON "ittifoq_sahifa_structure_chair_meta_locales" USING btree ("_parent_id");
  CREATE INDEX "ittifoq_sahifa_structure_exec_meta_order_idx" ON "ittifoq_sahifa_structure_exec_meta" USING btree ("_order");
  CREATE INDEX "ittifoq_sahifa_structure_exec_meta_parent_id_idx" ON "ittifoq_sahifa_structure_exec_meta" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "ittifoq_sahifa_structure_exec_meta_locales_locale_parent_id_" ON "ittifoq_sahifa_structure_exec_meta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ittifoq_sahifa_structure_exec_meta_locales_parent_id_idx" ON "ittifoq_sahifa_structure_exec_meta_locales" USING btree ("_parent_id");
  CREATE INDEX "ittifoq_sahifa_structure_audit_meta_order_idx" ON "ittifoq_sahifa_structure_audit_meta" USING btree ("_order");
  CREATE INDEX "ittifoq_sahifa_structure_audit_meta_parent_id_idx" ON "ittifoq_sahifa_structure_audit_meta" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "ittifoq_sahifa_structure_audit_meta_locales_locale_parent_id" ON "ittifoq_sahifa_structure_audit_meta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ittifoq_sahifa_structure_audit_meta_locales_parent_id_idx" ON "ittifoq_sahifa_structure_audit_meta_locales" USING btree ("_parent_id");
  CREATE INDEX "ittifoq_sahifa_structure_levels_meta_order_idx" ON "ittifoq_sahifa_structure_levels_meta" USING btree ("_order");
  CREATE INDEX "ittifoq_sahifa_structure_levels_meta_parent_id_idx" ON "ittifoq_sahifa_structure_levels_meta" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "ittifoq_sahifa_structure_levels_meta_locales_locale_parent_i" ON "ittifoq_sahifa_structure_levels_meta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ittifoq_sahifa_structure_levels_meta_locales_parent_id_idx" ON "ittifoq_sahifa_structure_levels_meta_locales" USING btree ("_parent_id");
  CREATE INDEX "ittifoq_sahifa_structure_levels_order_idx" ON "ittifoq_sahifa_structure_levels" USING btree ("_order");
  CREATE INDEX "ittifoq_sahifa_structure_levels_parent_id_idx" ON "ittifoq_sahifa_structure_levels" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "ittifoq_sahifa_structure_levels_locales_locale_parent_id_uni" ON "ittifoq_sahifa_structure_levels_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ittifoq_sahifa_structure_levels_locales_parent_id_idx" ON "ittifoq_sahifa_structure_levels_locales" USING btree ("_parent_id");
  CREATE INDEX "ittifoq_sahifa_structure_principles_order_idx" ON "ittifoq_sahifa_structure_principles" USING btree ("_order");
  CREATE INDEX "ittifoq_sahifa_structure_principles_parent_id_idx" ON "ittifoq_sahifa_structure_principles" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "ittifoq_sahifa_structure_principles_locales_locale_parent_id" ON "ittifoq_sahifa_structure_principles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ittifoq_sahifa_structure_principles_locales_parent_id_idx" ON "ittifoq_sahifa_structure_principles_locales" USING btree ("_parent_id");
  CREATE INDEX "ittifoq_sahifa_official_order_idx" ON "ittifoq_sahifa_official" USING btree ("_order");
  CREATE INDEX "ittifoq_sahifa_official_parent_id_idx" ON "ittifoq_sahifa_official" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "ittifoq_sahifa_official_locales_locale_parent_id_unique" ON "ittifoq_sahifa_official_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ittifoq_sahifa_official_locales_parent_id_idx" ON "ittifoq_sahifa_official_locales" USING btree ("_parent_id");
  CREATE INDEX "ittifoq_sahifa_priorities_order_idx" ON "ittifoq_sahifa_priorities" USING btree ("_order");
  CREATE INDEX "ittifoq_sahifa_priorities_parent_id_idx" ON "ittifoq_sahifa_priorities" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "ittifoq_sahifa_priorities_locales_locale_parent_id_unique" ON "ittifoq_sahifa_priorities_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ittifoq_sahifa_priorities_locales_parent_id_idx" ON "ittifoq_sahifa_priorities_locales" USING btree ("_parent_id");
  CREATE INDEX "ittifoq_sahifa_join_steps_order_idx" ON "ittifoq_sahifa_join_steps" USING btree ("_order");
  CREATE INDEX "ittifoq_sahifa_join_steps_parent_id_idx" ON "ittifoq_sahifa_join_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "ittifoq_sahifa_join_steps_locales_locale_parent_id_unique" ON "ittifoq_sahifa_join_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ittifoq_sahifa_join_steps_locales_parent_id_idx" ON "ittifoq_sahifa_join_steps_locales" USING btree ("_parent_id");
  CREATE INDEX "ittifoq_sahifa_join_rights_order_idx" ON "ittifoq_sahifa_join_rights" USING btree ("_order");
  CREATE INDEX "ittifoq_sahifa_join_rights_parent_id_idx" ON "ittifoq_sahifa_join_rights" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "ittifoq_sahifa_join_rights_locales_locale_parent_id_unique" ON "ittifoq_sahifa_join_rights_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ittifoq_sahifa_join_rights_locales_parent_id_idx" ON "ittifoq_sahifa_join_rights_locales" USING btree ("_parent_id");
  CREATE INDEX "ittifoq_sahifa_join_duties_order_idx" ON "ittifoq_sahifa_join_duties" USING btree ("_order");
  CREATE INDEX "ittifoq_sahifa_join_duties_parent_id_idx" ON "ittifoq_sahifa_join_duties" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "ittifoq_sahifa_join_duties_locales_locale_parent_id_unique" ON "ittifoq_sahifa_join_duties_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ittifoq_sahifa_join_duties_locales_parent_id_idx" ON "ittifoq_sahifa_join_duties_locales" USING btree ("_parent_id");
  CREATE INDEX "ittifoq_sahifa_join_ends_order_idx" ON "ittifoq_sahifa_join_ends" USING btree ("_order");
  CREATE INDEX "ittifoq_sahifa_join_ends_parent_id_idx" ON "ittifoq_sahifa_join_ends" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "ittifoq_sahifa_join_ends_locales_locale_parent_id_unique" ON "ittifoq_sahifa_join_ends_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ittifoq_sahifa_join_ends_locales_parent_id_idx" ON "ittifoq_sahifa_join_ends_locales" USING btree ("_parent_id");
  CREATE INDEX "ittifoq_sahifa_orgs_ngos_order_idx" ON "ittifoq_sahifa_orgs_ngos" USING btree ("_order");
  CREATE INDEX "ittifoq_sahifa_orgs_ngos_parent_id_idx" ON "ittifoq_sahifa_orgs_ngos" USING btree ("_parent_id");
  CREATE INDEX "ittifoq_sahifa_orgs_ngos_logo_idx" ON "ittifoq_sahifa_orgs_ngos" USING btree ("logo_id");
  CREATE UNIQUE INDEX "ittifoq_sahifa_orgs_ngos_locales_locale_parent_id_unique" ON "ittifoq_sahifa_orgs_ngos_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ittifoq_sahifa_orgs_ngos_locales_parent_id_idx" ON "ittifoq_sahifa_orgs_ngos_locales" USING btree ("_parent_id");
  CREATE INDEX "ittifoq_sahifa_orgs_companies_order_idx" ON "ittifoq_sahifa_orgs_companies" USING btree ("_order");
  CREATE INDEX "ittifoq_sahifa_orgs_companies_parent_id_idx" ON "ittifoq_sahifa_orgs_companies" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "ittifoq_sahifa_orgs_companies_locales_locale_parent_id_uniqu" ON "ittifoq_sahifa_orgs_companies_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ittifoq_sahifa_orgs_companies_locales_parent_id_idx" ON "ittifoq_sahifa_orgs_companies_locales" USING btree ("_parent_id");
  CREATE INDEX "ittifoq_sahifa_companies_order_idx" ON "ittifoq_sahifa_companies" USING btree ("_order");
  CREATE INDEX "ittifoq_sahifa_companies_parent_id_idx" ON "ittifoq_sahifa_companies" USING btree ("_parent_id");
  CREATE INDEX "ittifoq_sahifa_companies_logo_idx" ON "ittifoq_sahifa_companies" USING btree ("logo_id");
  CREATE UNIQUE INDEX "ittifoq_sahifa_companies_locales_locale_parent_id_unique" ON "ittifoq_sahifa_companies_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ittifoq_sahifa_companies_locales_parent_id_idx" ON "ittifoq_sahifa_companies_locales" USING btree ("_parent_id");
  CREATE INDEX "ittifoq_sahifa_intl_intl_partners_idx" ON "ittifoq_sahifa" USING btree ("intl_partners_id");
  CREATE INDEX "ittifoq_sahifa_intl_intl_flags_idx" ON "ittifoq_sahifa" USING btree ("intl_flags_id");
  CREATE INDEX "ittifoq_sahifa_palace_palace_img_idx" ON "ittifoq_sahifa" USING btree ("palace_img_id");
  CREATE INDEX "ittifoq_sahifa_city_centre_city_centre_img_idx" ON "ittifoq_sahifa" USING btree ("city_centre_img_id");
  CREATE INDEX "ittifoq_sahifa_img_img_team_idx" ON "ittifoq_sahifa" USING btree ("img_team_id");
  CREATE INDEX "ittifoq_sahifa_img_img_collage_idx" ON "ittifoq_sahifa" USING btree ("img_collage_id");
  CREATE INDEX "ittifoq_sahifa_img_img_collage_sm_idx" ON "ittifoq_sahifa" USING btree ("img_collage_sm_id");
  CREATE INDEX "ittifoq_sahifa_img_img_leaders_idx" ON "ittifoq_sahifa" USING btree ("img_leaders_id");
  CREATE INDEX "ittifoq_sahifa_img_img_pres_youth1_idx" ON "ittifoq_sahifa" USING btree ("img_pres_youth1_id");
  CREATE INDEX "ittifoq_sahifa_img_img_pres_youth2_idx" ON "ittifoq_sahifa" USING btree ("img_pres_youth2_id");
  CREATE INDEX "ittifoq_sahifa_img_img_seminar_idx" ON "ittifoq_sahifa" USING btree ("img_seminar_id");
  CREATE INDEX "ittifoq_sahifa_img_img_girls_idx" ON "ittifoq_sahifa" USING btree ("img_girls_id");
  CREATE INDEX "ittifoq_sahifa_img_img_readers_idx" ON "ittifoq_sahifa" USING btree ("img_readers_id");
  CREATE INDEX "ittifoq_sahifa_img_img_books_idx" ON "ittifoq_sahifa" USING btree ("img_books_id");
  CREATE INDEX "ittifoq_sahifa_img_img_volunteers_idx" ON "ittifoq_sahifa" USING btree ("img_volunteers_id");
  CREATE UNIQUE INDEX "ittifoq_sahifa_locales_locale_parent_id_unique" ON "ittifoq_sahifa_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "ittifoq_sahifa_locales_parent_id_idx" ON "ittifoq_sahifa_locales" USING btree ("_parent_id");
  CREATE INDEX "ittifoq_sahifa_rels_order_idx" ON "ittifoq_sahifa_rels" USING btree ("order");
  CREATE INDEX "ittifoq_sahifa_rels_parent_idx" ON "ittifoq_sahifa_rels" USING btree ("parent_id");
  CREATE INDEX "ittifoq_sahifa_rels_path_idx" ON "ittifoq_sahifa_rels" USING btree ("path");
  CREATE INDEX "ittifoq_sahifa_rels_media_id_idx" ON "ittifoq_sahifa_rels" USING btree ("media_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_who_paras_order_idx" ON "_ittifoq_sahifa_v_version_who_paras" USING btree ("_order");
  CREATE INDEX "_ittifoq_sahifa_v_version_who_paras_parent_id_idx" ON "_ittifoq_sahifa_v_version_who_paras" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_ittifoq_sahifa_v_version_who_paras_locales_locale_parent_id" ON "_ittifoq_sahifa_v_version_who_paras_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_who_paras_locales_parent_id_idx" ON "_ittifoq_sahifa_v_version_who_paras_locales" USING btree ("_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_stats_order_idx" ON "_ittifoq_sahifa_v_version_stats" USING btree ("_order");
  CREATE INDEX "_ittifoq_sahifa_v_version_stats_parent_id_idx" ON "_ittifoq_sahifa_v_version_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_ittifoq_sahifa_v_version_stats_locales_locale_parent_id_uni" ON "_ittifoq_sahifa_v_version_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_stats_locales_parent_id_idx" ON "_ittifoq_sahifa_v_version_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_more_stats_order_idx" ON "_ittifoq_sahifa_v_version_more_stats" USING btree ("_order");
  CREATE INDEX "_ittifoq_sahifa_v_version_more_stats_parent_id_idx" ON "_ittifoq_sahifa_v_version_more_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_ittifoq_sahifa_v_version_more_stats_locales_locale_parent_i" ON "_ittifoq_sahifa_v_version_more_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_more_stats_locales_parent_id_idx" ON "_ittifoq_sahifa_v_version_more_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_history_order_idx" ON "_ittifoq_sahifa_v_version_history" USING btree ("_order");
  CREATE INDEX "_ittifoq_sahifa_v_version_history_parent_id_idx" ON "_ittifoq_sahifa_v_version_history" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_ittifoq_sahifa_v_version_history_locales_locale_parent_id_u" ON "_ittifoq_sahifa_v_version_history_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_history_locales_parent_id_idx" ON "_ittifoq_sahifa_v_version_history_locales" USING btree ("_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_privileges_order_idx" ON "_ittifoq_sahifa_v_version_privileges" USING btree ("_order");
  CREATE INDEX "_ittifoq_sahifa_v_version_privileges_parent_id_idx" ON "_ittifoq_sahifa_v_version_privileges" USING btree ("_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_privileges_img_idx" ON "_ittifoq_sahifa_v_version_privileges" USING btree ("img_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_privileges_medal_idx" ON "_ittifoq_sahifa_v_version_privileges" USING btree ("medal_id");
  CREATE UNIQUE INDEX "_ittifoq_sahifa_v_version_privileges_locales_locale_parent_i" ON "_ittifoq_sahifa_v_version_privileges_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_privileges_locales_parent_id_idx" ON "_ittifoq_sahifa_v_version_privileges_locales" USING btree ("_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_intl_facts_order_idx" ON "_ittifoq_sahifa_v_version_intl_facts" USING btree ("_order");
  CREATE INDEX "_ittifoq_sahifa_v_version_intl_facts_parent_id_idx" ON "_ittifoq_sahifa_v_version_intl_facts" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_ittifoq_sahifa_v_version_intl_facts_locales_locale_parent_i" ON "_ittifoq_sahifa_v_version_intl_facts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_intl_facts_locales_parent_id_idx" ON "_ittifoq_sahifa_v_version_intl_facts_locales" USING btree ("_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_intl_forms_order_idx" ON "_ittifoq_sahifa_v_version_intl_forms" USING btree ("_order");
  CREATE INDEX "_ittifoq_sahifa_v_version_intl_forms_parent_id_idx" ON "_ittifoq_sahifa_v_version_intl_forms" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_ittifoq_sahifa_v_version_intl_forms_locales_locale_parent_i" ON "_ittifoq_sahifa_v_version_intl_forms_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_intl_forms_locales_parent_id_idx" ON "_ittifoq_sahifa_v_version_intl_forms_locales" USING btree ("_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_intl_projects_order_idx" ON "_ittifoq_sahifa_v_version_intl_projects" USING btree ("_order");
  CREATE INDEX "_ittifoq_sahifa_v_version_intl_projects_parent_id_idx" ON "_ittifoq_sahifa_v_version_intl_projects" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_ittifoq_sahifa_v_version_intl_projects_locales_locale_paren" ON "_ittifoq_sahifa_v_version_intl_projects_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_intl_projects_locales_parent_i_idx" ON "_ittifoq_sahifa_v_version_intl_projects_locales" USING btree ("_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_palace_features_order_idx" ON "_ittifoq_sahifa_v_version_palace_features" USING btree ("_order");
  CREATE INDEX "_ittifoq_sahifa_v_version_palace_features_parent_id_idx" ON "_ittifoq_sahifa_v_version_palace_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_ittifoq_sahifa_v_version_palace_features_locales_locale_par" ON "_ittifoq_sahifa_v_version_palace_features_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_palace_features_locales_parent_idx" ON "_ittifoq_sahifa_v_version_palace_features_locales" USING btree ("_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_city_centre_facts_order_idx" ON "_ittifoq_sahifa_v_version_city_centre_facts" USING btree ("_order");
  CREATE INDEX "_ittifoq_sahifa_v_version_city_centre_facts_parent_id_idx" ON "_ittifoq_sahifa_v_version_city_centre_facts" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_ittifoq_sahifa_v_version_city_centre_facts_locales_locale_p" ON "_ittifoq_sahifa_v_version_city_centre_facts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_city_centre_facts_locales_pare_idx" ON "_ittifoq_sahifa_v_version_city_centre_facts_locales" USING btree ("_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_centres_order_idx" ON "_ittifoq_sahifa_v_version_centres" USING btree ("_order");
  CREATE INDEX "_ittifoq_sahifa_v_version_centres_parent_id_idx" ON "_ittifoq_sahifa_v_version_centres" USING btree ("_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_centres_img_idx" ON "_ittifoq_sahifa_v_version_centres" USING btree ("img_id");
  CREATE UNIQUE INDEX "_ittifoq_sahifa_v_version_centres_locales_locale_parent_id_u" ON "_ittifoq_sahifa_v_version_centres_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_centres_locales_parent_id_idx" ON "_ittifoq_sahifa_v_version_centres_locales" USING btree ("_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_structure_qurultoy_meta_order_idx" ON "_ittifoq_sahifa_v_version_structure_qurultoy_meta" USING btree ("_order");
  CREATE INDEX "_ittifoq_sahifa_v_version_structure_qurultoy_meta_parent_id_idx" ON "_ittifoq_sahifa_v_version_structure_qurultoy_meta" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_ittifoq_sahifa_v_version_structure_qurultoy_meta_locales_lo" ON "_ittifoq_sahifa_v_version_structure_qurultoy_meta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_structure_qurultoy_meta_locale_idx" ON "_ittifoq_sahifa_v_version_structure_qurultoy_meta_locales" USING btree ("_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_structure_council_meta_order_idx" ON "_ittifoq_sahifa_v_version_structure_council_meta" USING btree ("_order");
  CREATE INDEX "_ittifoq_sahifa_v_version_structure_council_meta_parent_id_idx" ON "_ittifoq_sahifa_v_version_structure_council_meta" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_ittifoq_sahifa_v_version_structure_council_meta_locales_loc" ON "_ittifoq_sahifa_v_version_structure_council_meta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_structure_council_meta_locales_idx" ON "_ittifoq_sahifa_v_version_structure_council_meta_locales" USING btree ("_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_structure_chair_meta_order_idx" ON "_ittifoq_sahifa_v_version_structure_chair_meta" USING btree ("_order");
  CREATE INDEX "_ittifoq_sahifa_v_version_structure_chair_meta_parent_id_idx" ON "_ittifoq_sahifa_v_version_structure_chair_meta" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_ittifoq_sahifa_v_version_structure_chair_meta_locales_local" ON "_ittifoq_sahifa_v_version_structure_chair_meta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_structure_chair_meta_locales_p_idx" ON "_ittifoq_sahifa_v_version_structure_chair_meta_locales" USING btree ("_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_structure_exec_meta_order_idx" ON "_ittifoq_sahifa_v_version_structure_exec_meta" USING btree ("_order");
  CREATE INDEX "_ittifoq_sahifa_v_version_structure_exec_meta_parent_id_idx" ON "_ittifoq_sahifa_v_version_structure_exec_meta" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_ittifoq_sahifa_v_version_structure_exec_meta_locales_locale" ON "_ittifoq_sahifa_v_version_structure_exec_meta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_structure_exec_meta_locales_pa_idx" ON "_ittifoq_sahifa_v_version_structure_exec_meta_locales" USING btree ("_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_structure_audit_meta_order_idx" ON "_ittifoq_sahifa_v_version_structure_audit_meta" USING btree ("_order");
  CREATE INDEX "_ittifoq_sahifa_v_version_structure_audit_meta_parent_id_idx" ON "_ittifoq_sahifa_v_version_structure_audit_meta" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_ittifoq_sahifa_v_version_structure_audit_meta_locales_local" ON "_ittifoq_sahifa_v_version_structure_audit_meta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_structure_audit_meta_locales_p_idx" ON "_ittifoq_sahifa_v_version_structure_audit_meta_locales" USING btree ("_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_structure_levels_meta_order_idx" ON "_ittifoq_sahifa_v_version_structure_levels_meta" USING btree ("_order");
  CREATE INDEX "_ittifoq_sahifa_v_version_structure_levels_meta_parent_id_idx" ON "_ittifoq_sahifa_v_version_structure_levels_meta" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_ittifoq_sahifa_v_version_structure_levels_meta_locales_loca" ON "_ittifoq_sahifa_v_version_structure_levels_meta_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_structure_levels_meta_locales__idx" ON "_ittifoq_sahifa_v_version_structure_levels_meta_locales" USING btree ("_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_structure_levels_order_idx" ON "_ittifoq_sahifa_v_version_structure_levels" USING btree ("_order");
  CREATE INDEX "_ittifoq_sahifa_v_version_structure_levels_parent_id_idx" ON "_ittifoq_sahifa_v_version_structure_levels" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_ittifoq_sahifa_v_version_structure_levels_locales_locale_pa" ON "_ittifoq_sahifa_v_version_structure_levels_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_structure_levels_locales_paren_idx" ON "_ittifoq_sahifa_v_version_structure_levels_locales" USING btree ("_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_structure_principles_order_idx" ON "_ittifoq_sahifa_v_version_structure_principles" USING btree ("_order");
  CREATE INDEX "_ittifoq_sahifa_v_version_structure_principles_parent_id_idx" ON "_ittifoq_sahifa_v_version_structure_principles" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_ittifoq_sahifa_v_version_structure_principles_locales_local" ON "_ittifoq_sahifa_v_version_structure_principles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_structure_principles_locales_p_idx" ON "_ittifoq_sahifa_v_version_structure_principles_locales" USING btree ("_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_official_order_idx" ON "_ittifoq_sahifa_v_version_official" USING btree ("_order");
  CREATE INDEX "_ittifoq_sahifa_v_version_official_parent_id_idx" ON "_ittifoq_sahifa_v_version_official" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_ittifoq_sahifa_v_version_official_locales_locale_parent_id_" ON "_ittifoq_sahifa_v_version_official_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_official_locales_parent_id_idx" ON "_ittifoq_sahifa_v_version_official_locales" USING btree ("_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_priorities_order_idx" ON "_ittifoq_sahifa_v_version_priorities" USING btree ("_order");
  CREATE INDEX "_ittifoq_sahifa_v_version_priorities_parent_id_idx" ON "_ittifoq_sahifa_v_version_priorities" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_ittifoq_sahifa_v_version_priorities_locales_locale_parent_i" ON "_ittifoq_sahifa_v_version_priorities_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_priorities_locales_parent_id_idx" ON "_ittifoq_sahifa_v_version_priorities_locales" USING btree ("_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_join_steps_order_idx" ON "_ittifoq_sahifa_v_version_join_steps" USING btree ("_order");
  CREATE INDEX "_ittifoq_sahifa_v_version_join_steps_parent_id_idx" ON "_ittifoq_sahifa_v_version_join_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_ittifoq_sahifa_v_version_join_steps_locales_locale_parent_i" ON "_ittifoq_sahifa_v_version_join_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_join_steps_locales_parent_id_idx" ON "_ittifoq_sahifa_v_version_join_steps_locales" USING btree ("_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_join_rights_order_idx" ON "_ittifoq_sahifa_v_version_join_rights" USING btree ("_order");
  CREATE INDEX "_ittifoq_sahifa_v_version_join_rights_parent_id_idx" ON "_ittifoq_sahifa_v_version_join_rights" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_ittifoq_sahifa_v_version_join_rights_locales_locale_parent_" ON "_ittifoq_sahifa_v_version_join_rights_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_join_rights_locales_parent_id_idx" ON "_ittifoq_sahifa_v_version_join_rights_locales" USING btree ("_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_join_duties_order_idx" ON "_ittifoq_sahifa_v_version_join_duties" USING btree ("_order");
  CREATE INDEX "_ittifoq_sahifa_v_version_join_duties_parent_id_idx" ON "_ittifoq_sahifa_v_version_join_duties" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_ittifoq_sahifa_v_version_join_duties_locales_locale_parent_" ON "_ittifoq_sahifa_v_version_join_duties_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_join_duties_locales_parent_id_idx" ON "_ittifoq_sahifa_v_version_join_duties_locales" USING btree ("_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_join_ends_order_idx" ON "_ittifoq_sahifa_v_version_join_ends" USING btree ("_order");
  CREATE INDEX "_ittifoq_sahifa_v_version_join_ends_parent_id_idx" ON "_ittifoq_sahifa_v_version_join_ends" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_ittifoq_sahifa_v_version_join_ends_locales_locale_parent_id" ON "_ittifoq_sahifa_v_version_join_ends_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_join_ends_locales_parent_id_idx" ON "_ittifoq_sahifa_v_version_join_ends_locales" USING btree ("_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_orgs_ngos_order_idx" ON "_ittifoq_sahifa_v_version_orgs_ngos" USING btree ("_order");
  CREATE INDEX "_ittifoq_sahifa_v_version_orgs_ngos_parent_id_idx" ON "_ittifoq_sahifa_v_version_orgs_ngos" USING btree ("_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_orgs_ngos_logo_idx" ON "_ittifoq_sahifa_v_version_orgs_ngos" USING btree ("logo_id");
  CREATE UNIQUE INDEX "_ittifoq_sahifa_v_version_orgs_ngos_locales_locale_parent_id" ON "_ittifoq_sahifa_v_version_orgs_ngos_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_orgs_ngos_locales_parent_id_idx" ON "_ittifoq_sahifa_v_version_orgs_ngos_locales" USING btree ("_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_orgs_companies_order_idx" ON "_ittifoq_sahifa_v_version_orgs_companies" USING btree ("_order");
  CREATE INDEX "_ittifoq_sahifa_v_version_orgs_companies_parent_id_idx" ON "_ittifoq_sahifa_v_version_orgs_companies" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_ittifoq_sahifa_v_version_orgs_companies_locales_locale_pare" ON "_ittifoq_sahifa_v_version_orgs_companies_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_orgs_companies_locales_parent__idx" ON "_ittifoq_sahifa_v_version_orgs_companies_locales" USING btree ("_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_companies_order_idx" ON "_ittifoq_sahifa_v_version_companies" USING btree ("_order");
  CREATE INDEX "_ittifoq_sahifa_v_version_companies_parent_id_idx" ON "_ittifoq_sahifa_v_version_companies" USING btree ("_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_companies_logo_idx" ON "_ittifoq_sahifa_v_version_companies" USING btree ("logo_id");
  CREATE UNIQUE INDEX "_ittifoq_sahifa_v_version_companies_locales_locale_parent_id" ON "_ittifoq_sahifa_v_version_companies_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_companies_locales_parent_id_idx" ON "_ittifoq_sahifa_v_version_companies_locales" USING btree ("_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_intl_version_intl_partners_idx" ON "_ittifoq_sahifa_v" USING btree ("version_intl_partners_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_intl_version_intl_flags_idx" ON "_ittifoq_sahifa_v" USING btree ("version_intl_flags_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_palace_version_palace_img_idx" ON "_ittifoq_sahifa_v" USING btree ("version_palace_img_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_city_centre_version_city_centr_idx" ON "_ittifoq_sahifa_v" USING btree ("version_city_centre_img_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_img_version_img_team_idx" ON "_ittifoq_sahifa_v" USING btree ("version_img_team_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_img_version_img_collage_idx" ON "_ittifoq_sahifa_v" USING btree ("version_img_collage_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_img_version_img_collage_sm_idx" ON "_ittifoq_sahifa_v" USING btree ("version_img_collage_sm_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_img_version_img_leaders_idx" ON "_ittifoq_sahifa_v" USING btree ("version_img_leaders_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_img_version_img_pres_youth1_idx" ON "_ittifoq_sahifa_v" USING btree ("version_img_pres_youth1_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_img_version_img_pres_youth2_idx" ON "_ittifoq_sahifa_v" USING btree ("version_img_pres_youth2_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_img_version_img_seminar_idx" ON "_ittifoq_sahifa_v" USING btree ("version_img_seminar_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_img_version_img_girls_idx" ON "_ittifoq_sahifa_v" USING btree ("version_img_girls_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_img_version_img_readers_idx" ON "_ittifoq_sahifa_v" USING btree ("version_img_readers_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_img_version_img_books_idx" ON "_ittifoq_sahifa_v" USING btree ("version_img_books_id");
  CREATE INDEX "_ittifoq_sahifa_v_version_img_version_img_volunteers_idx" ON "_ittifoq_sahifa_v" USING btree ("version_img_volunteers_id");
  CREATE INDEX "_ittifoq_sahifa_v_created_at_idx" ON "_ittifoq_sahifa_v" USING btree ("created_at");
  CREATE INDEX "_ittifoq_sahifa_v_updated_at_idx" ON "_ittifoq_sahifa_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_ittifoq_sahifa_v_locales_locale_parent_id_unique" ON "_ittifoq_sahifa_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_locales_parent_id_idx" ON "_ittifoq_sahifa_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_rels_order_idx" ON "_ittifoq_sahifa_v_rels" USING btree ("order");
  CREATE INDEX "_ittifoq_sahifa_v_rels_parent_idx" ON "_ittifoq_sahifa_v_rels" USING btree ("parent_id");
  CREATE INDEX "_ittifoq_sahifa_v_rels_path_idx" ON "_ittifoq_sahifa_v_rels" USING btree ("path");
  CREATE INDEX "_ittifoq_sahifa_v_rels_media_id_idx" ON "_ittifoq_sahifa_v_rels" USING btree ("media_id");
  CREATE INDEX "markaziy_kengash_about_paras_order_idx" ON "markaziy_kengash_about_paras" USING btree ("_order");
  CREATE INDEX "markaziy_kengash_about_paras_parent_id_idx" ON "markaziy_kengash_about_paras" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "markaziy_kengash_about_paras_locales_locale_parent_id_unique" ON "markaziy_kengash_about_paras_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "markaziy_kengash_about_paras_locales_parent_id_idx" ON "markaziy_kengash_about_paras_locales" USING btree ("_parent_id");
  CREATE INDEX "markaziy_kengash_stats_order_idx" ON "markaziy_kengash_stats" USING btree ("_order");
  CREATE INDEX "markaziy_kengash_stats_parent_id_idx" ON "markaziy_kengash_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "markaziy_kengash_stats_locales_locale_parent_id_unique" ON "markaziy_kengash_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "markaziy_kengash_stats_locales_parent_id_idx" ON "markaziy_kengash_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "markaziy_kengash_organs_order_idx" ON "markaziy_kengash_organs" USING btree ("_order");
  CREATE INDEX "markaziy_kengash_organs_parent_id_idx" ON "markaziy_kengash_organs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "markaziy_kengash_organs_locales_locale_parent_id_unique" ON "markaziy_kengash_organs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "markaziy_kengash_organs_locales_parent_id_idx" ON "markaziy_kengash_organs_locales" USING btree ("_parent_id");
  CREATE INDEX "markaziy_kengash_powers_order_idx" ON "markaziy_kengash_powers" USING btree ("_order");
  CREATE INDEX "markaziy_kengash_powers_parent_id_idx" ON "markaziy_kengash_powers" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "markaziy_kengash_powers_locales_locale_parent_id_unique" ON "markaziy_kengash_powers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "markaziy_kengash_powers_locales_parent_id_idx" ON "markaziy_kengash_powers_locales" USING btree ("_parent_id");
  CREATE INDEX "markaziy_kengash_members_facts_order_idx" ON "markaziy_kengash_members_facts" USING btree ("_order");
  CREATE INDEX "markaziy_kengash_members_facts_parent_id_idx" ON "markaziy_kengash_members_facts" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "markaziy_kengash_members_facts_locales_locale_parent_id_uniq" ON "markaziy_kengash_members_facts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "markaziy_kengash_members_facts_locales_parent_id_idx" ON "markaziy_kengash_members_facts_locales" USING btree ("_parent_id");
  CREATE INDEX "markaziy_kengash_members_by_post_order_idx" ON "markaziy_kengash_members_by_post" USING btree ("_order");
  CREATE INDEX "markaziy_kengash_members_by_post_parent_id_idx" ON "markaziy_kengash_members_by_post" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "markaziy_kengash_members_by_post_locales_locale_parent_id_un" ON "markaziy_kengash_members_by_post_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "markaziy_kengash_members_by_post_locales_parent_id_idx" ON "markaziy_kengash_members_by_post_locales" USING btree ("_parent_id");
  CREATE INDEX "markaziy_kengash_members_fields_order_idx" ON "markaziy_kengash_members_fields" USING btree ("_order");
  CREATE INDEX "markaziy_kengash_members_fields_parent_id_idx" ON "markaziy_kengash_members_fields" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "markaziy_kengash_members_fields_locales_locale_parent_id_uni" ON "markaziy_kengash_members_fields_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "markaziy_kengash_members_fields_locales_parent_id_idx" ON "markaziy_kengash_members_fields_locales" USING btree ("_parent_id");
  CREATE INDEX "markaziy_kengash_leaders_edu_order_idx" ON "markaziy_kengash_leaders_edu" USING btree ("_order");
  CREATE INDEX "markaziy_kengash_leaders_edu_parent_id_idx" ON "markaziy_kengash_leaders_edu" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "markaziy_kengash_leaders_edu_locales_locale_parent_id_unique" ON "markaziy_kengash_leaders_edu_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "markaziy_kengash_leaders_edu_locales_parent_id_idx" ON "markaziy_kengash_leaders_edu_locales" USING btree ("_parent_id");
  CREATE INDEX "markaziy_kengash_leaders_career_order_idx" ON "markaziy_kengash_leaders_career" USING btree ("_order");
  CREATE INDEX "markaziy_kengash_leaders_career_parent_id_idx" ON "markaziy_kengash_leaders_career" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "markaziy_kengash_leaders_career_locales_locale_parent_id_uni" ON "markaziy_kengash_leaders_career_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "markaziy_kengash_leaders_career_locales_parent_id_idx" ON "markaziy_kengash_leaders_career_locales" USING btree ("_parent_id");
  CREATE INDEX "markaziy_kengash_leaders_order_idx" ON "markaziy_kengash_leaders" USING btree ("_order");
  CREATE INDEX "markaziy_kengash_leaders_parent_id_idx" ON "markaziy_kengash_leaders" USING btree ("_parent_id");
  CREATE INDEX "markaziy_kengash_leaders_img_idx" ON "markaziy_kengash_leaders" USING btree ("img_id");
  CREATE UNIQUE INDEX "markaziy_kengash_leaders_locales_locale_parent_id_unique" ON "markaziy_kengash_leaders_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "markaziy_kengash_leaders_locales_parent_id_idx" ON "markaziy_kengash_leaders_locales" USING btree ("_parent_id");
  CREATE INDEX "markaziy_kengash_bodies_items_order_idx" ON "markaziy_kengash_bodies_items" USING btree ("_order");
  CREATE INDEX "markaziy_kengash_bodies_items_parent_id_idx" ON "markaziy_kengash_bodies_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "markaziy_kengash_bodies_items_locales_locale_parent_id_uniqu" ON "markaziy_kengash_bodies_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "markaziy_kengash_bodies_items_locales_parent_id_idx" ON "markaziy_kengash_bodies_items_locales" USING btree ("_parent_id");
  CREATE INDEX "markaziy_kengash_bodies_order_idx" ON "markaziy_kengash_bodies" USING btree ("_order");
  CREATE INDEX "markaziy_kengash_bodies_parent_id_idx" ON "markaziy_kengash_bodies" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "markaziy_kengash_bodies_locales_locale_parent_id_unique" ON "markaziy_kengash_bodies_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "markaziy_kengash_bodies_locales_parent_id_idx" ON "markaziy_kengash_bodies_locales" USING btree ("_parent_id");
  CREATE INDEX "markaziy_kengash_events_order_idx" ON "markaziy_kengash_events" USING btree ("_order");
  CREATE INDEX "markaziy_kengash_events_parent_id_idx" ON "markaziy_kengash_events" USING btree ("_parent_id");
  CREATE INDEX "markaziy_kengash_events_img_idx" ON "markaziy_kengash_events" USING btree ("img_id");
  CREATE UNIQUE INDEX "markaziy_kengash_events_locales_locale_parent_id_unique" ON "markaziy_kengash_events_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "markaziy_kengash_events_locales_parent_id_idx" ON "markaziy_kengash_events_locales" USING btree ("_parent_id");
  CREATE INDEX "markaziy_kengash_images_images_building_idx" ON "markaziy_kengash" USING btree ("images_building_id");
  CREATE INDEX "markaziy_kengash_images_images_delegates_idx" ON "markaziy_kengash" USING btree ("images_delegates_id");
  CREATE UNIQUE INDEX "markaziy_kengash_locales_locale_parent_id_unique" ON "markaziy_kengash_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "markaziy_kengash_locales_parent_id_idx" ON "markaziy_kengash_locales" USING btree ("_parent_id");
  CREATE INDEX "_markaziy_kengash_v_version_about_paras_order_idx" ON "_markaziy_kengash_v_version_about_paras" USING btree ("_order");
  CREATE INDEX "_markaziy_kengash_v_version_about_paras_parent_id_idx" ON "_markaziy_kengash_v_version_about_paras" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_markaziy_kengash_v_version_about_paras_locales_locale_paren" ON "_markaziy_kengash_v_version_about_paras_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_markaziy_kengash_v_version_about_paras_locales_parent_i_idx" ON "_markaziy_kengash_v_version_about_paras_locales" USING btree ("_parent_id");
  CREATE INDEX "_markaziy_kengash_v_version_stats_order_idx" ON "_markaziy_kengash_v_version_stats" USING btree ("_order");
  CREATE INDEX "_markaziy_kengash_v_version_stats_parent_id_idx" ON "_markaziy_kengash_v_version_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_markaziy_kengash_v_version_stats_locales_locale_parent_id_u" ON "_markaziy_kengash_v_version_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_markaziy_kengash_v_version_stats_locales_parent_id_idx" ON "_markaziy_kengash_v_version_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "_markaziy_kengash_v_version_organs_order_idx" ON "_markaziy_kengash_v_version_organs" USING btree ("_order");
  CREATE INDEX "_markaziy_kengash_v_version_organs_parent_id_idx" ON "_markaziy_kengash_v_version_organs" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_markaziy_kengash_v_version_organs_locales_locale_parent_id_" ON "_markaziy_kengash_v_version_organs_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_markaziy_kengash_v_version_organs_locales_parent_id_idx" ON "_markaziy_kengash_v_version_organs_locales" USING btree ("_parent_id");
  CREATE INDEX "_markaziy_kengash_v_version_powers_order_idx" ON "_markaziy_kengash_v_version_powers" USING btree ("_order");
  CREATE INDEX "_markaziy_kengash_v_version_powers_parent_id_idx" ON "_markaziy_kengash_v_version_powers" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_markaziy_kengash_v_version_powers_locales_locale_parent_id_" ON "_markaziy_kengash_v_version_powers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_markaziy_kengash_v_version_powers_locales_parent_id_idx" ON "_markaziy_kengash_v_version_powers_locales" USING btree ("_parent_id");
  CREATE INDEX "_markaziy_kengash_v_version_members_facts_order_idx" ON "_markaziy_kengash_v_version_members_facts" USING btree ("_order");
  CREATE INDEX "_markaziy_kengash_v_version_members_facts_parent_id_idx" ON "_markaziy_kengash_v_version_members_facts" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_markaziy_kengash_v_version_members_facts_locales_locale_par" ON "_markaziy_kengash_v_version_members_facts_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_markaziy_kengash_v_version_members_facts_locales_parent_idx" ON "_markaziy_kengash_v_version_members_facts_locales" USING btree ("_parent_id");
  CREATE INDEX "_markaziy_kengash_v_version_members_by_post_order_idx" ON "_markaziy_kengash_v_version_members_by_post" USING btree ("_order");
  CREATE INDEX "_markaziy_kengash_v_version_members_by_post_parent_id_idx" ON "_markaziy_kengash_v_version_members_by_post" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_markaziy_kengash_v_version_members_by_post_locales_locale_p" ON "_markaziy_kengash_v_version_members_by_post_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_markaziy_kengash_v_version_members_by_post_locales_pare_idx" ON "_markaziy_kengash_v_version_members_by_post_locales" USING btree ("_parent_id");
  CREATE INDEX "_markaziy_kengash_v_version_members_fields_order_idx" ON "_markaziy_kengash_v_version_members_fields" USING btree ("_order");
  CREATE INDEX "_markaziy_kengash_v_version_members_fields_parent_id_idx" ON "_markaziy_kengash_v_version_members_fields" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_markaziy_kengash_v_version_members_fields_locales_locale_pa" ON "_markaziy_kengash_v_version_members_fields_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_markaziy_kengash_v_version_members_fields_locales_paren_idx" ON "_markaziy_kengash_v_version_members_fields_locales" USING btree ("_parent_id");
  CREATE INDEX "_markaziy_kengash_v_version_leaders_edu_order_idx" ON "_markaziy_kengash_v_version_leaders_edu" USING btree ("_order");
  CREATE INDEX "_markaziy_kengash_v_version_leaders_edu_parent_id_idx" ON "_markaziy_kengash_v_version_leaders_edu" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_markaziy_kengash_v_version_leaders_edu_locales_locale_paren" ON "_markaziy_kengash_v_version_leaders_edu_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_markaziy_kengash_v_version_leaders_edu_locales_parent_i_idx" ON "_markaziy_kengash_v_version_leaders_edu_locales" USING btree ("_parent_id");
  CREATE INDEX "_markaziy_kengash_v_version_leaders_career_order_idx" ON "_markaziy_kengash_v_version_leaders_career" USING btree ("_order");
  CREATE INDEX "_markaziy_kengash_v_version_leaders_career_parent_id_idx" ON "_markaziy_kengash_v_version_leaders_career" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_markaziy_kengash_v_version_leaders_career_locales_locale_pa" ON "_markaziy_kengash_v_version_leaders_career_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_markaziy_kengash_v_version_leaders_career_locales_paren_idx" ON "_markaziy_kengash_v_version_leaders_career_locales" USING btree ("_parent_id");
  CREATE INDEX "_markaziy_kengash_v_version_leaders_order_idx" ON "_markaziy_kengash_v_version_leaders" USING btree ("_order");
  CREATE INDEX "_markaziy_kengash_v_version_leaders_parent_id_idx" ON "_markaziy_kengash_v_version_leaders" USING btree ("_parent_id");
  CREATE INDEX "_markaziy_kengash_v_version_leaders_img_idx" ON "_markaziy_kengash_v_version_leaders" USING btree ("img_id");
  CREATE UNIQUE INDEX "_markaziy_kengash_v_version_leaders_locales_locale_parent_id" ON "_markaziy_kengash_v_version_leaders_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_markaziy_kengash_v_version_leaders_locales_parent_id_idx" ON "_markaziy_kengash_v_version_leaders_locales" USING btree ("_parent_id");
  CREATE INDEX "_markaziy_kengash_v_version_bodies_items_order_idx" ON "_markaziy_kengash_v_version_bodies_items" USING btree ("_order");
  CREATE INDEX "_markaziy_kengash_v_version_bodies_items_parent_id_idx" ON "_markaziy_kengash_v_version_bodies_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_markaziy_kengash_v_version_bodies_items_locales_locale_pare" ON "_markaziy_kengash_v_version_bodies_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_markaziy_kengash_v_version_bodies_items_locales_parent__idx" ON "_markaziy_kengash_v_version_bodies_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_markaziy_kengash_v_version_bodies_order_idx" ON "_markaziy_kengash_v_version_bodies" USING btree ("_order");
  CREATE INDEX "_markaziy_kengash_v_version_bodies_parent_id_idx" ON "_markaziy_kengash_v_version_bodies" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_markaziy_kengash_v_version_bodies_locales_locale_parent_id_" ON "_markaziy_kengash_v_version_bodies_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_markaziy_kengash_v_version_bodies_locales_parent_id_idx" ON "_markaziy_kengash_v_version_bodies_locales" USING btree ("_parent_id");
  CREATE INDEX "_markaziy_kengash_v_version_events_order_idx" ON "_markaziy_kengash_v_version_events" USING btree ("_order");
  CREATE INDEX "_markaziy_kengash_v_version_events_parent_id_idx" ON "_markaziy_kengash_v_version_events" USING btree ("_parent_id");
  CREATE INDEX "_markaziy_kengash_v_version_events_img_idx" ON "_markaziy_kengash_v_version_events" USING btree ("img_id");
  CREATE UNIQUE INDEX "_markaziy_kengash_v_version_events_locales_locale_parent_id_" ON "_markaziy_kengash_v_version_events_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_markaziy_kengash_v_version_events_locales_parent_id_idx" ON "_markaziy_kengash_v_version_events_locales" USING btree ("_parent_id");
  CREATE INDEX "_markaziy_kengash_v_version_images_version_images_buildi_idx" ON "_markaziy_kengash_v" USING btree ("version_images_building_id");
  CREATE INDEX "_markaziy_kengash_v_version_images_version_images_delega_idx" ON "_markaziy_kengash_v" USING btree ("version_images_delegates_id");
  CREATE INDEX "_markaziy_kengash_v_created_at_idx" ON "_markaziy_kengash_v" USING btree ("created_at");
  CREATE INDEX "_markaziy_kengash_v_updated_at_idx" ON "_markaziy_kengash_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_markaziy_kengash_v_locales_locale_parent_id_unique" ON "_markaziy_kengash_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_markaziy_kengash_v_locales_parent_id_idx" ON "_markaziy_kengash_v_locales" USING btree ("_parent_id");
  CREATE INDEX "natijalar_report_nums_order_idx" ON "natijalar_report_nums" USING btree ("_order");
  CREATE INDEX "natijalar_report_nums_parent_id_idx" ON "natijalar_report_nums" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "natijalar_report_nums_locales_locale_parent_id_unique" ON "natijalar_report_nums_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "natijalar_report_nums_locales_parent_id_idx" ON "natijalar_report_nums_locales" USING btree ("_parent_id");
  CREATE INDEX "natijalar_years_items_order_idx" ON "natijalar_years_items" USING btree ("_order");
  CREATE INDEX "natijalar_years_items_parent_id_idx" ON "natijalar_years_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "natijalar_years_items_locales_locale_parent_id_unique" ON "natijalar_years_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "natijalar_years_items_locales_parent_id_idx" ON "natijalar_years_items_locales" USING btree ("_parent_id");
  CREATE INDEX "natijalar_years_order_idx" ON "natijalar_years" USING btree ("_order");
  CREATE INDEX "natijalar_years_parent_id_idx" ON "natijalar_years" USING btree ("_parent_id");
  CREATE INDEX "_natijalar_v_version_report_nums_order_idx" ON "_natijalar_v_version_report_nums" USING btree ("_order");
  CREATE INDEX "_natijalar_v_version_report_nums_parent_id_idx" ON "_natijalar_v_version_report_nums" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_natijalar_v_version_report_nums_locales_locale_parent_id_un" ON "_natijalar_v_version_report_nums_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_natijalar_v_version_report_nums_locales_parent_id_idx" ON "_natijalar_v_version_report_nums_locales" USING btree ("_parent_id");
  CREATE INDEX "_natijalar_v_version_years_items_order_idx" ON "_natijalar_v_version_years_items" USING btree ("_order");
  CREATE INDEX "_natijalar_v_version_years_items_parent_id_idx" ON "_natijalar_v_version_years_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_natijalar_v_version_years_items_locales_locale_parent_id_un" ON "_natijalar_v_version_years_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_natijalar_v_version_years_items_locales_parent_id_idx" ON "_natijalar_v_version_years_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_natijalar_v_version_years_order_idx" ON "_natijalar_v_version_years" USING btree ("_order");
  CREATE INDEX "_natijalar_v_version_years_parent_id_idx" ON "_natijalar_v_version_years" USING btree ("_parent_id");
  CREATE INDEX "_natijalar_v_created_at_idx" ON "_natijalar_v" USING btree ("created_at");
  CREATE INDEX "_natijalar_v_updated_at_idx" ON "_natijalar_v" USING btree ("updated_at");
  CREATE INDEX "volontyorlik_sahifa_stats_order_idx" ON "volontyorlik_sahifa_stats" USING btree ("_order");
  CREATE INDEX "volontyorlik_sahifa_stats_parent_id_idx" ON "volontyorlik_sahifa_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "volontyorlik_sahifa_stats_locales_locale_parent_id_unique" ON "volontyorlik_sahifa_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "volontyorlik_sahifa_stats_locales_parent_id_idx" ON "volontyorlik_sahifa_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "volontyorlik_sahifa_steps_order_idx" ON "volontyorlik_sahifa_steps" USING btree ("_order");
  CREATE INDEX "volontyorlik_sahifa_steps_parent_id_idx" ON "volontyorlik_sahifa_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "volontyorlik_sahifa_steps_locales_locale_parent_id_unique" ON "volontyorlik_sahifa_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "volontyorlik_sahifa_steps_locales_parent_id_idx" ON "volontyorlik_sahifa_steps_locales" USING btree ("_parent_id");
  CREATE INDEX "volontyorlik_sahifa_times_order_idx" ON "volontyorlik_sahifa_times" USING btree ("_order");
  CREATE INDEX "volontyorlik_sahifa_times_parent_id_idx" ON "volontyorlik_sahifa_times" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "volontyorlik_sahifa_times_locales_locale_parent_id_unique" ON "volontyorlik_sahifa_times_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "volontyorlik_sahifa_times_locales_parent_id_idx" ON "volontyorlik_sahifa_times_locales" USING btree ("_parent_id");
  CREATE INDEX "volontyorlik_sahifa_rights_order_idx" ON "volontyorlik_sahifa_rights" USING btree ("_order");
  CREATE INDEX "volontyorlik_sahifa_rights_parent_id_idx" ON "volontyorlik_sahifa_rights" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "volontyorlik_sahifa_rights_locales_locale_parent_id_unique" ON "volontyorlik_sahifa_rights_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "volontyorlik_sahifa_rights_locales_parent_id_idx" ON "volontyorlik_sahifa_rights_locales" USING btree ("_parent_id");
  CREATE INDEX "volontyorlik_sahifa_duties_order_idx" ON "volontyorlik_sahifa_duties" USING btree ("_order");
  CREATE INDEX "volontyorlik_sahifa_duties_parent_id_idx" ON "volontyorlik_sahifa_duties" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "volontyorlik_sahifa_duties_locales_locale_parent_id_unique" ON "volontyorlik_sahifa_duties_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "volontyorlik_sahifa_duties_locales_parent_id_idx" ON "volontyorlik_sahifa_duties_locales" USING btree ("_parent_id");
  CREATE INDEX "volontyorlik_sahifa_quiz_a_order_idx" ON "volontyorlik_sahifa_quiz_a" USING btree ("_order");
  CREATE INDEX "volontyorlik_sahifa_quiz_a_parent_id_idx" ON "volontyorlik_sahifa_quiz_a" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "volontyorlik_sahifa_quiz_a_locales_locale_parent_id_unique" ON "volontyorlik_sahifa_quiz_a_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "volontyorlik_sahifa_quiz_a_locales_parent_id_idx" ON "volontyorlik_sahifa_quiz_a_locales" USING btree ("_parent_id");
  CREATE INDEX "volontyorlik_sahifa_quiz_order_idx" ON "volontyorlik_sahifa_quiz" USING btree ("_order");
  CREATE INDEX "volontyorlik_sahifa_quiz_parent_id_idx" ON "volontyorlik_sahifa_quiz" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "volontyorlik_sahifa_quiz_locales_locale_parent_id_unique" ON "volontyorlik_sahifa_quiz_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "volontyorlik_sahifa_quiz_locales_parent_id_idx" ON "volontyorlik_sahifa_quiz_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "volontyorlik_sahifa_locales_locale_parent_id_unique" ON "volontyorlik_sahifa_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "volontyorlik_sahifa_locales_parent_id_idx" ON "volontyorlik_sahifa_locales" USING btree ("_parent_id");
  CREATE INDEX "volontyorlik_sahifa_rels_order_idx" ON "volontyorlik_sahifa_rels" USING btree ("order");
  CREATE INDEX "volontyorlik_sahifa_rels_parent_idx" ON "volontyorlik_sahifa_rels" USING btree ("parent_id");
  CREATE INDEX "volontyorlik_sahifa_rels_path_idx" ON "volontyorlik_sahifa_rels" USING btree ("path");
  CREATE INDEX "volontyorlik_sahifa_rels_vol_directions_id_idx" ON "volontyorlik_sahifa_rels" USING btree ("vol_directions_id");
  CREATE INDEX "_volontyorlik_sahifa_v_version_stats_order_idx" ON "_volontyorlik_sahifa_v_version_stats" USING btree ("_order");
  CREATE INDEX "_volontyorlik_sahifa_v_version_stats_parent_id_idx" ON "_volontyorlik_sahifa_v_version_stats" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_volontyorlik_sahifa_v_version_stats_locales_locale_parent_i" ON "_volontyorlik_sahifa_v_version_stats_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_volontyorlik_sahifa_v_version_stats_locales_parent_id_idx" ON "_volontyorlik_sahifa_v_version_stats_locales" USING btree ("_parent_id");
  CREATE INDEX "_volontyorlik_sahifa_v_version_steps_order_idx" ON "_volontyorlik_sahifa_v_version_steps" USING btree ("_order");
  CREATE INDEX "_volontyorlik_sahifa_v_version_steps_parent_id_idx" ON "_volontyorlik_sahifa_v_version_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_volontyorlik_sahifa_v_version_steps_locales_locale_parent_i" ON "_volontyorlik_sahifa_v_version_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_volontyorlik_sahifa_v_version_steps_locales_parent_id_idx" ON "_volontyorlik_sahifa_v_version_steps_locales" USING btree ("_parent_id");
  CREATE INDEX "_volontyorlik_sahifa_v_version_times_order_idx" ON "_volontyorlik_sahifa_v_version_times" USING btree ("_order");
  CREATE INDEX "_volontyorlik_sahifa_v_version_times_parent_id_idx" ON "_volontyorlik_sahifa_v_version_times" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_volontyorlik_sahifa_v_version_times_locales_locale_parent_i" ON "_volontyorlik_sahifa_v_version_times_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_volontyorlik_sahifa_v_version_times_locales_parent_id_idx" ON "_volontyorlik_sahifa_v_version_times_locales" USING btree ("_parent_id");
  CREATE INDEX "_volontyorlik_sahifa_v_version_rights_order_idx" ON "_volontyorlik_sahifa_v_version_rights" USING btree ("_order");
  CREATE INDEX "_volontyorlik_sahifa_v_version_rights_parent_id_idx" ON "_volontyorlik_sahifa_v_version_rights" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_volontyorlik_sahifa_v_version_rights_locales_locale_parent_" ON "_volontyorlik_sahifa_v_version_rights_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_volontyorlik_sahifa_v_version_rights_locales_parent_id_idx" ON "_volontyorlik_sahifa_v_version_rights_locales" USING btree ("_parent_id");
  CREATE INDEX "_volontyorlik_sahifa_v_version_duties_order_idx" ON "_volontyorlik_sahifa_v_version_duties" USING btree ("_order");
  CREATE INDEX "_volontyorlik_sahifa_v_version_duties_parent_id_idx" ON "_volontyorlik_sahifa_v_version_duties" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_volontyorlik_sahifa_v_version_duties_locales_locale_parent_" ON "_volontyorlik_sahifa_v_version_duties_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_volontyorlik_sahifa_v_version_duties_locales_parent_id_idx" ON "_volontyorlik_sahifa_v_version_duties_locales" USING btree ("_parent_id");
  CREATE INDEX "_volontyorlik_sahifa_v_version_quiz_a_order_idx" ON "_volontyorlik_sahifa_v_version_quiz_a" USING btree ("_order");
  CREATE INDEX "_volontyorlik_sahifa_v_version_quiz_a_parent_id_idx" ON "_volontyorlik_sahifa_v_version_quiz_a" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_volontyorlik_sahifa_v_version_quiz_a_locales_locale_parent_" ON "_volontyorlik_sahifa_v_version_quiz_a_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_volontyorlik_sahifa_v_version_quiz_a_locales_parent_id_idx" ON "_volontyorlik_sahifa_v_version_quiz_a_locales" USING btree ("_parent_id");
  CREATE INDEX "_volontyorlik_sahifa_v_version_quiz_order_idx" ON "_volontyorlik_sahifa_v_version_quiz" USING btree ("_order");
  CREATE INDEX "_volontyorlik_sahifa_v_version_quiz_parent_id_idx" ON "_volontyorlik_sahifa_v_version_quiz" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_volontyorlik_sahifa_v_version_quiz_locales_locale_parent_id" ON "_volontyorlik_sahifa_v_version_quiz_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_volontyorlik_sahifa_v_version_quiz_locales_parent_id_idx" ON "_volontyorlik_sahifa_v_version_quiz_locales" USING btree ("_parent_id");
  CREATE INDEX "_volontyorlik_sahifa_v_created_at_idx" ON "_volontyorlik_sahifa_v" USING btree ("created_at");
  CREATE INDEX "_volontyorlik_sahifa_v_updated_at_idx" ON "_volontyorlik_sahifa_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_volontyorlik_sahifa_v_locales_locale_parent_id_unique" ON "_volontyorlik_sahifa_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_volontyorlik_sahifa_v_locales_parent_id_idx" ON "_volontyorlik_sahifa_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_volontyorlik_sahifa_v_rels_order_idx" ON "_volontyorlik_sahifa_v_rels" USING btree ("order");
  CREATE INDEX "_volontyorlik_sahifa_v_rels_parent_idx" ON "_volontyorlik_sahifa_v_rels" USING btree ("parent_id");
  CREATE INDEX "_volontyorlik_sahifa_v_rels_path_idx" ON "_volontyorlik_sahifa_v_rels" USING btree ("path");
  CREATE INDEX "_volontyorlik_sahifa_v_rels_vol_directions_id_idx" ON "_volontyorlik_sahifa_v_rels" USING btree ("vol_directions_id");
  CREATE INDEX "aloqa_phones_order_idx" ON "aloqa_phones" USING btree ("_order");
  CREATE INDEX "aloqa_phones_parent_id_idx" ON "aloqa_phones" USING btree ("_parent_id");
  CREATE INDEX "aloqa_emails_order_idx" ON "aloqa_emails" USING btree ("_order");
  CREATE INDEX "aloqa_emails_parent_id_idx" ON "aloqa_emails" USING btree ("_parent_id");
  CREATE INDEX "aloqa_socials_order_idx" ON "aloqa_socials" USING btree ("_order");
  CREATE INDEX "aloqa_socials_parent_id_idx" ON "aloqa_socials" USING btree ("_parent_id");
  CREATE INDEX "aloqa_law_terms_order_idx" ON "aloqa_law_terms" USING btree ("_order");
  CREATE INDEX "aloqa_law_terms_parent_id_idx" ON "aloqa_law_terms" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "aloqa_law_terms_locales_locale_parent_id_unique" ON "aloqa_law_terms_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "aloqa_law_terms_locales_parent_id_idx" ON "aloqa_law_terms_locales" USING btree ("_parent_id");
  CREATE INDEX "aloqa_law_types_order_idx" ON "aloqa_law_types" USING btree ("_order");
  CREATE INDEX "aloqa_law_types_parent_id_idx" ON "aloqa_law_types" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "aloqa_law_types_locales_locale_parent_id_unique" ON "aloqa_law_types_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "aloqa_law_types_locales_parent_id_idx" ON "aloqa_law_types_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "aloqa_locales_locale_parent_id_unique" ON "aloqa_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "aloqa_locales_parent_id_idx" ON "aloqa_locales" USING btree ("_parent_id");
  CREATE INDEX "_aloqa_v_version_phones_order_idx" ON "_aloqa_v_version_phones" USING btree ("_order");
  CREATE INDEX "_aloqa_v_version_phones_parent_id_idx" ON "_aloqa_v_version_phones" USING btree ("_parent_id");
  CREATE INDEX "_aloqa_v_version_emails_order_idx" ON "_aloqa_v_version_emails" USING btree ("_order");
  CREATE INDEX "_aloqa_v_version_emails_parent_id_idx" ON "_aloqa_v_version_emails" USING btree ("_parent_id");
  CREATE INDEX "_aloqa_v_version_socials_order_idx" ON "_aloqa_v_version_socials" USING btree ("_order");
  CREATE INDEX "_aloqa_v_version_socials_parent_id_idx" ON "_aloqa_v_version_socials" USING btree ("_parent_id");
  CREATE INDEX "_aloqa_v_version_law_terms_order_idx" ON "_aloqa_v_version_law_terms" USING btree ("_order");
  CREATE INDEX "_aloqa_v_version_law_terms_parent_id_idx" ON "_aloqa_v_version_law_terms" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_aloqa_v_version_law_terms_locales_locale_parent_id_unique" ON "_aloqa_v_version_law_terms_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_aloqa_v_version_law_terms_locales_parent_id_idx" ON "_aloqa_v_version_law_terms_locales" USING btree ("_parent_id");
  CREATE INDEX "_aloqa_v_version_law_types_order_idx" ON "_aloqa_v_version_law_types" USING btree ("_order");
  CREATE INDEX "_aloqa_v_version_law_types_parent_id_idx" ON "_aloqa_v_version_law_types" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_aloqa_v_version_law_types_locales_locale_parent_id_unique" ON "_aloqa_v_version_law_types_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_aloqa_v_version_law_types_locales_parent_id_idx" ON "_aloqa_v_version_law_types_locales" USING btree ("_parent_id");
  CREATE INDEX "_aloqa_v_created_at_idx" ON "_aloqa_v" USING btree ("created_at");
  CREATE INDEX "_aloqa_v_updated_at_idx" ON "_aloqa_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_aloqa_v_locales_locale_parent_id_unique" ON "_aloqa_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_aloqa_v_locales_parent_id_idx" ON "_aloqa_v_locales" USING btree ("_parent_id");
  CREATE INDEX "azolik_sahifa_conditions_order_idx" ON "azolik_sahifa_conditions" USING btree ("_order");
  CREATE INDEX "azolik_sahifa_conditions_parent_id_idx" ON "azolik_sahifa_conditions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "azolik_sahifa_conditions_locales_locale_parent_id_unique" ON "azolik_sahifa_conditions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "azolik_sahifa_conditions_locales_parent_id_idx" ON "azolik_sahifa_conditions_locales" USING btree ("_parent_id");
  CREATE INDEX "azolik_sahifa_steps_order_idx" ON "azolik_sahifa_steps" USING btree ("_order");
  CREATE INDEX "azolik_sahifa_steps_parent_id_idx" ON "azolik_sahifa_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "azolik_sahifa_steps_locales_locale_parent_id_unique" ON "azolik_sahifa_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "azolik_sahifa_steps_locales_parent_id_idx" ON "azolik_sahifa_steps_locales" USING btree ("_parent_id");
  CREATE INDEX "azolik_sahifa_after_order_idx" ON "azolik_sahifa_after" USING btree ("_order");
  CREATE INDEX "azolik_sahifa_after_parent_id_idx" ON "azolik_sahifa_after" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "azolik_sahifa_after_locales_locale_parent_id_unique" ON "azolik_sahifa_after_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "azolik_sahifa_after_locales_parent_id_idx" ON "azolik_sahifa_after_locales" USING btree ("_parent_id");
  CREATE INDEX "_azolik_sahifa_v_version_conditions_order_idx" ON "_azolik_sahifa_v_version_conditions" USING btree ("_order");
  CREATE INDEX "_azolik_sahifa_v_version_conditions_parent_id_idx" ON "_azolik_sahifa_v_version_conditions" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_azolik_sahifa_v_version_conditions_locales_locale_parent_id" ON "_azolik_sahifa_v_version_conditions_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_azolik_sahifa_v_version_conditions_locales_parent_id_idx" ON "_azolik_sahifa_v_version_conditions_locales" USING btree ("_parent_id");
  CREATE INDEX "_azolik_sahifa_v_version_steps_order_idx" ON "_azolik_sahifa_v_version_steps" USING btree ("_order");
  CREATE INDEX "_azolik_sahifa_v_version_steps_parent_id_idx" ON "_azolik_sahifa_v_version_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_azolik_sahifa_v_version_steps_locales_locale_parent_id_uniq" ON "_azolik_sahifa_v_version_steps_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_azolik_sahifa_v_version_steps_locales_parent_id_idx" ON "_azolik_sahifa_v_version_steps_locales" USING btree ("_parent_id");
  CREATE INDEX "_azolik_sahifa_v_version_after_order_idx" ON "_azolik_sahifa_v_version_after" USING btree ("_order");
  CREATE INDEX "_azolik_sahifa_v_version_after_parent_id_idx" ON "_azolik_sahifa_v_version_after" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_azolik_sahifa_v_version_after_locales_locale_parent_id_uniq" ON "_azolik_sahifa_v_version_after_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_azolik_sahifa_v_version_after_locales_parent_id_idx" ON "_azolik_sahifa_v_version_after_locales" USING btree ("_parent_id");
  CREATE INDEX "_azolik_sahifa_v_created_at_idx" ON "_azolik_sahifa_v" USING btree ("created_at");
  CREATE INDEX "_azolik_sahifa_v_updated_at_idx" ON "_azolik_sahifa_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "miqdorlar_locales_locale_parent_id_unique" ON "miqdorlar_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "miqdorlar_locales_parent_id_idx" ON "miqdorlar_locales" USING btree ("_parent_id");
  CREATE INDEX "_miqdorlar_v_created_at_idx" ON "_miqdorlar_v" USING btree ("created_at");
  CREATE INDEX "_miqdorlar_v_updated_at_idx" ON "_miqdorlar_v" USING btree ("updated_at");
  CREATE UNIQUE INDEX "_miqdorlar_v_locales_locale_parent_id_unique" ON "_miqdorlar_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_miqdorlar_v_locales_parent_id_idx" ON "_miqdorlar_v_locales" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "otts_leader_achievements" CASCADE;
  DROP TABLE "otts_leader_achievements_locales" CASCADE;
  DROP TABLE "otts" CASCADE;
  DROP TABLE "otts_locales" CASCADE;
  DROP TABLE "partners_dirs" CASCADE;
  DROP TABLE "partners" CASCADE;
  DROP TABLE "partners_locales" CASCADE;
  DROP TABLE "departments_tasks" CASCADE;
  DROP TABLE "departments_tasks_locales" CASCADE;
  DROP TABLE "departments" CASCADE;
  DROP TABLE "departments_locales" CASCADE;
  DROP TABLE "staff_duties" CASCADE;
  DROP TABLE "staff_duties_locales" CASCADE;
  DROP TABLE "staff_socials" CASCADE;
  DROP TABLE "staff" CASCADE;
  DROP TABLE "staff_locales" CASCADE;
  DROP TABLE "directions" CASCADE;
  DROP TABLE "directions_locales" CASCADE;
  DROP TABLE "projects_partners" CASCADE;
  DROP TABLE "projects_partners_locales" CASCADE;
  DROP TABLE "projects_results" CASCADE;
  DROP TABLE "projects_results_locales" CASCADE;
  DROP TABLE "projects_milestones" CASCADE;
  DROP TABLE "projects_milestones_locales" CASCADE;
  DROP TABLE "projects_posts" CASCADE;
  DROP TABLE "projects" CASCADE;
  DROP TABLE "projects_locales" CASCADE;
  DROP TABLE "projects_rels" CASCADE;
  DROP TABLE "_projects_v_version_partners" CASCADE;
  DROP TABLE "_projects_v_version_partners_locales" CASCADE;
  DROP TABLE "_projects_v_version_results" CASCADE;
  DROP TABLE "_projects_v_version_results_locales" CASCADE;
  DROP TABLE "_projects_v_version_milestones" CASCADE;
  DROP TABLE "_projects_v_version_milestones_locales" CASCADE;
  DROP TABLE "_projects_v_version_posts" CASCADE;
  DROP TABLE "_projects_v" CASCADE;
  DROP TABLE "_projects_v_locales" CASCADE;
  DROP TABLE "_projects_v_rels" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "events_locales" CASCADE;
  DROP TABLE "grants" CASCADE;
  DROP TABLE "grants_locales" CASCADE;
  DROP TABLE "stipends_rates" CASCADE;
  DROP TABLE "stipends_rates_locales" CASCADE;
  DROP TABLE "stipends" CASCADE;
  DROP TABLE "stipends_locales" CASCADE;
  DROP TABLE "contests" CASCADE;
  DROP TABLE "contests_locales" CASCADE;
  DROP TABLE "awards_timeline" CASCADE;
  DROP TABLE "awards_timeline_locales" CASCADE;
  DROP TABLE "awards" CASCADE;
  DROP TABLE "awards_locales" CASCADE;
  DROP TABLE "benefits" CASCADE;
  DROP TABLE "benefits_locales" CASCADE;
  DROP TABLE "vol_directions_tasks" CASCADE;
  DROP TABLE "vol_directions_tasks_locales" CASCADE;
  DROP TABLE "vol_directions" CASCADE;
  DROP TABLE "vol_directions_locales" CASCADE;
  DROP TABLE "news" CASCADE;
  DROP TABLE "news_locales" CASCADE;
  DROP TABLE "news_texts" CASCADE;
  DROP TABLE "news_rels" CASCADE;
  DROP TABLE "_news_v" CASCADE;
  DROP TABLE "_news_v_locales" CASCADE;
  DROP TABLE "_news_v_texts" CASCADE;
  DROP TABLE "_news_v_rels" CASCADE;
  DROP TABLE "authors" CASCADE;
  DROP TABLE "authors_locales" CASCADE;
  DROP TABLE "news_ratings" CASCADE;
  DROP TABLE "news_reactions" CASCADE;
  DROP TABLE "act_groups" CASCADE;
  DROP TABLE "act_groups_locales" CASCADE;
  DROP TABLE "acts_for" CASCADE;
  DROP TABLE "acts" CASCADE;
  DROP TABLE "acts_locales" CASCADE;
  DROP TABLE "kengash_docs" CASCADE;
  DROP TABLE "kengash_docs_locales" CASCADE;
  DROP TABLE "templates" CASCADE;
  DROP TABLE "templates_locales" CASCADE;
  DROP TABLE "press_body" CASCADE;
  DROP TABLE "press_body_locales" CASCADE;
  DROP TABLE "press_facts" CASCADE;
  DROP TABLE "press_facts_locales" CASCADE;
  DROP TABLE "press" CASCADE;
  DROP TABLE "press_locales" CASCADE;
  DROP TABLE "_press_v_version_body" CASCADE;
  DROP TABLE "_press_v_version_body_locales" CASCADE;
  DROP TABLE "_press_v_version_facts" CASCADE;
  DROP TABLE "_press_v_version_facts_locales" CASCADE;
  DROP TABLE "_press_v" CASCADE;
  DROP TABLE "_press_v_locales" CASCADE;
  DROP TABLE "albums" CASCADE;
  DROP TABLE "albums_locales" CASCADE;
  DROP TABLE "albums_rels" CASCADE;
  DROP TABLE "videos" CASCADE;
  DROP TABLE "videos_locales" CASCADE;
  DROP TABLE "oav" CASCADE;
  DROP TABLE "oav_locales" CASCADE;
  DROP TABLE "faqs_a" CASCADE;
  DROP TABLE "faqs_a_locales" CASCADE;
  DROP TABLE "faqs_li" CASCADE;
  DROP TABLE "faqs_li_locales" CASCADE;
  DROP TABLE "faqs" CASCADE;
  DROP TABLE "faqs_locales" CASCADE;
  DROP TABLE "appeals" CASCADE;
  DROP TABLE "appeal_files" CASCADE;
  DROP TABLE "memberships" CASCADE;
  DROP TABLE "volunteers" CASCADE;
  DROP TABLE "text_errors" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "files" CASCADE;
  DROP TABLE "files_locales" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_folders_folder_type" CASCADE;
  DROP TABLE "payload_folders" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "bosh_sahifa_benefits_roles_items" CASCADE;
  DROP TABLE "bosh_sahifa_benefits_roles_items_locales" CASCADE;
  DROP TABLE "bosh_sahifa_benefits_roles" CASCADE;
  DROP TABLE "bosh_sahifa_benefits_roles_locales" CASCADE;
  DROP TABLE "bosh_sahifa_cta_steps" CASCADE;
  DROP TABLE "bosh_sahifa_cta_steps_locales" CASCADE;
  DROP TABLE "bosh_sahifa" CASCADE;
  DROP TABLE "bosh_sahifa_locales" CASCADE;
  DROP TABLE "_bosh_sahifa_v_version_benefits_roles_items" CASCADE;
  DROP TABLE "_bosh_sahifa_v_version_benefits_roles_items_locales" CASCADE;
  DROP TABLE "_bosh_sahifa_v_version_benefits_roles" CASCADE;
  DROP TABLE "_bosh_sahifa_v_version_benefits_roles_locales" CASCADE;
  DROP TABLE "_bosh_sahifa_v_version_cta_steps" CASCADE;
  DROP TABLE "_bosh_sahifa_v_version_cta_steps_locales" CASCADE;
  DROP TABLE "_bosh_sahifa_v" CASCADE;
  DROP TABLE "_bosh_sahifa_v_locales" CASCADE;
  DROP TABLE "ittifoq_sahifa_who_paras" CASCADE;
  DROP TABLE "ittifoq_sahifa_who_paras_locales" CASCADE;
  DROP TABLE "ittifoq_sahifa_stats" CASCADE;
  DROP TABLE "ittifoq_sahifa_stats_locales" CASCADE;
  DROP TABLE "ittifoq_sahifa_more_stats" CASCADE;
  DROP TABLE "ittifoq_sahifa_more_stats_locales" CASCADE;
  DROP TABLE "ittifoq_sahifa_history" CASCADE;
  DROP TABLE "ittifoq_sahifa_history_locales" CASCADE;
  DROP TABLE "ittifoq_sahifa_privileges" CASCADE;
  DROP TABLE "ittifoq_sahifa_privileges_locales" CASCADE;
  DROP TABLE "ittifoq_sahifa_intl_facts" CASCADE;
  DROP TABLE "ittifoq_sahifa_intl_facts_locales" CASCADE;
  DROP TABLE "ittifoq_sahifa_intl_forms" CASCADE;
  DROP TABLE "ittifoq_sahifa_intl_forms_locales" CASCADE;
  DROP TABLE "ittifoq_sahifa_intl_projects" CASCADE;
  DROP TABLE "ittifoq_sahifa_intl_projects_locales" CASCADE;
  DROP TABLE "ittifoq_sahifa_palace_features" CASCADE;
  DROP TABLE "ittifoq_sahifa_palace_features_locales" CASCADE;
  DROP TABLE "ittifoq_sahifa_city_centre_facts" CASCADE;
  DROP TABLE "ittifoq_sahifa_city_centre_facts_locales" CASCADE;
  DROP TABLE "ittifoq_sahifa_centres" CASCADE;
  DROP TABLE "ittifoq_sahifa_centres_locales" CASCADE;
  DROP TABLE "ittifoq_sahifa_structure_qurultoy_meta" CASCADE;
  DROP TABLE "ittifoq_sahifa_structure_qurultoy_meta_locales" CASCADE;
  DROP TABLE "ittifoq_sahifa_structure_council_meta" CASCADE;
  DROP TABLE "ittifoq_sahifa_structure_council_meta_locales" CASCADE;
  DROP TABLE "ittifoq_sahifa_structure_chair_meta" CASCADE;
  DROP TABLE "ittifoq_sahifa_structure_chair_meta_locales" CASCADE;
  DROP TABLE "ittifoq_sahifa_structure_exec_meta" CASCADE;
  DROP TABLE "ittifoq_sahifa_structure_exec_meta_locales" CASCADE;
  DROP TABLE "ittifoq_sahifa_structure_audit_meta" CASCADE;
  DROP TABLE "ittifoq_sahifa_structure_audit_meta_locales" CASCADE;
  DROP TABLE "ittifoq_sahifa_structure_levels_meta" CASCADE;
  DROP TABLE "ittifoq_sahifa_structure_levels_meta_locales" CASCADE;
  DROP TABLE "ittifoq_sahifa_structure_levels" CASCADE;
  DROP TABLE "ittifoq_sahifa_structure_levels_locales" CASCADE;
  DROP TABLE "ittifoq_sahifa_structure_principles" CASCADE;
  DROP TABLE "ittifoq_sahifa_structure_principles_locales" CASCADE;
  DROP TABLE "ittifoq_sahifa_official" CASCADE;
  DROP TABLE "ittifoq_sahifa_official_locales" CASCADE;
  DROP TABLE "ittifoq_sahifa_priorities" CASCADE;
  DROP TABLE "ittifoq_sahifa_priorities_locales" CASCADE;
  DROP TABLE "ittifoq_sahifa_join_steps" CASCADE;
  DROP TABLE "ittifoq_sahifa_join_steps_locales" CASCADE;
  DROP TABLE "ittifoq_sahifa_join_rights" CASCADE;
  DROP TABLE "ittifoq_sahifa_join_rights_locales" CASCADE;
  DROP TABLE "ittifoq_sahifa_join_duties" CASCADE;
  DROP TABLE "ittifoq_sahifa_join_duties_locales" CASCADE;
  DROP TABLE "ittifoq_sahifa_join_ends" CASCADE;
  DROP TABLE "ittifoq_sahifa_join_ends_locales" CASCADE;
  DROP TABLE "ittifoq_sahifa_orgs_ngos" CASCADE;
  DROP TABLE "ittifoq_sahifa_orgs_ngos_locales" CASCADE;
  DROP TABLE "ittifoq_sahifa_orgs_companies" CASCADE;
  DROP TABLE "ittifoq_sahifa_orgs_companies_locales" CASCADE;
  DROP TABLE "ittifoq_sahifa_companies" CASCADE;
  DROP TABLE "ittifoq_sahifa_companies_locales" CASCADE;
  DROP TABLE "ittifoq_sahifa" CASCADE;
  DROP TABLE "ittifoq_sahifa_locales" CASCADE;
  DROP TABLE "ittifoq_sahifa_rels" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_who_paras" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_who_paras_locales" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_stats" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_stats_locales" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_more_stats" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_more_stats_locales" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_history" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_history_locales" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_privileges" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_privileges_locales" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_intl_facts" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_intl_facts_locales" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_intl_forms" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_intl_forms_locales" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_intl_projects" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_intl_projects_locales" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_palace_features" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_palace_features_locales" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_city_centre_facts" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_city_centre_facts_locales" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_centres" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_centres_locales" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_structure_qurultoy_meta" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_structure_qurultoy_meta_locales" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_structure_council_meta" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_structure_council_meta_locales" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_structure_chair_meta" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_structure_chair_meta_locales" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_structure_exec_meta" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_structure_exec_meta_locales" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_structure_audit_meta" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_structure_audit_meta_locales" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_structure_levels_meta" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_structure_levels_meta_locales" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_structure_levels" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_structure_levels_locales" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_structure_principles" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_structure_principles_locales" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_official" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_official_locales" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_priorities" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_priorities_locales" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_join_steps" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_join_steps_locales" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_join_rights" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_join_rights_locales" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_join_duties" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_join_duties_locales" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_join_ends" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_join_ends_locales" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_orgs_ngos" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_orgs_ngos_locales" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_orgs_companies" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_orgs_companies_locales" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_companies" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_version_companies_locales" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_locales" CASCADE;
  DROP TABLE "_ittifoq_sahifa_v_rels" CASCADE;
  DROP TABLE "markaziy_kengash_about_paras" CASCADE;
  DROP TABLE "markaziy_kengash_about_paras_locales" CASCADE;
  DROP TABLE "markaziy_kengash_stats" CASCADE;
  DROP TABLE "markaziy_kengash_stats_locales" CASCADE;
  DROP TABLE "markaziy_kengash_organs" CASCADE;
  DROP TABLE "markaziy_kengash_organs_locales" CASCADE;
  DROP TABLE "markaziy_kengash_powers" CASCADE;
  DROP TABLE "markaziy_kengash_powers_locales" CASCADE;
  DROP TABLE "markaziy_kengash_members_facts" CASCADE;
  DROP TABLE "markaziy_kengash_members_facts_locales" CASCADE;
  DROP TABLE "markaziy_kengash_members_by_post" CASCADE;
  DROP TABLE "markaziy_kengash_members_by_post_locales" CASCADE;
  DROP TABLE "markaziy_kengash_members_fields" CASCADE;
  DROP TABLE "markaziy_kengash_members_fields_locales" CASCADE;
  DROP TABLE "markaziy_kengash_leaders_edu" CASCADE;
  DROP TABLE "markaziy_kengash_leaders_edu_locales" CASCADE;
  DROP TABLE "markaziy_kengash_leaders_career" CASCADE;
  DROP TABLE "markaziy_kengash_leaders_career_locales" CASCADE;
  DROP TABLE "markaziy_kengash_leaders" CASCADE;
  DROP TABLE "markaziy_kengash_leaders_locales" CASCADE;
  DROP TABLE "markaziy_kengash_bodies_items" CASCADE;
  DROP TABLE "markaziy_kengash_bodies_items_locales" CASCADE;
  DROP TABLE "markaziy_kengash_bodies" CASCADE;
  DROP TABLE "markaziy_kengash_bodies_locales" CASCADE;
  DROP TABLE "markaziy_kengash_events" CASCADE;
  DROP TABLE "markaziy_kengash_events_locales" CASCADE;
  DROP TABLE "markaziy_kengash" CASCADE;
  DROP TABLE "markaziy_kengash_locales" CASCADE;
  DROP TABLE "_markaziy_kengash_v_version_about_paras" CASCADE;
  DROP TABLE "_markaziy_kengash_v_version_about_paras_locales" CASCADE;
  DROP TABLE "_markaziy_kengash_v_version_stats" CASCADE;
  DROP TABLE "_markaziy_kengash_v_version_stats_locales" CASCADE;
  DROP TABLE "_markaziy_kengash_v_version_organs" CASCADE;
  DROP TABLE "_markaziy_kengash_v_version_organs_locales" CASCADE;
  DROP TABLE "_markaziy_kengash_v_version_powers" CASCADE;
  DROP TABLE "_markaziy_kengash_v_version_powers_locales" CASCADE;
  DROP TABLE "_markaziy_kengash_v_version_members_facts" CASCADE;
  DROP TABLE "_markaziy_kengash_v_version_members_facts_locales" CASCADE;
  DROP TABLE "_markaziy_kengash_v_version_members_by_post" CASCADE;
  DROP TABLE "_markaziy_kengash_v_version_members_by_post_locales" CASCADE;
  DROP TABLE "_markaziy_kengash_v_version_members_fields" CASCADE;
  DROP TABLE "_markaziy_kengash_v_version_members_fields_locales" CASCADE;
  DROP TABLE "_markaziy_kengash_v_version_leaders_edu" CASCADE;
  DROP TABLE "_markaziy_kengash_v_version_leaders_edu_locales" CASCADE;
  DROP TABLE "_markaziy_kengash_v_version_leaders_career" CASCADE;
  DROP TABLE "_markaziy_kengash_v_version_leaders_career_locales" CASCADE;
  DROP TABLE "_markaziy_kengash_v_version_leaders" CASCADE;
  DROP TABLE "_markaziy_kengash_v_version_leaders_locales" CASCADE;
  DROP TABLE "_markaziy_kengash_v_version_bodies_items" CASCADE;
  DROP TABLE "_markaziy_kengash_v_version_bodies_items_locales" CASCADE;
  DROP TABLE "_markaziy_kengash_v_version_bodies" CASCADE;
  DROP TABLE "_markaziy_kengash_v_version_bodies_locales" CASCADE;
  DROP TABLE "_markaziy_kengash_v_version_events" CASCADE;
  DROP TABLE "_markaziy_kengash_v_version_events_locales" CASCADE;
  DROP TABLE "_markaziy_kengash_v" CASCADE;
  DROP TABLE "_markaziy_kengash_v_locales" CASCADE;
  DROP TABLE "natijalar_report_nums" CASCADE;
  DROP TABLE "natijalar_report_nums_locales" CASCADE;
  DROP TABLE "natijalar_years_items" CASCADE;
  DROP TABLE "natijalar_years_items_locales" CASCADE;
  DROP TABLE "natijalar_years" CASCADE;
  DROP TABLE "natijalar" CASCADE;
  DROP TABLE "_natijalar_v_version_report_nums" CASCADE;
  DROP TABLE "_natijalar_v_version_report_nums_locales" CASCADE;
  DROP TABLE "_natijalar_v_version_years_items" CASCADE;
  DROP TABLE "_natijalar_v_version_years_items_locales" CASCADE;
  DROP TABLE "_natijalar_v_version_years" CASCADE;
  DROP TABLE "_natijalar_v" CASCADE;
  DROP TABLE "volontyorlik_sahifa_stats" CASCADE;
  DROP TABLE "volontyorlik_sahifa_stats_locales" CASCADE;
  DROP TABLE "volontyorlik_sahifa_steps" CASCADE;
  DROP TABLE "volontyorlik_sahifa_steps_locales" CASCADE;
  DROP TABLE "volontyorlik_sahifa_times" CASCADE;
  DROP TABLE "volontyorlik_sahifa_times_locales" CASCADE;
  DROP TABLE "volontyorlik_sahifa_rights" CASCADE;
  DROP TABLE "volontyorlik_sahifa_rights_locales" CASCADE;
  DROP TABLE "volontyorlik_sahifa_duties" CASCADE;
  DROP TABLE "volontyorlik_sahifa_duties_locales" CASCADE;
  DROP TABLE "volontyorlik_sahifa_quiz_a" CASCADE;
  DROP TABLE "volontyorlik_sahifa_quiz_a_locales" CASCADE;
  DROP TABLE "volontyorlik_sahifa_quiz" CASCADE;
  DROP TABLE "volontyorlik_sahifa_quiz_locales" CASCADE;
  DROP TABLE "volontyorlik_sahifa" CASCADE;
  DROP TABLE "volontyorlik_sahifa_locales" CASCADE;
  DROP TABLE "volontyorlik_sahifa_rels" CASCADE;
  DROP TABLE "_volontyorlik_sahifa_v_version_stats" CASCADE;
  DROP TABLE "_volontyorlik_sahifa_v_version_stats_locales" CASCADE;
  DROP TABLE "_volontyorlik_sahifa_v_version_steps" CASCADE;
  DROP TABLE "_volontyorlik_sahifa_v_version_steps_locales" CASCADE;
  DROP TABLE "_volontyorlik_sahifa_v_version_times" CASCADE;
  DROP TABLE "_volontyorlik_sahifa_v_version_times_locales" CASCADE;
  DROP TABLE "_volontyorlik_sahifa_v_version_rights" CASCADE;
  DROP TABLE "_volontyorlik_sahifa_v_version_rights_locales" CASCADE;
  DROP TABLE "_volontyorlik_sahifa_v_version_duties" CASCADE;
  DROP TABLE "_volontyorlik_sahifa_v_version_duties_locales" CASCADE;
  DROP TABLE "_volontyorlik_sahifa_v_version_quiz_a" CASCADE;
  DROP TABLE "_volontyorlik_sahifa_v_version_quiz_a_locales" CASCADE;
  DROP TABLE "_volontyorlik_sahifa_v_version_quiz" CASCADE;
  DROP TABLE "_volontyorlik_sahifa_v_version_quiz_locales" CASCADE;
  DROP TABLE "_volontyorlik_sahifa_v" CASCADE;
  DROP TABLE "_volontyorlik_sahifa_v_locales" CASCADE;
  DROP TABLE "_volontyorlik_sahifa_v_rels" CASCADE;
  DROP TABLE "aloqa_phones" CASCADE;
  DROP TABLE "aloqa_emails" CASCADE;
  DROP TABLE "aloqa_socials" CASCADE;
  DROP TABLE "aloqa_law_terms" CASCADE;
  DROP TABLE "aloqa_law_terms_locales" CASCADE;
  DROP TABLE "aloqa_law_types" CASCADE;
  DROP TABLE "aloqa_law_types_locales" CASCADE;
  DROP TABLE "aloqa" CASCADE;
  DROP TABLE "aloqa_locales" CASCADE;
  DROP TABLE "_aloqa_v_version_phones" CASCADE;
  DROP TABLE "_aloqa_v_version_emails" CASCADE;
  DROP TABLE "_aloqa_v_version_socials" CASCADE;
  DROP TABLE "_aloqa_v_version_law_terms" CASCADE;
  DROP TABLE "_aloqa_v_version_law_terms_locales" CASCADE;
  DROP TABLE "_aloqa_v_version_law_types" CASCADE;
  DROP TABLE "_aloqa_v_version_law_types_locales" CASCADE;
  DROP TABLE "_aloqa_v" CASCADE;
  DROP TABLE "_aloqa_v_locales" CASCADE;
  DROP TABLE "azolik_sahifa_conditions" CASCADE;
  DROP TABLE "azolik_sahifa_conditions_locales" CASCADE;
  DROP TABLE "azolik_sahifa_steps" CASCADE;
  DROP TABLE "azolik_sahifa_steps_locales" CASCADE;
  DROP TABLE "azolik_sahifa_after" CASCADE;
  DROP TABLE "azolik_sahifa_after_locales" CASCADE;
  DROP TABLE "azolik_sahifa" CASCADE;
  DROP TABLE "_azolik_sahifa_v_version_conditions" CASCADE;
  DROP TABLE "_azolik_sahifa_v_version_conditions_locales" CASCADE;
  DROP TABLE "_azolik_sahifa_v_version_steps" CASCADE;
  DROP TABLE "_azolik_sahifa_v_version_steps_locales" CASCADE;
  DROP TABLE "_azolik_sahifa_v_version_after" CASCADE;
  DROP TABLE "_azolik_sahifa_v_version_after_locales" CASCADE;
  DROP TABLE "_azolik_sahifa_v" CASCADE;
  DROP TABLE "miqdorlar" CASCADE;
  DROP TABLE "miqdorlar_locales" CASCADE;
  DROP TABLE "_miqdorlar_v" CASCADE;
  DROP TABLE "_miqdorlar_v_locales" CASCADE;
  DROP TABLE "socials" CASCADE;
  DROP TYPE "public"."_locales";
  DROP TYPE "public"."enum_otts_type";
  DROP TYPE "public"."enum_partners_dirs";
  DROP TYPE "public"."enum_partners_group";
  DROP TYPE "public"."enum_partners_region";
  DROP TYPE "public"."enum_staff_socials_net";
  DROP TYPE "public"."enum_staff_qabul_day";
  DROP TYPE "public"."enum_projects_holat";
  DROP TYPE "public"."enum_projects_status";
  DROP TYPE "public"."enum__projects_v_version_holat";
  DROP TYPE "public"."enum__projects_v_version_status";
  DROP TYPE "public"."enum__projects_v_published_locale";
  DROP TYPE "public"."enum_grants_cat";
  DROP TYPE "public"."enum_grants_origin";
  DROP TYPE "public"."enum_stipends_rates_base";
  DROP TYPE "public"."enum_stipends_turi";
  DROP TYPE "public"."enum_stipends_icon";
  DROP TYPE "public"."enum_stipends_flag";
  DROP TYPE "public"."enum_contests_cat";
  DROP TYPE "public"."enum_awards_prize_base";
  DROP TYPE "public"."enum_benefits_cat";
  DROP TYPE "public"."enum_benefits_icon";
  DROP TYPE "public"."enum_vol_directions_icon";
  DROP TYPE "public"."enum_vol_directions_age";
  DROP TYPE "public"."enum_news_category";
  DROP TYPE "public"."enum_news_kind";
  DROP TYPE "public"."enum_news_status";
  DROP TYPE "public"."enum__news_v_version_category";
  DROP TYPE "public"."enum__news_v_version_kind";
  DROP TYPE "public"."enum__news_v_version_status";
  DROP TYPE "public"."enum__news_v_published_locale";
  DROP TYPE "public"."enum_news_reactions_kind";
  DROP TYPE "public"."enum_acts_for";
  DROP TYPE "public"."enum_acts_kind";
  DROP TYPE "public"."enum_kengash_docs_kind";
  DROP TYPE "public"."enum_templates_cat";
  DROP TYPE "public"."enum_press_kind";
  DROP TYPE "public"."enum_press_status";
  DROP TYPE "public"."enum__press_v_version_kind";
  DROP TYPE "public"."enum__press_v_version_status";
  DROP TYPE "public"."enum__press_v_published_locale";
  DROP TYPE "public"."enum_albums_type";
  DROP TYPE "public"."enum_videos_type";
  DROP TYPE "public"."enum_videos_series";
  DROP TYPE "public"."enum_oav_kind";
  DROP TYPE "public"."enum_oav_lang";
  DROP TYPE "public"."enum_faqs_cat";
  DROP TYPE "public"."enum_appeals_type";
  DROP TYPE "public"."enum_appeals_status";
  DROP TYPE "public"."enum_memberships_status";
  DROP TYPE "public"."enum_volunteers_status";
  DROP TYPE "public"."enum_text_errors_status";
  DROP TYPE "public"."enum_users_role";
  DROP TYPE "public"."enum_payload_folders_folder_type";
  DROP TYPE "public"."enum_bosh_sahifa_benefits_roles_icon";
  DROP TYPE "public"."enum__bosh_sahifa_v_version_benefits_roles_icon";
  DROP TYPE "public"."enum_ittifoq_sahifa_privileges_group";
  DROP TYPE "public"."enum_ittifoq_sahifa_orgs_ngos_g";
  DROP TYPE "public"."enum_ittifoq_sahifa_companies_kind";
  DROP TYPE "public"."enum__ittifoq_sahifa_v_version_privileges_group";
  DROP TYPE "public"."enum__ittifoq_sahifa_v_version_orgs_ngos_g";
  DROP TYPE "public"."enum__ittifoq_sahifa_v_version_companies_kind";
  DROP TYPE "public"."enum_aloqa_socials_net";
  DROP TYPE "public"."enum__aloqa_v_version_socials_net";`)
}
