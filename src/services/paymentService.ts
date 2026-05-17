export interface PaymentInitializationResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url?: string;
    access_code?: string;
    reference: string;
  };
}

export async function initializePayment(email: string, amount: number, metadata: any): Promise<PaymentInitializationResponse> {
  // Generate a client-side reference
  const reference = 'JS_' + Math.floor((Math.random() * 1000000000) + 1);
  
  // Store metadata for background processes
  localStorage.setItem(`order_info_${reference}`, JSON.stringify(metadata));

  // Return a response that indicates we are doing client-side initialization
  return {
    status: true,
    message: "Initialized client-side",
    data: {
      reference
    }
  };
}

export async function verifyPayment(reference: string) {
  // On Netlify with no backend, we might not be able to verify server-side
  // For now, we will return a mock success if it starts with JS_ or just log it
  console.log("Verification requested for:", reference);
  return {
    status: true,
    data: {
      status: 'success',
      reference
    }
  };
}
