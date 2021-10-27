import { useState } from "react";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import {
  IonModal,
  IonButton,
  IonInput,
  IonContent,
  IonItem,
  IonAlert,
  IonLabel,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";

export const Return: React.FC<{
  productList: Product[];
  updateHandler: Function;
}> = ({ productList, updateHandler }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mileage,setMileage] = useState('');
  const [message,setMessage] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product>({
    code: '',
    name: '',
    type: '',
    availability: false,
    needing_repair: false,
    durability: 0,
    max_durability: 0,
    mileage: 0,
    price: 0,
    minimum_rent_period: 0
  });
  const calculateRentalFee=()=>{
      let fee=selectedProduct.price*((Number(mileage))/10);
      setMessage('Total price is '+fee.toString()+'$. Do you want to proceed?');
      setShowAlert(true)    
  }
  return (
    <div>
      <IonModal
        isOpen={showModal}
        onWillDismiss={(e) => {
          setShowModal(false);
          setMileage('');
        }}
        cssClass="my-custom-class"
      >
        <p>Return a product</p>
        <div>
        <IonItem>
          <IonLabel>Product</IonLabel>
          <IonSelect
            value={selectedProduct}
            placeholder="Select One"
            onIonChange={(e) => setSelectedProduct(e.detail.value)}
          >
            {productList.map((product) => (
              <IonSelectOption key={product.code} value={product}>
                {product.code} {product.name} {product.type}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>
        </div>
        <div>
        <IonLabel>Mileage</IonLabel>
        <IonInput value={mileage} placeholder="mileage" onIonChange={e=>{setMileage(e.detail.value!)}} ></IonInput>
        </div>
        <div >
        <IonItem>
        <IonButton  size={'small'}  onClick={() => {setShowModal(false)}}>No</IonButton>
        <IonButton  size={'small'}  onClick={()=>calculateRentalFee()}>Yes</IonButton>
        </IonItem>
        </div>
        
      </IonModal>
      <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          cssClass='my-custom-class'
          header={'Confirm!'}
          message={message}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: blah => {
                console.log('Confirm Cancel: blah');
              }
            },
            {
              text: 'Okay',
              handler: () => {
                updateHandler(selectedProduct,(Number(mileage))/10);
                setShowModal(false);
              }
            }
          ]}
          />
      <IonButton onClick={() => setShowModal(true)}>Return</IonButton>
    </div>
  );
};
