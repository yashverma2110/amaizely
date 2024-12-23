"use client"

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { COMPLETE_ORDER, CREATE_ORDER } from "@/services/PaymentService"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCheckCircle, faInfoCircle, faMinus, faPlus, faSpinner, faUnlock } from "@fortawesome/free-solid-svg-icons";
import { MAX_DECKS, MIN_DECKS, PRICE_PER_DECK, AI_GENERATION_PER_DECK, DISCOUNT_PER_DECK, DECK_JUMPS, UPSELL_POINTS } from "@/config/SubscriptionConstants";
import { GET_COUNTRY } from "@/services/AuthService";

export default function SubscriptionForm({ country, isLoggedIn }: { country?: string, isLoggedIn: boolean }) {
  const [isLoading, setIsLoading] = useState(true)
  const [isCountryLoading, setIsCountryLoading] = useState(true)
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'confirming' | 'init'>('init')
  const [currency, setCurrency] = useState<'USD' | 'INR'>('INR')
  const [totalDecks, setTotalDecks] = useState(MIN_DECKS + 2 * DECK_JUMPS)

  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    if (country) {
      localStorage.setItem('user_country', country)
      setCurrency(country === 'IN' ? 'INR' : 'USD')
      setIsCountryLoading(false)
      return
    }

    const userCountry = localStorage.getItem('user_country')
    if (userCountry) {
      setCurrency(userCountry === 'IN' ? 'INR' : 'USD')
      setIsCountryLoading(false)
      return
    }

    // in case user's country is not set, we will try to get it from ip address
    GET_COUNTRY().then((response) => {
      setCurrency(response.country === 'US' ? 'USD' : 'INR')
    }).finally(() => {
      setIsCountryLoading(false)
    })
  }, [])

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const payStatus = localStorage.getItem('payStatus')
    if (payStatus) {
      const payment = JSON.parse(payStatus);
      setStatus('success');
      const isDeckCountValid = payment.decks % DECK_JUMPS === 0 && payment.decks >= MIN_DECKS && payment.decks <= MAX_DECKS
      if (isDeckCountValid) {
        setTotalDecks(payment.decks)
      }
    }
    localStorage.removeItem('payStatus')
    setIsLoading(false)
  }, [])

  function getCurrencySymbol() {
    return currency === 'INR' ? '₹' : '$'
  }

  function incrementDecks() {
    setTotalDecks(prev => Math.min(MAX_DECKS, prev + DECK_JUMPS))
  }

  function decrementDecks() {
    setTotalDecks(prev => Math.max(MIN_DECKS, prev - DECK_JUMPS))
  }

  function getDiscountedPrice() {
    return parseFloat((PRICE_PER_DECK[currency] * totalDecks - (PRICE_PER_DECK[currency] * totalDecks * DISCOUNT_PER_DECK)).toFixed(2))
  }

  function getSortedUpsellPoints() {
    const intent = searchParams.get('intent');
    if (!intent) {
      return UPSELL_POINTS
    }

    return UPSELL_POINTS.sort((a, b) => a.intent === intent ? -1 : b.intent === intent ? 1 : 0)
  }

  function getButtonText() {
    switch (status) {
      case 'loading': return 'Loading...'
      case 'success': return 'Buy Again'
      case 'confirming': return 'Confirming...'
      default: return 'Buy Now'
    }
  }

  function getMessage(message: string, intent: string) {
    if (intent === 'ai_generation') {
      return message.replace(':1', (AI_GENERATION_PER_DECK * totalDecks).toString())
    }

    return message
  }

  async function handleSubscriptionIntent() {
    if (!isLoggedIn) {
      router.push('/login')
      return;
    }

    if (status === 'loading' || status === 'confirming') {
      return
    }

    setStatus('loading')
    const { success, data } = await CREATE_ORDER({
      amount: getDiscountedPrice() * 100,
      currency,
      decks: totalDecks
    })

    if (!success) {
      setStatus('error')
      return
    }

    const { order, user } = data

    const options = {
      key: process.env.RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Amaizely',
      description: `Buy ${totalDecks} decks`,
      order_id: order.id,
      modal: {
        ondismiss: () => {
          setStatus('init')
        }
      },
      handler: async function (response: any) {
        setStatus('confirming')
        const { success } = await COMPLETE_ORDER({
          subscriptionId: response.razorpay_subscription_id
        })

        if (!success) {
          setStatus('error')
          return
        }

        localStorage.setItem('payStatus', JSON.stringify({
          success: true,
          decks: totalDecks
        }))
        window.location.reload()
      },
      prefill: {
        name: user.name,
        email: user.email,
      },
      theme: {
        color: '#C768EA',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  if (isLoading || isCountryLoading) {
    return (
      <div className="flex flex-col gap-4">
        <div className="skeleton rounded-lg bg-gray-300 h-40 w-full drop-shadow"></div>
        <div className="skeleton rounded-lg bg-gray-300 h-36 w-full drop-shadow"></div>
        <div className="skeleton rounded-lg bg-gray-300 h-14 w-full drop-shadow"></div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-8">
        <ul>
          {
            getSortedUpsellPoints().map((point) => (
              <li key={point.message} className={`flex items-center gap-2 ${searchParams.get('intent') === point.intent ? 'italic font-semibold text-yellow-500 text-base md:text-lg' : 'text-sm md:text-base'}`}>
                <FontAwesomeIcon icon={faCheckCircle} className={`h-3 w-3 ${searchParams.get('intent') === point.intent ? '' : 'text-success'}`} />
                {getMessage(point.message, point.intent)}
              </li>
            ))
          }
          <li className="flex text-sm md:text-base items-center gap-2"><FontAwesomeIcon icon={faCheckCircle} className="text-success h-3 w-3" /> Create or generate <strong>{totalDecks}</strong> more decks</li>
          <li className="flex text-sm md:text-base items-center gap-2"><FontAwesomeIcon icon={faCheckCircle} className="text-success h-3 w-3" /> Access to more incoming AI features</li>
        </ul>

        <div className="flex flex-col items-center h-full">
          <div className="flex justify-center items-center gap-2">
            <button className="btn btn-xs btn-outline" disabled={totalDecks === MIN_DECKS} onClick={decrementDecks}>
              <FontAwesomeIcon icon={faMinus} className="h-4 w-4" />
            </button>
            <span className="text-3xl md:text-5xl bg-neutral-200 rounded px-4">{totalDecks}</span>
            <button className="btn btn-xs btn-outline" disabled={totalDecks === MAX_DECKS} onClick={incrementDecks}>
              <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
            </button>
          </div>
          <h3 className="text-center mt-2 text-lg whitespace-nowrap">Add or remove {DECK_JUMPS} decks</h3>
        </div>
      </div>

      <div className="border border-neutral-200 rounded p-2 text-2xl md:text-4xl">
        <strong className="font-extralight">Pay:</strong> <span className="font-bold">{getCurrencySymbol()} <span className="line-through font-thin">{(PRICE_PER_DECK[currency] * totalDecks).toFixed(2)}</span> {getDiscountedPrice()}</span>
      </div>

      <div className="flex flex-col gap-1">
        {
          status !== 'error' && (
            <p className="text-sm md:text-base text-success flex items-center">
              <FontAwesomeIcon icon={faCheckCircle} className="h-3 w-3 mr-1" />
              <span className="mr-1">{status === 'success' ? 'Payment successful! You saved' : 'You will save'}</span> <strong>{getCurrencySymbol()} {(PRICE_PER_DECK[currency] * totalDecks - getDiscountedPrice()).toFixed(2)}</strong>
            </p>
          )
        }
        {
          (totalDecks === MIN_DECKS && ['init', 'error'].includes(status)) && (
            <p className="text-sm text-error flex">
              <FontAwesomeIcon icon={faInfoCircle} className="h-3 w-3 mr-1 my-1" />
              <span>Minimum cart value is <strong>{MIN_DECKS}</strong></span>
            </p>
          )
        }
        {
          totalDecks === MAX_DECKS && ['init', 'error'].includes(status) && (
            <p className="text-sm text-error flex">
              <FontAwesomeIcon icon={faInfoCircle} className="h-3 w-3 mr-1 my-1" />
              <span>You can buy maximum <strong>{MAX_DECKS}</strong> decks at once</span>
            </p>
          )
        }
      </div>

      <button className="relative btn btn-warning w-full" onClick={handleSubscriptionIntent}>
        {getButtonText()}
        {status === 'loading' && <FontAwesomeIcon icon={faSpinner} className="h-5 w-5 animate-spin" />}
        {status === 'init' && <FontAwesomeIcon icon={faUnlock} className="h-5 w-5" />}
        {status === 'success' && <FontAwesomeIcon icon={faCheck} className="h-5 w-5" />}
      </button>
    </div>
  )
}