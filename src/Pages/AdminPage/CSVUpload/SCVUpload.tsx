import { Spin } from "antd";
import * as React from "react";
import { useState } from "react";
import XLSX from 'xlsx'

interface IProps {
  onWrongFormat: () => void;
  setExcelOutput: (excelOutPut: unknown[]) => void;
  setHeaders: (val: string[]) => void;
  upLoadSuccess: () => void;
}

const SCVUpload = ({
  onWrongFormat,
  setExcelOutput,
  setHeaders,
  upLoadSuccess,
}: IProps): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);

  const get_header_row = (sheet: XLSX.WorkSheet) => {
    const headers = [];
    const range = XLSX.utils.decode_range(sheet["!ref"] as string);
    let C;
    const R = range.s.r;
    for (C = range.s.c; C <= range.e.c; ++C) {
      const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
      let hdr = "UNKNOWN " + C;
      if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
      headers.push(hdr);
    }
    return headers;
  };

  const readExcel = async (e: any) => {
    setLoading(true);
    const files = e.target.files;
    const fileType = files[0].name.toLowerCase();
    if (files.length <= 0) {
      setLoading(false);
      return false;
    } else if (!/\.(xls|xlsx|csv)$/.test(fileType)) {
      onWrongFormat();
      setLoading(false);
      return false;
    }

    const fileReader = new FileReader();
    fileReader.onload = (ev: any) => {
      try {
        // get xlsx file
        const data = ev.target.result;
        const workbook = XLSX.read(data, {
          type: "binary",
          cellText: false,
          cellDates: true,
          raw: true,
        });
        const wsname = workbook.SheetNames[0]; //取第一张表
        const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname], {
          raw: false,
          dateNF: "yyyy-mm-dd",
          rawNumbers: true,
        });

        const worksheet = workbook.Sheets[wsname];
        const header = get_header_row(worksheet);
        setHeaders(header);
        setExcelOutput(ws as string[]);
        upLoadSuccess();
        setLoading(false);
      } catch (e) {
        setLoading(false);
        return false;
      }
    };
    fileReader.readAsBinaryString(files[0]);
  };

  return (
    <>
      <input
        type="file"
        onClick={(e) => {
          (e.target as any).value = "";
        }}
        onChange={(e) => readExcel(e)}
        accept=".xls,.xlsx,.csv"
      />
      {loading ? <Spin /> : <></>}
    </>
  );
};

export default SCVUpload;
