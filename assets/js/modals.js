$(document).ready(function () {
  $(".pop_btn").click(function () {
    $(".wrapper").css("display", "flex");
  });
  $(".close").click(function () {
    $(".wrapper").css("display", "none");
  });
});

function SendMail() {
  event.preventDefault();

  console.log(document.getElementById("name").value);
  console.log(document.getElementById("email").value);
  console.log(document.getElementById("phone").value);
  console.log(document.getElementById("message").value);

  var params = {
    from_name: document.getElementById("name").value,
    email_id: document.getElementById("email").value,
    phone_id: document.getElementById("phone").value,
    message_id: document.getElementById("message").value,
  };

  // emailjs
  //   .Send("service_21dpc0d", "template_rtcsv3k", params)
  //   .then(function (res) {
  //     alert("Success!" + res.status);
  //   });

  emailjs.sendForm("service_21dpc0d", "template_rtcsv3k", this).then(
    () => {
      console.log("try to send email");
      alert("Sent!");
    },
    (err) => {
      btn.value = "Send Email";
      alert(JSON.stringify(err));
    }
  );
}
