export function PaymentSummary () {
  return (
    <section className="payment-summary js-payment-summary">
      <div className="payment-summary">
        <h3>The Cost of Desire</h3>
        <div className="summary-row">
          <span>Items (3):</span> <span>₹499</span>
        </div>
        <div className="summary-row">
          <span>Shipping & handling:</span> <span>₹499</span>
        </div>
        <div className="summary-row">
          <span>Total before tax::</span> <span>₹499</span>
        </div>
        <div className="summary-row">
          <span>Estimated tax (10%):</span> <span>₹499</span>
        </div>
        <hr />
        <div className="summary-row total">
          <span>Order total:</span> <span>₹499</span>
        </div>

        <button className="kaamna-btn js-kaamna-btn">FULFILL YOUR DESIRES</button>
      </div>
    </section>
  )
}