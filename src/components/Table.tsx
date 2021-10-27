import React from "react";
import MaterialTable from "material-table";

export const Table:React.FC<{productList:Product[]}> = ({productList}) => {
  const columns = [
    {
        title: "#",
        field: "tableData.id",
        render:(rowData:any) => { return( <p>{rowData.tableData.id+1}</p> ) }
    },
    {
      title: "Code",
      field: "code",
    },
    {
      title: "Name",
      field: "name",
    },
    {
      title: "Type",
      field: "type",
    },
    {
      title: "Availability",
      field: "availability",
    },
    { 
     title: "Needing Repair",
     field: "needing_repair" },

    {
      title: "Durability",
      field: "durability",
    },
    {
      title: "Max Durability",
      field: "max_durability",
    },
    {
      title: "Mileage",
      field: "mileage",
    },
    {
      title: "Price",
      field: "price",
    },
    {
      title: "Minimum Rent Period",
      field: "minimum_rent_period",
    },
  ];
  const options ={
      search:true,
      paging:true,
      filtering:false,
      pageSizeOptions: [10, 20, 50],
      pageSize: 10,
      rowStyle: {
          backgroundColor: '#EEE',
      }
  }
  
  
  return (
    <div>
      <MaterialTable title="Product Rental Table" data={productList} columns={columns} options={options}/>
    </div>
  );
};
