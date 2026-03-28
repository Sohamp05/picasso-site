import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "heroTagline",
      title: "Hero Tagline",
      type: "string",
      description: "Main heading displayed on the hero section",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroSubtext",
      title: "Hero Subtext",
      type: "text",
      rows: 3,
      description: "Supporting text below the hero tagline",
    }),
    defineField({
      name: "heroVideoUrl",
      title: "Hero Background Video URL",
      type: "url",
      description: "URL to the background video (MP4) for the hero section",
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Number",
      type: "string",
      description: "WhatsApp number with country code (e.g. 919876543210)",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "whatsappMessage",
      title: "WhatsApp Pre-filled Message",
      type: "string",
      description: "Default message when users click the WhatsApp button",
      initialValue: "Hi! I'm interested in your corporate branding solutions.",
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
    }),
    defineField({
      name: "contactPhone",
      title: "Contact Phone",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Business Address",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
      };
    },
  },
});
