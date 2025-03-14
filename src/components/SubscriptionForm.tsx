"use client"

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { COMPLETE_ORDER, CREATE_ORDER } from "@/services/PaymentService"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCheckCircle, faInfoCircle, faMinus, faPlus, faSpinner, faUnlock, faShieldHeart } from "@fortawesome/free-solid-svg-icons";
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
    <div className="flex flex-col gap-8">
      {/* Features List */}
      <ul className="space-y-4">
        {getSortedUpsellPoints().map((point) => (
          <li key={point.message} 
              className={`flex items-center gap-3 ${
                searchParams.get('intent') === point.intent 
                ? 'text-yellow-400 font-medium text-base md:text-lg' 
                : 'text-gray-300 text-sm md:text-base'
              }`}>
            <FontAwesomeIcon 
              icon={faCheckCircle} 
              className={`h-5 w-5 ${
                searchParams.get('intent') === point.intent 
                ? 'text-yellow-400' 
                : 'text-green-400'
              }`} 
            />
            {getMessage(point.message, point.intent)}
          </li>
        ))}
        <li className="flex text-sm md:text-base items-center gap-3 text-gray-300">
          <FontAwesomeIcon icon={faCheckCircle} className="text-green-400 h-5 w-5" />
          Create or generate <strong className="text-white">{totalDecks}</strong> more decks
        </li>
        <li className="flex text-sm md:text-base items-center gap-3 text-gray-300">
          <FontAwesomeIcon icon={faShieldHeart} className="text-green-400 h-5 w-5" />
          Access to more incoming AI features
        </li>
      </ul>

      {/* Deck Counter */}
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          <button 
            className="btn btn-circle btn-sm bg-slate-700/50 hover:bg-slate-600/50 border-white/10 text-white" 
            disabled={totalDecks === MIN_DECKS} 
            onClick={decrementDecks}
          >
            <FontAwesomeIcon icon={faMinus} className="h-4 w-4" />
          </button>
          <span className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
            {totalDecks}
          </span>
          <button 
            className="btn btn-circle btn-sm bg-slate-700/50 hover:bg-slate-600/50 border-white/10 text-white" 
            disabled={totalDecks === MAX_DECKS} 
            onClick={incrementDecks}
          >
            <FontAwesomeIcon icon={faPlus} className="h-4 w-4" />
          </button>
        </div>
        <p className="text-gray-400">Add or remove {DECK_JUMPS} decks</p>
      </div>

      {/* Price Display */}
      <div className="bg-slate-700/30 backdrop-blur-sm rounded-xl border border-white/10 p-6">
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-lg">Total Price:</span>
          <div className="text-right">
            <span className="text-2xl md:text-3xl font-light text-gray-400 line-through mr-3">
              {getCurrencySymbol()}{(PRICE_PER_DECK[currency] * totalDecks).toFixed(2)}
            </span>
            <span className="text-2xl md:text-3xl font-bold text-white">
              {getCurrencySymbol()}{getDiscountedPrice()}
            </span>
          </div>
        </div>
      </div>

      {/* Savings Info */}
      <div className="flex flex-col gap-2">
        {status !== 'error' && (
          <p className="text-sm md:text-base text-green-400 flex items-center gap-2">
            <FontAwesomeIcon icon={faCheckCircle} className="h-4 w-4" />
            <span>
              {status === 'success' ? 'Payment successful! You saved' : 'You will save'} 
              <strong className="ml-1">
                {getCurrencySymbol()}{(PRICE_PER_DECK[currency] * totalDecks - getDiscountedPrice()).toFixed(2)}
              </strong>
            </span>
          </p>
        )}
        {(totalDecks === MIN_DECKS && ['init', 'error'].includes(status)) && (
          <p className="text-sm text-red-400 flex items-center gap-2">
            <FontAwesomeIcon icon={faInfoCircle} className="h-4 w-4" />
            <span>Minimum cart value is <strong>{MIN_DECKS}</strong></span>
          </p>
        )}
        {totalDecks === MAX_DECKS && ['init', 'error'].includes(status) && (
          <p className="text-sm text-red-400 flex items-center gap-2">
            <FontAwesomeIcon icon={faInfoCircle} className="h-4 w-4" />
            <span>You can buy maximum <strong>{MAX_DECKS}</strong> decks at once</span>
          </p>
        )}
      </div>

      {/* Action Button */}
      <button 
        className={`relative btn w-full h-14 text-lg font-medium ${
          status === 'loading' || status === 'confirming'
            ? 'bg-purple-600/50 hover:bg-purple-600/60'
            : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500'
        } text-white border-0`} 
        onClick={handleSubscriptionIntent}
      >
        <span className="relative z-10">{getButtonText()}</span>
        {status === 'loading' && <FontAwesomeIcon icon={faSpinner} className="absolute right-4 h-5 w-5 animate-spin" />}
        {status === 'init' && <FontAwesomeIcon icon={faUnlock} className="absolute right-4 h-5 w-5" />}
        {status === 'success' && <FontAwesomeIcon icon={faCheck} className="absolute right-4 h-5 w-5" />}
      </button>
    </div>
  )
}