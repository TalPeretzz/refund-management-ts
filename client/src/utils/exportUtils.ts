import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";

/** ✅ Export to CSV */
export const exportToCSV = (data: any[], filename: string) => {
    const dataToExport = exportData(data);
    const csvContent = [
        Object.keys(dataToExport[0]).join(","),
        ...dataToExport.map((row) => Object.values(row).join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

/** ✅ Export to Excel */
export const exportToExcel = (data: any[], filename: string) => {
    const dataToExport = exportData(data);
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    XLSX.writeFile(workbook, `${filename}.xlsx`);
};

/** ✅ Export to PDF */
export const exportToPDF = (data: any[], filename: string) => {
    const dataToExport = exportData(data);
    const doc = new jsPDF();
    const headers = Object.keys(dataToExport[0]);
    const rows = dataToExport.map((row) =>
        headers.map((header) => row[header])
    );

    doc.text("History Requests", 20, 10);
    (doc as any).autoTable({ head: [headers], body: rows });

    doc.save(`${filename}.pdf`);
};

function exportData(data: any[]): any[] {
    return data.map((row) => {
        return {
            id: row.id,
            title: row.title,
            amount: row.amount,
            status: row.status,
            date: row.date,
            employeeId: row.employeeId,
            employeeFullName: row.employee.FullName,
            employeeRole: row.employee.Role,
            employeeEmail: row.employee.Email,
        };
    });
}
