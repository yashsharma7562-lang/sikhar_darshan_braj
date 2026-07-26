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
    title: "Privacy and consent",
    introduction:
      "This notice explains the platform’s privacy approach. Connected services must remain disabled until their production configuration, consent flow and retention controls are verified.",
    updated: "Last reviewed: 23 July 2026",
    help: "Visit customer help",
    sections: [
      {
        title: "Information we use",
        paragraphs: [
          "Journey preferences, traveller details, booking records and support messages are used only when needed to provide the requested service. Sensitive accessibility and location information requires explicit, purpose-specific consent.",
        ],
      },
      {
        title: "Your choices",
        paragraphs: [
          "Location, family sharing, marketing, push notifications, analytics and saved accessibility preferences have separate controls. Promotional consent does not control essential booking, payment, safety or support messages.",
        ],
      },
      {
        title: "Sharing and retention",
        paragraphs: [
          "Only the minimum operational information should be shared with the assigned verified provider. Retention periods must follow legal, accounting, safety and deletion obligations; data is not retained merely because storage is available.",
        ],
      },
      {
        title: "Your rights and security",
        paragraphs: [
          "Authenticated users may request access, correction, export or deletion where applicable. The platform uses permission checks, audit records and data minimisation, but no online system can promise absolute security.",
        ],
      },
    ],
  },
  hi: {
    title: "गोपनीयता और सहमति",
    introduction:
      "यह सूचना मंच के गोपनीयता दृष्टिकोण को समझाती है। उत्पादन कॉन्फ़िगरेशन, सहमति प्रक्रिया और डेटा-अवधि नियंत्रण सत्यापित होने तक जुड़ी सेवाएँ निष्क्रिय रहती हैं।",
    updated: "अंतिम समीक्षा: 23 जुलाई 2026",
    help: "ग्राहक सहायता देखें",
    sections: [
      {
        title: "हम कौन-सी जानकारी उपयोग करते हैं",
        paragraphs: [
          "यात्रा प्राथमिकताएँ, यात्री विवरण, बुकिंग रिकॉर्ड और सहायता संदेश केवल माँगी गई सेवा देने के लिए उपयोग किए जाते हैं। पहुँच-सहायता और स्थान जैसी संवेदनशील जानकारी के लिए स्पष्ट और उद्देश्य-विशिष्ट सहमति आवश्यक है।",
        ],
      },
      {
        title: "आपके विकल्प",
        paragraphs: [
          "स्थान, परिवार साझाकरण, मार्केटिंग, पुश सूचना, एनालिटिक्स और सहेजी गई पहुँच प्राथमिकताओं के अलग नियंत्रण हैं। प्रचार सहमति आवश्यक बुकिंग, भुगतान, सुरक्षा या सहायता संदेशों को नियंत्रित नहीं करती।",
        ],
      },
      {
        title: "साझाकरण और संग्रह अवधि",
        paragraphs: [
          "सत्यापित और नियुक्त सेवा प्रदाता से केवल न्यूनतम आवश्यक संचालन जानकारी साझा की जानी चाहिए। संग्रह अवधि कानूनी, लेखा, सुरक्षा और विलोपन दायित्वों के अनुसार होगी।",
        ],
      },
      {
        title: "आपके अधिकार और सुरक्षा",
        paragraphs: [
          "प्रमाणित उपयोगकर्ता लागू होने पर जानकारी देखने, सुधारने, डाउनलोड करने या मिटाने का अनुरोध कर सकते हैं। मंच अनुमति जाँच, ऑडिट रिकॉर्ड और न्यूनतम डेटा सिद्धांत अपनाता है।",
        ],
      },
    ],
  },
};

export const metadata: Metadata = { title: "Privacy" };

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const value = content[locale === "hi" ? "hi" : "en"];
  return (
    <PolicyPage
      eyebrow={locale === "hi" ? "गोपनीयता" : "Privacy"}
      {...value}
      updatedLabel={value.updated}
      helpLabel={value.help}
    />
  );
}
