import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { PAYPAL_KEY } from '../env';

interface Props {
  total: number;
  onPaymentSuccess: (data: any) => void;
  onPaymentError: (error: any) => void;
  isButtonDisabled: boolean;
}
export default function PaypalButton({
  total,
  onPaymentSuccess,
  onPaymentError,
  isButtonDisabled
}: Props): JSX.Element {
  return (
    <PayPalScriptProvider
      options={{
              clientId: PAYPAL_KEY
      }}
    >
      <PayPalButtons
              disabled={isButtonDisabled}
        forceReRender={[total]}
        createOrder={async (_, actions) => {
          return await actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: `${total}`
                }
              }
            ]
          });
        }}
        onApprove={(data, actions: any) => {
          return actions?.order.capture().then((details: any) => {
            onPaymentSuccess(data);
          });
        }}
        onError={(error: any) => {
          onPaymentError(error);
        }}
      />
    </PayPalScriptProvider>
  );
}
