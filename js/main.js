
import './router/router.js';
import { initModalSystem } from './core/ui.js';
import { initMobileMenu } from './core/ui.js';

document.addEventListener("DOMContentLoaded", () => {
    initModalSystem();
    initMobileMenu();
});
