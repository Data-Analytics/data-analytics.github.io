$(document).ready( function(){
  // Create the script element for Google Tag Manager
  var gtmScript = document.createElement('script');
  gtmScript.src = "https://www.googletagmanager.com/gtag/js?id=G-J2NT40QYX2";
  gtmScript.async = true;

  // Create the script element for configuring Google Analytics
  var gaScript = document.createElement('script');
  gaScript.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-J2NT40QYX2');
  `;

  // Append the scripts to the head of the document
  document.head.appendChild(gtmScript);
  document.head.appendChild(gaScript);
});
