import { z } from 'zod';

export const TarifSchema = z.enum(['Starter', 'Professional', 'Negotiated']);
export type Tarif = z.infer<typeof TarifSchema>;

export const TarifStatus = z.enum([
  'active',
  'cancelled',
  'expired',
  'prospect',
]);
export type TarifStatus = z.infer<typeof TarifStatus>;

// TODO: Add more types
export const OrganizationTypeSchema = z.enum([
  'Association',
  'Company',
  'Government',
  'Nonprofit',
  'Municipality', // Gemeindevertretung
  'Major', // Bürgermeisteramt
  'Administration',
  'Person', // Person
  'Foundation', // Stiftung
  'other',
]);
export type OrganizationType = z.infer<typeof OrganizationTypeSchema>;

export const OrganizerSchema = z.object({
  // customer classification
  serviceprovider: z
    .boolean()
    .default(false)
    .describe('Is the contact a service provider?'),
  tarif: TarifSchema.optional().describe('Current tarif of the client'),
  tarif_valid_to: z.string().describe('Date when the tarif is valid to'),
  tarif_status: TarifStatus.optional(),
  tag: z.array(z.string()).optional().describe('Tags for the contact'),

  // organizer information
  display_name: z.string().optional().describe('Name of the organizer'),
  organization_name: z
    .string()
    .optional()
    .describe('Formal name of the organization'),
  organization_type: OrganizationTypeSchema.optional().describe(
    'Type or segment of the organization',
  ),
  first_name: z.string().optional().describe('First name'),
  last_name: z.string().optional().describe('Last name'),

  // contact information
  email: z.string().email().optional().describe('Email address'),
  sms: z.string().optional().describe('Mobile and SMS number'),
  whatsapp: z.string().optional().describe('WhatsApp number'),
  instagram: z.string().optional().describe('Instagram account'),
  facebook: z.string().optional().describe('Facebook account'),

  // real world address
  address: z.string().optional().describe('Street and house number'),
  city: z.string().optional().describe('City or municipality'),
  postal_code: z.string().optional().describe('Postal code'),
  state: z.string().optional().describe('State or region'),
  country: z.string().optional().default('DE').describe('Country'),

  // external references
  website: z.string().url().optional().describe('Website of the organization'),
  wikidata_id: z
    .string()
    .optional()
    .describe('Wikidata ID of the organization'),

  // calendars
  google_calendar_id_01: z.string().optional(), // Google Kalender ID #01
  google_calendar_id_02: z.string().optional(), // Google Kalender ID #02
  google_calendar_id_03: z.string().optional(), // Google Kalender ID #03
  google_calendar_id_04: z.string().optional(), // Google Kalender ID #04
  google_calendar_id_05: z.string().optional(), // Google Kalender ID #05
  google_calendar_id_06: z.string().optional(), // Google Kalender ID #06
  google_calendar_id_07: z.string().optional(), // Google Kalender ID #07
  google_calendar_id_08: z.string().optional(), // Google Kalender ID #08
  google_calendar_id_09: z.string().optional(), // Google Kalender ID #09
  google_calendar_id_10: z.string().optional(), // Google Kalender ID #10

  ics_calendar_url_01: z.string().optional(), // ICS Kalender URL #01
  ics_calendar_url_02: z.string().optional(), // ICS Kalender URL #02
  ics_calendar_url_03: z.string().optional(), // ICS Kalender URL #03
  ics_calendar_url_04: z.string().optional(), // ICS Kalender URL #04
  ics_calendar_url_05: z.string().optional(), // ICS Kalender URL #05
  ics_calendar_url_06: z.string().optional(), // ICS Kalender URL #06
  ics_calendar_url_07: z.string().optional(), // ICS Kalender URL #07
  ics_calendar_url_08: z.string().optional(), // ICS Kalender URL #08
  ics_calendar_url_09: z.string().optional(), // ICS Kalender URL #09
  ics_calendar_url_10: z.string().optional(), // ICS Kalender URL #10
});
export type Organizer = z.infer<typeof OrganizerSchema>;
