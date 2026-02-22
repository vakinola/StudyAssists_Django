// Modal JS moved from inline scripts in index.html
(function () {
    const backdrop = document.querySelector('.sa-backdrop');

    // Main modal
    const mainLoginModal = document.getElementById('loginModal');
    const desktopLoginBtns = document.querySelectorAll('.sa-desktop-login, .sa-signin-btn');

    function openMainLogin() {
        if (!mainLoginModal) return;
        mainLoginModal.classList.add('active');
        backdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeMainLogin() {
        if (!mainLoginModal) return;
        mainLoginModal.classList.remove('active');
        backdrop.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Open main login from desktop Sign in / sidebar Sign in
    desktopLoginBtns.forEach(el => el.addEventListener('click', (e) => { e.preventDefault(); openMainLogin(); }));

    // Email flow
    const openEmailBtns = document.querySelectorAll('.sa-open-email-flow');
    const emailLoginModal = document.getElementById('emailLoginModal');
    const emailSignupModal = document.getElementById('emailSignupModal');

    // Track whether the main modal was open when the email flow started
    let mainWasOpen = false;

    function openModal(modal) {
        closeAllEmailModals();

        // if opening an email modal, hide main login if it was open
        if ((modal === emailLoginModal || modal === emailSignupModal) && mainLoginModal && mainLoginModal.classList.contains('active')) {
            mainWasOpen = true;
            mainLoginModal.classList.remove('active');
            mainLoginModal.classList.add('blended');
            mainLoginModal.setAttribute('data-hidden-by-email', 'true');
        } else if (mainLoginModal) {
            mainLoginModal.classList.remove('blended');
        }

        if (modal) modal.classList.add('active');
        if (backdrop) backdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeAllEmailModals() {
        [emailLoginModal, emailSignupModal].forEach(m => { if (m) m.classList.remove('active'); });
        if (backdrop) backdrop.classList.remove('active');
        document.body.style.overflow = '';
        if (mainLoginModal) mainLoginModal.classList.remove('blended');
    }

    openEmailBtns.forEach(btn => btn.addEventListener('click', (e) => {
        e.preventDefault();
        openModal(emailLoginModal);
    }));

    // Back / navigation
    document.querySelector('.sa-email-login-back')?.addEventListener('click', () => {
        // Hide login modal, restore main modal
        if (emailLoginModal) emailLoginModal.classList.remove('active');
        if (mainLoginModal) {
            mainLoginModal.classList.remove('blended');
            mainLoginModal.classList.add('active');
        }
        if (backdrop) backdrop.classList.add('active');
    });

    document.querySelector('.sa-email-signup-back')?.addEventListener('click', () => {
        // Hide signup modal, restore main modal
        if (emailSignupModal) emailSignupModal.classList.remove('active');
        if (mainLoginModal) {
            mainLoginModal.classList.remove('blended');
            mainLoginModal.classList.add('active');
        }
        if (backdrop) backdrop.classList.add('active');
    });

    // Switch links
    document.querySelectorAll('.sa-email-switch-to-signup').forEach(el => el.addEventListener('click', (e) => { e.preventDefault(); openModal(emailSignupModal); }));
    document.querySelectorAll('.sa-email-switch-to-login').forEach(el => el.addEventListener('click', (e) => { e.preventDefault(); openModal(emailLoginModal); }));

    // Close buttons
    document.querySelectorAll('.sa-email-login-close').forEach(b => b.addEventListener('click', closeAllEmailModals));
    document.querySelectorAll('.sa-email-signup-close').forEach(b => b.addEventListener('click', closeAllEmailModals));

    // Backdrop click: behave contextually (close main if open, else close email modals)
    if (backdrop) backdrop.addEventListener('click', () => {
        if (mainLoginModal && mainLoginModal.classList.contains('active')) closeMainLogin();
        else closeAllEmailModals();
    });

    // ESC key: similar behavior
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (mainLoginModal && mainLoginModal.classList.contains('active')) closeMainLogin();
            else closeAllEmailModals();
        }
    });

    // Wire form stubs
    document.getElementById('emailLoginForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        console.log('Login submitted', Object.fromEntries(data.entries()));
        alert('Login submitted (stub)');
        closeAllEmailModals();
    });

    document.getElementById('emailSignupForm')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const form = e.target;
        const data = new FormData(form);
        console.log('Signup submitted', Object.fromEntries(data.entries()));
        alert('Signup submitted (stub)');
        closeAllEmailModals();
    });

    // Close main login helper used above
    function closeMainLogin() {
        if (!mainLoginModal) return;
        mainLoginModal.classList.remove('active');
        if (backdrop) backdrop.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close main login via close buttons (these have been used elsewhere)
    document.querySelectorAll('.sa-login-close').forEach(btn => btn.addEventListener('click', () => {
        if (mainLoginModal && mainLoginModal.classList.contains('active')) closeMainLogin();
        else closeAllEmailModals();
    }));
    // Feedback modal wiring
    const feedbackBackdrop = document.getElementById('feedback-modal');
    const feedbackForm = document.getElementById('feedbackForm');
    const openFeedbackBtns = document.querySelectorAll('.sa-open-feedback');

    function openFeedbackModal() {
        if (!feedbackBackdrop) return;
        feedbackBackdrop.classList.add('active');
        feedbackBackdrop.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeFeedbackModal() {
        if (!feedbackBackdrop) return;
        feedbackBackdrop.classList.remove('active');
        feedbackBackdrop.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    openFeedbackBtns.forEach(b => b.addEventListener('click', (e) => { e.preventDefault(); openFeedbackModal(); }));
    document.getElementById('feedback-close')?.addEventListener('click', (e) => { e.preventDefault(); closeFeedbackModal(); });

    // Close when clicking backdrop (outside form)
    if (feedbackBackdrop) feedbackBackdrop.addEventListener('click', (e) => {
        if (e.target === feedbackBackdrop) closeFeedbackModal();
    });

    // ESC closes feedback modal if open
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (feedbackBackdrop && feedbackBackdrop.classList.contains('active')) closeFeedbackModal();
        }
    });

    // Stubbed submit handler
    feedbackForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = new FormData(feedbackForm);
        console.log('Feedback submitted', Object.fromEntries(data.entries()));
        alert('Thanks for your feedback! (stub)');
        closeFeedbackModal();
    });

    // Close button inside modal
    document.querySelector('.feedback-modal-close')?.addEventListener('click', (e) => {
        e.preventDefault();
        closeFeedbackModal();
    });
})();
