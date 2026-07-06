import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
} from 'docx';
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const doc = new Document({
  title: 'Ekara — Startup Finance Suite',
  subject: 'What Ekara does for Startups',
  creator: 'Ekara Financials',
  sections: [
    {
      properties: {},
      children: [
        new Paragraph({
          text: 'Ekara Financials',
          heading: HeadingLevel.TITLE,
          alignment: AlignmentType.CENTER,
          spacing: { after: 120 },
        }),
        new Paragraph({
          text: 'Startup Finance Suite',
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
        }),
        new Paragraph({
          text: 'Equipping founders with the tools and insights to master their startup\'s financial journey.',
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
        }),
        new Paragraph({
          text: 'What We Do',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 240, after: 200 },
        }),
        // Grant Advisory
        new Paragraph({
          text: 'Grant Advisory & Funding',
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 200, after: 80 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Identify, secure, and manage government & private grants for your startup.',
            }),
          ],
          spacing: { after: 200 },
        }),
        // Investor Matchmaking
        new Paragraph({
          text: 'Investor Matchmaking',
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 200, after: 80 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Connect high-potential startups with Angel Investors, VCs, and Impact Funds.',
            }),
          ],
          spacing: { after: 200 },
        }),
        // Business Modelling
        new Paragraph({
          text: 'Business Modelling',
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 200, after: 80 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Create robust financial models tailored to your startup\'s unique needs.',
            }),
          ],
          spacing: { after: 200 },
        }),
        // Compliance Advisory
        new Paragraph({
          text: 'Compliance Advisory',
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 200, after: 80 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Expert navigation of startup-specific regulatory and legal frameworks.',
            }),
          ],
          spacing: { after: 200 },
        }),
        // Accounting & Taxes
        new Paragraph({
          text: 'Accounting & Taxes',
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 200, after: 80 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Streamline your financial records and tax compliance with end-to-end support.',
            }),
          ],
          spacing: { after: 200 },
        }),
        // Founder Training
        new Paragraph({
          text: 'Founder Training (Finance 101)',
          heading: HeadingLevel.HEADING_3,
          spacing: { before: 200, after: 80 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Workshops on financial modelling, valuation, pitch decks, and equity understanding.',
            }),
          ],
          spacing: { after: 200 },
        }),
        // Financial Reporting Platform
        new Paragraph({
          text: 'Financial Reporting Platform',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 320, after: 200 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'A platform built for startups and investors to streamline financial transparency and portfolio oversight.',
            }),
          ],
          spacing: { after: 200 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Startups: ', bold: true }),
            new TextRun({
              text: 'Securely upload data and gain structured insights into core business metrics—MRR, burn rate, runway, cash position, revenue trends, expenses, and more.',
            }),
          ],
          spacing: { after: 160 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Investors: ', bold: true }),
            new TextRun({
              text: 'Consolidated portfolio dashboard with real-time company health indicators (Healthy / Watch), detailed per-company breakdowns, benchmarking (portfolio vs sector, cross-company comparisons), and downloadable analytics for decision-making.',
            }),
          ],
          spacing: { after: 400 },
        }),
        new Paragraph({
          text: '— Ekara Financials',
          alignment: AlignmentType.CENTER,
          spacing: { before: 200 },
        }),
      ],
    },
  ],
});

const buffer = await Packer.toBuffer(doc);
const outPath = join(__dirname, '..', 'Ekara-Startup-Suite-Brochure.docx');
writeFileSync(outPath, buffer);
console.log('Created:', outPath);
