import type { Metadata } from "next";
import { PolicyPage, type PolicySection } from "@/components/legal/policy-page";

const content: Record<
  "en" | "hi",
  {
    title: string;
    introduction: string;
    sections: readonly PolicySection[];
    updated: string;
    help: string;
  }
> = {
  en: {
    title: "Platform terms",
    introduction:
      "These terms describe responsible use of Shikhar Darshan Braj. They do not replace the final booking terms, provider policies or statutory consumer rights shown before payment.",
    updated: "Last reviewed: 23 July 2026",
    help: "Get help",
    sections: [
      {
        title: "Fair religious access",
        paragraphs: [
          "Shikhar Darshan Braj does not sell VIP darshan, guaranteed temple entry, paid queue skipping or unauthorised religious privilege. Temple schedules and rules may change and should be verified before travel.",
        ],
      },
      {
        title: "Bookings and providers",
        paragraphs: [
          "A booking exists only after server-side availability, price, payment and confirmation checks succeed. Hotels, transport operators and other providers remain responsible for the services they confirm.",
        ],
      },
      {
        title: "Payments, cancellation and refunds",
        paragraphs: [
          "The applicable price breakdown, cancellation policy and refund terms must be shown before payment. Refund timing may depend on verified eligibility and the payment provider’s settlement process.",
        ],
      },
      {
        title: "Responsible use",
        paragraphs: [
          "Do not misuse accounts, submit false claims, manipulate prices, impersonate a provider, upload harmful content or interfere with platform security. Access may be restricted when needed to protect devotees, providers or the service.",
        ],
      },
    ],
  },
  hi: {
    title: "मंच के नियम",
    introduction:
      "ये नियम शिखर दर्शन ब्रज के जिम्मेदार उपयोग को समझाते हैं। ये भुगतान से पहले दिखाए जाने वाले अंतिम बुकिंग नियम, सेवा प्रदाता नीति या वैधानिक उपभोक्ता अधिकारों का स्थान नहीं लेते।",
    updated: "अंतिम समीक्षा: 23 जुलाई 2026",
    help: "सहायता प्राप्त करें",
    sections: [
      {
        title: "समान धार्मिक पहुँच",
        paragraphs: [
          "शिखर दर्शन ब्रज वीआईपी दर्शन, सुनिश्चित मंदिर प्रवेश, भुगतान द्वारा कतार छोड़ना या अनधिकृत धार्मिक विशेषाधिकार नहीं बेचता। यात्रा से पहले मंदिर समय और नियमों की पुष्टि करें।",
        ],
      },
      {
        title: "बुकिंग और सेवा प्रदाता",
        paragraphs: [
          "बुकिंग तभी बनती है जब सर्वर पर उपलब्धता, मूल्य, भुगतान और पुष्टि की जाँच सफल हो। होटल, परिवहन ऑपरेटर और अन्य प्रदाता अपनी पुष्टि की गई सेवाओं के लिए जिम्मेदार रहते हैं।",
        ],
      },
      {
        title: "भुगतान, रद्दीकरण और धनवापसी",
        paragraphs: [
          "भुगतान से पहले लागू मूल्य-विवरण, रद्दीकरण नीति और धनवापसी नियम दिखाए जाने चाहिए। धनवापसी का समय सत्यापित पात्रता और भुगतान प्रदाता की प्रक्रिया पर निर्भर हो सकता है।",
        ],
      },
      {
        title: "जिम्मेदार उपयोग",
        paragraphs: [
          "खाते का दुरुपयोग, झूठा दावा, मूल्य में हेरफेर, प्रदाता का प्रतिरूपण, हानिकारक सामग्री या सुरक्षा में हस्तक्षेप न करें। सुरक्षा के लिए पहुँच सीमित की जा सकती है।",
        ],
      },
    ],
  },
};

export const metadata: Metadata = { title: "Terms" };

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const value = content[locale === "hi" ? "hi" : "en"];
  return (
    <PolicyPage
      eyebrow={locale === "hi" ? "नियम" : "Terms"}
      {...value}
      updatedLabel={value.updated}
      helpLabel={value.help}
    />
  );
}
