import { useTranslation } from "react-i18next";
import { ExcelIcon } from "../utils/Icons";

export const ExportExelButton = ({ exportExcel }:{ exportExcel:()=>void }) => {
      const {t} = useTranslation();
  return(
    // <button className='flex items-center gap-3 bg-container py-1 px-2 shadow-md shadow-color/20 rounded-md' onClick={exportExcel}>{t("Excel")}<RiFileExcel2Line /></button>
    <button className='flex items-center gap-3 bg-container border py-2.5 px-5 drop-shadow-lg text-sm rounded-md' onClick={exportExcel} >
      {t("Excel")}
      <ExcelIcon />
    </button>
  )
  }


