// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import XLSX from 'xlsx';

export default (req, res) => {

    if (req.method === 'POST') {
        console.log('req :>> ', req.body);
        const { data } = req.body.rows
        let workbook = XLSX.utils.book_new();
        let worksheet = XLSX.utils.json_to_sheet(data);
        workbook.Sheets["data"] = worksheet;
         XLSX.writeFile(workbook, "Template_RGB.xlsx");
        res.status(200).json({
            name: 'John Doe Post',
        })
    } else {
        res.status(200).json({ name: 'John Doe Get' })
    }
}
