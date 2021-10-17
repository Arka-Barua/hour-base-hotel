import api from "../../axios";
import AdminLayout from "../../components/AdminLayout";
import withAuth from "../../HOC/withAuth";
import withAdmin from "../../HOC/withAdmin";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import CustomToolbar from "../../components/CustomToolbar";
import CustomNoRowsOverlay from "../../components/CustomNoRowsOverlay";
import SelectedUsers from "../../components/SelectedUsers";
import Image from "next/image";
import { Typography } from "@mui/material";

const columns = [
  { field: "email", headerName: "Email", width: 200 },
  { field: "firstname", headerName: "First name", width: 130 },
  { field: "lastname", headerName: "Last name", width: 130 },
  {
    field: "mobile",
    headerName: "Mobile No.",
    width: 130,
  },
  {
    field: "roles",
    headerName: "Role",
    width: 70,
  },
];

const escapeRegExp = (value) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

const Users = () => {
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
    api.get("/user").then((res) => {
      setRowData(res.data);
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
          Admin Users
        </Typography>
      </main>

      <SelectedUsers selectionModel={selectionModel} rows={rowData} />

      <div style={{ height: 400, width: "100%" }}>
        {rowData ? (
          <DataGrid
            {...rowData}
            // {...data}
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

      {/* <Image
        src={`${process.env.API_URL}/category/avibfefa290-ef30-42ca-8d4a-415d2d48fa30.PNG`}
        width={100}
        height={20}
        objectFit="contain"
        layout="responsive"
      /> */}
    </AdminLayout>
  );
};

export default withAdmin(withAuth(Users));
