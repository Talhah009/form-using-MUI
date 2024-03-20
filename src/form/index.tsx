import React, { useState } from "react";
import {
  Button,
  FormControl,
  Input,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { v4 as uuid } from "uuid";
import DataTable from "./component/table";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

const itemSize = [
  { value: "Small", label: "Small" },
  { value: "Medium", label: "Medium" },
  { value: "Large", label: "Large" },
  { value: "X-large", label: "X-large" },
];

const Form = () => {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [userData, setUserData] = useState<any>([]);
  const [img, setImg] = useState<any>("");
  const [orderDate, setOrderDate] = useState(null);
  const [deliveryMinDate, setDeliveryMinDate] = useState(null);

  const handleOrderDateChange = (date: any) => {
    setOrderDate(date);
    setDeliveryMinDate(date);
  };

  const unique_id = uuid();
  const small_id = unique_id.slice(0, 8);

  const handleImg = (e: any) => {
    console.log(e.target.files);

    const file_uri = e.target?.files?.[0];
    if (!file_uri) return;

    const reader = new FileReader();

    reader.onload = function (event) {
      const dataURL = event?.target?.result;
      console.log("Data URL:", dataURL);
      setImg(dataURL);
    };

    reader.readAsDataURL(file_uri);
  };
  const handleNameChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setName(e.target.value);
  };

  const handlePrice = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setPrice(e.target.value);
  };

  const handleSizeChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setSize(e.target.value);
  };

  const handleCategoryChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCategory(e.target.value);
  };

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const data = {
      id: small_id,
      name: name,
      size: size,
      category: category,
      price: price,
      image: img,
      order: orderDate,
      delivery:deliveryMinDate,
    };

    const updatedData = [...userData, data];
    setUserData(updatedData);
    localStorage.setItem("userData", JSON.stringify(updatedData));

    setId("");
    setName("");
    setSize("");
    setCategory("");
    setPrice("");
    setImg("");
    setOrderDate(null);
    setDeliveryMinDate(null);
  };

  return (
    <div className="container">
      <div className="inputs">
        <div className="id">
          <TextField
            id="outlined-read-only-input"
            label="Id number"
            defaultValue={small_id}
            InputProps={{
              readOnly: true,
            }}
            sx={{
              width: 500,
            }}
          />
        </div>
        <div className="name">
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            autoComplete="off"
            value={name}
            onChange={handleNameChange}
            sx={{
              width: 500,
            }}
          />
        </div>

        <div className="size">
          <TextField
            id="outlined-select-currency"
            select
            label="Select Size"
            value={size}
            onChange={handleSizeChange}
            sx={{
              width: 500,
            }}
          >
            {itemSize.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>

        <div className="category">
          <FormControl>
            <InputLabel htmlFor="grouped-select">Category</InputLabel>
            <Select
              value={category}
              onChange={handleCategoryChange}
              defaultValue=""
              id="grouped-select"
              label="Grouping"
              sx={{ width: 500 }}
            >
              <ListSubheader>Men's</ListSubheader>
              <MenuItem value={"Shirt"}>Shirt</MenuItem>
              <MenuItem value={"Pant"}>Pant</MenuItem>
              <MenuItem value={"Shoe"}>Shoe</MenuItem>
              <ListSubheader>Women's</ListSubheader>
              <MenuItem value={"Dress"}>Dress</MenuItem>
              <MenuItem value={"Bag"}>Bag</MenuItem>
              <MenuItem value={"Shoe"}>Shoe</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className="price">
          <TextField
            id="outlined-basic"
            label="Price"
            variant="outlined"
            value={price}
            onChange={handlePrice}
            sx={{
              width: 500,
            }}
          />
        </div>
        <div className="upload">
          <FormControl>
            <InputLabel htmlFor="file-upload"></InputLabel>
            <Input
              id="file-upload"
              type="file"
              onChange={handleImg}
              inputProps={{ accept: "image/*" }}
              className="imgInput"
            />
          </FormControl>
        </div>
        <div className="dateRange">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Order Date"
                value={orderDate}
                onChange={handleOrderDateChange}
                sx={{
                  width: 200,
                }}
              />
              <DatePicker
                label="Delivery Date"
                minDate={deliveryMinDate}
                sx={{
                  width: 200,
                }}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>
        <div className="submit">
          <Button onClick={handleSubmit} component="label" variant="contained">
            Submit
          </Button>
        </div>
      </div>
      <div>{/* <DataTable data={userData} /> */}</div>
    </div>
  );
};

export default Form;
