import React from "react";
import "./payment.css";
import logo from "../../assests/img/logo.png";
import Master from "../../assests/img/master.png";
import Visa from "../../assests/img/visa.jpg";
import American from "../../assests/img/american.png";

const Payment = () => {
  return (
    <main>
      <div className="container">
        <div className="row">
          {/* Subscription Summary */}
          <div className="col-md-6 mt-5">
            <div className="unique-subscription-box bg-white">
              <p className="text-start">Standard</p>
              <div className="text-start mb-3">
                <span className="unique-price">150€</span>
                <small className="text-muted">For Two Months</small>
              </div>
              <div className="d-flex justify-content-between border-bottom mb-2">
                <span>Standard</span>
                <span>150€</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Subtotal</span>
                <span>150€</span>
              </div>
              <div className="d-flex justify-content-between mb-3 mt-2">
                <span>Tax</span>
                <span>0.00€</span>
              </div>
              <div className="unique-total-section d-flex justify-content-between">
                <span className="fw-bold">Total due today</span>
                <span className="fw-bold">150€</span>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="col-md-6">
            <div className="custom-form-box">
              {/* Logo */}
              <div className="text-center mb-4">
                <img src={logo} alt="Logo" className="payment-logo" />
              </div>

              <form>
                <div className="mb-4">
                  <label htmlFor="email" className="form-label">
                    Contact information
                  </label>
                  <div className="input-group">
                    <input
                      type="email"
                      id="email"
                      className="form-control custom-input-box"
                      placeholder="Email"
                      required
                    />
                  </div>
                </div>

                <h3 className="fw-bold mt-2">Payment method</h3>
                <div className="mb-3">
                  <label htmlFor="card-number" className="form-label">
                    Card information
                  </label>
                  <input
                    type="text"
                    id="card-number"
                    className="form-control custom-input-box mb-2"
                    placeholder="1234 1234 1234 1234"
                    required
                  />
                  <div className="row gx-2">
                    <div className="col">
                      <input
                        type="text"
                        className="form-control custom-input-box"
                        placeholder="MM / YY"
                        required
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control custom-input-box"
                        placeholder="CVC"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Card Logos */}
                <div className="payment-card-logos my-3">
                  <img src={Visa} alt="Visa" />
                  <img src={Master} alt="Mastercard" />
                  <img src={American} alt="American Express" />
                </div>

                <div className="mb-3">
                  <label htmlFor="cardholder-name" className="form-label">
                    Cardholder name
                  </label>
                  <input
                    type="text"
                    id="cardholder-name"
                    className="form-control custom-input-box"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Billing address</label>
                  <input
                    type="text"
                    className="form-control custom-input-box mb-2"
                    placeholder="Street Address"
                    required
                  />
                  <input
                    type="text"
                    className="form-control custom-input-box mb-2"
                    placeholder="Address Line 2 (Optional)"
                  />
                  <div className="row gx-2">
                    <div className="col">
                      <input
                        type="text"
                        className="form-control custom-input-box mb-2"
                        placeholder="City"
                        required
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control custom-input-box mb-2"
                        placeholder="Suburb (Optional)"
                      />
                    </div>
                  </div>
                  <div className="row gx-2">
                    <div className="col">
                      <input
                        type="text"
                        className="form-control custom-input-box mb-2"
                        placeholder="State/Province"
                        required
                      />
                    </div>
                    <div className="col">
                      <input
                        type="text"
                        className="form-control custom-input-box mb-2"
                        placeholder="Postal Code"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-check mb-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="agreement"
                    required
                  />
                  <label className="form-check-label" htmlFor="agreement">
                    By subscribing, you agree to the{" "}
                    <a href="#" className="text-decoration-none">
                      Terms of Use
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-decoration-none">
                      Privacy Policy
                    </a>
                    .
                  </label>
                </div>

                <button type="submit" className="btn subscribe-button w-100">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Payment;
