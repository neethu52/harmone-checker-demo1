//   navbar function 
$(document).ready(function(){

    $('.fa-bars').click(function(){
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    $(window).on('scroll load',function(){
        $('.fa-bars').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if($(Window).scrollTop()  >  30){
            $('header').addClass('header-active');
        }else{
            $('header').removeClass('header-active');
        }
    });

    
});

// ===== PCOD Symptom Checker =====
(function () {
  const weights = {
    irregular_periods: 2,
    heavy_or_painful: 1,
    acne_oily: 1,
    hair_growth: 2,
    hair_thinning: 1,
    weight_gain: 1,
    dark_patches: 1,
    cravings_fatigue: 1,
    mood_swings: 1,
    fertility_difficulty: 2
  };

  const btn = document.getElementById('checkNow');
  const form = document.getElementById('pcodForm');
  const resultBox = document.getElementById('checkerResult');
  const title = resultBox?.querySelector('.result-title');
  const text = resultBox?.querySelector('.result-text');
  const tips = document.getElementById('suggestions');

  if (!btn || !form || !resultBox) return;

  btn.addEventListener('click', () => {
    const checked = [...form.querySelectorAll('input[name="symptom"]:checked')]
      .map(i => i.value);

    // score
    const score = checked.reduce((sum, key) => sum + (weights[key] || 0), 0);

    // classify
    let level, message;
    if (score <= 2) {
      level = 'Low likelihood';
      message = "You’ve selected a few symptoms. PCOD is less likely, but keep tracking your cycle and health.";
      tips.hidden = true;
    } else if (score <= 5) {
      level = 'Possible PCOD';
      message = "You’re showing several common PCOD symptoms. Consider a lifestyle check and talk to a doctor if symptoms persist.";
      tips.hidden = false;
    } else {
      level = 'Higher likelihood — get a check-up';
      message = "Multiple strong indicators are present. Please consult a gynecologist/endocrinologist for proper evaluation.";
      tips.hidden = false;
    }

    title.textContent = level;
    text.textContent = message;
    resultBox.hidden = false;

    // Smooth scroll to result (nice on mobile)
    resultBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  // reset view
  document.getElementById('resetForm')?.addEventListener('click', () => {
    resultBox.hidden = true;
    tips.hidden = true;
  });
})();