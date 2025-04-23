import type { Metadata } from "next"
import { PaymentProcessor } from "@/components/payment/payment-processor"
import { getPaymentDetails } from "@/actions/payment-actions"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Paiement | RestoPilote",
  description: "Effectuez votre paiement en toute sécurité",
}

interface PaymentPageProps {
  searchParams: {
    billId?: string
    type?: string
    amount?: string
    reference?: string
  }
}

export default async function PaymentPage({ searchParams }: PaymentPageProps) {
  const { billId, type, amount: amountParam, reference } = searchParams

  // Validate required parameters
  if (!billId || !type) {
    redirect("/shared-bills")
  }

  // Parse amount if provided in URL, otherwise fetch from server
  let amount = amountParam ? Number.parseFloat(amountParam) : 0

  // If amount is not provided or invalid, fetch payment details
  if (!amount || isNaN(amount)) {
    const paymentDetails = await getPaymentDetails(billId, type)
    if (!paymentDetails.success) {
      redirect("/shared-bills")
    }
    amount = paymentDetails.amount
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Paiement</h1>
      <PaymentProcessor
        billId={billId}
        type={type}
        amount={amount}
        reference={reference || `REF-${billId.substring(0, 8)}`}
      />
    </div>
  )
}
