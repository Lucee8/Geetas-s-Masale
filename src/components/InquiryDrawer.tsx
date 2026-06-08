/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ShoppingBag, 
  Trash2, 
  MessageSquare, 
  ArrowRight, 
  ShieldCheck, 
  ArrowLeft, 
  Smartphone, 
  QrCode, 
  Check, 
  Copy, 
  Sparkles, 
  CreditCard
} from 'lucide-react';
import { Product } from '../types';

interface InquiryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  inquiryList: { product: Product; quantity: number }[];
  onRemoveItem: (productId: string) => void;
  onUpdateQuantity: (productId: string, qty: number) => void;
}

export default function InquiryDrawer({
  isOpen,
  onClose,
  inquiryList,
  onRemoveItem,
  onUpdateQuantity,
}: InquiryDrawerProps) {
  
  const [step, setStep] = useState<'bag' | 'pay'>('bag');
  const [amountMode, setAmountMode] = useState<'full' | 'advance' | 'custom'>('full');
  const [customAmount, setCustomAmount] = useState<string>('299');
  const [copied, setCopied] = useState(false);

  // Auto-reset state when drawer closes or list empties
  useEffect(() => {
    if (!isOpen) {
      setStep('bag');
    }
  }, [isOpen]);

  useEffect(() => {
    if (inquiryList.length === 0) {
      setStep('bag');
    }
  }, [inquiryList]);

  // Calculate total price estimate
  const totalPricing = inquiryList.reduce((acc, item) => acc + item.product.mrp * item.quantity, 0);

  // Safely calculate pay amount based on selected mode
  const payAmount = amountMode === 'full'
    ? totalPricing
    : amountMode === 'advance'
      ? Math.min(299, totalPricing)
      : Number(customAmount) || 0;

  // Generate UPI deep link URI with required parameters
  const upiString = `upi://pay?pa=bhavesh62006@fam&pn=Geetas%20Masale&am=${payAmount}&cu=INR`;
  
  // Real dynamic live QR code generation endpoint
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiString)}&color=A61B1B&bgcolor=FFFFFF`;

  // General WhatsApp transmission (non-paid inquiry)
  const handleTransmitWhatsApp = () => {
    if (inquiryList.length === 0) return;

    let text = `Hello Geeta's Masale! I would like to place a custom purchase inquiry for the following coastal items from your website:\n\n`;

    inquiryList.forEach((item, index) => {
      text += `${index + 1}. *${item.product.name}*\n`;
      text += `   - Pack Config: ${item.product.weight}\n`;
      text += `   - Quantity Ordered: ${item.quantity}\n`;
      text += `   - Rate/Price: Rs. ${item.product.mrp} each\n`;
      text += `   - Subtotal: Rs. ${item.product.mrp * item.quantity}\n\n`;
    });

    text += `*Expected Total Estimated Bill*: Rs. ${totalPricing}\n\n`;
    text += `Please verify availability of these traditional blends and confirm delivery packing options for my city address. Thank you!`;

    const url = `https://api.whatsapp.com/send?phone=917620428920&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // WhatsApp transmission for prepaid/initiated UPI payment
  const handleTransmitWhatsAppPay = () => {
    if (inquiryList.length === 0) return;

    let text = `Hello Geeta's Masale! I have initiated a direct UPI payment of Rs. ${payAmount} for my coastal grocery order:\n\n`;

    text += `*🛍 ORDER DETAILS*:\n`;
    inquiryList.forEach((item, index) => {
      text += `${index + 1}. *${item.product.name}* (${item.product.weight})\n`;
      text += `   Qty: ${item.quantity} x Rs. ${item.product.mrp} = Rs. ${item.product.mrp * item.quantity}\n`;
    });

    text += `\n*💰 BILLING SUMMARY*:\n`;
    text += `- *Total Bill Estimate*: Rs. ${totalPricing}\n`;
    text += `- *UPI Amount Paid/Initiated*: Rs. ${payAmount}\n`;
    if (amountMode === 'advance' && totalPricing > 299) {
      text += `- *Remaining Balance on Delivery*: Rs. ${totalPricing - payAmount}\n`;
    }
    text += `- *Payment Status*: Completed via App (Attaching success screenshot with reference ID)\n\n`;
    
    text += `*📍 SHIPPING DETAILS*:\n`;
    text += `Please ship the package to:\n`;
    text += `Name: [Your Name]\n`;
    text += `Address: [Your Full Address with Landmark & Pincode]\n`;
    text += `Mobile: [Your Contact Number]\n\n`;
    text += `Thank you! (Attaching my UPI transaction screenshot immediately)`;

    const url = `https://api.whatsapp.com/send?phone=917620428920&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  // Manual copy helper for desktop/manual input
  const handleCopyUPI = () => {
    navigator.clipboard.writeText('bhavesh62006@fam');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCustomPriceChange = (val: string) => {
    const clean = val.replace(/[^0-9]/g, '');
    setCustomAmount(clean);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="inquiry-drawer-overlay-root" className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop glass layer clickable to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Right sliding container panel */}
          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-[#FAF9F6] text-slate-800 h-full flex flex-col justify-between shadow-2xl border-l border-[#A61B1B]/15"
            >
              
              {/* Drawer Header block */}
              <div className="px-6 py-5 bg-[#A61B1B] text-white flex items-center justify-between shrink-0">
                <div className="flex items-center space-x-2.5">
                  <div className="p-2 rounded-lg bg-white text-[#A61B1B]">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-lg uppercase tracking-wider">
                      {step === 'bag' ? 'Your Inquiry Bag' : 'Fast-Track UPI'}
                    </h3>
                    <p className="text-[10px] font-mono text-rose-100/70 uppercase">
                      {step === 'bag' ? `Pre-checking ${inquiryList.length} items` : 'Secure Direct App Payment'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-white/10 text-white cursor-pointer"
                  aria-label="Close panel"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Step 1: Bag View */}
              {step === 'bag' ? (
                <>
                  {/* Items scroll list */}
                  <div className="p-6 overflow-y-auto flex-1 space-y-4">
                    {inquiryList.length === 0 ? (
                      <div className="text-center py-20 space-y-4">
                        <span className="text-6xl block">🥣</span>
                        <h4 className="font-sans font-bold text-base uppercase text-slate-400">Bag is empty</h4>
                        <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
                          Browse our high-contrast catalog categories and click "Add to Bag" under any Malvani spice, flour or cashew rows to compile items.
                        </p>
                        <button
                          onClick={onClose}
                          className="mt-4 px-6 py-2 rounded-full bg-[#A61B1B] text-white hover:bg-rose-950 text-xs font-mono font-bold uppercase cursor-pointer"
                        >
                          Browse Products list
                        </button>
                      </div>
                    ) : (
                      inquiryList.map((item) => (
                        <motion.div
                          key={item.product.id}
                          layout
                          className="p-4 rounded-xl bg-white border border-gray-100 flex items-center justify-between shadow-sm space-x-3 hover:shadow-md duration-300"
                        >
                          {/* Left side details */}
                          <div className="flex-1 space-y-1">
                            <h4 className="font-sans font-bold text-sm uppercase text-slate-800 line-clamp-1">
                              {item.product.name}
                            </h4>
                            <div className="flex items-center space-x-2 text-[10px] text-gray-400">
                              <span className="font-mono">{item.product.weight} pack</span>
                              <span>•</span>
                              <span className="font-sans">Rate: ₹{item.product.mrp}</span>
                            </div>
                            {/* Subtotal expected */}
                            <div className="text-xs font-sans font-extrabold text-[#A61B1B] pt-0.5">
                              Calculated: ₹{item.product.mrp * item.quantity}
                            </div>
                          </div>

                          {/* Middle count modifier */}
                          <div className="flex items-center space-x-2 bg-gray-50 p-1.5 rounded-lg border border-gray-100 uppercase shrink-0">
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                              className="w-6 h-6 rounded bg-white flex items-center justify-center text-xs font-bold border cursor-pointer hover:bg-gray-100"
                            >
                              -
                            </button>
                            <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="w-6 h-6 rounded bg-white flex items-center justify-center text-xs font-bold border cursor-pointer hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>

                          {/* Right trash delete icon */}
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-[#A61B1B] shrink-0 cursor-pointer"
                            title="Erase row"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>

                        </motion.div>
                      ))
                    )}
                  </div>

                  {/* Drawer Sticky Footer summary */}
                  {inquiryList.length > 0 && (
                    <div className="p-6 bg-white border-t border-gray-100 shadow-inner space-y-4 shrink-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-mono text-gray-400 uppercase font-bold block">Subtotal Estimate Bill</span>
                          <span className="text-3xl font-sans font-black text-[#A61B1B]">₹{totalPricing}</span>
                        </div>
                        <span className="text-xs text-gray-400 font-mono text-right">Items: {inquiryList.length}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        {/* Direct WhatsApp Inquiry */}
                        <button
                          onClick={handleTransmitWhatsApp}
                          className="inline-flex items-center justify-center space-x-1.5 py-3.5 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-sans font-bold tracking-wider uppercase transition-all shadow-sm cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5 fill-current text-white" />
                          <span>WhatsApp Order</span>
                        </button>

                        {/* Pay instantly (direct UPI) */}
                        <button
                          onClick={() => setStep('pay')}
                          className="inline-flex items-center justify-center space-x-1.5 py-3.5 px-2 rounded-xl bg-[#A61B1B] hover:bg-red-800 text-white text-[10px] font-sans font-bold tracking-wider uppercase transition-all shadow-sm cursor-pointer"
                        >
                          <CreditCard className="w-3.5 h-3.5" />
                          <span>Pay via UPI App</span>
                        </button>
                      </div>

                      <div className="p-3 bg-[#A61B1B]/5 rounded-xl border border-[#A61B1B]/15 flex items-start space-x-2.5">
                        <ShieldCheck className="w-5 h-5 text-[#A61B1B] shrink-0" />
                        <p className="text-[10px] font-sans text-slate-700 leading-normal">
                          Fast-track checkout: Pay in full/advance via direct UPI for automated processing and express priority packing at our store counter!
                        </p>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* Step 2: UPI Instant Payment View */
                <>
                  <div className="p-6 overflow-y-auto flex-1 space-y-5">
                    {/* Return Navigation */}
                    <button
                      onClick={() => setStep('bag')}
                      className="inline-flex items-center space-x-2 text-xs font-mono font-bold uppercase text-[#A61B1B] hover:opacity-80 transition cursor-pointer"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span>Back to Review Bag</span>
                    </button>

                    {/* Bill Header */}
                    <div className="bg-white rounded-xl p-4 border border-dashed border-gray-200 shadow-sm space-y-2">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-mono text-gray-400 uppercase">Cart Estimate:</span>
                        <span className="font-sans font-bold text-slate-800">₹{totalPricing}</span>
                      </div>
                      <div className="flex justify-between items-center border-t border-gray-100 pt-2">
                        <span className="text-xs font-mono font-bold text-[#A61B1B] uppercase">Confirming Payment:</span>
                        <span className="text-xl font-sans font-black text-[#A61B1B]">₹{payAmount}</span>
                      </div>
                    </div>

                    {/* Amount customizer choices */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-mono text-gray-400 uppercase font-bold tracking-wider block">
                        Select Payment Amount:
                      </span>
                      <div className="grid grid-cols-3 gap-1.5">
                        {/* Option 1: Full Amount */}
                        <button
                          onClick={() => setAmountMode('full')}
                          className={`py-2.5 px-1.5 rounded-lg border text-[10px] font-mono font-bold uppercase text-center transition duration-200 cursor-pointer flex flex-col justify-center items-center ${
                            amountMode === 'full'
                              ? 'bg-[#A61B1B] text-white border-[#A61B1B]'
                              : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <span>Full Bill</span>
                          <span className="text-xs font-sans font-black mt-0.5">₹{totalPricing}</span>
                        </button>

                        {/* Option 2: Flat Advance */}
                        <button
                          onClick={() => setAmountMode('advance')}
                          disabled={totalPricing < 299}
                          className={`py-2.5 px-1.5 rounded-lg border text-[10px] font-mono font-bold uppercase text-center transition duration-200 cursor-pointer flex flex-col justify-center items-center disabled:opacity-50 ${
                            amountMode === 'advance'
                              ? 'bg-[#A61B1B] text-white border-[#A61B1B]'
                              : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <span>Advance</span>
                          <span className="text-xs font-sans font-black mt-0.5">₹{Math.min(299, totalPricing)}</span>
                        </button>

                        {/* Option 3: Custom Amount */}
                        <button
                          onClick={() => setAmountMode('custom')}
                          className={`py-2.5 px-1.5 rounded-lg border text-[10px] font-mono font-bold uppercase text-center transition duration-200 cursor-pointer flex flex-col justify-center items-center ${
                            amountMode === 'custom'
                              ? 'bg-[#A61B1B] text-white border-[#A61B1B]'
                              : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          <span>Custom ₹</span>
                          <span className="text-xs font-sans font-black mt-0.5">Preset</span>
                        </button>
                      </div>

                      {/* Custom input input field */}
                      {amountMode === 'custom' && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="pt-1.5"
                        >
                          <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-gray-400">₹</span>
                            <input
                              type="text"
                              value={customAmount}
                              onChange={(e) => handleCustomPriceChange(e.target.value)}
                              placeholder="Enter Custom Amount to pay"
                              className="w-full pl-7 pr-4 py-2 bg-white rounded-lg border border-gray-200 text-xs font-bold text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#A61B1B]"
                            />
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Direct UPI buttons or Scan Area */}
                    <div className="space-y-4">
                      {/* On Mobile device, this anchors into GPay, PhonePe, Paytm automatically with filled details */}
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono text-gray-400 uppercase font-bold tracking-wider block">
                          ⚡ Mobile Direct Checkout:
                        </span>
                        
                        <a
                          href={upiString}
                          className="w-full inline-flex items-center justify-center space-x-2.5 py-4 rounded-xl bg-[#A61B1B] hover:bg-rose-950 text-white text-xs font-sans font-black tracking-wider uppercase transition-all shadow-lg active:scale-[0.98]"
                        >
                          <Smartphone className="w-5 h-5 animate-bounce" />
                          <span>Pay ₹{payAmount} Now via UPI APP</span>
                        </a>
                        
                        <p className="text-[9px] font-sans text-center text-gray-400 leading-normal">
                          For seamless checkout, tap above to open Google Pay, PhonePe, or Paytm with pre-filled amount.
                        </p>
                      </div>

                      {/* Desktop / Secondary Scan segment */}
                      <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex flex-col items-center space-y-4">
                        <div className="flex items-center space-x-1.5 self-start text-xs font-bold">
                          <QrCode className="w-4 h-4 text-[#A61B1B]" />
                          <span className="font-mono text-gray-400 uppercase">💻 Computer Scan QR Code:</span>
                        </div>

                        {/* QR Image Box */}
                        <div className="relative p-2.5 bg-white rounded-xl border border-gray-100 shadow-inner flex items-center justify-center w-48 h-48 group">
                          <img
                            src={qrCodeUrl}
                            alt="Scan Geeta's Masale UPI QR Code"
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain filter hover:scale-105 duration-300 pointer-events-none"
                          />
                        </div>

                        {/* Interactive Manual Copy box */}
                        <div className="w-full bg-[#A61B1B]/5 rounded-lg p-2.5 border border-[#A61B1B]/15 flex items-center justify-between text-xs font-mono select-all">
                          <div className="flex flex-col">
                            <span className="text-[9px] text-[#A61B1B]/75 uppercase">Manual UPI Identifier</span>
                            <span className="font-bold text-slate-800 text-sm">bhavesh62006@fam</span>
                          </div>
                          <button
                            onClick={handleCopyUPI}
                            className="p-2 rounded-lg bg-white/70 hover:bg-white text-gray-700 transition cursor-pointer"
                            title="Copy string"
                          >
                            {copied ? (
                              <Check className="w-4 h-4 text-emerald-500" />
                            ) : (
                              <Copy className="w-4 h-4 text-gray-500" />
                            )}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Dynamic step instruction */}
                    <div className="bg-white p-3 rounded-lg border border-slate-100 shadow-sm space-y-1.5">
                      <div className="flex items-center space-x-1.5 text-[10px] uppercase font-mono font-bold text-[#A61B1B]">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Simple 3-Step Guide</span>
                      </div>
                      <ol className="text-[9px] font-sans text-slate-600 space-y-1 list-decimal list-inside pl-1 leading-normal">
                        <li>Tap the pay button above (or scan the QR Code).</li>
                        <li>Complete the payment of <strong className="text-[#A61B1B]">₹{payAmount}</strong> on GPay/PhonePe.</li>
                        <li>Take a screenshot of the confirmation & submit below!</li>
                      </ol>
                    </div>

                  </div>

                  {/* Step 2 Sticky Footer */}
                  <div className="p-6 bg-white border-t border-gray-100 shadow-inner space-y-3 shrink-0">
                    <button
                      onClick={handleTransmitWhatsAppPay}
                      className="w-full inline-flex items-center justify-center space-x-2 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-sans font-bold tracking-wider uppercase transition-all shadow-md cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4 fill-current text-white" />
                      <span>Confirm & Share on WhatsApp</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    
                    <p className="text-[9px] font-sans text-center text-gray-400 select-none">
                      Secured via standard NPCI interoperable Unified Payments Interface (UPI).
                    </p>
                  </div>
                </>
              )}

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
