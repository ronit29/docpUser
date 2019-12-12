import React from 'react'
import ProfileHeader from './DesktopProfileHeader'
import LeftBar from './LeftBar'
import Footer from './Home/footer'

export default ({ }) => {
    return (
        <div className="profile-body-wrap sitemap-body">
            <ProfileHeader />
            <div className="sub-header d-none d-lg-block" />
            <section className="container about-container">
                <div className="row">
                    <div className="col-12">
                        <div className="paypal-main-cont">
                            <h1>Paypal Terms</h1>
                            <div className="paypal-dtls-cont">
                                <h3>HOW TO AVAIL THE OFFER</h3>
                                <ol>
                                    <li> Create your new account with PayPal on www.paypal.in or login using you existing PayPal account.</li>
                                    <li> Visit the website/app of the above merchant.</li>
                                    <li> Proceed to the payment page and select Paypal as your payment option.</li>
                                    <li> Sign-in into your Paypal account and pay with your saved card (add card if not already added).</li>
                                    <li> If you are eligible for cashback, the same will be added in your Paypal account.</li>
                                    <li> You will receive an email notifying you about the cashback in your Paypal account.</li>
                                </ol>
                            </div>
                            <div className="paypal-dtls-cont">
                                <h3>HOW TO AVAIL THE OFFER</h3>
                                <ol>
                                    <li>Offer is valid for user's first transaction on paypal</li>
                                    <li>Offer is valid for all bookings on done Docprime till 10th January 2020</li>
                                    <li>Maximum cashback amount is 50% of transaction amount upto Rs. 250</li>
                                    <li>Minimum transaction amount to be eligible for cashback voucher is Rs. 50</li>
                                    <li>Cashback voucher will be awarded to the user with 5 day delay</li>
                                    <li>Offer can be availed only once per PayPal user.</li>
                                    <li>Offer valid for Paypal India account holders</li>
                                    <li>The cashback will be in the form a discount cash voucher which can be redeemed for your next Paypal transaction.</li>
                                    <li>The cashback voucher will be valid for 60 days from the date of receipt of email. Check email forActual expiry date of cashback.</li>
                                    <li>Check your cashback voucher amount on <a target="_blank" href="https://www.paypal.com/myaccount/wallet">www.paypal.com/myaccount/wallet.</a> In case you have a Business account with PayPal, you’ll need to download the Paypal app, login and check ‘Offers’ section in the bottom part of the app homepage to find your cashback voucher.</li>
                                    <li> This offer cannot be combined with any other/voucher/discount on merchant.</li>
                                    <li> This offer is valid only for users coming directly to the merchant website/app and not via any other Partner site.</li>
                                    <li> Under no circumstances will you be entitled to withdraw the eligible cashback voucher amount into your bank account or otherwise ask for cash withdrawal. The cashback amount will be applied as a discount for your eligible purchases. The amount cannot be credited into any pre - paid Instrument issued under applicable RBI laws.</li>
                                    <li> The cashback voucher can be redeemed during a PayPal transaction where there is an integration Between the merchant’s checkout flow and PayPal back-end platform which holds all the logic to Redeem Paypal offers.</li>
                                    <li> PayPal reserves the right to employ reasonable technological and other methods to prevent abuse of the offer terms. Further, you acknowledge that Paypal’s decision to take certain actions, Including limiting access to your offer, placing holds or imposing reserves, may be based on confidential criteria that is essential to our management of risk, the security of user’s accounts, Comply with applicable laws and the otherwise protect the Paypal system. You agree PayPal Is under no obligation to disclose the details of its risk management or its security procedures to You. Transaction processed through Virtual Cards will eligible for this cashback. If your order is cancelled by the payer/refunded by the merchant, PayPal cashback that has been awarded to your Paypal account will be withdrawn. In case of cancellations/refunds where awarded cash back Is used, 100% cashback will be refunded if the offer period is still valid. For partial cancellations, Refund wil be processed as per Paypal Policies. In cases of fraudulent/suspicious transaction, PayPal policies. In case of fraudulent/suspicious transaction, PayPal solely reserves the right Revoke the cashback offer/not award the cashback at all.</li>
                                    <li> Products/Services once bought online, shall be considered sold and cannot be cancelled,Refunded or exchanged.</li>
                                    <li> In addition to the above, this offer is also subject to merchant’s general Terms of Use.</li>
                                </ol>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <Footer />
        </div>
    )
}