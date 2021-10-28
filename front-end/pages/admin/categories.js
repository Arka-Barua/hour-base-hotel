import { forwardRef, useEffect, useState } from "react";
import api from "../../axios";
import AdminLayout from "../../components/AdminLayout";
import withAdmin from "../../HOC/withAdmin";
import withAuth from "../../HOC/withAuth";
import { DataGrid } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import CustomToolbar from "../../components/CustomToolbar";
import CustomNoRowsOverlay from "../../components/CustomNoRowsOverlay";
import { Button, Slide, Typography } from "@mui/material";
import Popup from "../../components/Popup";
import { Box } from "@mui/system";
import AddCategoryForm from "../../components/AddCategoryForm";
import useSWR from "swr";
import SelectedCategories from "../../components/SelectedCategories";

const fetcher = (url) => api.get(url).then((res) => res.data);

const columns = [
  { field: "name", headerName: "Name", width: 200 },
  { field: "maxPeople", headerName: "Max People", type: "number", width: 130 },
  { field: "price_per_hour", headerName: "Price Per Hour", width: 130 },
  {
    field: "services",
    headerName: "Sevices",
    width: 250,
  },
  // {
  //   field: "roles",
  //   headerName: "Role",
  //   width: 70,
  // },
];

const escapeRegExp = (value) => {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Categories = () => {
  const { data: category } = useSWR("/category", fetcher, {
    revalidateOnFocus: false,
  });
  const [searchText, setSearchText] = useState("");
  const [cat, setCat] = useState([]);
  const [rows, setRows] = useState(cat);
  const [selectionModel, setSelectionModel] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const { data } = useDemoData({
    dataSet: "Commodity",
  });

  const requestSearch = (searchValue) => {
    setSearchText(searchValue);
    const searchRegex = new RegExp(escapeRegExp(searchValue), "i");
    const filteredRows = cat.filter((row) => {
      return Object.keys(row).some((field) => {
        return searchRegex.test(row[field].toString());
      });
    });
    setRows(filteredRows);
  };

  useEffect(async () => {
    category && setCat(category);
  }, [category]);

  useEffect(() => {
    setRows(cat);
  }, [cat]);

  return (
    <AdminLayout>
      <main
        style={{ marginBottom: "4rem", display: "flex", marginTop: "2rem" }}
      >
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Categories
        </Typography>
        <Button
          variant="contained"
          disableElevation
          disableRipple
          onClick={() => {
            setOpenPopup(true);
          }}
        >
          Add New Category
        </Button>
      </main>
      {category && (
        <SelectedCategories selectionModel={selectionModel} rows={category} />
      )}

      <div style={{ height: 400, width: "100%" }}>
        {cat && (
          <DataGrid
            {...data}
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
        )}
      </div>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Add New Category"
        draggable
        TransitionComponent={Transition}
        fullScreen
      >
        <Box>
          <AddCategoryForm setOpenPopup={setOpenPopup} />
        </Box>
      </Popup>
    </AdminLayout>
  );
};

export default withAdmin(withAuth(Categories));
