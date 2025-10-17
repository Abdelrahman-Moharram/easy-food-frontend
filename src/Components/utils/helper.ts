import { ChangeEvent } from "react"
import { useSearchParams } from "react-router-dom"
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

export const to_int_or_default = (val:string|null)=>{
    try{
        if(val)
            return parseInt(val)
    }
    catch{
        return 0
    }
    return 0
}


export const numberToMoney = (value:number|string|null) =>{
    if (!value) return 0
    let intValue = value.toLocaleString().replace(/[^0-9.]/g, '');
    const parts = intValue.split('.');
    if (parts.length > 2) {
        intValue = parts[0] + '.' + parts.slice(1).join('');
    }

    const [integerPart, decimalPart] = intValue.split('.');
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return decimalPart !== undefined ? `${formattedInteger}.${decimalPart}` : formattedInteger;
}

export const beautify_date = (date: string) => {
    const newDate = new Date(date)
    const day     = String(newDate.getDate()).padStart(2, "0")
    const month   = String(newDate.getMonth() + 1).padStart(2, "0")
    
    return `${day}-${month}-${newDate.getFullYear()}`
}


export const exportData = ({type, params, ExportFun, fileName}:{type:'excel'| 'pdf', params, ExportFun, fileName:string}) => {
    let ext = ''
    if (type === 'pdf')
      ext = 'pdf'
    else if (type === 'excel' || type === 'xlsx')
      ext = 'xlsx' 

    ExportFun({type, ...params})
    .unwrap()
    .then((res)=>{   

      const url = window.URL.createObjectURL(res);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}.${ext}`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    })
  };









export function capitalizeFirstLetter(val:string) {
  return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}


export const useChangeSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const changeSearchParams = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    console.log(e);
    
    const { name, value } = e.target;
    searchParams.set(name, value);
    setSearchParams(searchParams);
  };

  return changeSearchParams;
};

export const FriendlyDate = (date) =>{
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };
  return new Intl.DateTimeFormat("en-US", options).format(new Date(date))
}


export const exportAsPng = async (elementRef:any) => {
    if (elementRef.current) {
      const canvas = await html2canvas(elementRef.current);
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "export.png";
      link.click();
    }
  };

  // Function to export as PDF
export const exportAsPdf = async (elementRef:any) => {
    if (elementRef.current) {
      const canvas = await html2canvas(elementRef.current);
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("export.pdf");
    }
  };
