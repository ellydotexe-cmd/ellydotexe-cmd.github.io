// GitHub Pages contact form: prepare an email without a server or third-party service.
const contactForm = document.querySelector("#contact-form");
contactForm.addEventListener("submit", event => {
  event.preventDefault();
  const name = contactForm.elements.name.value.trim();
  const email = contactForm.elements.email.value.trim();
  const message = contactForm.elements.message.value.trim();
  const status = document.querySelector("#contact-status");
  if (!name || !message) {
    status.textContent = "Please enter your name and message.";
    return;
  }
  const subject = `Portfolio enquiry from ${name}`;
  const body = `Name: ${name}\r\nEmail: ${email}\r\n\r\n${message}`;
  window.location.href = `mailto:elly.mghtaderi@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  status.textContent = "Send the draft from your email app. If it didn't open, email elly.mghtaderi@gmail.com directly. Your message is still here to copy.";
});
