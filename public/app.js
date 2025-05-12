document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('payment-form');
  const errorMsg = document.getElementById('error-msg');
  const paymentInfo = document.getElementById('payment-info');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    errorMsg.textContent = '';
    paymentInfo.innerHTML = '';

    const amount = 5000; // Fixed amount of 5000 CLP

    paymentInfo.textContent = 'Procesando pago...';

    try {
      const response = await fetch('https://nueva-integracion-khipu.onrender.com/create-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amount,
          currency: 'CLP',
          subject: 'Cobro de prueba'
        })
      });

      const data = await response.json();

      if (response.ok && data.payment_id) {
        const khipu = new Khipu();

        const callback = (result) => {
          console.log('Callback invoked:', result);
        };

        const options = {
          mountElement: document.getElementById('khipu-web-root'),
          modal: true,
          modalOptions: {
            maxWidth: 450,
            maxHeight: 860
          },
          style: {
            primaryColor: '#8347AD',
            fontFamily: 'Roboto'
          },
          skipExitPage: false
        };

        khipu.startOperation(data.payment_id, callback, options);
        paymentInfo.textContent = ''; // clear loading text
      } else {
        paymentInfo.textContent = '';
        errorMsg.textContent = data.message || "Error creando pago";
      }
    } catch (error) {
      console.error(error);
      paymentInfo.textContent = '';
      errorMsg.textContent = 'Ocurrió un error de red.';
    }
  });
});


