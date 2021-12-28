import { Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import api from "../../../axios";
import AdminLayout from "../../../components/AdminLayout";
import CustomToolbar from "../../../components/CustomToolbar";
import CustomNoRowsOverlay from "../../../components/CustomNoRowsOverlay";
import withAdmin from "../../../HOC/withAdmin";
import withAuth from "../../../HOC/withAuth";
import { format } from "date-fns";
import SelectedOrders from "../../../components/SelectedOrders";

const columns = [
  { field: "checkIn", headerName: "Check In", width: 280 },
  { field: "checkOut", headerName: "Check Out", width: 280 },
  {
    field: "status",
    headerName: "Status",
    width: 90,
  },
];

const escapeRegExp = (value) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

const Orders = () => {
  const [searchText, setSearchText] = useState("");
  const [rowData, setRowData] = useState([]);
  const [rows, setRows] = useState(rowData);
  const [selectionModel, setSelectionModel] = useState([]);

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = rowData.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setRows(filteredRows);
  };

  useEffect(async () => {
    api.get("/booking").then((res) => {
      setRowData(res.data);
      if (res.data) {
        res.data.map((item) => {
          item.checkIn = format(new Date(item.checkIn), "PPpp");
          item.checkOut = format(new Date(item.checkOut), "PPpp");
        });
      }
      console.log(res.data);
    });
  }, []);

  useEffect(() => {
    setRows(rowData);
  }, [rowData]);

  return (
    <AdminLayout>
      <main style={{ marginBottom: "4rem", marginTop: "2rem" }}>
        <Typography variant="h6" style={{ marginLeft: 3 }}>
          Admin Orders
        </Typography>
      </main>

      <SelectedOrders selectionModel={selectionModel} rows={rowData} />

      <div style={{ height: 400, width: "100%" }}>
        {rowData ? (
          <DataGrid
            {...rowData}
            components={{
              Toolbar: CustomToolbar,
              NoRowsOverlay: CustomNoRowsOverlay,
            }}
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            componentsProps={{
              toolbar: {
                value: searchText,
                onChange: (event) => requestSearch(event.target.value),
                clearSearch: () => requestSearch(""),
              },
            }}
            checkboxSelection
            onSelectionModelChange={(newSelectionModel) => {
              setSelectionModel(newSelectionModel);
            }}
            selectionModel={selectionModel}
          />
        ) : (
          <div>loading</div>
        )}
      </div>
    </AdminLayout>
  );
};

export default withAdmin(withAuth(Orders));
