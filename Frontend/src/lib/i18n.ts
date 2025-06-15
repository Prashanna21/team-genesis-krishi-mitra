import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: {
        features: {
          heading: "Our Features",
          dashboardHeading: "Farmer Portal",
          report: {
            title: "Report Generation",
            description:
              "Predict future profit on crops with our advanced report generation.",
          },
          marketplace: {
            title: "MarketPlace",
            description:
              "Sell your products on our marketplace to reach a wider audience.",
          },
          ai: {
            title: "AI Plant Disease Detection",
            description:
              "Upload the picture of your plant and get instant disease detection.",
          },
          tools: {
            title: "Rent Tools",
            description:
              "Easily rent agricultural tools and equipment from local providers.",
            provideTitle: "Provide Tools for Rent",
            provideDescription:
              "Easily rent agricultural tools and equipment to local farmers.",
          },
          consultation: {
            title: "Expert Consultation",
            description:
              "Connect with agricultural experts for personalized advice.",
          },
        },
        growWith: {
          label: "Grow With",
          hashtag: "#GrowWith",
          title: "Nature",
          subtitle: "Friend of Farmer",
          description:
            "A platform dedicated to empowering farmers with the tools and resources they need to thrive in the modern agricultural landscape.",
          cta: "Generate Your Report Now",
        },
      },
    },
    np: {
      translation: {
        features: {
          heading: "हाम्रो विशेषताहरू",
          dashboardHeading: "किसान पोर्टल",
          report: {
            title: "रिपोर्ट निर्माण",
            description:
              "हाम्रो प्रविधियुक्त रिपोर्ट प्रणालीले बालीको भविष्य मुनाफा अनुमान गर्छ।",
          },
          marketplace: {
            title: "बजार",
            description:
              "आफ्नो उत्पादनहरू बेच्न हाम्रो बजार प्लेटफर्म प्रयोग गर्नुहोस्।",
          },
          ai: {
            title: "एआई बिरुवा रोग पहिचान",
            description:
              "बिरुवाको फोटो अपलोड गर्नुहोस् र तुरुन्तै रोग जानकारी प्राप्त गर्नुहोस्।",
          },
          tools: {
            title: "उपकरण भाडामा",
            description:
              "स्थानीय प्रदायकबाट कृषियन्त्र सजिलै भाडामा लिनुहोस्।",
            provideTitle: "उपकरण भाडामा दिनुहोस्",
            provideDescription:
              "कृषकहरूलाई सजिलै कृषियन्त्र भाडामा दिनुहोस्।",
          },
          consultation: {
            title: "विशेषज्ञ सल्लाह",
            description:
              "व्यक्तिगत कृषि सल्लाहको लागि विशेषज्ञहरूसँग सम्पर्क गर्नुहोस्।",
          },
        },
        growWith: {
          label: "प्रकृतिसँग बढ्नुहोस्",
          hashtag: "#GrowWith",
          title: "प्रकृति",
          subtitle: "कृषकको साथी",
          description:
            "कृषकहरूलाई आधुनिक कृषि प्रणालीमा सफल हुन आवश्यक उपकरण र स्रोतहरू उपलब्ध गराउने एक प्लेटफर्म।",
          cta: "तपाईंको रिपोर्ट अहिले नै तयार गर्नुहोस्",
        },
      },
    },
  },
});

export default i18n;