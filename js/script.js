const allSeatConainer = document.getElementById("ticket-and-seat-section").getElementsByClassName("btn");
let allSeatArray = [];
const seatCount = parseInt(document.getElementById("seat-count-indicator").innerText);
const seatRemain = parseInt(document.getElementById("remaining-seat").innerText);
const ticketPrice = parseInt(document.getElementById("ticket-price").innerText);
let totalPrice = parseInt(document.getElementById("total-price").innerText);
const totalPriceDisplay = document.getElementById("total-price");
const grandPriceDisplay = document.getElementById("grand-price");
const phoneNumberInput = document.getElementById('phone-number').value;


for (const seatButton of allSeatConainer) {
  seatButton.addEventListener("click", function () {
    const seatId = seatButton.getAttribute("id");
    if (!allSeatArray.includes(seatId)) {
      if (allSeatArray.length < 4) {

        allSeatArray.push(seatId);
        document.getElementById(seatId).classList.add("bg-themecolor");
        document.getElementById("seat-count-indicator").innerText = seatCount + allSeatArray.length;
        document.getElementById("remaining-seat").innerText = seatRemain - allSeatArray.length;

        const seatInfo = document.createElement("tr");
        seatInfo.innerHTML = `<td>${seatId}</td>
                              <td>Economy</td>
                              <td class = "text-right px-0" id="price-${seatId}">${ticketPrice}</td>
                              `;
        document.getElementById("price-display").appendChild(seatInfo);
        seatInfo.setAttribute("id", `appended-${seatId}`);
        const singlePrice = parseInt(document.getElementById(`price-${seatId}`).innerText);

        totalPrice = totalPrice + singlePrice;
        totalPriceDisplay.innerText = totalPrice;
        grandPriceDisplay.innerText = totalPrice;

        if (allSeatArray.length > 0) {
          document.getElementById('passenger-name').removeAttribute('disabled', 'title');
          document.getElementById('passenger-name').removeAttribute('title');
          document.getElementById('phone-number').removeAttribute('disabled');
          document.getElementById('phone-number').removeAttribute('title');
          document.getElementById('email-id').removeAttribute('disabled');
          document.getElementById('email-id').removeAttribute('title');
          document.getElementById('next-button').setAttribute('title', 'Please Enter your Phone Number.');
          document.getElementById('phone-number').addEventListener('keyup', function (m) {
            if (m.target.value.length >= 11) {
              document.getElementById('next-button').removeAttribute('disabled');
              document.getElementById('next-button').addEventListener('click', function () {
                const mainContent = document.getElementsByClassName('main-content');
                for (let content of mainContent) {
                  content.classList.add('bg-red-300');
                }
                console.log(document.getElementsByClassName('main-content'))
              })

            }
            else {
              document.getElementById('next-button').setAttribute('disabled', '');

            }
            console.log(parseInt(m.target.value.length));
          })
        }
        if (allSeatArray.length === 4) {
          document.getElementById('coupon-input').removeAttribute('disabled');
          document.getElementById('coupon-input').addEventListener('input', function (e) {
            if (e.target.value == 'NEW15') {
              document.getElementById('apply-button').removeAttribute('disabled')
              document.getElementById('apply-button').addEventListener('click', function () {
                const discount = totalPrice * 15 / 100;
                const finalGrandPrice = totalPrice - discount;
                document.getElementById('grand-price').innerText = finalGrandPrice;

                document.getElementById('coupon-apply-section').setAttribute('class', 'hidden');
                document.getElementById('hidden-coupon-message').classList.remove('hidden');
                document.getElementById('discount-percent').innerText = '15%';
                document.getElementById('discount-amount').innerText = `${discount}`;
              })
            }
            else if (e.target.value === 'Couple 20') {
              document.getElementById('apply-button').removeAttribute('disabled')
              document.getElementById('apply-button').addEventListener('click', function () {
                const discount = totalPrice * 20 / 100;
                const finalGrandPrice = totalPrice - discount;
                document.getElementById('grand-price').innerText = finalGrandPrice;

                document.getElementById('coupon-apply-section').setAttribute('class', 'hidden');
                document.getElementById('hidden-coupon-message').classList.remove('hidden');
                document.getElementById('discount-percent').innerText = '20%';
                document.getElementById('discount-amount').innerText = `${discount}`;
              })
            }
          })
        }
      }
      else {
        alert("You Can Select Maximum 4 Seat At a time!")
        return;
      }
    } else if (allSeatArray.includes(seatId)) {
      allSeatArray = allSeatArray.filter((item) => item !== seatId);
      document.getElementById(seatId).classList.remove("bg-themecolor");
      const seatRemainAfter = parseInt(document.getElementById("remaining-seat").innerText);
      document.getElementById("seat-count-indicator").innerText = allSeatArray.length;
      document.getElementById("remaining-seat").innerText = seatRemainAfter + 1;

      const seatInfo = document.createElement("tr");
      seatInfo.innerHTML = `<td>${seatId}</td>
                            <td>Economy</td>
                            <td class = "text-right px-0" id="price-${seatId}">${ticketPrice}</td>
                            `;
      seatInfo.setAttribute("id", `appended-${seatId}`);
      const singlePrice = parseInt(document.getElementById(`price-${seatId}`).innerText);
      document.getElementById(`appended-${seatId}`).remove();

      totalPrice = totalPrice - singlePrice;
      totalPriceDisplay.innerText = totalPrice;
      grandPriceDisplay.innerText = totalPrice;
    }
  });
}