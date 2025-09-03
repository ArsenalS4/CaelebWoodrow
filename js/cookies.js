// Cookie management system
class CookieManager {
    constructor() {
        this.cookieConsent = null;
        this.cookiePreferences = {
            necessary: true,
            analytics: false,
            marketing: false
        };
        this.init();
    }

    init() {
        this.checkExistingConsent();
        this.bindEvents();
        this.loadAnalytics();
    }

    checkExistingConsent() {
        const consent = localStorage.getItem('cookieConsent');
        if (consent) {
            this.cookiePreferences = JSON.parse(consent);
            this.hideCookieBanner();
            this.loadConsentedServices();
        } else {
            this.showCookieBanner();
        }
    }

    showCookieBanner() {
        const banner = document.getElementById('cookieConsent');
        if (banner) {
            banner.style.display = 'block';
            setTimeout(() => {
                banner.classList.add('visible');
            }, 100);
        }
    }

    hideCookieBanner() {
        const banner = document.getElementById('cookieConsent');
        if (banner) {
            banner.classList.remove('visible');
            setTimeout(() => {
                banner.style.display = 'none';
            }, 300);
        }
    }

    bindEvents() {
        // Accept all cookies
        const acceptBtn = document.getElementById('acceptCookies');
        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => {
                this.acceptAllCookies();
            });
        }

        // Decline all cookies
        const declineBtn = document.getElementById('declineCookies');
        if (declineBtn) {
            declineBtn.addEventListener('click', () => {
                this.declineAllCookies();
            });
        }

        // Open settings modal
        const settingsBtn = document.getElementById('cookieSettings');
        if (settingsBtn) {
            settingsBtn.addEventListener('click', () => {
                this.openSettingsModal();
            });
        }

        // Save settings
        const saveBtn = document.getElementById('saveSettings');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                this.saveCustomSettings();
            });
        }

        // Close modal
        const closeBtn = document.getElementById('closeModal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeSettingsModal();
            });
        }

        // Modal backdrop click
        const modal = document.getElementById('cookieModal');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeSettingsModal();
                }
            });
        }
    }

    acceptAllCookies() {
        this.cookiePreferences = {
            necessary: true,
            analytics: true,
            marketing: true
        };
        this.savePreferences();
        this.hideCookieBanner();
        this.loadConsentedServices();
        this.trackEvent('cookie_consent', 'accept_all');
    }

    declineAllCookies() {
        this.cookiePreferences = {
            necessary: true,
            analytics: false,
            marketing: false
        };
        this.savePreferences();
        this.hideCookieBanner();
        this.trackEvent('cookie_consent', 'decline_all');
    }

    openSettingsModal() {
        const modal = document.getElementById('cookieModal');
        if (modal) {
            // Update checkboxes based on current preferences
            document.getElementById('analyticsCookies').checked = this.cookiePreferences.analytics;
            document.getElementById('marketingCookies').checked = this.cookiePreferences.marketing;
            
            modal.style.display = 'flex';
            setTimeout(() => {
                modal.classList.add('visible');
            }, 100);
        }
    }

    closeSettingsModal() {
        const modal = document.getElementById('cookieModal');
        if (modal) {
            modal.classList.remove('visible');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    }

    saveCustomSettings() {
        this.cookiePreferences = {
            necessary: true,
            analytics: document.getElementById('analyticsCookies').checked,
            marketing: document.getElementById('marketingCookies').checked
        };
        this.savePreferences();
        this.closeSettingsModal();
        this.hideCookieBanner();
        this.loadConsentedServices();
        this.trackEvent('cookie_consent', 'custom_settings');
    }

    savePreferences() {
        localStorage.setItem('cookieConsent', JSON.stringify(this.cookiePreferences));
        localStorage.setItem('cookieConsentDate', new Date().toISOString());
    }

    loadConsentedServices() {
        if (this.cookiePreferences.analytics) {
            this.loadGoogleAnalytics();
        }
        
        if (this.cookiePreferences.marketing) {
            this.loadMarketingPixels();
        }
    }

    loadAnalytics() {
        // Basic page view tracking (always allowed for necessary functionality)
        this.trackPageView();
    }

    loadGoogleAnalytics() {
        // Load Google Analytics if user consented
        if (typeof gtag === 'undefined') {
            const script = document.createElement('script');
            script.async = true;
            script.src = 'https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID';
            document.head.appendChild(script);

            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
        }
    }

    loadMarketingPixels() {
        // Load marketing pixels and tracking codes
        console.log('Marketing cookies enabled - loading marketing scripts');
    }

    trackEvent(eventName, eventAction, eventValue = null) {
        if (this.cookiePreferences.analytics && typeof gtag !== 'undefined') {
            gtag('event', eventAction, {
                event_category: eventName,
                event_value: eventValue
            });
        }
        
        // Fallback tracking for necessary analytics
        console.log(`Event: ${eventName} - ${eventAction}`, eventValue);
    }

    trackPageView() {
        const pageData = {
            page: window.location.pathname,
            title: document.title,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            referrer: document.referrer || 'direct'
        };
        
        // Store page view data (this is considered necessary functionality)
        const pageViews = JSON.parse(localStorage.getItem('pageViews') || '[]');
        pageViews.push(pageData);
        
        // Keep only last 50 page views to prevent storage bloat
        if (pageViews.length > 50) {
            pageViews.splice(0, pageViews.length - 50);
        }
        
        localStorage.setItem('pageViews', JSON.stringify(pageViews));
    }

    // User data collection (with consent)
    collectUserData(data) {
        if (!this.cookiePreferences.analytics) {
            return;
        }

        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        Object.assign(userData, data, { lastUpdated: new Date().toISOString() });
        localStorage.setItem('userData', JSON.stringify(userData));
    }

    // Get collected data (for analytics purposes)
    getAnalyticsData() {
        if (!this.cookiePreferences.analytics) {
            return null;
        }

        return {
            pageViews: JSON.parse(localStorage.getItem('pageViews') || '[]'),
            userData: JSON.parse(localStorage.getItem('userData') || '{}'),
            preferences: this.cookiePreferences,
            consentDate: localStorage.getItem('cookieConsentDate')
        };
    }
}

// Initialize cookie manager
export function initializeCookies() {
    const cookieManager = new CookieManager();
    
    // Make cookie manager available globally for other scripts
    window.cookieManager = cookieManager;
    
    // Track user interactions
    document.addEventListener('click', (e) => {
        if (cookieManager.cookiePreferences.analytics) {
            cookieManager.collectUserData({
                lastClick: {
                    element: e.target.tagName,
                    className: e.target.className,
                    timestamp: new Date().toISOString()
                }
            });
        }
    });
    
    // Track time spent on page
    let startTime = Date.now();
    window.addEventListener('beforeunload', () => {
        if (cookieManager.cookiePreferences.analytics) {
            const timeSpent = Math.round((Date.now() - startTime) / 1000);
            cookieManager.collectUserData({
                timeSpent: timeSpent,
                page: window.location.pathname
            });
        }
    });
}