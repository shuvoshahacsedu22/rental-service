import { useState } from "react";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
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

interface Range{
  startDate?:any;
  endDate?:any;
  key?:any;
}
export const Book: React.FC<{
  productList: Product[];
  updateHandler: Function;
}> = ({ productList, updateHandler }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [dayCount,setDayCount] = useState(0);
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
  const [state, setState] = useState<Range[]>([
    {
      startDate: null,
      endDate: null,
      key: "selection",
    },
  ]);
  const calculateRentalFee=()=>{
    let dayCount:number=((state[0].endDate-state[0].startDate)/86400000) + 1;
    setDayCount(dayCount);
    if(dayCount<selectedProduct.minimum_rent_period){
      alert("Please select minimum rental period = "+selectedProduct.minimum_rent_period+" days");
    }
    else{
      let fee=selectedProduct.price*dayCount;
      setMessage('Total estimated price is '+fee.toString()+'$. Do you want to proceed?');
      setShowAlert(true)
    }
  }
  return (
    <div>
      <IonModal
        isOpen={showModal}
        onWillDismiss={(e) => {
          setShowModal(false);
          setState([{startDate:null,endDate:null,key:'selection'}])
        }}
        cssClass="my-custom-class"
      >
        <p>Book a product</p>
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
        <div >
        <IonItem>
        <IonButton  size={'small'}  onClick={() => {setShowModal(false);setState([{startDate:null,endDate:null,key:'selection'}]);}}>No</IonButton>
        <IonButton  size={'small'}  onClick={()=>calculateRentalFee()}>Yes</IonButton>
        </IonItem>
        </div>
        <div>
          <IonItem >
        <DateRange
          editableDateInputs={true}
          onChange={(item) => setState([item.selection])}
          moveRangeOnFirstSelection={false}
          ranges={state}
          
        />
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
                updateHandler(selectedProduct,dayCount);
                setShowModal(false);
              }
            }
          ]}
          />
      <IonButton onClick={() => setShowModal(true)}>Book</IonButton>
    </div>
  );
};
