export function generateData(colNumber, rowNumber) {
    let data = {
        columns: [],
        rows: []
    }

    for (let i=0;i < colNumber;i++) {
        if (i<=10) { // coloring
            data.columns.push(
                {
                    name: `col${i}`,
                    dataType: "string",
                    alignment: "right",
                    column_text_color: "#44f",
                    column_background_color: "#ff4",
                    is_summary: true,
                    summaryType: "count",
                    tooltip: "Column"
                  },
            )
        } else { // not coloring
            data.columns.push(
                {
                    name: `col${i}`,
                    dataType: "string",
                    alignment: "left",
                    is_summary: true,
                    summaryType: "count",
                    tooltip: "Column"
                  },
            )
        }
    }

    for (let j=0;j < rowNumber;j++) {
        let object = {}
        for (let c=0;c < colNumber;c++) {
            object[`col${c}`] = `row${j}col${c}`
        }
        data.rows.push(object)
    }

    return data
}