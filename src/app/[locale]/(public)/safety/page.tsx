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
    title: "Pilgrimage safety",
    introduction:
      "Practical preparation improves a Braj journey. Platform guidance supplements—not replaces—local emergency services, public authorities, medical advice or temple instructions.",
    updated: "Last reviewed: 23 July 2026",
    help: "Open customer help",
    sections: [
      {
        title: "Immediate danger",
        paragraphs: [
          "Contact local emergency services and move to a safe public place first. Do not wait for an app response during a medical emergency, fire, violence, missing-person event or other immediate threat.",
        ],
      },
      {
        title: "Before visiting",
        paragraphs: [
          "Verify temple schedules, closures, weather and official advisories close to departure. Carry water and required medicines, allow rest time, and avoid schedules that exceed the group’s walking or mobility tolerance.",
        ],
      },
      {
        title: "Transport and personal information",
        paragraphs: [
          "Confirm the assigned vehicle and trip-start process through the booking record. Do not share OTPs, payment credentials, identity documents or unnecessary live location details with unverified people.",
        ],
      },
      {
        title: "Accessibility and incidents",
        paragraphs: [
          "Request assistance early, but independently verify that facilities meet the traveller’s needs. Report service or safety incidents through the authenticated booking path so the operations team receives the correct journey context.",
        ],
      },
    ],
  },
  hi: {
    title: "तीर्थ यात्रा सुरक्षा",
    introduction:
      "सही तैयारी ब्रज यात्रा को सुरक्षित बनाती है। मंच की जानकारी स्थानीय आपात सेवा, सार्वजनिक प्राधिकरण, चिकित्सकीय सलाह या मंदिर निर्देशों का स्थान नहीं लेती।",
    updated: "अंतिम समीक्षा: 23 जुलाई 2026",
    help: "ग्राहक सहायता खोलें",
    sections: [
      {
        title: "तत्काल खतरा",
        paragraphs: [
          "पहले स्थानीय आपात सेवा से संपर्क करें और सुरक्षित सार्वजनिक स्थान पर जाएँ। चिकित्सा आपातस्थिति, आग, हिंसा, लापता व्यक्ति या अन्य तत्काल खतरे में ऐप के उत्तर की प्रतीक्षा न करें।",
        ],
      },
      {
        title: "यात्रा से पहले",
        paragraphs: [
          "प्रस्थान के पास मंदिर समय, बंदी, मौसम और आधिकारिक सलाह की पुष्टि करें। पानी और आवश्यक दवाएँ रखें, आराम का समय दें और समूह की चलने या गतिशीलता क्षमता से अधिक कार्यक्रम न बनाएँ।",
        ],
      },
      {
        title: "परिवहन और निजी जानकारी",
        paragraphs: [
          "बुकिंग रिकॉर्ड से वाहन और यात्रा-आरंभ प्रक्रिया की पुष्टि करें। असत्यापित व्यक्ति के साथ OTP, भुगतान जानकारी, पहचान दस्तावेज या अनावश्यक लाइव स्थान साझा न करें।",
        ],
      },
      {
        title: "पहुँच सहायता और घटना रिपोर्ट",
        paragraphs: [
          "सहायता जल्दी माँगें, पर सुविधाओं की उपयुक्तता स्वतंत्र रूप से सत्यापित करें। घटना की रिपोर्ट प्रमाणित बुकिंग मार्ग से करें ताकि संचालन टीम को सही यात्रा संदर्भ मिले।",
        ],
      },
    ],
  },
};

export const metadata: Metadata = { title: "Safety" };

export default async function SafetyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const value = content[locale === "hi" ? "hi" : "en"];
  return (
    <PolicyPage
      eyebrow={locale === "hi" ? "सुरक्षा" : "Safety"}
      {...value}
      updatedLabel={value.updated}
      helpLabel={value.help}
    />
  );
}
