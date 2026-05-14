export interface PaymentInitializationResponse {
  status: boolean;
  message: string;
  data: {
    authorization_url: string;
    access_code: string;
    reference: string;
  };
}

export async function initializePayment(email: string, amount: number, metadata: any): Promise<PaymentInitializationResponse> {
  const response = await fetch('/api/paystack/initialize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, amount, metadata }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.details || errorData.error || 'Failed to initialize payment');
  }

  return response.json();
}

export async function verifyPayment(reference: string) {
  const response = await fetch(`/api/paystack/verify/${reference}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to verify payment');
  }

  return response.json();
}
