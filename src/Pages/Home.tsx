import "@ionic/react/css/core.css";
import "./Home.css";
import { Table } from "../components/Table";
import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Book } from "../components/Book";
import { Return } from "../components/Return";
import jsonData from "../data/Data.json";
import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonModal,
  IonTitle,
  IonToolbar,
  IonCol,
  IonGrid,
  IonInput,
  IonList,
  IonRow,
  IonText,
  IonFooter,
  IonIcon,
  IonTextarea,
} from "@ionic/react";
export const Home = () => {
  const [myArray, updateMyArray] = useState<Product[]>([
    {
      code: "code1",
      name: "name1",
      type: "meter",
      availability: true,
      needing_repair: true,
      durability: 10,
      max_durability: 10,
      mileage: 10,
      price: 10,
      minimum_rent_period: 10,
    },
    {
      code: "code2",
      name: "name2",
      type: "plain",
      availability: true,
      needing_repair: true,
      durability: 10,
      max_durability: 10,
      mileage: 10,
      price: 10,
      minimum_rent_period: 10,
    },
  ]);
  const updateForBook = (product: Product, dayCount: number) => {
    product.availability = false;
    let updateArray = [...myArray];
    let updateId = 0;
    if (product.type == "plain") {
      product.durability -= dayCount;
    } else if (product.type == "meter") {
      product.mileage += 10 * dayCount; //mileage 10 miles added every
      product.durability -= 4 * dayCount; //2 point each day and 2 point for 10 miles each day
    }
    myArray.forEach((pro, index) => {
      if (pro.code == product.code) {
        updateId = index;
      }
    });
    updateArray[updateId] = { ...updateArray[updateId], ...product };
    updateMyArray(updateArray);
  };
  const updateForReturn = (product: Product, dayCount: number) => {
    product.availability = true;
    let updateArray = [...myArray];
    let updateId = 0;

    myArray.forEach((pro, index) => {
      if (pro.code == product.code) {
        updateId = index;
      }
    });
    updateArray[updateId] = { ...updateArray[updateId], ...product };
    updateMyArray(updateArray);
  };

  return (
    <div className="Home">
      <h2>React Front End App</h2>
      <Table productList={myArray}></Table>
      <IonRow>
        <IonCol>
          <Book productList={myArray} updateHandler={updateForBook}></Book>
        </IonCol>
        <IonCol>
          <Return productList={myArray} updateHandler={updateForReturn}></Return>
        </IonCol>
      </IonRow>
      </div>
  );
};