import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { PAYPAL_KEY } from '../../env';

export type OnApproveData = {
  billingToken?: string | null;
  facilitatorAccessToken: string;
  orderID: string;
  payerID?: string | null;
  paymentID?: string | null;
  subscriptionID?: string | null;
  authCode?: string | null;
  paymentSource?: string
};

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
  const clientId = PAYPAL_KEY; 

  return (
    <PayPalScriptProvider
      options={{
        clientId: clientId,
      }}
    >
      <PayPalButtons
        disabled={isButtonDisabled}
        forceReRender={[0.01]}
        createOrder={async (_, actions) => {
          return await actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: `${0.01}`,
                },
              },
            ],
          });
        }}
        onApprove={async (data: OnApproveData, actions) => {
          return actions.order!.capture().then(() => {
            onPaymentSuccess(data);
          });
        }}
        onError={(error) => {
          onPaymentError(error);
        }}
      />
    </PayPalScriptProvider>
  );
}
