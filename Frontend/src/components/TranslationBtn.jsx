import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../components/ui/button";

export function TranslationBtn({ className }) {
  const { i18n } = useTranslation();
  const [isCurrentLangEn, setIsCurrentLangEn] = useState(true);

  const handleLanugageChangeToNp = () => {
    if (i18n.language === "en") {
      i18n.changeLanguage("np");
      setIsCurrentLangEn(false);
    } 
  };

  const handleLanugageChangeToEn = () => {
    if (i18n.language === "np") {
      i18n.changeLanguage("en");
      setIsCurrentLangEn(true);
    } 
  };

  return (
    <div className={className}>
      <div className="">
        <Button
          className={`cursor-pointer  bg-slate-800 font-nunito w-10 text-white rounded-none rounded-l-md ${
            isCurrentLangEn
              ? "bg-emerald-500 hover:bg-emerald-500 text-white "
              : ""
          }`}
          onClick={handleLanugageChangeToEn}
        >
          En
        </Button>
        <Button
          className={`cursor-pointer font-nunito bg-slate-800 w-10 text-white rounded-none rounded-r-md ${
            isCurrentLangEn
              ? ""
              : "bg-emerald-500 hover:bg-emerald-500 text-black  "
          }`} onClick={handleLanugageChangeToNp}>Np
        </Button>
      </div>
      
    </div>
  );
}

export default TranslationBtn;