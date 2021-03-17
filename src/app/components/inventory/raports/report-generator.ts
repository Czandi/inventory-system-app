import {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TabStopPosition,
  TabStopType,
  TextRun,
  WidthType,
} from "docx";

export class ReportCreator {
  public create([
    date,
    room,
    missingRecords,
    additionalRecords,
    actualStock,
    previousStock,
  ]) {
    const document = new Document({
      creator: "InvSystem",
      description: "Report of inventory",
      title: "Report",
    });

    const tableHeader = new TableRow({
      children: [
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Numer Inw.",
                  bold: true,
                }),
              ],
            }),
          ],
          width: {
            size: "33%",
            type: WidthType.PERCENTAGE,
          },
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Typ",
                  bold: true,
                }),
              ],
            }),
          ],
          width: {
            size: "33%",
            type: WidthType.PERCENTAGE,
          },
        }),
        new TableCell({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "Model",
                  bold: true,
                }),
              ],
            }),
          ],
          width: {
            size: "33%",
            type: WidthType.PERCENTAGE,
          },
        }),
      ],
    });

    const actualStockTable = new Table({
      rows: [
        tableHeader,
        ...actualStock
          .map((device) => {
            const arr = [];
            arr.push(this.createTableRow(device));

            return arr;
          })
          .reduce((prev, curr) => prev.concat(curr), []),
      ],
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
    });

    const previousStockTable = new Table({
      rows: [
        tableHeader,
        ...previousStock
          .map((device) => {
            const arr = [];
            arr.push(this.createTableRow(device));

            return arr;
          })
          .reduce((prev, curr) => prev.concat(curr), []),
      ],
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
    });

    const missingRecordsTable = new Table({
      rows: [
        tableHeader,
        ...missingRecords
          .map((device) => {
            const arr = [];
            arr.push(this.createTableRow(device));

            return arr;
          })
          .reduce((prev, curr) => prev.concat(curr), []),
      ],
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
    });

    const additionalRecordsTable = new Table({
      rows: [
        tableHeader,
        ...additionalRecords
          .map((device) => {
            const arr = [];
            arr.push(this.createTableRow(device));

            return arr;
          })
          .reduce((prev, curr) => prev.concat(curr), []),
      ],
      width: {
        size: 100,
        type: WidthType.PERCENTAGE,
      },
    });

    document.addSection({
      children: [
        new Paragraph({
          text: "Raport " + date + " Pomieszczenie " + room,
          heading: HeadingLevel.TITLE,
          alignment: AlignmentType.CENTER,
        }),
        new Paragraph(""),
        this.createHeading("Stan aktualny"),
        // this.createHeading("Actual Stock"),
        // ...actualStock
        //   .map((device) => {
        //     const arr: Paragraph[] = [];
        //     arr.push(this.createInstitutionHeader(device, date));
        //     arr.push(this.createRoleText("Test"));

        //     return arr;
        //   })
        //   .reduce((prev, curr) => prev.concat(curr), []),
        actualStockTable,
        new Paragraph(""),
        this.createHeading("Stan poprzedni"),
        previousStockTable,
        new Paragraph(""),
        this.createHeading("Brakujące rekordy"),
        missingRecordsTable,
        new Paragraph(""),
        this.createHeading("Dodatkowe rekordy"),
        additionalRecordsTable,
      ],
    });

    return document;
  }

  public createHeading(text: string): Paragraph {
    return new Paragraph({
      text: text,
      heading: HeadingLevel.HEADING_1,
      thematicBreak: true,
    });
  }

  public createTableRow(device): TableRow {
    const tableRow = new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph(device.inventoryNumber)],
        }),
        new TableCell({
          children: [new Paragraph(device.model)],
        }),
        new TableCell({
          children: [new Paragraph(device.type)],
        }),
      ],
    });
    return tableRow;
  }

  public createInstitutionHeader(
    institutionName: string,
    dateText: string
  ): Paragraph {
    return new Paragraph({
      tabStops: [
        {
          type: TabStopType.RIGHT,
          position: TabStopPosition.MAX,
        },
      ],
      children: [
        new TextRun({
          text: institutionName,
          bold: true,
        }),
        new TextRun({
          text: `\t${dateText}`,
          bold: true,
        }),
      ],
    });
  }

  public createRoleText(roleText: string): Paragraph {
    return new Paragraph({
      children: [
        new TextRun({
          text: roleText,
          italics: true,
        }),
      ],
    });
  }
}
