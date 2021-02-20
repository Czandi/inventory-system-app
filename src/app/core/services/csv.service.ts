import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class CsvService {
  public exportToCsv(filename: string, rows: object[], headers?: string[]) {
    if (!rows || !rows.length) {
      return;
    }
    const separator: string = ",";

    const keys: string[] = Object.keys(rows[0]);

    let columnHeaders: string[];

    if (headers) {
      columnHeaders = headers;
    } else {
      columnHeaders = keys;
    }

    const csvContent =
      "sep=,\n" +
      columnHeaders.join(separator) +
      "\n" +
      rows
        .map((row) => {
          return keys
            .map((k) => {
              let cell = row[k] === null || row[k] === undefined ? "" : row[k];

              cell =
                cell instanceof Date
                  ? cell.toLocaleString()
                  : cell.toString().replace(/"/g, '""');

              if (cell.search(/("|,|\n)/g) >= 0) {
                cell = `"${cell}"`;
              }
              return cell;
            })
            .join(separator);
        })
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    if (navigator.msSaveBlob) {
      navigator.msSaveBlob(blob, filename);
    } else {
      const link = document.createElement("a");
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", filename);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  }
}
